import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"

const Products = ({ data: { allContentfulProduct } }) => {
  return (
    <Layout>
      <div>
        {allContentfulProduct.edges.map(({ node: product }) => (
          <div key={product.id}>
            <h2>Products</h2>
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
            <Img style={{ maxWidth: 600 }} fluid={product.image.fluid} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          name
          image {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

export default Products
