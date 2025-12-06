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
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">👕</span>
          <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Your Golf Outfit</h2>
        </div>
        <div className="text-center py-8">
          <AnimatedGolfer />
          <h3 className="text-base font-semibold text-gray-700 mb-1">Ready for Your Round?</h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            Enter your location and tee time to get personalized outfit recommendations
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">👕</span>
        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Your Golf Outfit</h2>
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
      <div className="mt-3 p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 shadow">
        <div className="flex items-center mb-2">
          <div className="text-xl mr-2">⛳</div>
          <h4 className="font-bold text-emerald-800 text-sm">Pro Tips</h4>
        </div>
        <div className="space-y-1">
          {getGolfTips(weatherData).map((tip, index) => (
            <div key={index} className="flex items-start p-1.5 text-emerald-700 text-xs">
              <span className="font-bold mr-1.5">•</span>
              <span>{tip}</span>
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
    <div className="bg-gradient-to-br from-white/50 to-white/80 rounded-lg p-3 border border-white/30 shadow backdrop-blur-sm">
      <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-800">
        <span className="text-xl">{emoji}</span>
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-700 ml-2">
            <span className="text-xs">⚪</span>
            <span>{item}</span>
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