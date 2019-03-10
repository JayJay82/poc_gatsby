import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const BlogTemplate = ({ data, pageContext }) => {
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
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
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
