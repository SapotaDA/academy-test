import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customerPhone.includes(searchTerm)
  );

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'text-blue-500' },
    { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: CheckCircle, color: 'text-green-500' },
    { label: 'Revenue', value: `₹${bookings.reduce((acc, curr) => acc + (curr.bookingType === 'full-day' ? 15000 : 7000), 0).toLocaleString()}`, icon: LayoutDashboard, color: 'text-purple-500' },
    { label: 'Total Players', value: bookings.reduce((acc, curr) => acc + curr.players, 0), icon: Users, color: 'text-orange-500' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage all cricket academy bookings and revenue</p>
          </div>
          <Button onClick={fetchBookings} variant="outline" size="sm">
            Refresh Data
          </Button>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StaggerItem key={i}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full bg-muted`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn>
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>A list of all ground bookings made through the platform</CardDescription>
            <div className="flex items-center gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or phone..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Slot</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-xs text-muted-foreground">{booking.customerPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {booking.bookingType === 'full-day' ? 'Full Day' : '25 Overs'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {booking.timeSlot ? `${7 + parseInt(booking.timeSlot) - 1}:00` : 'Full Day'}
                      </TableCell>
                      <TableCell>
                        <Badge className={booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{(booking.bookingType === 'full-day' ? 15000 : 7000).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
