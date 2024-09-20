import React from "react";
import styles from "./ProductsView.module.css";
import { getAllProducts } from "../products";
import Product from "./Product";

const ProductsView = () => {
  const products = getAllProducts();

  return (
    <div>
      <h1>Shop Products</h1>
      <div className={styles.products}>
        {products.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            id={product.id}
            price={product.price}
            imagePath="http://via.placeholder.com/200x200"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsView;
