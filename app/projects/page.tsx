"use server"
import Image from "next/image";
import { CloudSunIcon as SolarPanel, Factory, Leaf } from "lucide-react";
import CountUp from "@/components/reactbits/countUp";
import { ShinyButton } from "@/components/ui/animated-button";
import FeatureProject from "@/components/projects/FeatureProject";
import { getProjectPage } from "@/utils/contentful/project";

export default async function Home() {
  
const data = await getProjectPage()


  return (
    <main className="flex min-h-screen flex-col items-center mx-auto">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={data.heroImage.url}
          alt="Solar panels on industrial onSite"
          fill
          className="object-cover"
          priority
        />
      </div>

      <FeatureProject data={data}/>

      {/* Industrial Growth Section */}

      {/* Featured Projects Section */}
      {/* <section className="w-full bg-gray-50 md:py-16 xl:px-4 px-10 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="xl:text-lg text-base text-gray-600 mb-4">
            {activeTab === "onSite" ? "Onsite Projects" : "Offsite Projects"}{" "}
          </h3>
          <h1 className="xl:text-4xl text-2xl md:xl:text-4xl md:text-2xl font-bold text-amplusBlue mb-6">
            Powering Change: <br />
            <div className="text-amplusOrange">A Look at Amplus&apos; diverse Onsite Solar Projects</div>
          </h1>
          <p className=" max-w-3xl mx-auto mb-10 xl:text-lg text-base">
            Amplus leads the way in distributed solar generation, offering a
            vast network of clean energy solutions to India&apos;s leading C&I
            businesses.
          </p>
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                onClick={() => handleTabChange("onSite")}
                className={`${
                  activeTab === "onSite" ? "bg-amplusBlue" : "bg-gray-400"
                } hover:bg-amplusBlue text-white px-8 py-6 rounded-full transition-colors duration-300`}
              >
                ON SIDE PROJECT
              </Button>
              <Button
                onClick={() => handleTabChange("offSite")}
                className={`${
                  activeTab === "offSite" ? "bg-amplusOrange" : "bg-gray-400"
                } hover:bg-amplusOrange text-white px-8 py-6 rounded-full transition-colors duration-300`}
              >
                OFF SIDE PROJECT
              </Button>
            </div>

            <h2 className="xl:text-4xl text-2xl md:xl:text-3xl md:text-xl font-bold text-amplusBlue text-center mb-8">
              Our Featured Projects
            </h2>

            <div className="relative">
              <div
                className={`transition-opacity duration-500 ${
                  activeTab === "onSite"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 absolute inset-0 pointer-events-none"
                }`}
              >
                <ProjectCarousel projectType="onSite" />
              </div>

              <div
                className={`transition-opacity duration-500 ${
                  activeTab === "offSite"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 absolute inset-0 pointer-events-none"
                }`}
              >
                <ProjectCarousel projectType="offSite" />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Net-Zero Future Section */}
      <section className="w-full bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="xl:text-4xl text-2xl md:xl:text-3xl md:text-xl font-bold text-amplusBlue mb-6">
           {data.statTitle}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-16 xl:text-lg text-base">
           {data.statDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Projects Stat */}
            <div className="flex flex-col items-center">
              <div className="bg-amplusOrange p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <SolarPanel className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600 xl:text-base text-sm">PROJECTS</p>
              <h3 className="xl:text-4xl text-2xl md:xl:text-3xl md:text-xl font-bold text-gray-800">
                <CountUp
                  from={0}
                  to={600}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                +
              </h3>
            </div>

            {/* Capacity Stat */}
            <div className="flex flex-col items-center">
              <div className="bg-amplusOrange p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <Factory className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600 xl:text-base text-sm">Capacity</p>
              <h3 className="xl:text-4xl text-2xl md:xl:text-3xl md:text-xl font-bold text-gray-800">
              <CountUp
                  from={0}
                  to={650}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />+ MWp
              </h3>
            </div>

            {/* CO2 Avoided Stat */}
            <div className="flex flex-col items-center">
              <div className="bg-amplusOrange p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600 xl:text-base text-sm">CO2 Avoided</p>
              <h3 className="xl:text-4xl text-2xl md:xl:text-3xl md:text-xl font-bold text-gray-800">
              <CountUp
                  from={0}
                  to={1203}
                  decimals={2}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </h3>
              <p className="xl:text-2xl text-lg font-bold text-gray-800">Million Tonnes</p>
            </div>
          </div>

          <ShinyButton className="bg-amplusOrange  text-white px-8 py-4 rounded-full  text-xs xl:text-sm">
            Go Net-Zero
          </ShinyButton>
        </div>
      </section>
    </main>
  );
}
