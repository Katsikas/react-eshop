import ProductCard from "./ProductCard";

const ProductGrid = ({ products, isCategoryPage }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          isCategoryPage={isCategoryPage}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
