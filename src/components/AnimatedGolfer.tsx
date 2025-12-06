'use client'

export default function AnimatedGolfer() {
  return (
    <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 240"
        className="w-full h-full"
      >
        <defs>
          <style>{`
            @keyframes golfSwing {
              0% {
                transform: rotateZ(-40deg);
                transform-origin: 100px 70px;
              }
              25% {
                transform: rotateZ(-35deg);
                transform-origin: 100px 70px;
              }
              50% {
                transform: rotateZ(20deg);
                transform-origin: 100px 70px;
              }
              75% {
                transform: rotateZ(15deg);
                transform-origin: 100px 70px;
              }
              100% {
                transform: rotateZ(-40deg);
                transform-origin: 100px 70px;
              }
            }
            .golfer-group {
              transform-origin: 100px 70px;
            }
            .club {
              animation: golfSwing 2s ease-in-out infinite;
              transform-origin: 100px 70px;
            }
          `}</style>
        </defs>

        {/* Ground/Green */}
        <ellipse cx="100" cy="210" rx="80" ry="15" fill="#10b981" opacity="0.4" />
        <ellipse cx="100" cy="205" rx="90" ry="12" fill="#059669" opacity="0.3" />

        {/* Golfer Body Group */}
        <g className="golfer-group">
          {/* Head */}
          <circle cx="100" cy="65" r="12" fill="#fdbf7d" />

          {/* Face */}
          <circle cx="97" cy="64" r="1.5" fill="#333" />
          <circle cx="103" cy="64" r="1.5" fill="#333" />

          {/* Body/Torso */}
          <ellipse cx="100" cy="95" rx="14" ry="20" fill="#ef4444" />

          {/* Arms */}
          {/* Left arm (back) */}
          <line x1="88" y1="88" x2="75" y2="72" stroke="#fdbf7d" strokeWidth="5" strokeLinecap="round" />
          {/* Right arm (forward) */}
          <line x1="112" y1="88" x2="128" y2="75" stroke="#fdbf7d" strokeWidth="5" strokeLinecap="round" />

          {/* Legs */}
          {/* Left leg */}
          <line x1="94" y1="115" x2="88" y2="195" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
          {/* Right leg */}
          <line x1="106" y1="115" x2="112" y2="195" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />

          {/* Shoes */}
          <ellipse cx="88" cy="198" rx="6" ry="5" fill="#333" />
          <ellipse cx="112" cy="198" rx="6" ry="5" fill="#333" />
        </g>

        {/* Golf Club (animated swing) */}
        <g className="club">
          {/* Club shaft */}
          <line x1="100" y1="70" x2="135" y2="35" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />

          {/* Club head */}
          <rect x="130" y="20" width="12" height="20" rx="2" fill="#d4a574" stroke="#333" strokeWidth="1" />
          {/* Club face detail */}
          <line x1="130" y1="25" x2="142" y2="25" stroke="#666" strokeWidth="1" />
          <line x1="130" y1="30" x2="142" y2="30" stroke="#666" strokeWidth="1" />
          <line x1="130" y1="35" x2="142" y2="35" stroke="#666" strokeWidth="1" />
        </g>

        {/* Golf Ball on ground */}
        <circle cx="150" cy="205" r="5" fill="#ffffff" stroke="#999" strokeWidth="1" />
        {/* Ball dimples */}
        <circle cx="147" cy="202" r="1.5" fill="#e0e0e0" opacity="0.8" />
        <circle cx="153" cy="202" r="1.5" fill="#e0e0e0" opacity="0.8" />
        <circle cx="150" cy="208" r="1.5" fill="#e0e0e0" opacity="0.8" />
      </svg>
    </div>
  )
}
