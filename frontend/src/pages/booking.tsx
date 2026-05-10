import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { CalendarIcon, MapPin, Star, Users, Clock, Cloud, Droplets, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { bookingTypes, timeSlots, grounds, formatINR, type BookingType, type TimeSlot } from '@/lib/mockData';
import Footer from '@/components/Footer';

export default function BookingPage() {
  const [, setLocation] = useLocation();
  const [selectedBookingType, setSelectedBookingType] = useState<string>('25-overs');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [players, setPlayers] = useState<number>(11);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState<any[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const currentBookingType = bookingTypes.find(bt => bt.id === selectedBookingType);
  const totalPrice = currentBookingType?.price || 0;

  // Fetch availability data
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const response = await fetch(`/api/availability?year=${year}&month=${month}`);
        if (response.ok) {
          const data = await response.json();
          setAvailability(data);
        }
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      } finally {
        setLoadingAvailability(false);
      }
    };

    fetchAvailability();
  }, [currentMonth]);

  const handleBooking = async () => {
    if (!selectedDate || (selectedBookingType === '25-overs' && !selectedSlot) || !customerName || !customerPhone) {
      return;
    }

    setIsSubmitting(true);

    // Store booking details for payment page
    const bookingData = {
      date: selectedDate.toISOString().split('T')[0],
      customerName,
      customerPhone,
      bookingType: selectedBookingType,
      timeSlot: selectedSlot || null,
      players,
    };

    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));

    setIsSubmitting(false);
    setLocation('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Cricket Ground Booking</h1>
              <p className="text-gray-400 mt-1">Book premium cricket grounds in Mumbai</p>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ground Selector */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-400" />
                  Select Booking Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedBookingType} onValueChange={setSelectedBookingType}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {bookingTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id} className="text-white">
                        <div className="flex items-center justify-between w-full">
                          <span>{type.name}</span>
                          <span className="text-green-400 font-semibold">{formatINR(type.price)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300">{currentBookingType?.name}</p>
                      <p className="text-sm text-gray-400">{currentBookingType?.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">{formatINR(totalPrice)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-green-400" />
                    Select Date
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newMonth = new Date(currentMonth);
                        newMonth.setMonth(newMonth.getMonth() - 1);
                        setCurrentMonth(newMonth);
                      }}
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    >
                      ‹
                    </Button>
                    <span className="text-white font-semibold min-w-[120px] text-center">
                      {format(currentMonth, 'MMMM yyyy')}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newMonth = new Date(currentMonth);
                        newMonth.setMonth(newMonth.getMonth() + 1);
                        setCurrentMonth(newMonth);
                      }}
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    >
                      ›
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-300">Unavailable</span>
                    </div>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-gray-400">
                      {day}
                    </div>
                  ))}

                  {/* Empty cells for days before the first day of the month */}
                  {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }, (_, i) => (
                    <div key={`empty-${i}`} className="h-12"></div>
                  ))}

                  {/* Days of the month */}
                  {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() }, (_, i) => {
                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                    // Get availability from API data
                    const dateStr = date.toISOString().split('T')[0];
                    const dayAvailability = availability.find((a: any) => a.date === dateStr);
                    const status = dayAvailability?.status || 'available';
                    const availableSlots = dayAvailability?.availableSlots || 16;
                    const totalSlots = dayAvailability?.totalSlots || 16;
                    const isDisabled = isPast || status === 'booked' || status === 'unavailable';

                    return (
                      <Button
                        key={i}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        disabled={isDisabled || loadingAvailability}
                        className={`h-12 relative ${
                          isSelected
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : status === 'available' && !isPast
                              ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                              : status === 'booked' || isPast
                                ? 'bg-red-900/50 border-red-700 text-red-300 cursor-not-allowed'
                                : 'bg-gray-900/50 border-gray-700 text-gray-500 cursor-not-allowed'
                        } ${isToday ? 'ring-2 ring-green-400' : ''}`}
                        onClick={() => !isDisabled && !loadingAvailability && setSelectedDate(date)}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold">{format(date, 'd')}</div>
                        </div>
                        {status === 'booked' && !isPast && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        )}
                        {status === 'unavailable' && !isPast && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-500 rounded-full"></div>
                        )}
                        {status === 'available' && availableSlots < totalSlots && !isPast && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full" title={`${availableSlots} slots available`}></div>
                        )}
                        {status === 'available' && availableSlots === totalSlots && !isPast && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" title="All slots available"></div>
                        )}
                      </Button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                    <div className="flex items-center gap-2 text-green-400">
                      <Cloud className="h-4 w-4" />
                      <span className="text-sm">Weather: 28°C, 20% rain chance</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Time Slot Selection - Only show for 25 Overs booking */}
            {selectedBookingType === '25-overs' && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-400" />
                    Select Time Slot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-300">
                        Choose your preferred start time for the 4-hour session (7 AM - 10 PM)
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium text-gray-300">Start Time:</label>
                          <select
                            value={selectedSlot || ''}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="">Select time</option>
                            {Array.from({ length: 16 }, (_, i) => {
                              const hour = 7 + i;
                              const isPM = hour >= 12;
                              const displayHour = hour > 12 ? hour - 12 : hour;
                              const timeString = `${displayHour} ${isPM ? 'PM' : 'AM'}`;
                              return (
                                <option key={i + 1} value={(i + 1).toString()}>
                                  {timeString}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {selectedSlot && (
                          <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
                            <p className="text-green-400 text-sm">
                              Session: {(() => {
                                const startHour = 7 + parseInt(selectedSlot) - 1;
                                const startIsPM = startHour >= 12;
                                const startDisplayHour = startHour > 12 ? startHour - 12 : startHour === 0 ? 12 : startHour;
                                const startTime = `${startDisplayHour} ${startIsPM ? 'PM' : 'AM'}`;
                                const endHour = (startHour + 4) % 24;
                                const endIsPM = endHour >= 12;
                                const endDisplayHour = endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour;
                                const endTime = `${endDisplayHour} ${endIsPM ? 'PM' : 'AM'}`;
                                return `${startTime} - ${endTime}`;
                              })()}
                            </p>
                            <p className="text-gray-300 text-xs mt-1">
                              4-hour cricket session with professional facilities
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                </CardContent>
              </Card>
            )}

            {/* Full Day Booking Info */}
            {selectedBookingType === 'full-day' && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-400" />
                    Full Day Booking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-green-400 text-6xl mb-4">🏏</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Full Day Access</h3>
                    <p className="text-gray-300 mb-4">
                      Enjoy unlimited access to the cricket ground from 7 AM to 11 PM
                    </p>
                    <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                      <p className="text-green-400 font-medium">No time slot selection required</p>
                      <p className="text-sm text-gray-300 mt-1">Book the entire day for your convenience</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Player Details */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  Player Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Players
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPlayers(Math.max(2, players - 1))}
                      disabled={players <= 2}
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    >
                      -
                    </Button>
                    <span className="w-12 text-center text-xl font-semibold text-white">
                      {players}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPlayers(Math.min(22, players + 1))}
                      disabled={players >= 22}
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Booking Type</span>
                    <span className="text-white">{currentBookingType?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white">
                      {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Time Slot</span>
                    <span className="text-white">
                      {selectedBookingType === 'full-day'
                        ? 'Full Day (7 AM - 11 PM)'
                        : selectedSlot
                          ? timeSlots.find(s => s.id === selectedSlot)?.time
                          : 'Not selected'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Players</span>
                    <span className="text-white">{players}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Customer</span>
                    <span className="text-white">{customerName || 'Not provided'}</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Booking Fee</span>
                    <span className="text-white">₹1000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Taxes (18%)</span>
                    <span className="text-white">₹180</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">Advance Payment</span>
                    <span className="text-green-400 text-xl">₹1180</span>
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    Full payment of {formatINR(totalPrice)} will be collected on-site
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  size="lg"
                  disabled={!selectedDate || !selectedSlot || !customerName || !customerPhone || isSubmitting}
                  onClick={handleBooking}
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                </Button>

                <div className="text-xs text-gray-400 text-center">
                  By proceeding, you agree to our terms and conditions
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


    </div>
  );
}
