import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../shared/components/UIElements/Carousel";
import image1 from "../../shared/images/Category_Acer_Nitro_5.jpg";
import image2 from "../../shared/images/Category_Headset.webp";
import image3 from "../../shared/images/Category_Nintendo.jpg";
import image4 from "../../shared/images/Category_ps5.jpg";
import "./Category.css";

const Category = () => {
  const navigate = useNavigate();
  
  const navigationHandler = (e) => {
    navigate(`/${e.currentTarget.id}/products`)
  };

  return (
    <React.Fragment>
      <Carousel />
      <div className="category-images">
        <figure id="laptops" onClick={(e)=>{navigationHandler(e)}} className="image-container">
          <img src={image1} />
          <figcaption>Laptops</figcaption>
        </figure>
        <figure id="headsets" className="image-container">
          <img src={image2} />
          <figcaption>Headsets</figcaption>
        </figure>
        <figure id="nintendo" className="image-container">
          <img src={image3} />
          <figcaption>Nintendo</figcaption>
        </figure>
        <figure id="playstation" className="image-container">
          <img src={image4} />
          <figcaption>Playstation</figcaption>
        </figure>
      </div>
    </React.Fragment>
  );
};

export default Category;
