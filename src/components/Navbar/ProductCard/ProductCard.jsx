import React from 'react'
import Product from '../../../assets/product.png'
import Rate from '../../../assets/star.png'
import './ProductCard.scss'

export default function ProductCard() {
  return <>
    <div className="product-card">
      <div className="image">
        <img src={Product} alt="Product image" />
      </div>
      <div className="data">
        <h3>Black Jacket Nike</h3>
        <div className="rating">
          <img src={Rate} alt="Rating" />
          <span>4.5</span>
        </div>
        <p>750 L.E</p>
        <div className="actions">
          <button>Like</button>
          <button>Wishlist</button>
        </div>
      </div>
    </div>
  </>
}
