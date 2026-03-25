import React, { useEffect, useRef } from 'react';
import { UserPlus, RefreshCw, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign Up',
    desc: 'Secure your seat starting at just 120₪/monthly. No long-term contracts.',
  },
  {
    number: '02',
    icon: RefreshCw,
    title: 'Import Data',
    desc: "Sync your shop's services, staff, and calendar in minutes — not days.",
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch',
    desc: 'Invite clients to book directly from your logo on their home screen.',
  },
];

export function ProcessSection() {
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
      id="how-it-works"
      ref={ref}
      style={{ padding: '5rem 1.5rem' }}
    >
      <hr className="section-divider" style={{ marginBottom: '5rem' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <span className="section-badge">Simple Process</span>
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
            Launch Your Own App in{' '}
            <span style={{ color: '#22C55E', fontStyle: 'italic' }}>3</span>
          </h2>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 800,
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#22C55E',
              lineHeight: 1.2,
            }}
          >
            Simple Steps
          </h2>
        </div>

        {/* Step cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="reveal step-card"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Step badge */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      borderTop: '1px solid rgba(34,197,94,0.4)',
                      borderRight: '1px solid rgba(34,197,94,0.4)',
                      borderBottom: '1px solid rgba(34,197,94,0.4)',
                      borderLeft: '1px solid rgba(34,197,94,0.4)',
                      background: 'rgba(34,197,94,0.08)',
                      color: '#22C55E',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    Step {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(34,197,94,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
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
                    marginBottom: '0.5rem',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.9rem',
                    color: 'rgba(242,237,228,0.55)',
                    lineHeight: 1.65,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
