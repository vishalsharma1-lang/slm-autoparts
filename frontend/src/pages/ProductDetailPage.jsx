import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { items, addItem, updateQty, removeItem } = useCart()
  const cartItem = product ? items.find(i => i.id === product.id) : null

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(r => setProduct(r.data))
      .catch(() => navigate('/catalog'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="page-wrap"><div className="loading">Loading...</div></div>
  if (!product) return null

  const vehicles = product.tags?.split(',').filter(t =>
    ['Swift','Alto','Baleno','Brezza','Ertiga','WagonR','Dzire','Ciaz','All'].some(v => t.includes(v))
  ) || []

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span className="sep">â€º</span>
            <a href="/catalog">Parts</a>
            {product.category && <><span className="sep">â€º</span><a href={`/catalog?categorySlug=${product.category.slug}`}>{product.category.name}</a></>}
            <span className="sep">â€º</span><span>{product.name}</span>
          </div>
          <h1>{product.name}</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'start' }}>

          {/* Image */}
          <div>
            <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/500x380?text=Part'}
                alt={product.name}
                style={{ width: '100%', height: 340, objectFit: 'cover' }}
                onError={e => e.target.src = 'https://via.placeholder.com/500x380?text=Part'}
              />
              <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--green)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>
                âœ“ GENUINE OEM
              </div>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 14 }}>
              {[['🛡️','Warranty','Backed'],['🚚','Fast','Dispatch'],['🔁','30-Day','Returns']].map(([icon,l1,l2],i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem' }}>{icon}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, marginTop: 4 }}>{l1}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{l2}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <div className="tag" style={{ marginBottom: 10 }}>{product.category.name}</div>
            )}
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>{product.name}</h1>

            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 4, padding: '3px 10px', fontSize: '11px', color: '#15803d', fontWeight: 700 }}>âœ“ Genuine OEM</span>
              {product.isFeatured && <span style={{ background: '#fff3ee', border: '1px solid #ffd5c2', borderRadius: 4, padding: '3px 10px', fontSize: '11px', color: 'var(--primary)', fontWeight: 700 }}>â˜… Popular Part</span>}
            </div>

            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', marginBottom: 4 }}>
              ₹{Number(product.price).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: 16 }}>Inclusive of all taxes (GST)</div>

            {/* Specs table */}
            <div style={{ background: '#f9fafb', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', marginBottom: 18 }}>
              {[
                ['Pack Size', product.weight || '1 Pc'],
                ['Category', product.category?.name || '—'],
                ['Availability', product.stock > 0 ? '✅ In Stock' : 'âŒ Out of Stock'],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: 'flex', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 140, padding: '10px 14px', fontSize: '12px', color: 'var(--text3)', fontWeight: 600, background: '#f3f4f6', borderRight: '1px solid var(--border)' }}>{k}</div>
                  <div style={{ flex: 1, padding: '10px 14px', fontSize: '12.5px', color: 'var(--text)' }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Compatible vehicles */}
            {vehicles.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text2)', marginBottom: 7 }}>🚗 Compatible Vehicles</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {vehicles.map((v, i) => (
                    <span key={i} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 4, padding: '3px 10px', fontSize: '11.5px', color: '#1d4ed8', fontWeight: 600 }}>{v}</span>
                  ))}
                </div>
              </div>
            )}

            {product.description && (
              <p style={{ color: 'var(--text2)', lineHeight: 1.7, fontSize: '13px', marginBottom: 22 }}>{product.description}</p>
            )}

            {/* Add to cart */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {cartItem ? (
                <>
                  <div className="qty-control">
                    <button className="qty-btn" style={{ width: 38, height: 38 }}
                      onClick={() => cartItem.qty === 1 ? removeItem(product.id) : updateQty(product.id, cartItem.qty - 1)}>âˆ’</button>
                    <span className="qty-num" style={{ fontSize: '15px', minWidth: 28 }}>{cartItem.qty}</span>
                    <button className="qty-btn" style={{ width: 38, height: 38 }}
                      onClick={() => updateQty(product.id, cartItem.qty + 1)}>+</button>
                  </div>
                  <button className="btn btn-primary btn-lg" onClick={() => navigate('/checkout')}>
                    Checkout →
                  </button>
                </>
              ) : (
                <button className="btn btn-primary btn-lg" onClick={() => addItem(product)}>
                  🛒 Add to Cart
                </button>
              )}
            </div>

            <div className="highlight-box" style={{ marginTop: 16 }}>
              🚚 Free delivery on orders above ₹999 Â· Ships within 24 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

