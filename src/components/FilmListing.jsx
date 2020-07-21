import React, { useState, useEffect } from "react";
import { faCalendar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Pagination from "react-js-pagination";
import MovieCarousel from "./MovieCarousel";
import "pure-react-carousel/dist/react-carousel.es.css";

// imporrt pagination

function FilmListing({ query }) {
  const filter = query;

  const [page, setPage] = useState(1);
  const GET_MOVIES = gql`
    query GetMovies($page: Int) {
      nowPlaying(page: $page) {
        count
        total
        page
        totalPage
        movies {
          id
          title
          original_title
          original_language
          overview
          video
          poster_path
          backdrop_path
          popularity
          adult
          vote_count
          vote_average
          release_date
        }
      }
    }
  `;
  useEffect(() => {
    const onScroll = e => {
      const check =
        parseInt(document.body.offsetHeight + window.pageYOffset) ===
        document.body.scrollHeight;
      if (check) {
        // setPage(page + 1);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { page }
  });
  let movies = [];
  function handlePageChange(pageNumber) {
    setPage(pageNumber);
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="">{error}</div>;

  movies = data.nowPlaying.movies.filter(mv =>
    mv.title.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <>
      <MovieCarousel popularMv={movies.filter((mv, index) => index < 5)} />
      {movies.length === 0 && <div>No results</div>}
      {movies.length > 0 && data.nowPlaying.total > 20 && (
        <Pagination
          activePage={data.nowPlaying.page}
          itemsCountPerPage={data.nowPlaying.count}
          totalItemsCount={data.nowPlaying.total}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      )}

      <div className="listing-wrapper">
        <div className="container">
          <div className="row">
            {movies.map((mv, index) => {
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
                      <Link
                        className="movie-item__info--title"
                        to={`/${mv.id}`}
                      >
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
      </div>
    </>
  );
}
export default FilmListing;
