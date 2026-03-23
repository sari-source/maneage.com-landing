import React from 'react';

export function Footer() {
  const links = [
    { label: 'Pricing', href: '#pricing' },
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Dashboard Login', href: '#' },
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(34,197,94,0.12)',
        padding: '1.75rem 1.5rem',
        marginTop: '4rem',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#F2EDE4' }}>
            maneage<span style={{ color: '#22C55E' }}>.com</span>
          </span>
        </a>

        {/* Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                color: 'rgba(242,237,228,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F2EDE4')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,228,0.4)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(242,237,228,0.3)' }}>
          © 2026 maneage.com — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
