"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCountUp } from "@/hooks/use-count-up";
import { ShinyButton } from "./ui/animated-button";
import { ChevronRight } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";

interface StatBoxProps {
  value: string;
  numericValue: number;
  label: string;
  delay: number;
  description: string;
  suffix?: string;
  decimals?: number;
}

function StatBox({
  value,
  numericValue,
  label,
  delay,
  description,
  suffix = "",
  decimals = 0,
}: StatBoxProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(boxRef, { once: true, amount: 0.6 });

  // Handle clicks outside to close tooltip on mobile
  useEffect(() => {
    if (!showTooltip) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [showTooltip]);

  // Detect if device is touch-based
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const detectTouch = () => {
      setIsTouch(true);
      // Remove event listener once touch is detected
      window.removeEventListener("touchstart", detectTouch);
    };

    window.addEventListener("touchstart", detectTouch, { once: true });

    return () => {
      window.removeEventListener("touchstart", detectTouch);
    };
  }, []);

  const handleInteraction = () => {
    if (isTouch) {
      setShowTooltip((prev) => !prev);
    }
  };

  // Use the counting animation hook
  const animatedValue = useCountUp({
    end: isInView ? numericValue : 0,
    start: 0,
    duration: 2000,
    decimals,
    suffix,
  });

  return (
    <motion.div
      ref={boxRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-[#1e3a6e] text-white rounded-lg p-5 flex flex-col items-center justify-center transform transition-all duration-300 hover:bg-[#1e3a6e]/90 cursor-pointer relative aspect-square"
      onMouseEnter={() => !isTouch && setShowTooltip(true)}
      onMouseLeave={() => !isTouch && setShowTooltip(false)}
      onFocus={() => !isTouch && setShowTooltip(true)}
      onBlur={() => !isTouch && setShowTooltip(false)}
      onClick={handleInteraction}
      onTouchEnd={(e) => {
        e.preventDefault(); // Prevent ghost clicks
      }}
      tabIndex={0}
      aria-describedby={`tooltip-${label.toLowerCase().replace(" ", "-")}`}
    >
      <span className="text-2xl md:text-xl lg:text-base xl:text-3xl font-bold mb-1 tabular-nums">
        {animatedValue}
      </span>
      <span className="text-sm text-gray-200">{label}</span>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            id={`tooltip-${label.toLowerCase().replace(" ", "-")}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-1/2 transform -translate-x-1/2 mb-2 w-48 md:w-56 bg-white text-gray-800 text-sm rounded-lg shadow-lg p-3 z-10 "
          >
            <div className="relative">
              {description}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-white" />

              {/* Close button for mobile */}
              {isTouch && (
                <button
                  className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                  aria-label="Close tooltip"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual indicator for touch devices */}
      {isTouch && (
        <div
          className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#f47920]"
          style={{ opacity: showTooltip ? 0 : 0.8 }}
        />
      )}
    </motion.div>
  );
}

export default function KeyStatsSection({ data }: { data: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

 // Typewriter effect for the orange heading
 const typewriterWords = [
  "Powering Progress",
  "Driving Innovation",
  "Sustainable Future",
  "Clean Energy Solutions",
  "Green Tomorrow",
]

const typewriterText = useTypewriter({
  words: typewriterWords,
  typeSpeed: 120,
  deleteSpeed: 80,
  delayBetweenWords: 3000,
})

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Define stats with numeric values for animation
  // const stats = [
  //   {
  //     value: "1052MW",
  //     numericValue: 1052,
  //     label: "Delivered",
  //     delay: 0.1,
  //     description:
  //       "Total renewable energy capacity delivered to our clients, equivalent to powering over 800,000 homes annually.",
  //     suffix: "MW",
  //   },
  //   {
  //     value: "53",
  //     numericValue: 53,
  //     label: "Customers",
  //     delay: 0.2,
  //     description:
  //       "Trusted by over 53 commercial and industrial clients across various sectors including manufacturing, IT, and retail.",
  //     suffix: "",
  //   },
  //   {
  //     value: "141",
  //     numericValue: 141,
  //     label: "PPAs",
  //     delay: 0.3,
  //     description:
  //       "Power Purchase Agreements signed, ensuring long-term clean energy supply at competitive rates for our clients.",
  //     suffix: "",
  //   },
  //   {
  //     value: "18",
  //     numericValue: 18,
  //     label: "States",
  //     delay: 0.4,
  //     description:
  //       "Operational presence across 18+ states in India, covering all major industrial and commercial hubs.",
  //     suffix: "",
  //   },
  //   {
  //     value: "40",
  //     numericValue: 40,
  //     label: "Developer",
  //     delay: 0.5,
  //     description:
  //       "Partnerships with over 40 renewable energy developers, ensuring best-in-class solutions and competitive pricing.",
  //     suffix: "",
  //   },
  //   {
  //     value: "5820Cr",
  //     numericValue: 5820,
  //     label: "Projects",
  //     delay: 0.6,
  //     description:
  //       "Total value of renewable energy projects delivered, representing significant investment in India's clean energy future.",
  //     suffix: "Cr",
  //   },
  // ];

  return (
    <section className="py-12 md:py-32 relative overflow-hidden mt-14 mb-5 px-4 sm:px-8 md:px-16 lg:px-28">
      {/* Background map of India */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="col-span-1 "
          >
            <div className="bg-[url('/IndiaMap.svg')] bg-contain bg-no-repeat left-10 -z-10 absolute inset-0"> </div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl xl:text-4xl font-bold text-[#1e3a6e] mb-3 z-50"
            >
              {data.keyStatSection.title1}
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="text-3xl xl:text-4xl font-bold text-[#f47920] mb-6 min-h-[1.2em] flex items-center"
            >
              <span>{typewriterText}</span>
              <span className="inline-block w-0.5 h-8 bg-[#f47920] ml-1 animate-pulse"></span>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-600 mb-6 text-sm xl:text-base">
            {data.keyStatSection.description}
            </motion.p>

            <ShinyButton className="bg-[#f47920] text-white py-3 rounded-md  transition-all">
              <div className="flex items-center justify-center text-xs xl:text-base">
              {data.keyStatSection.buttonText} <ChevronRight />
              </div>
            </ShinyButton>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.keyStatSection.stats.map((stat:any) => (
              <StatBox
                key={stat.label}
                value={stat.value}
                numericValue={stat.numericValue}
                label={stat.label}
                delay={stat.delay}
                description={stat.description}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Mobile helper text */}
      <div className="mt-6 text-center text-xs text-gray-500 md:hidden">
        <p>Tap on stats to see more information</p>
      </div>
    </section>
  );
}
