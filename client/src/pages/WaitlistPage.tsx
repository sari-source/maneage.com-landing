/**
 * WaitlistPage — maneage.com
 *
 * Design: Dark Organic Luxury (same as landing page)
 * Background: same fixed gradient (#0A1A10 → #050A07)
 * Form card: elevated white card, max-width 500px, centered
 * Typography: Playfair Display (headlines) + DM Sans (body)
 *
 * StoryBrand structure:
 * 1. Villain reminder (sub-label above headline)
 * 2. Bold headline
 * 3. Sub-headline
 * 4. Incentive checklist (3 items with green checkmarks)
 * 5. Email input + CTA button (grouped tightly inside card)
 * 6. Anti-spam agreement text
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    if (supabase) {
      const { error: supaError } = await supabase
        .from('waitlist')
        .insert([{ email }]);
      
      if (supaError) {
        setIsSubmitting(false);
        if (supaError.code === '23505') {
          setError('This email is already on the waitlist.');
        } else {
          setError('Failed to join waitlist. Please try again.');
          console.error(supaError);
        }
        return;
      }
    } else {
      console.warn('Supabase client not initialized. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
    }

    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0A1A10 0%, #071209 40%, #050A07 100%)',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {/* Back link */}
      <div style={{ width: '100%', maxWidth: '500px', marginBottom: '1.5rem' }}>
        <Link href="/">
          <a
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(242,237,228,0.5)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#22C55E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,228,0.5)')}
          >
            <ArrowLeft size={14} />
            Back to maneage.com
          </a>
        </Link>
      </div>

      {/* Villain label */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(239,68,68,0.08)',
          borderTop: '1px solid rgba(239,68,68,0.2)',
          borderRight: '1px solid rgba(239,68,68,0.2)',
          borderBottom: '1px solid rgba(239,68,68,0.2)',
          borderLeft: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '9999px',
          padding: '5px 14px',
          marginBottom: '1.5rem',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#EF4444',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#FCA5A5', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Generic directory apps are stealing your clients
        </span>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          color: '#F2EDE4',
          textAlign: 'center',
          lineHeight: 1.15,
          marginBottom: '1rem',
          maxWidth: '600px',
        }}
      >
        Stop sharing your clients.{' '}
        <span style={{ color: '#22C55E', fontStyle: 'italic' }}>Start your own app.</span>
      </h1>

      {/* Sub-headline */}
      <p
        style={{
          fontSize: '1rem',
          color: 'rgba(242,237,228,0.55)',
          textAlign: 'center',
          maxWidth: '520px',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}
      >
        maneage.com is launching soon. Join the waitlist today to be the first to get your
        white-label Progressive Web App and fully automated booking dashboard.
      </p>

      {/* Elevated form card */}
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          background: '#ffffff',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 80px rgba(0,0,0,0.55), 0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {submitted ? (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(34,197,94,0.12)',
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
                color: '#111',
                marginBottom: '0.5rem',
              }}
            >
              You're on the list!
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6 }}>
              We'll email you at <strong style={{ color: '#111' }}>{email}</strong> the moment
              maneage.com goes live. Your 120₪/month price is locked in.
            </p>
          </div>
        ) : (
          <>
            {/* Incentive checklist */}
            <div style={{ marginBottom: '1.75rem' }}>
              <p
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#374151',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Join the waitlist today to unlock:
              </p>
              {[
                {
                  title: 'Early Access',
                  desc: 'Be the first to cut out the middleman and launch your app.',
                },
                {
                  title: 'Lifetime Pricing Lock',
                  desc: 'Secure your individual seat for just 120₪/monthly.',
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
                    gap: '10px',
                    marginBottom: i < 2 ? '0.85rem' : 0,
                  }}
                >
                  <CheckCircle2
                    size={18}
                    color="#22C55E"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  />
                  <span style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.5 }}>
                    <strong style={{ color: '#111' }}>{item.title}:</strong> {item.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                background: '#F3F4F6',
                marginBottom: '1.5rem',
              }}
            />

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Input + button grouped tightly */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your best Gmail address..."
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    fontSize: '0.95rem',
                    borderRadius: '10px',
                    borderTop: '1.5px solid #E5E7EB',
                    borderRight: '1.5px solid #E5E7EB',
                    borderBottom: '1.5px solid #E5E7EB',
                    borderLeft: '1.5px solid #E5E7EB',
                    outline: 'none',
                    color: '#111',
                    fontFamily: 'DM Sans, sans-serif',
                    background: '#FAFAFA',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#22C55E';
                    e.currentTarget.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = '#FAFAFA';
                  }}
                />

                {error && (
                  <p style={{ fontSize: '0.8rem', color: '#EF4444', margin: '0' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    fontFamily: 'DM Sans, sans-serif',
                    background: isSubmitting ? '#16a34a' : '#22C55E',
                    color: '#0A0A0A',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    borderLeft: 'none',
                    borderRadius: '10px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.01em',
                    transition: 'background 0.2s, transform 0.1s',
                    boxShadow: '0 4px 20px rgba(34,197,94,0.35)',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = '#16a34a';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = '#22C55E';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isSubmitting ? 'Joining...' : 'Get Early Access →'}
                </button>
              </div>

              {/* Anti-spam agreement */}
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#9CA3AF',
                  textAlign: 'center',
                  marginTop: '1rem',
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

      {/* Bottom brand */}
      <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(242,237,228,0.25)' }}>
        maneage<span style={{ color: '#22C55E' }}>.com</span> — Your Salon. Your App.
      </p>
    </div>
  );
}
