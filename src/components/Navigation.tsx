'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-emerald-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <span className="text-3xl">⛳</span>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Dress My Round
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link href="/weather-tips" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium">
              Weather Tips
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium">
              Golf Attire Guide
            </Link>
            <Link href="/how-to-use" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium">
              How to Use
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors duration-200"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
          <div className="md:hidden border-t border-emerald-100 pb-4">
            <div className="flex flex-col space-y-1 pt-2">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/weather-tips"
                className="block px-4 py-3 text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Weather Tips
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-3 text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Golf Attire Guide
              </Link>
              <Link
                href="/how-to-use"
                className="block px-4 py-3 text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
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
