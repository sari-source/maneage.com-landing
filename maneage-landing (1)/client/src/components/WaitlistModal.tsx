/**
 * WaitlistModal — maneage.com
 * Dark-themed modal matching the landing page gradient.
 * Opens when any "Join The Waitlist" button is clicked.
 * Closes on backdrop click, Escape key, or the X button.
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, X } from 'lucide-react';

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  /* Lock body scroll when open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  /* Reset form when re-opened */
  useEffect(() => {
    if (open) {
      setEmail('');
      setSubmitted(false);
      setError('');
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  if (!open) return null;

  return createPortal(
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 8, 5, 0.88)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'mfadeIn 0.2s ease',
      }}
    >
      {/* Modal card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          background: 'linear-gradient(160deg, #0D1F13 0%, #081209 100%)',
          borderTop: '1px solid rgba(34,197,94,0.18)',
          borderRight: '1px solid rgba(34,197,94,0.18)',
          borderBottom: '1px solid rgba(34,197,94,0.18)',
          borderLeft: '1px solid rgba(34,197,94,0.18)',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(34,197,94,0.06)',
          animation: 'mslideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            borderTop: 'none',
            borderRight: 'none',
            borderBottom: 'none',
            borderLeft: 'none',
            cursor: 'pointer',
            color: 'rgba(242,237,228,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            borderRadius: '6px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#22C55E')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,228,0.35)')}
        >
          <X size={18} />
        </button>

        {submitted ? (
          /* ── Success state ── */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(34,197,94,0.12)',
                borderTop: '1px solid rgba(34,197,94,0.3)',
                borderRight: '1px solid rgba(34,197,94,0.3)',
                borderBottom: '1px solid rgba(34,197,94,0.3)',
                borderLeft: '1px solid rgba(34,197,94,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <CheckCircle2 size={28} color="#22C55E" />
            </div>
            <h2
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#F2EDE4',
                marginBottom: '0.5rem',
              }}
            >
              You're on the list!
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(242,237,228,0.6)', lineHeight: 1.6 }}>
              We'll email you at{' '}
              <strong style={{ color: '#22C55E' }}>{email}</strong>{' '}
              the moment maneage.com goes live. Your 3 free months are locked in.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: '1.5rem',
                padding: '0.65rem 1.5rem',
                background: '#22C55E',
                color: '#0A0A0A',
                fontWeight: 700,
                fontSize: '0.9rem',
                fontFamily: 'DM Sans, sans-serif',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                borderLeft: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#16a34a')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#22C55E')}
            >
              Back to the site
            </button>
          </div>
        ) : (
          <>
            {/* ── Headline ── */}
            <h2
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
                fontWeight: 800,
                color: '#F2EDE4',
                lineHeight: 1.2,
                marginBottom: '0.6rem',
                paddingRight: '1.5rem',
              }}
            >
              Stop sharing your clients.{' '}
              <span style={{ color: '#22C55E', fontStyle: 'italic' }}>Start your own app.</span>
            </h2>

            {/* ── Sub-headline ── */}
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(242,237,228,0.5)',
                lineHeight: 1.65,
                marginBottom: '1.5rem',
              }}
            >
              maneage.com is launching soon. Join the waitlist today to be the first to get your
              white-label Progressive Web App (PWA) and fully automated booking dashboard.
            </p>

            {/* ── Incentive checklist ── */}
            <div
              style={{
                background: 'rgba(34,197,94,0.05)',
                borderTop: '1px solid rgba(34,197,94,0.12)',
                borderRight: '1px solid rgba(34,197,94,0.12)',
                borderBottom: '1px solid rgba(34,197,94,0.12)',
                borderLeft: '1px solid rgba(34,197,94,0.12)',
                borderRadius: '12px',
                padding: '1rem 1.1rem',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'rgba(242,237,228,0.4)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                Join the waitlist today to unlock:
              </p>
              {[
                {
                  title: '3 Months Completely Free',
                  desc: 'Run your fully automated booking app for 90 days, entirely on us.',
                },
                {
                  title: 'Early Access',
                  desc: 'Be the first to cut out the middleman and launch your app.',
                },
                {
                  title: 'Free Setup',
                  desc: "We'll help you import your shop's data the day we go live.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '9px',
                    marginBottom: i < 2 ? '0.65rem' : 0,
                  }}
                >
                  <CheckCircle2
                    size={16}
                    color="#22C55E"
                    style={{ flexShrink: 0, marginTop: '3px' }}
                  />
                  <span style={{ fontSize: '0.84rem', color: 'rgba(242,237,228,0.75)', lineHeight: 1.5 }}>
                    <strong style={{ color: '#F2EDE4' }}>{item.title}:</strong> {item.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Enter your best Gmail address..."
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    fontSize: '0.93rem',
                    borderRadius: '10px',
                    borderTop: '1.5px solid rgba(34,197,94,0.2)',
                    borderRight: '1.5px solid rgba(34,197,94,0.2)',
                    borderBottom: '1.5px solid rgba(34,197,94,0.2)',
                    borderLeft: '1.5px solid rgba(34,197,94,0.2)',
                    outline: 'none',
                    color: '#F2EDE4',
                    fontFamily: 'DM Sans, sans-serif',
                    background: 'rgba(255,255,255,0.05)',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#22C55E';
                    e.currentTarget.style.background = 'rgba(34,197,94,0.07)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                />

                {error && (
                  <p style={{ fontSize: '0.78rem', color: '#F87171', margin: 0 }}>{error}</p>
                )}

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.88rem 1rem',
                    fontSize: '0.97rem',
                    fontWeight: 700,
                    fontFamily: 'DM Sans, sans-serif',
                    background: '#22C55E',
                    color: '#0A0A0A',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    borderLeft: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                    transition: 'background 0.2s, transform 0.1s',
                    boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#16a34a';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#22C55E';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Get 3 Months Free →
                </button>
              </div>

              {/* Anti-spam */}
              <p
                style={{
                  fontSize: '0.72rem',
                  color: 'rgba(242,237,228,0.3)',
                  textAlign: 'center',
                  marginTop: '0.85rem',
                  lineHeight: 1.5,
                }}
              >
                We respect your inbox. No spam. You'll only get an email when it's time to claim
                your custom-branded app.
              </p>
            </form>
          </>
        )}
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes mfadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes mslideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0)    scale(1)    }
        }
        input::placeholder { color: rgba(242,237,228,0.3); }
      `}</style>
    </div>,
    document.body
  );
}
