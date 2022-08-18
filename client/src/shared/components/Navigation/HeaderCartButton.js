import { useContext, useEffect, useState } from 'react';
import {useSelector} from "react-redux"

// import CartIcon from '../../../Cart/CartIcon';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './HeaderCartButton.css';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  // const cartCtx = useContext(CartContext);

  // const { items } = cartCtx;

  // const numberOfCartItems = items.reduce((curNumber, item) => {
  //   return curNumber + item.amount;
  // }, 0);

  const btnClasses=`cart-button ${btnIsHighlighted ? "bump" : ''}`

  // useEffect(() => {
  //   if (items.length === 0) {
  //     return;
  //   }
  //   setBtnIsHighlighted(true);

  //   const timer = setTimeout(() => {
  //     setBtnIsHighlighted(false);
  //   }, 300);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className="icon">
        {/* <CartIcon /> */}
        <ShoppingCartOutlinedIcon style={{fontSize:"30px"}}  />
      </span>
      <span>Cart</span>
      {/* {numberOfCartItems} */}
      <span className="badge">3</span>
      
    </button>
  );
};

export default HeaderCartButton;
