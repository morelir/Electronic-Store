import React, { useRef } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import "./Carousel.css";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  // { width: 550, itemsToShow: 2 },
  // { width: 768, itemsToShow: 3 },
  // { width: 1200, itemsToShow: 4 },
];

let TEMP_carouselImages = [];
for (let i = 1; i <= 10; i++) {
  TEMP_carouselImages.push(
    <div className="image">
      <img src={require(`../../images/${i}.jpg`)}></img>
    </div>
  );
}

let resetTimeout;

const Carousel2 = () => {
  const carouselRef = useRef();
  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? "👈" : "👉";
    if (type === consts.PREV) {
      return (
        <button
          className="carousel-custom__prev-arrow"
          onClick={onClick}
          disabled={isEdge}
        >
          {pointer}
        </button>
      );
    } else {
      return (
        <button
          className="carousel-custom__next-arrow"
          onClick={onClick}
          disabled={isEdge}
        >
          {pointer}
        </button>
      );
    }
    // return (
    //   <button className="carousel-custom__arrow" onClick={onClick} disabled={isEdge}>
    //     {pointer}
    //   </button>
    // );
  };
  return (
    <>
      <div className="carousel">
        <Carousel
          renderArrow={myArrow}
          ref={carouselRef}
          enableAutoPlay
          autoPlaySpeed={3000}
          enableMouseSwipe={false}
          showArrows={true}
          pagination={false}
          onNextEnd={({ index }) => {
            clearTimeout(resetTimeout);
            if (index + 1 === TEMP_carouselImages.length) {
              resetTimeout = setTimeout(() => {
                carouselRef.current.goTo(0);
                // setCarouselImages(carouselImages.reverse())
              }, 2000); // same time
            }
          }}
        >
          {TEMP_carouselImages.map((image, pos) => {
            return <React.Fragment key={pos}>{image}</React.Fragment>;
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Carousel2;
