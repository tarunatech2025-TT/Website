'use client';


const D = {
  // Path A — purple, top third
  a: 'M -2 18 L 15 18 L 24 28 L 48 28 L 56 18 L 76 18 L 85 30 L 102 30',
  // Path B — blue, middle section
  b: 'M -2 52 L 12 52 L 20 42 L 38 42 L 46 54 L 66 54 L 74 44 L 90 44 L 98 54 L 102 54',
  // Path C — pink, lower third
  c: 'M 10 72 L 24 72 L 32 64 L 54 64 L 62 74 L 82 74 L 90 64 L 102 64',
  // lengths (unit ≈ 1% of section diagonal; good enough for dashoffset)
  lenA: 130, lenB: 145, lenC: 110,
};

/* ─────────────────────────────────────────────────────────────────────────────
   TABLET paths  (768–1023px)
   Tighter vertical spacing, paths closer together
───────────────────────────────────────────────────────────────────────────── */
const T = {
  a: 'M -2 15 L 18 15 L 28 26 L 52 26 L 62 15 L 82 15 L 92 26 L 102 26',
  b: 'M -2 48 L 14 48 L 24 38 L 44 38 L 54 50 L 74 50 L 84 40 L 102 40',
  c: 'M -2 72 L 16 72 L 26 62 L 50 62 L 60 72 L 80 72 L 90 62 L 102 62',
  lenA: 128, lenB: 138, lenC: 118,
};

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE paths  (<768px)
   Kept for reference but NOT rendered — mobile circuit lines are disabled
   entirely to eliminate SVG filter repaints on low-end devices.
   The static dim base traces are the only mobile decoration (no animation).
───────────────────────────────────────────────────────────────────────────── */
const M = {
  a: 'M -2 18 L 20 18 L 30 28 L 60 28 L 70 18 L 102 18',
  b: 'M -2 38 L 22 38 L 32 48 L 58 48 L 68 38 L 102 38',
  c: 'M -2 58 L 18 58 L 28 68 L 56 68 L 66 58 L 102 58',
  d: 'M -2 78 L 20 78 L 30 88 L 60 88 L 70 78 L 102 78',
  lenA: 108, lenB: 108, lenC: 108, lenD: 108,
};

/* ─────────────────────────────────────────────────────────────────────────────
   CSS keyframes
───────────────────────────────────────────────────────────────────────────── */
function makeKeyframes(id, len, pulse) {
  return `
    @keyframes ${id} {
      0%   { stroke-dashoffset: ${len};        opacity: 0;    }
      4%   { opacity: 1; }
      94%  { opacity: 1; }
      100% { stroke-dashoffset: ${-(pulse)};   opacity: 0;    }
    }
  `;
}

const STYLES = `
  /* Breakpoint visibility */
  /* Mobile (<768px): hide entirely — no animations, no filters, no repaints */
  .cp-mobile  { display: none;  }
  .cp-tablet  { display: none;  }
  .cp-desktop { display: none;  }

  @media (min-width: 768px) {
    .cp-mobile  { display: none;  }
    .cp-tablet  { display: block; }
    .cp-desktop { display: none;  }
  }
  @media (min-width: 1024px) {
    .cp-mobile  { display: none;  }
    .cp-tablet  { display: none;  }
    .cp-desktop { display: block; }
  }

  /* Node breathe */
  @keyframes cp-node {
    0%, 100% { opacity: 0.20; }
    50%       { opacity: 0.50; }
  }

  /* Desktop pulses */
  ${makeKeyframes('cp-da', D.lenA, Math.round(D.lenA * 0.1))}
  ${makeKeyframes('cp-db', D.lenB, Math.round(D.lenB * 0.1))}
  ${makeKeyframes('cp-dc', D.lenC, Math.round(D.lenC * 0.1))}

  /* Tablet pulses */
  ${makeKeyframes('cp-ta', T.lenA, Math.round(T.lenA * 0.1))}
  ${makeKeyframes('cp-tb', T.lenB, Math.round(T.lenB * 0.1))}
  ${makeKeyframes('cp-tc', T.lenC, Math.round(T.lenC * 0.1))}
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────────────────────── */

/** Glow filter definitions — one per colour */
function Filters() {
  return (
    <defs>
      <filter id="cpf-purple" x="-30%" y="-400%" width="160%" height="900%">
        <feGaussianBlur stdDeviation="0.6" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="cpf-blue" x="-30%" y="-400%" width="160%" height="900%">
        <feGaussianBlur stdDeviation="0.5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="cpf-pink" x="-30%" y="-400%" width="160%" height="900%">
        <feGaussianBlur stdDeviation="0.5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  );
}

/** One circuit path = dim base + animated pulse */
function CircuitPath({ d, baseColor, pulseColor, filter, animName, dur, delay, len, pulse }) {
  return (
    <>
      {/* Static dim trace */}
      <path
        d={d}
        fill="none"
        stroke={baseColor}
        strokeWidth="0.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Travelling data pulse */}
      <path
        d={d}
        fill="none"
        stroke={pulseColor}
        strokeWidth="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${pulse} ${len}`}
        filter={filter}
        style={{
          animation: `${animName} ${dur}s linear infinite`,
          animationDelay: delay,
        }}
      />
    </>
  );
}

/** Junction nodes at bend points */
function Nodes({ points, fill, baseDelay = 0 }) {
  return (
    <>
      {points.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r="0.9"
          fill={fill}
          style={{
            animation: `cp-node ${2.6 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${baseDelay + i * 0.3}s`,
          }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────────────────── */
export default function GradientMesh() {
  const svgProps = {
    viewBox: '0 0 100 100',
    preserveAspectRatio: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    style: { position: 'absolute', inset: 0, width: '100%', height: '100%' },
    'aria-hidden': 'true',
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── DESKTOP ─────────────────────────────────────── */}
      <svg {...svgProps} className="cp-desktop">
        <Filters />

        <CircuitPath d={D.a} baseColor="rgba(139,92,246,0.18)" pulseColor="rgba(168,85,247,0.90)"
          filter="url(#cpf-purple)" animName="cp-da" dur={20} delay="0s"
          len={D.lenA} pulse={Math.round(D.lenA * 0.1)} />
        <Nodes points={[[15,18],[24,28],[48,28],[56,18],[76,18],[85,30]]}
          fill="rgba(168,85,247,0.32)" baseDelay={0} />

        <CircuitPath d={D.b} baseColor="rgba(59,130,246,0.16)" pulseColor="rgba(99,179,255,0.90)"
          filter="url(#cpf-blue)" animName="cp-db" dur={24} delay="-9s"
          len={D.lenB} pulse={Math.round(D.lenB * 0.1)} />
        <Nodes points={[[12,52],[20,42],[38,42],[46,54],[66,54],[74,44],[90,44]]}
          fill="rgba(59,130,246,0.28)" baseDelay={0.5} />

        <CircuitPath d={D.c} baseColor="rgba(236,72,153,0.14)" pulseColor="rgba(244,114,182,0.85)"
          filter="url(#cpf-pink)" animName="cp-dc" dur={17} delay="-5s"
          len={D.lenC} pulse={Math.round(D.lenC * 0.1)} />
        <Nodes points={[[24,72],[32,64],[54,64],[62,74],[82,74],[90,64]]}
          fill="rgba(236,72,153,0.26)" baseDelay={1} />
      </svg>

      {/* ── TABLET ──────────────────────────────────────── */}
      <svg {...svgProps} className="cp-tablet">
        <Filters />

        <CircuitPath d={T.a} baseColor="rgba(139,92,246,0.18)" pulseColor="rgba(168,85,247,0.90)"
          filter="url(#cpf-purple)" animName="cp-ta" dur={19} delay="0s"
          len={T.lenA} pulse={Math.round(T.lenA * 0.1)} />
        <Nodes points={[[18,15],[28,26],[52,26],[62,15],[82,15],[92,26]]}
          fill="rgba(168,85,247,0.32)" baseDelay={0} />

        <CircuitPath d={T.b} baseColor="rgba(59,130,246,0.16)" pulseColor="rgba(99,179,255,0.90)"
          filter="url(#cpf-blue)" animName="cp-tb" dur={22} delay="-7s"
          len={T.lenB} pulse={Math.round(T.lenB * 0.1)} />
        <Nodes points={[[14,48],[24,38],[44,38],[54,50],[74,50],[84,40]]}
          fill="rgba(59,130,246,0.28)" baseDelay={0.4} />

        <CircuitPath d={T.c} baseColor="rgba(236,72,153,0.14)" pulseColor="rgba(244,114,182,0.85)"
          filter="url(#cpf-pink)" animName="cp-tc" dur={16} delay="-4s"
          len={T.lenC} pulse={Math.round(T.lenC * 0.1)} />
        <Nodes points={[[16,72],[26,62],[50,62],[60,72],[80,72],[90,62]]}
          fill="rgba(236,72,153,0.26)" baseDelay={0.8} />
      </svg>

      {/* ── MOBILE — disabled on screens below 768px ────────────
          Circuit line animations use SVG feGaussianBlur filters
          which are rasterized per-frame on mobile GPUs causing
          significant repaint cost. Static dim traces only.
      ── */}
      {/* cp-mobile is display:none via CSS — no animation runs */}
    </div>
  );
}
