import { useCallback, useState } from "react";
import ProductCard from "./ProductCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const ProductList=({ products, view })=>{
  const [visibleProductsCount, setvisibleProductsCount]=useState(6);

  const visibleProducts = products.slice(0,visibleProductsCount);
  const hasMore = visibleProductsCount < products.length;

  const loadMoreProducts = useCallback(() => {
    setvisibleProductsCount((prevCount) =>
      Math.min(prevCount + 6, products.length)
    );
  },[products.length]);

  const scrollRef = useInfiniteScroll(loadMoreProducts,hasMore);

  return (
    <>
      <div className={view === "grid" ? "grid" : "list"}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>

      {hasMore && (
        <div ref={scrollRef} className="loading-more">
          Loading more products...
        </div>
      )}
    </>
  );
}

export default ProductList;
