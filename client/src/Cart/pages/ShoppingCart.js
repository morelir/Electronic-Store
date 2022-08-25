import React,{useEffect,useState} from "react" ;
import {useSelector} from "react-redux";
import {useHttpClient} from "../../shared/hooks/http-hook.js"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import CartProducts from "../components/CartProducts";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";



const ShoppingCart=(props)=>{

  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const cart = useSelector(state=>state.cart);
  console.log(cart.products)
    
    console.log(cart.id)
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/cart/${cart.id}/products`,'GET',headers:{
            
          }
        );
        setLoadedProducts(responseData.products);
      } catch (err) {}
    };
    fetchProductsByCategory();
  }, [sendRequest]);


  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {loadedProducts && (
                <CartProducts products={cart.products}/>
            )}
        </React.Fragment>
    )


}

export default ShoppingCart