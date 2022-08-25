import React from "react";
import CartProduct from "./CartProduct";

const CartProducts = (props) => {

  return (
    <ul>
      {props.products.map((prod) => {
        return (
          <CartProduct
            key={prod.product._id}
            amount={prod.amount}
            title={prod.product.title}
          />
        );
      })}
    </ul>
  );
};

export default CartProducts;
