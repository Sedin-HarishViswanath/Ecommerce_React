import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { useEffect } from "react";
import { fetchProducts } from "./productSlice";

const ProductDetail=()=> {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const product = useSelector((state) =>
    state.products.items.find(
      (item) => item.id === Number(id)
    )
  );

  if (loading || items.length === 0) {
    return <h2>Loading...</h2>;
  }

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="detail">
      <img src={product.image} alt="" />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <p>₹{product.price}</p>

      <button
        disabled={product.stock <= 0}
        onClick={() =>
          dispatch(addToCart(product))
        }
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductDetail;
