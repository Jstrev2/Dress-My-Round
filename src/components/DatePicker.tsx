'use client'
import { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  minDate: string
  maxDate: string
}

export default function DatePicker({ value, onChange, minDate, maxDate }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const pickerRef = useRef<HTMLDivElement>(null)

  // Parse dates - use local date parsing to avoid timezone issues
  // Parse YYYY-MM-DD format strings as local dates, not UTC
  const parseLocalDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const minDateObj = parseLocalDate(minDate)
  const maxDateObj = parseLocalDate(maxDate)
  const selectedDate = value ? parseLocalDate(value) : null

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (date: Date): boolean => {
    // Compare using local dates, not ISO strings which can be offset by timezone
    // Reset time to midnight for fair comparison
    const dateAtMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const minAtMidnight = new Date(minDateObj.getFullYear(), minDateObj.getMonth(), minDateObj.getDate())
    const maxAtMidnight = new Date(maxDateObj.getFullYear(), maxDateObj.getMonth(), maxDateObj.getDate())
    return dateAtMidnight < minAtMidnight || dateAtMidnight > maxAtMidnight
  }

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      // Format as YYYY-MM-DD in local time, not UTC
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`
      onChange(dateStr)
      setIsOpen(false)
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days: (number | null)[] = []

  // Add empty slots for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 focus:border-emerald-500 transition-all duration-200 flex items-center justify-between"
      >
        <span>{formatDisplayDate(value) || 'Select date'}</span>
        <Calendar className="w-4 h-4 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm font-semibold text-gray-900">{monthName}</span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />
              }

              const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
              const disabled = isDateDisabled(dateObj)
              const selected = isDateSelected(dateObj)

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateClick(dateObj)}
                  disabled={disabled}
                  className={`
                    aspect-square rounded text-sm font-medium transition-all
                    ${
                      selected
                        ? 'bg-emerald-500 text-white border border-emerald-600'
                        : disabled
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                          : 'text-gray-900 bg-white border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300'
                    }
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
