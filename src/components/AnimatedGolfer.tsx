'use client'

export default function AnimatedGolfer() {
  return (
    <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-full h-full"
      >
        {/* Ground */}
        <ellipse cx="100" cy="165" rx="70" ry="12" fill="#10b981" opacity="0.2" />

        {/* Golf Ball */}
        <circle cx="120" cy="145" r="6" fill="#ffffff" stroke="#999" strokeWidth="1" />
        <circle cx="118" cy="143" r="0.8" fill="#e0e0e0" />
        <circle cx="122" cy="143" r="0.8" fill="#e0e0e0" />
        <circle cx="120" cy="147" r="0.8" fill="#e0e0e0" />

        {/* Golfer - Address Position */}
        {/* Left Leg */}
        <line x1="85" y1="95" x2="80" y2="155" stroke="#2c3e50" strokeWidth="3.5" strokeLinecap="round" />

        {/* Right Leg */}
        <line x1="100" y1="98" x2="105" y2="155" stroke="#2c3e50" strokeWidth="3.5" strokeLinecap="round" />

        {/* Feet */}
        <rect x="76" y="155" width="9" height="3.5" rx="1.5" fill="#2c3e50" />
        <rect x="101" y="155" width="9" height="3.5" rx="1.5" fill="#2c3e50" />

        {/* Torso */}
        <ellipse cx="92" y="85" rx="12" ry="18" fill="#4a90e2" opacity="0.9" />

        {/* Left Arm */}
        <line x1="82" y1="80" x2="55" y2="50" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" />

        {/* Right Arm holding club */}
        <line x1="102" y1="82" x2="135" y2="35" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" />

        {/* Golf Club */}
        <line x1="135" y1="35" x2="140" y2="20" stroke="#8B4513" strokeWidth="5" strokeLinecap="round" />

        {/* Club Head */}
        <ellipse cx="141" cy="18" rx="7" ry="9" fill="#d4a574" stroke="#333" strokeWidth="1" />

        {/* Head */}
        <circle cx="92" cy="62" r="11" fill="#d4a574" />

        {/* Hair */}
        <path d="M 81 58 Q 92 48 103 58" fill="#8b6914" opacity="0.8" />

        {/* Face */}
        <circle cx="89" cy="60" r="1.5" fill="#333" />
        <circle cx="95" cy="60" r="1.5" fill="#333" />
        <path d="M 88 65 Q 92 67 96 65" stroke="#333" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}
