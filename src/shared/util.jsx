import { ApolloClient, InMemoryCache } from "@apollo/client";

const GET_MOVIES = new ApolloClient({
  uri: "https://ion-movies.herokuapp.com/",
  cache: new InMemoryCache()
});

export default GET_MOVIES;
