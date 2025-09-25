// src/components/ProductDetailsView.tsx
import { useParams, Link } from "react-router-dom";
// Import the whole module so we can support both named and default exports
import * as ProductsModule from "../products";

// Safe accessors that work whether products.js uses named OR default exports
const getById =
  (ProductsModule as any).getProductById ??
  (ProductsModule as any).default?.getProductById;

export default function ProductDetailsView() {
  // Type the param so TS knows it's string | undefined
  const { id } = useParams<{ id: string }>();

  const product = id ? getById?.(id) ?? null : null;

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Product Not Found</h2>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "20px" }}>
          <img src="http://via.placeholder.com/400x400" alt="Placeholder" />
        </div>
        <div>
          <h3>${product.price}</h3>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p>In Stock: {product.stock} pcs</p>
          <p>Rating: {product.rating} / 5.0</p>

          {/* Static button per assignment */}
          <div style={{ marginTop: "20px" }}>
            <button>Add to Cart</button>
          </div>

          <div style={{ marginTop: "20px" }}>
            <Link to="/">Back to Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
