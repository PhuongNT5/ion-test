import React, { Component } from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import Coverflow from "react-coverflow";
import { StyleRoot } from "radium";

const MovieCarousel = props => (
  <div className="popular-carousel">
    {props.popularMv.length > 0 && (
      <StyleRoot className="coverflow">
        <Coverflow
          className=""
          displayQuantityOfSide={1}
          navigation={true}
          clickable={true}
          enableHeading={true}
          infiniteScroll={true}
          enableScroll={true}
          active={2}
          media={{
            "@media (max-width: 768px)": {
              width: "98%",
              height: "300px"
            },
            "@media (min-width: 992px)": {
              width: "98%",
              height: "400px"
            },
            "@media (min-width: 1200px)": {
              width: "98%",
              height: "760px"
            }
          }}
        >
          {props.popularMv.map((mv, index) => {
            return <img key={index} src={mv.backdrop_path} alt={mv.title} />;
          })}
        </Coverflow>
      </StyleRoot>
    )}
  </div>
);

export default MovieCarousel;
