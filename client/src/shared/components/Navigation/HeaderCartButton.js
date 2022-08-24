import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// import CartIcon from '../../../Cart/CartIcon';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./HeaderCartButton.css";
import { sendCartData } from "../../store/cart-actions";

let isInitial = true;

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // const numberOfCartItems = items.reduce((curNumber, item) => {
  //   return curNumber + item.amount;
  // }, 0);

  const btnClasses = `cart-button`;

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      console.log("changed")
      dispatch(sendCartData(cart));
    }
  }, [cart]);

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
    <button className={btnClasses} onClick={props.onClick}>
      <span className="icon">
        {/* <CartIcon /> */}
        <ShoppingCartOutlinedIcon style={{ fontSize: "30px" }} />
      </span>
      <span>Cart</span>
      <span
        className={`badge ${btnIsHighlighted ? "bump" : ""} ${
          cart.totalQuantity > 9 ? "move-badge__left" : ""
        }`}
      >
        {cart.totalQuantity}
      </span>
    </button>
  );
};

export default HeaderCartButton;
