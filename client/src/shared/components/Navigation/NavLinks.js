import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import HeaderCartButton from "./HeaderCartButton";
import "./NavLinks.css";

const NavLinks = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigate();
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

  const cartClickHandler=()=>{
    console.log("click")
    navigation("/shoppingCart",{replace:true})


  }

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
          <li onClick={cartClickHandler}>
            <HeaderCartButton />
          </li>

        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
