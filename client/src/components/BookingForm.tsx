import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Minus, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { grounds, timeSlots, saveBooking, type Ground, type TimeSlot } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

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

const bookingSchema = z.object({
  groundId: z.string().min(1, 'Please select a ground'),
  date: z.date({ required_error: 'Please select a date' }),
  timeSlotId: z.string().min(1, 'Please select a time slot'),
  players: z.number().min(2, 'Minimum 2 players').max(22, 'Maximum 22 players'),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Please enter a valid phone number'),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  initialGroundId?: string;
  onSuccess?: () => void;
}

export default function BookingForm({ initialGroundId, onSuccess }: BookingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGround, setSelectedGround] = useState<Ground | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      groundId: initialGroundId || '',
      players: 11,
      customerName: '',
      customerPhone: '',
    },
  });

  const watchedGroundId = form.watch('groundId');
  const watchedTimeSlotId = form.watch('timeSlotId');
  const watchedDate = form.watch('date');
  const watchedPlayers = form.watch('players');

  useEffect(() => {
    const ground = grounds.find(g => g.id === watchedGroundId);
    setSelectedGround(ground || null);
  }, [watchedGroundId]);

  const selectedTimeSlot = timeSlots.find(t => t.id === watchedTimeSlotId);
  const totalPrice = selectedGround ? selectedGround.pricePerHour * 2 : 0;

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const ground = grounds.find(g => g.id === data.groundId)!;
    const timeSlot = timeSlots.find(t => t.id === data.timeSlotId)!;
    
    saveBooking({
      groundId: data.groundId,
      groundName: ground.name,
      groundImage: ground.image,
      date: format(data.date, 'yyyy-MM-dd'),
      timeSlot: timeSlot.time,
      players: data.players,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      totalPrice: ground.pricePerHour * 2,
      status: 'confirmed',
    });
    
    toast({
      title: 'Booking Confirmed!',
      description: `Your booking at ${ground.name} has been confirmed.`,
    });
    
    setIsSubmitting(false);
    form.reset();
    onSuccess?.();
  };

  const adjustPlayers = (delta: number) => {
    const current = form.getValues('players');
    const newValue = Math.min(22, Math.max(2, current + delta));
    form.setValue('players', newValue);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Book Your Ground</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="groundId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Ground</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-ground">
                            <SelectValue placeholder="Choose a cricket ground" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {grounds.map(ground => (
                            <SelectItem key={ground.id} value={ground.id}>
                              {ground.name} - ${ground.pricePerHour}/hr
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                              data-testid="button-date-picker"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeSlotId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Slot</FormLabel>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                        {timeSlots.map(slot => (
                          <Button
                            key={slot.id}
                            type="button"
                            variant={field.value === slot.id ? 'default' : 'outline'}
                            className={cn(
                              'h-auto py-3',
                              !slot.available && 'opacity-50 cursor-not-allowed'
                            )}
                            disabled={!slot.available}
                            onClick={() => field.onChange(slot.id)}
                            data-testid={`button-timeslot-${slot.id}`}
                          >
                            <span className="text-xs">{slot.time}</span>
                          </Button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="players"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Players</FormLabel>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => adjustPlayers(-1)}
                          disabled={field.value <= 2}
                          data-testid="button-players-minus"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center text-xl font-semibold" data-testid="text-players-count">
                          {field.value}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => adjustPlayers(1)}
                          disabled={field.value >= 22}
                          data-testid="button-players-plus"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} data-testid="input-customer-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 234 567 890" {...field} data-testid="input-customer-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                  data-testid="button-submit-booking"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedGround ? (
              <>
                <div className="aspect-video overflow-hidden rounded-md">
                  <img
                    src={imageMap[selectedGround.image] || heroImage}
                    alt={selectedGround.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedGround.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedGround.location}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{watchedDate ? format(watchedDate, 'PPP') : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span>{selectedTimeSlot?.time || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Players</span>
                    <span>{watchedPlayers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>2 hours</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span data-testid="text-total-price">${totalPrice}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">
                Select a ground to see booking details
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
