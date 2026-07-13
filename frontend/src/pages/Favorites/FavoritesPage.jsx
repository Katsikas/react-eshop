import { useContext } from "react";
import ProductGrid from "../../components/ProductGrid";
import Header from "../../components/UI/Header";
import ProductsContext from "../../context/ProductsContext";
import Loader from "../../components/UI/Loader";

export default function FavoritesPage() {
  const { products, loading, error } = useContext(ProductsContext);

  const fav_products = products.filter((p) => p.is_favorite);

  const errorContent = (
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
  );

  return (
    <>
      <Header />
      <div className="favorites-hero">
        <h1>My Favorites</h1>
      </div>
      {!loading && (
        <ProductGrid products={fav_products} isCategoryPage={false} />
      )}
      {loading && <Loader />}
      {error && errorContent}
    </>
  );
}
