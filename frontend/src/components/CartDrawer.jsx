import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { items, total, isOpen, setIsOpen, updateQty, removeItem } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => { setIsOpen(false); navigate('/checkout') }

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>🛒 Cart {items.length > 0 && `(${items.length} items)`}</h2>
          <button className="cart-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="icon">🔧</div>
            <p style={{ fontWeight: 600, marginBottom: 6 }}>Your cart is empty</p>
            <p style={{ fontSize: '12px' }}>Find genuine Maruti parts</p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 16 }}
              onClick={() => { setIsOpen(false); navigate('/catalog') }}>Browse Parts</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/60?text=Part'}
                    alt={item.name}
                    className="cart-item-img"
                    onError={e => e.target.src = 'https://via.placeholder.com/60?text=Part'}
                  />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    {item.weight && <div className="cart-item-pno">Qty pack: {item.weight}</div>}
                    <div className="qty-control" style={{ marginTop: 6 }}>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      <button className="cart-remove" onClick={() => removeItem(item.id)}>🗑</button>
                    </div>
                    <div className="cart-item-sub">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              {total >= 999 ? (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6, padding: '7px 12px', fontSize: '12px', color: '#15803d', marginBottom: 12 }}>
                  🎉 Free shipping applied!
                </div>
              ) : (
                <div style={{ background: '#fff3ee', border: '1px solid #ffd5c2', borderRadius: 6, padding: '7px 12px', fontSize: '12px', color: 'var(--primary)', marginBottom: 12 }}>
                  Add ₹{(999 - total).toFixed(0)} more for free shipping
                </div>
              )}
              <div className="cart-total-row">
                <span>Total (incl. GST)</span>
                <span className="amount">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <button className="btn-checkout" onClick={handleCheckout}>Proceed to Checkout →</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
