import React from "react";
import Button from "../../shared/components/FormElements/Button";
import "./CartProduct.css";

const CartProduct = (props) => {
  let finalPrice;
  if (props.discount) {
    finalPrice = (1 - props.discount / 100) * props.listPrice;
  } else {
    finalPrice = props.listPrice;
  }

  const addProductToCart = () => {
    props.onAddProductToCart(props.id, finalPrice);
  };

  const removeProductFromCart = () => {
    props.onRemoveProductFromCart(props.removingId);
  };

  return (
    <li className="cart-product__item">
      <div className="left-container">
        <div className="image-container">
          <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}></img>
        </div>
        <div>
          <h3 className="product-title">{props.title}</h3>
          {/* <span>
            <select name="cars" id="cars">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </span> */}
          <div className="product-summary">
            <span className="price">${finalPrice.toFixed(2)}</span>
            <span className="amount">x{props.amount}</span>
          </div>
        </div>
      </div>
      <div className="right-container">
        <Button onClick={removeProductFromCart} inverse>
          -
        </Button>
        <Button onClick={addProductToCart} inverse>
          +
        </Button>
      </div>
    </li>
  );
};

export default CartProduct;
