const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithSeveralBlogs = [
  {
    _id: '5a422aa71b54a676234d177b',
    title: 'The C Programming Language',
    author: 'Brian W. Kernighan',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Kernighan70.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d177b',
    title: 'The Go Programming Language',
    author: 'Brian W. Kernighan',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Kernighan70.pdf',
    likes: 5,
    __v: 0
  }
]


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const emptyList = []

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithSeveralBlogs)
    assert.strictEqual(result, 17)
  })
})

describe('favorite blog', () => {
  test('returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs)
    assert.deepStrictEqual(result, listWithSeveralBlogs[1])
  })

  test('returns undefined for an empty list', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, undefined)
  })
})

describe('most blogs', () => {
  test('returns the author with the most blogs', () => {
    const result = listHelper.mostBlogs(listWithSeveralBlogs)
    assert.deepStrictEqual(result, { author: 'Brian W. Kernighan', blogs: 2 })
  })
})

describe('most likes', () => {
  test('returns the author with the most likes', () => {
    const result = listHelper.mostLikes(listWithSeveralBlogs)
    assert.deepStrictEqual(result, { author: 'Brian W. Kernighan', likes: 10 })
  })
})
