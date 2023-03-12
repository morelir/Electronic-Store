import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./CartProduct.css";

const CartProduct = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [finalPrice] = useState(
    props.discount
      ? ((1 - props.discount / 100) * props.listPrice).toFixed(2)
      : props.listPrice
  );

  const addProductToCart = React.useCallback(async () => {
    setIsLoading(true);
    await props.onAddProductToCart(props.id, finalPrice);
    setIsLoading(false);
  }, [props.onAddProductToCart, finalPrice, props.id]);

  const removeProductFromCart = React.useCallback(async () => {
    setIsLoading(true);
    await props.onRemoveProductFromCart(props.removingId);
    setIsLoading(false);
  }, [props.onRemoveProductFromCart, props.removingId]);

  return (
    <li className="cart-product__item">
      {/* {isLoading && <LoadingSpinner asOverlay />} */}
      <div className="image-container">
        <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}></img>
      </div>
      <div className="detail">
        <h3 className="product-title">{props.title}</h3>
        <div className="product-summary">
          <div className="amount-controller">
            <Button
              disabled={props.isLoading}
              onClick={addProductToCart}
              inverse
            >
              +
            </Button>
            <div className="amount">
              <span>{props.amount}</span>
            </div>
            <Button
              disabled={props.isLoading}
              onClick={removeProductFromCart}
              inverse
            >
              -
            </Button>
          </div>
          <span className="price">${finalPrice}</span>
        </div>
      </div>
    </li>
  );
};

export default CartProduct;
