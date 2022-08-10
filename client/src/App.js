import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import StoreProducts from "./products/pages/StoreProducts";
import ProductDetail from "./products/pages/ProductDetail";

function App() {
  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<StoreProducts/>} />
        <Route path="/:productId" element={<ProductDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
