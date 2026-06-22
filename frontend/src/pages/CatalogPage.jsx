import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from '../api'
import ProductCard from '../components/ProductCard'

const CAT_ICONS = {
  'engine-parts': '🔧', 'suspension-braking': '🛞', 'electrical': '⚡',
  'body-parts': '🚗', 'air-conditioning': '❄️', 'transmission': '⚙️',
  'car-care': '🧴', 'diy-tools': '🔨',
}

const PAGE_SIZE = 24

export default function CatalogPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [activeCat, setActiveCat] = useState(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  const categorySlug = params.get('categorySlug')
  const categoryId = params.get('categoryId')
  const q = params.get('q')

  useEffect(() => {
    axios.get('/api/categories').then(r => setCategories(r.data)).catch(() => {})
  }, [])

  const fetchProducts = useCallback(async (pageNum, replace = false) => {
    if (replace) setLoading(true); else setLoadingMore(true)
    try {
      let catId = categoryId
      if (categorySlug && categories.length > 0) {
        const cat = categories.find(c => c.slug === categorySlug)
        catId = cat?.id
        setActiveCat(cat || null)
      } else if (categoryId && categories.length > 0) {
        const cat = categories.find(c => c.id === Number(categoryId))
        setActiveCat(cat || null)
      } else {
        setActiveCat(null)
      }

      const p = { page: pageNum, size: PAGE_SIZE }
      if (q) p.q = q
      else if (catId) p.categoryId = catId

      const res = await axios.get('/api/products', { params: p })
      const data = res.data

      // Handle both paginated (Page object) and plain list responses
      const items = data.content ?? data
      const totalElements = data.totalElements ?? items.length
      const last = data.last ?? true

      setTotal(totalElements)
      setHasMore(!last)
      setProducts(prev => replace ? items : [...prev, ...items])
      setPage(pageNum)
    } catch {
      if (replace) setProducts([])
    } finally {
      if (replace) setLoading(false); else setLoadingMore(false)
    }
  }, [categorySlug, categoryId, q, categories])

  // Reset and fetch page 0 when filters change
  useEffect(() => {
    if (q || (!categorySlug && !categoryId)) {
      fetchProducts(0, true)
    } else if (categories.length > 0) {
      fetchProducts(0, true)
    }
  }, [categorySlug, categoryId, q, categories])

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a><span className="sep">›</span>
            <a href="/catalog">Parts</a>
            {activeCat && <><span className="sep">›</span><span>{activeCat.name}</span></>}
            {q && <><span className="sep">›</span><span>Search: "{q}"</span></>}
          </div>
          <h1>
            {q ? `Search results for "${q}"` : activeCat ? `${CAT_ICONS[activeCat.slug] || '🔩'} ${activeCat.name}` : '🔩 All Genuine Parts'}
          </h1>
          {activeCat && <p>{activeCat.description}</p>}
        </div>
      </div>

      <div className="container" style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', gap: 20 }}>

          {/* Sidebar */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'sticky', top: 'calc(var(--nav-h) + 12px)' }}>
              <div style={{ background: 'var(--accent)', color: '#fff', padding: '12px 16px', fontSize: '13px', fontWeight: 700 }}>
                🔩 Part Categories
              </div>
              <div style={{ padding: '8px 0', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
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
                      {CAT_ICONS[cat.slug] || '🔩'} {cat.name}
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
                <div className="icon">🔍</div>
                <h3>No parts found</h3>
                <p>Try a different category or search term.</p>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: 14 }}>
                  Showing <b>{products.length}</b>{total > products.length ? ` of ${total}` : ''} genuine parts
                  {activeCat ? ` in ${activeCat.name}` : ''}
                </div>
                <div className="products-grid">
                  {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>

                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <button
                      onClick={() => fetchProducts(page + 1, false)}
                      disabled={loadingMore}
                      style={{ padding: '12px 32px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, fontSize: '14px', fontWeight: 600, cursor: loadingMore ? 'not-allowed' : 'pointer', opacity: loadingMore ? 0.7 : 1 }}
                    >
                      {loadingMore ? 'Loading...' : `Load More (${total - products.length} remaining)`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
