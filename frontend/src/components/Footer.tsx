import { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Home, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'rules' | 'terms' | 'refund' }>({
    isOpen: false,
    type: 'rules',
  });

  const openModal = (type: 'rules' | 'terms' | 'refund') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: 'rules' });
  };

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white justify-start p-0 h-auto"
                onClick={() => window.location.href = '/'}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white justify-start p-0 h-auto"
                onClick={() => window.location.href = '/booking'}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Ground
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white justify-start p-0 h-auto"
                onClick={() => window.location.href = '/my-bookings'}
              >
                <User className="h-4 w-4 mr-2" />
                My Bookings
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>New National Highway, near Raisham Farm</p>
                  <p>Parwal, Dehradun, Uttarakhand 248007</p>
                  <p>India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">+91 8287704299</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">info@sidhcricket.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Rules & Policies */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Rules & Policies</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white justify-start p-0 h-auto text-sm"
                onClick={() => openModal('rules')}
              >
                Ground Rules
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white justify-start p-0 h-auto text-sm"
                onClick={() => openModal('terms')}
              >
                Terms & Conditions
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white justify-start p-0 h-auto text-sm"
                onClick={() => {/* Open privacy modal */}}
              >
                Privacy Policy
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white justify-start p-0 h-auto text-sm"
                onClick={() => openModal('refund')}
              >
                Refund Policy
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 CricketGrounds. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>🏏 Made with ❤️ for cricket lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
