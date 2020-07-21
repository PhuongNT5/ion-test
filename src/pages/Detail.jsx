import React, { useEffect, useState } from "react";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import BannerDetail from "../components/BannerDetail";
import InfoFilm from "../components/InfoFilm";
import ReviewFilm from "../components/ReviewFilm";

const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    details(movieId: $id) {
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
`;
function Detail(props) {
  const [param, setParam] = useState(null);
  useEffect(() => {
    setParam(props.match.params.id);
  });
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: param }
  });
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div className="detail">
      <BannerDetail banner={data.details}></BannerDetail>
      <div className="container">
        <div className="row">
          <InfoFilm info={data.details}></InfoFilm>
          <ReviewFilm info={data.details}></ReviewFilm>
        </div>
      </div>
    </div>
  );
}
export default Detail;
