'use client'

export default function AnimatedGolfer() {
  return (
    <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-full h-full"
      >
        {/* Skin tone */}
        <defs>
          <style>{`
            @keyframes swing {
              0%, 100% { transform: rotate(-20deg); transform-origin: 100px 70px; }
              50% { transform: rotate(25deg); transform-origin: 100px 70px; }
            }
            .golfer-group { animation: swing 2.5s ease-in-out infinite; }
          `}</style>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="100" cy="180" rx="50" ry="8" fill="#000" opacity="0.1" />

        {/* Golfer Group (animated) */}
        <g className="golfer-group">
          {/* Right leg (front) */}
          <line x1="95" y1="110" x2="92" y2="160" stroke="#E8B4A8" strokeWidth="5" strokeLinecap="round" />
          {/* Left leg (back) */}
          <line x1="105" y1="112" x2="108" y2="160" stroke="#D4A5A0" strokeWidth="5" strokeLinecap="round" />

          {/* Shoes */}
          <rect x="88" y="158" width="8" height="5" rx="2" fill="#333" />
          <rect x="104" y="158" width="8" height="5" rx="2" fill="#333" />

          {/* Shorts */}
          <rect x="90" y="110" width="20" height="20" rx="3" fill="#4B90E2" opacity="0.9" />

          {/* Shirt */}
          <rect x="88" y="75" width="24" height="38" rx="4" fill="#FFA500" opacity="0.85" />

          {/* Arms */}
          <line x1="88" y1="85" x2="65" y2="55" stroke="#E8B4A8" strokeWidth="5" strokeLinecap="round" />
          <line x1="112" y1="80" x2="140" y2="40" stroke="#E8B4A8" strokeWidth="5" strokeLinecap="round" />

          {/* Golf Club */}
          <line x1="140" y1="40" x2="145" y2="20" stroke="#8B6F47" strokeWidth="6" strokeLinecap="round" />
          {/* Club Head */}
          <ellipse cx="147" cy="17" rx="8" ry="10" fill="#C9A961" stroke="#333" strokeWidth="1" />

          {/* Neck */}
          <rect x="98" y="70" width="4" height="6" fill="#E8B4A8" />

          {/* Head */}
          <circle cx="100" cy="62" r="12" fill="#E8B4A8" />

          {/* Hair */}
          <path d="M 88 58 Q 100 48 112 58 Q 110 62 100 64 Q 90 62 88 58" fill="#8B5A3C" opacity="0.9" />

          {/* Eyes */}
          <circle cx="97" cy="60" r="1.5" fill="#333" />
          <circle cx="103" cy="60" r="1.5" fill="#333" />

          {/* Smile */}
          <path d="M 97 64 Q 100 66 103 64" stroke="#333" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>

        {/* Golf Ball (not animated) */}
        <circle cx="75" cy="145" r="5" fill="#fff" stroke="#999" strokeWidth="0.5" />
        <circle cx="74" cy="143" r="0.6" fill="#e0e0e0" />
        <circle cx="76" cy="143" r="0.6" fill="#e0e0e0" />
        <circle cx="75" cy="146" r="0.6" fill="#e0e0e0" />
      </svg>
    </div>
  )
}
