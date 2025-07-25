

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import VideoSection from "@/components/about-us/video-section";
import ContactForm from "@/components/about-us/contact-form";
import CultureSection from "@/components/about-us/culture-section";
import WorkLifeBalanceSection from "@/components/about-us/work-life-balance-section";
import JourneySection from "@/components/about-us/journey-section";
import { ShinyButton } from "@/components/ui/animated-button";
import { getAboutPage } from "@/utils/contentful/about";

// type Props = {
//   about?: AboutPageData;
// };

export default async function AmplusSection() {
  const about = await getAboutPage();

  return (
    <>
      <section className="py-16 px-4 max-w-5xl xl:max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className="space-y-6">
            <h2 className="xl:text-4xl text-2xl font-bold text-amplusBlue leading-tight">
              {about.heroSection.heading1}
              <span className="text-amplusOrange block mt-1">
                {about.heroSection.heading2}
              </span>
            </h2>
            <h3 className="xl:text-xl text-lg text-primary">
            {about.heroSection.subheading}
            </h3>
            <p className="text-gray-700 xl:text-base text-sm">
            {about.heroSection.description}

            </p>
            <ShinyButton className="bg-[#f47920] text-white py-3 rounded-md  transition-all">
              <div className="flex items-center justify-center text-xs xl:text-sm">
              {about.heroSection.buttonText}
              <ChevronRight />
              </div>
            </ShinyButton>
          </div>
          <div className="flex justify-center">
            <Image
              src={about.heroSection.image.url}
              width={500}
              height={400}
              alt="Renewable energy illustration showing solar panels, wind turbines, and sustainable energy solutions"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
        
        {about.infoCardsCollection.items.map((card:any, index:number) => (
            <div
              key={index}
              className=" bg-amplusOrange text-white rounded-lg p-6 h-full flex flex-col"
            >
              <h3 className="xl:text-2xl text-xl font-bold mb-4 ">{card.title}</h3>
              <p className="flex-grow text-xs xl:text-base">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      
      <VideoSection about={about}/>

      {/* Journey Section */}
      <JourneySection about={about}/>

      {/* Culture Section */}
      <CultureSection about={about}/>

      {/* Work-Life Balance Section */}
      <WorkLifeBalanceSection about={about}/>

      {/* Video Section */}
     

      {/* Contact Form Section */}
      <div className="py-10 ">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="xl:text-4xl text-2xl font-bold text-amplusBlue mb-4">
          {about.contactSection.headline}
          </h2>
          <p className="text-xs lg:text-sm xl:text-lg  text-gray-700 mb-2">
          {about.contactSection.subtext}
          </p>
          <p className="text-xs lg:text-sm xl:text-lg  text-amplusOrange font-semibold">
          {about.contactSection.ctaText}
          </p>
        </div>
        <ContactForm />
      </div>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const about = await getAboutPage();
//   return {
//     props: {
//       about,
//     },
//     revalidate: 60,
//   };
// }