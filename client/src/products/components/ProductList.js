import React from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";


const ProductList = (props) => {
  return (
    <ul className="store-product-list" data-testid="products-list">
      {props.products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.images[0]}
          ratingsAverage={product.ratingsAverage}
          ratingsQuantity={product.ratingsQuantity}
          listPrice={product.listPrice.toFixed(2)}
          discount={product.discount}
        />
      ))}
    </ul>
  );
};

export default ProductList;
