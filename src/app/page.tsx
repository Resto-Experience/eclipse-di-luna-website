import { Hero } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { GiftCardSection } from '@/components/sections/GiftCardSection';
import { LocationsSection } from '@/components/sections/LocationsSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { InstagramSection } from '@/components/sections/InstagramSection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <GiftCardSection />
      <LocationsSection />
      <EventsSection />
      <ReviewsSection />
      <InstagramSection />
    </>
  );
}
