import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav style={{ padding: '16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>Admin Panel</h2>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <li><Link to="/" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'black' }}>📊 Dashboard</Link></li>
        <li><Link to="/hero" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'black' }}>🦸 Hero</Link></li>
        <li><Link to="/pricing" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'black' }}>💰 Pricing</Link></li>
        <li><Link to="/featured" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'black' }}>⭐ Featured</Link></li>
        <li><Link to="/about" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'black' }}>ℹ️ About</Link></li>
        <li><Link to="/testimonials" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'black' }}>🗣️ Testimonials</Link></li>
        <li><Link to="/faq" style={{ display: 'block', padding: '8px', borderRadius: '4px', textDecoration: 'none', color: 'black' }}>❓ FAQ</Link></li>
      </ul>
    </nav>
  );
}
