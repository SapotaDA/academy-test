import { Check } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatINR } from '@/lib/mockData';

interface PricingCardProps {
  name: string;
  description: string;
  pricePerHour: number;
  features: string[];
  popular?: boolean;
}

export default function PricingCard({ name, description, pricePerHour, features, popular }: PricingCardProps) {
  return (
    <Card 
      className={`relative overflow-visible ${popular ? 'border-primary' : ''}`}
      data-testid={`card-pricing-${name.toLowerCase()}`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="default">Most Popular</Badge>
        </div>
      )}
      <CardHeader className="space-y-2 pb-4 pt-6">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <span className="text-4xl font-bold">{formatINR(pricePerHour)}</span>
          <span className="text-muted-foreground">/hour</span>
        </div>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start gap-2 text-sm"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                <Check className="h-5 w-5 shrink-0 text-primary" />
              </motion.div>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        <Link href="/booking">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className="w-full" 
              variant={popular ? 'default' : 'outline'}
              data-testid={`button-select-${name.toLowerCase()}`}
            >
              Select {name}
            </Button>
          </motion.div>
        </Link>
      </CardContent>
    </Card>
  );
}
