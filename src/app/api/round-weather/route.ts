import { getRoundWeatherData, validateCityOrAreaCode } from '@/lib/weather'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { location, date, startTime } = await request.json()

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      )
    }

    let validatedLocation: string

    try {
      validatedLocation = validateCityOrAreaCode(location)
    } catch (validationError: any) {
      return NextResponse.json(
        { error: validationError?.message || 'Only city names or area codes are allowed.' },
        { status: 400 }
      )
    }

    const weatherData = await getRoundWeatherData(validatedLocation, date, startTime)
    return NextResponse.json(weatherData)
  } catch (error) {
    console.error('Error fetching round weather data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
