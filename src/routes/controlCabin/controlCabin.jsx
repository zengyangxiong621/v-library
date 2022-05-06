import React, { memo, useState, useEffect } from 'react';
import './index.less'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ControlCabin = props => {
  const [currnetIndex, setCurrentIndex] = useState(0)
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
    dots: true,
    arrows: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "8rem",
    slidesToShow: 3,
    speed: 500,
    swipe: false,
    initialSlide: currnetIndex,

    afterChange: (index) => {
      console.log(index)
      setCurrentIndex(index)
    }
  };

  const onClick = (index) => {
    if (index === currnetIndex) {
      console.log('todo')
      // todo 全屏展示应用
    }
  }

  return (
    <div className="control-cabin-wraper">
      <Slider {...settings}>
        {arr.map((item, index) => {
          return (
            <div className="box1" key={item}>
              <div className="picture" onClick={() => onClick(index)}></div>
            </div>
          )
        })}

      </Slider>
    </div>
  )
}

export default memo(ControlCabin)
