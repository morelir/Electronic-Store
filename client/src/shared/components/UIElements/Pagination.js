
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Pagination.css";

const createPages = (currentPage, totalPages, onPageClick) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Link
        key={i}
        onClick={(event) => onPageClick(event,i)}
        className={currentPage === i ? "clicked-page" : ""}
        to="/"
      >
        {i}
      </Link>
    );
  }
  return pages;
};

const Pagination = ({ totalPages, currentPage, previous, next }) => {
  const [search, setSearch] = useSearchParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(createPages(currentPage,  totalPages <= 2 ? totalPages : 2, pageClickHandler));
  }, [currentPage, totalPages]);

  const pageClickHandler =  (event,page) => {
    event.preventDefault();
    search.set("page", page.toString());
    setSearch(search, {
      replace: true,
    });
  };



  const nextPageHandler =  (event) => {
    event.preventDefault();
    search.set("page", (currentPage + 1).toString());
    setSearch(search, {
      replace: true,
    });
  };

  const prevPageHandler =  (event) => {
    event.preventDefault();
    search.set("page", (currentPage - 1).toString());
    setSearch(search, {
      replace: true,
    });
  };

  if (pages.length === 0) {
    return <></>;
  }
  return (
    <div className="pagination" data-testid="pagination-id">
      <button
        disabled={!previous}
        className="arrow-btn btn-left"
        onClick={prevPageHandler}
        to="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="btn-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <>{pages}</>

      <button
        disabled={!next}
        className="arrow-btn btn-right"
        onClick={nextPageHandler}
        to="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="btn-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
