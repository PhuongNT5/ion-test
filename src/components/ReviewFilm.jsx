import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { faShareAlt, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IntroFilm = props => (
  <div className="col-12 col-md-9">
    {props.info === undefined && <div className="loading"></div>}
    <div className="intro-banner">
      <div className="intro-banner__top">
        <h2>{props.info.title}</h2>
        <p>Popularity: {props.info.popularity}</p>
      </div>
      <div className="intro-banner__bottom">
        <div className="intro-banner__bottom--favor">
          <p>{props.info.vote_average}</p>
          <FontAwesomeIcon icon={faThumbsUp} />
        </div>
        <div className="intro-banner__bottom--social">
          <a className="intro-banner__bottom--link icon-facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a className="intro-banner__bottom--link icon-youtube">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a className="intro-banner__bottom--link">
            <FontAwesomeIcon icon={faShareAlt} />
          </a>
        </div>
      </div>
    </div>
    <div className="review-film">
      <Tabs>
        <TabList>
          <Tab>Summary</Tab>
          <Tab>Review</Tab>
        </TabList>

        <TabPanel>
          <p> {props.info.overview}</p>
        </TabPanel>
        <TabPanel>
          <p>Any content 2</p>
        </TabPanel>
      </Tabs>
    </div>
  </div>
);
export default IntroFilm;
