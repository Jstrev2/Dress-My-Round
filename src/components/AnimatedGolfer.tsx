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
                transform: rotate(-45deg);
                transform-origin: 100px 60px;
              }
              50% {
                transform: rotate(45deg);
                transform-origin: 100px 60px;
              }
              100% {
                transform: rotate(-45deg);
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
        <ellipse cx="100" cy="170" rx="70" ry="12" fill="#10b981" opacity="0.4" />

        {/* Golf Ball */}
        <circle cx="100" cy="160" r="6" fill="#ffffff" stroke="#999" strokeWidth="1" />
        {/* Ball dimples */}
        <circle cx="98" cy="156" r="1" fill="#e0e0e0" />
        <circle cx="102" cy="156" r="1" fill="#e0e0e0" />
        <circle cx="100" cy="164" r="1" fill="#e0e0e0" />

        {/* Club (animated) */}
        <g className="club">
          {/* Club shaft */}
          <line x1="100" y1="60" x2="100" y2="140" stroke="#8B4513" strokeWidth="5" strokeLinecap="round" />

          {/* Club head */}
          <ellipse cx="100" cy="145" rx="10" ry="14" fill="#d4a574" stroke="#333" strokeWidth="1" />

          {/* Club face lines */}
          <line x1="95" y1="140" x2="105" y2="140" stroke="#666" strokeWidth="1" />
          <line x1="95" y1="145" x2="105" y2="145" stroke="#666" strokeWidth="1" />
          <line x1="95" y1="150" x2="105" y2="150" stroke="#666" strokeWidth="1" />

          {/* Grip */}
          <rect x="97" y="50" width="6" height="15" rx="3" fill="#333" opacity="0.8" />
        </g>
      </svg>
    </div>
  )
}
