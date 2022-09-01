import React from "react";
import "./ProductPrice.css";

const ProductPrice = (props) => {
  let finalPrice;
  if (props.discount) {
    finalPrice = ((1 - props.discount / 100) * props.listPrice).toFixed(2);
  } else {
    finalPrice = props.listPrice;
  }
  
  if (props.priceDetail) {
    return (
      <div className={`${props.className ? props.className : ""}`}>
        <div className="prices">
          {!!props.discount && (
            <span className="discount">-{props.discount}%</span>
          )}
          <span className="final-price">{finalPrice}$</span>
        </div>
        <div>
          {!!props.discount && (
            <span className="list-price__detail">
              List Price: <span className="price">{props.listPrice}$</span>
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${props.className ? props.className : ""} prices `}>
      {!!props.discount && <span className="discount">-{props.discount}%</span>}
      <span className="final-price">{finalPrice}$</span>
      {!!props.discount && <span className="list-price">{props.listPrice}$</span>}
    </div>
  );
};

export default ProductPrice;
