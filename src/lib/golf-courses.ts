export interface GolfCourse {
  id: string
  name: string
  city: string
  state: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// Sample golf courses data - in a real app, this would come from an API
const SAMPLE_GOLF_COURSES: GolfCourse[] = [
  {
    id: '1',
    name: 'Pebble Beach Golf Links',
    city: 'Pebble Beach',
    state: 'CA',
    country: 'USA',
    coordinates: { lat: 36.5691, lng: -121.9499 }
  },
  {
    id: '2',
    name: 'Augusta National Golf Club',
    city: 'Augusta',
    state: 'GA',
    country: 'USA',
    coordinates: { lat: 33.5030, lng: -82.0197 }
  },
  {
    id: '3',
    name: 'St. Andrews Links',
    city: 'St. Andrews',
    state: 'Scotland',
    country: 'UK',
    coordinates: { lat: 56.3394, lng: -2.8066 }
  },
  {
    id: '4',
    name: 'Torrey Pines Golf Course',
    city: 'La Jolla',
    state: 'CA',
    country: 'USA',
    coordinates: { lat: 32.8811, lng: -117.2563 }
  },
  {
    id: '5',
    name: 'TPC Sawgrass',
    city: 'Ponte Vedra Beach',
    state: 'FL',
    country: 'USA',
    coordinates: { lat: 30.1956, lng: -81.3924 }
  },
  {
    id: '6',
    name: 'Whistling Straits',
    city: 'Kohler',
    state: 'WI',
    country: 'USA',
    coordinates: { lat: 43.6531, lng: -87.7348 }
  },
  {
    id: '7',
    name: 'Pinehurst No. 2',
    city: 'Pinehurst',
    state: 'NC',
    country: 'USA',
    coordinates: { lat: 35.1951, lng: -79.4682 }
  },
  {
    id: '8',
    name: 'Bethpage Black',
    city: 'Farmingdale',
    state: 'NY',
    country: 'USA',
    coordinates: { lat: 40.7484, lng: -73.4579 }
  },
  {
    id: '9',
    name: 'Bandon Dunes Golf Resort',
    city: 'Bandon',
    state: 'OR',
    country: 'USA',
    coordinates: { lat: 43.1565, lng: -124.3729 }
  },
  {
    id: '10',
    name: 'Kiawah Island Golf Resort',
    city: 'Kiawah Island',
    state: 'SC',
    country: 'USA',
    coordinates: { lat: 32.6221, lng: -80.0851 }
  }
]

export function searchGolfCourses(query: string): Promise<GolfCourse[]> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      if (!query.trim()) {
        resolve([])
        return
      }

      const filtered = SAMPLE_GOLF_COURSES.filter(course =>
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.city.toLowerCase().includes(query.toLowerCase()) ||
        course.state.toLowerCase().includes(query.toLowerCase())
      )

      resolve(filtered)
    }, 300)
  })
}

export function getPopularGolfCourses(): GolfCourse[] {
  return SAMPLE_GOLF_COURSES.slice(0, 5)
}

export function formatCourseLocation(course: GolfCourse): string {
  return `${course.name}, ${course.city}, ${course.state}`
}