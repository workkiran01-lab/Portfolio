// CSS-only starfield for mobile / low-end devices — no Three.js, no canvas

function shadowList(count, range) {
  const out = []
  for (let i = 0; i < count; i++) {
    const x = (Math.random() * range - range / 2).toFixed(0)
    const y = (Math.random() * range - range / 2).toFixed(0)
    out.push(`${x}px ${y}px #fff`)
  }
  return out.join(', ')
}

// Computed once at module init — stable across renders
const SMALL = shadowList(700, 2000)
const MED   = shadowList(200, 2000)
const LARGE = shadowList(80,  2000)

const css = `
  @keyframes mfTwinkle {
    0%, 100% { opacity: 0.7; }
    50%       { opacity: 0.2; }
  }
  @keyframes mfTwinkleSlow {
    0%, 100% { opacity: 0.9; }
    50%       { opacity: 0.3; }
  }
  @keyframes mfDrift {
    from { transform: translateY(0); }
    to   { transform: translateY(-40px); }
  }
  .mf-small {
    width: 1px; height: 1px;
    background: transparent;
    box-shadow: ${SMALL};
    animation: mfTwinkle 4s ease-in-out infinite alternate, mfDrift 60s linear infinite alternate;
  }
  .mf-med {
    width: 2px; height: 2px;
    background: transparent;
    box-shadow: ${MED};
    animation: mfTwinkleSlow 6s ease-in-out infinite alternate, mfDrift 80s linear infinite alternate-reverse;
  }
  .mf-large {
    width: 3px; height: 3px;
    background: transparent;
    box-shadow: ${LARGE};
    animation: mfTwinkle 8s ease-in-out infinite alternate, mfDrift 100s linear infinite alternate;
  }
`

export default function MobileFallback() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020817 0%, #0f172a 60%, #020817 100%)' }}
    >
      <style>{css}</style>
      <div className="mf-small" />
      <div className="mf-med" />
      <div className="mf-large" />
    </div>
  )
}
