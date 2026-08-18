const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: decodedToken.id
    })
    const saveBlog = await blog.save()
    user.blogs = user.blogs.concat(saveBlog._id)
    await user.save()
    response.status(201).json(saveBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(blog.user)
    await Blog.findByIdAndDelete(blog)
    const removedBlogIndex = user.blogs.indexOf(blog._id)
    if (removedBlogIndex > -1) {
      user.blogs.splice(removedBlogIndex, 1)
      await user.save()
    }
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, url, author, likes } = request.body
    const currentBlog = await Blog.findById(request.params.id)
    if (!currentBlog) {
      return response.status(404).end()
    }
    currentBlog.title = title
    currentBlog.url = url
    currentBlog.author = author
    currentBlog.likes = likes
    const updateBlog = await currentBlog.save()
    response.status(200).json(updateBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
