import React, { memo, useState, useEffect } from 'react';
import './index.less'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ControlCabin = props => {
   const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  const arr = [1, 2, 3, 4, 5]
  const settings = {
    arrows: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "2rem",
    slidesToShow: 3,
    speed: 500,
    // autoplay:true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };

  const onClick = () => {
    console.log('11111')
  }

  return (
    <div className="control-cabin-wraper">
      <Slider {...settings}>
        {arr.map(items => {
          return (
            <div className="box1" key={items}>
              <div className="picture" onClick={onClick}></div>
              <p>{items}</p>
            </div>
          )
        })}

      </Slider>
    </div>
  )
}

export default memo(ControlCabin)