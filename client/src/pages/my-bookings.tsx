import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { CalendarPlus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingCard from '@/components/BookingCard';
import { getBookings, cancelBooking, type Booking } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { parseISO, isPast } from 'date-fns';

export default function MyBookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleCancel = (bookingId: string) => {
    cancelBooking(bookingId);
    setBookings(getBookings());
    toast({
      title: 'Booking Cancelled',
      description: 'Your booking has been cancelled successfully.',
    });
  };

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = parseISO(booking.date);
    switch (activeTab) {
      case 'upcoming':
        return !isPast(bookingDate) && booking.status === 'confirmed';
      case 'past':
        return isPast(bookingDate) || booking.status === 'completed';
      case 'cancelled':
        return booking.status === 'cancelled';
      default:
        return true;
    }
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl" data-testid="text-my-bookings-title">
              My Bookings
            </h1>
            <p className="mt-2 text-muted-foreground">
              View and manage your cricket ground reservations
            </p>
          </div>
          <Link href="/booking">
            <Button className="gap-2" data-testid="button-new-booking">
              <CalendarPlus className="h-4 w-4" />
              New Booking
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">
              All ({bookings.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past">
              Past
            </TabsTrigger>
            <TabsTrigger value="cancelled" data-testid="tab-cancelled">
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {sortedBookings.length > 0 ? (
              <div className="space-y-4">
                {sortedBookings.map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold" data-testid="text-empty-state">
                    No bookings found
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activeTab === 'all' 
                      ? "You haven't made any bookings yet."
                      : `No ${activeTab} bookings to show.`}
                  </p>
                </div>
                <Link href="/booking">
                  <Button className="gap-2" data-testid="button-empty-book">
                    <CalendarPlus className="h-4 w-4" />
                    Book a Ground
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
