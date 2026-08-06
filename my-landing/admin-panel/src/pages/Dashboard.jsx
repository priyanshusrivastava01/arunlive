import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Link to="/hero" style={{ padding: '20px', backgroundColor: '#3B82F6', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Hero Section</h2>
          <p>Edit heading, subheading, CTA</p>
        </Link>
        <Link to="/pricing" style={{ padding: '20px', backgroundColor: '#10B981', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Pricing</h2>
          <p>Manage pricing tiers</p>
        </Link>
      </div>
    </div>
  );
}
