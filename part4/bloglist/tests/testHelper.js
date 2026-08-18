const initialBlogs = [
  {
    title: 'The C Programming Language',
    author: 'Brian W. Kernighan',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Kernighan70.pdf',
    likes: 5,
    user: '6a83b87ed78606ba6e744681'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 7,
    user: '6a83b87ed78606ba6e744681'
  },
  {
    title: 'The Go Programming Language',
    author: 'Brian W. Kernighan',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Kernighan70.pdf',
    likes: 5,
    user: '6a83b87ed78606ba6e744681'
  }
]

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

const initialUsers = [
  {
    username: 'testuser1',
    name: 'Test User 1',
    passwordHash: '$2b$10$JNMUlqU7kdJW8TW/qDR0WO7D2EVo/dI0Q0MgaORhx16m85iTiRjOq',
    _id: '6a83b848d78606ba6e744680'
  },
  {
    username: 'testuser2',
    name: 'Test User 2',
    passwordHash: '$2b$10$TWoFh7afSztfciBbqYuRBu8Mcv10aEFhkGvyXdWTxnvmS6ubU61li',
    _id: '6a83b87ed78606ba6e744681'
  }
]

module.exports = {
  initialBlogs,
  listWithSeveralBlogs,
  initialUsers,
}