import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //passing cart to ensure it's an array; fix for add to cart button not working.
  let cart = JSON.parse(localStorage.getItem("so-cart"));
  if (!Array.isArray(cart)) {
    cart = []; // creating empty cart
  }
  cart.push(product);

  setLocalStorage("so-cart", cart);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
