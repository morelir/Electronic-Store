import React from "react";
import "./ProductPrice.css";

const ProductPrice = (props) => {
  let finalPrice;
  if (props.discount) {
    finalPrice = (1 - props.discount / 100) * props.price;
  } else {
    finalPrice = props.price;
  }

  return (
    <div className={`${props.className ? props.className : ""} prices `}>
      {!!props.discount && <span className="discount">-{props.discount}%</span>}
      <span className="final-price">{finalPrice}$</span>
      {!!props.discount && <span className="secondery">{props.price}$</span>}
    </div>
  );
};

export default ProductPrice;
