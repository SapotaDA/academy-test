// todo: remove mock functionality - replace with real API data

export interface Ground {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  capacity: number;
  amenities: string[];
  featured?: boolean;
  popular?: boolean;
}

export interface BookingType {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
  available: boolean;
  price: number;
}

export interface Booking {
  id: string;
  groundId: string;
  groundName: string;
  groundImage: string;
  date: string;
  bookingType: string;
  timeSlot: string;
  players: number;
  customerName: string;
  customerPhone: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
}

export const grounds: Ground[] = [
  {
    id: '1',
    name: 'Premier Cricket Arena',
    location: 'Nehru Stadium, Mumbai',
    image: 'hero',
    rating: 4.9,
    reviewCount: 128,
    pricePerHour: 7000,
    capacity: 22,
    amenities: ['Floodlights', 'Parking', 'Changing Rooms', 'Cafe', 'Scoreboard'],
    featured: true,
  },
  {
    id: '2',
    name: 'Nightfall Cricket Ground',
    location: 'Sports Complex, Andheri',
    image: 'night',
    rating: 4.7,
    reviewCount: 95,
    pricePerHour: 2000,
    capacity: 22,
    amenities: ['Floodlights', 'Parking', 'Changing Rooms'],
    popular: true,
  },
  {
    id: '3',
    name: 'Green Valley Cricket Club',
    location: 'Powai, Mumbai',
    image: 'premium',
    rating: 4.8,
    reviewCount: 156,
    pricePerHour: 15000,
    capacity: 22,
    amenities: ['Floodlights', 'Parking', 'Changing Rooms', 'Cafe', 'Scoreboard', 'VIP Lounge'],
    featured: true,
  },
  {
    id: '4',
    name: 'Indoor Cricket Nets',
    location: 'BKC Sports Hub, Mumbai',
    image: 'indoor',
    rating: 4.5,
    reviewCount: 72,
    pricePerHour: 1000,
    capacity: 12,
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental'],
  },
  {
    id: '5',
    name: 'Community Sports Ground',
    location: 'Juhu, Mumbai',
    image: 'community',
    rating: 4.4,
    reviewCount: 48,
    pricePerHour: 800,
    capacity: 22,
    amenities: ['Parking', 'Basic Facilities'],
  },
  {
    id: '6',
    name: 'Elite Cricket Stadium',
    location: 'Wankhede Complex, Mumbai',
    image: 'luxury',
    rating: 5.0,
    reviewCount: 203,
    pricePerHour: 5000,
    capacity: 22,
    amenities: ['Floodlights', 'Parking', 'Changing Rooms', 'Cafe', 'Scoreboard', 'VIP Lounge', 'Media Box'],
    featured: true,
    popular: true,
  },
];

export const bookingTypes: BookingType[] = [
  {
    id: '25-overs',
    name: '25 Overs (Each Side)',
    price: 7000,
    duration: '4 hours',
  },
  {
    id: 'full-day',
    name: 'Full Day Booking',
    price: 15000,
    duration: '12 hours',
  },
];

export const timeSlots: TimeSlot[] = [
  { id: '1', time: '7 AM - 11 AM', period: 'morning', available: true, price: 7000 },
  { id: '2', time: '12 PM - 4 PM', period: 'afternoon', available: true, price: 7000 },
  { id: '3', time: '4 PM - 8 PM', period: 'evening', available: false, price: 7000 },
  { id: '4', time: '8 PM - 11 PM', period: 'night', available: true, price: 7000 },
];

export const pricingTiers = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Perfect for casual weekend matches',
    pricePerHour: 800,
    features: [
      'Basic ground access',
      'Changing rooms',
      'Free parking',
      'Basic equipment',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Ideal for competitive matches',
    pricePerHour: 2000,
    features: [
      'Premium turf pitch',
      'Floodlight access',
      'Changing rooms with showers',
      'Umpire arrangements',
      'Scoreboard access',
      'Refreshments included',
    ],
    popular: true,
  },
  {
    id: 'tournament',
    name: 'Tournament',
    description: 'Complete tournament experience',
    pricePerHour: 5000,
    features: [
      'Stadium-grade pitch',
      'Professional floodlights',
      'VIP changing rooms',
      'Professional umpires',
      'Live scoring system',
      'Media facilities',
      'Catering services',
      'Trophy ceremony setup',
    ],
  },
];

// Format price in Indian Rupee format (e.g., ₹2,500)
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper function to get bookings from localStorage
export function getBookings(): Booking[] {
  const stored = localStorage.getItem('cricketBookings');
  return stored ? JSON.parse(stored) : [];
}

// Helper function to save booking to localStorage
export function saveBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem('cricketBookings', JSON.stringify(bookings));
  return newBooking;
}

// Helper function to cancel booking
export function cancelBooking(bookingId: string): void {
  const bookings = getBookings();
  const updated = bookings.map(b =>
    b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
  );
  localStorage.setItem('cricketBookings', JSON.stringify(updated));
}

// Helper function to delete booking completely
export function deleteBooking(bookingId: string): void {
  const bookings = getBookings();
  const updated = bookings.filter(b => b.id !== bookingId);
  localStorage.setItem('cricketBookings', JSON.stringify(updated));
}
