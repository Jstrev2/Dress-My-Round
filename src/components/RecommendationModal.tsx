'use client'
import { RoundWeatherData } from '@/lib/weather'
import { useEffect, useRef } from 'react'

interface Recommendations {
  top: string[]
  bottom: string[]
  accessories: string[]
  footwear: string[]
  layers: string[]
}

interface Props {
  weatherData: RoundWeatherData | null
  recommendations: Recommendations | null
  isOpen: boolean
  onClose: () => void
}

export default function RecommendationModal({ weatherData, recommendations, isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    // Close on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !weatherData || !recommendations) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Bottom Sheet Modal */}
      <div
        ref={modalRef}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto transition-transform duration-300"
      >
        {/* Header with close button */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-emerald-100 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl mr-3">👕</span>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Your Golf Outfit
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-6 space-y-4">
          {/* Outfit Recommendations */}
          {recommendations.top.length > 0 && (
            <OutfitSection title="Tops" emoji="👕" items={recommendations.top} />
          )}

          {recommendations.bottom.length > 0 && (
            <OutfitSection title="Bottoms" emoji="🩳" items={recommendations.bottom} />
          )}

          {recommendations.footwear.length > 0 && (
            <OutfitSection title="Footwear" emoji="👟" items={recommendations.footwear} />
          )}

          {recommendations.accessories.length > 0 && (
            <OutfitSection title="Accessories" emoji="🕶️" items={recommendations.accessories} />
          )}

          {recommendations.layers.length > 0 && (
            <OutfitSection title="Recommended Additional Layers" emoji="🧥" items={recommendations.layers} />
          )}

          {/* Pro Tips */}
          <div className="mt-6 p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 shadow-md">
            <div className="flex items-center mb-3">
              <div className="text-2xl mr-3">⛳</div>
              <h4 className="font-semibold text-emerald-900 text-base">Pro Golf Tips</h4>
            </div>
            <div className="space-y-2.5">
              {getGolfTips(weatherData).slice(0, 4).map((tip, index) => (
                <div key={index} className="flex items-start gap-3 text-emerald-700 text-sm">
                  <span className="font-bold text-emerald-600 mt-0.5">•</span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Close button at bottom for better UX on mobile */}
          <button
            onClick={onClose}
            className="w-full mt-6 mb-4 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Got It, Let Me Adjust
          </button>
        </div>
      </div>
    </>
  )
}

function OutfitSection({ title, emoji, items }: { title: string, emoji: string, items: string[] }) {
  return (
    <div className="bg-gradient-to-br from-white/60 to-white/90 rounded-xl p-4 border border-white/40 shadow-md backdrop-blur-sm">
      <h4 className="font-semibold text-base mb-4 flex items-center gap-3 text-gray-900">
        <span className="text-2xl">{emoji}</span>
        <span>{title}</span>
      </h4>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
            <span className="text-emerald-600 font-bold mt-0.5">•</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function getGolfTips(roundWeather: RoundWeatherData): string[] {
  const tips: string[] = []
  const { averageTemp, tempRange, predominantCondition, maxWindSpeed, averageHumidity, weatherChanges, duration } = roundWeather

  if (averageTemp <= 45) {
    tips.push("Very cold conditions - consider postponing if possible")
    tips.push("Keep balls warm in your pocket; cold balls don't compress well")
  } else if (averageTemp <= 60) {
    tips.push("Keep muscles warm with light stretching before your round")
    tips.push("Ball may not travel as far in cold air - club up accordingly")
  } else if (averageTemp >= 90) {
    tips.push("Extreme heat - start early or late in the day if possible")
    tips.push("Drink water before you feel thirsty - every 2-3 holes minimum")
  } else if (averageTemp >= 80) {
    tips.push("Stay hydrated - drink water every few holes")
    tips.push("Take advantage of shade when possible")
  }

  if (tempRange.max - tempRange.min > 10) {
    tips.push(`Temperature varies ${tempRange.max - tempRange.min}°F - dress in layers`)
  }

  if (maxWindSpeed >= 20) {
    tips.push(`Strong ${maxWindSpeed} mph winds expected - expect significant ball movement`)
  } else if (maxWindSpeed >= 15) {
    tips.push(`Moderate ${maxWindSpeed} mph winds - adjust club selection accordingly`)
  }

  const condition = predominantCondition.toLowerCase()
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
    tips.push("Check course conditions - some holes may be cart-path only")
  }

  if (averageHumidity >= 80) {
    tips.push("Very high humidity - bring extra towels to keep grips dry")
  }

  return tips.length > 0 ? tips : ["Perfect conditions for golf! Enjoy your round!"]
}
