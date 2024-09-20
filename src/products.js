const products = [
    {
      id: 1,
      name: "Product A",
      price: 29.99,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Electronics",
      stock: 10,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Product B",
      price: 49.99,
      description:
        "Suspendisse potenti. In tincidunt nisl massa, at efficitur magna laoreet a.",
      category: "Clothing",
      stock: 15,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Product C",
      price: 19.99,
      description:
        "Pellentesque eu luctus nisl, at fringilla sem. Curabitur sed est in odio lacinia scelerisque.",
      category: "Books",
      stock: 8,
      rating: 4.8,
    },
    {
      id: 4,
      name: "Product D",
      price: 39.99,
      description:
        "Donec interdum massa nec risus dictum, non feugiat urna tincidunt.",
      category: "Home Decor",
      stock: 12,
      rating: 4.3,
    },
    {
      id: 5,
      name: "Product E",
      price: 59.99,
      description:
        "Vivamus volutpat elit ac consectetur elementum. Curabitur auctor euismod odio, id volutpat urna euismod vitae.",
      category: "Beauty",
      stock: 7,
      rating: 4.6,
    },
  ];
  
  // Dummy function for fetching product details (this would be replaced by an API call in a real-world app)
  export const getProductById = (id) => {
    return products.find((product) => product.id === parseInt(id, 10));
  };
  
  // Dummy function for fetching all products (this would be replaced by an API call in a real-world app)
  export const getAllProducts = () => {
    return products;
  };
  