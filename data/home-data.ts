import { productCategories, products } from "./products";

export const categories = [...productCategories];

export const trendingProducts = products.filter((product) => product.trending).slice(0, 8);

export const newArrivals = products
  .filter((product) => product.newArrival)
  .sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  .slice(0, 8);

export const featuredProducts = products.filter((product) => product.featured).slice(0, 6);