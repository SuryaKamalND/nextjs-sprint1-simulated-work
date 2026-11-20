// Mock product data shared by the /products routes.
export type Product = { name: string; price: number; reviews: string[] };

export const products: Record<string, Product> = {
  "shoe-001": { name: "Running Shoes", price: 99.99, reviews: ["Very comfy!", "Great for long runs."] },
  "shirt-001": { name: "T-Shirt", price: 29.99, reviews: ["Soft fabric."] },
  "hat-001": { name: "Baseball Cap", price: 19.99, reviews: [] },
};
