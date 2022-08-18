import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import Cart from "../../../Cart/Cart";
import HeaderCartButton from "./HeaderCartButton";
// import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  // const auth = useContext(AuthContext);
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };


  return (
    <ul className="nav-links">
      {/* {cartIsShown && <Cart onClose={hideCartHandler} />} */}
      <li>
        <NavLink to="/auth">Sign in</NavLink>
      </li>
      <li><HeaderCartButton onClick={props.onShowCart} /></li>
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
