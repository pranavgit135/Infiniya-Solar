"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShinyButton } from "./ui/animated-button"

interface PartnerFeature {
  id: string
  title: string
  description: string
  image: string
}

export default function WhyPartnerSection({ data }: { data: any }) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  const features: PartnerFeature[] = data. whyPartnerSectionCollection.items
  // const feature: PartnerFeature[] = [
  //   {
  //     id: "safety",
  //     title: "Amplus Advantage Safety and Quality",
  //     description:
  //       "Our commitment to safety and quality is unmatched in the industry. We adhere to the highest standards and protocols to ensure all installations are safe, reliable, and built to last.",
  //     image: "/placeholder.svg?height=400&width=600",
  //   },
  //   {
  //     id: "hawk",
  //     title: "Hawk AI Energy Monitoring Solution",
  //     description:
  //       "Our proprietary Hawk AI monitoring system provides real-time insights into your energy production and consumption, allowing for optimal performance and quick identification of any issues.",
  //     image: "/placeholder.svg?height=400&width=600",
  //   },
  //   {
  //     id: "customized",
  //     title: "Customized Energy Solutions",
  //     description:
  //       "We understand that every client has unique energy needs. Our team designs tailored solutions that address your specific requirements, ensuring maximum efficiency and cost-effectiveness.",
  //     image: "/placeholder.svg?height=400&width=600",
  //   },
  // ]

  const handleFeatureClick = (id: string) => {
    if (isMobile) {
      if (activeFeature === id) {
        setActiveFeature(null)
      } else {
        setActiveFeature(id)
      }
    }
  }

  return (
    <section className="py-20 bg-slate-50 px-4 sm:px-8 md:px-16 lg:px-28">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl xl:text-4xl font-bold text-[#1e3a6e] mb-4">Why Partner with Us?</h2>
          <p className="text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto">
            Infinia is renowned for its ingenuity, expertise, and customized solutions, earning the trust of over 325+
            C&I clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group border"
              onClick={() => handleFeatureClick(feature.id)}
              onMouseEnter={() => !isMobile && setHoveredFeature(feature.id)}
              onMouseLeave={() => !isMobile && setHoveredFeature(null)}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }
                  : {}
              }
              layout
            >
              <motion.div
                className="relative h-[300px] xl:h-[400px] w-full"
                initial={{ filter: "brightness(1)" }}
                animate={{
                  filter: hoveredFeature === feature.id ? "brightness(1.1)" : "brightness(1)",
                }}
                transition={{ duration: 0.4 }}
              >
                {/* <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                /> */}
                <motion.div
                  className="absolute inset-0 bg-gray-200 "
                  initial={{ opacity: 0.7 }}
                  animate={{
                    opacity: activeFeature === feature.id || hoveredFeature === feature.id ? 0.9 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <div className="absolute inset-0 p-4 z-10 flex flex-col items-center justify-center text-center">
                <motion.h3 layout className="text-xl font-semibold transition-all text-[#1e3a6e] duration-300">
                  {feature.title}
                  <motion.div
                    className="h-0.5 bg-[#f47920] mt-1 mx-auto"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredFeature === feature.id || activeFeature === feature.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.h3>

                {/* Description for desktop (hover) */}
                {!isMobile && (
                  <AnimatePresence>
                    {hoveredFeature === feature.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 flex flex-col items-center"
                      >
                        <p className="text-sm max-w-sm mx-auto mb-4">{feature.description}</p>
                        <ShinyButton className="bg-[#f47920] text-white">Learn more</ShinyButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Description for mobile (click) */}
                {isMobile && (
                  <AnimatePresence>
                    {activeFeature === feature.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 flex flex-col items-center"
                      >
                        <p className="text-sm  max-w-sm mx-auto mb-4">{feature.description}</p>
                        <motion.button
                          className="mt-4 bg-[#f47920] hover:bg-[#e06a10] text-white px-4 py-2 rounded-md text-sm transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn More
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Highlight border when active or hovered */}
              <motion.div
                className="absolute inset-0 border-2 rounded-lg pointer-events-none"
                initial={{ borderColor: "rgba(244, 121, 32, 0)", opacity: 0 }}
                animate={{
                  borderColor:
                    activeFeature === feature.id || hoveredFeature === feature.id
                      ? "rgba(244, 121, 32, 1)"
                      : "rgba(244, 121, 32, 0)",
                  opacity: activeFeature === feature.id || hoveredFeature === feature.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Indicator for desktop */}
              {!isMobile && hoveredFeature !== feature.id && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Indicator for mobile */}
              {isMobile && activeFeature !== feature.id && (
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full">
                  <svg
                    className="w-5 h-5 text-[#f47920]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
