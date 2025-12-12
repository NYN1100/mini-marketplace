import React from "react";
import CartItem from "./CartItem";

const CartList = React.forwardRef(
  ({ cart, onRemoveFromCart, onAddToCart, onClearCart }, ref) => {
    const cartItems = Object.entries(
      cart.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = { ...item, quantity: 0 };
        }
        acc[item.id].quantity++;
        return acc;
      }, {})
    );

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
      <section
        className="cart-section"
        ref={ref}
        tabIndex="-1"
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <div className="cart-header-content">
            <h2>
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
                className="cart-icon"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Your Cart{" "}
              <span className="item-count">
                ({cart.length} {cart.length === 1 ? "item" : "items"})
              </span>
            </h2>
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="clear-cart-btn"
                title="Clear cart"
                aria-label="Clear shopping cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="empty-cart-icon"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
              <p>Your cart is empty</p>
              <p className="empty-cart-hint">
                Add some products to get started
              </p>
            </div>
          ) : (
            <>
              <div className="cart-items-scroll">
                {cartItems.map(([id, item]) => (
                  <CartItem
                    key={id}
                    item={item}
                    count={item.quantity}
                    onRemove={() => {
                      // Remove all instances of this product from the cart
                      const newCart = cart.filter(
                        (cartItem) => cartItem.id !== item.id
                      );
                      onRemoveFromCart(item.id, newCart);
                    }}
                    onIncrement={() => onAddToCart(item)}
                    onDecrement={onRemoveFromCart}
                  />
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="cart-shipping">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="cart-grand-total">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" disabled={cart.length === 0}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
);

export default CartList;
