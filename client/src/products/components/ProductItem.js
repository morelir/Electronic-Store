import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import { Rating } from "@mui/material";
import "./ProductItem.css";
import ProductPrice from "./ProductPrice";

const ProductItem = (props) => {
  return (
    <li className="product-item">
      <Card className="product-item__content">
        <Link to={props.id}>
          <div className="product-item__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} />
          </div>
        </Link>
        <div className="product-item__info">
          <Link className="title" to={props.id}>
            {props.title.length > 55
              ? props.title.substring(0, 55) + "..."
              : props.title}
          </Link>
          {/* need to change rating */}
          <div className="container__rating-price">
            <Rating name="read-only" value={props.rating.amount} readOnly />
            <ProductPrice
              discount={props.discount}
              listPrice={props.listPrice}
            />
          </div>
        </div>
        <div className="product-item__actions"></div>
      </Card>
    </li>
  );
};

export default ProductItem;
