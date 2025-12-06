export interface Location {
  id: string
  display: string
  type: string
  searchQuery: string
}

// Popular locations including golf courses and cities
const POPULAR_LOCATIONS: Location[] = [
  {
    id: '1',
    display: 'Pebble Beach, CA',
    type: 'Golf destination',
    searchQuery: 'Pebble Beach, CA'
  },
  {
    id: '2',
    display: 'Augusta, GA',
    type: 'Golf destination',
    searchQuery: 'Augusta, GA'
  },
  {
    id: '3',
    display: 'Scottsdale, AZ',
    type: 'Golf destination',
    searchQuery: 'Scottsdale, AZ'
  },
  {
    id: '4',
    display: 'Myrtle Beach, SC',
    type: 'Golf destination',
    searchQuery: 'Myrtle Beach, SC'
  },
  {
    id: '5',
    display: 'Orlando, FL',
    type: 'Golf destination',
    searchQuery: 'Orlando, FL'
  },
  {
    id: '6',
    display: 'Oceanside, CA',
    type: 'Golf destination',
    searchQuery: 'Oceanside, CA'
  },
  {
    id: '7',
    display: 'New York, NY',
    type: 'City',
    searchQuery: 'New York, NY'
  },
  {
    id: '8',
    display: 'Los Angeles, CA',
    type: 'City',
    searchQuery: 'Los Angeles, CA'
  },
  {
    id: '9',
    display: 'San Diego, CA',
    type: 'City',
    searchQuery: 'San Diego, CA'
  },
  {
    id: '10',
    display: 'Chicago, IL',
    type: 'City',
    searchQuery: 'Chicago, IL'
  },
  {
    id: '11',
    display: 'Miami, FL',
    type: 'City',
    searchQuery: 'Miami, FL'
  },
  {
    id: '12',
    display: 'Las Vegas, NV',
    type: 'City',
    searchQuery: 'Las Vegas, NV'
  },
  {
    id: '13',
    display: 'Phoenix, AZ',
    type: 'City',
    searchQuery: 'Phoenix, AZ'
  },
  {
    id: '14',
    display: 'Denver, CO',
    type: 'City',
    searchQuery: 'Denver, CO'
  },
  {
    id: '15',
    display: 'Seattle, WA',
    type: 'City',
    searchQuery: 'Seattle, WA'
  }
]

export function searchLocations(query: string): Promise<Location[]> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      if (!query.trim()) {
        resolve([])
        return
      }

      const results: Location[] = []

      // Check if it's a zip code (5 digits or 5+4 format)
      const zipPattern = /^\d{5}(-\d{4})?$/
      if (zipPattern.test(query.trim())) {
        // For demonstration, we'll simulate a few common zip codes
        // In a real app, you'd call a geocoding API
        const zipToCity: { [key: string]: string } = {
          '10001': 'New York, NY',
          '90210': 'Beverly Hills, CA',
          '60601': 'Chicago, IL',
          '33101': 'Miami, FL',
          '89101': 'Las Vegas, NV',
          '30301': 'Atlanta, GA',
          '78701': 'Austin, TX',
          '02101': 'Boston, MA',
          '98101': 'Seattle, WA',
          '85001': 'Phoenix, AZ',
          '92054': 'Oceanside, CA'
        }

        const cityState = zipToCity[query.substring(0, 5)] || query

        results.push({
          id: `zip-${query}`,
          display: cityState,
          type: 'Zip code',
          searchQuery: query
        })
      } else {
        // Filter existing locations - prioritize by match quality
        const lowerQuery = query.toLowerCase()

        const exactMatches = POPULAR_LOCATIONS.filter(location =>
          location.display.toLowerCase().startsWith(lowerQuery)
        )

        const partialMatches = POPULAR_LOCATIONS.filter(location =>
          !location.display.toLowerCase().startsWith(lowerQuery) &&
          location.display.toLowerCase().includes(lowerQuery)
        )

        // Add matches in priority order
        results.push(...exactMatches)
        results.push(...partialMatches)

        // If no matches found, offer the user's input as a suggestion
        if (results.length === 0) {
          results.push({
            id: `user-${Date.now()}`,
            display: query,
            type: 'Location',
            searchQuery: query
          })
        }
      }

      resolve(results.slice(0, 6)) // Limit total results
    }, 150)
  })
}

export function getPopularLocations(): Location[] {
  return POPULAR_LOCATIONS.slice(0, 6)
}