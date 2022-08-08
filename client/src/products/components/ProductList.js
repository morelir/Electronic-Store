import React from 'react'

import ProductItem from './ProductItem'
import "./ProductList.css"

const ProductList = (props) => {
  return (
    <ul className="product-list">
      {props.products.map(product => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          rating={product.rating}
          price={product.price}
          discount={product.discount}
        />
      ))}
    </ul>
  )
}

export default ProductList