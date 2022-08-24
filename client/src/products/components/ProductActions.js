import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../shared/store/cart-slice";
import Input from "../../shared/components/UIElements/Input";
import "./ProductActions.css";

let finalPrice;

const ProductActions = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const dispatch = useDispatch();


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

    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        price: finalPrice,
        amount: enteredAmountNumber,
      })
    );

    // const addToCartHandler = amount => {
    //   cartCtx.addItem({
    //     id: props.id,
    //     name: props.name,
    //     amount: amount,
    //     price: props.price
    //   });
    // };

    // props.onAddToCart(enteredAmountNumber);
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
      <button>Add to Cart</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default ProductActions;
