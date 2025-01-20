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
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-from-cart" data-id="${item.Id}">X</button>
  </li>`;

  return newItem;
}

document.addEventListener("DOMContentLoaded", function () {
  renderCartContents(); // I am first rendering all cart content
});

function removeFromCartHandler(event) {
  const productId = event.target.dataset.id;
  removeFromCart(productId);
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("so-cart"));
  if (!Array.isArray(cart)) {
    cart = []; //
  }

  // Find the item by productId
  const itemIndex = cart.findIndex((item) => item.Id === productId);

  if (itemIndex !== -1) {
    // If the item exists quantity is more than 1, it will minus 1
    if (cart[itemIndex].Quantity > 1) {
      cart[itemIndex].Quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
  }

  setLocalStorage("so-cart", cart);

  renderCartContents();
}
