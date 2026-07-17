import AddToFavorites from "./UI/Addtofavorites";
import { currencyFormatter } from "../services/formatting";
import { Link } from "react-router-dom";
import AddToCart from "./CartUI/AddToCart";

const ProductCard = ({ product, isCategoryPage }) => {
  return (
    <div className="product-card">
      {product.all_tags.length > 0 && (
        <div className={`tag-con ${product.all_tags[0].caption}-tag`}>
          {product.all_tags[0].caption}
        </div>
      )}
      <div className="product-image">
        <AddToFavorites product={product} />
        <img
          src={product.image}
          height={145}
          width={145}
          loading="lazy"
          alt={product.title}
        />
      </div>
      <div className="product-details">
        <div className="upper-part">
          <h3 className="product-card-title">{product.title}</h3>
          {!isCategoryPage &&
            product.categories.map((cat) => (
              <Link
                key={cat.id}
                to={`categories/${cat.slug}`}
                className="category"
              >
                {cat.cat_name.toUpperCase()}
              </Link>
            ))}
        </div>

        <div className="lower-part">
          <p className="price">{currencyFormatter.format(product.price)}</p>
          <div className="add-to-cart">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
