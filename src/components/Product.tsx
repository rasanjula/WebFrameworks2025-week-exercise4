import React from "react";
import styles from "./Product.module.css";

/* This component is used to display a single product in the products view. */

export default function Product({ id, imagePath, name, price }) {
  return (
    <div className={styles.product} key={id} data-testid={`product-${id}`}>
      <img src={imagePath} alt="Placeholder" />
      <div>{name}</div>
      <div>${price}</div>
      <div>
        {/* Replace anchor element with router Link */}
        <a href="#">View Details</a>
      </div>
    </div>
  );
}
