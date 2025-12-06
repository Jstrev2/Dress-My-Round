'use client'
import { RoundWeatherData, WeatherData, getWeatherIcon, formatTime12Hour } from '@/lib/weather'
import { useEffect, useState } from 'react'
import { checkWeatherAccuracy, getWeatherSourceInfo } from '@/lib/weather-validation'
import WeatherAccuracyChecker from './WeatherAccuracyChecker'
import AnimatedGolfer from './AnimatedGolfer'

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
}

export default function RecommendationDisplay({ weatherData, recommendations }: Props) {
  const [accuracyInfo, setAccuracyInfo] = useState<string[]>([])
  const [showSourceInfo, setShowSourceInfo] = useState(false)
  const [showAccuracyChecker, setShowAccuracyChecker] = useState(false)

  useEffect(() => {
    if (weatherData) {
      checkWeatherAccuracy(weatherData.location).then(setAccuracyInfo)
    }
  }, [weatherData])
  if (!weatherData || !recommendations) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">👕</span>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Your Golf Outfit</h2>
        </div>
        <div className="text-center py-12">
          <AnimatedGolfer />
          <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Ready for Your Round?</h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
            Enter your location and tee time to get personalized outfit recommendations
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">👕</span>
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Your Golf Outfit</h2>
      </div>

      {/* Outfit Recommendations */}
      <div className="space-y-3">
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
      </div>

      {/* Golf Tips */}
      <div className="mt-6 p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 shadow-md">
        <div className="flex items-center mb-3">
          <div className="text-2xl mr-3">⛳</div>
          <h4 className="font-semibold text-emerald-900 text-base">Pro Golf Tips</h4>
        </div>
        <div className="space-y-2.5">
          {getGolfTips(weatherData).map((tip, index) => (
            <div key={index} className="flex items-start gap-3 text-emerald-700 text-sm">
              <span className="font-bold text-emerald-600 mt-0.5">•</span>
              <span className="leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Accuracy Checker Modal */}
      <WeatherAccuracyChecker
        location={weatherData.location}
        isVisible={showAccuracyChecker}
        onClose={() => setShowAccuracyChecker(false)}
      />
    </div>
  )
}

function OutfitSection({ title, emoji, items }: { title: string, emoji: string, items: string[] }) {
  return (
    <div className="bg-gradient-to-br from-white/60 to-white/90 rounded-xl p-4 border border-white/40 shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow duration-200">
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

  // Temperature-specific tips based on average and range
  if (averageTemp <= 45) {
    tips.push("Very cold conditions - consider postponing if possible")
    tips.push("Keep balls warm in your pocket; cold balls don't compress well")
    tips.push("Allow extra time for warm-up to prevent injury")
  } else if (averageTemp <= 60) {
    tips.push("Keep muscles warm with light stretching before your round")
    tips.push("Ball may not travel as far in cold air - club up accordingly")
    tips.push("Grip pressure may increase in cold - focus on staying relaxed")
  } else if (averageTemp >= 90) {
    tips.push("Extreme heat - start early or late in the day if possible")
    tips.push("Drink water before you feel thirsty - every 2-3 holes minimum")
    tips.push("Wet towel on neck during cart rides can help cool down")
  } else if (averageTemp >= 80) {
    tips.push("Stay hydrated - drink water every few holes")
    tips.push("Take advantage of shade when possible")
    tips.push("Consider electrolyte replacement for longer rounds")
  }

  // Temperature change tips
  if (tempRange.max - tempRange.min > 10) {
    tips.push(`Temperature will vary ${tempRange.max - tempRange.min}°F during round - dress in layers`)
    if (tempRange.min <= 60 && tempRange.max >= 75) {
      tips.push("Start bundled up, be prepared to remove layers as you warm up")
    }
  }

  // Wind-specific tips
  if (maxWindSpeed >= 20) {
    tips.push(`Strong ${maxWindSpeed} mph winds expected - expect significant ball movement`)
    tips.push("Focus on lower ball flight and shorter backswing")
    tips.push("Pay extra attention to putting - wind affects even short putts")
  } else if (maxWindSpeed >= 15) {
    tips.push(`Moderate ${maxWindSpeed} mph winds - adjust club selection accordingly`)
    tips.push("Keep the ball lower in windy conditions")
    tips.push("Allow for more break on putts due to wind influence")
  } else if (maxWindSpeed >= 10) {
    tips.push(`Light ${maxWindSpeed} mph winds - factor into shot planning`)
    tips.push("Downwind holes will play longer, into wind holes shorter")
  }

  // Weather condition tips
  const condition = predominantCondition.toLowerCase()
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
    tips.push("Check course conditions - some holes may be cart-path only")
    tips.push("Grip pressure may need adjustment on wet clubs")
    tips.push("Ball may not roll as much on wet fairways")
    tips.push("Consider more club on approach shots to wet greens")
  } else if (condition.includes('fog') || condition.includes('mist')) {
    tips.push("Visibility may be limited - use GPS for accurate distances")
    tips.push("Course may be wet even without rain")
  }

  // Humidity tips for the round
  if (averageHumidity >= 80) {
    tips.push("Very high humidity can affect ball flight - shots may not carry as far")
    tips.push("Bring extra towels to keep grips dry throughout the round")
    tips.push("Golf balls may feel heavier and less lively")
  } else if (averageHumidity >= 70) {
    tips.push("High humidity can affect ball flight - expect slightly less distance")
    tips.push("Keep grips clean and dry for better control")
  }

  // Round duration and weather change tips
  if (weatherChanges) {
    tips.push("Weather conditions will change during your round - be prepared to adapt")
    tips.push("Check weather updates between nines if conditions are deteriorating")
  }

  // Long round considerations
  if (duration >= 4.5) {
    tips.push("Extended round time - pace yourself and stay hydrated")
    tips.push("Consider energy snacks around the turn to maintain focus")
  }

  return tips.length > 0 ? tips : ["Perfect conditions for golf! Enjoy your round!"]
}