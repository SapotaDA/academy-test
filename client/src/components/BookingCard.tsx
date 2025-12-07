import { format, parseISO, isPast } from 'date-fns';
import { Calendar, Clock, Users, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatINR, type Booking } from '@/lib/mockData';

import heroImage from '@assets/generated_images/cricket_ground_hero_image.png';
import nightImage from '@assets/generated_images/night_cricket_ground.png';
import premiumImage from '@assets/generated_images/premium_cricket_ground.png';
import indoorImage from '@assets/generated_images/indoor_cricket_nets.png';
import communityImage from '@assets/generated_images/community_cricket_ground.png';
import luxuryImage from '@assets/generated_images/luxury_cricket_stadium.png';

const imageMap: Record<string, string> = {
  hero: heroImage,
  night: nightImage,
  premium: premiumImage,
  indoor: indoorImage,
  community: communityImage,
  luxury: luxuryImage,
};

const statusStyles: Record<Booking['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
  confirmed: { variant: 'default', label: 'Confirmed' },
  pending: { variant: 'secondary', label: 'Pending' },
  cancelled: { variant: 'destructive', label: 'Cancelled' },
  completed: { variant: 'outline', label: 'Completed' },
};

interface BookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: string) => void;
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
  const imageSrc = imageMap[booking.groundImage] || heroImage;
  const statusInfo = statusStyles[booking.status];
  const bookingDate = parseISO(booking.date);
  const isUpcoming = !isPast(bookingDate) && booking.status === 'confirmed';

  return (
    <Card className="overflow-visible" data-testid={`card-booking-${booking.id}`}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="aspect-video w-full overflow-hidden rounded-t-md md:aspect-square md:w-48 md:rounded-l-md md:rounded-tr-none">
            <img
              src={imageSrc}
              alt={booking.groundName}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex flex-1 flex-col justify-between gap-4 p-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold" data-testid={`text-booking-ground-${booking.id}`}>
                    {booking.groundName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Booked by {booking.customerName}
                  </p>
                </div>
                <Badge variant={statusInfo.variant} data-testid={`badge-status-${booking.id}`}>
                  {statusInfo.label}
                </Badge>
              </div>

              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>{format(bookingDate, 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{booking.timeSlot}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>{booking.players} players</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>Contact: {booking.customerPhone}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
              <div>
                <span className="text-2xl font-bold" data-testid={`text-booking-price-${booking.id}`}>
                  {formatINR(booking.totalPrice)}
                </span>
                <span className="text-sm text-muted-foreground"> total</span>
              </div>
              
              {isUpcoming && onCancel && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-destructive" data-testid={`button-cancel-${booking.id}`}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel Booking
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel your booking at {booking.groundName} on{' '}
                        {format(bookingDate, 'MMMM d, yyyy')}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onCancel(booking.id)}
                        className="bg-destructive text-destructive-foreground"
                      >
                        Cancel Booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
