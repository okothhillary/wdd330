import { findProductById } from "./ProductData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // Fetch product details based on productId
  product = await findProductById(productId);
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
}


async function addToCartHandler() {
  const product = await findProductById(document.getElementById("addToCart").dataset.id);
  addToCart(product);
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  if (!Array.isArray(cart)) {
    cart = [];
  }

  const existingProductIndex = cart.findIndex(item => item.Id === product.Id);
  
  if (existingProductIndex !== -1) {
    const existingProduct = cart[existingProductIndex];
    existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
  } else {
    const newProduct = { ...product, Quantity: 1 };
    cart.push(newProduct);
  }

  setLocalStorage("so-cart", cart);
}


function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
