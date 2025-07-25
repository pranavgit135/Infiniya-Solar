
import EnhancedHeroSection from "@/components/enhanced-hero-section";
import KeyStatsSection from "@/components/key-stats-section";

import WhyPartnerSection from "@/components/why-partner-section";
import ConsultationSection from "@/components/consultation-section";
import CustomerLogosSection from "@/components/customer-logos-section";
import RenewableEnergyBenefitsSection from "@/components/renewable-energy-benefits-section";
import FootprintsMapSection from "@/components/footprints-map-section";
import TestimonialsSection from "@/components/testimonials-section";
import FinalCTASection from "@/components/final-cta-section";
import IndustrialGrowth from "@/components/home/industrialGrowth";
import PartnerLogosSection from "@/components/partners-logo-section";
import { getHomePage } from "@/utils/contentful/home";
// text-3xl xl:text-4xl for headings
// text-sm xl:text-base for paragraphs
// space between 1024 and MW
// different line for Why Your Business Needs Renewable Energy Consultation?

// 10/06/2025
// navlinks size and menu Righteous
// project left align
// stats homepage subtitle size increase
// height less for box: 200 Crore Trees
// mission section on whatsaap, card scale on hover and gray bg in 4th pos aboutus section
// Dynamic Culture, Extraordinary Opportunities subheading black
// Enjoy the Work-Life Balance at Amplus subheading black
// contactus single slider 
// subheading black through out
export default async function Home() {
  const Data = await getHomePage()
  return (
    <main className="min-h-screen">
      <EnhancedHeroSection data={Data} />
      <KeyStatsSection data={Data}/>
      <IndustrialGrowth />
      <RenewableEnergyBenefitsSection  data={Data}/>
      {/* below will go to about page */}
      {/* <AboutSection />  */}
      <WhyPartnerSection data={Data} />
      <ConsultationSection data={Data}/>
      {/* <ServicesSection /> */}
      <CustomerLogosSection  data={Data}/>
      
      <FootprintsMapSection data={Data}/>
      <TestimonialsSection data={Data} />
      {/* <TeamSection /> */}
      {/* <ValuesSection /> */}
      {/* <ContactCTA /> */}
      <PartnerLogosSection data={Data}/>
      <FinalCTASection data={Data}/>
    </main>
  );
}
