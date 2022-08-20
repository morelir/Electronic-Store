import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import StoreProducts from "./products/pages/StoreProducts";
import ProductDetail from "./products/pages/ProductDetail";
import Auth from "./auth/Auth";
import Category from "./products/pages/Category";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/:categoryId/products" element={<StoreProducts />} />
          <Route
            path="/:categoryId/products/:productId"
            element={<ProductDetail />}
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
