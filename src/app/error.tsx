'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error for monitoring/debugging
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg border border-white/20 p-8 max-w-md w-full text-center">
        <div className="mb-4">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            We encountered an unexpected error. Our team has been notified.
          </p>
        </div>

        {error.message && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-mono break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
          >
            Try again
          </button>
          <a
            href="/"
            className="block w-full bg-gray-200 text-gray-900 py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
          >
            Go back home
          </a>
        </div>

        {error.digest && (
          <p className="text-xs text-gray-500 mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
