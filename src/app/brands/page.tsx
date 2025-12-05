'use client'
import { useState } from 'react'

// Brand data type definition
interface BrandWeatherRating {
  [key: string]: number
  hot: number
  cold: number
  rain: number
  wind: number
}

interface GolfBrand {
  name: string
  rating: number
  specialty: string
  priceRange: string
  weatherStrength: string[]
  innovation: string
  popularity: number
  sustainability: number
  durability: number
  style: number
  performance: number
  founded: number
  headquarters: string
  keyProducts: string[]
  weatherRating: BrandWeatherRating
}

type GolfBrandsDataType = {
  [key: string]: GolfBrand[]
}

// This would normally come from an API or database
const golfBrandsData: GolfBrandsDataType = {
  premium: [
    {
      name: "Peter Millar",
      rating: 9.8,
      specialty: "Luxury Performance",
      priceRange: "$$$",
      weatherStrength: ["UV Protection", "Moisture Management"],
      innovation: "Seamfree Technology",
      popularity: 95,
      sustainability: 8.5,
      durability: 9.5,
      style: 9.7,
      performance: 9.2,
      founded: 2001,
      headquarters: "Raleigh, NC",
      keyProducts: ["Crown Sport Polo", "Perth Stretch Loop Terry Quarter-Zip"],
      weatherRating: {
        hot: 9.5,
        cold: 8.8,
        rain: 8.2,
        wind: 9.0
      }
    },
    {
      name: "Lululemon",
      rating: 9.6,
      specialty: "Technical Innovation",
      priceRange: "$$$",
      weatherStrength: ["Sweat-Wicking", "4-Way Stretch"],
      innovation: "ABC Technology",
      popularity: 92,
      sustainability: 9.2,
      durability: 9.0,
      style: 9.8,
      performance: 9.7,
      founded: 1998,
      headquarters: "Vancouver, BC",
      keyProducts: ["Commission Pant", "Metal Vent Tech Polo"],
      weatherRating: {
        hot: 9.8,
        cold: 9.2,
        rain: 8.5,
        wind: 8.8
      }
    },
    {
      name: "Ralph Lauren Golf",
      rating: 9.4,
      specialty: "Classic Luxury",
      priceRange: "$$$",
      weatherStrength: ["Wind Resistance", "Classic Fit"],
      innovation: "RLX Technology",
      popularity: 88,
      sustainability: 7.8,
      durability: 9.3,
      style: 9.9,
      performance: 8.8,
      founded: 1967,
      headquarters: "New York, NY",
      keyProducts: ["RLX Golf Polo", "Performance Chino"],
      weatherRating: {
        hot: 8.5,
        cold: 9.5,
        rain: 8.8,
        wind: 9.2
      }
    }
  ],
  performance: [
    {
      name: "Nike Golf",
      rating: 9.3,
      specialty: "Athletic Performance",
      priceRange: "$$",
      weatherStrength: ["Dri-FIT", "Storm Protection"],
      innovation: "AeroReact Technology",
      popularity: 96,
      sustainability: 8.8,
      durability: 8.7,
      style: 9.1,
      performance: 9.8,
      founded: 1971,
      headquarters: "Beaverton, OR",
      keyProducts: ["Dri-FIT Victory Polo", "Storm-FIT Jacket"],
      weatherRating: {
        hot: 9.7,
        cold: 8.9,
        rain: 9.5,
        wind: 9.1
      }
    },
    {
      name: "Under Armour",
      rating: 9.1,
      specialty: "Heat Management",
      priceRange: "$$",
      weatherStrength: ["HeatGear", "ColdGear"],
      innovation: "Iso-Chill Technology",
      popularity: 89,
      sustainability: 8.2,
      durability: 9.1,
      style: 8.8,
      performance: 9.6,
      founded: 1996,
      headquarters: "Baltimore, MD",
      keyProducts: ["HeatGear Polo", "Storm Windstrike Jacket"],
      weatherRating: {
        hot: 9.9,
        cold: 9.3,
        rain: 8.9,
        wind: 8.7
      }
    },
    {
      name: "Adidas Golf",
      rating: 8.9,
      specialty: "Sport Innovation",
      priceRange: "$$",
      weatherStrength: ["Climacool", "Wind Protection"],
      innovation: "HEAT.RDY Technology",
      popularity: 85,
      sustainability: 9.1,
      durability: 8.8,
      style: 9.0,
      performance: 9.2,
      founded: 1949,
      headquarters: "Herzogenaurach, Germany",
      keyProducts: ["Ultimate365 Polo", "Climastorm Jacket"],
      weatherRating: {
        hot: 9.4,
        cold: 8.6,
        rain: 9.0,
        wind: 8.9
      }
    }
  ],
  emerging: [
    {
      name: "Greyson",
      rating: 9.0,
      specialty: "Modern Luxury",
      priceRange: "$$$",
      weatherStrength: ["Stretch Performance", "Breathability"],
      innovation: "Sabre Sharp Technology",
      popularity: 78,
      sustainability: 8.5,
      durability: 8.9,
      style: 9.6,
      performance: 8.8,
      founded: 2013,
      headquarters: "Los Angeles, CA",
      keyProducts: ["Wolf Pack Polo", "Sequoia Pant"],
      weatherRating: {
        hot: 9.0,
        cold: 8.5,
        rain: 8.0,
        wind: 8.3
      }
    },
    {
      name: "G/FORE",
      rating: 8.8,
      specialty: "Bold Style",
      priceRange: "$$$",
      weatherStrength: ["Lightweight", "Color Retention"],
      innovation: "FORE Technology",
      popularity: 82,
      sustainability: 7.9,
      durability: 8.5,
      style: 9.8,
      performance: 8.3,
      founded: 2011,
      headquarters: "Los Angeles, CA",
      keyProducts: ["Tech Polo", "Cruise Short"],
      weatherRating: {
        hot: 8.8,
        cold: 7.9,
        rain: 7.5,
        wind: 8.1
      }
    }
  ],
  sustainable: [
    {
      name: "Patagonia",
      rating: 9.2,
      specialty: "Eco-Performance",
      priceRange: "$$",
      weatherStrength: ["All-Weather", "Recycled Materials"],
      innovation: "NetPlus Technology",
      popularity: 86,
      sustainability: 9.8,
      durability: 9.5,
      style: 8.5,
      performance: 8.9,
      founded: 1973,
      headquarters: "Ventura, CA",
      keyProducts: ["Capilene Cool Polo", "Houdini Jacket"],
      weatherRating: {
        hot: 8.7,
        cold: 9.4,
        rain: 9.6,
        wind: 9.3
      }
    }
  ]
}

export default function BrandsPage() {
  const [selectedCategory, setSelectedCategory] = useState('premium')
  const [sortBy, setSortBy] = useState('rating')
  const [weatherFilter, setWeatherFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = {
    premium: { name: 'Premium Luxury', icon: '👑', color: 'from-yellow-500 to-amber-500' },
    performance: { name: 'Performance Leaders', icon: '⚡', color: 'from-blue-500 to-cyan-500' },
    emerging: { name: 'Rising Stars', icon: '🌟', color: 'from-purple-500 to-pink-500' },
    sustainable: { name: 'Eco Champions', icon: '🌱', color: 'from-green-500 to-emerald-500' }
  }

  const weatherConditions = {
    all: 'All Weather',
    hot: '🔥 Hot Weather',
    cold: '❄️ Cold Weather',
    rain: '🌧️ Rain Protection',
    wind: '💨 Wind Resistance'
  }

  const getAllBrands = () => {
    return Object.values(golfBrandsData).flat()
  }

  const getFilteredBrands = () => {
    let brands = selectedCategory === 'all' ? getAllBrands() : golfBrandsData[selectedCategory] || []

    if (searchTerm) {
      brands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (weatherFilter !== 'all') {
      brands = brands.filter(brand => brand.weatherRating[weatherFilter] >= 8.5)
    }

    return brands.sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating
        case 'popularity': return b.popularity - a.popularity
        case 'sustainability': return b.sustainability - a.sustainability
        case 'performance': return b.performance - a.performance
        case 'style': return b.style - a.style
        default: return b.rating - a.rating
      }
    })
  }

  const topBrand = getAllBrands().reduce((top, brand) =>
    brand.rating > top.rating ? brand : top
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Revolutionary Golf Brands Ranking
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Data-driven insights, real-time rankings, and comprehensive analysis of the world's top golf clothing brands.
          </p>
        </div>

        {/* Top Brand Spotlight */}
        <div className="mb-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">🏆 #1 Ranked Brand</h2>
                <h3 className="text-5xl font-black">{topBrand.name}</h3>
                <p className="text-xl opacity-90 mt-2">{topBrand.specialty}</p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-black">{topBrand.rating}</div>
                <div className="text-lg opacity-90">Overall Rating</div>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{topBrand.popularity}%</div>
                <div className="text-sm opacity-90">Popularity</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{topBrand.sustainability}</div>
                <div className="text-sm opacity-90">Sustainability</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{topBrand.performance}</div>
                <div className="text-sm opacity-90">Performance</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">{topBrand.style}</div>
                <div className="text-sm opacity-90">Style</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="mb-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎛️ Interactive Brand Explorer</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              >
                <option value="premium">👑 Premium Luxury</option>
                <option value="performance">⚡ Performance Leaders</option>
                <option value="emerging">🌟 Rising Stars</option>
                <option value="sustainable">🌱 Eco Champions</option>
                <option value="all">🌐 All Brands</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              >
                <option value="rating">🏆 Overall Rating</option>
                <option value="popularity">📈 Popularity</option>
                <option value="sustainability">🌱 Sustainability</option>
                <option value="performance">⚡ Performance</option>
                <option value="style">👔 Style</option>
              </select>
            </div>

            {/* Weather Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Weather Focus</label>
              <select
                value={weatherFilter}
                onChange={(e) => setWeatherFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              >
                {Object.entries(weatherConditions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Search</label>
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredBrands().map((brand, index) => (
            <div key={brand.name} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              {/* Brand Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{brand.name}</h3>
                  <p className="text-emerald-600 font-medium">{brand.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-emerald-600">{brand.rating}</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">{brand.popularity}%</div>
                  <div className="text-xs text-gray-600">Popularity</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">{brand.priceRange}</div>
                  <div className="text-xs text-gray-600">Price Range</div>
                </div>
              </div>

              {/* Weather Performance */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Weather Performance</h4>
                <div className="space-y-2">
                  {Object.entries(brand.weatherRating).map(([condition, rating]) => (
                    <div key={condition} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{condition}</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                            style={{ width: `${(rating / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Innovation Badge */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-3 mb-4">
                <h4 className="font-semibold text-sm">🚀 Innovation</h4>
                <p className="text-sm">{brand.innovation}</p>
              </div>

              {/* Key Products */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Top Products</h4>
                <div className="space-y-1">
                  {brand.keyProducts.map((product, idx) => (
                    <div key={idx} className="text-sm text-gray-600 bg-gray-50 rounded px-2 py-1">
                      {product}
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="text-xs text-gray-500 border-t pt-3">
                <p>Founded: {brand.founded} | HQ: {brand.headquarters}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Dashboard */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📊 Market Analytics Dashboard</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl font-black text-blue-600">{getAllBrands().length}</div>
              <div className="text-blue-700 font-medium">Total Brands</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-3xl font-black text-green-600">
                {(getAllBrands().reduce((sum, b) => sum + b.sustainability, 0) / getAllBrands().length).toFixed(1)}
              </div>
              <div className="text-green-700 font-medium">Avg Sustainability</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-3xl font-black text-purple-600">
                {(getAllBrands().reduce((sum, b) => sum + b.performance, 0) / getAllBrands().length).toFixed(1)}
              </div>
              <div className="text-purple-700 font-medium">Avg Performance</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-3xl font-black text-orange-600">
                {Math.max(...getAllBrands().map(b => new Date().getFullYear() - b.founded))}
              </div>
              <div className="text-orange-700 font-medium">Years Heritage</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl text-white p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Golf Brand?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Use our weather tool to get brand-specific recommendations for your next round!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-bold text-lg rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
          >
            <span className="text-2xl mr-3">🏌️‍♂️</span>
            Get Personalized Recommendations
          </a>
        </div>
      </div>
    </div>
  )
}