import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CAT_LINKS = [
  { label: '🔧 Engine Parts', slug: 'engine-parts' },
  { label: '🛞 Suspension & Braking', slug: 'suspension-braking' },
  { label: '⚡ Electrical', slug: 'electrical' },
  { label: '🚗 Body Parts', slug: 'body-parts' },
  { label: '❄️ Air Conditioning', slug: 'air-conditioning' },
  { label: '⚙️ Transmission', slug: 'transmission' },
  { label: '🧴 Car Care', slug: 'car-care' },
  { label: '🔨 DIY & Tools', slug: 'diy-tools' },
]

export default function Navbar() {
  const { count, setIsOpen } = useCart()
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (q.trim()) { navigate(`/catalog?q=${encodeURIComponent(q.trim())}`); setQ('') }
  }

  return (
    <nav className="navbar">
      {/* Top info bar */}
      <div className="nav-top">
        <div className="container nav-top-inner">
          <div style={{ display: 'flex', gap: 20 }}>
            <span>📞 Toll Free: 1800-102-1800</span>
            <span>🚚 Free shipping on orders above ₹999</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/track">Track Order</Link>
            <Link to="/admin">Admin Panel</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="nav-main">
        <div className="container nav-main-inner">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">A</div>
            <div className="nav-logo-text">
              <strong>CarDekho Auto Parts</strong>
              <span>Genuine Maruti Suzuki Parts</span>
            </div>
          </Link>

          <form className="nav-search-bar" onSubmit={handleSearch}>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search parts by name, part number or vehicle..."
            />
            <button type="submit">🔍 Search</button>
          </form>

          <div className="nav-actions">
            <button className="nav-cart-btn" onClick={() => setIsOpen(true)}>
              🛒 Cart {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Category nav bar */}
      <div className="nav-cats">
        <div className="container">
          <div className="nav-cats-inner">
            <Link to="/catalog" className="nav-cat-link all">☰ All Parts</Link>
            {CAT_LINKS.map(c => (
              <Link
                key={c.slug}
                to={`/catalog?categorySlug=${c.slug}`}
                className="nav-cat-link"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
