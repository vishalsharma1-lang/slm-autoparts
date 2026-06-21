import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ customerName: '', phone: '', address: '', city: '', pincode: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)

  const delivery = total >= 999 ? 0 : 80
  const grandTotal = total + delivery

  if (items.length === 0) return (
    <div className="page-wrap">
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>ðŸ›’</div>
        <h2 style={{ marginBottom: 16 }}>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/catalog')}>Browse Parts</button>
      </div>
    </div>
  )

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.customerName || !form.phone || !form.address) { toast.error('Fill all required fields'); return }
    setSubmitting(true)
    try {
      const res = await axios.post('/api/orders', { ...form, items: items.map(i => ({ productId: i.id, quantity: i.qty })) })
      clearCart()
      toast.success('Order placed! ðŸŽ‰')
      navigate(`/track?orderId=${res.data.orderId}`)
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to place order')
    } finally { setSubmitting(false) }
  }

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span className="sep">â€º</span><span>Checkout</span></div>
          <h1>Checkout</h1>
        </div>
      </div>
      <div className="container" style={{ padding: '24px 16px' }}>
        <form onSubmit={handleSubmit}>
          <div className="checkout-grid">
            <div>
              <div className="form-card">
                <h2>ðŸ“‹ Delivery Information</h2>
                <div className="form-group"><label>Full Name *</label><input value={form.customerName} onChange={e => set('customerName', e.target.value)} placeholder="Your name" required /></div>
                <div className="form-group"><label>Phone Number *</label><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" required /></div>
                <div className="form-group"><label>Delivery Address *</label><textarea value={form.address} onChange={e => set('address', e.target.value)} rows={3} placeholder="House/Flat, Street, Area..." required /></div>
                <div className="form-row">
                  <div className="form-group"><label>City</label><input value={form.city} onChange={e => set('city', e.target.value)} placeholder="City" /></div>
                  <div className="form-group"><label>Pincode</label><input value={form.pincode} onChange={e => set('pincode', e.target.value)} placeholder="110001" /></div>
                </div>
                <div className="form-group"><label>Notes (optional)</label><textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2} placeholder="Vehicle number, special instructions..." /></div>
              </div>
              <div className="form-card" style={{ marginTop: 14 }}>
                <h2>ðŸ’³ Payment Method</h2>
                <div style={{ background: '#f9fafb', border: '1.5px solid var(--border)', borderRadius: 8, padding: '14px 16px', fontSize: '13px', color: 'var(--text2)' }}>
                  ðŸ’µ <b>Cash on Delivery</b> â€” Pay when your parts arrive. Safe &amp; easy.
                </div>
              </div>
            </div>

            <div className="order-summary-card">
              <h3>Order Summary ({items.length} items)</h3>
              {items.map(item => (
                <div key={item.id} className="summary-item">
                  <span style={{ flex: 1, paddingRight: 8, lineHeight: 1.4 }}>{item.name} Ã— {item.qty}</span>
                  <span style={{ fontWeight: 600 }}>â‚¹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <hr className="summary-divider" />
              <div className="summary-item"><span>Subtotal</span><span>â‚¹{total.toLocaleString('en-IN')}</span></div>
              <div className="summary-item">
                <span>Shipping</span>
                <span style={{ color: delivery === 0 ? 'var(--green)' : 'inherit' }}>{delivery === 0 ? 'FREE' : `â‚¹${delivery}`}</span>
              </div>
              {delivery === 0 && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6, padding: '7px 12px', fontSize: '11.5px', color: '#15803d', marginBottom: 10 }}>ðŸŽ‰ Free shipping applied!</div>}
              <hr className="summary-divider" />
              <div className="summary-total"><span>Total (incl. GST)</span><span className="amt">â‚¹{grandTotal.toLocaleString('en-IN')}</span></div>
              <button type="submit" className="btn-checkout" style={{ marginTop: 18 }} disabled={submitting}>
                {submitting ? 'Placing Order...' : 'âœ… Place Order (COD)'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

