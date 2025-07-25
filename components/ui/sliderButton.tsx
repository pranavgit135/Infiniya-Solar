import { ArrowRight } from "lucide-react";
import React from "react";

const SliderButton: React.FC = () => {
  return (
    <div className="group relative flex items-center justify-between w-full  h-12 cursor-pointer">
      {/* Background Cylinder with animation */}
      <div className="absolute inset-0 w-full h-full border-2 border-black rounded-full transition-all group-hover:animate-slideLeftToRight group-hover:border-customOrange"></div>

      {/* Text */}
      <span className="relative text-sm xl:text-base z-10 pl-4 text-black font-semibold transition-opacity duration-500 group-hover:text-customOrange group-hover:animate-opacityNoneTo100 ">
        View More
      </span>

      {/* Chevron Button */}
      <div className="relative z-10 flex mr-1 items-center justify-center w-10 h-10 bg-black rounded-full transition-colors duration-500 group-hover:bg-customOrange">
        <ArrowRight className="text-white" size={20} />
      </div>
    </div>
  );
};

export default SliderButton;
