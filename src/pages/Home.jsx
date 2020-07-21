import React from "react";
import { useLocation } from "react-router-dom";
import FilmListing from "../components/FilmListing";

function Home() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  let nameOfTitle = query.get("title") || "";

  return (
    <div className="listing">
      <FilmListing query={nameOfTitle} />
    </div>
  );
}
export default Home;
