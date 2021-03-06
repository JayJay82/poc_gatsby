const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const PostTemplate = path.resolve("./src/templates/post-template.js")
const BlogTemplate = path.resolve("./src/templates/blog-template.js")
const ProductTemplate = path.resolve("./src/templates/product-template.js")
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "posts" })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(mainQuery)
  const posts = result.data.allMarkdownRemark.edges
  const products = result.data.allContentfulProduct.edges
  createPostPage(posts, createPage)
  createBlogPages(posts, createPage)
  createProducts(products, createPage)
}

const createProducts = (products, createPage) => {
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProductTemplate,
      context: {
        slug: product.slug,
      },
    })
  })
}
const createPostPage = (posts, createPage) => {
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })
}

const createBlogPages = (posts, createPage) => {
  posts.forEach((_, index, postArr) => {
    const totalPages = postArr.length
    const postsPerPage = 10
    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLast = index === totalPages - 1

    createPage({
      path: isFirstPage ? "/blog" : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLast,
        currentPage,
        totalPages,
      },
    })
  })
}

const mainQuery = `
{
  allMarkdownRemark {
    totalCount
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
  allContentfulProduct {
    totalCount
    edges {
      node {
        slug
      }
    }
  }
}
`
