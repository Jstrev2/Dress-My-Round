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
            @keyframes swing {
              0% {
                transform: rotate(-30deg);
                transform-origin: 100px 60px;
              }
              50% {
                transform: rotate(30deg);
                transform-origin: 100px 60px;
              }
              100% {
                transform: rotate(-30deg);
                transform-origin: 100px 60px;
              }
            }
            .club {
              animation: swing 1.5s ease-in-out infinite;
              transform-origin: 100px 60px;
            }
          `}</style>
        </defs>

        {/* Ground */}
        <ellipse cx="100" cy="185" rx="70" ry="12" fill="#10b981" opacity="0.5" />

        {/* Golfer body */}
        <ellipse cx="100" cy="100" rx="18" ry="28" fill="#f59e0b" />

        {/* Golfer head */}
        <circle cx="100" cy="65" r="15" fill="#fdbf7d" />

        {/* Golfer face */}
        <circle cx="97" cy="63" r="2" fill="#333" />
        <circle cx="103" cy="63" r="2" fill="#333" />

        {/* Arms background */}
        <line x1="100" y1="90" x2="75" y2="110" stroke="#fdbf7d" strokeWidth="6" strokeLinecap="round" />
        <line x1="100" y1="90" x2="125" y2="110" stroke="#fdbf7d" strokeWidth="6" strokeLinecap="round" />

        {/* Legs */}
        <line x1="92" y1="128" x2="85" y2="170" stroke="#333" strokeWidth="7" strokeLinecap="round" />
        <line x1="108" y1="128" x2="115" y2="170" stroke="#333" strokeWidth="7" strokeLinecap="round" />

        {/* Golf shoes */}
        <ellipse cx="85" cy="172" rx="7" ry="5" fill="#333" />
        <ellipse cx="115" cy="172" rx="7" ry="5" fill="#333" />

        {/* Club (animated) */}
        <g className="club">
          {/* Club shaft */}
          <line x1="100" y1="60" x2="120" y2="20" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
          {/* Club head */}
          <ellipse cx="122" cy="15" rx="8" ry="6" fill="#d4a574" />
          <path d="M 122 15 Q 122 20 122 15" stroke="#333" strokeWidth="1" />
        </g>

        {/* Ball on ground */}
        <circle cx="145" cy="183" r="4" fill="#ffffff" />
        <circle cx="145" cy="183" r="3.5" fill="none" stroke="#999" strokeWidth="0.5" />
      </svg>
    </div>
  )
}
