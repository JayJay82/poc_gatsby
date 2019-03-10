import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const ProductTemplate = ({ data: { contentfulProduct } }) => (
  <Layout>
    <div>
      <h2>{contentfulProduct.name}</h2>
      <Img fluid={contentfulProduct.image.fluid} />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      description
      price
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export default ProductTemplate
