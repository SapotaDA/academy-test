import { X, AlertTriangle, Clock, Ban, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RulesAndTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'rules' | 'terms' | 'refund';
}

export default function RulesAndTermsModal({ isOpen, onClose, type }: RulesAndTermsModalProps) {
  if (!isOpen) return null;

  const getContent = () => {
    switch (type) {
      case 'rules':
        return {
          title: 'Ground Rules & Regulations',
          icon: AlertTriangle,
          content: (
            <div className="space-y-6">
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Ban className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">Strictly Prohibited</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• No alcohol or smoking on premises</li>
                      <li>• No outside balls or equipment allowed</li>
                      <li>• No pets allowed</li>
                      <li>• No food from outside (canteen available)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Player Requirements</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Proper cricket attire required (whites/tracksuits)</li>
                      <li>• Non-marking cricket shoes mandatory</li>
                      <li>• Helmets recommended for batting</li>
                      <li>• Maximum 22 players per team</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-400 font-semibold mb-2">Timing & Conduct</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Arrive 15 minutes before booking time</li>
                      <li>• Respect allocated time slots</li>
                      <li>• Keep noise levels reasonable</li>
                      <li>• Clean up after use</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Facility Guidelines</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Use designated parking areas only</li>
                      <li>• Changing rooms available (first come, first served)</li>
                      <li>• Report any damages immediately</li>
                      <li>• Follow ground staff instructions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ),
        };

      case 'terms':
        return {
          title: 'Terms & Conditions',
          icon: AlertTriangle,
          content: (
            <div className="space-y-6">
              <div>
                <h4 className="text-green-400 font-semibold mb-3">1. Booking Terms</h4>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• Bookings are confirmed only after full payment</li>
                  <li>• Minimum 2 players required for booking</li>
                  <li>• Maximum 22 players per booking</li>
                  <li>• Bookings can be made up to 30 days in advance</li>
                </ul>
              </div>

              <div>
                <h4 className="text-green-400 font-semibold mb-3">2. Payment Terms</h4>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• Full payment required at time of booking</li>
                  <li>• Payments are non-refundable (see refund policy)</li>
                  <li>• Additional charges may apply for damages</li>
                  <li>• Late payment may result in booking cancellation</li>
                </ul>
              </div>

              <div>
                <h4 className="text-green-400 font-semibold mb-3">3. Liability</h4>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• Users play at their own risk</li>
                  <li>• Ground management not responsible for injuries</li>
                  <li>• Users responsible for personal belongings</li>
                  <li>• Report accidents immediately to ground staff</li>
                </ul>
              </div>

              <div>
                <h4 className="text-green-400 font-semibold mb-3">4. Code of Conduct</h4>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• Respect other users and ground staff</li>
                  <li>• No abusive language or behavior</li>
                  <li>• Follow all ground rules and regulations</li>
                  <li>• Violation may result in immediate eviction</li>
                </ul>
              </div>
            </div>
          ),
        };

      case 'refund':
        return {
          title: 'Refund & Cancellation Policy',
          icon: Clock,
          content: (
            <div className="space-y-6">
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Full Refund (100%)</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Cancellation 48+ hours before booking time</li>
                  <li>• Weather-related cancellations (rain, extreme conditions)</li>
                  <li>• Ground maintenance or technical issues</li>
                  <li>• Medical emergencies (with valid documentation)</li>
                </ul>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Partial Refund (50%)</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Cancellation 24-48 hours before booking time</li>
                  <li>• Rescheduling to another available slot</li>
                  <li>• Force majeure events (natural disasters, etc.)</li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">No Refund (0%)</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Cancellation less than 24 hours before booking</li>
                  <li>• No-show without prior cancellation</li>
                  <li>• Violation of ground rules or terms</li>
                  <li>• Damages caused by user or team</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Refund Process</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Refunds processed within 5-7 business days</li>
                  <li>• Original payment method will be used</li>
                  <li>• Processing fees may apply for certain methods</li>
                  <li>• Contact support for refund status updates</li>
                </ul>
              </div>
            </div>
          ),
        };

      default:
        return { title: '', icon: AlertTriangle, content: null };
    }
  };

  const { title, icon: Icon, content } = getContent();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gray-800/95 border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Icon className="h-5 w-5 text-green-400" />
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {content}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 text-center">
              By using our services, you agree to abide by these rules and regulations.
              For any questions, please contact our support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
