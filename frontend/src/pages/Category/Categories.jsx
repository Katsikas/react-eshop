import { useContext } from "react";
import Header from "../../components/UI/Header";
import ProductsContext from "../../context/ProductsContext";
import { Link } from "react-router-dom";

export default function CategoriesPage() {
  const { products } = useContext(ProductsContext);

  const all_categories_obj = products.flatMap((p) => p.categories);

  const set_of_categories = [
    ...new Set(all_categories_obj.map((c) => c.cat_name)),
  ];

  return (
    <>
      <Header />
      <div className="categories-page">
        <div className="categories-grid">
          {set_of_categories.map((cat) => (
            <article className="category" key={cat}>
              <h3>{cat}</h3>
              <p>See all products for {cat}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
