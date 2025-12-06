'use client'

export default function AnimatedGolfer() {
  return (
    <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-full h-full"
      >
        <defs>
          <style>{`
            @keyframes golfSwing {
              0% {
                transform: rotateY(0deg) rotateZ(-15deg);
              }
              50% {
                transform: rotateY(0deg) rotateZ(30deg);
              }
              100% {
                transform: rotateY(0deg) rotateZ(-15deg);
              }
            }
            .golfer {
              animation: golfSwing 2s ease-in-out infinite;
              transform-origin: 100px 85px;
            }
          `}</style>
        </defs>

        {/* Ground */}
        <ellipse cx="100" cy="180" rx="60" ry="10" fill="#10b981" opacity="0.3" />

        {/* Golf Ball on Tee */}
        <line x1="100" y1="165" x2="100" y2="172" stroke="#8B4513" strokeWidth="1.5" />
        <circle cx="100" cy="162" r="5" fill="#ffffff" stroke="#999" strokeWidth="1" />
        <circle cx="98" cy="160" r="0.8" fill="#e0e0e0" />
        <circle cx="102" cy="160" r="0.8" fill="#e0e0e0" />

        {/* Golfer (animated) */}
        <g className="golfer">
          {/* Legs */}
          <line x1="95" y1="110" x2="92" y2="150" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <line x1="105" y1="110" x2="108" y2="150" stroke="#333" strokeWidth="3" strokeLinecap="round" />

          {/* Feet */}
          <rect x="88" y="150" width="8" height="3" rx="1.5" fill="#333" />
          <rect x="104" y="150" width="8" height="3" rx="1.5" fill="#333" />

          {/* Body */}
          <rect x="92" y="80" width="16" height="32" rx="3" fill="#4B5563" opacity="0.8" />

          {/* Arms */}
          <line x1="92" y1="90" x2="70" y2="75" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" />
          <line x1="108" y1="90" x2="130" y2="70" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" />

          {/* Club in hands */}
          <line x1="130" y1="70" x2="145" y2="45" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="147" cy="42" rx="6" ry="8" fill="#d4a574" stroke="#333" strokeWidth="1" />

          {/* Head */}
          <circle cx="100" cy="68" r="10" fill="#d4a574" />

          {/* Face details */}
          <circle cx="97" cy="66" r="1.5" fill="#333" />
          <circle cx="103" cy="66" r="1.5" fill="#333" />
          <path d="M 98 70 Q 100 71 102 70" stroke="#333" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}
