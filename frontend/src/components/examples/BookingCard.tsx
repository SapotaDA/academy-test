import BookingCard from '../BookingCard';
import type { Booking } from '@/lib/mockData';

export default function BookingCardExample() {
  // todo: remove mock functionality
  const mockBooking: Booking = {
    id: '1',
    groundId: '1',
    groundName: 'Premier Cricket Arena',
    groundImage: 'hero',
    date: '2024-12-15',
    timeSlot: '06:00 PM - 08:00 PM',
    players: 11,
    customerName: 'John Doe',
    customerPhone: '+1 234 567 890',
    totalPrice: 5000,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  return (
    <BookingCard 
      booking={mockBooking} 
      onCancel={(id) => console.log('Cancel booking:', id)} 
    />
  );
}
