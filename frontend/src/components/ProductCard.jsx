import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { items, addItem, updateQty, removeItem } = useCart()
  const navigate = useNavigate()
  const cartItem = items.find(i => i.id === product.id)

  const vehicles = product.tags
    ? product.tags.split(',').filter(t => t.includes('Swift') || t.includes('Alto') || t.includes('Baleno') || t.includes('Brezza') || t.includes('Ertiga') || t.includes('WagonR') || t.includes('Dzire') || t.includes('Ciaz') || t.includes('All')).slice(0, 3)
    : []

  return (
    <div className="product-card">
      <div className="product-card-img" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Part'}
          alt={product.name}
          onError={e => e.target.src = 'https://via.placeholder.com/300x200?text=Part'}
        />
        <div className="genuine-badge">✓ Genuine</div>
        {product.isFeatured && <div className="featured-badge">★ Popular</div>}
      </div>

      <div className="product-card-body">
        {product.weight && <div className="part-number">Part No: {product.weight.includes('Pc') || product.weight.includes('Set') || product.weight.includes('Kit') || product.weight.includes('L') ? '' : ''}{product.slug?.toUpperCase().replace(/-/g, '').slice(0,10)}</div>}
        <h3 onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>{product.name}</h3>
        {vehicles.length > 0 && (
          <div className="compatible-vehicles">
            🚗 {vehicles.slice(0, 2).join(' · ')}
          </div>
        )}
        {product.weight && <div style={{ fontSize: '11px', color: 'var(--text4)', marginBottom: 4 }}>📦 {product.weight}</div>}
        <div className="product-price">
          ₹{Number(product.price).toLocaleString('en-IN')}
          <small> incl. GST</small>
        </div>
        <div className="product-card-footer">
          {cartItem ? (
            <div className="qty-control">
              <button className="qty-btn"
                onClick={() => cartItem.qty === 1 ? removeItem(product.id) : updateQty(product.id, cartItem.qty - 1)}>−</button>
              <span className="qty-num">{cartItem.qty}</span>
              <button className="qty-btn" onClick={() => updateQty(product.id, cartItem.qty + 1)}>+</button>
            </div>
          ) : (
            <button className="add-btn" onClick={() => addItem(product)}>
              🛒 Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
