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
        <div className="product-item__image">
          <Link to={`${props.id}`}>
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt="" />
          </Link>
        </div>

        <div className="product-item__info">
          <Link className="title" to={props.id}>
            {props.title}
          </Link>
          {/* need to change rating */}
          <div className="container__rating-price">
            <Rating name="read-only" value={props.ratingsAverage} precision={0.5} readOnly />
            <ProductPrice
              discount={props.discount}
              listPrice={props.listPrice}
            />
          </div>
        </div>
        {/* <div className="product-item__actions"></div> */}
      </Card>
    </li>
  );
};

export default ProductItem;
