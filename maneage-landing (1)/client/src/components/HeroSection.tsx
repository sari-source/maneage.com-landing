import React from 'react';
import { DashboardMockup } from '@/components/DashboardMockup';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { FlickeringLogoM } from '@/components/FlickeringLogoM';

const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
];

export function HeroSection({ onWaitlistOpen, canAnimate }: { onWaitlistOpen?: () => void; canAnimate?: boolean } = {}) {
  return (
    <section style={{ paddingTop: '140px', overflow: 'visible', position: 'relative' }}>
      {/* Flickering M logo — large glowing background element */}
      <FlickeringLogoM size={700} />
      <ContainerScroll
        titleComponent={
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>

            {/* Badge */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <span className="section-badge">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                White-Label PWA Platform
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                lineHeight: 1.1,
                color: '#F2EDE4',
                marginBottom: '0.15em',
              }}
            >
              Your Salon. Your App.
            </h1>
            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 800,
                fontStyle: 'italic',
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                lineHeight: 1.1,
                color: '#22C55E',
                marginBottom: '1.5rem',
              }}
            >
              Complete Control.
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1.05rem',
                color: 'rgba(242,237,228,0.65)',
                lineHeight: 1.7,
                maxWidth: '560px',
                margin: '0 auto 2rem',
              }}
            >
              Stop sending your clients to generic directories. Get a white-label Progressive Web App
              booking system that sits perfectly on your client's home screen.
            </p>

            {/* CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <ShimmerButton
                onClick={() => onWaitlistOpen?.()}
                shimmerColor="#22C55E"
                shimmerDuration="2.5s"
                background="#22C55E"
                borderRadius="9999px"
                className="text-[#050D07] font-bold text-base px-8 py-3.5 shadow-[0_0_24px_rgba(34,197,94,0.35)]"
              >
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#050D07', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Join The Waitlist
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#050D07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </ShimmerButton>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#22C55E', letterSpacing: '0.1em', background: 'rgba(34,197,94,0.1)', borderTop: '1px solid rgba(34,197,94,0.25)', borderRight: '1px solid rgba(34,197,94,0.25)', borderBottom: '1px solid rgba(34,197,94,0.25)', borderLeft: '1px solid rgba(34,197,94,0.25)', borderRadius: '9999px', padding: '3px 12px' }}>
                ✦ AND GET 3 FREE MONTHS
              </span>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex' }}>
                {AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="salon owner"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      borderTop: '2px solid rgba(34,197,94,0.3)',
                      borderRight: '2px solid rgba(34,197,94,0.3)',
                      borderBottom: '2px solid rgba(34,197,94,0.3)',
                      borderLeft: '2px solid rgba(34,197,94,0.3)',
                      marginLeft: i === 0 ? 0 : '-10px',
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </div>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: 'rgba(242,237,228,0.7)' }}>
                <strong style={{ color: '#F2EDE4' }}>500+</strong> salons already thriving
              </span>
            </div>
          </div>
        }
      >
        {/* Dashboard fills the 3D card */}
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '14px' }}>
          <DashboardMockup canAnimate={canAnimate} />
        </div>
      </ContainerScroll>
    </section>
  );
}
