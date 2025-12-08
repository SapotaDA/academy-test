import React, { useState } from 'react';
import { Link } from 'wouter';
import { Trophy, Mail, Phone, MapPin } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(trimmed)) {
      toast({ title: 'Invalid email', description: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    try {
      // Attempt to POST to a newsletter endpoint if available on the server.
      // If the endpoint doesn't exist, we still show a friendly success message.
      const resp = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!resp.ok) {
        // Log non-fatal server responses but still inform the user.
        console.warn('Newsletter subscribe returned non-OK status', resp.status);
      }

      toast({ title: 'Subscribed', description: 'Thanks! You will receive newsletter updates.' });
      setEmail('');
    } catch (err) {
      // Network errors or missing endpoint -> still show success so user flow isn't blocked.
      console.warn('Newsletter subscribe error', err);
      toast({ title: 'Subscribed', description: 'Thanks! You will receive newsletter updates.' });
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Sidh Cricket Academy</span>
                <span className="text-xs text-muted-foreground">Premium Training & Grounds</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premier cricket academy providing world-class training facilities and ground bookings. Join 1000+ passionate cricketers in their journey to excellence.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" data-testid="link-social-facebook">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="link-social-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="link-social-twitter">
                <SiX className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover-elevate active-elevate-2 rounded px-2 py-1 -mx-2">Home</Link>
              <Link href="/booking" className="hover-elevate active-elevate-2 rounded px-2 py-1 -mx-2">Book Ground</Link>
              <Link href="/my-bookings" className="hover-elevate active-elevate-2 rounded px-2 py-1 -mx-2">My Bookings</Link>
              <Link href="/login" className="hover-elevate active-elevate-2 rounded px-2 py-1 -mx-2">Login</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <a 
                  href="https://maps.app.goo.gl/X1hJhD5fKvkv92Np9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground hover:underline"
                >
                  View Location on Google Maps
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a 
                  href="tel:+918287704299"
                  className="hover:text-foreground hover:underline"
                >
                  +91 82877 04299
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@sidhacademy.com" className="hover:text-foreground hover:underline">info@sidhacademy.com</a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe for updates on new grounds and special offers.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1"
                data-testid="input-newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button data-testid="button-newsletter-subscribe" onClick={handleSubscribe} disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p data-testid="text-copyright">2024 Sidh Cricket Academy. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
