import { useState } from 'react';
import { Header } from '@/components/ui/header-2';
import { HeroSection } from '@/components/HeroSection';
import { VillainSection } from '@/components/VillainSection';
import { SolutionSection } from '@/components/SolutionSection';
import { ProcessSection } from '@/components/ProcessSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import { PricingSection } from '@/components/PricingSection';
import { WaitlistModal } from '@/components/WaitlistModal';

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(true);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header onWaitlistOpen={() => setWaitlistOpen(true)} />
      <HeroSection onWaitlistOpen={() => setWaitlistOpen(true)} canAnimate={!waitlistOpen} />
      <VillainSection />
      <SolutionSection />
      <ProcessSection />
      <TestimonialSection />
      <PricingSection onWaitlistOpen={() => setWaitlistOpen(true)} />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
