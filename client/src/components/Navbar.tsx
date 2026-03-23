import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || open ? 'rgba(13,13,13,0.96)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(34,197,94,0.12)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <nav className="flex items-center justify-between" style={{ height: '64px' }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: '#F2EDE4',
            }}>
              maneage<span style={{ color: '#22C55E' }}>.com</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center" style={{ gap: '2.5rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(242,237,228,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F2EDE4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,228,0.7)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <a href="#pricing" className="btn-green" style={{ padding: '0.55rem 1.3rem', fontSize: '0.875rem' }}>
              Start Your Free Trial
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{ color: '#F2EDE4', background: 'none', borderTop: 'none', borderRight: 'none', borderBottom: 'none', borderLeft: 'none', padding: '0.25rem' }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(13,13,13,0.98)',
          borderTop: '1px solid rgba(34,197,94,0.1)',
          padding: '1.25rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: 'rgba(242,237,228,0.8)',
                textDecoration: 'none',
                fontSize: '1rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(34,197,94,0.1)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="#pricing" className="btn-green" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
            Start Your Free Trial
          </a>
        </div>
      )}
    </header>
  );
}
