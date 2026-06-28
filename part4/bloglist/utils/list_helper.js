const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumLikes = blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes, 0)

  return sumLikes
}

const favoriteBlog = (blogs) => {
  let mostLikedblog = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > mostLikedblog.likes) {
      mostLikedblog = blog
    }
  })

  return mostLikedblog
}

const mostBlogs = (blogs) => {
  let blogAuthors = []

  blogs.forEach(blog => {
    blogAuthors.push(blog.author)
  })

  const blogAuthorsWithBlogCount = Object.entries(_.countBy(blogAuthors))

  let authorWithMostBlogs = blogAuthorsWithBlogCount[0]

  blogAuthorsWithBlogCount.forEach(author => {
    if (author[1] > authorWithMostBlogs[1]) {
      authorWithMostBlogs = author
    }
  })

  return {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1],
  }
}

const mostLikes = (blogs) => {
  let authorsWithLikes = []

  blogs.forEach(blog => {
    if (authorsWithLikes.some(n => n.author === blog.author)) {
      authorsWithLikes.find(author => {
        if (author.author === blog.author) {
          author.likes += blog.likes
        }
      })
    } else {
      authorsWithLikes.push({
        author: blog.author,
        likes: blog.likes
      })
    }
  })

  const authorWithMostLikes = _.maxBy(authorsWithLikes, author => { return author.likes })

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
