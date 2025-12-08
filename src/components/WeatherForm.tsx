'use client'
import { FormEvent, useEffect, useState } from 'react'
import { Locate, Loader } from 'lucide-react'
import SearchableLocationInput from './SearchableLocationInput'
import DatePicker from './DatePicker'
import { RoundWeatherData } from '@/lib/weather'

interface Recommendations {
  top: string[]
  bottom: string[]
  accessories: string[]
  footwear: string[]
  layers: string[]
}

interface Props {
  onWeatherUpdate: (data: RoundWeatherData) => void
  onRecommendationUpdate: (recommendations: Recommendations) => void
  onSuccess?: () => void
}

type RoundType = 'full' | 'half'

export default function WeatherForm({ onWeatherUpdate, onRecommendationUpdate, onSuccess }: Props) {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [roundType, setRoundType] = useState<RoundType>('full')
  const [walkingMode, setWalkingMode] = useState<'walking' | 'riding'>('riding')
  const [loading, setLoading] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setDate(today)

    const now = new Date()
    // Round up to the next full hour
    let roundedHour = now.getMinutes() === 0 ? now.getHours() : now.getHours() + 1

    // Cap to valid golf hours (5am-7pm / 5:00-19:00)
    if (roundedHour < 5) {
      roundedHour = 5
    } else if (roundedHour > 19) {
      roundedHour = 14 // Default to 2pm if after 7pm
    }

    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), roundedHour, 0)
    const hours = String(nextHour.getHours()).padStart(2, '0')
    const minutes = String(nextHour.getMinutes()).padStart(2, '0')
    setTime(`${hours}:${minutes}`)
  }, [])

  const handleGeolocation = async () => {
    setGeoLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      setGeoLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          // Use reverse geocoding to get location name
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await response.json()
          const locationName = data.address?.city || data.address?.town || data.address?.county || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          setLocation(locationName)
        } catch (geoError) {
          console.error('Error reverse geocoding:', geoError)
          setError('Could not determine location name. Please try again.')
        } finally {
          setGeoLoading(false)
        }
      },
      (geoError) => {
        console.error('Geolocation error:', geoError)
        setError('Unable to access your location. Please enable location services.')
        setGeoLoading(false)
      }
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!location.trim()) {
      setError('Please enter a location before requesting your weather report.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/round-weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location,
          date,
          startTime: time,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'The weather service responded with an error.')
      }

      const weatherData: RoundWeatherData = await response.json()
      const recommendations = generateRecommendations(weatherData, walkingMode)

      onWeatherUpdate(weatherData)
      onRecommendationUpdate(recommendations)
      onSuccess?.()
    } catch (fetchError) {
      console.error('Error fetching weather:', fetchError)
      setError('Unable to fetch weather data for this location. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Plan Your Round
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-semibold text-gray-700">
            Where are you playing?
          </label>
          <div className="relative">
            <SearchableLocationInput
              value={location}
              onChange={setLocation}
              placeholder="City, zip code, or golf course"
              className="w-full px-4 py-2.5 pr-12 border-2 border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 focus:border-emerald-500 transition-all duration-200 placeholder-gray-500"
            />
            <button
              type="button"
              onClick={handleGeolocation}
              disabled={geoLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Use current location"
            >
              {geoLoading ? (
                <Loader className="w-5 h-5 text-emerald-500 animate-spin" />
              ) : (
                <Locate className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Date
            </label>
            <DatePicker
              value={date}
              onChange={setDate}
              minDate={new Date().toISOString().split('T')[0]}
              maxDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-semibold text-gray-700">
              Tee Time
            </label>
            <select
              id="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 focus:border-emerald-500 transition-all duration-200 bg-white"
            >
              <option value="05:00">5:00 AM</option>
              <option value="05:30">5:30 AM</option>
              <option value="06:00">6:00 AM</option>
              <option value="06:30">6:30 AM</option>
              <option value="07:00">7:00 AM</option>
              <option value="07:30">7:30 AM</option>
              <option value="08:00">8:00 AM</option>
              <option value="08:30">8:30 AM</option>
              <option value="09:00">9:00 AM</option>
              <option value="09:30">9:30 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="10:30">10:30 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="11:30">11:30 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="12:30">12:30 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="13:30">1:30 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="14:30">2:30 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="15:30">3:30 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="16:30">4:30 PM</option>
              <option value="17:00">5:00 PM</option>
              <option value="17:30">5:30 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="18:30">6:30 PM</option>
              <option value="19:00">7:00 PM</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Holes
              </label>
              <div className="flex gap-2">
                <label className={`flex-1 flex items-center justify-center py-1 px-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${roundType === 'full' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="roundType"
                    value="full"
                    checked={roundType === 'full'}
                    onChange={(event) => setRoundType(event.target.value as RoundType)}
                    className="sr-only"
                  />
                  <span className="font-bold text-sm whitespace-nowrap">18 Holes</span>
                </label>
                <label className={`flex-1 flex items-center justify-center py-1 px-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${roundType === 'half' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="roundType"
                    value="half"
                    checked={roundType === 'half'}
                    onChange={(event) => setRoundType(event.target.value as RoundType)}
                    className="sr-only"
                  />
                  <span className="font-bold text-sm">9 Holes</span>
                </label>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Play Style
              </label>
              <div className="flex gap-2">
                <label className={`flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${walkingMode === 'walking' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="walkingMode"
                    value="walking"
                    checked={walkingMode === 'walking'}
                    onChange={(event) => setWalkingMode(event.target.value as 'walking' | 'riding')}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm">Walking</span>
                </label>
                <label className={`flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${walkingMode === 'riding' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="walkingMode"
                    value="riding"
                    checked={walkingMode === 'riding'}
                    onChange={(event) => setWalkingMode(event.target.value as 'walking' | 'riding')}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm">Riding</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-rose-600 text-lg mt-0.5">⚠️</span>
              <p className="text-rose-800 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !location.trim()}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg text-base font-semibold hover:from-emerald-700 hover:to-teal-700 focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Getting Weather...
            </div>
          ) : (
            <span>Get My Golf Weather Forecast</span>
          )}
        </button>
      </form>

      <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
        <div className="space-y-2">
          <p className="flex items-center font-semibold text-emerald-900 text-sm">
            💡 Pro Tips
          </p>
          <ul className="space-y-2 text-emerald-700 text-sm">
            <li className="flex gap-2">
              <span className="text-emerald-600 font-semibold">•</span>
              <span>Forecasts available up to 3 days in advance</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-semibold">•</span>
              <span>Accounts for your full round duration</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-semibold">•</span>
              <span>Weather conditions may change during play</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function calculateWindChill(tempF: number, windSpeedMph: number): number {
  if (tempF >= 50 || windSpeedMph <= 3) {
    return tempF
  }

  const windChillIndex = 35.74 +
    0.6215 * tempF -
    35.75 * Math.pow(windSpeedMph, 0.16) +
    0.4275 * tempF * Math.pow(windSpeedMph, 0.16)

  return Math.round(windChillIndex * 10) / 10
}

function calculateHeatIndex(tempF: number, humidity: number): number {
  if (tempF < 80 || humidity < 40) {
    return tempF
  }

  const c1 = -42.379
  const c2 = 2.04901523
  const c3 = 10.14333127
  const c4 = -0.22475541
  const c5 = -0.00683783
  const c6 = -0.05481717
  const c7 = 0.00122874
  const c8 = 0.00085282
  const c9 = -0.00000199

  const T = tempF
  const RH = humidity

  const heatIndex = c1 +
    c2 * T +
    c3 * RH +
    c4 * T * RH +
    c5 * T * T +
    c6 * RH * RH +
    c7 * T * T * RH +
    c8 * T * RH * RH +
    c9 * T * T * RH * RH

  return Math.round(heatIndex * 10) / 10
}

function calculateAverageFeelsLike(hourlyForecast: any[]): number {
  if (hourlyForecast.length === 0) return 0

  const totalFeelsLike = hourlyForecast.reduce((sum, hour) => sum + hour.feelsLike, 0)
  return Math.round((totalFeelsLike / hourlyForecast.length) * 10) / 10
}

function calculateEffectiveTemperature(
  averageFeelsLike: number,
  maxWindSpeed: number,
  humidity: number,
  activityAdjustment: number
): number {
  let effectiveTemp = averageFeelsLike

  if (maxWindSpeed > 3) {
    const windChillTemp = calculateWindChill(effectiveTemp, maxWindSpeed)
    effectiveTemp = Math.min(effectiveTemp, windChillTemp)
  }

  if (effectiveTemp >= 80 && humidity > 40) {
    const heatIndexTemp = calculateHeatIndex(effectiveTemp, humidity)
    effectiveTemp = Math.max(effectiveTemp, heatIndexTemp)
  }

  effectiveTemp += activityAdjustment

  return Math.round(effectiveTemp * 10) / 10
}

function generateRecommendations(roundWeather: RoundWeatherData, walkingMode: 'walking' | 'riding'): Recommendations {
  const { tempRange, predominantCondition, maxWindSpeed, averageHumidity, weatherChanges, hourlyForecast } = roundWeather

  const recommendations: Recommendations = {
    top: [],
    bottom: [],
    accessories: [],
    footwear: [],
    layers: []
  }

  const averageFeelsLike = calculateAverageFeelsLike(hourlyForecast)
  const activityAdjustment = walkingMode === 'walking' ? 8 : 0
  const effectiveTemp = calculateEffectiveTemperature(
    averageFeelsLike,
    maxWindSpeed,
    averageHumidity,
    activityAdjustment
  )

  if (effectiveTemp <= 45) {
    recommendations.top.push(
      'Thermal base layer',
      'Golf shirt',
      'Long-sleeve pullover or golf top'
    )
    recommendations.bottom.push(
      'Thermal base layer',
      'Golf pants'
    )
    recommendations.accessories.push(
      'Insulated golf gloves',
      'Winter beanie or hat',
      'Scarf or neck warmer',
      'Hand warmers'
    )
    recommendations.footwear.push(
      'Waterproof insulated golf shoes',
      'Wool or thermal socks'
    )
    recommendations.layers.push(
      'Heavy windbreaker or winter coat',
      'Waterproof outer shell',
      'Insulated jacket'
    )
  } else if (effectiveTemp <= 55) {
    recommendations.top.push(
      'Golf shirt',
      'Golf sweater or light pullover',
      'Moisture-wicking base layer'
    )
    recommendations.bottom.push(
      'Golf pants',
      'Lightweight thermal base layer'
    )
    recommendations.accessories.push(
      'Golf gloves',
      'Golf cap or beanie',
      'Towel'
    )
    recommendations.footwear.push(
      'Golf shoes (waterproof recommended)',
      'Wool or moisture-wicking socks'
    )
    recommendations.layers.push(
      'Light windbreaker or golf jacket',
      'Rain jacket (for changing conditions)',
      'Removable insulated layer'
    )
  } else if (effectiveTemp <= 70) {
    if (walkingMode === 'walking') {
      recommendations.top.push(
        'Moisture-wicking base layer',
        'Golf shirt',
        'Long-sleeve pullover or golf top'
      )
      recommendations.bottom.push('Golf shorts')
      recommendations.layers.push('Lightweight golf pants (for extra warmth)')
    } else {
      recommendations.top.push(
        'Moisture-wicking base layer',
        'Golf shirt',
        'Long-sleeve pullover or golf top'
      )
      recommendations.bottom.push('Golf pants')
    }
    recommendations.accessories.push(
      'Golf cap',
      'Towel',
      'Sunglasses'
    )
    recommendations.footwear.push(
      'Comfortable golf shoes',
      'Moisture-wicking socks'
    )
    recommendations.layers.push(
      'Light jacket or sweater',
      'Windbreaker (if windy)',
      'Rain jacket (for changing conditions)'
    )
  } else if (effectiveTemp <= 85) {
    recommendations.top.push(
      'Short-sleeve golf polo',
      'Moisture-wicking golf shirt',
      'Lightweight undershirt'
    )
    recommendations.bottom.push('Golf shorts')
    recommendations.accessories.push(
      'Golf cap',
      'Sunglasses',
      'Towel',
      'Sunscreen'
    )
    recommendations.footwear.push(
      'Breathable golf shoes',
      'Moisture-wicking socks'
    )
    recommendations.layers.push(
      'Lightweight windbreaker (for wind)',
      'Rain jacket (if rain in forecast)'
    )
  } else {
    recommendations.top.push(
      'Sleeveless or tank top golf shirt',
      'Ultra-light short-sleeve polo',
      'Moisture-wicking breathable shirt'
    )
    recommendations.bottom.push(
      'Golf shorts',
      'Ultra-light golf shorts'
    )
    recommendations.accessories.push(
      'Wide-brim hat',
      'Sunglasses',
      'Sunscreen (SPF 30+)',
      'Cooling towel',
      'Water bottle'
    )
    recommendations.footwear.push(
      'Breathable golf shoes with ventilation',
      'Moisture-wicking socks'
    )
    recommendations.layers.push('Rain jacket (if rain expected)')
  }

  const lowerCondition = predominantCondition.toLowerCase()
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) {
    if (!recommendations.layers.some((item) => item.toLowerCase().includes('waterproof'))) {
      recommendations.layers.push('Waterproof rain jacket')
    }
    if (!recommendations.accessories.some((item) => item.toLowerCase().includes('umbrella'))) {
      recommendations.accessories.push('Golf umbrella')
    }
    if (!recommendations.footwear.some((item) => item.toLowerCase().includes('waterproof'))) {
      recommendations.footwear.push('Waterproof golf shoes')
    }
    if (!recommendations.accessories.some((item) => item.toLowerCase().includes('waterproof gloves'))) {
      recommendations.accessories.push('Waterproof gloves')
    }
  }

  if (maxWindSpeed > 20) {
    if (!recommendations.layers.some((item) => item.toLowerCase().includes('wind'))) {
      recommendations.layers.push('Wind-resistant jacket')
    }
    if (!recommendations.accessories.some((item) => item.toLowerCase().includes('chin strap'))) {
      recommendations.accessories.push('Hat with chin strap or secure fit')
    }
  } else if (maxWindSpeed > 15) {
    if (!recommendations.layers.some((item) => item.toLowerCase().includes('wind'))) {
      recommendations.layers.push('Light windbreaker')
    }
  }

  if (averageHumidity > 80) {
    recommendations.accessories.push('Extra water bottle', 'Electrolyte drink')
    if (walkingMode === 'walking' && !recommendations.accessories.some((item) => item.toLowerCase().includes('cooling'))) {
      recommendations.accessories.push('Cooling towel')
    }
  } else if (averageHumidity > 70) {
    if (!recommendations.accessories.some((item) => item.toLowerCase().includes('towel'))) {
      recommendations.accessories.push('Towel')
    }
  }

  if (walkingMode === 'walking') {
    if (!recommendations.accessories.some((item) => item.toLowerCase().includes('blister'))) {
      recommendations.accessories.push('Blister prevention (moleskin/tape)')
    }
    if (!recommendations.footwear.some((item) => item.toLowerCase().includes('cushioned'))) {
      recommendations.footwear.push('Cushioned insoles for comfort')
    }
    if (!recommendations.accessories.some((item) => item.toLowerCase().includes('water') && item.toLowerCase().includes('bottle'))) {
      recommendations.accessories.push('Extra water for hydration')
    }
  }

  if (weatherChanges && tempRange.max - tempRange.min > 10) {
    recommendations.layers.push('Bring layers you can remove as conditions change')
  }

  return recommendations
}
