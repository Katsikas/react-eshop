import { useContext, useState } from "react";

import ProductGrid from "../components/ProductGrid";
import Filters from "../components/Filters";
import Loader from "../components/UI/Loader";
import Header from "../components/UI/Header";
import ProductsContext from "../context/ProductsContext";

const ProductsPage = () => {
  const { products, loading, error } = useContext(ProductsContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categories[0].cat_name === selectedCategory)
    : products;

  const all_categories_obj = products.flatMap((p) => p.categories);

  const set_of_categories = [
    ...new Set(all_categories_obj.map((c) => c.cat_name)),
  ];

  return (
    <>
      <Header
        categories={set_of_categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onClearFilters={handleClearFilters}
      />
      {filteredProducts && (
        <Filters
          categories={set_of_categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onClearFilters={handleClearFilters}
        />
      )}
      <div className="main">
        {loading && <Loader />}
        {error && (
          <div className="error-con">
            <p>{error}</p>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && <ProductGrid products={filteredProducts} />}
      </div>
    </>
  );
};

export default ProductsPage;
