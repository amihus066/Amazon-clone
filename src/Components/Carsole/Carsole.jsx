import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imageList } from "./data";
import classes from "./carsole.module.css";
function carsol() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {imageList.map((image, i) => {
          return <img src={image} alt="" />;
        })}
      </Carousel>
      <div className={classes.carsole__effect}></div>
    </div>
  );
}

export default carsol;
