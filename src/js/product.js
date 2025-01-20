import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { setLocalStorage, getParam } from "./utils.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.getProductById(this.productId);
    this.renderProductDetails();
  }

  addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(this.product);
    setLocalStorage("cart", cart);
  }

  renderProductDetails() {
    const productList = document.querySelector("ul.product-list");
    if (!productList) {
      console.error('No "product-list" found in the HTML.');
      return;
    }

    const productHTML = `
      <li class="product-item">
        <h2>${this.product.name}</h2>
        <p>${this.product.description}</p>
        <p>Price: $${this.product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </li>
    `;

    productList.innerHTML = productHTML;
    const addToCartButton = productList.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => this.addToCart());
  }
}
