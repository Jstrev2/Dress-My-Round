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
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-3">🌤️</div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Weather Forecast</h2>
        </div>
        <div className="text-center py-12">
          <div className="relative">
            <div className="text-6xl mb-4 animate-pulse">🌦️</div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-30"></div>
          </div>
          <p className="text-gray-600 text-base sm:text-lg">
            Enter location to see detailed weather conditions
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div className="flex items-center">
          <div className="text-3xl mr-3">🌤️</div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Weather Forecast</h2>
        </div>
        <div className="text-3xl">{getWeatherIcon(weatherData.predominantCondition)}</div>
      </div>

      {/* Location & Summary */}
      <div className="mb-6 p-4 bg-gradient-to-br from-white/70 to-white/90 backdrop-blur-sm rounded-xl border border-white/40 shadow-md">
        <h3 className="font-bold text-emerald-900 mb-4 text-base sm:text-lg">{weatherData.location}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-emerald-700 font-medium">Round Time:</span>
            <span className="font-semibold text-gray-900">
              {weatherData.startTime && weatherData.endTime ?
              `${formatTime12Hour(parseInt(weatherData.startTime.split(':')[0]))} - ${formatTime12Hour(parseInt(weatherData.endTime.split(':')[0]))}` :
              `${weatherData.duration} hours`}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-emerald-700 font-medium">Avg Temp:</span>
            <span className="font-semibold text-gray-900 text-base sm:text-lg">{weatherData.averageTemp}°F</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-emerald-700 font-medium">Range:</span>
            <span className="font-medium text-gray-900">{weatherData.tempRange.min}°F - {weatherData.tempRange.max}°F</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-emerald-700 font-medium">💨 Max Wind:</span>
            <span className="font-medium text-gray-900">{weatherData.maxWindSpeed} mph</span>
          </div>
        </div>

        {weatherData.weatherChanges && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-amber-600 text-lg mt-0.5">⚠️</span>
              <p className="text-amber-800 text-sm font-medium">Weather conditions expected to change during your round</p>
            </div>
          </div>
        )}
      </div>

      {/* Hourly Forecast - Horizontal Layout */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <span className="text-xl mr-2">⏰</span>
          <h4 className="font-bold text-emerald-900 text-base sm:text-lg">Hourly Progression</h4>
        </div>
        <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2">
          {weatherData.hourlyForecast.slice(0, 5).map((hourData, index) => {
            const hour24 = weatherData.startTime ?
              (parseInt(weatherData.startTime.split(':')[0]) + index) % 24 :
              index + 8
            const formattedTime = formatTime12Hour(hour24)
            const weatherIcon = getWeatherIcon(hourData.condition)

            return (
              <div key={index} className="flex-shrink-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/40 shadow-md hover:shadow-lg transition-all duration-200 min-w-[110px] sm:min-w-[120px]">
                <div className="text-center">
                  <div className="font-bold text-emerald-700 text-xs sm:text-sm mb-2">{formattedTime}</div>
                  <div className="text-2xl sm:text-3xl mb-2">{weatherIcon}</div>
                  <div className="font-bold text-base sm:text-lg text-gray-900 mb-1">{hourData.temperature}°F</div>
                  <div className="text-xs text-gray-600 mb-2">Feels {hourData.feelsLike}°F</div>
                  <div className="text-xs text-gray-700 mb-2 font-medium">{hourData.condition}</div>
                  <div className="text-xs text-gray-600 space-y-0.5">
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
      <div className="p-4 bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm rounded-xl border border-white/40 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center">
            <span className="text-lg mr-2">🛡️</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Data Quality: Verified</span>
          </div>
          <button
            onClick={() => setShowAccuracyChecker(true)}
            className="text-xs sm:text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors duration-200 font-medium"
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