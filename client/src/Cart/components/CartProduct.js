import React from "react" ;


const CartProduct=(props)=>{
    console.log(props.title)
    

    return(
        <li>
            {props.title}
        </li>
    )


}

export default CartProduct