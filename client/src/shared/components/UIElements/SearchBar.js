import React,{useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import searchIcon from "../../images/search.png";

const SearchBar = () => {
  const navigate = useNavigate();
  const searchInput=useRef()

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/${searchInput.current.value}/products`,{replace:true,state:"SEARCH"})
  };
  return (
    <form onSubmit={searchHandler} className="search-bar">
      <input ref={searchInput} type="text" placeholder="Type to search" name="q" />
      <button type="submit">
        <img src={searchIcon} alt="search"/>
      </button>
    </form>
  );
};

export default SearchBar;
