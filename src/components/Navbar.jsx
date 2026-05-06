import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar=()=>{
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({totalItems})</Link>
    </nav>
  );
}

export default Navbar;