import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Golf Style Guide & Clothing Resources | Dress My Round',
  description: 'Complete guide to golf attire, clothing recommendations, seasonal tips, and style advice for every weather condition. Master your golf wardrobe.',
  keywords: 'golf clothing, golf attire, golf style guide, golf fashion, weather golf clothes, golf outfit ideas',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-700 drop-shadow-lg mb-6">
            Golf Style Guide & Resources
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Master your golf wardrobe with expert tips, seasonal guides, and clothing recommendations for every weather condition.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {[
            { emoji: '🌡️', title: 'Seasonal Guide', href: '#seasonal' },
            { emoji: '☔', title: 'Weather Gear', href: '#weather' },
            { emoji: '👔', title: 'Dress Codes', href: '#dress-codes' },
            { emoji: '🛍️', title: 'Brand Guide', href: '#brands' }
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <span className="font-semibold text-gray-800">{item.title}</span>
            </a>
          ))}
        </div>

        <div className="space-y-16">
          {/* Seasonal Golf Clothing Guide */}
          <section id="seasonal" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center mb-8">
              <span className="text-4xl mr-4">🌡️</span>
              <h2 className="text-3xl font-bold text-emerald-700 drop-shadow-lg">Seasonal Golf Clothing Guide</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Spring */}
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <span className="mr-2">🌸</span>Spring (40-70°F)
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Long-sleeve polos</li>
                  <li>• Light sweaters or vests</li>
                  <li>• Golf pants or khakis</li>
                  <li>• Light wind jacket</li>
                  <li>• Golf gloves for grip</li>
                  <li>• Layering is key</li>
                </ul>
              </div>

              {/* Summer */}
              <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <span className="mr-2">☀️</span>Summer (70-90°F)
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Moisture-wicking polos</li>
                  <li>• Breathable golf shorts</li>
                  <li>• UV protection shirts</li>
                  <li>• Wide-brim hats</li>
                  <li>• Cooling towels</li>
                  <li>• Light colors preferred</li>
                </ul>
              </div>

              {/* Fall */}
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <span className="mr-2">🍂</span>Fall (40-70°F)
                </h3>
                <ul className="space-y-2 text-orange-700">
                  <li>• Layered sweaters</li>
                  <li>• Golf pullovers</li>
                  <li>• Long pants</li>
                  <li>• Wind-resistant jackets</li>
                  <li>• Thermal base layers</li>
                  <li>• Weather flexibility</li>
                </ul>
              </div>

              {/* Winter */}
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <span className="mr-2">❄️</span>Winter (Below 40°F)
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Thermal base layers</li>
                  <li>• Insulated golf jackets</li>
                  <li>• Winter golf gloves</li>
                  <li>• Warm hats or beanies</li>
                  <li>• Waterproof outer layer</li>
                  <li>• Mobility is crucial</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Weather-Specific Gear */}
          <section id="weather" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center mb-8">
              <span className="text-4xl mr-4">☔</span>
              <h2 className="text-3xl font-bold text-emerald-700 drop-shadow-lg">Weather-Specific Golf Gear</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Rain Gear */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">🌧️ Rain Essentials</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong>Rain Jacket:</strong> Waterproof with good mobility
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong>Rain Pants:</strong> Essential for extended rain
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong>Waterproof Gloves:</strong> Maintain grip in wet conditions
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong>Golf Umbrella:</strong> 60"+ coverage recommended
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong>Waterproof Shoes:</strong> Prevent wet feet
                    </div>
                  </li>
                </ul>
              </div>

              {/* Wind Protection */}
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💨 Wind Protection</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <div>
                      <strong>Wind Jacket:</strong> Lightweight but wind-resistant
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <div>
                      <strong>Fitted Layers:</strong> Prevent wind chill
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <div>
                      <strong>Secure Hat:</strong> Chin strap recommended
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <div>
                      <strong>Windproof Vest:</strong> Core warmth with arm mobility
                    </div>
                  </li>
                </ul>
              </div>

              {/* Sun Protection */}
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                <h3 className="text-xl font-bold text-amber-800 mb-4">☀️ Sun Protection</h3>
                <ul className="space-y-3 text-amber-700">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <div>
                      <strong>UV Protection Shirts:</strong> UPF 30+ rating
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <div>
                      <strong>Wide-Brim Hat:</strong> Face and neck protection
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <div>
                      <strong>Sunglasses:</strong> UV400 protection minimum
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <div>
                      <strong>Cooling Towels:</strong> Temperature regulation
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Golf Course Dress Codes */}
          <section id="dress-codes" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center mb-8">
              <span className="text-4xl mr-4">👔</span>
              <h2 className="text-3xl font-bold text-emerald-700 drop-shadow-lg">Golf Course Dress Codes</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Casual */}
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">😎 Casual Courses</h3>
                <p className="text-green-700 mb-4">Most municipal and daily-fee courses</p>
                <ul className="space-y-2 text-green-700">
                  <li>✓ Golf shirts with collars</li>
                  <li>✓ Golf shorts (appropriate length)</li>
                  <li>✓ Golf pants or khakis</li>
                  <li>✓ Golf shoes or athletic shoes</li>
                  <li>✗ Tank tops or sleeveless shirts</li>
                  <li>✗ Denim jeans</li>
                  <li>✗ Metal spikes</li>
                </ul>
              </div>

              {/* Semi-Formal */}
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">🎩 Semi-Formal</h3>
                <p className="text-blue-700 mb-4">Resort and upscale public courses</p>
                <ul className="space-y-2 text-blue-700">
                  <li>✓ Collared shirts (polo or button-down)</li>
                  <li>✓ Golf shorts (bermuda length)</li>
                  <li>✓ Golf pants (no jeans)</li>
                  <li>✓ Golf shoes required</li>
                  <li>✓ Belt required with tucked shirts</li>
                  <li>✗ T-shirts or tank tops</li>
                  <li>✗ Cargo shorts</li>
                </ul>
              </div>

              {/* Formal */}
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-4">🏆 Private/Exclusive</h3>
                <p className="text-purple-700 mb-4">Private clubs and championship courses</p>
                <ul className="space-y-2 text-purple-700">
                  <li>✓ Collared shirts (tucked in)</li>
                  <li>✓ Golf pants or tailored shorts</li>
                  <li>✓ Leather golf shoes</li>
                  <li>✓ Belt matching shoe color</li>
                  <li>✓ Traditional golf attire</li>
                  <li>✗ Any athletic wear</li>
                  <li>✗ Bright or loud colors</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Brand Recommendations */}
          <section id="brands" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center mb-8">
              <span className="text-4xl mr-4">🛍️</span>
              <h2 className="text-3xl font-bold text-emerald-700 drop-shadow-lg">Recommended Golf Clothing Brands</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Premium */}
              <div className="p-6 bg-gold-50 rounded-xl border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-4">💎 Premium</h3>
                <ul className="space-y-2 text-yellow-700 text-sm">
                  <li>• Peter Millar</li>
                  <li>• Ralph Lauren Golf</li>
                  <li>• Lululemon</li>
                  <li>• FootJoy</li>
                  <li>• Galvin Green</li>
                </ul>
              </div>

              {/* Performance */}
              <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                <h3 className="text-lg font-bold text-red-800 mb-4">⚡ Performance</h3>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• Nike Golf</li>
                  <li>• Under Armour</li>
                  <li>• Adidas Golf</li>
                  <li>• PUMA Golf</li>
                  <li>• Titleist</li>
                </ul>
              </div>

              {/* Value */}
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <h3 className="text-lg font-bold text-green-800 mb-4">💰 Value</h3>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Callaway Golf</li>
                  <li>• Polo Golf</li>
                  <li>• Greg Norman</li>
                  <li>• Izod Golf</li>
                  <li>• PGA Tour</li>
                </ul>
              </div>

              {/* Weather Specialists */}
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 mb-4">🌦️ Weather Gear</h3>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• Sun Mountain</li>
                  <li>• Zero Restriction</li>
                  <li>• Galvin Green</li>
                  <li>• ProQuip</li>
                  <li>• Sunderland</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl text-white p-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <span className="text-4xl mr-4">💡</span>
              Pro Golf Clothing Tips
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Fabric Guidelines</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-emerald-200 mr-2">•</span>
                    <span>Choose moisture-wicking synthetic fabrics for hot weather</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-200 mr-2">•</span>
                    <span>Merino wool is excellent for temperature regulation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-200 mr-2">•</span>
                    <span>Avoid 100% cotton in humid conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-200 mr-2">•</span>
                    <span>Look for UPF ratings on sun protection clothing</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Fit & Comfort</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-emerald-200 mr-2">•</span>
                    <span>Ensure full range of motion in golf swing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-200 mr-2">•</span>
                    <span>Shorts should be bermuda length or longer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-200 mr-2">•</span>
                    <span>Test clothing comfort during practice rounds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-200 mr-2">•</span>
                    <span>Invest in quality golf shoes for foot comfort</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}