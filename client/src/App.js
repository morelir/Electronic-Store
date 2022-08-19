import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import StoreProducts from "./products/pages/StoreProducts";
import ProductDetail from "./products/pages/ProductDetail";
import Auth from "./auth/Auth";
import Carousel from "./shared/components/UIElements/Carousel";

function App() {
  return (
    <Router>
      <MainNavigation />
      <Carousel/>
      <Routes>
        <Route path="/" element={<StoreProducts/>} />
        <Route path="/:productId" element={<ProductDetail/>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </Router>
  );
}

export default App;
