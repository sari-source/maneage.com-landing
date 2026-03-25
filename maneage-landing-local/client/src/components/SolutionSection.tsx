import React, { useEffect, useRef } from 'react';
import { Smartphone, CalendarCheck, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'White-Label App',
    desc: "Your own branded ecosystem. Clients see your logo, your colors, your identity — no marketplace noise.",
  },
  {
    icon: CalendarCheck,
    title: 'Automated Back-End',
    desc: "Calendar appointments and WhatsApp reminders handled automatically. Never miss a booking again.",
  },
  {
    icon: BarChart3,
    title: 'Data Control',
    desc: "See and manage your shop's analytics in one simple dashboard. Your data, your insights, your power.",
  },
];

export function SolutionSection() {
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
      id="features"
      ref={ref}
      style={{ padding: '5rem 1.5rem' }}
    >
      <hr className="section-divider" style={{ marginBottom: '5rem' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <span className="section-badge">The Solution</span>
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#F2EDE4',
              lineHeight: 1.2,
            }}
          >
            We Built maneage.com to Give You{' '}
            <span style={{ color: '#22C55E', fontStyle: 'italic' }}>Your Brand Back.</span>
          </h2>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="reveal feature-card"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(34,197,94,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Icon size={22} color="#22C55E" />
                </div>
                <h3
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#F2EDE4',
                    marginBottom: '0.6rem',
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.9rem',
                    color: 'rgba(242,237,228,0.55)',
                    lineHeight: 1.65,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
