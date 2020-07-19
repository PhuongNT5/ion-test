import React, { Component } from "react";
import BannerDetail from "../components/BannerDetail.jsx";
import InfoFilm from "../components/InfoFilm.jsx";
import { useQuery, gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import ReviewFilm from "../components/ReviewFilm.jsx";
import GET_MOVIES from "../shared/util.jsx";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    GET_MOVIES.query({
      query: gql`
        query GetRates {
          details(movieId : ${params.id}) {
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
      `
    }).then(result => {
      this.setState({
        details: result.data.details
      });
    });
  }
  componentDidUpdate(prevState) { }
  handleClick() { }

  render() {
    // console.log(this.state.time)
    return (
      <div className="detail">
        <BannerDetail banner={this.state.details}></BannerDetail>
        <div className="container-fluid">
          <div className="row">
            <InfoFilm info={this.state.details}></InfoFilm>
            <ReviewFilm info={this.state.details}></ReviewFilm>
            {/* <div className="col-12 col-md-9"></div> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Detail;
