import React,{useEffect, useState} from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import "./SearchBar.css";
import searchIcon from "../../images/search.png";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search,setSearch]=useState('')

  const searchHandler = (e) => {
    e.preventDefault();

    navigate(`/products?search=${search}`)
  };

  useEffect(()=>{
    setSearch(searchParams.get('search') ?? '')
  },[searchParams])

  return (
    <form onSubmit={searchHandler} className="search-bar">
      <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text"  placeholder="Type to search" name="q" />
      <button type="submit">
        <img src={searchIcon} alt="search"/>
      </button>
    </form>
  );
};

export default SearchBar;
