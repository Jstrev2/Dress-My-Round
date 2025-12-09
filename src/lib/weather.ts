export interface WeatherData {
  location: string
  temperature: number
  condition: string
  windSpeed: number
  humidity: number
  feelsLike: number
  icon: string
}

export interface RoundWeatherData {
  location: string
  startTime: string
  startDate: string
  endTime: string
  endDate: string
  duration: number // in hours
  hourlyForecast: WeatherData[]
  averageTemp: number
  tempRange: { min: number; max: number }
  predominantCondition: string
  maxWindSpeed: number
  averageHumidity: number
  weatherChanges: boolean
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY

// Debug log to verify API key is loaded
if (typeof window === 'undefined') {
  console.log('[Weather] API Key status:', WEATHER_API_KEY ? 'Loaded' : 'Missing')
}

// Helper function to convert zip code to city,state format using WeatherAPI's search
async function resolveZipCode(zipCode: string): Promise<string> {
  if (!WEATHER_API_KEY) {
    return zipCode
  }

  try {
    // Use WeatherAPI's search endpoint to resolve the zip code
    const searchUrl = `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${zipCode}`
    const response = await fetch(searchUrl)

    if (response.ok) {
      const results = await response.json()
      // Filter for US results only
      const usResults = results.filter((r: any) => r.country === 'United States of America' || r.country === 'USA')

      if (usResults.length > 0) {
        const result = usResults[0]
        // Return in format: "City, State"
        return `${result.name}, ${result.region}`
      }
    }

    // Fallback: return zipCode with US suffix
    return `${zipCode}, United States`
  } catch (_error) {
    return `${zipCode}, United States`
  }
}

export async function getWeatherData(location: string, _date?: string, _time?: string): Promise<WeatherData> {
  // For demo purposes, we'll use a free weather service or mock data
  // In production, you'd use a service like OpenWeatherMap, WeatherAPI, or similar

  if (!WEATHER_API_KEY) {
    // Return mock data if no API key is set
    return getMockWeatherData(location)
  }

  try {
    // Determine if we need current or forecast data
    const isCurrentWeather = !_date || _date === new Date().toISOString().split('T')[0]

    let apiUrl: string
    // For US zip codes, resolve to city name first
    let queryLocation = location
    if (/^\d{5}(-\d{4})?$/.test(location)) {
      queryLocation = await resolveZipCode(location)
    }

    if (isCurrentWeather) {
      // Current weather
      apiUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(queryLocation)}&aqi=no`
    } else {
      // Forecast weather (up to 3 days ahead for free tier)
      apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(queryLocation)}&days=3&aqi=no`
    }

    const response = await fetch(apiUrl)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Weather API error (${response.status}): ${errorText}`)
    }

    const data = await response.json()

    if (isCurrentWeather) {
      // Current weather data
      return {
        location: `${data.location.name}, ${data.location.region}`,
        temperature: Math.round(data.current.temp_f),
        condition: data.current.condition.text,
        windSpeed: Math.round(data.current.wind_mph),
        humidity: data.current.humidity,
        feelsLike: Math.round(data.current.feelslike_f),
        icon: data.current.condition.icon
      }
    } else {
      // Forecast data
      const targetDate = data.forecast.forecastday.find((day: any) => day.date === _date)
      if (!targetDate) {
        throw new Error('Forecast data not available for selected date')
      }

      // Find the closest hour or use day average
      let weatherData
      if (_time) {
        const targetHour = parseInt(_time.split(':')[0])
        const hourData = targetDate.hour.find((h: any) => {
          // WeatherAPI returns local time strings without timezone information (e.g. "2024-05-28 18:00").
          // Parsing with Date would convert to server timezone and shift the hour for locations in other timezones.
          const hourString = String(h.time).split(' ')[1] || ''
          const parsedHour = parseInt(hourString.split(':')[0], 10)
          return parsedHour === targetHour
        })
        if (hourData) {
          weatherData = {
            location: `${data.location.name}, ${data.location.region}`,
            temperature: Math.round(hourData.temp_f),
            condition: hourData.condition.text,
            windSpeed: Math.round(hourData.wind_mph),
            humidity: hourData.humidity,
            feelsLike: Math.round(hourData.feelslike_f),
            icon: hourData.condition.icon
          }
        }
      }

      // Fallback to day data
      if (!weatherData) {
        weatherData = {
          location: `${data.location.name}, ${data.location.region}`,
          temperature: Math.round(targetDate.day.avgtemp_f),
          condition: targetDate.day.condition.text,
          windSpeed: Math.round(targetDate.day.maxwind_mph),
          humidity: targetDate.day.avghumidity,
          feelsLike: Math.round(targetDate.day.avgtemp_f),
          icon: targetDate.day.condition.icon
        }
      }

      return weatherData
    }
  } catch (error) {
    // Log the error for debugging
    console.error('Weather API error:', error)
    // Fallback to mock data
    return getMockWeatherData(location)
  }
}

function getMockWeatherData(location: string): WeatherData {
  // Generate realistic mock data based on location and current season
  const mockConditions = [
    'Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'
  ]

  const temp = 70 + Math.random() * 20 // 70-90°F range
  const condition = mockConditions[Math.floor(Math.random() * mockConditions.length)]
  const windSpeed = Math.round(Math.random() * 15) + 3 // 3-18 mph
  const humidity = Math.round(Math.random() * 40) + 40 // 40-80%

  return {
    location: location,
    temperature: Math.round(temp),
    condition: condition,
    windSpeed: windSpeed,
    humidity: humidity,
    feelsLike: Math.round(temp + (Math.random() * 6 - 3)), // ±3 degrees
    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' // partly cloudy icon
  }
}

export function getGolfCourseWeather(courseName: string, city?: string): Promise<WeatherData> {
  const searchQuery = city ? `${courseName}, ${city}` : courseName
  return getWeatherData(searchQuery)
}

export async function getRoundWeatherData(location: string, date?: string, startTime?: string, roundDuration: number = 4.5): Promise<RoundWeatherData> {
  // Parse and validate start time - extract both hour and minute
  let startHour = 8
  let startMinute = 0
  if (startTime) {
    const timeParts = startTime.split(':')
    startHour = parseInt(timeParts[0])
    startMinute = parseInt(timeParts[1]) || 0

    // Validate and bound hour to valid golf range (5-19 = 5am-7pm)
    if (isNaN(startHour) || startHour < 0 || startHour > 23) {
      startHour = Math.max(5, Math.min(19, 8))
    }
  }

  // Calculate how many hours we need (round up to include partial hours)
  const hoursNeeded = Math.ceil(roundDuration)

  // Generate hourly forecasts for the round duration
  const hourlyForecast: WeatherData[] = []
  const temperatures: number[] = []
  const conditions: string[] = []
  const windSpeeds: number[] = []
  const humidities: number[] = []

  if (!WEATHER_API_KEY) {
    // Generate mock data with variations
    return generateMockRoundWeather(location, date, startTime, startHour, roundDuration)
  }

  try {
    // Determine if we need current or forecast data
    const isCurrentWeather = !date || date === new Date().toISOString().split('T')[0]

    // For US zip codes, resolve to city name first
    let queryLocation = location
    if (/^\d{5}(-\d{4})?$/.test(location)) {
      queryLocation = await resolveZipCode(location)
    }

    let apiUrl: string
    if (isCurrentWeather) {
      // For current weather, we still need forecast to get hourly data
      apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(queryLocation)}&days=1&aqi=no&alerts=no`
    } else {
      // Forecast weather (up to 3 days ahead for free tier) - request more days to handle midnight crossings
      apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(queryLocation)}&days=3&aqi=no&alerts=no`
    }

    const response = await fetch(apiUrl)
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Weather API error (${response.status}): ${errorText}`)
    }

    const data = await response.json()

    // Find the target date
    const targetDateString = date || new Date().toISOString().split('T')[0]
    const targetDate = data.forecast.forecastday.find((day: any) => day.date === targetDateString)

    // Get next day forecast in case round crosses midnight
    const tomorrowDate = new Date(targetDateString + 'T00:00:00')
    tomorrowDate.setDate(tomorrowDate.getDate() + 1)
    const tomorrowDateString = tomorrowDate.toISOString().split('T')[0]
    const tomorrowForecast = data.forecast.forecastday.find((day: any) => day.date === tomorrowDateString)

    if (!targetDate) {
      throw new Error('Forecast data not available for selected date')
    }

    // Extract hourly data for the round duration - handle midnight crossing
    for (let i = 0; i < hoursNeeded; i++) {
      const currentHour = (startHour + i) % 24
      const isNextDay = (startHour + i) >= 24
      const forecastDay = isNextDay && tomorrowForecast ? tomorrowForecast : targetDate

      // Find hourly data for this specific hour
      const hourData = forecastDay.hour.find((h: any) => {
        // WeatherAPI hour timestamps are local to the queried location. Using Date() would apply the server timezone
        // and shift late-evening hours into the wrong day (especially overnight), so parse the hour directly.
        const hourString = String(h.time).split(' ')[1] || ''
        const hourTime = parseInt(hourString.split(':')[0], 10)
        return hourTime === currentHour
      })

      if (hourData) {
        const weatherData: WeatherData = {
          location: `${data.location.name}, ${data.location.region}`,
          temperature: Math.round(hourData.temp_f),
          condition: hourData.condition.text,
          windSpeed: Math.round(hourData.wind_mph),
          humidity: hourData.humidity,
          feelsLike: Math.round(hourData.feelslike_f),
          icon: hourData.condition.icon
        }

        hourlyForecast.push(weatherData)
        temperatures.push(weatherData.temperature)
        conditions.push(weatherData.condition)
        windSpeeds.push(weatherData.windSpeed)
        humidities.push(weatherData.humidity)
      } else {
        // Fallback to day average with some variation
        const dayData = forecastDay.day
        const tempVariation = getHourlyTempVariation(i, dayData.avgtemp_f)

        const weatherData: WeatherData = {
          location: `${data.location.name}, ${data.location.region}`,
          temperature: Math.round(dayData.avgtemp_f + tempVariation),
          condition: dayData.condition.text,
          windSpeed: Math.round(dayData.maxwind_mph * (0.7 + Math.random() * 0.6)), // Vary wind
          humidity: Math.round(dayData.avghumidity + (Math.random() - 0.5) * 10),
          feelsLike: Math.round(dayData.avgtemp_f + tempVariation + getTimeOfDayFactor(currentHour)),
          icon: dayData.condition.icon
        }

        hourlyForecast.push(weatherData)
        temperatures.push(weatherData.temperature)
        conditions.push(weatherData.condition)
        windSpeeds.push(weatherData.windSpeed)
        humidities.push(weatherData.humidity)
      }
    }
  } catch (error) {
    // Log the error for debugging
    console.error('Weather API error:', error)
    // Fallback to mock data
    return generateMockRoundWeather(location, date, startTime, startHour, roundDuration)
  }

  // Calculate statistics
  const averageTemp = Math.round(temperatures.reduce((a, b) => a + b, 0) / temperatures.length)
  const tempRange = {
    min: Math.min(...temperatures),
    max: Math.max(...temperatures)
  }
  const maxWindSpeed = Math.max(...windSpeeds)
  const averageHumidity = Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length)

  // Determine predominant condition
  const conditionCounts = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const predominantCondition = Object.entries(conditionCounts)
    .sort(([,a], [,b]) => b - a)[0][0]

  // Check if weather changes significantly during round
  const tempChange = tempRange.max - tempRange.min
  const hasConditionChanges = new Set(conditions).size > 2
  const weatherChanges = tempChange > 8 || hasConditionChanges

  // Calculate end time and date (handle midnight crossing)
  const totalHours = startHour + Math.ceil(roundDuration)
  const endHour = totalHours % 24
  const dayOffset = Math.floor(totalHours / 24)

  // Calculate minutes with proper rounding to avoid floating point issues
  const minutesDecimal = (roundDuration % 1) * 60
  const endMinutes = Math.round(minutesDecimal)
  const endTime = `${endHour.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`

  // Calculate end date
  const roundDate = date || new Date().toISOString().split('T')[0]
  let endDate = roundDate
  if (dayOffset > 0) {
    const endDateObj = new Date(roundDate + 'T00:00:00')
    endDateObj.setDate(endDateObj.getDate() + dayOffset)
    endDate = endDateObj.toISOString().split('T')[0]
  }

  return {
    location: hourlyForecast[0]?.location || location,
    startTime: startTime || `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`,
    startDate: roundDate,
    endTime,
    endDate,
    duration: roundDuration,
    hourlyForecast,
    averageTemp,
    tempRange,
    predominantCondition,
    maxWindSpeed,
    averageHumidity,
    weatherChanges
  }
}

// Helper function to get time of day temperature factor
function getTimeOfDayFactor(hour: number): number {
  // Temperature typically peaks around 2-4 PM and is lowest around 6-8 AM
  if (hour >= 6 && hour <= 10) return -2 // Early morning cooler
  if (hour >= 11 && hour <= 13) return 1 // Late morning warming
  if (hour >= 14 && hour <= 16) return 3 // Peak afternoon heat
  if (hour >= 17 && hour <= 19) return 1 // Evening cooling
  return 0 // Night/other times
}

// Helper function to generate realistic hourly temperature variations
function getHourlyTempVariation(hourIndex: number, baseTemp: number): number {
  // Create realistic temperature progression over 4.5 hours
  const variations = [-1, 0, 2, 3, 2] // Typical warming then cooling pattern
  return variations[hourIndex] || 0
}

// Helper function to get weather icon based on condition
export function getWeatherIcon(condition: string): string {
  const lowerCondition = condition.toLowerCase()

  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return '☀️'
  if (lowerCondition.includes('partly cloudy')) return '⛅'
  if (lowerCondition.includes('cloudy') || lowerCondition.includes('overcast')) return '☁️'
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return '🌧️'
  if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) return '⛈️'
  if (lowerCondition.includes('snow')) return '🌨️'
  if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) return '🌫️'
  if (lowerCondition.includes('wind')) return '💨'

  return '🌤️' // Default partly sunny
}

// Helper function to format time to 12-hour AM/PM
export function formatTime12Hour(hour24: number): string {
  if (hour24 === 0) return '12:00 AM'
  if (hour24 === 12) return '12:00 PM'
  if (hour24 < 12) return `${hour24}:00 AM`
  return `${hour24 - 12}:00 PM`
}

// Generate realistic mock round weather data
function generateMockRoundWeather(location: string, date?: string, startTime?: string, startHour?: number, duration?: number): RoundWeatherData {
  const actualStartHour = startHour || 8
  const actualDuration = duration || 4.5

  // Base weather conditions
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Clear', 'Overcast']
  const baseCondition = conditions[Math.floor(Math.random() * conditions.length)]
  const baseTemp = 65 + Math.random() * 25 // 65-90°F range
  const baseWind = 3 + Math.random() * 12 // 3-15 mph
  const baseHumidity = 40 + Math.random() * 40 // 40-80%

  const hourlyForecast: WeatherData[] = []
  const temperatures: number[] = []
  const weatherConditions: string[] = []
  const windSpeeds: number[] = []
  const humidities: number[] = []

  // Generate hours of varied weather based on actual duration
  const hoursNeeded = Math.ceil(actualDuration)
  for (let i = 0; i < hoursNeeded; i++) {
    const currentHour = (actualStartHour + i) % 24

    // Realistic temperature progression
    const timeOfDayFactor = getTimeOfDayFactor(currentHour)
    const hourlyVariation = getHourlyTempVariation(i, baseTemp)
    const temperature = Math.round(baseTemp + timeOfDayFactor + hourlyVariation)

    // Vary conditions slightly - 70% chance to keep same, 30% chance to change
    const condition = i === 0 || Math.random() < 0.7 ? baseCondition : conditions[Math.floor(Math.random() * conditions.length)]

    // Vary wind and humidity
    const windSpeed = Math.max(0, Math.round(baseWind + (Math.random() - 0.5) * 5))
    const humidity = Math.max(20, Math.min(100, Math.round(baseHumidity + (Math.random() - 0.5) * 15)))

    const hourWeather: WeatherData = {
      location,
      temperature,
      condition,
      windSpeed,
      humidity,
      feelsLike: Math.round(temperature + (Math.random() - 0.5) * 4),
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' // Default icon
    }

    hourlyForecast.push(hourWeather)
    temperatures.push(temperature)
    weatherConditions.push(condition)
    windSpeeds.push(windSpeed)
    humidities.push(humidity)
  }

  // Calculate statistics
  const averageTemp = Math.round(temperatures.reduce((a, b) => a + b, 0) / temperatures.length)
  const tempRange = {
    min: Math.min(...temperatures),
    max: Math.max(...temperatures)
  }
  const maxWindSpeed = Math.max(...windSpeeds)
  const averageHumidity = Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length)

  // Determine predominant condition
  const conditionCounts = weatherConditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const predominantCondition = Object.entries(conditionCounts)
    .sort(([,a], [,b]) => b - a)[0][0]

  // Check for significant weather changes
  const tempChange = tempRange.max - tempRange.min
  const hasConditionChanges = new Set(weatherConditions).size > 2
  const weatherChanges = tempChange > 8 || hasConditionChanges

  // Calculate end time and date (handle midnight crossing)
  const totalHours = actualStartHour + Math.ceil(actualDuration)
  const endHour = totalHours % 24
  const dayOffset = Math.floor(totalHours / 24)
  const minutesDecimal = (actualDuration % 1) * 60
  const endMinutes = Math.round(minutesDecimal)
  const endTime = `${endHour.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`

  // Calculate dates
  const roundDate = date || new Date().toISOString().split('T')[0]
  let endDate = roundDate
  if (dayOffset > 0) {
    const endDateObj = new Date(roundDate + 'T00:00:00')
    endDateObj.setDate(endDateObj.getDate() + dayOffset)
    endDate = endDateObj.toISOString().split('T')[0]
  }

  return {
    location,
    startTime: startTime || `${actualStartHour.toString().padStart(2, '0')}:00`,
    startDate: roundDate,
    endTime,
    endDate,
    duration: actualDuration,
    hourlyForecast,
    averageTemp,
    tempRange,
    predominantCondition,
    maxWindSpeed,
    averageHumidity,
    weatherChanges
  }
}
