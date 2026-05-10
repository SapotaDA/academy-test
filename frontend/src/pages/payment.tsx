import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { CreditCard, Smartphone, Wallet, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatINR } from '@/lib/mockData';
import Footer from '@/components/Footer';

export default function PaymentPage() {
  const [, setLocation] = useLocation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  const totalAmount = 7000; // This would come from booking context

  useEffect(() => {
    const pendingBooking = localStorage.getItem('pendingBooking');
    if (pendingBooking) {
      setBookingData(JSON.parse(pendingBooking));
    } else {
      // No booking data, redirect back to booking
      setLocation('/booking');
    }
  }, [setLocation]);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay',
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Paytm, Google Pay, PhonePe',
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Paytm, Mobikwik, Ola Money',
    },
  ];

  const handlePayment = async () => {
    if (!bookingData) return;

    setIsProcessing(true);

    try {
      // Create the booking via API
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const result = await response.json();

      // Clear pending booking data
      localStorage.removeItem('pendingBooking');

      setIsProcessing(false);
      setShowSuccess(true);

      // Redirect after showing success
      setTimeout(() => {
        setLocation('/my-bookings');
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
      // In a real app, you'd show an error message here
      alert('Payment failed. Please try again.');
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <Card className="bg-gray-800/50 border-gray-700 max-w-md w-full">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400 mb-4">Your booking has been confirmed</p>
            <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-300">Booking ID: <span className="text-green-400 font-mono">#CRK2025001</span></p>
            </div>
            <Button
              onClick={() => setLocation('/my-bookings')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              View My Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Payment</h1>
              <p className="text-gray-400">Complete your cricket ground booking</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setLocation('/booking')}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Back to Booking
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-green-500 bg-green-900/20'
                          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-6 w-6 ${selectedPaymentMethod === method.id ? 'text-green-400' : 'text-gray-400'}`} />
                        <div>
                          <h3 className={`font-medium ${selectedPaymentMethod === method.id ? 'text-white' : 'text-gray-300'}`}>
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-400">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPaymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="user@paytm"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-4">Or scan QR code</p>
                      <div className="w-32 h-32 bg-gray-600 rounded-lg mx-auto flex items-center justify-center">
                        <span className="text-xs text-gray-400">QR Code</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'wallet' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                        Paytm
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                        Mobikwik
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Booking Type</span>
                    <span className="text-white">
                      {bookingData?.bookingType === 'full-day' ? 'Full Day' : '25 Overs (Each Side)'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white">
                      {bookingData ? new Date(bookingData.date).toLocaleDateString() : 'Loading...'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Time Slot</span>
                    <span className="text-white">
                      {bookingData?.bookingType === 'full-day'
                        ? 'Full Day (7 AM - 11 PM)'
                        : bookingData?.timeSlot
                          ? `${bookingData.timeSlot}:00 - ${(parseInt(bookingData.timeSlot) + 4).toString().padStart(2, '0')}:00`
                          : 'Not selected'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Players</span>
                    <span className="text-white">{bookingData?.players || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Customer</span>
                    <span className="text-white">{bookingData?.customerName || 'N/A'}</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">Total Amount</span>
                    <span className="text-green-400 text-xl">{formatINR(totalAmount)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  size="lg"
                  disabled={isProcessing}
                  onClick={handlePayment}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ${formatINR(totalAmount)}`
                  )}
                </Button>

                <div className="text-xs text-gray-400 text-center space-y-1">
                  <p>🔒 Your payment is secured with 256-bit SSL encryption</p>
                  <p>💳 We accept all major cards and digital wallets</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
