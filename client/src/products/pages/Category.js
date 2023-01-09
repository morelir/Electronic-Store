import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../shared/components/UIElements/Carousel";
import image1 from "../../shared/images/Category_Laptops.jpg";
import image2 from "../../shared/images/Category_Headset.jpg";
import image3 from "../../shared/images/Category_Nintendo.jpg";
import image4 from "../../shared/images/Category_ps5.jpg";
import image5 from "../../shared/images/Category_Controllers.jpg";
import image6 from "../../shared/images/Category_mouses.jpg";
import Button from "../../shared/components/FormElements/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IoLayers } from "react-icons/io5";
import "./Category.css";

let category_images = [
  {
    src: image1,
    id: "laptops",
    name: "Laptops",
    mouseIsEnter: false,
  },
  {
    src: image2,
    id: "headsets",
    name: "Headsets",
    mouseIsEnter: false,
  },
  {
    src: image3,
    id: "mouses",
    name: "Mouses",
    mouseIsEnter: false,
  },
  {
    src: image4,
    id: "nintendo",
    name: "Nintendo",
    mouseIsEnter: false,
  },
  {
    src: image5,
    id: "playstation",
    name: "Playstation",
    mouseIsEnter: false,
  },
  {
    src: image6,
    id: "controllers",
    name: "Controllers",
    mouseIsEnter: false,
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

  const categoryMouseIsLeave = (src, pos) => {
    setImages((prev) => {
      return [
        ...prev.slice(0, pos),
        { ...prev[pos], mouseIsEnter: false },
        ...prev.slice(pos + 1),
      ];
    });
  };

  return (
    <React.Fragment>
      <Carousel />
      <div className="home__container">
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
            <Button className="source-button" href="https://github.com/morelir/Electronic-Store">
              <GitHubIcon /> Source Code
            </Button>
            <Button href="https://github.com/morelir">
              <IoLayers size="25px" />
              More Projects
            </Button>
          </div>
        </div>
        <div className="category-images">
          {images.map((img, pos) => {
            return (
              <figure
                key={pos}
                id={img.id}
                onMouseEnter={() => {
                  categoryMouseIsEnter(img.src, pos);
                }}
                onMouseLeave={() => {
                  categoryMouseIsLeave(img.src, pos);
                }}
                onClick={(e) => {
                  navigationHandler(e);
                }}
                className="card__container"
              >
                <div
                  className={`image-container ${
                    img.mouseIsEnter ? "mouseIsEnter" : ""
                  }`}
                >
                  <img src={img.src} />
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
