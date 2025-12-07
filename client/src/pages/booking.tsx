import { useLocation } from 'wouter';
import BookingForm from '@/components/BookingForm';

export default function BookingPage() {
  const [, setLocation] = useLocation();
  
  const urlParams = new URLSearchParams(window.location.search);
  const initialGroundId = urlParams.get('ground') || undefined;

  const handleSuccess = () => {
    setLocation('/my-bookings');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl" data-testid="text-booking-title">
            Book a Cricket Ground
          </h1>
          <p className="mt-2 text-muted-foreground">
            Select your preferred ground, date, and time slot
          </p>
        </div>
        
        <BookingForm initialGroundId={initialGroundId} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
