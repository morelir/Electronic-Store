import React from "react";
import "./SearchBar.css";
import searchIcon from "../../images/search.png"

const SearchBar = () => {
  return (
    <form className="search-bar">
      <input type="text" placeholder="search anything" name="q"/>
      <button type="submit"><img src={searchIcon}/></button>
    </form>
  );
};

export default SearchBar;
