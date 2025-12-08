import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import BookingForm from '@/components/BookingForm';
import BookingCalendar from '@/components/BookingCalendar';
import { grounds } from '@/lib/mockData';

export default function BookingPage() {
  const [, setLocation] = useLocation();
  const [availability, setAvailability] = useState<{ availableDates:string[]; partialDates:string[]; fullDates:string[] }>({ availableDates: [], partialDates: [], fullDates: [] });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedGroundId, setSelectedGroundId] = useState<string | null>(grounds[0]?.id ?? null);

  const urlParams = new URLSearchParams(window.location.search);
  const initialGroundId = urlParams.get('ground') || undefined;

  const handleSuccess = () => {
    setLocation('/my-bookings');
  };

  useEffect(() => {
    const fetchAvailability = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const gid = selectedGroundId ? `&groundId=${encodeURIComponent(selectedGroundId)}` : '';
      fetch(`/api/bookings/availability?year=${year}&month=${month}${gid}`)
        .then(r => r.json())
        .then((json) => setAvailability(json))
        .catch(() => {});
    }

    fetchAvailability();
  }, [selectedGroundId]);

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

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4">
            <label className="text-sm font-medium">Select Ground</label>
            <select
              value={selectedGroundId ?? ''}
              onChange={(e) => setSelectedGroundId(e.target.value || null)}
              className="w-full rounded-md border px-3 py-2"
            >
              {grounds.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>

            <div className="mt-4">
              <h3 className="text-sm font-semibold">Available Dates</h3>
              <p className="text-sm text-muted-foreground">Next available dates for the selected ground</p>
              <ul className="mt-2 space-y-1 text-sm">
                {availability.availableDates.slice(0,8).map(d => (
                  <li key={d} className="px-2 py-1 bg-green-50 rounded">{d}</li>
                ))}
                {availability.availableDates.length === 0 && <li className="text-muted-foreground">No available dates this month</li>}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <BookingCalendar
              year={new Date().getFullYear()}
              month={new Date().getMonth()}
              availableDates={availability.availableDates}
              partialDates={availability.partialDates}
              fullDates={availability.fullDates}
              onSelectDate={(iso) => setSelectedDate(iso)}
              selectedDate={selectedDate ?? undefined}
            />
          </div>

          <div>
            <BookingForm initialGroundId={initialGroundId} onSuccess={handleSuccess} selectedDateISO={selectedDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
