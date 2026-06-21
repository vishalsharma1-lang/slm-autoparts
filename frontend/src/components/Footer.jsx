import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-name">
                <div className="footer-brand-icon">C</div>
                CarDekho Auto Parts
              </div>
              <p className="footer-desc">
                India's trusted source for Genuine Maruti Suzuki spare parts.
                OEM quality parts for Swift, Baleno, Brezza, Ertiga, Dzire, WagonR, Alto and more.
                Fast delivery · Genuine guarantee.
              </p>
              <div style={{ marginTop: 14, fontSize: '12px' }}>
                <div style={{ marginBottom: 5 }}>📞 Toll Free: 1800-102-1800</div>
                <div>🕐 Mon–Sat: 9 AM – 6 PM</div>
              </div>
            </div>
            <div>
              <div className="footer-heading">Quick Links</div>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/catalog">All Parts</Link></li>
                <li><Link to="/catalog?categorySlug=engine-parts">Engine Parts</Link></li>
                <li><Link to="/catalog?categorySlug=suspension-braking">Brakes & Suspension</Link></li>
                <li><Link to="/catalog?categorySlug=electrical">Electrical</Link></li>
                <li><Link to="/track">Track Order</Link></li>
              </ul>
            </div>
            <div>
              <div className="footer-heading">Compatible Cars</div>
              <ul className="footer-links">
                <li><Link to="/catalog?q=Swift">Maruti Swift</Link></li>
                <li><Link to="/catalog?q=Baleno">Maruti Baleno</Link></li>
                <li><Link to="/catalog?q=Brezza">Maruti Brezza</Link></li>
                <li><Link to="/catalog?q=Dzire">Maruti Dzire</Link></li>
                <li><Link to="/catalog?q=Ertiga">Maruti Ertiga</Link></li>
                <li><Link to="/catalog?q=Alto">Maruti Alto</Link></li>
              </ul>
            </div>
            <div>
              <div className="footer-heading">Why Us</div>
              <ul className="footer-links">
                <li><span>✅ 100% Genuine OEM Parts</span></li>
                <li><span>🚚 Fast Pan-India Delivery</span></li>
                <li><span>🔁 Easy Returns (30 days)</span></li>
                <li><span>🛡️ Warranty on All Parts</span></li>
                <li><span>📞 Expert Support</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span className="footer-copy">© 2025 CarDekho Auto Parts. All rights reserved.</span>
        <div className="footer-certs">
          <span className="cert-badge">ISO 9001</span>
          <span className="cert-badge">FSSAI</span>
          <span className="cert-badge">Made in India</span>
          <span className="cert-badge">GST Verified</span>
        </div>
      </div>
    </footer>
  )
}
