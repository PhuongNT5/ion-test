import React from "react";
import { faCalendar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FilmListing = props => (
  <div className="listing-wrapper">
    <div className="row">
      {props.movies.length === 0 && (
        <div className=""></div>
      )}
      {props.movies.map((mv, index) => {
        return (
          <div className="col-12 col-lg-3 col-md-4" key={index}>
            <div className="movie-item">
              <div className="movie-item__thumb">
                <img src={mv.poster_path} alt={mv.title}></img>
                <div className="movie-item__rate">
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="rate font-weight-bold">
                    {mv.vote_average * 10}%
                  </span>
                  <span className="count">{mv.vote_count}</span>
                </div>
              </div>
              <div className="movie-item__info">
                <Link className="movie-item__info--title" to={`/${mv.id}`}>
                  {mv.title}
                </Link>

                <div className="movie-item__info--date">
                  Release date:
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>{new Date(mv.release_date).toDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
export default FilmListing;
