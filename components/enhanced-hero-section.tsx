"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShinyButton } from "./ui/animated-button";

export default function EnhancedHeroSection({ data }: { data: any }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get button dimensions for the animation
  // useEffect(() => {
  //   if (buttonRef.current) {
  //     setButtonWidth(buttonRef.current.offsetWidth);
  //     setButtonHeight(buttonRef.current.offsetHeight);
  //   }
  // }, []);

  // Parallax effect for background image
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const parallaxElement = document.querySelector(
  //       ".parallax-bg"
  //     ) as HTMLElement;
  //     if (parallaxElement) {
  //       // More subtle effect (8% of scroll speed)
  //       parallaxElement.style.transform = `translateY(${
  //         scrollPosition * 0.08
  //       }px)`;
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleButtonClick = (e: React.MouseEvent) => {
    // Get click position relative to button
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    setIsButtonClicked(true);
    setIsButtonAnimating(true);

    // Reset after animation completes
    setTimeout(() => {
      setIsButtonAnimating(false);
      setTimeout(() => {
        setIsButtonClicked(false);
      }, 300);
    }, 800);
  };

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#about"); // Assuming the next section has id="about"
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative px-4 sm:px-8 md:px-16 lg:px-28 py-20 lg:h-[500px]">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden ">
        <div className="parallax-bg absolute inset-0 scale-110 ">
          <Image
            src={data.heroImage.url}
            alt="Renewable energy landscape with wind turbines and solar panels"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-0 sm:px-4 h-full flex items-center">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl 2xl:text-5xl font-bold text-white mb-6"
          >
           {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl 2xl:text-2xl text-white/90 mb-8"
          >
            {data.description}
          </motion.p>

          <ShinyButton className="bg-[#f47920] w-full sm:w-auto text-base 2xl:text-lg px-4 py-2 sm:px-6 sm:py-3">{data.btnText}</ShinyButton>
        </div>
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#1e3a6e]/30 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/30"
            initial={{
              x: Math.random() * 100 + "%",
              y: "100%",
              opacity: 0.3 + Math.random() * 0.5,
              scale: 0.5 + Math.random() * 1.5,
            }}
            animate={{
              y: "0%",
              opacity: 0,
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 0.2,
          }}
          className="cursor-pointer flex flex-col items-center"
          onClick={scrollToNextSection}
        >
          <span className="text-white text-sm font-medium mb-2 opacity-80">
            Scroll Down
          </span>
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="w-1.5 h-3 bg-white rounded-full"
            />
          </div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="mt-2"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      </div> */}
    </section>
  );
}
