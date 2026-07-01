'use client';

const CX     = 100;
const CY     = 100;
const TEXT_R = 82;

const RING_TEXT =
  'DECADES OF HANDS-ON EXPERTISE. ' +
  'DECADES OF HANDS-ON EXPERTISE. ';

// ── Sizes & offsets ───────────────────────────────────────────────────────────
//   Desktop  170px  half=85px   → bottom:-85px
//   lg-xl    140px  half=70px   → bottom:-70px  (media query override)
//   Mobile   130px  half=65px   → bottom:-65px
//   Tablet   150px  half=75px   → bottom:-75px  (sm media query override)
// ─────────────────────────────────────────────────────────────────────────────
const BADGE_STYLES = `
  @keyframes tb-rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .tb-spin-d, .tb-spin-m {
    transform-origin: 100px 100px;
    animation: tb-rotate 30s linear infinite;
  }

  /* Desktop 170px */
  .tb-size-d { width: 170px; height: 170px; }

  /* lg→xl shrink to 140px, adjust offset */
  @media (min-width: 1024px) and (max-width: 1279px) {
    .tb-size-d          { width: 140px !important; height: 140px !important; }
    .tb-desktop-pos     { bottom: -70px !important; }
  }

  /* Mobile base 130px */
  .tb-size-m { width: 130px; height: 130px; }

  /* Tablet 640-1023px → 150px, adjust offset */
  @media (min-width: 640px) and (max-width: 1023px) {
    .tb-size-m          { width: 150px !important; height: 150px !important; }
    .tb-mobile-pos      { bottom: -75px !important; }
  }
`;

// ── Shared SVG artwork ────────────────────────────────────────────────────────
function BadgeSVG({ spinClass, pathId }) {
  const pathD =
    `M ${CX} ${CY - TEXT_R} ` +
    `A ${TEXT_R} ${TEXT_R} 0 1 1 ${CX - 0.001} ${CY - TEXT_R}`;

  return (
    <svg
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={CX} cy={CY} r="99.5" fill="#F6E837" />
      <circle cx={CX} cy={CY} r="98" fill="none" stroke="#1A1A2A" strokeWidth="2" />
      <defs>
        <path id={pathId} d={pathD} />
      </defs>
      <g className={spinClass}>
        <text
          fill="#1A1A2A"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.07"
          fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
          textRendering="geometricPrecision"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {RING_TEXT}
          </textPath>
        </text>
      </g>
      <image
        href="/logo1.png"
        x="54" y="54"
        width="92" height="92"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MOBILE BADGE  (visible only < 1024px)
//
//  • Absolute, inside the outer HeroSection wrapper (outside overflow:hidden).
//  • Centered horizontally: left-0 right-0 + flex justify-center via classes.
//  • bottom: -65px  →  badge center sits on hero/services seam (130px / 2).
//  • CRITICAL: NO inline display style — Tailwind lg:hidden controls display.
//    An inline display:flex would override lg:hidden (display:none) and cause
//    the badge to appear on desktop regardless of the breakpoint class.
// ─────────────────────────────────────────────────────────────────────────────
export function TrustBadgeMobile() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BADGE_STYLES }} />
      <div
        className="tb-mobile-pos lg:hidden absolute left-0 right-0 flex justify-center pointer-events-none select-none"
        style={{
          bottom: '-65px',
          zIndex: 20,
          /* NO display property here — Tailwind lg:hidden owns it */
        }}
        aria-hidden="true"
      >
        <div
          className="tb-size-m"
          style={{
            borderRadius: '50%',
            flexShrink: 0,
            boxShadow:
              '0 0 40px rgba(246,232,55,0.35), ' +
              '0 0 80px rgba(246,232,55,0.14), ' +
              '0 14px 40px rgba(0,0,0,0.50)',
          }}
        >
          <BadgeSVG spinClass="tb-spin-m" pathId="tb-ring-path-m" />
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  DESKTOP BADGE  (visible only ≥ 1024px)
//
//  • Absolute, inside the outer HeroSection wrapper (outside overflow:hidden).
//  • right: 35px  = original horizontal position.
//  • bottom: -85px = half of 170px → badge center sits on hero/services seam.
//  • CRITICAL: NO inline display style — Tailwind hidden lg:block controls it.
// ─────────────────────────────────────────────────────────────────────────────
export function TrustBadgeDesktop() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BADGE_STYLES }} />
      <div
        className="tb-desktop-pos hidden lg:block absolute pointer-events-none select-none"
        style={{
          right:  '35px',
          bottom: '-85px',
          zIndex: 20,
          /* NO display property here — Tailwind hidden lg:block owns it */
        }}
        aria-hidden="true"
      >
        <div
          className="tb-size-d"
          style={{
            borderRadius: '50%',
            boxShadow: '0 0 40px rgba(246,232,55,0.28), 0 15px 40px rgba(0,0,0,0.35)',
          }}
        >
          <BadgeSVG spinClass="tb-spin-d" pathId="tb-ring-path-d" />
        </div>
      </div>
    </>
  );
}

// Default export — no-op, kept so stale bare imports don't break the build.
export default function TrustBadge() {
  return null;
}
