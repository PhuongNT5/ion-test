import React, { Component } from "react";
import MovieCarousel from "../components/MovieCarousel.jsx";
import FilmListing from "../components/FilmListing.jsx";
import { useQuery, gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import Pagination from "react-js-pagination";
import GET_MOVIES from "../shared/util.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: {},
      movies: [],
      popularMv: [],
      page: 1,
      loading: false,
      searchText: "",
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    let searchText = this.props.location.state.searchText;

    const rs = this.filterMovie(searchText);
    this.setState({
      movies: rs
    })
  };
  filterMovie(searchText) {
    let movies = this.state.movies;
    const searchRs = movies.filter(mv => mv.title.includes(searchText));
    return searchRs;
  }

  componentDidMount() {
    this.handleSearch();
    GET_MOVIES.query({
      query: gql`
        query GetMovies {
          nowPlaying {
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
      `
    }).then(result => {
      let listMv = result.data.nowPlaying.movies;
      const popularMovies = listMv.filter((mv, index) => index < 5);
      this.setState({
        nowPlaying: result.data.nowPlaying,
        movies: result.data.nowPlaying.movies,
        popularMv: popularMovies
      });

    });
  }
  componentDidUpdate(prevProps, prevState) {
    window.addEventListener('scroll', this.handleScroll, false);
    let prevSearch = prevProps.location.state.searchText;
    let newSearch = this.props.location.state.searchText;
    if (prevSearch !== newSearch) {
      this.handleSearch();
    }
  }
  handleScroll() {
    const check = parseInt(document.body.offsetHeight + window.pageYOffset) ===
      document.body.scrollHeight;
    if (check) {
      this.setState({
        loading: true,
        page: this.state.page + 1
      });
      this.state.page < this.state.nowPlaying.totalPage ? this.handlePageChange(this.state.page, true) : '';
      window.removeEventListener('scroll', this.handleScroll, false);

    }
  }
  backToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  handlePageChange(pageNumber, infinite) {
    GET_MOVIES.query({
      query: gql`
          query GetRates {
            nowPlaying(page:${pageNumber}) {
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
        `
    }).then(result => {
      if (infinite) {
        let listMovies = [];
        this.state.movies.forEach(mv => {
          listMovies.push(mv);
        })
        result.data.nowPlaying.movies.forEach(mv => {
          listMovies.push(mv);
        });
        this.setState({
          nowPlaying: result.data.nowPlaying,
          movies: listMovies,
          page: result.data.nowPlaying.page,
          loading: false
        });
      } else {
        this.setState({
          nowPlaying: result.data.nowPlaying,
          movies: result.data.nowPlaying.movies,
          page: result.data.nowPlaying.page
        });
        this.backToTop();
      }

    });
  }

  render() {
    return (
      <div className="listing">
        {/* <h2 className="title visible-hidden">List movies</h2> */}
        <MovieCarousel popularMv={this.state.popularMv}></MovieCarousel>
        <div className="container">
          <FilmListing movies={this.state.movies}></FilmListing>
          {this.state.loading == false && <div className="loading-bottom">
            <div></div><div></div><div></div></div>}
          {this.state.movies.length > 20 && (
            <Pagination
              activePage={this.state.nowPlaying.page}
              itemsCountPerPage={this.state.nowPlaying.count}
              totalItemsCount={this.state.nowPlaying.total}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
          )}
        </div>

      </div>
    );
  }
}
export default Home;
