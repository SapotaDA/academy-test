import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  bookingType: string;
  date: string;
  timeSlot: string | null;
  players: number;
  status: string;
  createdAt: string;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          toast({
            title: "Error",
            description: "Failed to load bookings",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load bookings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        toast({
          title: "Success",
          description: "Booking cancelled successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to cancel booking",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn className="mb-8">
        <h1 className="text-3xl font-bold text-center">My Bookings</h1>
        <p className="text-muted-foreground text-center mt-2">
          Manage your cricket ground bookings
        </p>
      </FadeIn>

      {loading ? (
        <FadeIn>
          <Card className="text-center py-12">
            <CardContent>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your bookings...</p>
            </CardContent>
          </Card>
        </FadeIn>
      ) : bookings.length === 0 ? (
        <FadeIn>
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't made any bookings yet. Start by booking a cricket ground!
              </p>
              <Button>Book Your First Ground</Button>
            </CardContent>
          </Card>
        </FadeIn>
      ) : (
        <StaggerContainer className="space-y-6">
          {bookings.map((booking) => {
            // Derive display values from booking data
            const groundName = booking.bookingType === 'full-day' ? 'Full Day Cricket Ground' : '25 Overs Cricket Ground';
            const location = 'Sidh Cricket Academy, Gurgaon';
            const timeSlot = booking.timeSlot 
              ? `${(7 + parseInt(booking.timeSlot) - 1).toString().padStart(2, '0')}:00 - ${(7 + parseInt(booking.timeSlot) + 3).toString().padStart(2, '0')}:00` 
              : 'Full Day (07:00 AM - 11:00 PM)';
            const price = booking.bookingType === 'full-day' ? booking.players * 150 : booking.players * 50;

            return (
              <StaggerItem key={booking.id}>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{groundName}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{location}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{booking.players} players</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-primary">
                          ₹{price.toLocaleString()}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {booking.status === 'confirmed' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-destructive" />
                                    Cancel Booking
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this booking? This action cannot be undone and you will lose your booking permanently.
                                    <br /><br />
                                    <strong>Booking Details:</strong><br />
                                    {groundName} on {new Date(booking.date).toLocaleDateString()} at {timeSlot}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleCancelBooking(booking.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Yes, Cancel Booking
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}
