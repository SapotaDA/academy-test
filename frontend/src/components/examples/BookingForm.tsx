import BookingForm from '../BookingForm';
import { Toaster } from '@/components/ui/toaster';

export default function BookingFormExample() {
  return (
    <>
      <BookingForm 
        initialGroundId="1" 
        onSuccess={() => console.log('Booking successful!')} 
      />
      <Toaster />
    </>
  );
}
