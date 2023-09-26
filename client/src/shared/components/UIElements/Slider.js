import React, { useState } from "react";
import SimpleSlider from "react-slick";
import laptop from "../../images/1Slider_Laptop.webp";
import headset from "../../images/2Slider_Headset.webp";
import mouse from "../../images/3Slider_Mouse.webp";
import nintendo from "../../images/4Slider_Nintendo.webp";
import controller from "../../images/5Slider_Controller.webp";
import laptop2 from "../../images/6Slider_Laptop.webp";
import headset2 from "../../images/7Slider_Headset.webp";
import mouse2 from "../../images/8Slider_Mouse.webp";
import nintendo2 from "../../images/9Slider_Nintendo.webp";
import "./Slider.css";
import { Link } from "react-router-dom";

let category_images = [
  {
    src: laptop,
    id: "laptops",
    alt: "laptop",
  },
  {
    src: headset,
    id: "headsets",
    alt: "headset",
  },
  {
    src: mouse,
    id: "mouses",
    alt: "mouse",
  },
  {
    src: nintendo,
    id: "nintendo",
    alt: "nintendo",
  },
  {
    src: controller,
    id: "controllers",
    alt: "controller",
  },
  {
    src: laptop2,
    id: "laptops",
    alt: "laptop",
  },
  {
    src: headset2,
    id: "headsets",
    alt: "headset",
  },
  {
    src: mouse2,
    id: "mouses",
    alt: "mouse",
  },
  {
    src: nintendo2,
    id: "nintendo",
    alt: "nintendo",
  },
];

const Slider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    centerMode: true,
    dots: true,
    infinite: true,

    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3500,
    cssEase: "linear",
    pauseOnHover: true,
    swipe: false,
    beforeChange: (current, next) => {
      setImageIndex(next);
    },
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <SimpleSlider {...settings}>
      {category_images.map((img, idx) => (
        <Link
          key={idx}
          to={idx === imageIndex ? `products?category=${img.id}` : "/"}
          className={idx === imageIndex ? "slide activeSlide" : "slide"}
        >
          <img src={img.src} alt="" />
        </Link>
      ))}
    </SimpleSlider>
  );
};

export default Slider;
