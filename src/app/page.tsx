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
      {/* Tagline Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white text-lg sm:text-xl font-bold italic">
            ☀️ Fore-cast Your Attire ⛅
          </p>
        </div>
      </div>

      <div className="w-full px-3 sm:px-4 py-2">
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
