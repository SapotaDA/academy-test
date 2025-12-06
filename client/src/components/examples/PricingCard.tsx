import PricingCard from '../PricingCard';

export default function PricingCardExample() {
  return (
    <PricingCard
      name="Premium"
      description="Ideal for competitive matches"
      pricePerHour={2000}
      features={[
        'Premium turf pitch',
        'Floodlight access',
        'Changing rooms with showers',
        'Umpire arrangements',
        'Scoreboard access',
      ]}
      popular={true}
    />
  );
}
