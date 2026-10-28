// Concept D v4 (numbers) — wheel + four kinds of scale: estate opener, reach counter (center), org line per ring, summary magnitudes
// Fetched from the Claude Design project "Data Platform Ownership Animation" on 27 Oct 2026, unchanged. The site's port is components/lifecycle-wheel.tsx.
function arc(cx, cy, r, a0, a1) {
  const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1}`;
}
const METRIC = { 'Catalog and search': '10,000 data products searchable', 'Plain-language assistant': '500+ people a month', 'Lineage': '~500 people a month', 'Access requests and control': '45 days → under 4 min to usable data', 'Reliability and monitoring': 'Peak-season P0/P1 incidents 17 → 0 · shared' };
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const hash = (j) => { const x = Math.sin(j * 127.1) * 43758.5453; return x - Math.floor(x); };

function WheelPiece({ t }) {
  const { T, CUES } = useComposition();
  const { C, MOTION, ROLES, MONO, PSTAGES } = DP;
  const cx = 760, cy = 600, seg = (Math.PI * 2) / 7, gap = 0.035, start = -3 * seg - seg / 2;
  const strategy = { label: 'Set platform strategy', color: C.orange, f: [1, 1, 1, 1, 1, 1, 1] };
  const rings = [
    { r: ROLES.designed, rad: 170, s: CUES.Designed + 0.8, e: CUES.Manager, tag: '2021–24 · founding designer' },
    { r: ROLES.manager, rad: 225, s: CUES.Manager + 0.8, e: CUES.Strategy, tag: '2024–26 · 1 designer per 85 engineers' },
    { r: strategy, rad: 280, s: CUES.Strategy + 0.6, e: CUES.Summary, tag: '1,600 data products certified in FY24' },
  ];
  const summary = MOTION.enter(T, CUES.Summary + 0.2, 0.6);
  const wheelIn = (i) => MOTION.enter(T, CUES.Lifecycle + 0.9 + i * 0.15, 0.6);
  const focus = (k) => Math.max(DP.window(T, rings[k].s - 0.8, rings[k].e), summary);
  const owner = (i) => (ROLES.designed.f[i] ? 0 : ROLES.manager.f[i] ? 1 : -1);
  const initiatives = [
    { name: 'Clean-data standard', m: 'Clean estate <1% → 80%+ · Dec 2025 · shared', s: CUES.Strategy + 1.4 },
    { name: 'Fine-grained access control', m: '60,000+ pipelines and tables · May 2026', s: CUES.Strategy + 1.7 },
  ];

  // Estate isotype: 320 dots (1 dot = 1,000 tables) resolve into the empty ring tracks
  const N = 320, COLS = 20, SP = 22;
  const dots = [];
  for (let j = 0; j < N; j++) {
    const gx = cx - ((COLS - 1) * SP) / 2 + (j % COLS) * SP, gy = cy - ((N / COLS - 1) * SP) / 2 + Math.floor(j / COLS) * SP;
    const k = j % 3, a = start + (Math.floor(j / 3) / Math.ceil(N / 3)) * Math.PI * 2;
    const tx = cx + rings[k].rad * Math.cos(a), ty = cy + rings[k].rad * Math.sin(a);
    const appear = MOTION.enter(T, CUES.Estate + 0.1 + hash(j) * 1.0, 0.3);
    const move = MOTION.draw(T, CUES.Lifecycle + hash(j + 7) * 0.3, 1.0);
    const fade = 1 - MOTION.enter(T, CUES.Lifecycle + 1.1, 0.6);
    if (appear * fade <= 0) continue;
    dots.push(<circle key={j} cx={gx + (tx - gx) * move} cy={gy + (ty - gy) * move} r={5 + 3 * move} fill="#ABA6BA" opacity={appear * fade} />);
  }
  const estateO = DP.window(T, CUES.Estate + 0.4, CUES.Lifecycle + 0.4);

  // Reach counter in the center
  const designedCount = MOTION.draw(T, CUES.Designed + 2.0, 2.2);
  const managerCount = MOTION.draw(T, CUES.Manager + 1.0, 3.5);
  const reach = 1886 + (2664 - 1886) * designedCount + (6673 - 2664) * managerCount;
  const reachDate = managerCount >= 1 ? 'Mar 2026' : managerCount > 0 ? 'Jul 2024 → Mar 2026' : designedCount >= 1 ? 'Jul 2024' : designedCount > 0 ? 'Jul 2023 → Jul 2024' : 'Jul 2023';
  const reachIn = MOTION.enter(T, CUES.Designed + 0.2, 0.6);
  const lifecycleLabel = DP.window(T, CUES.Lifecycle + 1.6, CUES.Designed + 0.3);

  return (
    <DPFrame>
      <DPTitle T={T} CUES={CUES} a="Led design and strategy for Intuit’s data platform" b="Designed it. Led it. Set the strategy." top={70} />
      <div style={{ position: 'absolute', left: 100, top: 136, fontSize: 24, color: C.mute, opacity: summary * MOTION.enter(T, CUES.Summary + 1.2, 0.6) }}>Across 320,000 tables and 180 petabytes, for 6,673 people a month.</div>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {dots}
        {PSTAGES.map((_, i) => {
          const a0 = start + i * seg + gap, a1 = start + (i + 1) * seg - gap;
          return rings.map((g, k) => <path key={i + '-' + k} d={arc(cx, cy, g.rad, a0, a1)} stroke={C.empty} strokeWidth="38" fill="none" opacity={wheelIn(i)} />);
        })}
        {rings.map((g, k) => {
          let n = 0;
          return PSTAGES.map((_, i) => {
            if (!g.r.f[i]) return null;
            const a0 = start + i * seg + gap, a1 = start + (i + 1) * seg - gap;
            const p = MOTION.draw(T, g.s + (n++) * 0.16, 0.5);
            if (p <= 0) return null;
            return <path key={k + '-' + i} d={arc(cx, cy, g.rad, a0, a0 + (a1 - a0) * Math.max(p, 0.001))} stroke={g.r.color} strokeWidth="38" fill="none" opacity={0.35 + 0.65 * focus(k)} />;
          });
        })}
      </svg>
      <div style={{ position: 'absolute', left: 1300, top: 430, width: 520, opacity: estateO, transform: `translateX(${(1 - estateO) * 20}px)` }}>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>320,000 tables</div>
        <div style={{ fontSize: 30, color: C.ink, marginTop: 14 }}>180 petabytes</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 18, color: C.mute, marginTop: 22 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#ABA6BA' }}></div>Each dot is 1,000 tables · Dec 2025
        </div>
      </div>
      {PSTAGES.map((s, i) => {
        const a = start + (i + 0.5) * seg, R = 330, cs = Math.cos(a), sn = Math.sin(a);
        const hx = cs > 0.3 ? 0 : cs < -0.3 ? -100 : -50, vy = sn < -0.6 ? -100 : sn > 0.6 ? 0 : -50;
        const align = cs > 0.3 ? 'left' : cs < -0.3 ? 'right' : 'center';
        const o = owner(i), ps = o === 0 ? CUES.Designed + 1.4 : o === 1 ? CUES.Manager + 1.6 : null;
        return (
          <div key={i} style={{ position: 'absolute', left: cx + R * cs, top: cy + R * sn, width: 310, transform: `translate(${hx}%, ${vy}%)`, textAlign: align, opacity: wheelIn(i), display: 'flex', flexDirection: 'column', alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center', gap: 4 }}>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}><span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 400, color: C.mute, marginRight: 8 }}>{i + 1}</span>{s.t}</div>
            {s.d && <div style={{ fontSize: 17, lineHeight: 1.3, color: C.mute }}>{s.d}</div>}
            {s.p.map((pr, k) => {
              const q = ps == null ? 0 : MOTION.enter(T, ps + k * 0.1, 0.5);
              const m = METRIC[pr], mq = m ? MOTION.enter(T, ps + 1.2 + k * 0.1, 0.5) : 0;
              return (
                <div key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexDirection: align === 'right' ? 'row-reverse' : 'row', opacity: q, transform: `translateY(${(1 - q) * 8}px)` }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: o === 0 ? C.green : C.purple, flexShrink: 0, marginTop: 8 }}></div>
                  <div style={{ fontSize: 17, lineHeight: 1.3 }}>{pr}{m && <span style={{ display: 'block', fontFamily: MONO, fontSize: 14, color: o === 0 ? C.green : C.purple, opacity: mq, marginTop: 1 }}>{m}</span>}</div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: cx - 130, top: cy - 70, width: 260, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', fontSize: 22, color: C.mute, opacity: lifecycleLabel }}>The data lifecycle</div>
        <div style={{ position: 'absolute', opacity: reachIn, transform: `translateY(${(1 - reachIn) * 10}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontFamily: MONO, fontSize: 17, color: C.mute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{reachDate}</div>
          <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{fmt(reach)}</div>
          <div style={{ fontSize: 18, color: C.mute }}>people a month</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 1450, top: 320, width: 420, display: 'flex', flexDirection: 'column', gap: 40 }}>
        {rings.map((g, k) => {
          const shown = MOTION.enter(T, g.s - 0.8, 0.6), f = focus(k);
          return (
            <div key={k} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', opacity: shown * (0.4 + 0.6 * f), transform: `translateX(${(1 - shown) * 24}px)` }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: g.r.color, marginTop: 9, flexShrink: 0 }}></div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>{g.r.label}</div>
                <div style={{ fontSize: 19, color: C.mute, marginTop: 6, lineHeight: 1.3 }}>{g.tag}</div>
                {k === 1 && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: C.purple, flexShrink: 0 }}></div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(17, 6px)', gap: 3 }}>
                      {Array.from({ length: 85 }, (_, d) => <div key={d} style={{ width: 6, height: 6, borderRadius: 3, background: '#C9C5D4', opacity: MOTION.enter(T, g.s + 0.8 + d * 0.012, 0.2) }}></div>)}
                    </div>
                  </div>
                )}
                {k === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                    {initiatives.map((n, j) => {
                      const q = MOTION.enter(T, n.s, 0.5);
                      return <div key={j} style={{ opacity: q, transform: `translateY(${(1 - q) * 10}px)` }}><div style={{ fontSize: 22, fontWeight: 600 }}>{n.name}</div>{n.m && <div style={{ fontFamily: MONO, fontSize: 14, color: C.orange, marginTop: 2 }}>{n.m}</div>}</div>;
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DPFrame>
  );
}
window.WheelAppV4 = () => <DPShell Piece={WheelPiece} />;
