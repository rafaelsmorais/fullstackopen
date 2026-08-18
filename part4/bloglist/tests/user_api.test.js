const { test, after, beforeEach } = require('node:test')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const { initialUsers } = require('./testHelper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

test('create a user', async () => {
  const newUser = {
    username: 'newuser',
    name: 'New User',
    password: 'password123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, initialUsers.length + 1)
})

test('create a user with existing username fails', async () => {
  const newUser = {
    username: 'testuser1',
    name: 'Duplicate User',
    password: 'password123'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.error, 'username already exists')

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, initialUsers.length)
})

test('create a user with short username fails', async () => {
  const newUser = {
    username: 'ab',
    name: 'Short Username',
    password: 'password123'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.error, 'username and password must be at least 3 characters long')

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, initialUsers.length)
})

test('create a user with short password fails', async () => {
  const newUser = {
    username: 'validusername',
    name: 'Short Password',
    password: 'pw'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.error, 'username and password must be at least 3 characters long')

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, initialUsers.length)
})

test('create a user without username fails', async () => {
  const newUser = {
    name: 'No Username',
    password: 'password123'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.error, 'username and password are required')

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, initialUsers.length)
})

test('create a user without password fails', async () => {
  const newUser = {
    username: 'nousername',
    name: 'No Password'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.error, 'username and password are required')

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, initialUsers.length)
})

after(async () => {
  await mongoose.connection.close()
})