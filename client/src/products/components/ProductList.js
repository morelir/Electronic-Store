import React from 'react'

import ProductItem from './ProductItem'
import "./ProductList.css"

const ProductList = (props) => {
  return (
    <ul className="store-product-list">
      {props.products.map(product => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.images[0]}
          rating={product.rating}
          listPrice={product.listPrice}
          discount={product.discount}
        />
      ))}
    </ul>
  )
}

export default ProductList