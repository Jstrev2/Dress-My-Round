import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Use Dress My Round | Golf Weather App Guide',
  description: 'Learn how to get the most out of Dress My Round. Step-by-step guide to perfect golf attire recommendations based on weather conditions.',
  keywords: 'how to use dress my round, golf weather app guide, golf clothing recommendations, golf attire help',
}

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            How to Use Dress My Round
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Get the most out of our golf weather app with this comprehensive guide to perfect golf attire recommendations.
          </p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Enter Your Golf Location</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Start by entering where you'll be playing golf. Our smart search accepts multiple formats:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h3 className="font-semibold text-emerald-800 mb-2">🏌️ Golf Courses</h3>
                    <p className="text-sm text-emerald-700">Search by course name like "Pebble Beach" or "Augusta National"</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">🏙️ Cities</h3>
                    <p className="text-sm text-blue-700">Enter city names like "Phoenix, AZ" or "Myrtle Beach, SC"</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">📍 Zip Codes</h3>
                    <p className="text-sm text-purple-700">Use zip codes for precise local weather like "90210"</p>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    💡 <strong>Pro Tip:</strong> Be as specific as possible. "TPC Scottsdale" will give more accurate results than just "Scottsdale."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Tee Time & Date</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Choose when you'll be playing to get weather forecasts tailored to your specific round timing.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">📅 Date Selection</h3>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• Forecasts available up to 3 days in advance</li>
                      <li>• Today's weather updates every hour</li>
                      <li>• Future dates show detailed predictions</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-3">⏰ Tee Time</h3>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Available from 6:00 AM to 6:00 PM</li>
                      <li>• Accounts for full 4.5-hour round duration</li>
                      <li>• Earlier times often have different conditions</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    🌅 <strong>Morning vs Afternoon:</strong> Morning rounds (before 10 AM) are often cooler and may have dew, while afternoon rounds (after 2 PM) tend to be warmer with potential afternoon storms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Walking vs Cart</h2>
                <p className="text-lg text-gray-700 mb-6">
                  This crucial selection significantly affects your clothing recommendations since walking generates more body heat.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🚶‍♂️</span>Walking
                    </h3>
                    <ul className="space-y-2 text-sm text-orange-700">
                      <li>• Recommendations account for increased body heat (+5°F effect)</li>
                      <li>• Suggests lighter layers and breathable fabrics</li>
                      <li>• Includes comfort items for 4+ hour walking</li>
                      <li>• Emphasizes proper footwear and blister prevention</li>
                      <li>• Recommends extra hydration and energy snacks</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-teal-50 rounded-lg border border-teal-200">
                    <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🛺</span>Cart/Riding
                    </h3>
                    <ul className="space-y-2 text-sm text-teal-700">
                      <li>• Accounts for wind chill while riding</li>
                      <li>• Suggests additional layers for cart rides</li>
                      <li>• Recommends jackets for between-shot cooling</li>
                      <li>• Less emphasis on extreme breathability</li>
                      <li>• Standard hydration recommendations</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    🔄 <strong>Mixed Play:</strong> If you're planning to walk some holes and ride others, choose "Walking" for safety - it's easier to remove a layer than to wish you had one.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Forecast & Recommendations</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Once you submit, you'll receive comprehensive weather data and personalized clothing recommendations.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">🌤️ Weather Information</h3>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• Hourly conditions for your entire round</li>
                      <li>• Temperature range (min/max during play)</li>
                      <li>• Wind speed and direction</li>
                      <li>• Precipitation probability</li>
                      <li>• Humidity levels</li>
                      <li>• "Feels like" temperature</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h3 className="font-semibold text-emerald-800 mb-3">👕 Clothing Recommendations</h3>
                    <ul className="space-y-2 text-sm text-emerald-700">
                      <li>• Top recommendations (shirts, layers)</li>
                      <li>• Bottom suggestions (pants, shorts)</li>
                      <li>• Essential accessories (hats, gloves)</li>
                      <li>• Footwear recommendations</li>
                      <li>• Layering strategies</li>
                      <li>• Weather-specific gear</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding Recommendations */}
          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl text-white p-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <span className="text-4xl mr-4">🧠</span>
              Understanding Your Recommendations
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Temperature Considerations</h3>
                <ul className="space-y-3 text-emerald-100">
                  <li><strong>Below 45°F:</strong> Heavy layers, thermal base layers, winter gear</li>
                  <li><strong>45-55°F:</strong> Long sleeves, light sweaters, layering options</li>
                  <li><strong>55-70°F:</strong> Comfortable range, light layers for flexibility</li>
                  <li><strong>70-85°F:</strong> Breathable fabrics, moisture-wicking materials</li>
                  <li><strong>Above 85°F:</strong> Maximum ventilation, sun protection priority</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Weather Condition Adaptations</h3>
                <ul className="space-y-3 text-emerald-100">
                  <li><strong>Rain Expected:</strong> Waterproof layers, extra gloves, umbrella</li>
                  <li><strong>High Winds (15+ mph):</strong> Wind-resistant jacket, secure hat</li>
                  <li><strong>High Humidity (80%+):</strong> Extra towels, cooling accessories</li>
                  <li><strong>Changing Conditions:</strong> Flexible layering system</li>
                  <li><strong>Sun Exposure:</strong> UV protection, wide-brim hats</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-8 flex items-center">
              <span className="text-4xl mr-4">💡</span>
              Pro Tips for Best Results
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">🎯 Accuracy Tips</h3>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• Check forecasts the night before and morning of</li>
                    <li>• Weather can change - have backup layers</li>
                    <li>• Local microclimates near water or mountains vary</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">🧳 Packing Strategy</h3>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Pack one extra layer than recommended</li>
                    <li>• Bring rain gear if any chance of precipitation</li>
                    <li>• Always carry a hat and sunglasses</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">⏰ Timing Considerations</h3>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Morning rounds: prepare for temperature rise</li>
                    <li>• Afternoon rounds: account for peak heat</li>
                    <li>• Check sunset times for late rounds</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">👥 Course-Specific Notes</h3>
                  <ul className="space-y-1 text-sm text-purple-700">
                    <li>• Check course dress code before playing</li>
                    <li>• Private clubs often have stricter requirements</li>
                    <li>• Resort courses may allow more casual attire</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl text-white p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Dress Your Round?</h2>
            <p className="text-xl mb-8 text-emerald-100">
              Now that you know how to use our app, get your personalized golf weather forecast!
            </p>
            <a
              href="/"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-bold text-lg rounded-xl hover:bg-emerald-50 hover:shadow-xl transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            >
              <span className="text-2xl mr-3">🏌️‍♂️</span>
              Get My Golf Forecast
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}