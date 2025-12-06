import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, Lightbulb, Car, Coffee, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Ground } from '@/lib/mockData';

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

const amenityIcons: Record<string, typeof Lightbulb> = {
  'Floodlights': Lightbulb,
  'Parking': Car,
  'Changing Rooms': Shirt,
  'Cafe': Coffee,
};

interface GroundCardProps {
  ground: Ground;
}

export default function GroundCard({ ground }: GroundCardProps) {
  const imageSrc = imageMap[ground.image] || heroImage;

  return (
    <Card className="group overflow-visible" data-testid={`card-ground-${ground.id}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-md">
        <motion.img
          src={imageSrc}
          alt={ground.name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <motion.div 
          className="absolute left-3 top-3 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {ground.featured && (
            <Badge variant="default" className="bg-primary">Featured</Badge>
          )}
          {ground.popular && (
            <Badge variant="secondary">Popular</Badge>
          )}
        </motion.div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1 text-white">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </motion.div>
            <span className="font-medium">{ground.rating}</span>
            <span className="text-white/80">({ground.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <CardContent className="space-y-4 p-6">
        <div>
          <h3 className="text-xl font-semibold" data-testid={`text-ground-name-${ground.id}`}>
            {ground.name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{ground.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {ground.amenities.slice(0, 4).map(amenity => {
            const Icon = amenityIcons[amenity];
            return (
              <div
                key={amenity}
                className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {Icon && <Icon className="h-3 w-3" />}
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Up to {ground.capacity} players</span>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <span className="text-2xl font-bold" data-testid={`text-ground-price-${ground.id}`}>
              ${ground.pricePerHour}
            </span>
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
          <Link href={`/booking?ground=${ground.id}`}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button data-testid={`button-book-${ground.id}`}>Book Now</Button>
            </motion.div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
