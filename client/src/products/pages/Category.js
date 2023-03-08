import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../shared/components/UIElements/Carousel";
import image1 from "../../shared/images/Category_Laptops.webp";
import image2 from "../../shared/images/Category_Headset.webp";
import image3 from "../../shared/images/Category_Nintendo.webp";
import image4 from "../../shared/images/Category_ps5.webp";
import image5 from "../../shared/images/Category_Controllers.webp";
import image6 from "../../shared/images/Category_mouses.webp";
import Button from "../../shared/components/FormElements/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IoLayers } from "react-icons/io5";
import "./Category.css";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";

let category_images = [
  {
    src: image1,
    id: "laptops",
    name: "Laptops",
    alt:"laptops"
  },
  {
    src: image2,
    id: "headsets",
    name: "Headsets",
    alt:"headsets"
  },
  {
    src: image3,
    id: "mouses",
    name: "Mouses",
    alt:"mouses"
  },
  {
    src: image4,
    id: "nintendo",
    name: "Nintendo",
    alt:"nintendo"
  },
  {
    src: image5,
    id: "playstation",
    name: "Playstation",
    alt:"playstation"
  },
  {
    src: image6,
    id: "controllers",
    name: "Controllers",
    alt:"controllers"
  },
];

const Category = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState(category_images);

  const navigationHandler = (e) => {
    navigate(`/${e.currentTarget.id}/products`, {
      replace: true,
      state: "CATEGORY",
    });
  };

  const categoryMouseIsEnter = (src, pos) => {
    setImages((prev) => {
      return [
        ...prev.slice(0, pos),
        { ...prev[pos], mouseIsEnter: true },
        ...prev.slice(pos + 1),
      ];
    });
  };

  return (
    <React.Fragment>
      {/* <MainNavigation /> */}
      <div className="home__container">
        {/* <Carousel /> */}
        <div className="home__mainTextContainer">
          <h1>Electronic Store</h1>
          <p>
            A simple online store made with <strong>ReactJS</strong>,{" "}
            <strong>Redux</strong>, <strong>NodeJS</strong> &{" "}
            <strong>MongoDB</strong>. Written in <strong>JavaScript</strong>,
            with implementation of REST API, Authentication and much more!
          </p>
          <p>
            This project demonstrates the selling of consumer electronic
            products. You can register for the system, manage your personal
            shopping cart and enjoy a responsive and interactive design.
          </p>
          <div className="home-container__buttons">
            <Button
              className="source-button"
              href="https://github.com/morelir/Electronic-Store"
            >
              <GitHubIcon /> Source Code
            </Button>
            <Button href="https://github.com/morelir">
              <IoLayers size="25px" />
              More Projects
            </Button>
          </div>
        </div>
        <div className="category-images">
          {images.map((img) => {
            return (
              <figure
                key={img.id}
                id={img.id}
                onClick={(e) => {
                  navigationHandler(e);
                }}
                className="card__container"
              >
                <div className="image-container">
                  <img src={img.src} alt={img.alt} />
                </div>
                <figcaption>
                  <span>{img.name}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
