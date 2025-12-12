import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

const loadProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Failed to load products:", error);
    const container = document.getElementById("products-container");
    if (container) {
      container.innerHTML =
        "<p>Mahsulotlarni yuklab bo'lmadi. Iltimos, keyinroq urinib ko'ring.</p>";
    }
  }
};

const renderProducts = (products) => {
  const container = document.getElementById("products-container");

  if (!container) return;

  console.log("Rendering products:", products);

  container.innerHTML = products
    .map((product) => {
      console.log(`Product ${product.id} image URL:`, product.image);

      return `
      <div class="product-card">
        <div class="product-image-container">
          <img 
            src="${product.image}" 
            alt="${product.title}" 
            class="product-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='https://via.placeholder.com/300x300?text=Image+Not+Available';"
          >
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button 
            onclick="window.addToCart(${JSON.stringify({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            }).replace(/"/g, "&quot;")})"
            class="add-to-cart"
            aria-label="Add to cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
           Add to cart
          </button>
        </div>
      </div>`;
    })
    .join("");
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadProducts);
} else {
  loadProducts();
}
