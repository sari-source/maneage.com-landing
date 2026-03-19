import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

const AVATAR_URL = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face';

export function TestimonialSection() {
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
      style={{ padding: '5rem 1.5rem', textAlign: 'center' }}
    >
      <hr className="section-divider" style={{ marginBottom: '5rem' }} />
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Headline */}
        <h2
          className="reveal"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#F2EDE4',
            lineHeight: 1.2,
            marginBottom: '2.5rem',
          }}
        >
          From "Just Another Shop" to the{' '}
          <span style={{ color: '#22C55E', fontStyle: 'italic' }}>Standout Salon</span>{' '}
          in Town.
        </h2>

        {/* Testimonial card */}
        <div
          className="reveal"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderTop: '1px solid rgba(34,197,94,0.15)',
            borderRight: '1px solid rgba(34,197,94,0.15)',
            borderBottom: '1px solid rgba(34,197,94,0.15)',
            borderLeft: '1px solid rgba(34,197,94,0.15)',
            borderRadius: '1rem',
            padding: '2.25rem',
            textAlign: 'left',
            backdropFilter: 'blur(4px)',
          }}
        >
          {/* Stars */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '1.25rem' }}>
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={16} color="#22C55E" fill="#22C55E" />
            ))}
          </div>

          {/* Quote */}
          <p
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: '#F2EDE4',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            "maneage.com cut out the middleman entirely. My clients love having my specific app on
            their phone, and my back-end chaos is finally organized."
          </p>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={AVATAR_URL}
              alt="Maya Cohen"
              style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#F2EDE4' }}>
                Luna D.
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(242,237,228,0.5)' }}>
                Owner, Luna's Studio — Tel Aviv
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
