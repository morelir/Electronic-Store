import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import "./CartProducts.css";

const CartProducts = (props) => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="cart-products">
      <h1 className="header">
        Shopping <span style={{ color: "rgb(158, 172, 255)" }}>Cart</span>
      </h1>
      <ul className="product-list">
        {props.products.map((prod) => {
          return (
            <CartProduct
              key={prod.product._id}
              id={prod.product._id}
              removingId={prod._id}
              amount={prod.amount}
              title={prod.product.title}
              image={prod.product.images[0]}
              listPrice={prod.product.listPrice.toFixed(2)}
              discount={prod.product.discount}
              onAddProductToCart={props.onAddProductToCart}
              onRemoveProductFromCart={props.onRemoveProductFromCart}
              isLoading={props.isLoading}
            />
          );
        })}
      </ul>
      <h3 className="subtotal">
        
        Subtotal ({cart.totalQuantity} items):{" "}
        <span className="subtotal-price">${cart.totalAmount.toFixed(2)}</span>
      </h3>
    </div>
  );
};

export default CartProducts;
