import React, { useMemo, useState } from 'react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns'

type BookingCalendarProps = {
  year?: number
  month?: number // 0-indexed (0 = Jan)
  availableDates?: string[] // ISO strings
  partialDates?: string[]
  fullDates?: string[]
  selectedDate?: string
  onSelectDate?: (isoDate: string) => void
}

const ORANGE = '#C2701B'
const LIGHT_GREEN = '#E9FFF0'

function toISO(d: Date) {
  return format(d, 'yyyy-MM-dd')
}

export default function BookingCalendar({
  year,
  month,
  availableDates = [],
  partialDates = [],
  fullDates = [],
  selectedDate,
  onSelectDate,
}: BookingCalendarProps) {
  const today = new Date()
  const displayDate = useMemo(() => {
    if (typeof year === 'number' && typeof month === 'number') return new Date(year, month, 1)
    return new Date(today.getFullYear(), today.getMonth(), 1)
  }, [year, month])

  const monthStart = startOfMonth(displayDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const days: Date[] = []
  let curr = startDate
  while (curr <= endDate) {
    days.push(curr)
    curr = addDays(curr, 1)
  }

  const availableSet = useMemo(() => new Set(availableDates.map(d => d.slice(0,10))), [availableDates])
  const partialSet = useMemo(() => new Set(partialDates.map(d => d.slice(0,10))), [partialDates])
  const fullSet = useMemo(() => new Set(fullDates.map(d => d.slice(0,10))), [fullDates])

  const [openDate, setOpenDate] = useState<string | null>(selectedDate ?? null)

  const handleClick = (d: Date) => {
    const iso = toISO(d)
    setOpenDate(iso)
    onSelectDate?.(iso)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-semibold" style={{ color: ORANGE }}>{format(monthStart, 'MMMM yyyy')}</h2>
        <p className="text-sm text-muted-foreground mt-2">Tap/click a date to view booking details. Book from the popup for available days.</p>
      </div>

      <div className="mt-6 rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 text-sm font-medium" style={{ background: ORANGE }}>
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <div key={d} className="py-3 text-center text-white">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((d, i) => {
            const iso = toISO(d)
            const isCurrentMonth = isSameMonth(d, monthStart)
            const isAvailable = availableSet.has(iso)
            const isPartial = partialSet.has(iso)
            const isFull = fullSet.has(iso)
            const isSelected = selectedDate ? selectedDate.slice(0,10) === iso : openDate === iso

            const nonMonthClasses = !isCurrentMonth ? 'bg-gray-100 text-gray-400' : ''

            return (
              <div key={i} className="relative bg-white">
                <button
                  onClick={() => handleClick(d)}
                  className={`w-full h-full text-left p-3 flex flex-col justify-between hover:shadow-sm transition transform ${nonMonthClasses} ${isAvailable ? 'hover:scale-[1.02] cursor-pointer' : ''}`}
                  aria-pressed={isSelected}
                  style={isSelected ? { border: `2px solid ${ORANGE}`, borderRadius: 8 } : { borderRadius: 8 }}
                >
                  <div className="flex items-start justify-between">
                    <div className={`text-sm font-medium ${!isCurrentMonth ? 'text-gray-400' : ''}`}>{format(d, 'd')}</div>
                    <div className="text-xs text-muted-foreground">{format(d, 'EEE')}</div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center">
                      {isFull && <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">All booked</span>}
                      {isPartial && <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Some slots</span>}
                      {isAvailable && <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Available</span>}
                    </div>
                  </div>
                </button>

                {openDate === iso && (
                  <div className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-3 w-80 bg-white rounded-lg shadow-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm text-muted-foreground">{format(d, 'EEEE, MMM d, yyyy')}</div>
                        <div className="mt-2 font-semibold">{isFull ? 'No availability' : isPartial ? 'Limited slots' : isAvailable ? 'Available to book' : 'No slots listed'}</div>
                      </div>
                      <div>
                        <button onClick={() => setOpenDate(null)} className="text-sm text-muted-foreground">Close</button>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => {
                          if (!isFull) {
                            onSelectDate?.(iso)
                            setOpenDate(null)
                          }
                        }}
                        className={`px-4 py-2 rounded-md text-white font-medium ${isFull ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#C2701B]'}`}
                        disabled={isFull}
                      >
                        {isFull ? 'Fully booked' : 'Book this date'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500" />
          <span>All grounds booked</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-yellow-400" />
          <span>Some slots booked</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-green-200" />
          <span>All grounds free</span>
        </div>
      </div>
    </div>
  )
}
