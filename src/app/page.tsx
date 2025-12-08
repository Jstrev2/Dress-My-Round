'use client'
import { useState } from 'react'
import WeatherForm from '@/components/WeatherForm'
import RecommendationDisplay from '@/components/RecommendationDisplay'
import WeatherDisplay from '@/components/WeatherDisplay'
import { RoundWeatherData } from '@/lib/weather'

interface Recommendations {
  top: string[]
  bottom: string[]
  accessories: string[]
  footwear: string[]
  layers: string[]
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<RoundWeatherData | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null)
  const [isFormCollapsed, setIsFormCollapsed] = useState(false)

  const handleFormSuccess = () => {
    setIsFormCollapsed(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Tagline Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white text-lg sm:text-xl font-bold italic">
            ☀️ Fore-cast Your Attire ⛅
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Weather Form and Display */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Collapsed Form Button */}
            {isFormCollapsed && (
              <button
                onClick={() => setIsFormCollapsed(false)}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                <span>✏️</span>
                <span>Edit Weather</span>
              </button>
            )}

            {/* Expanded Form */}
            {!isFormCollapsed && (
              <WeatherForm
                onWeatherUpdate={setWeatherData}
                onRecommendationUpdate={setRecommendations}
                onSuccess={handleFormSuccess}
              />
            )}

            {/* Weather Display - Show below form */}
            {weatherData && (
              <div>
                <WeatherDisplay weatherData={weatherData} />
              </div>
            )}

            {/* Mobile Recommendations - Show below weather when form is collapsed */}
            <div className="lg:hidden">
              {recommendations && (
                <RecommendationDisplay
                  weatherData={weatherData}
                  recommendations={recommendations}
                />
              )}
            </div>
          </div>

          {/* Right Column - Outfit Recommendations (Desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <RecommendationDisplay
              weatherData={weatherData}
              recommendations={recommendations}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
