const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, initialUsers } = require('./testHelper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(initialBlogs)
  await User.insertMany(initialUsers)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs have id property', async () => {
  const response = await api
    .get('/api/blogs')

  const blog = response.body[0]

  assert.ok('id' in blog)
  assert.ok(!('_id' in blog))
})

test('create a blog', async () => {
  const newBlog = {
    title: 'A New Blog',
    author: 'Supertest',
    url: 'https://github.com/forwardemail/supertest',
    likes: 10,
    userId: '6a83b87ed78606ba6e744681'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('blog likes should be 0 if request body doesnt have likes property', async () => {
  const newBlog = {
    title: 'A New Blog',
    author: 'Supertest',
    url: 'https://github.com/forwardemail/supertest',
    userId: '6a83b87ed78606ba6e744681'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title returns 400', async () => {
  const newBlog = {
    author: 'Supertest',
    url: 'https://github.com/forwardemail/supertest',
    likes: 3,
    userId: '6a83b87ed78606ba6e744681'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('blog without url returns 400', async () => {
  const newBlog = {
    title: 'A New Blog',
    author: 'Supertest',
    likes: 3,
    userId: '6a83b87ed78606ba6e744681'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('delete a blog', async () => {
  const response = await api.get('/api/blogs')
  const blogId = response.body[0].id
  const userId = response.body[0].user.id
  await api
    .delete(`/api/blogs/${blogId}`)
    .expect(204)

  const updatedResponse = await api.get('/api/blogs')
  assert.strictEqual(updatedResponse.body.length, response.body.length - 1)
  const updatedUserResponse = await api.get(`/api/users/${userId}`)
  assert.strictEqual(updatedUserResponse.body.blogs.length, 0)
})

test('update a blog', async () => {
  const newBlog = {
    title: 'An Updated Blog',
    author: 'Supertest',
    url: 'a url',
    likes: 8
  }
  const response = await api.get('/api/blogs')
  const currentBlogId = response.body[0].id
  const updatedResponse = await api.put(`/api/blogs/${currentBlogId}`).send(newBlog).expect(200)

  assert.strictEqual(updatedResponse.body.title, newBlog.title)
  assert.strictEqual(updatedResponse.body.author, newBlog.author)
  assert.strictEqual(updatedResponse.body.url, newBlog.url)
  assert.strictEqual(updatedResponse.body.likes, newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})
