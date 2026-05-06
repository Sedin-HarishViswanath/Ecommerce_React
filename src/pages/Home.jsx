import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories, setSelectedCategory } from "../features/products/productSlice";
import ProductList from "../features/products/productList";
import useDebounce from "../hooks/useDebounce";

const Home=()=>{
  const dispatch = useDispatch();

  const { items, loading, categories, selectedCategory } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const debouncedSearch =useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = items.filter(
    (item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    }
  );

  return (
    <div>
      <input type="text" placeholder="Search products" onChange={(e) =>setSearch(e.target.value) } />

      <div className="filter-container">
        <h3>Categories</h3>
        <button 
          className={selectedCategory === "all" ? "active" : ""} 
          onClick={() => dispatch(setSelectedCategory("all"))}
        >
          All
        </button>
        {categories.map((category) => (
          <button 
            key={category} 
            className={selectedCategory === category ? "active" : ""}
            onClick={() => dispatch(setSelectedCategory(category))}
          >
            {category}
          </button>
        ))}
      </div>

      <button onClick={() => setView("grid")} >Grid</button>

      <button onClick={() => setView("list")}>List</button>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ProductList
          key={debouncedSearch + selectedCategory}
          products={filteredProducts}
          view={view}
        />
      )}
    </div>
  );
}

export default Home;
