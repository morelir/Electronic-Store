import React, { useState, useRef, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../shared/store/cart-slice";
import { sendCartData } from "../../shared/store/cart-actions";
import Input from "../../shared/components/UIElements/Input";
import "./ProductActions.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

let finalPrice;

const ProductActions = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const cartIsLoading = useSelector((state) => state.cart.isLoading);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    if (props.discount) {
      finalPrice = (1 - props.discount / 100) * props.listPrice;
    } else {
      finalPrice = props.listPrice;
    }
  }, []);

  const submitHandler = (event) => {
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
    }
    if (auth.isLoggedIn) {
      dispatch(
        sendCartData(props.id, finalPrice, enteredAmountNumber, auth.token)
      );
    }
    else{
      navigate(`/auth`,{replace:true})
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
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
      {!cartIsLoading && <button>Add to Cart</button>}
      {cartIsLoading && <LoadingSpinner />}

      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default ProductActions;
