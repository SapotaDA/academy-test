import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import BookingForm from '@/components/BookingForm';
import BookingCalendar from '@/components/BookingCalendar';

export default function BookingPage() {
  const [, setLocation] = useLocation();
  const [availability, setAvailability] = useState<{ availableDates:string[]; partialDates:string[]; fullDates:string[] }>({ availableDates: [], partialDates: [], fullDates: [] });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const initialGroundId = urlParams.get('ground') || undefined;

  const handleSuccess = () => {
    setLocation('/my-bookings');
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    fetch(`/api/bookings/availability?year=${year}&month=${month}`)
      .then(r => r.json())
      .then((json) => setAvailability(json))
      .catch(() => {});
  }, []);

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

        <div className="grid gap-6 lg:grid-cols-2">
          <BookingCalendar
            year={new Date().getFullYear()}
            month={new Date().getMonth()}
            availableDates={availability.availableDates}
            partialDates={availability.partialDates}
            fullDates={availability.fullDates}
            onSelectDate={(iso) => setSelectedDate(iso)}
            selectedDate={selectedDate ?? undefined}
          />

          <BookingForm initialGroundId={initialGroundId} onSuccess={handleSuccess} selectedDateISO={selectedDate} />
        </div>
      </div>
    </div>
  );
}
