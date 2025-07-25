import Image from "next/image";
import { Button } from "../ui/button";
import { ShinyButton } from "../ui/animated-button";
import { getHomePage } from "@/utils/contentful/home";

const IndustrialGrowth = async() => {
  const data = await getHomePage()
  return (
    <section className="w-full bg-gray-100 py-16 px-4 sm:px-8 md:px-16 lg:px-28">
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl xl:text-4xl font-bold text-[#1a3a7d]">
          {data.industrialGrowth.title}
        </h2>
        <h3 className="text-xl xl:text-2xl font-bold text-[#f7941d] ">
        {data.industrialGrowth.subTitle}
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm xl:text-base">
        {data.industrialGrowth.description1}
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm xl:text-base">
        {data.industrialGrowth.description2}
        </p>

        <div className="flex flex-row items-center justify-center gap-6 xl:gap-10 mb-8">
          {/* Trees Saved Stat */}
          <div className="relative  max-w-xs w-[150px] h-[150px] md:w-[150px] md:h-[150px] xl:w-[300px] xl:h-[320px] ">
            <div className="absolute inset-0 border-4 xl:border-8 border-[#888888] rounded-xl bg-[#f2f2f2]">
              <div className="flex flex-col items-center justify-center h-full pt-6 pb-10">
                <div className="text-[#f7941d] text-center">
                  <div className="text-xl md:text-lg lg:text-xl xl:text-3xl font-bold">{data.industrialGrowth.lboxText1}</div>
                  <div className="text-xl md:text-lg lg:text-xl xl:text-3xl font-bold">{data.industrialGrowth.lboxText2}</div>
                </div>
                <div className="text-[#1a3a7d] text-2xl xl:text-4xl font-bold mt-1">
                {data.industrialGrowth.lboxText3}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 bg-[#f2f2f2] p-2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <Image
                src="/images/tree-icon.png"
                alt="Tree icon"
                width={32}
                height={32}
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </div>
          </div>

          {/* CO2 Reduced Stat */}
          <div className="relative max-w-xs w-[150px] h-[150px] md:w-[150px] md:h-[150px] xl:w-[300px] xl:h-[320px]">
            <div className="absolute inset-0 border-4 xl:border-8 border-[#888888] rounded-xl bg-[#f2f2f2]">
              <div className="flex flex-col h-full justify-center items-center pt-6 pb-10">
                <div className="text-[#f7941d] text-center">
                  <div className="text-xl md:text-lg lg:text-xl xl:text-3xl font-bold">{data.industrialGrowth.rboxText1}</div>
                  <div className="text-xl md:text-lg lg:text-xl xl:text-3xl font-bold">{data.industrialGrowth.rboxText2}</div>
                </div>
                <div className="text-[#1a3a7d] text-2xl xl:text-4xl font-bold mt-1">
                {data.industrialGrowth.rboxText3}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 bg-[#f2f2f2] p-2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <Image
                src="/images/emissions-icon.png"
                alt="Emissions reduction icon"
                width={32}
                height={32}
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </div>
          </div>
        </div>

        <ShinyButton className="rounded-full border-2 bg-[#1a3a7d] text-white px-6 py-2 text-base md:px-8 md:py-2 font-medium w-full sm:w-auto">
        {data.industrialGrowth.buttonText}
        </ShinyButton>
      </div>
    </section>
  );
};

export default IndustrialGrowth;
