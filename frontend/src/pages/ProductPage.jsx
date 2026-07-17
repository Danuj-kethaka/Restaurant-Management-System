"use client";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMenuStore } from "../store/Menu/Menu.js";
import { useCart} from "../store/Cart/Cart.js";

export const Product = () => {
  const { id } = useParams();
  const { menus, getProduct } = useMenuStore();
  const { addToCart } = useCart();

  // Find product from store based on URL ID
  const product = menus.find((item) => item._id === id);

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id, getProduct]);


  if (!product) {
    return (
      <div className="container text-center my-5 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading details...</p>
      </div>
    );
  }

  return (
    <div className="container my-5 py-4 bg-white shadow-sm rounded-4">
      <div className="row g-5 align-items-center">
        
        {/* Left Column: Product Info */}
        <div className="col-12 col-md-6 order-2 order-md-1">
          {/* Category Tag */}
          <span className="badge rounded-pill bg-light text-primary px-3 py-2 fs-6 fw-semibold mb-3 border">
            {product.category || "Category"}
          </span>
          
          {/* Name & Description */}
          <h1 className="display-5 fw-bold text-dark mb-3">{product.name}</h1>
          <p className="lead text-secondary mb-4">{product.description}</p>
          
          {/* Price */}
          <h3 className="text-success fw-bold mb-4">
            ${Number(product.price).toFixed(2)}
          </h3>
          
          {/* Availability and Cart Button Row */}
          <div className="d-flex align-items-center justify-content-between border-top pt-4">
            <div className="d-flex align-items-center">
              <span className="position-relative d-inline-flex align-items-center me-2">
                <span className="position-absolute top-50 start-50 translate-middle p-2 bg-success border border-light rounded-circle animate-pulse"></span>
              </span>
              <span className="text-success fw-medium ms-3">Available in Stock</span>
            </div>
            
            <button onClick={() => addToCart(product, 1)} className="btn btn-primary btn-lg px-4 rounded-3 fw-semibold shadow-sm">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Right Column: Full Image */}
        <div className="col-12 col-md-6 order-1 order-md-2 mb-4 mb-md-0">
          <div className="ratio ratio-1x1 overflow-hidden rounded-4 shadow-sm bg-light">
            <img 
              src={product.image} 
              alt={product.name} 
              className="img-fluid object-fit-cover w-100 h-100"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Product;
