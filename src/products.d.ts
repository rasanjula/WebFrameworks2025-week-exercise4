// src/products.d.ts

export type Product = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
};

/**
 * Declare the JS module so TS knows its exports.
 * We declare both forms to match imports with/without .js.
 */
declare module "../products" {
  export function getProductById(id: string | number): Product | null | undefined;
  export function getAllProducts(): Product[];
}

declare module "../products.js" {
  export function getProductById(id: string | number): Product | null | undefined;
  export function getAllProducts(): Product[];
}
