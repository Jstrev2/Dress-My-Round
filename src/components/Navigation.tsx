'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <span className="text-3xl">⛳</span>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Dress My Round
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/weather-tips" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Weather Tips
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Golf Attire Guide
            </Link>
            <Link href="/how-to-use" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              How to Use
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
          >
            <span className="sr-only">Open menu</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/weather-tips"
                className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Weather Tips
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Golf Attire Guide
              </Link>
              <Link
                href="/how-to-use"
                className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                How to Use
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
