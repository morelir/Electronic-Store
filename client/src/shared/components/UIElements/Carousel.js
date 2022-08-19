import React from "react";
import Carousel from "react-elastic-carousel";
import "./Carousel.css";
import image1 from "../../images/4a012340-8fdf-43e6-a5b4-110079db0586.__CR0,0,1464,600_PT0_SX1464_V1___.jpg";
import image2 from "../../images/af0b035b-cdde-43b3-8739-24b4771df61e.__CR0,0,800,600_PT0_SX800_V1___.jpg";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  // { width: 550, itemsToShow: 2 },
  // { width: 768, itemsToShow: 3 },
  // { width: 1200, itemsToShow: 4 },
];

const Carousel2 = () => {
  return (
    <>
      <div className="carousel">
        <Carousel enableAutoPlay  enableMouseSwipe={false}  breakPoints={breakPoints}>
          <div className="image">
            <img src={image1}></img>
          </div>
          <div className="image">
            <img src={image2}></img>
          </div>

          {/* <Item>Three</Item>
          <Item>Four</Item>
          <Item>Five</Item>
          <Item>Six</Item>
          <Item>Seven</Item>
          <Item>Eight</Item> */}
        </Carousel>
      </div>
    </>
  );
};

export default Carousel2;
