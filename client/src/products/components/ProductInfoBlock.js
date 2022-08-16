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
        value={props.rating}
        readOnly
      />
      <hr />
      <ProductPrice
        className="price"
        price={props.price}
        discount={props.discount}
        priceDetail
      />
      <ProductActions />
      <hr />
      <ProductOverview className="overview" />
      <hr />
      <div className="about">
        <span className="size-base-plus text-bold">About this item</span>
        <ul className="size-base">
          <li>
            Dominate the Game: With the 10th Gen Intel Core i5-10300H processor,
            your Nitro 5 is packed with incredible power for all your games{" "}
          </li>
          <li>
            RTX, It's On: The latest NVIDIA GeForce RTX 3050 (4GB dedicated
            GDDR6 VRAM) is powered by award-winning architecture with new Ray
            Tracing Cores, Tensor Cores, and streaming multiprocessors support
            DirectX 12 Ultimate for the ultimate gaming performance
          </li>
          <li>
            Visual Intensity: Explore game worlds in Full HD detail on the 15.6"
            widescreen LED-backlit IPS display with 1920 x 1080 resolution,
            144Hz refresh rate and 80% screen-to-body, 16:9 aspect ratio
          </li>
          <li>
            Visual Intensity: Explore game worlds in Full HD detail on the 15.6"
            widescreen LED-backlit IPS display with 1920 x 1080 resolution,
            144Hz refresh rate and 80% screen-to-body, 16:9 aspect ratio
          </li>
          <li>
            Visual Intensity: Explore game worlds in Full HD detail on the 15.6"
            widescreen LED-backlit IPS display with 1920 x 1080 resolution,
            144Hz refresh rate and 80% screen-to-body, 16:9 aspect ratio
          </li>
          <li>
            Visual Intensity: Explore game worlds in Full HD detail on the 15.6"
            widescreen LED-backlit IPS display with 1920 x 1080 resolution,
            144Hz refresh rate and 80% screen-to-body, 16:9 aspect ratio
          </li>
          <li>
            Visual Intensity: Explore game worlds in Full HD detail on the 15.6"
            widescreen LED-backlit IPS display with 1920 x 1080 resolution,
            144Hz refresh rate and 80% screen-to-body, 16:9 aspect ratio
          </li>
          <li>
            Visual Intensity: Explore game worlds in Full HD detail on the 15.6"
            widescreen LED-backlit IPS display with 1920 x 1080 resolution,
            144Hz refresh rate and 80% screen-to-body, 16:9 aspect ratio
          </li>
          <li>
            Visual Intensity: Explore game worlds in Full HD detail on the 15.6"
            widescreen LED-backlit IPS display with 1920 x 1080 resolution,
            144Hz refresh rate and 80% screen-to-body, 16:9 aspect ratio
          </li>
          <li>
            Visual Intensity: Explore game worlds in Full HD detail on the 15.6"
            widescreen LED-backlit IPS display with 1920 x 1080 resolution,
            144Hz refresh rate and 80% screen-to-body, 16:9 aspect ratio
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfoBlock;
