import React from 'react';
import { FlickeringLogoM } from '@/components/FlickeringLogoM';
import { toast } from 'sonner';

export default function DomainForSale() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#050D07' }}>
      {/* Background Flickering M Logo */}
      <FlickeringLogoM size={700} />

      {/* Content wrapper */}
      <main 
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <span className="section-badge" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: '#22C55E',
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: '9999px',
              padding: '6px 16px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
              Premium Domain Name
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              lineHeight: 1.1,
              color: '#F2EDE4',
              marginBottom: '1rem',
              textShadow: '0 4px 24px rgba(0,0,0,0.5)'
            }}
          >
            maneage.com
          </h1>
          
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 800,
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.2,
              color: '#22C55E',
              marginBottom: '2.5rem',
              textShadow: '0 4px 24px rgba(0,0,0,0.5)'
            }}
          >
            is for sale.
          </h2>

          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1.15rem',
              color: 'rgba(242,237,228,0.7)',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '0 auto 3rem',
            }}
          >
            This premium domain name is available for acquisition. Interested parties should reach out below.
          </p>

          <button 
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              try {
                // Wait for the copy to finish
                await navigator.clipboard.writeText("sariabdelrazeq99@gmail.com");
                
                // Show toast
              toast.success("Email address copied to clipboard!", {
                style: {
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#22C55E',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  backdropFilter: 'blur(12px)',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                },
                icon: (
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: '#22C55E', 
                    display: 'inline-block',
                    boxShadow: '0 0 8px #22C55E'
                  }} />
                )
              });
              } catch (err) {
                console.error("Failed to copy", err);
              }
              
              // Open mail client after a tiny delay so toast can render
              setTimeout(() => {
                window.location.href = "mailto:sariabdelrazeq99@gmail.com?subject=Regarding maneage.com";
              }, 300);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              backgroundColor: '#22C55E',
              color: '#050D07',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              fontSize: '1.125rem',
              padding: '16px 32px',
              borderRadius: '9999px',
              border: 'none',
              boxShadow: '0 0 32px rgba(34,197,94,0.3)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 48px rgba(34,197,94,0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 32px rgba(34,197,94,0.3)';
            }}
          >
            Contact Owner
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
