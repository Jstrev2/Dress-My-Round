# Dress My Round 🏌️‍♂️

A golf-specific weather and clothing recommendation app, similar to dressmyrun.com but tailored for golfers. Get personalized outfit recommendations based on current weather conditions at your golf course.

## Features

- **Weather Integration**: Real-time weather data for golf courses and cities
- **Golf Course Search**: Searchable database of popular golf courses
- **Smart Recommendations**: Clothing suggestions based on temperature, wind, humidity, and weather conditions
- **Golf-Specific Tips**: Course condition insights and playing advice
- **Responsive Design**: Works seamlessly on desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18+ (tested with v18.13.0+)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd dress-my-round
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your weather API key (optional - app works with mock data):
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_from_weatherapi.com
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. **Enter Location**: Search for a golf course, city, or zip code
2. **Get Weather**: The app fetches current weather conditions
3. **View Recommendations**: Receive clothing suggestions optimized for golf
4. **Golf Tips**: Get course-specific playing advice based on conditions

## Weather API

The app uses [WeatherAPI.com](https://www.weatherapi.com/) for real-time weather data. You can:
- Use the app without an API key (mock data will be shown)
- Sign up for a free API key to get real weather data
- Free tier includes 1,000,000 calls per month

## Golf Course Database

The app includes a curated list of popular golf courses. In a production environment, this could be expanded with:
- Golf course APIs
- User-submitted courses
- Geographic search capabilities

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Weather**: WeatherAPI.com integration
- **Deployment**: Vercel-ready

## Contributing

This is a demo project created as a golf-focused alternative to dressmyrun.com. Feel free to:
- Add more golf courses to the database
- Improve the recommendation algorithm
- Add new features like UV index warnings or rain alerts
- Enhance the UI/UX

## License

MIT License - feel free to use this code for your own projects!
