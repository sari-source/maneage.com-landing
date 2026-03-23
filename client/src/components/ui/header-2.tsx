'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

export function Header({ onWaitlistOpen }: { onWaitlistOpen?: () => void } = {}) {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ];

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto w-full border-b border-transparent transition-all ease-out',
        'md:rounded-md md:border md:transition-all md:ease-out',
        {
          'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow':
            scrolled && !open,
          'bg-background/90': open,
        },
      )}
      style={{
        /* Override background to use our dark green gradient tones */
        ...(scrolled && !open
          ? { background: 'rgba(10, 26, 16, 0.92)', borderColor: 'rgba(34,197,94,0.15)' }
          : open
          ? { background: 'rgba(10, 26, 16, 0.96)' }
          : {}),
      }}
    >
      <nav
        className={cn(
          'grid h-14 w-full grid-cols-3 items-center px-4 md:h-12 md:transition-all md:ease-out',
          { 'md:px-2': scrolled },
        )}
      >
        {/* Logo — left */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#F2EDE4',
            }}
          >
            maneage<span style={{ color: '#22C55E' }}>.com</span>
          </span>
        </a>

        {/* Desktop nav — center */}
        <div className="hidden items-center justify-center gap-2 md:flex">
          {links.map((link, i) => (
            <a
              key={i}
              className={buttonVariants({ variant: 'ghost' })}
              href={link.href}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: 'rgba(242,237,228,0.7)',
                fontSize: '0.875rem',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA — right */}
        <div className="hidden items-center justify-end gap-2 md:flex">
          <Button
            onClick={() => onWaitlistOpen?.()}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              background: '#22C55E',
              color: '#0A0A0A',
              fontWeight: 700,
              fontSize: '0.875rem',
              borderRadius: '9999px',
            }}
          >
            Join The Waitlist
          </Button>
        </div>

        {/* Mobile toggle — right corner */}
        <div className="flex justify-end md:hidden">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            style={{
              borderColor: 'rgba(34,197,94,0.35)',
              color: '#F2EDE4',
              background: 'transparent',
            }}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
          open ? 'block' : 'hidden',
        )}
        style={{
          background: 'rgba(8, 20, 12, 0.97)',
          borderColor: 'rgba(34,197,94,0.12)',
        }}
      >
        <div
          data-slot={open ? 'open' : 'closed'}
          className={cn(
            'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
            'flex h-full w-full flex-col justify-between gap-y-2 p-4',
          )}
        >
          <div className="grid gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({ variant: 'ghost', className: 'justify-start' })}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  color: '#F2EDE4',
                  fontSize: '1rem',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={() => { setOpen(false); onWaitlistOpen?.(); }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                background: '#22C55E',
                color: '#0A0A0A',
                fontWeight: 700,
                borderRadius: '9999px',
              }}
            >
              Join The Waitlist
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
