import { useContext } from "react";
import Header from "../../components/UI/Header";
import ProductsContext from "../../context/ProductsContext";
import { Link } from "react-router-dom";

export default function CategoriesPage() {
  const { products } = useContext(ProductsContext);

  const all_categories_obj = products.flatMap((p) => p.categories);

  const categories = [...new Set(all_categories_obj.map((c) => c.cat_name))];

  const slugs = [...new Set(all_categories_obj.map(({ slug }) => slug))];

  const category_with_slug = categories.map((cat, index) => {
    return { name: cat, slug: slugs[index] };
  });

  return (
    <>
      <Header />
      <div className="categories-page">
        <div className="categories-grid">
          {category_with_slug.map(({ name, slug }) => (
            <article className="category" key={slug}>
              <div className="cat-title">
                <h3>{name}</h3>
              </div>
              <div className="cat-details">
                <Link to={slug}>See all products for {name}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
