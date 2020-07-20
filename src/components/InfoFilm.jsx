import React, { Component, Img } from "react";
const InfoFilm = props => (
  <div className="col-12 col-md-3">
    <div className="info-wrapper">
      {props.info == undefined && <div className="loading"></div>}
      <div className="info-wrapper__thumb">
        <img src={props.info.poster_path} alt="thumbImg"></img>
      </div>
      <div className="info-wrapper__detail">
        <div className="info-wrapper__item">
          <h5>Director</h5>
          <p>Jon Watts</p>
        </div>

        <div className="info-wrapper__item">
          <h5>Release Date</h5>
          <p>{props.info.release_date}</p>
        </div>
        <div className="info-wrapper__item">
          <h5>Writers</h5>
          <p>Erik Sommers,Stan Lee,Chris McKenna</p>
        </div>
      </div>
      {/* <div className="info-wrapper__item">
        <h4>Plot</h4>
        <p>
          Peter Parker and his friends go on a summer trip to Europe. However,
          they will hardly be able to rest - Peter.
        </p>
      </div> */}
    </div>
  </div>
);
export default InfoFilm;
