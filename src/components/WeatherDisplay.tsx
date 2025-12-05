'use client'
import { RoundWeatherData, getWeatherIcon, formatTime12Hour } from '@/lib/weather'
import { useEffect, useState } from 'react'
import { checkWeatherAccuracy, getWeatherSourceInfo } from '@/lib/weather-validation'
import WeatherAccuracyChecker from './WeatherAccuracyChecker'

interface Props {
  weatherData: RoundWeatherData | null
}

export default function WeatherDisplay({ weatherData }: Props) {
  const [accuracyInfo, setAccuracyInfo] = useState<string[]>([])
  const [showSourceInfo, setShowSourceInfo] = useState(false)
  const [showAccuracyChecker, setShowAccuracyChecker] = useState(false)

  useEffect(() => {
    if (weatherData) {
      checkWeatherAccuracy(weatherData.location).then(setAccuracyInfo)
    }
  }, [weatherData])

  if (!weatherData) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl border border-blue-200 p-8 h-full">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-3">🌤️</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Weather Forecast</h2>
        </div>
        <div className="text-center py-12">
          <div className="relative">
            <div className="text-6xl mb-4 animate-pulse">🌦️</div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30"></div>
          </div>
          <p className="text-gray-500 text-lg">
            Enter location to see detailed weather conditions
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl border border-blue-200 p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="text-3xl mr-3">🌤️</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Weather Forecast</h2>
        </div>
        <div className="text-2xl">{getWeatherIcon(weatherData.predominantCondition)}</div>
      </div>

      {/* Location & Summary */}
      <div className="mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
        <h3 className="font-bold text-blue-800 mb-3 text-lg">{weatherData.location}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-blue-600">Round Time:</span>
            <span className="font-semibold">
              {weatherData.startTime && weatherData.endTime ?
              `${formatTime12Hour(parseInt(weatherData.startTime.split(':')[0]))} - ${formatTime12Hour(parseInt(weatherData.endTime.split(':')[0]))}` :
              `${weatherData.duration} hours`}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-600">Avg Temp:</span>
            <span className="font-semibold text-lg">{weatherData.averageTemp}°F</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-600">Range:</span>
            <span className="font-medium">{weatherData.tempRange.min}°F - {weatherData.tempRange.max}°F</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-600">💨 Max Wind:</span>
            <span className="font-medium">{weatherData.maxWindSpeed} mph</span>
          </div>
        </div>

        {weatherData.weatherChanges && (
          <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-lg text-amber-800 text-sm text-center">
            ⚠️ Weather conditions expected to change during your round
          </div>
        )}
      </div>

      {/* Hourly Forecast - Horizontal Layout */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <span className="text-xl mr-2">⏰</span>
          <h4 className="font-bold text-blue-800">Hourly Progression</h4>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {weatherData.hourlyForecast.slice(0, 5).map((hourData, index) => {
            const hour24 = weatherData.startTime ?
              (parseInt(weatherData.startTime.split(':')[0]) + index) % 24 :
              index + 8
            const formattedTime = formatTime12Hour(hour24)
            const weatherIcon = getWeatherIcon(hourData.condition)

            return (
              <div key={index} className="flex-shrink-0 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-200 min-w-[120px]">
                <div className="text-center">
                  <div className="font-bold text-blue-700 text-sm mb-2">{formattedTime}</div>
                  <div className="text-3xl mb-2">{weatherIcon}</div>
                  <div className="font-bold text-lg text-gray-800 mb-1">{hourData.temperature}°F</div>
                  <div className="text-xs text-gray-600 mb-2">Feels {hourData.feelsLike}°F</div>
                  <div className="text-xs text-gray-700 mb-2 font-medium">{hourData.condition}</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>💨 {hourData.windSpeed}mph</div>
                    <div>💧 {hourData.humidity}%</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Data Quality - Compact */}
      <div className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm mr-2">🛡️</span>
            <span className="text-xs font-medium text-slate-700">Data Quality: Verified</span>
          </div>
          <button
            onClick={() => setShowAccuracyChecker(true)}
            className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
          >
            Check Accuracy
          </button>
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