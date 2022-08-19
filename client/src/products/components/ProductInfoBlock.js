import React from "react";
import { Rating } from "@mui/material";
import ProductPrice from "./ProductPrice";
import ProductOverview from "./ProductOverview";
import "./ProductInfoBlock.css";
import ProductActions from "./ProductActions";

const ProductInfoBlock = (props) => {
  return (
    <div className="info">
      <div className="title">
        <span className="size-large">{props.title}</span>
      </div>
      <Rating
        className="rating"
        name="read-only"
        value={props.rating.amount}
        readOnly
      />
      <hr />
      <ProductPrice
        className="price"
        listPrice={props.listPrice}
        discount={props.discount}
        priceDetail
      />
      <ProductActions />
      <hr />
      <ProductOverview overview={props.overview} className="overview" />
      <hr />
      <div className="about">
        <span className="size-base-plus text-bold">About this item</span>
        <ul className="size-base">
          {props.bulletsDescription.map((bullet, pos) => {
            return <li key={pos}>{bullet}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfoBlock;
