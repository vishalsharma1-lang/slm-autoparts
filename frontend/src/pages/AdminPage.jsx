import React, { useEffect, useState } from 'react'
import axios from '../api'
import toast from 'react-hot-toast'

const STATUS_FLOW = ['PLACED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED']
const STATUS_LABELS = { PLACED: 'Order Placed', PREPARING: 'Processing', OUT_FOR_DELIVERY: 'Dispatched', DELIVERED: 'Delivered', CANCELLED: 'Cancelled' }

function ProductModal({ product, categories, onSave, onClose }) {
  const [form, setForm] = useState(product ? {
    name: product.name || '', slug: product.slug || '',
    categoryId: product.category?.id || '', description: product.description || '',
    price: product.price || '', weight: product.weight || '',
    imageUrl: product.imageUrl || '', isActive: product.isActive !== false,
    isVeg: false, isFeatured: !!product.isFeatured,
    stock: product.stock || 50, tags: product.tags || ''
  } : { name: '', slug: '', categoryId: '', description: '', price: '', weight: '1 Pc', imageUrl: '', isActive: true, isVeg: false, isFeatured: false, stock: 50, tags: '' })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = async () => {
    if (!form.name || !form.price || !form.categoryId) { toast.error('Name, price and category required'); return }
    setSaving(true)
    try {
      const res = product
        ? await axios.put(`/api/products/${product.id}`, form)
        : await axios.post('/api/products', form)
      onSave(res.data)
    } catch (e) { toast.error(e.response?.data?.error || 'Save failed') }
    finally { setSaving(false) }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2>{product ? 'Edit Part' : 'Add New Part'}</h2>
        <div className="form-group"><label>Part Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Front Brake Pad Set" /></div>
        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select value={form.categoryId} onChange={e => set('categoryId', e.target.value)}>
              <option value="">Select</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Price (â‚¹) *</label><input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="1480" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Pack / Unit</label><input value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="1 Pc / Set of 4" /></div>
          <div className="form-group"><label>Stock Qty</label><input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} /></div>
        </div>
        <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Compatible vehicles, specifications..." /></div>
        <div className="form-group">
          <label>Image URL</label>
          <input value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} placeholder="https://..." />
          {form.imageUrl && <img src={form.imageUrl} className="img-preview" alt="" onError={e => e.target.style.display = 'none'} />}
        </div>
        <div className="form-group"><label>Compatible Vehicles / Tags</label><input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Swift,Baleno,Brezza,brake,genuine" /></div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[['isActive', 'Active / In Stock'], ['isFeatured', 'Featured / Popular']].map(([k, l]) => (
            <div key={k} className="toggle-input">
              <input type="checkbox" id={k} checked={form[k]} onChange={e => set(k, e.target.checked)} />
              <label htmlFor={k} style={{ fontSize: '13px', fontWeight: 500, marginBottom: 0 }}>{l}</label>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Part'}</button>
        </div>
      </div>
    </div>
  )
}

function OrderStatusModal({ order, onSave, onClose }) {
  const [status, setStatus] = useState(order.status)
  const [saving, setSaving] = useState(false)
  const handleSave = async () => {
    setSaving(true)
    try { const res = await axios.patch(`/api/orders/${order.id}/status`, { status }); onSave(res.data) }
    catch { toast.error('Update failed') } finally { setSaving(false) }
  }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 360 }}>
        <h2>Update Order #{order.id}</h2>
        <div className="form-group">
          <label>Order Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            {STATUS_FLOW.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave} disabled={saving}>{saving ? '...' : 'Update'}</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [editProduct, setEditProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editOrder, setEditOrder] = useState(null)

  useEffect(() => {
    axios.get('/api/categories?admin=true').then(r => setCategories(r.data)).catch(() => {})
    axios.get('/api/products?admin=true').then(r => setProducts(r.data)).catch(() => {})
    axios.get('/api/orders').then(r => setOrders(r.data)).catch(() => {})
  }, [])

  const handleDeleteProduct = async (id) => {
    if (!confirm('Delete this part?')) return
    await axios.delete(`/api/products/${id}`)
    setProducts(p => p.filter(x => x.id !== id))
    toast.success('Part deleted')
  }

  const handleProductSaved = (saved) => {
    setProducts(prev => { const i = prev.findIndex(p => p.id === saved.id); if (i >= 0) { const n = [...prev]; n[i] = saved; return n } return [saved, ...prev] })
    setShowModal(false); setEditProduct(null); toast.success('Part saved!')
  }

  const handleOrderSaved = (saved) => { setOrders(prev => prev.map(o => o.id === saved.id ? saved : o)); setEditOrder(null); toast.success('Order updated!') }

  const revenue = orders.filter(o => o.status !== 'CANCELLED').reduce((s, o) => s + Number(o.totalAmount), 0)
  const pending = orders.filter(o => o.status === 'PLACED').length

  const nav = [
    { id: 'dashboard', icon: 'ðŸ“Š', label: 'Dashboard' },
    { id: 'orders', icon: 'ðŸ“¦', label: 'Orders' },
    { id: 'products', icon: 'ðŸ”©', label: 'Parts Catalog' },
    { id: 'categories', icon: 'ðŸ“‚', label: 'Categories' },
  ]

  return (
    <div className="page-wrap">
      {showModal && <ProductModal product={editProduct} categories={categories} onSave={handleProductSaved} onClose={() => { setShowModal(false); setEditProduct(null) }} />}
      {editOrder && <OrderStatusModal order={editOrder} onSave={handleOrderSaved} onClose={() => setEditOrder(null)} />}

      <div className="admin-layout">
        <div className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h3>ðŸ”© CarDekho Auto Parts</h3>
            <p>Parts Management Portal</p>
          </div>
          <div className="admin-nav-section">
            {nav.map(n => (
              <div key={n.id} className={`admin-nav-link ${tab === n.id ? 'active' : ''}`} onClick={() => setTab(n.id)}>
                <span>{n.icon}</span> {n.label}
                {n.id === 'orders' && pending > 0 && <span style={{ marginLeft: 'auto', background: 'var(--primary)', color: '#fff', borderRadius: 50, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{pending}</span>}
              </div>
            ))}
          </div>
          <div style={{ padding: '16px', marginTop: 8 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,.45)', fontSize: '12px' }}>â† Back to Store</a>
          </div>
        </div>

        <div className="admin-main">

          {tab === 'dashboard' && (
            <>
              <div className="admin-top"><h1>Dashboard</h1><span style={{ fontSize: '12px', color: 'var(--text3)' }}>Genuine Parts Portal</span></div>
              <div className="stats-row">
                <div className="stat-card"><div className="val">{products.length}</div><div className="lbl">Total Parts</div></div>
                <div className="stat-card"><div className="val">{orders.length}</div><div className="lbl">Total Orders</div></div>
                <div className="stat-card"><div className="val" style={{ color: pending > 0 ? 'var(--primary)' : 'var(--green)' }}>{pending}</div><div className="lbl">Pending Orders</div></div>
                <div className="stat-card"><div className="val">â‚¹{revenue.toLocaleString('en-IN')}</div><div className="lbl">Total Revenue</div></div>
                <div className="stat-card"><div className="val">{categories.length}</div><div className="lbl">Categories</div></div>
              </div>
              <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: '14px' }}>Recent Orders</h3>
              <table className="data-table">
                <thead><tr><th>#</th><th>Customer</th><th>Parts</th><th>Total</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {orders.slice(0, 10).map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 700 }}>#{o.id}</td>
                      <td><b>{o.customerName}</b><br /><span style={{ color: 'var(--text3)', fontSize: '11px' }}>{o.phone}</span></td>
                      <td style={{ fontSize: '11px' }}>{o.items?.length || 0} part(s)</td>
                      <td style={{ fontWeight: 700 }}>â‚¹{Number(o.totalAmount).toLocaleString('en-IN')}</td>
                      <td><span className={`status-pill status-${o.status}`}>{STATUS_LABELS[o.status] || o.status}</span></td>
                      <td style={{ fontSize: '11px' }}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                      <td><button className="action-btn status" onClick={() => setEditOrder(o)}>Update</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'orders' && (
            <>
              <div className="admin-top"><h1>All Orders ({orders.length})</h1></div>
              <table className="data-table">
                <thead><tr><th>#</th><th>Customer</th><th>Address</th><th>Parts</th><th>Total</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 700 }}>#{o.id}</td>
                      <td><b>{o.customerName}</b><div style={{ fontSize: '11px', color: 'var(--text3)' }}>{o.phone}</div></td>
                      <td style={{ fontSize: '11px', maxWidth: 130 }}>{o.address}{o.city ? `, ${o.city}` : ''}</td>
                      <td style={{ fontSize: '11px' }}>{o.items?.map(i => <div key={i.id}>{i.productName} Ã—{i.quantity}</div>)}</td>
                      <td style={{ fontWeight: 700 }}>â‚¹{Number(o.totalAmount).toLocaleString('en-IN')}</td>
                      <td><span className={`status-pill status-${o.status}`}>{STATUS_LABELS[o.status] || o.status}</span></td>
                      <td style={{ fontSize: '11px' }}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                      <td><button className="action-btn status" onClick={() => setEditOrder(o)}>Update</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'products' && (
            <>
              <div className="admin-top">
                <h1>Parts Catalog ({products.length})</h1>
                <button className="btn btn-primary btn-sm" onClick={() => { setEditProduct(null); setShowModal(true) }}>+ Add Part</button>
              </div>
              <table className="data-table">
                <thead><tr><th>Image</th><th>Part Name</th><th>Category</th><th>Price</th><th>Unit</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>{p.imageUrl ? <img src={p.imageUrl} className="img-preview" alt="" onError={e => e.target.style.display = 'none'} /> : <div style={{ width: 60, height: 60, background: '#f3f4f6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>ðŸ”©</div>}</td>
                      <td><b style={{ fontSize: '12.5px' }}>{p.name}</b>{p.isFeatured && <span style={{ marginLeft: 6, fontSize: '10px', background: '#fff3ee', color: 'var(--primary)', padding: '1px 6px', borderRadius: 3 }}>â˜…</span>}</td>
                      <td style={{ fontSize: '12px' }}>{p.category?.name || 'â€”'}</td>
                      <td style={{ fontWeight: 700 }}>â‚¹{Number(p.price).toLocaleString('en-IN')}</td>
                      <td style={{ fontSize: '12px' }}>{p.weight || 'â€”'}</td>
                      <td>{p.stock}</td>
                      <td><span style={{ color: p.isActive ? 'var(--green)' : 'var(--red)', fontSize: '12px', fontWeight: 600 }}>{p.isActive ? 'â— Active' : 'â—‹ Hidden'}</span></td>
                      <td style={{ display: 'flex', gap: 5 }}>
                        <button className="action-btn edit" onClick={() => { setEditProduct(p); setShowModal(true) }}>Edit</button>
                        <button className="action-btn delete" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'categories' && (
            <>
              <div className="admin-top"><h1>Categories ({categories.length})</h1></div>
              <table className="data-table">
                <thead><tr><th>Name</th><th>Slug</th><th>Description</th><th>Order</th></tr></thead>
                <tbody>
                  {categories.map(c => (
                    <tr key={c.id}>
                      <td><b>{c.name}</b></td>
                      <td style={{ fontSize: '11.5px', color: 'var(--text3)', fontFamily: 'monospace' }}>{c.slug}</td>
                      <td style={{ fontSize: '12px', maxWidth: 280 }}>{c.description}</td>
                      <td>{c.displayOrder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

