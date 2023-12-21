import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./CartLink.css";
import { Link } from "react-router-dom";

const CartLink = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cart = useSelector((state) => state.cart);


  useEffect(() => {
    if (cart.totalQuantity === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [cart.totalQuantity]);

  return (
    <Link to={props.to} className="link-cart">
      <ShoppingCartOutlinedIcon style={{ fontSize: "2.2rem" }} />
      <span
        className={`amount ${btnIsHighlighted ? "bump" : ""} ${
          cart.totalQuantity > 9 ? "move-amount__left" : ""
        }`}
      >
        {cart.totalQuantity}
      </span>
    </Link>
  );
};

export default CartLink;
