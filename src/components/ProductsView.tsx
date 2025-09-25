// src/components/ProductsView.tsx
import styles from "./ProductsView.module.css";
import Product from "./Product";
// Import the whole module so we support both named and default exports
import * as ProductsModule from "../products";

const getAll =
  (ProductsModule as any).getAllProducts ??
  (ProductsModule as any).default?.getAllProducts;

export default function ProductsView() {
  const products = getAll ? getAll() : [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shop Products</h1>
      <div className={styles.products}>
        {products.map((p: any) => (
          <Product
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            imagePath="http://via.placeholder.com/200x200"
          />
        ))}
      </div>
    </div>
  );
}
