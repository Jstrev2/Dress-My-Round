import assert from 'node:assert/strict'
import { test } from 'node:test'

// Ensure the Weather API key is present before importing the module so the resolver executes
process.env.WEATHER_API_KEY = 'test-key'

test('rejects county-based inputs', async () => {
  const { validateCityOrAreaCode } = await import('../lib/weather')

  assert.throws(
    () => validateCityOrAreaCode('DuPage County'),
    /Counties are not supported/i
  )
})

test('resolves area codes through WeatherAPI search', async () => {
  const mockResults = [
    {
      name: 'Naperville',
      region: 'Illinois',
      country: 'United States of America',
      country_code: 'US'
    }
  ]

  const fetcher = async () =>
    new Response(JSON.stringify(mockResults), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  const { resolveQueryLocation } = await import('../lib/weather')
  const resolved = await resolveQueryLocation('60540', fetcher as typeof fetch)

  assert.equal(resolved, 'Naperville, Illinois, US')
})
