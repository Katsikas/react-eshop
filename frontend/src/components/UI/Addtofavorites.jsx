import { useContext } from "react";
import { patchIsFavoriteProduct } from "../../services/productsApi";
import ProductsContext from "../../context/ProductsContext";

export default function AddToFavorites({ product }) {
  const { setProducts } = useContext(ProductsContext);

  async function handleAddFavorite() {
    try {
      const response = await patchIsFavoriteProduct(
        product,
        !product.is_favorite,
      );

      if (response.status === 200) {
        setProducts((prev) => {
          const productToUpdate = prev.find((p) => p.id === product.id);
          const indexOfProduct = prev.indexOf(productToUpdate);

          prev[indexOfProduct] = {
            ...productToUpdate,
            is_favorite: !product.is_favorite,
          };

          return [...prev];
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const imageSrc = product.is_favorite ? "/heart_filled.svg" : "/heart.svg";

  return (
    <button onClick={handleAddFavorite}>
      <img
        src={imageSrc}
        height={25}
        width={25}
        alt="Favorite icon"
        className="favorite-icon"
      />
    </button>
  );
}
