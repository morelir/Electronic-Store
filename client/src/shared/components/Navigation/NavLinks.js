import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {authActions} from "../../store/auth-slice"
import HeaderCartButton from "./HeaderCartButton";
import "./NavLinks.css";

const NavLinks = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const logout=()=>{
    dispatch(authActions.logout());
  }

  return (
    <ul className="nav-links">
      {/* {cartIsShown && <Cart onClose={hideCartHandler} />} */}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Sign <span style={{color:"#f08804"}}>in</span></NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={logout}>Sign out</button>
        </li>
      )}
      <li>
        <HeaderCartButton />
      </li>
    </ul>
    // <ul className="nav-links">
    //   <li>
    //     <NavLink to="/" exact>
    //       ALL USERS
    //     </NavLink>
    //   </li>
    //   {auth.isLoggedIn && (
    //     <li>
    //       <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
    //     </li>
    //   )}
    //   {auth.isLoggedIn && (
    //     <li>
    //       <NavLink to="/places/new">ADD PLACE</NavLink>
    //     </li>
    //   )}
    //   {!auth.isLoggedIn && (
    //     <li>
    //       <NavLink to="/auth">AUTHENTICATE</NavLink>
    //     </li>
    //   )}
    //   {auth.isLoggedIn && (
    //     <li>
    //       <button onClick={auth.logout}>LOGOUT</button>
    //     </li>
    //   )}
    // </ul>
  );
};

export default NavLinks;
