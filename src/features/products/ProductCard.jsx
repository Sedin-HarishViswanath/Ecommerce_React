import { Link } from "react-router-dom";
import { stockMessage } from "../../utils/stockHelper";

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} width="150" />

      <h3>{product.title}</h3>

      <p>₹{product.price}</p>

      <p>{stockMessage(product.stock)}</p>

      <Link to={`/product/${product.id}`}>
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;