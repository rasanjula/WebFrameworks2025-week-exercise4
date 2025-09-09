import React from "react";
import ProductsView from "./components/ProductsView";
import ProductDetailsView from "./components/ProductDetailsView";
import CartView from "./components/CartView";

const App = () => {
  return (
    <div>
      <nav>
        {/* Replace anchor elements with router Link */}
        <a href="#">Products</a>
        <a href="#">Cart</a>
      </nav>

      {/* Add react router routes here. See Router documentation how to define dynamic route segments:
          https://reactrouter.com/start/declarative/routing#dynamic-segments

          The idea is to have access to the product details with routes such as /products/1, /products/2, etc.where
          the last segment is the product id. 
          The id can then be used to fetch the product details in the ProductDetailsView component.
      */}
      <ProductsView />
      <ProductDetailsView />
      <CartView />
    </div>
  );
};

export default App;
