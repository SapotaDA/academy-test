import { Check } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
          <span className="text-4xl font-bold">${pricePerHour}</span>
          <span className="text-muted-foreground">/hour</span>
        </div>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-5 w-5 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link href="/booking">
          <Button 
            className="w-full" 
            variant={popular ? 'default' : 'outline'}
            data-testid={`button-select-${name.toLowerCase()}`}
          >
            Select {name}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
