import React, { useEffect, useRef } from 'react';
import { ShimmerButton } from '@/components/ui/shimmer-button';

const plans = [
  {
    seats: '1 SEAT',
    price: '120₪',
    period: '/monthly',
    desc: 'Perfect for solo stylists',
    highlight: false,
  },
  {
    seats: '2–5 SEATS',
    price: '180₪',
    period: '/monthly',
    desc: 'For growing teams',
    highlight: true,
  },
  {
    seats: '5+ SEATS',
    price: '220₪',
    period: '/monthly',
    desc: 'Enterprise salons & chains',
    highlight: false,
  },
];

export function PricingSection({ onWaitlistOpen }: { onWaitlistOpen?: () => void } = {}) {
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
      id="pricing"
      ref={ref}
      style={{ padding: '5rem 1.5rem' }}
    >
      <hr className="section-divider" style={{ marginBottom: '5rem' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Pricing cards */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.seats}
              style={{
                background: plan.highlight ? 'rgba(34,197,94,0.07)' : 'rgba(255,255,255,0.025)',
                borderTop: plan.highlight ? '1px solid rgba(34,197,94,0.45)' : '1px solid rgba(34,197,94,0.1)',
                borderRight: plan.highlight ? '1px solid rgba(34,197,94,0.45)' : '1px solid rgba(34,197,94,0.1)',
                borderBottom: plan.highlight ? '1px solid rgba(34,197,94,0.45)' : '1px solid rgba(34,197,94,0.1)',
                borderLeft: plan.highlight ? '1px solid rgba(34,197,94,0.45)' : '1px solid rgba(34,197,94,0.1)',
                borderRadius: '0.875rem',
                padding: '2rem',
                textAlign: 'center',
                backdropFilter: 'blur(4px)',
                boxShadow: plan.highlight ? '0 0 30px rgba(34,197,94,0.08)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: 'rgba(242,237,228,0.5)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                {plan.seats}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 800,
                    fontSize: '2.75rem',
                    color: '#F2EDE4',
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(242,237,228,0.45)' }}>
                    {plan.period}
                  </span>
                )}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(242,237,228,0.5)' }}>
                {plan.desc}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ShimmerButton
            onClick={() => onWaitlistOpen?.()}
            shimmerColor="#22C55E"
            shimmerDuration="2.5s"
            background="#22C55E"
            borderRadius="9999px"
            className="shadow-[0_0_24px_rgba(34,197,94,0.35)]"
          >
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#050D07', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Join The Waitlist
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#050D07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </ShimmerButton>
        </div>

      </div>
    </section>
  );
}
