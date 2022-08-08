import React from "react";
import {Link} from "react-router-dom"

import Card from "../../shared/components/UIElements/Card";
import { Rating } from '@mui/material';
import "./ProductItem.css";

const ProductItem = (props) => {
  console.log(!!props.discount);

  let finalPrice;
  if (props.discount) {
    finalPrice = (1 - props.discount / 100) * props.price;
  } else {
    finalPrice = props.price;
  }
  return (
    <li className="product-item">
      <Card className="product-item__content">
        <div className="product-item__image">
          <img src={props.image} />
        </div>
        <div className="product-item__info">
          <Link to={"/"+props.id}>{props.title}</Link>
          <Rating name="read-only" value={props.rating} readOnly />
          <div className="prices">
            {!!props.discount && (
              <span className="discount">-{props.discount}%</span>
            )}
            <span className="final-price">
              {finalPrice}$
            </span>
            {!!props.discount && <span className="secondery">{props.price}$</span>}
          </div>
        </div>
        <div className="product-item__actions"></div>
      </Card>
    </li>
  );
};

export default ProductItem;
