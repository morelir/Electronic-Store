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
    if(search.trim().length === 0) return;
    
    navigate(`/products?search=${search}`)
    // searchParams.set('search',search)
    // setSearch(search, {
    //   replace: true,
    // });
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
