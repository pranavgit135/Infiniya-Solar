"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectCarousel from "@/components/projects/project-carousel";

export default function FeatureProject({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState<"onSite" | "offSite">("onSite");

  const handleTabChange = (tab: "onSite" | "offSite") => {
    setActiveTab(tab);
  };

  return (
    <main className="flex min-h-screen flex-col items-center mx-auto">

      {/* Industrial Growth Section */}

      {/* Featured Projects Section */}
      <section className="w-full bg-gray-50 md:py-16 xl:px-4 px-10 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="xl:text-lg text-base text-gray-600 mb-4">
            {activeTab === "onSite" ? "Onsite Projects" : "Offsite Projects"}{" "}
          </h3>
          <h1 className="xl:text-4xl text-2xl md:xl:text-4xl md:text-2xl font-bold text-amplusBlue mb-6">
            {data.title1} <br />
            <div className="text-amplusOrange">{data.title2}</div>
          </h1>
          <p className=" max-w-3xl mx-auto mb-10 xl:text-lg text-base">
            {data.description}
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
                <ProjectCarousel projectType="offSite"  />
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}
