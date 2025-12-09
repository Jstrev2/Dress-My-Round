import assert from 'node:assert/strict'
import { test } from 'node:test'

// Ensure the Weather API key is present before importing the module so the resolver executes
process.env.WEATHER_API_KEY = 'test-key'

test('prefers US county results when multiple countries share the name', async () => {
  const mockResults = [
    {
      name: 'County Bridge',
      region: 'Laois',
      country: 'Ireland',
      country_code: 'IE'
    },
    {
      name: 'DuPage County',
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
  const resolved = await resolveQueryLocation('DuPage County', fetcher as typeof fetch)

  assert.equal(resolved, 'DuPage County, Illinois, US')
})
