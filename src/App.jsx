import { useState, useEffect, useCallback, useRef } from "react";
import "normalize.css";
import "./App.css";
import CartList from "./components/CartList";

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};

const App = () => {
  const [cart, setCart] = useState(getInitialCart);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === productId);
      if (index > -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      }
      return prevCart;
    });
  }, []);

  const handleRemoveFromCart = useCallback(
    (id, newCart) => {
      if (newCart) {
        setCart(newCart);
      } else {
        removeFromCart(id);
      }
    },
    [removeFromCart]
  );

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  useEffect(() => {
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;

    return () => {
      delete window.addToCart;
      delete window.removeFromCart;
    };
  }, [addToCart, removeFromCart]);

  const cartSectionRef = useRef(null);
  const [showFloatingCart, setShowFloatingCart] = useState(false);

  // Show/hide floating cart button based on screen size
  useEffect(() => {
    const handleResize = () => {
      setShowFloatingCart(window.innerWidth < 768); // Show on mobile screens
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToCart = () => {
    if (cartSectionRef.current) {
      cartSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });

      // Small delay to ensure the smooth scroll is complete before focusing
      setTimeout(() => {
        cartSectionRef.current?.focus({ preventScroll: true });
      }, 800);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mini Marketplace</h1>
      </header>
      <main className="main-content">
        <section className="products-section">
          <h2>Products</h2>
          <div id="products-container" className="products-grid"></div>
        </section>

        <CartList
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onAddToCart={addToCart}
          onClearCart={handleClearCart}
          ref={cartSectionRef}
        />
      </main>

      {showFloatingCart && (
        <button
          className="floating-cart-btn"
          onClick={scrollToCart}
          aria-label="View cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      )}
    </div>
  );
};

export default App;
