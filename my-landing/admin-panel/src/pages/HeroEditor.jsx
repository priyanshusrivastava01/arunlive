import { useEffect, useState } from 'react';
import API from '../api/api';

export default function HeroEditor() {
  const [form, setForm] = useState({
    heading: '',
    subheading: '',
    ctaText: '',
    ctaTarget: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/hero')
      .then(res => {
        if (res.data) setForm(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    try {
      await API.put('/hero', form);
      alert('✅ Hero Updated Successfully!');
    } catch (err) {
      alert('❌ Error saving: ' + err.message);
    }
  };

  if (loading) return <div style={{ padding: '20px', fontSize: '18px' }}>⏳ Loading...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red', fontSize: '16px' }}>❌ Error: {error}<br/><small>Make sure backend is running on http://localhost:5000</small></div>;

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '14px',
    fontFamily: 'inherit'
  };

  return (
    <div style={{ maxWidth: '600px', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Hero Section Editor</h2>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>Heading</label>
        <input
          placeholder="Main heading"
          value={form.heading}
          onChange={e => setForm({ ...form, heading: e.target.value })}
          style={inputStyle}
        />

        <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>Subheading</label>
        <textarea
          placeholder="Subheading / Description"
          value={form.subheading}
          onChange={e => setForm({ ...form, subheading: e.target.value })}
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
          rows="3"
        />

        <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>CTA Text</label>
        <input
          placeholder="Button text (e.g., Book Your Slot)"
          value={form.ctaText}
          onChange={e => setForm({ ...form, ctaText: e.target.value })}
          style={inputStyle}
        />

        <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>CTA Target Section ID</label>
        <input
          placeholder="pricing, features, testimonials, faq, guarantee-section"
          value={form.ctaTarget}
          onChange={e => setForm({ ...form, ctaTarget: e.target.value })}
          style={inputStyle}
        />

        <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>Image URL</label>
        <input
          placeholder="https://example.com/image.jpg"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
          style={inputStyle}
        />

        <button
          onClick={save}
          style={{
            width: '100%',
            backgroundColor: '#2563EB',
            color: 'white',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            marginTop: '16px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1D4ED8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2563EB'}
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}
