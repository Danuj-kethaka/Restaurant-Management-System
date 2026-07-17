"use client";
import React from "react";
import { useCart } from "../store/Cart/Cart.js";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="fw-bold">Your cart is empty</h2>
        <p className="text-muted">Browse our menu to add items.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Your Shopping Cart</h2>
      <div className="row g-4">
        
        {/* Cart Items List */}
        <div className="col-lg-8">
          {cart.map((item) => (
            <div key={item._id} className="card mb-3 shadow-sm border-0 rounded-3 p-3">
              <div className="row align-items-center g-3">
                <div className="col-3 col-md-2">
                  <img src={item.image} alt={item.name} className="img-fluid rounded-2 object-fit-cover" style={{ height: "60px", width: "60px" }} />
                </div>
                <div className="col-9 col-md-4">
                  <h5 className="mb-0 fw-semibold">{item.name}</h5>
                  <small className="text-muted">${Number(item.price).toFixed(2)} each</small>
                </div>
                <div className="col-6 col-md-3">
                  <div className="input-group input-group-sm" style={{ maxWidth: "120px" }}>
                    <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span className="form-control text-center bg-white">{item.quantity}</span>
                    <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="col-6 col-md-3 text-end d-flex align-items-center justify-content-between justify-content-md-end gap-3">
                  <span className="fw-bold text-dark">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="btn btn-sm btn-outline-danger border-0" onClick={() => removeFromCart(item._id)}>
                     Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-3 p-4 bg-light">
            <h4 className="fw-bold mb-3">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span className="fw-semibold">${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Delivery</span>
              <span className="text-success fw-medium">Free</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
              <span>Total</span>
              <span className="text-primary">${getCartTotal().toFixed(2)}</span>
            </div>
            <button className="btn btn-primary w-100 btn-lg rounded-3 fw-semibold">
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
