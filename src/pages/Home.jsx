import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductList from "../features/products/productList";
import useDebounce from "../hooks/useDebounce";

const Home=()=>{
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const debouncedSearch =useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter(
    (item) => {
      return item.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()
        );
    }
  );

  return (
    <div>
      <input type="text" placeholder="Search products" onChange={(e) =>setSearch(e.target.value) } />

      <button onClick={() => setView("grid")} >Grid</button>

      <button onClick={() => setView("list")}>List</button>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ProductList
          key={debouncedSearch}
          products={filteredProducts}
          view={view}
        />
      )}
    </div>
  );
}

export default Home;
