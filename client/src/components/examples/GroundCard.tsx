import GroundCard from '../GroundCard';
import type { Ground } from '@/lib/mockData';

export default function GroundCardExample() {
  // todo: remove mock functionality
  const mockGround: Ground = {
    id: '1',
    name: 'Premier Cricket Arena',
    location: 'Central Stadium, Downtown',
    image: 'hero',
    rating: 4.9,
    reviewCount: 128,
    pricePerHour: 2500,
    capacity: 22,
    amenities: ['Floodlights', 'Parking', 'Changing Rooms', 'Cafe'],
    featured: true,
  };

  return <GroundCard ground={mockGround} />;
}
