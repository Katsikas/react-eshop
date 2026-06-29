import { useParams } from "react-router-dom";
import { useContext } from "react";
import Header from "../../components/UI/Header";
import ProductsContext from "../../context/ProductsContext";
import Loader from "../../components/UI/Loader";
import ProductGrid from "../../components/ProductGrid";

export default function Category() {
  const { products, loading } = useContext(ProductsContext);
  const { category } = useParams();

  if (loading) {
    return <Loader />;
  }

  const all_categories_obj = products.flatMap((p) => p.categories);

  const categories = [
    ...new Set(all_categories_obj.map(({ cat_name }) => cat_name)),
  ];

  const slugs = [...new Set(all_categories_obj.map(({ slug }) => slug))];

  const category_with_slug = categories.map((cat, index) => {
    return { name: cat, slug: slugs[index] };
  });

  const filteredProducts = products.filter(
    (p) => p.categories[0].slug === category,
  );

  return (
    <>
      <Header />
      <div className="single-cat-page">
        <div className="single-cat-hero">
          <h1 className="cat-title">{category}</h1>
          <h4>Other Categories you may like:</h4>
          <ul className="cat-list">
            {category_with_slug.map(({ name, slug }) => {
              const isActive = slug === category;

              if (isActive) return;

              return (
                <li key={slug}>
                  <a href={slug}>{name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <ProductGrid products={filteredProducts} isCategoryPage />
      </div>
    </>
  );
}
