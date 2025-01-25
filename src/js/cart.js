import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  cartItems.forEach((item) => {
    if (!item.Quantity) {
      item.Quantity = 1;
    }
  });

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", removeFromCartHandler);
  });

  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", increaseQuantityHandler);
  });

  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", decreaseQuantityHandler);
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <div class="quantity-controls">
      <button class="decrease-quantity" data-id="${item.Id}">-</button>
      <button class="increase-quantity" data-id="${item.Id}">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice * item.Quantity}</p>
    <button class="remove-from-cart" data-id="${item.Id}">X</button>
  </li>`;

  return newItem;
}

function removeFromCartHandler(event) {
  const productId = event.target.dataset.id;
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter((item) => item.Id !== productId);
  setLocalStorage("so-cart", cart);
  renderCartContents();
}

function increaseQuantityHandler(event) {
  const productId = event.target.dataset.id;
  changeQuantity(productId, 1);
}

function decreaseQuantityHandler(event) {
  const productId = event.target.dataset.id;
  changeQuantity(productId, -1);
}

function changeQuantity(productId, change) {
  let cart = getLocalStorage("so-cart") || [];
  const itemIndex = cart.findIndex((item) => item.Id === productId);

  if (itemIndex !== -1) {
    cart[itemIndex].Quantity += change;

    if (cart[itemIndex].Quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }

  setLocalStorage("so-cart", cart);
  renderCartContents();
}

document.addEventListener("DOMContentLoaded", function () {
  renderCartContents();
});
