import { Link } from 'wouter';
import { ArrowRight, Calendar, Users, Shield, Clock, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import GroundCard from '@/components/GroundCard';
import PricingCard from '@/components/PricingCard';
import { grounds, pricingTiers } from '@/lib/mockData';

import heroImage from '@assets/generated_images/cricket_ground_hero_image.png';

// todo: remove mock functionality
const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Team Captain',
    content: 'CricketBook made organizing our weekend matches so easy. The booking process is seamless and the grounds are always well-maintained.',
    rating: 5,
    bookings: 24,
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Sports Coordinator',
    content: 'We use CricketBook for all our corporate cricket events. The variety of grounds and flexible time slots work perfectly for our needs.',
    rating: 5,
    bookings: 18,
  },
];

const steps = [
  {
    icon: Calendar,
    title: 'Choose Date & Time',
    description: 'Select your preferred date and time slot from our availability calendar.',
  },
  {
    icon: Shield,
    title: 'Select Ground',
    description: 'Browse our premium cricket grounds and pick the perfect venue.',
  },
  {
    icon: Users,
    title: 'Add Players',
    description: 'Specify the number of players and provide contact details.',
  },
  {
    icon: Clock,
    title: 'Instant Confirmation',
    description: 'Get immediate booking confirmation and start preparing for your match.',
  },
];

export default function HomePage() {
  const featuredGrounds = grounds.filter(g => g.featured).slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[600px] lg:min-h-[700px]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Cricket ground at sunset"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-4 py-20 md:px-6 lg:min-h-[700px] lg:px-8">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl" data-testid="text-hero-title">
              Book Your Perfect
              <span className="block text-primary">Cricket Ground</span>
            </h1>
            <p className="text-lg text-white/80 md:text-xl">
              Premium cricket facilities at your fingertips. Easy online booking, flexible time slots, and top-quality grounds for your matches.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking">
                <Button size="lg" className="gap-2" data-testid="button-hero-book">
                  Book Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#grounds">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 bg-white/10 text-white backdrop-blur-lg"
                  data-testid="button-hero-browse"
                >
                  Browse Grounds
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="grounds" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">Featured Grounds</h2>
              <p className="mt-2 text-muted-foreground">
                Explore our top-rated cricket facilities
              </p>
            </div>
            <Link href="/booking">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-grounds">
                View All Grounds <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredGrounds.map(ground => (
              <GroundCard key={ground.id} ground={ground} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">How It Works</h2>
            <p className="mt-2 text-muted-foreground">
              Book your cricket ground in four simple steps
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" style={{ display: index === 3 ? 'none' : undefined }} />
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">Pricing Plans</h2>
            <p className="mt-2 text-muted-foreground">
              Choose the perfect package for your cricket needs
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {pricingTiers.map(tier => (
              <PricingCard
                key={tier.id}
                name={tier.name}
                description={tier.description}
                pricePerHour={tier.pricePerHour}
                features={tier.features}
                popular={tier.popular}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">What Our Users Say</h2>
            <p className="mt-2 text-muted-foreground">
              Trusted by cricket enthusiasts across the city
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="overflow-visible" data-testid={`card-testimonial-${testimonial.id}`}>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {testimonial.bookings} bookings
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Card className="overflow-visible bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center md:p-12">
              <h2 className="text-2xl font-semibold md:text-3xl">Ready to Play?</h2>
              <p className="max-w-xl text-primary-foreground/80">
                Join thousands of cricket enthusiasts who trust CricketBook for their ground booking needs.
              </p>
              <Link href="/booking">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="gap-2"
                  data-testid="button-cta-book"
                >
                  Book Your Ground Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
