import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from '../api'

const STATUS_STEPS = ['PLACED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED']
const STEP_LABELS = { PLACED: 'Order Placed', PREPARING: 'Preparing', OUT_FOR_DELIVERY: 'Out for Delivery', DELIVERED: 'Delivered' }
const STEP_ICONS = { PLACED: 'ðŸ“‹', PREPARING: 'ðŸ‘¨â€ðŸ³', OUT_FOR_DELIVERY: '🚚', DELIVERED: '✅' }

function StatusProgress({ status }) {
  if (status === 'CANCELLED') {
    return <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', color: '#b91c1c', fontWeight: 600 }}>âŒ Order Cancelled</div>
  }
  const current = STATUS_STEPS.indexOf(status)
  return (
    <div className="progress-track">
      {STATUS_STEPS.map((s, i) => (
        <React.Fragment key={s}>
          <div className="progress-step">
            <div className={`step-dot ${i < current ? 'done' : i === current ? 'active' : ''}`}>
              {i < current ? 'âœ“' : STEP_ICONS[s]}
            </div>
            <div className={`step-label ${i < current ? 'done' : i === current ? 'active' : ''}`}>
              {STEP_LABELS[s]}
            </div>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div className={`step-line ${i < current ? 'done' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

function OrderCard({ order }) {
  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="order-id">
          <b>Order #{order.id}</b>
          <div style={{ marginTop: 4, fontSize: '.78rem' }}>
            {order.customerName} Â· {order.phone}
          </div>
          <div style={{ marginTop: 2, fontSize: '.78rem' }}>
            {new Date(order.createdAt).toLocaleString('en-IN')}
          </div>
        </div>
        <span className={`status-pill status-${order.status}`}>{order.status.replace('_', ' ')}</span>
      </div>

      <StatusProgress status={order.status} />

      <div style={{ marginTop: 12, fontSize: '.82rem', color: 'var(--text3)' }}>
        ðŸ“ {order.address}{order.city ? `, ${order.city}` : ''}{order.pincode ? ` - ${order.pincode}` : ''}
      </div>

      {order.items && order.items.length > 0 && (
        <div className="order-items-list">
          {order.items.map(item => (
            <div key={item.id} className="order-item-row">
              <span>{item.productName} Ã— {item.quantity}</span>
              <span>₹{(item.unitPrice * item.quantity).toFixed(0)}</span>
            </div>
          ))}
          <div className="order-total-row">
            <span>Total</span>
            <span className="amt">₹{Number(order.totalAmount).toFixed(0)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TrackOrderPage() {
  const [params] = useSearchParams()
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const orderId = params.get('orderId')

  useEffect(() => {
    if (orderId) {
      setLoading(true)
      axios.get(`/api/orders/${orderId}`)
        .then(r => setOrders([r.data]))
        .catch(() => setOrders([]))
        .finally(() => { setLoading(false); setSearched(true) })
    }
  }, [orderId])

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await axios.get(`/api/orders/track?phone=${encodeURIComponent(phone.trim())}`)
      setOrders(Array.isArray(res.data) ? res.data : [res.data])
    } catch {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrap">
      <div style={{ background: 'linear-gradient(135deg,#3d1a00,#7a2f00)', color: '#fff', padding: '40px 0 30px' }}>
        <div className="container">
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,.6)' }}>
            <a href="/" style={{ color: 'rgba(255,255,255,.6)' }}>Home</a>
            <span className="sep">â€º</span>
            <span>Track Order</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', marginTop: 8 }}>📦 Track Your Order</h1>
          <p style={{ opacity: .75, marginTop: 6, fontSize: '.9rem' }}>Enter your phone number to track all your orders.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="tracking-wrap">
          {!orderId && (
            <form onSubmit={handleTrack} className="track-search">
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter your phone number..."
                type="tel"
              />
              <button type="submit">Track</button>
            </form>
          )}

          {loading && <div className="loading">Fetching orders...</div>}

          {!loading && searched && orders !== null && (
            orders.length === 0 ? (
              <div className="empty-state">
                <div className="icon">📦</div>
                <h3>No orders found</h3>
                <p>No orders found for this phone number.</p>
              </div>
            ) : (
              orders.map(order => <OrderCard key={order.id} order={order} />)
            )
          )}

          {!searched && !orderId && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📱</div>
              <p>Enter your phone number above to track your orders.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

