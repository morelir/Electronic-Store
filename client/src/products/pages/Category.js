import React, { useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../../shared/images/Category_Laptops.webp";
import image2 from "../../shared/images/Category_Headset.webp";
import image3 from "../../shared/images/Category_mouses.webp";
import image4 from "../../shared/images/Category_ps5.webp";
import image5 from "../../shared/images/Category_Controllers.webp";
import image6 from "../../shared/images/Category_Nintendo.webp";
import Button from "../../shared/components/FormElements/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IoLayers } from "react-icons/io5";
import "./Category.css";
import Slider from "../../shared/components/UIElements/Slider";

let category_images = [
  {
    src: image1,
    id: "laptops",
    name: "Laptops",
    alt: "laptops",
  },
  {
    src: image2,
    id: "headsets",
    name: "Headsets",
    alt: "headsets",
  },
  {
    src: image3,
    id: "mouses",
    name: "Mouses",
    alt: "mouses",
  },
  {
    src: image4,
    id: "playstation",
    name: "Playstation",
    alt: "playstation",
  },
  {
    src: image5,
    id: "controllers",
    name: "Controllers",
    alt: "controllers",
  },
  {
    src: image6,
    id: "nintendo",
    name: "Nintendo",
    alt: "nintendo",
  },
];

const Category = () => {
  const [images] = useState(category_images);

  return (
    <React.Fragment>
      <Slider className="animate slide-up" />
      <div className="home__container">
        <div className="home__mainTextContainer">
          <h1>Electronic Store</h1>
          <p>
            A simple online store made with <strong>ReactJS</strong>,{" "}
            <strong>NodeJS</strong> & <strong>MongoDB</strong>. Written in{" "}
            <strong>JavaScript</strong>, with implementation of{" "}
            <strong>REST API</strong>, <strong>Authentication</strong> and much
            more!
          </p>
          <p>
            This project introduces an engaging e-commerce web application,
            seamlessly integrating with <strong>Stripe</strong> for secure and efficient payment
            processing. Dynamic page navigation and user authentication using 
            <strong> JWT</strong> contribute to the application's functionality. Leveraging <strong>Redux </strong>
            for state management enhances the overall user experience.
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
              <Link
                style={{ textDecoration: "none" }}
                key={img.id}
                to={`products?category=${img.id}`}
                data-testid={img.id}
              >
                <figure id={img.id} className="card__container animate slide-up">
                  <div className="image-container">
                    <img src={img.src} alt="" />
                  </div>
                  <figcaption>
                    <span>{img.name}</span>
                  </figcaption>
                </figure>
              </Link>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
