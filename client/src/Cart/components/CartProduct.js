import React from "react";
import Button from "../../shared/components/FormElements/Button";
import "./CartProduct.css";

const CartProduct = (props) => {
  let finalPrice;
  if (props.discount) {
    finalPrice = ((1 - props.discount / 100) * props.listPrice).toFixed(2);
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
      <div className="image-container">
        <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}></img>
      </div>
      <div className="detail">
        <h3 className="product-title">{props.title}</h3>
        <div className="product-summary">
          <span className="price">${finalPrice}</span>
          <div className="amount-controller">
            <Button onClick={addProductToCart} inverse>
              +
            </Button>
            <div className="amount">
              <span>{props.amount}</span>
            </div>
            <Button onClick={removeProductFromCart} inverse>
              -
            </Button>
          </div>
          {/* <span className="amount">x{props.amount}</span> */}
        </div>
      </div>
      {/* <div className="right-container"></div> */}
    </li>
  );
};

export default CartProduct;
