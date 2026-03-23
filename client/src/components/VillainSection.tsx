import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

const stats = [
  { value: '73%', label: 'of clients browse competitors' },
  { value: '2.4x', label: 'higher churn on directories' },
  { value: '40%', label: 'revenue lost to middlemen' },
];

export function VillainSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{ padding: '6rem 1.5rem', textAlign: 'center' }}
    >
      <hr className="section-divider" style={{ marginBottom: '6rem' }} />
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Badge */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <span className="section-badge" style={{ color: 'rgba(242,237,228,0.6)', borderColor: 'rgba(242,237,228,0.15)', background: 'rgba(242,237,228,0.04)' }}>
            <AlertTriangle size={12} />
            The Problem
          </span>
        </div>

        {/* Headline */}
        <h2
          className="reveal"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
            color: '#F2EDE4',
            marginBottom: '1.25rem',
          }}
        >
          Generic Booking Apps Are{' '}
          <span style={{ color: '#22C55E', fontStyle: 'italic' }}>Stealing</span>{' '}
          Your Clients.
        </h2>

        {/* Description */}
        <p
          className="reveal"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1rem',
            color: 'rgba(242,237,228,0.6)',
            lineHeight: 1.75,
            marginBottom: '3rem',
          }}
        >
          When you use a big directory app, your clients are always one tap away from booking a
          competitor. Don't let middlemen hijack your brand identity or your hard-earned loyalty.
        </p>

        {/* Stats */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {stats.map((s) => (
            <div key={s.value} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#22C55E',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(242,237,228,0.5)',
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
