import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import SearchBar from "../UIElements/SearchBar";
import close from "../../images/close.svg"

import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} >
        <img onClick={closeDrawerHandler} className="close-img" src={close} alt=""/>

        <div className="search-bar__drawer-search">
          <SearchBar className="search-bar__drawer-search" onClick={closeDrawerHandler} />
        </div>
        <nav className="main-navigation__drawer-nav" >
          <NavLinks onClick={closeDrawerHandler} />
        </nav>
      </SideDrawer>

      <MainHeader>
        <h1 className="main-navigation__title">
          <Link to="/">
            <span>Electronic</span>{" "}
            <span style={{ color: "#9eacff" }}>Store</span>
          </Link>
        </h1>
        <div className="search-bar__header-search">
          <SearchBar />
        </div>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>

        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
