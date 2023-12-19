import React from "react";
import CartProduct from "./CartProduct";
import "./CartProducts.css";

const CartProducts = (props) => {
  return (
    <ul className="product-list">
      {props.products.map((prod) => {
        return (
          <CartProduct
            key={prod.product._id}
            id={prod.product._id}
            removingId={prod._id}
            amount={prod.amount}
            title={prod.product.title}
            image={prod.product.images[0]}
            listPrice={prod.product.listPrice.toFixed(2)}
            discount={prod.product.discount}
            onAddProductToCart={props.onAddProductToCart}
            onRemoveProductFromCart={props.onRemoveProductFromCart}
            isLoading={props.isLoading}
          />
        );
      })}
    </ul>
  );
};

export default CartProducts;
