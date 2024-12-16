import React, { useState } from 'react';

const containerStyle = {
  display: "flex",
  alignItems: "center",
  width: "max-content",
  gap: "15px"
};
const StarRating = ({
  maxRating = 10,
  rating,
  onSetRating,
  size = 30,
  starColor = "#ffd814",
  textColor = "black"
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  let startContainerStyle = {
    display: "flex",
    width: "max-content",
    alignItems: "center"
  };
  const textStyle = {
    color: textColor,
    fontSize: `${size / 1.2}px`,
    lineHeight: "1",
    margin: "0"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: containerStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: "star-container",
    style: startContainerStyle
  }, Array.from({
    length: maxRating
  }, (_, i) => /*#__PURE__*/React.createElement(Star, {
    full: hoverRating ? hoverRating >= i + 1 : rating >= i + 1,
    onSetRating: onSetRating,
    onSetHoverRating: setHoverRating,
    id: i,
    key: i,
    width: size,
    starColor: starColor
  }))), /*#__PURE__*/React.createElement("p", {
    style: textStyle
  }, hoverRating || rating || ""));
};
function Star({
  full,
  onSetRating,
  id,
  onSetHoverRating,
  width,
  starColor
}) {
  const starStyle = {
    disply: "block",
    width: `${width}px`,
    cursor: "pointer",
    padding: `${width / 15}px`
  };
  return /*#__PURE__*/React.createElement("span", {
    style: starStyle,
    onClick: () => onSetRating(id + 1),
    onMouseEnter: () => onSetHoverRating(id + 1),
    onMouseLeave: () => onSetHoverRating(0)
  }, full ? /*#__PURE__*/React.createElement("svg", {
    version: "1.1",
    viewBox: "0 0 43.128 43.128",
    fill: `${starColor}`,
    stroke: `${starColor}`
  }, /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_bgCarrier"
  }), /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_tracerCarrier"
  }), /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, " ", /*#__PURE__*/React.createElement("g", null, " ", /*#__PURE__*/React.createElement("path", {
    d: "M39.199,15.197H27.668L24.105,4.232c-1.404-4.326-3.68-4.326-5.084,0l-3.563,10.965H3.928 c-4.545,0-5.25,2.164-1.571,4.836l9.326,6.775L8.121,37.775c-1.404,4.322,0.438,5.662,4.116,2.988l9.326-6.775l9.328,6.775 c3.678,2.674,5.52,1.334,4.116-2.988l-3.564-10.967l9.326-6.775C44.449,17.361,43.744,15.197,39.199,15.197z"
  }), " "), " ")) : /*#__PURE__*/React.createElement("svg", {
    version: "1.1",
    viewBox: "0 0 43.128 43.128",
    fill: "transparent",
    stroke: `${starColor}`,
    strokeWidth: "3"
  }, /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_bgCarrier"
  }), /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_tracerCarrier"
  }), /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, " ", /*#__PURE__*/React.createElement("g", null, " ", /*#__PURE__*/React.createElement("path", {
    d: "M39.199,15.197H27.668L24.105,4.232c-1.404-4.326-3.68-4.326-5.084,0l-3.563,10.965H3.928 c-4.545,0-5.25,2.164-1.571,4.836l9.326,6.775L8.121,37.775c-1.404,4.322,0.438,5.662,4.116,2.988l9.326-6.775l9.328,6.775 c3.678,2.674,5.52,1.334,4.116-2.988l-3.564-10.967l9.326-6.775C44.449,17.361,43.744,15.197,39.199,15.197z"
  }), " "), " ")));
}

export { StarRating };
