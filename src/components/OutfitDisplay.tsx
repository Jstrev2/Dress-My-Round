'use client'
import { RoundWeatherData } from '@/lib/weather'

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

export default function OutfitDisplay({ weatherData, recommendations }: Props) {
  if (!weatherData || !recommendations) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-xl border border-emerald-200 p-8 h-full">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-3">👕</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Your Golf Outfit</h2>
        </div>
        <div className="text-center py-12">
          <div className="relative">
            <div className="text-6xl mb-4 animate-bounce">🏌️‍♂️</div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-green-200 rounded-full blur-3xl opacity-30"></div>
          </div>
          <p className="text-gray-500 text-lg">
            Get weather data to see personalized clothing recommendations
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-xl border border-emerald-200 p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="text-3xl mr-3">👕</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Your Golf Outfit</h2>
        </div>
        <div className="text-2xl">✨</div>
      </div>

      {/* Recommendations Grid - Compact Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {recommendations.top.length > 0 && (
          <RecommendationSection
            title="👕 Tops"
            items={recommendations.top}
            color="rose"
          />
        )}

        {recommendations.bottom.length > 0 && (
          <RecommendationSection
            title="👖 Bottoms"
            items={recommendations.bottom}
            color="blue"
          />
        )}

        {recommendations.footwear.length > 0 && (
          <RecommendationSection
            title="👟 Footwear"
            items={recommendations.footwear}
            color="amber"
          />
        )}

        {recommendations.accessories.length > 0 && (
          <RecommendationSection
            title="🎩 Accessories"
            items={recommendations.accessories}
            color="purple"
          />
        )}

        {recommendations.layers.length > 0 && (
          <RecommendationSection
            title="🧥 Layers"
            items={recommendations.layers}
            color="green"
          />
        )}
      </div>

      {/* Golf Tips - Compact */}
      <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
        <div className="flex items-center mb-3">
          <div className="text-xl mr-2">⛳</div>
          <h4 className="font-bold text-emerald-800">Pro Tips for Your Round</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {getGolfTips(weatherData).slice(0, 6).map((tip, index) => (
            <div
              key={index}
              className="flex items-start text-sm bg-white/50 p-2 rounded-lg"
            >
              <div className="flex-shrink-0 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 mt-0.5">
                {index + 1}
              </div>
              <span className="text-emerald-800 text-xs leading-tight">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RecommendationSection({ title, items, color }: {
  title: string
  items: string[]
  color: 'rose' | 'blue' | 'amber' | 'purple' | 'green'
}) {
  const getColorClasses = (color: string) => {
    const colorMap = {
      rose: 'from-rose-500 to-pink-500 bg-rose-50 border-rose-200',
      blue: 'from-blue-500 to-cyan-500 bg-blue-50 border-blue-200',
      amber: 'from-amber-500 to-orange-500 bg-amber-50 border-amber-200',
      purple: 'from-purple-500 to-indigo-500 bg-purple-50 border-purple-200',
      green: 'from-green-500 to-emerald-500 bg-green-50 border-green-200'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.green
  }

  const colorClasses = getColorClasses(color)
  const [gradientClass, bgClass, borderClass] = colorClasses.split(' ')

  return (
    <div className={`${bgClass} rounded-xl p-4 border ${borderClass} h-fit`}>
      <h4 className={`font-bold text-sm mb-3 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
        {title}
      </h4>
      <div className="space-y-2">
        {items.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="p-2 bg-white/70 backdrop-blur-sm rounded-lg text-xs border border-white/50 hover:bg-white/90 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 mr-2 flex-shrink-0"></div>
              <span className="text-gray-700 leading-tight">{item}</span>
            </div>
          </div>
        ))}
        {items.length > 3 && (
          <div className="text-xs text-gray-500 text-center">
            +{items.length - 3} more items
          </div>
        )}
      </div>
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