import { useState, useEffect } from 'react';
import API from '../api';

export default function LiveBanner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/live-banner')
      .then(res => {
        if (res.data) setBanner(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Live banner fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !banner || !banner.isActive) return null;

  return (
    <section style={{
      width: '100%',
      paddingLeft: '24px',
      paddingRight: '24px',
      marginTop: '24px',
      marginBottom: '40px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#FEF3C7',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '20px',
        paddingBottom: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        textAlign: 'center'
      }}>

        {/* Badge */}
        <p style={{
          color: '#DC2626',
          fontWeight: 'bold',
          fontSize: '14px',
          margin: 0
        }}>
          {banner.badgeText}
        </p>

        {/* Title */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginTop: '8px',
          marginBottom: 0,
          color: '#1F2937'
        }}>
          {banner.title}
        </h3>

        {/* Subtitle */}
        <p style={{
          fontSize: '14px',
          color: '#71717A',
          marginTop: '8px',
          marginBottom: 0
        }}>
          {banner.subtitle}
        </p>

        {/* Viewers Count */}
        {banner.viewersEnabled && (
          <p style={{
            fontSize: '12px',
            color: '#DC2626',
            marginTop: '8px',
            marginBottom: 0
          }}>
            👁 {banner.viewersCount} people viewing right now
          </p>
        )}

      </div>
    </section>
  );
}
