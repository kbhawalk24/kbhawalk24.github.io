'use client'

// Drawn scenes for the cosy pass: original illustration in a warm, outlined,
// flat-colour style (thick ink lines, rounded shapes, soft fills). The hero
// room frames Kanchi's own crayon illustration; the footer is an evening
// desk by a rainy window. Ambient loops are CSS classes from ./cozy.css.

const INK = 'var(--ink)'
const SW = 3

/** Fairy lights along a path: bulbs at the given points, each glowing. */
function Bulbs({ points }: { points: [number, number][] }) {
  return (
    <g>
      {points.map(([x, y], i) => (
        <g key={i} className="cozy-bulb">
          <circle cx={x} cy={y} r="13" fill="url(#bulbGlow)" />
          <ellipse cx={x} cy={y} rx="5.5" ry="7" fill="#ffe48a" stroke={INK} strokeWidth="2" />
        </g>
      ))}
    </g>
  )
}

/** Steam from a cup, three wisps. */
function Steam({ x, y }: { x: number; y: number }) {
  return (
    <g className="cozy-steam" fill="none" stroke="#fffaf2" strokeWidth="3.5" strokeLinecap="round" opacity="0.9">
      <path d={`M${x - 8},${y} q-6,-10 0,-18 q6,-8 0,-16`} />
      <path d={`M${x + 2},${y - 2} q-6,-10 0,-18 q6,-8 0,-16`} />
      <path d={`M${x + 12},${y} q-6,-10 0,-18 q6,-8 0,-16`} />
    </g>
  )
}

/** A heart-shaped pothos leaf. */
function Leaf({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <path
      transform={`translate(${x},${y}) rotate(${r}) scale(${s})`}
      d="M0,0 C-14,-4 -18,-18 -8,-24 C-3,-27 0,-22 0,-19 C0,-22 3,-27 8,-24 C18,-18 14,-4 0,0 Z"
      fill="#5e9e5a"
      stroke={INK}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  )
}

function Defs() {
  return (
    <defs>
      <radialGradient id="bulbGlow">
        <stop offset="0%" stopColor="#ffe48a" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#ffe48a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="nightGlass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2c3a63" />
        <stop offset="100%" stopColor="#4d628f" />
      </linearGradient>
      <linearGradient id="lampCone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
      </linearGradient>
      <pattern id="wallFlowers" width="46" height="46" patternUnits="userSpaceOnUse">
        <g fill="var(--scene-flower)">
          <circle cx="11" cy="11" r="2.6" />
          <circle cx="15" cy="11" r="2.6" />
          <circle cx="13" cy="8" r="2.6" />
          <circle cx="13" cy="14" r="2.6" />
          <circle cx="34" cy="34" r="2.2" />
          <circle cx="37.5" cy="34" r="2.2" />
          <circle cx="35.7" cy="31.4" r="2.2" />
          <circle cx="35.7" cy="36.8" r="2.2" />
        </g>
      </pattern>
    </defs>
  )
}

/** A pothos trailing down from the top edge. */
function Pothos({ x = 0 }: { x?: number }) {
  return (
      <g className="cozy-sway" transform={`translate(${x},0)`}>
        <path d="M30,0 C40,60 22,110 46,170 C62,210 44,250 60,290" fill="none" stroke="#3f7a45" strokeWidth="3" strokeLinecap="round" />
        <Leaf x={36} y={42} r={-40} s={1.1} />
        <Leaf x={34} y={96} r={30} />
        <Leaf x={42} y={150} r={-30} s={1.15} />
        <Leaf x={54} y={206} r={35} />
        <Leaf x={50} y={258} r={-25} s={1.05} />
        <Leaf x={62} y={296} r={10} s={0.9} />
      </g>
  )
}

/** Everything in the room except the wall, the floor and the pothos:
 *  window, lamp, shelf, rug and Kanchi at her desk. Drawn on a 640 by 600
 *  stage whose floor line is at y 500. */
function RoomBody() {
  return (
    <>
      {/* Window, right */}
      <g>
        <rect x="396" y="56" width="206" height="300" rx="14" fill="#9b6643" stroke={INK} strokeWidth={SW} />
        <clipPath id="glass">
          <rect x="412" y="72" width="174" height="268" rx="6" />
        </clipPath>
        <rect x="412" y="72" width="174" height="268" rx="6" fill="url(#nightGlass)" stroke={INK} strokeWidth="2.4" />
        <g clipPath="url(#glass)" stroke="#a9bde3" strokeWidth="2" strokeLinecap="round" opacity="0.8">
          <g className="cozy-rain">
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1={420 + i * 15} y1={40 + (i % 4) * 70} x2={414 + i * 15} y2={58 + (i % 4) * 70} />
            ))}
            {Array.from({ length: 12 }, (_, i) => (
              <line key={`b${i}`} x1={426 + i * 15} y1={200 + (i % 3) * 60} x2={420 + i * 15} y2={218 + (i % 3) * 60} />
            ))}
          </g>
          <g className="cozy-rain slow" opacity="0.6">
            {Array.from({ length: 10 }, (_, i) => (
              <line key={i} x1={418 + i * 17} y1={110 + (i % 5) * 46} x2={413 + i * 17} y2={124 + (i % 5) * 46} />
            ))}
          </g>
        </g>
        <line x1="499" y1="72" x2="499" y2="340" stroke={INK} strokeWidth="5" />
        <line x1="412" y1="206" x2="586" y2="206" stroke={INK} strokeWidth="5" />
        <rect x="386" y="350" width="226" height="16" rx="6" fill="#b97a52" stroke={INK} strokeWidth={SW} />
        {/* Fairy lights draped over the window */}
        <path d="M392,70 Q440,118 499,92 Q556,66 606,118 M606,118 Q600,220 612,330" fill="none" stroke={INK} strokeWidth="2" />
        <Bulbs points={[[408, 86], [432, 104], [458, 106], [486, 96], [514, 86], [542, 82], [570, 92], [594, 108], [607, 150], [605, 196], [607, 244], [610, 290]]} />
      </g>

      {/* Pendant lamp and its light */}
      <g>
        <line x1="250" y1="0" x2="250" y2="70" stroke={INK} strokeWidth="2.5" />
        <path className="cozy-glow" d="M206,128 L294,128 L372,470 L128,470 Z" fill="url(#lampCone)" />
        <path d="M196,128 C196,92 222,70 250,70 C278,70 304,92 304,128 Z" fill="var(--scene-shade)" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M216,128 C218,100 232,80 250,72 M284,128 C282,100 268,80 250,72 M250,72 V128" fill="none" stroke={INK} strokeWidth="1.8" opacity="0.55" />
        <path d="M196,128 Q250,146 304,128" fill="var(--scene-shade-light)" stroke={INK} strokeWidth={SW} />
        <circle cx="250" cy="134" r="7" fill="#ffe48a" stroke={INK} strokeWidth="2" />
      </g>

      {/* Shelf, left, with books, a mug and a little plant */}
      <g>
        <rect x="70" y="232" width="150" height="12" rx="4" fill="#b97a52" stroke={INK} strokeWidth={SW} />
        <rect x="84" y="186" width="16" height="46" rx="3" fill="#c3b2e6" stroke={INK} strokeWidth="2.4" />
        <rect x="101" y="194" width="14" height="38" rx="3" fill="#f2c14e" stroke={INK} strokeWidth="2.4" />
        <rect x="116" y="200" width="12" height="32" rx="3" fill="#d9734e" stroke={INK} strokeWidth="2.4" transform="rotate(8 122 216)" />
        <g>
          <path d="M150,204 h30 v20 a8,8 0 0 1 -8,8 h-14 a8,8 0 0 1 -8,-8 Z" fill="#d9734e" stroke={INK} strokeWidth="2.4" />
          <path d="M180,210 q11,0 11,8 t-11,8" fill="none" stroke={INK} strokeWidth="2.4" />
          <path d="M165,213 c-3,-4 -9,0 -4,5 l4,4 l4,-4 c5,-5 -1,-9 -4,-5 Z" fill="#fffaf2" />
          <Steam x={164} y={198} />
        </g>
        <g>
          <path d="M196,214 h20 l-3,18 h-14 Z" fill="#f6cdb0" stroke={INK} strokeWidth="2.4" />
          <path d="M206,214 c-8,-10 -14,-14 -10,-22 c6,4 9,10 10,22 c2,-10 6,-16 12,-20 c2,8 -4,14 -12,20" fill="#5e9e5a" stroke={INK} strokeWidth="2" />
        </g>
      </g>

      {/* Rug */}
      <ellipse cx="320" cy="548" rx="250" ry="34" fill="var(--scene-rug)" stroke={INK} strokeWidth={SW} />
      <ellipse cx="320" cy="548" rx="212" ry="22" fill="none" stroke="var(--scene-rug-line)" strokeWidth="3" strokeDasharray="10 9" />

      {/* Kanchi, at her desk (her own illustration) */}
      <image href="/images/eye-frames/c.webp" x="126" y="132" width="350" height="464" preserveAspectRatio="xMidYMax meet" style={{ mixBlendMode: 'multiply' }} />
    </>
  )
}

/** The hero room as a framed picture (640 by 600). */
export function HeroRoom() {
  return (
    <svg viewBox="0 0 640 600" className="block h-auto w-full" role="img" aria-label="Kanchi at her desk in a warm room at night: a lamp glowing, fairy lights in a rainy window, plants and a steaming mug on a shelf.">
      <Defs />
      <rect x="0" y="0" width="640" height="600" rx="34" fill="var(--scene-wall)" />
      <rect x="0" y="0" width="640" height="600" rx="34" fill="url(#wallFlowers)" />
      <path d="M0,500 H640 V566 Q640,600 606,600 H34 Q0,600 0,566 Z" fill="var(--scene-floor)" />
      <line x1="0" y1="500" x2="640" y2="500" stroke={INK} strokeWidth={SW} />
      <Pothos />
      <RoomBody />
    </svg>
  )
}

/** The hero room as the hero itself: wall and floor run edge to edge, the
 *  text sits on the wallpaper (HTML, over the left half), and the room's
 *  furniture and Kanchi stand on the right. Sliced to fill the section. */
export function HeroRoomWide() {
  return (
    <svg
      viewBox="0 0 1440 1100"
      preserveAspectRatio="xMaxYMax slice"
      className="absolute inset-0 block h-full w-full"
      role="img"
      aria-label="Kanchi at her desk in a cosy room at night: a lamp glowing, fairy lights in a rainy window, plants and a steaming mug on a shelf."
    >
      <Defs />
      <rect x="0" y="0" width="1440" height="1100" fill="var(--scene-wall)" />
      <rect x="0" y="0" width="1440" height="1100" fill="url(#wallFlowers)" />
      <rect x="0" y="984" width="1440" height="116" fill="var(--scene-floor)" />
      <line x1="0" y1="984" x2="1440" y2="984" stroke={INK} strokeWidth={SW} />
      {/* Floorboards */}
      <g stroke={INK} strokeWidth="1.6" opacity="0.25">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={i * 170 + 40} y1="984" x2={i * 170 - 20} y2="1100" />
        ))}
      </g>
      <Pothos x={8} />
      {/* A garland of lights along the ceiling, over the right half */}
      <path d="M700,0 Q790,70 880,40 Q980,8 1070,62 Q1160,110 1260,58 Q1350,16 1440,70" fill="none" stroke={INK} strokeWidth="2" />
      <Bulbs points={[[722, 18], [764, 44], [808, 54], [852, 46], [900, 34], [946, 28], [992, 34], [1036, 48], [1080, 66], [1126, 80], [1172, 82], [1218, 70], [1262, 56], [1306, 40], [1350, 32], [1396, 44], [1432, 64]]} />
      {/* A small framed picture: a cup and a heart */}
      <g transform="rotate(-4 1000 300)">
        <rect x="950" y="250" width="104" height="120" rx="10" fill="#b97a52" stroke={INK} strokeWidth={SW} />
        <rect x="964" y="264" width="76" height="92" rx="5" fill="var(--scene-shade-light)" stroke={INK} strokeWidth="2.4" />
        <path d="M984,322 h32 v16 a8,8 0 0 1 -8,8 h-16 a8,8 0 0 1 -8,-8 Z" fill="var(--scene-shade)" stroke={INK} strokeWidth="2.2" />
        <path d="M1016,326 q9,0 9,6 t-9,6" fill="none" stroke={INK} strokeWidth="2.2" />
        <path d="M1002,300 c-4,-6 -12,0 -6,7 l6,6 l6,-6 c6,-7 -2,-13 -6,-7 Z" fill="#e8768a" stroke={INK} strokeWidth="1.8" />
      </g>
      <g transform="translate(768,459) scale(1.05)">
        <RoomBody />
      </g>
    </svg>
  )
}

/** Everything on the footer desk except the wall and the desk itself:
 *  window, lamp, books with the sleeping cat, mug, letter and plant. Drawn on
 *  a 560 by 380 stage whose desk top is at y 298. */
function DeskBody() {
  return (
    <>
      {/* Window */}
      <rect x="250" y="34" width="240" height="190" rx="12" fill="#9b6643" stroke={INK} strokeWidth={SW} />
      <clipPath id="glass2">
        <rect x="264" y="48" width="212" height="162" rx="6" />
      </clipPath>
      <rect x="264" y="48" width="212" height="162" rx="6" fill="url(#nightGlass)" stroke={INK} strokeWidth="2.4" />
      <circle cx="430" cy="86" r="16" fill="#fff1c4" opacity="0.9" />
      <g clipPath="url(#glass2)" stroke="#a9bde3" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <g className="cozy-rain">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={i} x1={272 + i * 16} y1={30 + (i % 4) * 50} x2={266 + i * 16} y2={46 + (i % 4) * 50} />
          ))}
        </g>
      </g>
      <line x1="370" y1="48" x2="370" y2="210" stroke={INK} strokeWidth="5" />
      <path d="M244,40 Q300,80 370,58 Q440,36 496,70" fill="none" stroke={INK} strokeWidth="2" />
      <Bulbs points={[[262, 54], [290, 68], [320, 70], [350, 62], [380, 54], [410, 50], [440, 54], [470, 62]]} />

      {/* Desk lamp and its light */}
      <path className="cozy-glow" d="M96,128 L150,128 L214,300 L30,300 Z" fill="url(#lampCone)" />
      <path d="M78,128 C78,96 100,80 124,80 C148,80 170,96 170,128 Z" fill="var(--scene-shade)" stroke={INK} strokeWidth={SW} />
      <path d="M78,128 Q124,142 170,128" fill="var(--scene-shade-light)" stroke={INK} strokeWidth={SW} />
      <line x1="124" y1="138" x2="124" y2="290" stroke={INK} strokeWidth="5" />
      <ellipse cx="124" cy="294" rx="30" ry="8" fill="#9b6643" stroke={INK} strokeWidth={SW} />

      {/* Books with a sleeping cat */}
      <rect x="250" y="270" width="110" height="16" rx="3" fill="#5e9e5a" stroke={INK} strokeWidth="2.4" />
      <rect x="258" y="284" width="100" height="15" rx="3" fill="#f2c14e" stroke={INK} strokeWidth="2.4" />
      <g className="cozy-breathe">
        <path d="M266,272 C262,240 290,226 316,230 C342,234 356,252 350,272 Z" fill="#f2a65a" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M268,258 C262,246 270,236 282,236 C292,236 298,246 294,258 Z" fill="#f2a65a" stroke={INK} strokeWidth={SW} />
        <path d="M270,240 L268,226 L280,236 M288,236 L296,226 L295,242" fill="#f2a65a" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M274,248 q4,3 8,0 M284,248 q4,3 8,0" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <path d="M310,244 q8,-4 14,0 M318,252 q8,-4 14,0" fill="none" stroke="#d9734e" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <path className="cozy-tail" d="M350,268 C372,266 380,250 370,240" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path className="cozy-tail" d="M350,268 C372,266 380,250 370,240" fill="none" stroke="#f2a65a" strokeWidth="5" strokeLinecap="round" />

      {/* Mug */}
      <path d="M392,256 h36 v28 a10,10 0 0 1 -10,10 h-16 a10,10 0 0 1 -10,-10 Z" fill="#f2c14e" stroke={INK} strokeWidth={SW} />
      <path d="M428,262 q13,0 13,10 t-13,10" fill="none" stroke={INK} strokeWidth={SW} />
      <Steam x={410} y={250} />

      {/* Letter */}
      <g transform="rotate(-8 190 280)">
        <rect x="160" y="262" width="62" height="40" rx="4" fill="#fffaf2" stroke={INK} strokeWidth="2.4" />
        <path d="M160,264 L191,286 L222,264" fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M191,282 c-3,-4 -9,0 -4,5 l4,4 l4,-4 c5,-5 -1,-9 -4,-5 Z" fill="#d9734e" />
      </g>

      {/* Plant */}
      <g className="cozy-sway">
        <path d="M496,298 C470,250 452,232 470,200 C486,226 496,250 500,298" fill="#5e9e5a" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M504,298 C514,248 540,232 548,206 C556,236 532,262 508,298" fill="#3f7a45" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M500,298 C498,250 506,214 520,190 C526,224 512,262 504,298" fill="#74b06a" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      </g>
      <path d="M478,274 h48 l-6,26 h-36 Z" fill="#d9734e" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    </>
  )
}

/** The footer as a framed picture (560 by 380). */
export function FooterDesk() {
  return (
    <svg viewBox="0 0 560 380" className="block h-auto w-full" role="img" aria-label="An evening desk by a rainy window: a lamp, a steaming mug, a plant, a letter and a cat asleep on a stack of books.">
      <Defs />
      <rect x="0" y="0" width="560" height="380" rx="30" fill="var(--scene-wall)" />
      <rect x="0" y="0" width="560" height="380" rx="30" fill="url(#wallFlowers)" />
      {/* Desk */}
      <rect x="0" y="298" width="560" height="22" fill="#c98a5f" stroke={INK} strokeWidth={SW} />
      <path d="M0,320 H560 V350 Q560,380 530,380 H30 Q0,380 0,350 Z" fill="#b97a52" />

      <DeskBody />
    </svg>
  )
}

/** The footer as the footer itself: wall and desk run edge to edge behind
 *  the words, the window, lamp, cat and mug stand on the right. */
export function FooterDeskWide() {
  return (
    <svg
      viewBox="0 0 1440 680"
      preserveAspectRatio="xMaxYMax slice"
      className="absolute inset-0 block h-full w-full"
      role="img"
      aria-label="An evening desk by a rainy window: a lamp, a steaming mug, a plant, a letter and a cat asleep on a stack of books."
    >
      <Defs />
      <rect x="0" y="0" width="1440" height="680" fill="var(--scene-wall)" />
      <rect x="0" y="0" width="1440" height="680" fill="url(#wallFlowers)" />
      {/* The desk, the full width */}
      <rect x="-4" y="557" width="1448" height="33" fill="#c98a5f" stroke={INK} strokeWidth={SW} />
      <rect x="0" y="590" width="1440" height="90" fill="#b97a52" />
      <g stroke={INK} strokeWidth="1.6" opacity="0.22">
        <line x1="0" y1="620" x2="1440" y2="620" />
        <line x1="0" y1="652" x2="1440" y2="652" />
      </g>
      <g transform="translate(680,155) scale(1.35)">
        <DeskBody />
      </g>
    </svg>
  )
}
