import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productsApi";
import ProductGrid from "../components/ProductGrid";
import NavBar from "../components/NavBar";
import Filters from "../components/Filters";
import Loader from "../components/Loader";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function getProductsAndCategories() {
      setLoading(true);

      try {
        const productsData = await fetchProducts();

        setProducts(productsData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getProductsAndCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categories === selectedCategory)
    : products;

  const all_categories_obj = products.flatMap((p) => p.categories);

  const set_of_categories = [
    ...new Set(all_categories_obj.map((c) => c.cat_name)),
  ];

  return (
    <>
      <NavBar
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
