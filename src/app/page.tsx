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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="w-full px-3 sm:px-4 py-2">
        {/* Hero Section */}
        <div className="text-center mb-3">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-1">
            🏌️‍♂️ Dress My Round
          </h1>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">
            Master every forecast in style—because looking good matters as much as your handicap
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column - Weather Form and Display */}
          <div className="lg:col-span-2 space-y-3">
            <WeatherForm
              onWeatherUpdate={setWeatherData}
              onRecommendationUpdate={setRecommendations}
            />

            {/* Weather Display - Show below form */}
            {weatherData && (
              <div>
                <WeatherDisplay weatherData={weatherData} />
              </div>
            )}
          </div>

          {/* Right Column - Outfit Recommendations (Upper Right) */}
          <div className="lg:col-span-1">
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
