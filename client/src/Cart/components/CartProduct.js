import React from "react";
import { dispatch } from "react-redux";
import Button from "../../shared/components/FormElements/Button";
import "./CartProduct.css";

const CartProduct = (props) => {
  let finalPrice;
  if (props.discount) {
    finalPrice = (1 - props.discount / 100) * props.listPrice;
  } else {
    finalPrice = props.listPrice;
  }

  const addProductToCart = () => {};

  const removeProductFromCart = () => {};

  return (
    <li className="cart-product__item">
      <div className="left-container">
        <div className="image-container">
          <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}></img>
        </div>
        <div>
          <h3 className="product-title">{props.title}</h3>
          <div className="product-summary">
            <span className="price">${finalPrice}</span>
            <span className="amount">x{props.amount}</span>
          </div>
        </div>
      </div>
      <div className="right-container">
        <Button onClick={addProductToCart} inverse>
          -
        </Button>
        <Button onClick={removeProductFromCart} inverse>
          +
        </Button>
      </div>
    </li>
  );
};

export default CartProduct;
