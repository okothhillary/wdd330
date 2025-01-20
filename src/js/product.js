import { getParam } from "./utils.mjs";
import productDetails from "./ProductDetails.mjs";

const productId = getParam("product");
productDetails(productId);

//should be working now and reflecting on netlify