import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, Shield, Clock, Star, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import GroundCard from '@/components/GroundCard';
import PricingCard from '@/components/PricingCard';
import { FadeIn, FadeInLeft, StaggerContainer, StaggerItem, ScaleIn } from '@/components/AnimatedSection';
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

const stats = [
  { value: '500+', label: 'Bookings Made' },
  { value: '50+', label: 'Cricket Grounds' },
  { value: '4.9', label: 'Average Rating' },
  { value: '24/7', label: 'Support' },
];

export default function HomePage() {
  const featuredGrounds = grounds.filter(g => g.featured).slice(0, 3);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <section className="relative min-h-[600px] lg:min-h-[700px]">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={heroImage}
            alt="Cricket ground at sunset"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-4 py-20 md:px-6 lg:min-h-[700px] lg:px-8">
          <div className="max-w-2xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4" />
                <span>Premium Cricket Facilities</span>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl" data-testid="text-hero-title">
                Book Your Perfect
                <motion.span 
                  className="block text-primary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Cricket Ground
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-lg text-white/80 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Premium cricket facilities at your fingertips. Easy online booking, flexible time slots, and top-quality grounds for your matches.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/booking">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="gap-2" data-testid="button-hero-book">
                    Book Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="#grounds">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/30 bg-white/10 text-white backdrop-blur-lg"
                    data-testid="button-hero-browse"
                  >
                    Browse Grounds
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-4 pt-8 sm:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-2">
            <motion.div 
              className="h-2 w-1 rounded-full bg-white"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      <section id="grounds" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <FadeIn className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">Featured Grounds</h2>
              <p className="mt-2 text-muted-foreground">
                Explore our top-rated cricket facilities
              </p>
            </div>
            <Link href="/booking">
              <motion.div whileHover={{ x: 5 }}>
                <Button variant="outline" className="gap-2" data-testid="button-view-all-grounds">
                  View All Grounds <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </FadeIn>
          
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredGrounds.map(ground => (
              <StaggerItem key={ground.id}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <GroundCard ground={ground} />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">How It Works</h2>
            <p className="mt-2 text-muted-foreground">
              Book your cricket ground in four simple steps
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="relative text-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  {index < 3 && (
                    <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" />
                  )}
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">Pricing Plans</h2>
            <p className="mt-2 text-muted-foreground">
              Choose the perfect package for your cricket needs
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <StaggerItem key={tier.id}>
                <motion.div 
                  whileHover={{ y: -8, scale: 1.01 }} 
                  transition={{ duration: 0.2 }}
                  className={index === 1 ? 'lg:-mt-4' : ''}
                >
                  <PricingCard
                    name={tier.name}
                    description={tier.description}
                    pricePerHour={tier.pricePerHour}
                    features={tier.features}
                    popular={tier.popular}
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">What Our Users Say</h2>
            <p className="mt-2 text-muted-foreground">
              Trusted by cricket enthusiasts across the city
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={testimonial.id}>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Card className="overflow-visible" data-testid={`card-testimonial-${testimonial.id}`}>
                    <CardContent className="p-6">
                      <motion.div 
                        className="mb-4 flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                      >
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </motion.div>
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
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <ScaleIn>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-visible bg-primary text-primary-foreground">
                <CardContent className="flex flex-col items-center gap-6 p-8 text-center md:p-12">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="h-12 w-12" />
                  </motion.div>
                  <h2 className="text-2xl font-semibold md:text-3xl">Ready to Play?</h2>
                  <p className="max-w-xl text-primary-foreground/80">
                    Join thousands of cricket enthusiasts who trust CricketBook for their ground booking needs.
                  </p>
                  <Link href="/booking">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        size="lg" 
                        variant="secondary"
                        className="gap-2"
                        data-testid="button-cta-book"
                      >
                        Book Your Ground Now <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </ScaleIn>
        </div>

        {/* Contact Section */}
        <div className="space-y-8 py-20">
          <StaggerContainer>
            <StaggerItem>
              <FadeIn className="text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get in Touch</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  Have questions? We'd love to hear from you!
                </p>
              </FadeIn>
            </StaggerItem>

            <div className="grid gap-6 md:grid-cols-2">
              <StaggerItem>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Visit Us</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Check our location and directions on Google Maps
                        </p>
                        <a
                          href="https://maps.app.goo.gl/X1hJhD5fKvkv92Np9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center text-primary hover:underline"
                        >
                          View on Maps <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Call Us</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Reach out for more details about our grounds and services
                        </p>
                        <a
                          href="tel:+918287704299"
                          className="mt-3 inline-flex items-center text-primary hover:underline font-medium"
                        >
                          +91 82877 04299
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
