'use client'
import { useState, useEffect } from 'react'
import WeatherForm from '@/components/WeatherForm'
import RecommendationDisplay from '@/components/RecommendationDisplay'
import RecommendationModal from '@/components/RecommendationModal'
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
  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Auto-open modal on mobile when recommendations appear
  useEffect(() => {
    if (recommendations && isMobile) {
      setShowModal(true)
    }
  }, [recommendations, isMobile])

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
          <div className="lg:col-span-2 space-y-6">
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

          {/* Right Column - Outfit Recommendations (Desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <RecommendationDisplay
              weatherData={weatherData}
              recommendations={recommendations}
            />
          </div>
        </div>
      </div>

      {/* Mobile Recommendation Modal */}
      <RecommendationModal
        weatherData={weatherData}
        recommendations={recommendations}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  )
}
