# maneage.com Landing Page – Design Ideas

## Design Brief
Black primary, dark green secondary. StoryBrand 6-section layout for a white-label PWA booking system for salons.

---

<response>
<probability>0.07</probability>
<text>

## Idea 1: Dark Editorial Luxury

**Design Movement:** Dark Editorial / High-End Magazine (Vogue meets SaaS)

**Core Principles:**
1. Deep black canvas with emerald-green as the only accent — every element earns its place
2. Asymmetric, offset grid — content bleeds, overlaps, and breathes
3. Typography as art — massive display headlines contrast with tight body text
4. Restraint over decoration — no gradients, no glow, just sharp contrast

**Color Philosophy:**
- Background: `#0A0A0A` (near-black, not pure black — avoids harshness)
- Primary accent: `#1A5C3A` (deep forest green)
- Bright accent: `#2ECC71` (emerald pop for CTAs only)
- Text: `#F5F0E8` (warm off-white — feels editorial, not clinical)
- Muted: `#3A3A3A`

**Layout Paradigm:**
- Asymmetric two-column hero (60/40 split)
- Section transitions use overlapping cards that cross background boundaries
- Feature cards use left-border accent (4px emerald stripe)
- Process steps in a horizontal timeline with large step numbers as background art

**Signature Elements:**
1. Giant typographic numbers (01, 02, 03) as decorative backgrounds in process section
2. Thick emerald left-border on every feature card
3. Overlapping testimonial card that straddles the footer boundary

**Interaction Philosophy:**
- Hover states: subtle emerald underline slides in from left
- CTA buttons: solid emerald with 2px offset shadow on hover
- Cards: slight Y-translate on hover with shadow deepening

**Animation:**
- Entrance: fade-up with 0.3s stagger per element
- Hero image: subtle float animation (translateY ±8px, 4s ease-in-out infinite)
- Section transitions: clip-path reveal on scroll

**Typography System:**
- Display: `Playfair Display` (serif, bold) — headlines
- Body: `DM Sans` (geometric sans) — paragraphs and UI
- Accent: `DM Mono` (monospace) — step numbers, labels

</text>
</response>

<response>
<probability>0.05</probability>
<text>

## Idea 2: Brutalist Dark Tech

**Design Movement:** Neo-Brutalism × Dark Mode

**Core Principles:**
1. Raw, unapologetic structure — visible borders, hard shadows, no softness
2. Black and green as a power duo — no neutrals, no compromise
3. Grid-breaking layouts — elements deliberately escape their containers
4. Text hierarchy through weight extremes — ultra-bold vs ultra-light

**Color Philosophy:**
- Background: `#111111`
- Green: `#16A34A` (vivid, saturated)
- Accent borders: `#22C55E`
- Text: `#FFFFFF`
- Card backgrounds: `#1A1A1A` with `2px solid #22C55E` borders

**Layout Paradigm:**
- Full-width sections with hard horizontal rules
- Cards with visible 3px offset drop shadows in green
- Process steps as numbered boxes with brutalist borders

**Signature Elements:**
1. Hard-edged 3px green borders on all cards
2. Oversized step numbers in green outline font
3. Marquee ticker of feature keywords between sections

**Interaction Philosophy:**
- Buttons: hard shadow shifts on hover (no transition, instant)
- Links: green underline, no fade

**Animation:**
- Minimal — only entrance slide-in, no continuous animations
- Hover: instant color invert on buttons

**Typography System:**
- Display: `Space Grotesk` (bold, geometric)
- Body: `IBM Plex Sans`
- Numbers: `Space Mono`

</text>
</response>

<response>
<probability>0.08</probability>
<text>

## Idea 3: Organic Dark Luxury (CHOSEN)

**Design Movement:** Dark Organic Luxury — think high-end spa meets modern SaaS

**Core Principles:**
1. Black as the premium canvas — sophisticated, not aggressive
2. Deep forest green as the living accent — organic, trustworthy, growth
3. Warm cream text — inviting, editorial, human
4. Depth through layering — overlapping elements, subtle grain texture, soft glows

**Color Philosophy:**
- Background: `#0D0D0D` (charcoal black — premium feel)
- Section alternates: `#111A14` (very dark green-tinted black for villain section)
- Primary green: `#1B5E38` (deep forest green)
- Bright green CTA: `#22C55E` (emerald — used ONLY for primary CTAs)
- Text: `#F2EDE4` (warm cream — editorial warmth)
- Muted text: `#8A9E8F` (muted sage)
- Card surface: `#161F18` (dark green-black)
- Accent border: `#2D7A4F` (medium forest green)

**Layout Paradigm:**
- Two-column asymmetric hero (text left, phone mockup right)
- Villain section: full-width dark green-black, centered dramatic text
- Features: three-column grid with top-border accent cards
- Process: horizontal card row with large step numbers as watermarks
- Testimonial: centered card overlapping footer boundary
- Footer: very dark, minimal, single CTA

**Signature Elements:**
1. Subtle grain/noise texture overlay on hero section (CSS-based)
2. Thick top-border (4px) in emerald green on feature/process cards
3. Oversized stylized quotation mark in background of testimonial

**Interaction Philosophy:**
- CTA buttons: emerald fill → dark green on hover with smooth transition
- Ghost buttons: emerald border → fill on hover
- Cards: subtle scale(1.02) + shadow deepening on hover
- Nav links: emerald underline slides from left

**Animation:**
- Hero: fade-up stagger (0.15s delay per element)
- Feature cards: stagger entrance on scroll (Intersection Observer)
- Testimonial: fade-in with slight scale from 0.95
- Floating phone mockup: gentle bob animation

**Typography System:**
- Display: `Cormorant Garamond` (elegant serif — luxury feel for headlines)
- Body: `DM Sans` (clean, modern geometric sans)
- Mono/labels: `DM Mono` (step numbers, badges)
- Scale: 72px hero → 48px section → 32px sub → 18px body

</text>
</response>

---

## CHOSEN APPROACH: Idea 3 — Organic Dark Luxury

**Rationale:** This approach best matches the salon/beauty industry context while delivering a premium, trustworthy feel. The black + forest green palette communicates sophistication and growth. The warm cream text adds editorial warmth that resonates with salon owners who want to feel like their brand is elevated, not just functional.
