import React from "react" ;
import CartProduct from "./CartProduct";


const CartProducts=(props)=>{
    
    console.log(props.products[0].product)
    
    return(
        <ul>
        {props.products.map((prod)=>{
          
            return <CartProduct key={prod.product.id} amount={prod.amount} title={prod.product.title} />
            
        })}
        </ul>
        
    )


}

export default CartProducts