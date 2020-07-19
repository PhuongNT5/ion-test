import React from "react";

const BannerDetail = props => (
  <div
    className="cover-pic"
    style={{ backgroundImage: `url(${props.banner.backdrop_path})` }}
  >
    {props.banner.backdrop_path == undefined && (
      <div className="loading"></div>
    )}
    {/* {<img src={props.banner.backdrop_path} alt="cover" />} */}
  </div>
);
export default BannerDetail;
