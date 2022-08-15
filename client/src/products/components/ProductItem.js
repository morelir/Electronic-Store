import React from "react";
import {Link} from "react-router-dom"

import Card from "../../shared/components/UIElements/Card";
import { Rating } from '@mui/material';
import "./ProductItem.css";
import ProductPrice from "./ProductPrice";

const ProductItem = (props) => {

  return (
    <li className="product-item">
      <Card className="product-item__content">
        <div className="product-item__image">
          <img src={props.image} />
        </div>
        <div className="product-item__info">
          <Link to={"/"+props.id}>{props.title}</Link>
          <Rating  name="read-only" value={props.rating} readOnly />
          <ProductPrice discount={props.discount} price={props.price}/>
        </div>
        <div className="product-item__actions"></div>
      </Card>
    </li>
  );
};

export default ProductItem;
