import React from "react";
import Card from "../../shared/components/UIElements/Card";
import CartProduct from "./CartProduct";
import "./CartProducts.css"

const CartProducts = (props) => {
  return (
    <div className="cart-products">
      <h1 className="header">Shopping <span style={{color:"rgb(158, 172, 255)"}}>Cart</span></h1>
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
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CartProducts;
