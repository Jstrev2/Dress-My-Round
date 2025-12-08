import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Popular Golf Courses & Weather Information | Dress My Round',
  description: 'Explore popular golf courses with detailed weather patterns, climate information, and clothing recommendations for famous golf destinations.',
  keywords: 'golf courses, golf weather, golf destinations, golf course climate, golf travel, golf course conditions',
}

export default function CoursesPage() {
  const golfDestinations = [
    {
      region: "Southwest Desert",
      climate: "Hot, dry summers; mild winters",
      bestMonths: "Oct-Apr",
      courses: [
        { name: "TPC Scottsdale", location: "Arizona", features: ["Desert climate", "Minimal rain", "High UV"] },
        { name: "PGA West", location: "California", features: ["Consistent weather", "Low humidity", "Wind factors"] },
        { name: "Pinehurst Resort", location: "North Carolina", features: ["Sandhills region", "Moderate climate", "Four seasons"] }
      ]
    },
    {
      region: "Coastal Regions",
      climate: "Mild temperatures; ocean influence",
      bestMonths: "Year-round*",
      courses: [
        { name: "Pebble Beach", location: "California", features: ["Coastal fog", "Wind off ocean", "Cool summers"] },
        { name: "Bandon Dunes", location: "Oregon", features: ["Maritime climate", "Frequent wind", "Rain possible"] },
        { name: "Kiawah Island", location: "South Carolina", features: ["Humid subtropical", "Sea breeze", "Hurricane season"] }
      ]
    },
    {
      region: "Mountain/Elevation",
      climate: "Cooler temps; variable conditions",
      bestMonths: "May-Oct",
      courses: [
        { name: "Whistling Straits", location: "Wisconsin", features: ["Lake effect", "Wind exposure", "Cool climate"] },
        { name: "Vail Golf Club", location: "Colorado", features: ["High altitude", "Thin air", "Temperature swings"] },
        { name: "Resort at Squaw Creek", location: "California", features: ["Mountain climate", "Snow possible", "UV intensity"] }
      ]
    },
    {
      region: "Southeastern US",
      climate: "Hot, humid summers; mild winters",
      bestMonths: "Oct-May",
      courses: [
        { name: "Augusta National", location: "Georgia", features: ["Humid subtropical", "Spring storms", "Azalea blooms"] },
        { name: "TPC Sawgrass", location: "Florida", features: ["Tropical climate", "Thunderstorms", "High humidity"] },
        { name: "Harbour Town", location: "South Carolina", features: ["Coastal influence", "Sea breeze", "Moderate winters"] }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-700 drop-shadow-lg mb-6">
            Golf Courses & Climate Guide
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Discover popular golf destinations, their unique weather patterns, and expert clothing recommendations for each climate zone.
          </p>
        </div>

        {/* Climate Zones */}
        <div className="space-y-12">
          {golfDestinations.map((region, index) => (
            <section key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-emerald-700 drop-shadow-lg mb-4">
                  {region.region}
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">🌡️ Climate</h3>
                    <p className="text-sm text-blue-700">{region.climate}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">📅 Best Months</h3>
                    <p className="text-sm text-green-700">{region.bestMonths}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">👕 Key Considerations</h3>
                    <p className="text-sm text-purple-700">
                      {region.region === "Southwest Desert" && "UV protection, layering for temperature swings"}
                      {region.region === "Coastal Regions" && "Wind protection, layering for fog"}
                      {region.region === "Mountain/Elevation" && "Warmth, UV protection, weather changes"}
                      {region.region === "Southeastern US" && "Moisture-wicking, rain gear, sun protection"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {region.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                    <p className="text-emerald-600 font-medium mb-4">{course.location}</p>
                    <div className="space-y-2">
                      {course.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Seasonal Clothing Guide */}
        <section className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center mb-8">
            <span className="text-4xl mr-4">🗓️</span>
            <h2 className="text-3xl font-bold text-emerald-700 drop-shadow-lg">Seasonal Golf Travel Guide</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Winter */}
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">❄️</span>Winter Golf
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-700">Best Destinations:</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Arizona (Phoenix, Scottsdale)</li>
                    <li>• Southern California</li>
                    <li>• Florida</li>
                    <li>• Hawaii</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700">Packing Essentials:</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Layering system</li>
                    <li>• Wind protection</li>
                    <li>• Morning warmth gear</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Spring */}
            <div className="p-6 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <span className="mr-2">🌸</span>Spring Golf
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-green-700">Best Destinations:</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Augusta, Georgia</li>
                    <li>• Pinehurst, NC</li>
                    <li>• Texas Hill Country</li>
                    <li>• Hilton Head, SC</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Packing Essentials:</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Flexible layers</li>
                    <li>• Rain gear</li>
                    <li>• Variable conditions prep</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Summer */}
            <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
              <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                <span className="mr-2">☀️</span>Summer Golf
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-yellow-700">Best Destinations:</h4>
                  <ul className="text-sm text-yellow-600 space-y-1">
                    <li>• Pacific Northwest</li>
                    <li>• Northern Michigan</li>
                    <li>• Mountain courses</li>
                    <li>• Coastal regions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700">Packing Essentials:</h4>
                  <ul className="text-sm text-yellow-600 space-y-1">
                    <li>• UV protection</li>
                    <li>• Cooling accessories</li>
                    <li>• Moisture-wicking fabrics</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fall */}
            <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                <span className="mr-2">🍂</span>Fall Golf
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-orange-700">Best Destinations:</h4>
                  <ul className="text-sm text-orange-600 space-y-1">
                    <li>• New England</li>
                    <li>• Midwest</li>
                    <li>• Mid-Atlantic</li>
                    <li>• Colorado</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700">Packing Essentials:</h4>
                  <ul className="text-sm text-orange-600 space-y-1">
                    <li>• Warm layers</li>
                    <li>• Wind protection</li>
                    <li>• Temperature flexibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Golf Course Weather Factors */}
        <section className="mt-16 bg-emerald-700 rounded-2xl shadow-xl text-white p-8">
          <div className="flex items-center mb-8">
            <span className="text-4xl mr-4">🌍</span>
            <h2 className="text-3xl font-bold">Unique Weather Factors by Course Type</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">🏖️ Coastal Courses</h3>
              <ul className="space-y-2 text-emerald-100">
                <li>• Consistent ocean breezes (10-20 mph typical)</li>
                <li>• Marine layer/fog in mornings</li>
                <li>• More stable temperatures</li>
                <li>• Higher humidity from ocean</li>
                <li>• UV reflection off water</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">🏔️ Mountain Courses</h3>
              <ul className="space-y-2 text-emerald-100">
                <li>• Thin air affects ball flight</li>
                <li>• Large temperature swings</li>
                <li>• Intense UV at elevation</li>
                <li>• Rapid weather changes</li>
                <li>• Wind patterns in valleys</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">🌵 Desert Courses</h3>
              <ul className="space-y-2 text-emerald-100">
                <li>• Extreme temperature swings</li>
                <li>• Very low humidity</li>
                <li>• Intense sun exposure</li>
                <li>• Minimal rain year-round</li>
                <li>• Wind patterns around mountains</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">🌲 Forest/Parkland</h3>
              <ul className="space-y-2 text-emerald-100">
                <li>• Tree wind protection</li>
                <li>• Higher humidity in trees</li>
                <li>• Temperature moderation</li>
                <li>• Dew collection in mornings</li>
                <li>• Rain shelter potential</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">💧 Lakeside Courses</h3>
              <ul className="space-y-2 text-emerald-100">
                <li>• Lake effect weather</li>
                <li>• Sudden wind changes</li>
                <li>• Cooler near water</li>
                <li>• Higher humidity</li>
                <li>• Fog potential</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">🏘️ Resort Courses</h3>
              <ul className="space-y-2 text-emerald-100">
                <li>• Manicured microclimates</li>
                <li>• Irrigation effects</li>
                <li>• Wind break landscaping</li>
                <li>• Predictable conditions</li>
                <li>• Weather monitoring</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Planning a Golf Trip?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Get personalized weather forecasts and clothing recommendations for any golf destination.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-xl hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            <span className="text-2xl mr-3">🏌️‍♂️</span>
            Check Weather for Your Course
          </a>
        </section>
      </div>
    </div>
  )
}