import React,{useState} from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ProductList from "../components/ProductList";
import p1_image from "../../shared/images/81bc8mA3nKL._AC_SL1500_.jpg"
import p2_image from "../../shared/images/81cP2qZckeL._AC_SL1500_.jpg"
import p3_image from "../../shared/images/71CMCq8IMFL._AC_SL1500_.jpg"

const DUMMY_PRODUCTS=[
    {
        id:"p1",
        title:`Acer Nitro 5 AN515-55-53E5 Gaming Laptop | Intel Core i5-10300H | NVIDIA GeForce RTX 3050 Laptop GPU | 15.6" FHD 144Hz IPS Display | 8GB DDR4 | 256GB NVMe SSD | Intel Wi-Fi 6 | Backlit Keyboard`,
        rating:4.5,
        image:p1_image,
        price:730,
        discount:15,
        
    },

    {
        id:"p2",
        title:`MSI GV15 15.6" 144Hz Gaming Laptop: Intel Core i5-11400H GTX 1650 8GB 256GB NVMe SSD, Wi-Fi 6, USB Type-C, Nahimic 3 Audio Immersion, Win 11: Black 11SC-633 `,
        rating:4,
        image:p2_image,
        price:600,
        discount:0,

    },
    {
        id:"p3",
        title:`Razer Blade 17 Gaming Laptop: NVIDIA GeForce RTX 3080 Ti - 12th Gen Intel 14-Core i9 CPU - 17.3" 4K 144Hz - 32GB DDR5 RAM - 1TB PCIe SSD - Windows 11 - Chroma RGB - Thunderbolt 4 - SD Card Reader`,
        rating:4,
        image:p3_image,
        price:550,
        discount:25,

    }


]


const StoreProducts = () => {
  const [loadedProducts, setLoadedProducts] = useState();
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();

//   useEffect(() => {
//     const fetchPlacesByUserId = async () => {
//       try {
//         const responseData = await sendRequest(
//           `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
//         );
//         console.log(responseData);
//         setLoadedPlaces(responseData.places);
//       } catch (err) {}
//     };
//     fetchPlacesByUserId();
//   }, [sendRequest]);


  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {/* {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )} */}
      {/* {!isLoading && loadedProducts && ( */}
        <ProductList products={DUMMY_PRODUCTS} />
      {/* )} */}
    </React.Fragment>
  );
};

export default StoreProducts;
