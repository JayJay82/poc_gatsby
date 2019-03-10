import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const BlogTemplate = ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLast } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : `/blog/${String(currentPage - 1)}`
  console.log(isLast)
  return (
    <Layout>
      <div>
        <h1 style={{ display: "inlineBlock" }}>Myblog</h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={`/posts${node.fields.slug}`}>
              <h3>{node.frontmatter.title}</h3>
            </Link>
            <span>-{node.frontmatter.date}</span>
            <p>{node.excerpt}</p>
          </div>
        ))}
        <div>
          {!isFirstPage && <Link to={prevPage}>prevPage</Link>}
          {!isLast && <Link to={nextPage}>Next page</Link>}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(skip: $skip, limit: $limit) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date
          }
          excerpt
          html
        }
      }
    }
  }
`
export default BlogTemplate
