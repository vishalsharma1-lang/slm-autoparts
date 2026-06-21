import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from '../api'
import ProductCard from '../components/ProductCard'

const CAT_ICONS = {
  'engine-parts': 'ðŸ”§', 'suspension-braking': 'ðŸ›ž', 'electrical': 'âš¡',
  'body-parts': 'ðŸš—', 'air-conditioning': 'â„ï¸', 'transmission': 'âš™ï¸',
  'car-care': 'ðŸ§´', 'diy-tools': 'ðŸ”¨',
}

export default function CatalogPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCat, setActiveCat] = useState(null)

  const categorySlug = params.get('categorySlug')
  const categoryId = params.get('categoryId')
  const q = params.get('q')

  useEffect(() => {
    axios.get('/api/categories').then(r => setCategories(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const resolveAndFetch = async () => {
      try {
        let catId = categoryId
        let cat = null
        if (categorySlug && categories.length > 0) {
          cat = categories.find(c => c.slug === categorySlug)
          catId = cat?.id
          setActiveCat(cat || null)
        } else if (categoryId && categories.length > 0) {
          cat = categories.find(c => c.id === Number(categoryId))
          setActiveCat(cat || null)
        } else {
          setActiveCat(null)
        }
        const p = {}
        if (q) p.q = q
        else if (catId) p.categoryId = catId
        const res = await axios.get('/api/products', { params: p })
        setProducts(res.data)
      } catch { setProducts([]) }
      finally { setLoading(false) }
    }
    if (q || (!categorySlug && !categoryId)) resolveAndFetch()
    else if (categories.length > 0) resolveAndFetch()
  }, [categorySlug, categoryId, q, categories])

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span className="sep">â€º</span>
            <a href="/catalog">Parts</a>
            {activeCat && <><span className="sep">â€º</span><span>{activeCat.name}</span></>}
            {q && <><span className="sep">â€º</span><span>Search: "{q}"</span></>}
          </div>
          <h1>
            {q ? `Search results for "${q}"` : activeCat ? `${CAT_ICONS[activeCat.slug] || 'ðŸ”©'} ${activeCat.name}` : 'ðŸ”© All Genuine Parts'}
          </h1>
          {activeCat && <p>{activeCat.description}</p>}
        </div>
      </div>

      <div className="container" style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', gap: 20 }}>

          {/* Sidebar filters */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'sticky', top: 'calc(var(--nav-h) + 12px)' }}>
              <div style={{ background: 'var(--accent)', color: '#fff', padding: '12px 16px', fontSize: '13px', fontWeight: 700 }}>
                ðŸ”© Part Categories
              </div>
              <div style={{ padding: '8px 0' }}>
                <div
                  onClick={() => navigate('/catalog')}
                  style={{ padding: '9px 16px', fontSize: '13px', cursor: 'pointer', fontWeight: !activeCat && !q ? 700 : 500, color: !activeCat && !q ? 'var(--primary)' : 'var(--text2)', background: !activeCat && !q ? '#fff3ee' : 'transparent', borderLeft: !activeCat && !q ? '3px solid var(--primary)' : '3px solid transparent' }}
                >
                  All Parts
                </div>
                {categories.map(cat => {
                  const isActive = activeCat?.id === cat.id
                  return (
                    <div key={cat.id}
                      onClick={() => navigate(`/catalog?categorySlug=${cat.slug}`)}
                      style={{ padding: '9px 16px', fontSize: '13px', cursor: 'pointer', fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--primary)' : 'var(--text2)', background: isActive ? '#fff3ee' : 'transparent', borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent', display: 'flex', alignItems: 'center', gap: 7 }}
                    >
                      {CAT_ICONS[cat.slug] || 'ðŸ”©'} {cat.name}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div className="loading">Loading parts...</div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <div className="icon">ðŸ”</div>
                <h3>No parts found</h3>
                <p>Try a different category or search term.</p>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: 14 }}>
                  Showing <b>{products.length}</b> genuine parts
                  {activeCat ? ` in ${activeCat.name}` : ''}
                </div>
                <div className="products-grid">
                  {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

