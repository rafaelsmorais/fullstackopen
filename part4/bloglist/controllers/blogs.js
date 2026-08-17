const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const saveBlog = await blog.save()
    response.status(201).json(saveBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
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
