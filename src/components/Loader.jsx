import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1900)
    const t2 = setTimeout(() => onDone(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <>
      <style>{`
        @keyframes ksDrawPath { to { stroke-dashoffset: 0; } }
        @keyframes ksFillBar  { from { width: 0%; } to { width: 100%; } }
        @keyframes ksFadeOut  { to { opacity: 0; pointer-events: none; } }

        .ks-k-vert { stroke-dasharray: 34;  stroke-dashoffset: 34;  animation: ksDrawPath 0.45s ease forwards 0.1s; }
        .ks-k-top  { stroke-dasharray: 26;  stroke-dashoffset: 26;  animation: ksDrawPath 0.35s ease forwards 0.5s; }
        .ks-k-bot  { stroke-dasharray: 26;  stroke-dashoffset: 26;  animation: ksDrawPath 0.35s ease forwards 0.8s; }
        .ks-s-path { stroke-dasharray: 110; stroke-dashoffset: 110; animation: ksDrawPath 0.75s ease forwards 0.2s; }
        .ks-bar    { animation: ksFillBar 1.8s ease-out forwards; }
        .ks-fade   { animation: ksFadeOut 0.5s ease forwards; }
      `}</style>

      <div
        className={fading ? 'ks-fade' : ''}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#020817',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        {/* KS monogram — letters draw themselves */}
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" aria-hidden="true">
          {/* K — vertical stroke */}
          <path
            className="ks-k-vert"
            d="M8,3 L8,37"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* K — upper diagonal */}
          <path
            className="ks-k-top"
            d="M8,20 L27,3"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* K — lower diagonal */}
          <path
            className="ks-k-bot"
            d="M8,20 L27,37"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* S — smooth cubic bezier */}
          <path
            className="ks-s-path"
            d="M72,8 C72,4 47,4 47,15 C47,24 72,24 72,31 C72,38 47,38 47,34"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Progress bar */}
        <div
          style={{
            width: '200px',
            height: '2px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            className="ks-bar"
            style={{
              height: '100%',
              width: '0%',
              background: '#22d3ee',
              borderRadius: '1px',
            }}
          />
        </div>
      </div>
    </>
  )
}
