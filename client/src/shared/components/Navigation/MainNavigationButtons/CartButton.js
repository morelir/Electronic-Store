import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./CartButton.css";

const CartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cart = useSelector((state) => state.cart);

  const btnClasses = `cart-button`;

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
    <button className={btnClasses}>
      <div className="container">
        <span className="icon">
          {/* <CartIcon /> */}
          <ShoppingCartOutlinedIcon style={{ fontSize: "30px" }} />
        </span>
        <span className="cart-name">Cart</span>
      </div>

      <span
        className={`amount ${btnIsHighlighted ? "bump" : ""} ${
          cart.totalQuantity > 9 ? "move-amount__left" : ""
        }`}
      >
        {cart.totalQuantity}
      </span>
    </button>
  );
};

export default CartButton;
