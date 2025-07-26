
import Image from "next/image";
import { CloudSunIcon as SolarPanel, Factory, Leaf, Phone, LocateIcon, Landmark, MapPin } from "lucide-react";

import ContactForm from "@/components/about-us/contact-form";
import GoogleMapEmbed from "@/components/ui/GoogleMapEmbed";
import CustomerLogos from "@/components/contact/customersLogo";
import { getContactPage } from "@/utils/contentful/contact";

export default async function ContactUs() {
  const data = await getContactPage()

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] ">
        <Image
          src={data.heroImage.url}
          alt="Solar panels on industrial onSite"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Featured Projects Section */}
      <section className="w-full pt-10 sm:pt-14 md:pt-16 sm:px-4 md:px-8 " >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="xl:text-4xl text-3xl sm:xl:text-3xl sm:text-2xl font-bold text-amplusBlue mb-4 sm:mb-6">
            Solar Power With ZERO Investment
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-10 xl:text-lg text-base">
            Achieve Net Zero with Clean Energy Solutions.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <div className="w-full flex justify-center px-2 sm:px-4 md:px-0">
        <ContactForm />

      </div>

      <div className="w-full flex justify-center px-2 sm:px-4 md:px-0">
        <div className="w-full max-w-7xl">
          <CustomerLogos data={data} />
        </div>
      </div>


      {/* Head Office Section */}
      <section className="w-full bg-white px-10 py-10 sm:py-12 sm:px-4 md:px-8 border-b border-gray-100">
        <div className="max-w-5xl xl:max-w-7xl  mx-auto flex flex-col md:flex-row gap-8 items-start">
          {/* Address Block */}
          <div className="flex-1 min-w-[220px] md:min-w-[300px] mb-8 md:mb-0">
            <div className="flex">
            <MapPin className="h-10 w-10 text-amplusBlue" />
            <h2 className="text-lg flex xl:text-xl font-bold text-amplusBlue mb-2 uppercase tracking-tight">
            {data.loactionTitle}
            </h2>
            </div>
            
            <div className="text-lg xl:text-xl font-semibold text-gray-800 mb-2">
              {data.locationText1}
            </div>
            <div className="text-gray-700 mb-1 leading-relaxed text-sm xl:text-base">
              {data.locationText2}
              <br />
              {data.locationText3}
              <br />
              {data.lboxText4}
            </div>
            <div className="text-amplusBlue font-bold text-sm xl:text-lg mt-4 mb-2 flex">
              <Phone className="mr-2" />{data.locationPhone}
            </div>
          </div>
          {/* Map Block */}
          <div className="flex-1 min-w-[220px] md:min-w-[320px] w-full">
            <GoogleMapEmbed
              src={data.locationUrl}
              width={"100%"}
              height={240}
              className="w-full h-[220px] sm:h-[260px] md:h-[360px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
