import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";

import MethodologySection from "@/components/landing/MethodologySection";
import BookSection from "@/components/landing/BookSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MethodologySection />
      <BookSection />
     
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
