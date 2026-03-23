import React, { useEffect, useRef, useState } from 'react';

// Animated counter hook
function useCounter(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// Smooth curved animated line using SVG cubic bezier
function AnimatedLine({
  points,
  color,
  strokeDash,
  delay = 0,
  animate,
}: {
  points: [number, number][];
  color: string;
  strokeDash?: string;
  delay?: number;
  animate: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(1000);
  const [drawn, setDrawn] = useState(false);

  // Build smooth cubic bezier path
  const d = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p[0]} ${p[1]}`;
    const prev = points[i - 1];
    const cpX = (prev[0] + p[0]) / 2;
    return `${acc} C ${cpX} ${prev[1]}, ${cpX} ${p[1]}, ${p[0]} ${p[1]}`;
  }, '');

  // Measure actual path length after mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) setPathLength(len);
    }
  }, []);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setDrawn(true), delay);
    return () => clearTimeout(t);
  }, [animate, delay]);

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={strokeDash ?? `${pathLength}`}
      style={{
        strokeDashoffset: drawn ? 0 : pathLength,
        transition: `stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    />
  );
}

// Chart data
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const thisYear  = [160, 290, 280, 190, 710, 730, 860, 870, 840, 870, 870, 950];
const lastYear  = [100, 200, 240, 180, 430, 500, 620, 680, 640, 680, 760, 800];

const chartW = 520;
const chartH = 130;
const padL   = 4;
const padR   = 4;
const padT   = 8;
const padB   = 22;

function toChartPoints(data: number[]): [number, number][] {
  const maxVal = 1000;
  return data.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * (chartW - padL - padR);
    const y = padT + (1 - v / maxVal) * (chartH - padT - padB);
    return [x, y];
  });
}

const thisYearPts = toChartPoints(thisYear);
const lastYearPts = toChartPoints(lastYear);

// Sidebar icons
const sidebarIcons = [
  // Dashboard grid
  <svg key="dash" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" fill="#22C55E" />
    <rect x="9" y="1" width="6" height="6" rx="1" fill="#22C55E" />
    <rect x="1" y="9" width="6" height="6" rx="1" fill="#22C55E" />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="#22C55E" />
  </svg>,
  // Calendar
  <svg key="cal" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    <path d="M5 1v4M11 1v4M2 7h12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // User
  <svg key="user" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Team
  <svg key="team" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="5" cy="5" r="2.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    <circle cx="11" cy="5" r="2.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    <path d="M1 14c0-2.5 1.8-4 4-4M15 14c0-2.5-1.8-4-4-4M8 14c0-2.5-1.8-4-4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Scissors
  <svg key="scissors" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 2c1 2 1 4 0 6M8 1c1 3 1 6 0 9M12 2c1 2 1 4 0 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Settings
  <svg key="settings" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
];

export function DashboardMockup({ canAnimate = true }: { canAnimate?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!canAnimate) return;
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, [canAnimate]);

  const revenue      = useCounter(18029, 2000, visible);
  const clients      = useCounter(392,   1600, visible);
  const appointments = useCounter(559,   1800, visible);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        margin: '0',
        /* Full rounded corners — no cutoff */
        borderRadius: '14px',
        overflow: 'hidden',
        borderTop: '1px solid rgba(34,197,94,0.2)',
        borderRight: '1px solid rgba(34,197,94,0.2)',
        borderBottom: '1px solid rgba(34,197,94,0.2)',
        borderLeft: '1px solid rgba(34,197,94,0.2)',
        background: '#0A1A10',
        boxShadow: '0 0 80px rgba(34,197,94,0.08)',
        outline: '1px solid rgba(34,197,94,0.05)',
        fontFamily: 'DM Sans, sans-serif',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        marginBottom: '0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Window chrome ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 14px',
          background: '#081210',
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
          borderBottom: '1px solid rgba(34,197,94,0.1)',
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41' }} />
        <div
          style={{
            flex: 1,
            marginLeft: '12px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '6px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10px',
            gap: '6px',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)' }}>Search dashboard...</span>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* Sidebar */}
        <div
          style={{
            width: '48px',
            background: '#081210',
            borderTop: 'none',
            borderBottom: 'none',
            borderLeft: 'none',
            borderRight: '1px solid rgba(34,197,94,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '16px',
            paddingBottom: '16px',
            gap: '4px',
          }}
        >
          {sidebarIcons.map((icon, i) => (
            <div
              key={i}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: i === 0 ? 'rgba(34,197,94,0.15)' : 'transparent',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                borderLeft: i === 0 ? '2px solid #22C55E' : '2px solid transparent',
                transition: 'background 0.2s',
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '16px 16px 20px' }}>

          {/* ── Stat cards ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            {/* Revenue */}
            <div
              style={{
                background: 'rgba(34,197,94,0.06)',
                borderTop: '1px solid rgba(34,197,94,0.12)',
                borderRight: '1px solid rgba(34,197,94,0.12)',
                borderBottom: '1px solid rgba(34,197,94,0.12)',
                borderLeft: '1px solid rgba(34,197,94,0.12)',
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                Monthly Revenue
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                <span style={{ fontSize: '0.65rem', color: '#22C55E' }}>₪</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.2rem', color: '#F2EDE4', letterSpacing: '-0.02em' }}>
                  {revenue.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 7L5 3L8 7" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '0.6rem', color: '#22C55E' }}>8.22%</span>
              </div>
            </div>

            {/* Active Clients */}
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                Active Clients
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.2rem', color: '#F2EDE4' }}>
                {clients}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 7L5 3L8 7" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '0.6rem', color: '#22C55E' }}>+12</span>
              </div>
            </div>

            {/* Appointments */}
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                Appointments
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.2rem', color: '#F2EDE4' }}>
                {appointments}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 7L5 3L8 7" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '0.6rem', color: '#22C55E' }}>+34</span>
              </div>
            </div>
          </div>

          {/* ── Bottom row: chart + side panels ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '10px' }}>

          {/* ── Booking Analytics chart ── */}
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '12px 12px 10px',
            }}
          >
            {/* Chart header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#F2EDE4' }}>Booking Analytics</span>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '18px', height: '2px', background: '#22C55E', borderRadius: '1px' }} />
                  <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>This Year</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <svg width="18" height="4" viewBox="0 0 18 4">
                    <line x1="0" y1="2" x2="18" y2="2" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 3"/>
                  </svg>
                  <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>Last Year</span>
                </div>
              </div>
            </div>

            {/* SVG Chart */}
            <svg
              width="100%"
              viewBox={`0 0 ${chartW} ${chartH}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ display: 'block', overflow: 'visible' }}
            >
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                const y = padT + t * (chartH - padT - padB);
                return (
                  <line
                    key={t}
                    x1={padL}
                    y1={y}
                    x2={chartW - padR}
                    y2={y}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Last year — dashed white line, animates first */}
              <AnimatedLine
                points={lastYearPts}
                color="rgba(255,255,255,0.35)"
                strokeDash="6 4"
                animate={visible}
                delay={300}
              />

              {/* This year — solid green line, animates second */}
              <AnimatedLine
                points={thisYearPts}
                color="#22C55E"
                animate={visible}
                delay={600}
              />

              {/* Month labels */}
              {months.map((m, i) => {
                const x = padL + (i / (months.length - 1)) * (chartW - padL - padR);
                return (
                  <text
                    key={m}
                    x={x}
                    y={chartH - 4}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.25)"
                    fontSize="9"
                    fontFamily="DM Sans, sans-serif"
                  >
                    {m}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* ── Right side panel: Today's Appointments + Top Services ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

            {/* Today's Appointments */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '10px',
              flex: 1,
            }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 600, color: '#F2EDE4', marginBottom: '8px' }}>Today's Schedule</div>
              {[
                { time: '10:00', name: 'Maya Cohen', service: 'Color & Cut', color: '#22C55E' },
                { time: '11:30', name: 'Dana Levi', service: 'Highlights', color: '#22C55E' },
                { time: '13:00', name: 'Yael Ben', service: 'Blowout', color: 'rgba(255,255,255,0.25)' },
                { time: '14:30', name: 'Noa Katz', service: 'Keratin', color: 'rgba(255,255,255,0.25)' },
              ].map((appt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <div style={{ width: '3px', height: '28px', borderRadius: '2px', background: appt.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.58rem', color: '#F2EDE4', fontWeight: 600 }}>{appt.name}</div>
                    <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)' }}>{appt.time} · {appt.service}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Services */}
            <div style={{
              background: 'rgba(34,197,94,0.04)',
              borderTop: '1px solid rgba(34,197,94,0.1)',
              borderRight: '1px solid rgba(34,197,94,0.1)',
              borderBottom: '1px solid rgba(34,197,94,0.1)',
              borderLeft: '1px solid rgba(34,197,94,0.1)',
              borderRadius: '8px',
              padding: '10px',
            }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 600, color: '#F2EDE4', marginBottom: '8px' }}>Top Services</div>
              {[
                { name: 'Color & Cut', pct: 82 },
                { name: 'Highlights', pct: 64 },
                { name: 'Keratin', pct: 47 },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: '7px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.6)' }}>{s.name}</span>
                    <span style={{ fontSize: '0.57rem', color: '#22C55E' }}>{s.pct}%</span>
                  </div>
                  <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.07)' }}>
                    <div style={{ height: '100%', width: `${s.pct}%`, borderRadius: '2px', background: 'linear-gradient(90deg, #22C55E, #16a34a)' }} />
                  </div>
                </div>
              ))}
            </div>

          </div>
          {/* end right panel */}

          </div>
          {/* end bottom grid */}

        </div>
      </div>
    </div>
  );
}
