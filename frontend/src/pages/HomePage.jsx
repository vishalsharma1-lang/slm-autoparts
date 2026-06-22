import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api'
import ProductCard from '../components/ProductCard'

const CAT_ICONS = {
  'engine-parts': '🔧', 'suspension-braking': '🛞', 'electrical': '⚡',
  'body-parts': '🚗', 'air-conditioning': '❄️', 'transmission': '⚙️',
  'car-care': '🧴', 'diy-tools': '🔨',
}

const VEHICLES = ['Maruti Swift', 'Maruti Baleno', 'Maruti Brezza', 'Maruti Dzire', 'Maruti Ertiga', 'Maruti WagonR', 'Maruti Alto K10', 'Maruti Ciaz', 'Maruti S-Cross', 'Maruti Ignis']
const YEARS = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015']
const VARIANTS = ['LXi', 'VXi', 'ZXi', 'ZXi+', 'LDi', 'VDi', 'ZDi', 'Alpha', 'Delta', 'Zeta', 'Sigma']

export default function HomePage() {
  const [categories, setCategories] = useState([])
  const [featured, setFeatured] = useState([])
  const [vehicle, setVehicle] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/categories').then(r => setCategories(r.data)).catch(() => {})
    axios.get('/api/products?featured=true').then(r => setFeatured(r.data)).catch(() => {})
  }, [])

  const handleVehicleSearch = () => {
    if (vehicle) navigate(`/catalog?q=${encodeURIComponent(vehicle.replace('Maruti ', ''))}`)
    else navigate('/catalog')
  }

  return (
    <div className="page-wrap">

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">🏆 India's #1 Genuine Parts Store</div>
            <h1>Genuine Maruti Suzuki<br /><span>Spare Parts</span> Online</h1>
            <p>OEM quality parts for Swift, Baleno, Brezza, Ertiga & more. Warranty-backed. Fast delivery across India.</p>
            <div className="hero-stats">
              <div className="hero-stat"><div className="num">50K+</div><div className="lbl">Parts in Stock</div></div>
              <div className="hero-stat"><div className="num">100%</div><div className="lbl">Genuine OEM</div></div>
              <div className="hero-stat"><div className="num">24hr</div><div className="lbl">Fast Dispatch</div></div>
            </div>
            <div className="hero-btns">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/catalog')}>
                🔧 Browse All Parts
              </button>
              <button className="btn btn-outline-white" onClick={() => navigate('/track')}>
                📦 Track My Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle selector */}
      <div className="container">
        <div className="vehicle-selector">
          <h3>🚗 Find Parts for Your <span>Maruti Suzuki</span></h3>
          <div className="vs-row">
            <div className="vs-group">
              <label>Select Vehicle</label>
              <select value={vehicle} onChange={e => setVehicle(e.target.value)}>
                <option value="">Choose Model</option>
                {VEHICLES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="vs-group">
              <label>Year</label>
              <select><option value="">Select Year</option>{YEARS.map(y => <option key={y}>{y}</option>)}</select>
            </div>
            <div className="vs-group">
              <label>Variant</label>
              <select><option value="">Select Variant</option>{VARIANTS.map(v => <option key={v}>{v}</option>)}</select>
            </div>
            <button className="btn btn-primary" style={{ height: 42, alignSelf: 'flex-end' }} onClick={handleVehicleSearch}>
              🔍 Find Parts
            </button>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">✅ 100% Genuine OEM</div>
            <div className="trust-item">🚚 Free Shipping above ₹999</div>
            <div className="trust-item">🛡️ Warranty on All Parts</div>
            <div className="trust-item">🔁 30-Day Easy Returns</div>
            <div className="trust-item">📞 Expert Support 1800-102-1800</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag">Shop by Category</div>
              <h2>Browse Parts by System</h2>
            </div>
            <a href="/catalog">View All →</a>
          </div>
          <div className="cat-grid">
            {categories.map(cat => (
              <div key={cat.id} className="cat-card" onClick={() => navigate(`/catalog?categorySlug=${cat.slug}`)}>
                <div className="cat-icon">{CAT_ICONS[cat.slug] || '🔩'}</div>
                <h3>{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Parts */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-tag">â­ Top Selling</div>
                <h2>Most Popular Genuine Parts</h2>
              </div>
              <a href="/catalog">View All Parts →</a>
            </div>
            <div className="products-grid">
              {featured.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Why Genuine */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag">Why Choose Us</div>
              <h2>The Genuine Parts Advantage</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
            {[
              { icon: '🏭', title: 'OEM Manufactured', desc: 'Made by the same manufacturers that supply Maruti Suzuki assembly lines.' },
              { icon: '🛡️', title: 'Warranty Covered', desc: 'All genuine parts come with manufacturer warranty for peace of mind.' },
              { icon: '⚡', title: 'Perfect Fit', desc: 'Exact dimensions and specifications — zero modification needed.' },
              { icon: '🔧', title: 'Longer Life', desc: 'Genuine parts outlast aftermarket alternatives by 2–3x on average.' },
            ].map((w, i) => (
              <div key={i} style={{ background: '#f9fafb', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '22px 18px' }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>{w.icon}</div>
                <h3 style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, marginBottom: 6 }}>{w.title}</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text3)', lineHeight: 1.6 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'linear-gradient(90deg,var(--accent) 0%,var(--primary-dark) 100%)', padding: '40px 0', color: '#fff' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 6 }}>Can't Find Your Part?</h2>
            <p style={{ opacity: .75, fontSize: '13px' }}>Call our expert team and we'll source it for you within 24 hours.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="tel:18001021800" className="btn btn-primary btn-lg">📞 Call Now</a>
            <button className="btn btn-outline-white" onClick={() => navigate('/catalog')}>Browse Catalog</button>
          </div>
        </div>
      </section>

    </div>
  )
}

