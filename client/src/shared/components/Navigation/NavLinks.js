import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
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

  const logout = () => {
    dispatch(authActions.logout());
  };

  return (
    <ul className="nav-links">
      {/* {cartIsShown && <Cart onClose={hideCartHandler} />} */}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">
            Sign <span style={{ color: "#f08804" }}>in</span>
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <React.Fragment>
          <li>
            <button onClick={logout}>Sign <span style={{ color: "#f08804" }}>out</span></button>
          </li>
          <li>
            <HeaderCartButton />
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
