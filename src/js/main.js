import { getData, findProductById } from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = { getData, findProductById };
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();
