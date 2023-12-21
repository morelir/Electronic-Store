import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../shared/store/cart-slice";
import { sendCartData } from "../../shared/store/cart-actions";
import Input from "../../shared/components/UIElements/Input";
import "./ProductActions.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import { CircularProgress } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useHttpClient } from "../../shared/hooks/http-hook";

let finalPrice;

const ProductActions = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const cartLoading = useSelector((state) => state.cart.isLoading);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { sendRequest, isLoading: buyNowLoading } = useHttpClient();

  useEffect(() => {
    if (props.discount) {
      finalPrice = (1 - props.discount / 100) * props.listPrice;
    } else {
      finalPrice = props.listPrice;
    }
  }, []);

  const cartHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    } else {
      setAmountIsValid(true);
    }

    dispatch(
      sendCartData(
        `${process.env.REACT_APP_BACKEND_URL}/cart/product/${props.id}`,
        "PUT",
        JSON.stringify({
          productId: props.id,
          price: finalPrice,
          amount: enteredAmountNumber,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      )
    );
  };

  const buyNowHandler = async (event) => {
    event.preventDefault();
    const enteredAmountNumber = +amountInputRef.current.value;

    const stripe = await loadStripe(
      "pk_test_51ONDiPEqc6N02Fa4KOnciIZNIm5Hk9JYxdjHIF5sv7o3LPO7eS6IsWTgSOiimgSkiaJ1NvmsA67jhYljBubsFlsR00BpCBeF9A"
    );

    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/bookings/checkout-session`,
      "POST",
      JSON.stringify({
        prodId: props.id,
        prodAmount: enteredAmountNumber,
        fallbackUrl: window.location.href,
      }),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    );

    const result = stripe.redirectToCheckout({
      sessionId: responseData.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <form className="product-detail__actions">
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <div className="btn-container">
        {auth.isLoggedIn ? (
          <>
            <Button
              className="cart-btn"
              disabled={cartLoading}
              onClick={cartHandler}
            >
              {!cartLoading ? "Add to Cart" : "Processing..."}
            </Button>
            <Button
              className="buy-now-btn"
              disabled={buyNowLoading}
              onClick={buyNowHandler}
            >
              {!buyNowLoading ? "Buy Now" : "Processing..."}
            </Button>
          </>
        ) : (
          <Button to="/auth">Login to Buy</Button>
        )}
      </div>

      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default ProductActions;
