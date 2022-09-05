import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import HeaderCartButton from "./HeaderCartButton";
import "./NavLinks.css";

const NavLinks = (props) => {
  const { isLoggedIn ,image,name} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const logout = () => {
    dispatch(authActions.logout());
  };

  const cartClickHandler = () => {
    navigation("/shoppingCart", { replace: true });
  };

  return (
    <ul className="nav-links">
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">
            Sign <span style={{ color: "rgb(158, 172, 255)" }}>in</span>
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <React.Fragment>
          <li>
            <div style={{ textAlign: "center",position:"relative" }} >
              {image && <img className="profile" src={`${process.env.REACT_APP_ASSET_URL}/${image}`} />}
              <span style={{color:"white"}}>
                Hello, {name}
              </span>
            </div>
          </li>
          <li>
            <button onClick={logout}>
              Sign <span style={{ color: "rgb(158, 172, 255)" }}>out</span>
            </button>
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
