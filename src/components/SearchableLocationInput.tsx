'use client'
import { useState, useEffect, useRef } from 'react'
import { searchLocations, Location } from '@/lib/locations'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchableLocationInput({ value, onChange, placeholder, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Location[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value.trim().length < 2) {
      setSuggestions([])
      setLoading(false)
      return
    }

    setLoading(true)
    let isCurrent = true
    const timer = setTimeout(() => {
      searchLocations(value)
        .then((results) => {
          if (!isCurrent) return
          setSuggestions(results)
        })
        .catch((error) => {
          console.error('Error searching locations:', error)
        })
        .finally(() => {
          if (isCurrent) {
            setLoading(false)
          }
        })
    }, 250)

    return () => {
      isCurrent = false
      clearTimeout(timer)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        inputRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (location: Location) => {
    onChange(location.display)
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return

    const availableSuggestions = suggestions

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < availableSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < availableSuggestions.length) {
          handleSuggestionClick(availableSuggestions[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Search for golf course or location"
      />

      {isOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-64 overflow-auto"
        >
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Searching locations...
            </div>
          )}

          {!loading && suggestions.length === 0 && value.trim() && (
            <div className="px-4 py-3 text-sm text-gray-500">
              No locations found. Try a different search.
            </div>
          )}

          {!loading && suggestions.length === 0 && !value.trim() && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Start typing to search for locations...
            </div>
          )}

          {!loading && suggestions.length > 0 && value.trim() && (
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Locations
              </div>
              {suggestions.map((location, index) => (
                <button
                  key={location.id}
                  role="option"
                  aria-selected={selectedIndex === index}
                  className={`w-full text-left px-4 py-3 rounded-md focus:outline-none transition-colors duration-150 ${
                    selectedIndex === index ? 'bg-emerald-100 border-l-4 border-emerald-500' : 'hover:bg-gray-50 focus:bg-gray-50'
                  }`}
                  onClick={() => handleSuggestionClick(location)}
                >
                  <div className="font-semibold text-gray-900">{location.display}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{location.type}</div>
                </button>
              ))}
            </div>
          )}


          {suggestions.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
              <div className="text-xs text-gray-600 leading-relaxed">
                <span className="font-semibold">💡 Tip:</span> Search by city, zip code, or address. Use arrow keys to navigate results.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
