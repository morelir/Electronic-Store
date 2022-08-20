import React, { useRef, useState } from "react";
import Carousel from "react-elastic-carousel";
import "./Carousel.css";
import image1 from "../../images/RAZER.jpg";
import image2 from "../../images/nintendo switch.webp";
import image3 from "../../images/playstation 5.jpg";
import image4 from "../../images/HyperX Cloud 2.jpg";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  // { width: 550, itemsToShow: 2 },
  // { width: 768, itemsToShow: 3 },
  // { width: 1200, itemsToShow: 4 },
];
const TEMP_carouselImages = [
  <div className="image">
    <img src={image1}></img>
  </div>,
  <div className="image">
    <img src={image2}></img>
  </div>,
  <div className="image">
    <img src={image3}></img>
  </div>,
  <div className="image">
    <img src={image4}></img>
  </div>,
];

let resetTimeout;

const Carousel2 = () => {
  const [carouselImages, setCarouselImages] = useState(TEMP_carouselImages);
  const carouselRef = useRef();
  return (
    <>
      <div className="carousel">
        <Carousel
          ref={carouselRef}
          enableAutoPlay
          autoPlaySpeed={2000}
          enableMouseSwipe={false}
          showArrows={false}
          pagination={false}
          onNextEnd={({ index }) => {
            clearTimeout(resetTimeout);
            if (index + 1 === carouselImages.length) {
              resetTimeout = setTimeout(() => {
                carouselRef.current.goTo(0);
                // setCarouselImages(carouselImages.reverse())
              }, 2000); // same time
            }
          }}
        >
          {carouselImages.map((image, pos) => {
            return <React.Fragment key={pos}>{image}</React.Fragment>;
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Carousel2;
