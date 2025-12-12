import React, { useCallback } from "react";

const CartItem = ({ item, count, onRemove, onIncrement, onDecrement }) => {
  const handleRemove = useCallback(
    (e) => {
      e.stopPropagation();
      onRemove(item.id, null, true);
    },
    [item.id, onRemove]
  );

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDecrement(item.id);
              }}
              className="quantity-btn"
              aria-label="Decrease quantity"
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <span className="quantity">{count}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onIncrement(item);
              }}
              className="quantity-btn"
              aria-label="Increase quantity"
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
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          <span className="cart-item-price">
            ${(item.price * count).toFixed(2)}
            {count > 1 && (
              <span className="unit-price">${item.price.toFixed(2)} each</span>
            )}
          </span>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="remove-btn"
        aria-label={`Remove ${item.title}`}
        title="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
