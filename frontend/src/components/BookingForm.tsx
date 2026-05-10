import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Minus, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { grounds, timeSlots, saveBooking, formatINR, type Ground, type TimeSlot } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

import heroImage from '/assets/generated_images/cricket_ground_hero_image.png';
import nightImage from '/assets/generated_images/night_cricket_ground.png';
import premiumImage from '/assets/generated_images/premium_cricket_ground.png';
import indoorImage from '/assets/generated_images/indoor_cricket_nets.png';
import communityImage from '/assets/generated_images/community_cricket_ground.png';
import luxuryImage from '/assets/generated_images/luxury_cricket_stadium.png';

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
  players: z.number().min(2, 'Minimum 2 players').max(22, 'Maximum 22 players'),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Please enter a valid phone number'),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  initialGroundId?: string;
  onSuccess?: () => void;
  featuredOnly?: boolean;
}

export default function BookingForm({ initialGroundId, onSuccess, featuredOnly = false }: BookingFormProps) {
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
  const watchedPlayers = form.watch('players');

  useEffect(() => {
    const ground = grounds.find(g => g.id === watchedGroundId);
    setSelectedGround(ground || null);
  }, [watchedGroundId]);



  const totalPrice = selectedGround ? selectedGround.pricePerHour * 2 : 0;

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const ground = grounds.find(g => g.id === data.groundId)!;

    saveBooking({
      groundId: data.groundId,
      groundName: ground.name,
      groundImage: ground.image,
      date: format(new Date(), 'yyyy-MM-dd'), // Use current date as default
      bookingType: 'Full Day',
      timeSlot: 'Full Day', // Default time slot
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
    <Card>
      <CardHeader>
        <CardTitle>Book Your Ground</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {!initialGroundId && (
              <FormField
                control={form.control}
                name="groundId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="groundId">Select Ground</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger id="groundId" data-testid="select-ground">
                          <SelectValue placeholder="Choose a cricket ground" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {grounds.filter(ground => !featuredOnly || ground.featured).map(ground => (
                          <SelectItem key={ground.id} value={ground.id}>
                            {ground.name} - {formatINR(ground.pricePerHour)}/hr
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
                    <FormLabel htmlFor="customerName">Your Name</FormLabel>
                    <FormControl>
                      <Input id="customerName" className="max-w-md w-full" placeholder="John Doe" {...field} data-testid="input-customer-name" />
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
                    <FormLabel htmlFor="customerPhone">Phone Number</FormLabel>
                    <FormControl>
                      <Input id="customerPhone" className="max-w-md w-full" placeholder="+1 234 567 890" {...field} data-testid="input-customer-phone" />
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
  );
}
