import { BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import ProductDetail from "./features/products/ProductDetail";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;