import React from 'react';

const BannerDetail = (props) => (
  <div
    className="cover-pic"
    style={{ backgroundImage: `url(${props.banner.backdrop_path})` }}
  >
    {props.banner.backdrop_path === undefined && (
      <div className="loading"></div>
    )}
  </div>
);
export default BannerDetail;
