"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CustomerLogo {
  id: number
  name: string
  image: {
    url:string
  }
}

export default function CustomerLogosSection({ data }: { data: any }) {
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isManual, setIsManual] = useState(false)

  // Sample customer logos
  const customerLogos: CustomerLogo[]=data.customerlogoSectionCollection.items
  // const customerLogo: CustomerLogo[] = [
  //   { id: 1, name: "Sanmar", image: "/images/tree-icon.png" },
  //   { id: 2, name: "Wonder Cement", image: "/images/tree-icon.png" },
  //   { id: 3, name: "DCW Limited", image: "/images/tree-icon.png" },
  //   { id: 4, name: "DP World", image: "/images/tree-icon.png" },
  //   { id: 5, name: "Arjas Steel", image: "/images/tree-icon.png" },
  //   { id: 6, name: "Granules", image: "/images/tree-icon.png" },
  //   // Duplicate logos to create continuous loop effect
  //   { id: 7, name: "Sanmar", image: "/images/tree-icon.png" },
  //   { id: 8, name: "Wonder Cement", image: "/images/tree-icon.png" },
  //   { id: 9, name: "DCW Limited", image: "/images/tree-icon.png" },
  //   { id: 10, name: "DP World", image: "/images/tree-icon.png" },
  //   { id: 11, name: "Arjas Steel", image: "/images/tree-icon.png" },
  //   { id: 12, name: "Granules", image: "/images/tree-icon.png" },
  // ]

  // Get unique logos for dots
  const uniqueLogos = customerLogos.slice(0, 6)

  useEffect(() => {
    // Check if mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Calculate carousel width
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }

    // Update current index based on animation progress
    const interval = setInterval(() => {
      if (!isHovered && !isManual) {
        setCurrentIndex((prev) => (prev + 1) % uniqueLogos.length)
      }
    }, 5000) // Update every 5 seconds

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(interval)
    }
  }, [isHovered, isManual, uniqueLogos.length])

  const handleDotClick = (index: number) => {
    setIsManual(true)
    setCurrentIndex(index)
    // Reset manual mode after animation completes
    setTimeout(() => {
      setIsManual(false)
    }, 5000)
  }

  // Calculate the target position based on current index
  const getTargetPosition = () => {
    if (isManual) {
      const itemWidth = width / uniqueLogos.length
      return -itemWidth * currentIndex
    }
    return isHovered ? 0 : isMobile ? -width / 2 : -width
  }

  return (
    <section className="py-20 bg-gray-100 px-4 sm:px-8 md:px-16 lg:px-28">
      <div className="container mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#1e3a6e] text-3xl xl:text-4xl">Wide </span>
            <span className="text-[#f47920] text-3xl xl:text-4xl">Customer Base</span>
          </h2>
          <h3 className="text-3xl xl:text-4xl font-bold text-[#1e3a6e] mb-6">Across Various Industries</h3>
          <p className="text-gray-600 max-w-2xl md:max-w-4xl mx-auto text-base xl:text-lg">
            We&apos;ve served 53+ customers in 18 states in India across variety of industries, helping them cut down on
            their carbon footprint while saving billions on electricity costs.
          </p>
        </div>

        <div className="overflow-hidden ">
          {/* Navigation Buttons */}
          
          <motion.div
            ref={carouselRef}
            className="cursor-grab"
            whileTap={{ cursor: "grabbing" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="flex"
              animate={{
                x: getTargetPosition(),
              }}
              transition={{
                x: {
                  duration: isManual ? 0.5 : isMobile ? 15 : 30,
                  repeat: isManual ? 0 : Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: isManual ? "easeInOut" : "linear",
                },
              }}
            >
              {customerLogos.map((logo) => (
                <motion.div
                  key={logo.id}
                  className="min-w-[140px] sm:min-w-[180px] md:min-w-[220px] xl:min-w-[250px] h-[100px] sm:h-[80px] md:h-[100px] xl:h-[120px] p-2 sm:p-4 mx-1 sm:mx-2 bg-white rounded-lg shadow-sm flex items-center justify-center"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo.image.url}
                      alt={logo.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <div className="flex justify-center gap-2 mt-8 py-2">
          <button
            className="z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow p-2"
            style={{ left: 8 }}
            aria-label="Previous logos"
            onClick={() => {
              setIsManual(true)
              setCurrentIndex((prev) => (prev - 1 + uniqueLogos.length) % uniqueLogos.length)
              setTimeout(() => setIsManual(false), 5000)
            }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            className="z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow p-2"
            style={{ right: 8 }}
            aria-label="Next logos"
            onClick={() => {
              setIsManual(true)
              setCurrentIndex((prev) => (prev + 1) % uniqueLogos.length)
              setTimeout(() => setIsManual(false), 5000)
            }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
          </div>

          {/* Navigation Dots */}
          {/* <div className="flex justify-center gap-2 mt-8 py-2">
            {uniqueLogos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-[#f47920] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  )
}
