import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty
} from "../features/cart/cartSlice";

const CartPage=()=>{
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const subtotal = cartItems.reduce(
    (acc, item) =>  acc + item.price * item.quantity, 0 );

  const gst = subtotal * 0.1;
  const total = subtotal + gst;

  return (
    <div>
      <h2>Cart Page</h2>

      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>

          <p>Qty: {item.quantity}</p>

          <button onClick={() =>dispatch(increaseQty(item.id)) } >+</button>

          <button onClick={() =>dispatch(decreaseQty(item.id))}> - </button>

          <button onClick={() =>dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}

      <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>
      <h3>GST: ₹{gst.toFixed(2)}</h3>
      <h2>Total: ₹{total.toFixed(2)}</h2>
    </div>
  );
}

export default CartPage;