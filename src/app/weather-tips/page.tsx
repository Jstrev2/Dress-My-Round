import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Golf Weather Tips & Strategies | Dress My Round',
  description: 'Expert golf weather tips, strategies for playing in different conditions, and advanced clothing recommendations for serious golfers.',
  keywords: 'golf weather tips, golf in rain, golf in wind, golf weather strategies, golf clothing tips, golf weather conditions',
}

export default function WeatherTipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Golf Weather Tips & Strategies
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Master playing golf in any weather condition with expert tips, clothing strategies, and performance advice from golf professionals.
          </p>
        </div>

        <div className="space-y-16">
          {/* Playing in Different Conditions */}
          <section className="grid lg:grid-cols-2 gap-8">
            {/* Rain Golf */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 flex items-center">
                <span className="text-4xl mr-4">🌧️</span>
                Playing in Rain
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Rain Gear</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span><strong>Quality Rain Jacket:</strong> Full zip, storm flaps, breathable fabric</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span><strong>Rain Pants:</strong> Essential for prolonged rain, side zippers for easy on/off</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span><strong>Waterproof Gloves:</strong> 2-3 pairs, synthetic materials maintain grip</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span><strong>Large Golf Umbrella:</strong> 60"+ coverage, wind-resistant design</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Pro Rain Tips:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Keep extra towels in waterproof pouches</li>
                    <li>• Dry grips between every shot</li>
                    <li>• Slow down your swing tempo</li>
                    <li>• Take more club due to wet conditions</li>
                    <li>• Focus on balance and solid contact</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Wind Golf */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent mb-6 flex items-center">
                <span className="text-4xl mr-4">💨</span>
                Playing in Wind
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Wind Protection Gear</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-slate-500 mr-2 mt-1">•</span>
                      <span><strong>Wind Jacket:</strong> Lightweight but wind-resistant, full zip</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-500 mr-2 mt-1">•</span>
                      <span><strong>Fitted Layers:</strong> Avoid loose clothing that catches wind</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-500 mr-2 mt-1">•</span>
                      <span><strong>Secure Hat:</strong> Chin strap or fitted cap, avoid loose brims</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-500 mr-2 mt-1">•</span>
                      <span><strong>Eye Protection:</strong> Wraparound sunglasses, protect from debris</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Wind Playing Tips:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Play the ball back in stance for lower shots</li>
                    <li>• Take extra club into headwind, less with tailwind</li>
                    <li>• Widen stance for better balance</li>
                    <li>• Commit to shots, don't fight the wind</li>
                    <li>• Use crosswind to shape shots</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Temperature Extremes */}
          <section className="grid lg:grid-cols-2 gap-8">
            {/* Hot Weather */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 flex items-center">
                <span className="text-4xl mr-4">🔥</span>
                Hot Weather Golf
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Heat Management Gear</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span><strong>UV Protection Shirt:</strong> UPF 30+, long sleeves for max protection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span><strong>Wide-Brim Hat:</strong> 4"+ brim, neck protection, light colors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span><strong>Cooling Accessories:</strong> Cooling towels, ice packs, portable fans</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span><strong>Hydration System:</strong> Insulated bottles, electrolyte supplements</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Heat Safety Tips:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Drink water before you feel thirsty</li>
                    <li>• Take breaks in shade between holes</li>
                    <li>• Apply sunscreen every 2 hours</li>
                    <li>• Recognize heat exhaustion symptoms</li>
                    <li>• Start rounds early to avoid peak heat</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cold Weather */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 flex items-center">
                <span className="text-4xl mr-4">🥶</span>
                Cold Weather Golf
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Cold Weather Essentials</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span><strong>Base Layers:</strong> Merino wool or synthetic, moisture-wicking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span><strong>Insulated Jacket:</strong> Packable down or synthetic fill</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span><strong>Winter Gloves:</strong> Grip-enhanced palms, fingertip dexterity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span><strong>Warm Headwear:</strong> Insulated caps, ear protection</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Cold Weather Tips:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Keep hands warm between shots</li>
                    <li>• Use winter golf balls for better feel</li>
                    <li>• Extend warm-up routine</li>
                    <li>• Keep equipment dry and clean</li>
                    <li>• Adjust for reduced ball flight</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Weather Strategies */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 flex items-center">
              <span className="text-4xl mr-4">🧠</span>
              Advanced Weather Strategies
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Weather Reading</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Cloud Types:</strong> Learn to identify weather patterns from cloud formations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Wind Direction:</strong> Use course features to read local wind patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Barometric Pressure:</strong> Understand how pressure affects ball flight</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Temperature Inversions:</strong> How elevation affects local conditions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">⚡ Quick Changes</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Layering System:</strong> Quick add/remove based on conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Emergency Kit:</strong> Rain gear, extra gloves, emergency layers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Weather Apps:</strong> Real-time radar and hourly updates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Course Knowledge:</strong> Shelter spots and weather patterns</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🏆 Performance Tips</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Mental Game:</strong> Stay positive in difficult conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Equipment Adjustments:</strong> Different balls, tees for conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Course Management:</strong> Play smart, not hero shots</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    <span><strong>Energy Conservation:</strong> Pace yourself in difficult weather</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Seasonal Preparation */}
          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl text-white p-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <span className="text-4xl mr-4">📅</span>
              Seasonal Golf Preparation
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🌸</span>Spring
                </h3>
                <ul className="space-y-2 text-emerald-100 text-sm">
                  <li>• Layer for temperature swings</li>
                  <li>• Prepare for sudden rain</li>
                  <li>• Wind protection essential</li>
                  <li>• Muddy conditions gear</li>
                  <li>• Allergy considerations</li>
                </ul>
              </div>

              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">☀️</span>Summer
                </h3>
                <ul className="space-y-2 text-emerald-100 text-sm">
                  <li>• Maximum sun protection</li>
                  <li>• Hydration is critical</li>
                  <li>• Early morning tee times</li>
                  <li>• Light, breathable fabrics</li>
                  <li>• Heat illness awareness</li>
                </ul>
              </div>

              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🍂</span>Fall
                </h3>
                <ul className="space-y-2 text-emerald-100 text-sm">
                  <li>• Perfect layering weather</li>
                  <li>• Morning frost preparation</li>
                  <li>• Leaf coverage affects play</li>
                  <li>• Shorter daylight hours</li>
                  <li>• Equipment winterization</li>
                </ul>
              </div>

              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">❄️</span>Winter
                </h3>
                <ul className="space-y-2 text-emerald-100 text-sm">
                  <li>• Maximum warmth systems</li>
                  <li>• Shorter rounds planning</li>
                  <li>• Equipment protection</li>
                  <li>• Travel to warm climates</li>
                  <li>• Indoor practice focus</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Weather Emergencies */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-8 flex items-center">
              <span className="text-4xl mr-4">⚠️</span>
              Weather Safety & Emergencies
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                <h3 className="text-xl font-semibold text-red-800 mb-4">⛈️ Lightning Safety</h3>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• 30-30 rule: Seek shelter if thunder is within 30 seconds of lightning</li>
                  <li>• Avoid metal objects, elevated areas, and trees</li>
                  <li>• Get to a building or hard-top vehicle</li>
                  <li>• Wait 30 minutes after last thunder before resuming</li>
                  <li>• Never use umbrella in lightning</li>
                </ul>
              </div>

              <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-800 mb-4">🌡️ Heat Illness</h3>
                <ul className="space-y-2 text-orange-700 text-sm">
                  <li>• Heat exhaustion: Heavy sweating, weakness, nausea</li>
                  <li>• Heat stroke: High body temp, altered mental state</li>
                  <li>• Move to shade, remove excess clothing</li>
                  <li>• Apply cool water to skin</li>
                  <li>• Seek medical help for heat stroke</li>
                </ul>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">🥶 Cold Exposure</h3>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• Hypothermia: Shivering, confusion, fatigue</li>
                  <li>• Frostbite: Numbness, waxy appearance</li>
                  <li>• Get to warm, dry environment</li>
                  <li>• Remove wet clothing</li>
                  <li>• Gradual rewarming, seek medical help</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Master Any Weather?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Use our app to get specific weather forecasts and clothing recommendations for your next round.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-xl hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            >
              <span className="text-2xl mr-3">🌦️</span>
              Get Weather-Specific Recommendations
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}