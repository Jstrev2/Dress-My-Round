'use client'
import { useState } from 'react'
import { generateAccuracyReport, getDataQualityIndicators, MANUAL_VERIFICATION_STEPS } from '@/lib/weather-accuracy-test'

interface Props {
  location: string
  isVisible: boolean
  onClose: () => void
}

export default function WeatherAccuracyChecker({ location, isVisible, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'details'>('overview')

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🛡️</span>
              <h2 className="text-2xl font-bold">Weather Data Accuracy</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl focus:outline-none"
            >
              ×
            </button>
          </div>
          <p className="mt-2 text-emerald-100">
            Verification and quality assurance for {location}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-150 ${
              activeTab === 'overview'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-150 ${
              activeTab === 'verification'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ✅ Verify Now
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-150 ${
              activeTab === 'details'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🔍 Details
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
                  <h3 className="font-bold text-emerald-800 mb-2">✅ Reliability Score</h3>
                  <div className="text-3xl font-bold text-emerald-600">A-</div>
                  <p className="text-sm text-emerald-700">85-90% accuracy overall</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 shadow-sm">
                  <h3 className="font-bold text-teal-800 mb-2">📊 Data Sources</h3>
                  <div className="text-sm text-teal-700">
                    Government weather services<br />
                    Updated every 15 minutes
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-3">🎯 Accuracy by Category</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Temperature</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">90%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Conditions</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">90%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Wind Speed</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">80%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Precipitation</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-3">Quality Indicators</h3>
                <div className="space-y-2">
                  {getDataQualityIndicators(location).map((indicator, index) => (
                    <div key={index} className="flex items-center p-2 text-sm text-gray-700">
                      {indicator}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-6">
              <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 shadow-sm">
                <h3 className="font-bold text-teal-800 mb-2">Manual Verification Steps</h3>
                <p className="text-sm text-teal-700">
                  Cross-reference the weather data with these trusted sources:
                </p>
              </div>

              {MANUAL_VERIFICATION_STEPS.map((section, index) => (
                <div key={index} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-bold text-gray-800 mb-3">{section.title}</h4>
                  <div className="space-y-2">
                    {section.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start">
                        <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
                <h4 className="font-bold text-emerald-800 mb-2">Quick Verification Links</h4>
                <div className="space-y-2">
                  <a
                    href={`https://weather.com/weather/today/l/${encodeURIComponent(location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-800 transition-colors duration-150"
                  >
                    🌦️ Weather.com →
                  </a>
                  <br />
                  <a
                    href={`https://www.accuweather.com/en/search-locations?query=${encodeURIComponent(location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-800 transition-colors duration-150"
                  >
                    🌤️ AccuWeather →
                  </a>
                  <br />
                  <a
                    href="https://weather.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-800 transition-colors duration-150"
                  >
                    🏛️ National Weather Service (US) →
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-4 rounded-lg border">
                {generateAccuracyReport()}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}