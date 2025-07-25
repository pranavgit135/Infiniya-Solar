"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SliderButton from "./ui/sliderButton"
import Image from "next/image"

interface ConsultationStep {
  id: string
  title: string
  icon: any
  description: string
}

export default function ConsultationSection({ data }: { data: any }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovering, setIsHovering] = useState<string | null>(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  const steps: ConsultationStep[] = data.consultationSectionCollection.items

  // const step: ConsultationStep[] = [
  //   {
  //     id: "choose",
  //     title: "Choose the Right Renewable Energy Solution",
  //     icon: (
  //       <svg
  //         className="w-10 h-10 text-white"
  //         fill="none"
  //         stroke="currentColor"
  //         viewBox="0 0 24 24"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           strokeWidth={2}
  //           d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  //         />
  //         <rect x="6" y="10" width="12" height="8" rx="1" strokeWidth={2} />
  //         <line x1="8" y1="14" x2="10" y2="14" strokeWidth={2} />
  //         <line x1="12" y1="14" x2="14" y2="14" strokeWidth={2} />
  //         <line x1="16" y1="14" x2="18" y2="14" strokeWidth={2} />
  //       </svg>
  //     ),
  //     description:
  //       "We help you navigate through various renewable energy options to find the perfect solution that aligns with your business goals, energy requirements, and sustainability targets.",
  //   },
  //   {
  //     id: "shortlist",
  //     title: "Shortlist the Right Renewable Energy Developer",
  //     icon: (
  //       <svg
  //         className="w-10 h-10 text-white"
  //         fill="none"
  //         stroke="currentColor"
  //         viewBox="0 0 24 24"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           strokeWidth={2}
  //           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  //         />
  //       </svg>
  //     ),
  //     description:
  //       "Our expert team evaluates and shortlists the most reliable and experienced renewable energy developers who can deliver quality installations and ongoing support for your project.",
  //   },
  //   {
  //     id: "secure",
  //     title: "Secure the Right PPA Terms",
  //     icon: (
  //       <svg
  //         className="w-10 h-10 text-white"
  //         fill="none"
  //         stroke="currentColor"
  //         viewBox="0 0 24 24"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           strokeWidth={2}
  //           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  //         />
  //       </svg>
  //     ),
  //     description:
  //       "We negotiate favorable Power Purchase Agreement (PPA) terms on your behalf, ensuring competitive rates, clear terms, and long-term benefits for your business's renewable energy investment.",
  //   },
  //   {
  //     id: "implementation",
  //     title: "Implementation & Project Management",
  //     icon: (
  //       <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //         <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} />
  //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8M8 16h8M8 8h8" />
  //       </svg>
  //     ),
  //     description:
  //       "We oversee the entire implementation process, ensuring timely project delivery, quality control, and seamless integration with your existing infrastructure.",
  //   },
  //   {
  //     id: "monitor-optimize",
  //     title: "Monitor & Optimize Performance",
  //     icon: (
  //       <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //         <circle cx="12" cy="12" r="10" strokeWidth={2} />
  //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
  //       </svg>
  //     ),
  //     description:
  //       "After installation, we continuously monitor your system's performance and provide ongoing optimization to maximize your energy savings and ROI.",
  //   },
  // ]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1))
  }

  return (
    <section className="py-20 bg-white px-4 lg:px-28 ">
      <div className="container mx-auto pr-10 md:gap-10 flex flex-col justify-between mb-10 mr-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 mr-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-bold text-[#1e3a6e] mb-2">
              Why Your Business Needs <span className="text-[#f47920]"><br/>Renewable Energy Consultation</span>?
            </h2>
            <p className="text-lg xl:text-xl text-[#1e3a6e]">Your Green Journey, Our Expertise</p>
          </div>

          <div className="flex space-x-4 mt-6 md:mt-0">
            <motion.button
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white backdrop-blur-sm"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              onMouseEnter={() => setIsHovering("prev")}
              onMouseLeave={() => setIsHovering(null)}
              style={{
                boxShadow: isHovering === "prev" ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "none",
                transition: "all 0.3s ease",
              }}
            >
              <ChevronLeft className={`w-6 h-6 ${isHovering === "prev" ? "text-[#f47920]" : "text-gray-400"}`} />
            </motion.button>
            <motion.button
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white backdrop-blur-sm"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              onMouseEnter={() => setIsHovering("next")}
              onMouseLeave={() => setIsHovering(null)}
              style={{
                boxShadow: isHovering === "next" ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "none",
                transition: "all 0.3s ease",
              }}
            >
              <ChevronRight className={`w-6 h-6 ${isHovering === "next" ? "text-[#f47920]" : "text-gray-400"}`} />
            </motion.button>
          </div>
        </div>

        {/* Carousel Card - Responsive: 1 for small, 2 for md, 3 for lg+ */}
        <div className="flex justify-center mt-20 gap-4">
          {(() => {
            let cardsToShow = 1;
            if (typeof window !== 'undefined') {
              if (window.innerWidth >= 1024) cardsToShow = 3; // lg+
              else if (window.innerWidth >= 768) cardsToShow = 2; // md
            }
            // Fallback for SSR: use isMobile state
            if (isMobile) cardsToShow = 1;
            else if (!isMobile && typeof window !== 'undefined' && window.innerWidth >= 1024) cardsToShow = 3;
            else if (!isMobile && typeof window !== 'undefined' && window.innerWidth >= 768) cardsToShow = 2;

            // Calculate indices to show
            const half = Math.floor(cardsToShow / 2);
            const total = steps.length;
            let indices = [];
            for (let i = -half; i <= half; i++) {
              if (cardsToShow === 2 && i === 0) continue; // For 2 cards, skip center (show active and next)
              let idx = (activeIndex + i + total) % total;
              if (cardsToShow === 2 && i === -1 && activeIndex === 0) continue; // Don't show prev if at start
              if (cardsToShow === 2 && i === 1 && activeIndex === total - 1) continue; // Don't show next if at end
              indices.push(idx);
            }
            if (cardsToShow === 2) {
              // For 2 cards, show active and next (or prev if at end)
              if (activeIndex === total - 1) indices = [activeIndex - 1, activeIndex];
              else indices = [activeIndex, (activeIndex + 1) % total];
            }
            if (cardsToShow === 1) indices = [activeIndex];
            if (cardsToShow === 3) {
              indices = [
                (activeIndex - 1 + total) % total,
                activeIndex,
                (activeIndex + 1) % total,
              ];
            }
            return indices.map((idx, i) => {
              const step = steps[idx];
              const isActive = idx === activeIndex;
              return (
                <motion.div
                  key={step.id}
                  className={`bg-gray-100 rounded-lg w-full max-w-md ${isActive ? '' : 'opacity-60 scale-95'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0.6, y: 0, scale: isActive ? 1 : 0.95 }}
                  transition={{ duration: 0.5 }}
                  whileHover={isActive ? {
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  } : {}}
                >
                  <div className="p-6 relative flex flex-col justify-center gap-10 h-full">
                    <div className="w-16 h-16 absolute -top-10 left-10 bg-[#1e3a6e] rounded-lg flex items-center justify-center mb-6">
                      <img src={step.icon.url}/>
                    </div>
                    <h3 className="text-lg xl:text-xl mt-10 xl:mt-0 font-semibold text-[#f47920] xl:mb-4">{step.title}</h3>
                    <p className="text-gray-600 xl:mb-6 text-sm xl:text-base">{step.description}</p>
                    <SliderButton />
                  </div>
                </motion.div>
              );
            });
          })()}
        </div>

        {/* Mobile indicators */}
        {/* {isMobile && (
          <div className="flex justify-center space-x-2 mt-6">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-[#f47920]" : "bg-gray-300"}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )} */}
      </div>
    </section>
  )
}
