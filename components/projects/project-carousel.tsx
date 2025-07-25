"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { ShinyButton } from "../ui/animated-button"

// Define the project type
interface Project {
  id: number
  name: string
  capacity: string
  location: string
  image: string
  description?: string
  type: "onSite" | "offSite"
}

interface ProjectCarouselProps {
  projectType?: "onSite" | "offSite"
}

// Sample project data
const allProjects: Project[] = [
  // onSite projects
  {
    id: 1,
    name: "India Expo Mart LTD.",
    capacity: "3.4MW",
    location: "Noida",
    image: "/images/project-expo-mart.png",
    description: "One of the largest exhibition and convention centers in India, powered by clean solar energy.",
    type: "onSite",
  },
  {
    id: 2,
    name: "Yamaha Motors",
    capacity: "4.0MW",
    location: "Chennai",
    image: "/images/project-yamaha.png",
    description: "Manufacturing facility with onSite solar installation reducing carbon footprint by 30%.",
    type: "onSite",
  },
  // offSite mount projects
  {
    id: 3,
    name: "Tech Park One",
    capacity: "2.8MW",
    location: "Bangalore",
    image: "/images/project-tech-park.png",
    description: "IT park with integrated solar solution providing energy for over 20 technology companies.",
    type: "offSite",
  },
  {
    id: 4,
    name: "Mahindra Logistics",
    capacity: "1.5MW",
    location: "Pune",
    image: "/images/project-logistics.png",
    description: "Warehouse facility with solar panels covering 80% of its energy requirements.",
    type: "offSite",
  },
]

export default function ProjectCarousel({ projectType = "onSite" }: ProjectCarouselProps) {
  const projects = allProjects.filter((project) => project.type === projectType)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Function to advance to the next slide
  const nextSlide = () => {
    if (isTransitioning) return
    setDirection("next")
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }

  // Function to go to the previous slide
  const prevSlide = () => {
    if (isTransitioning) return
    setDirection("prev")
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }

  // Function to toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying((prev) => !prev)
  }

  // Set up autoplay with useEffect
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Set up new interval if autoplay is enabled
    if (isPlaying && !isTransitioning) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, currentIndex, isTransitioning]) // Re-run effect when isPlaying or currentIndex changes

  // Pause autoplay when user interacts with carousel
  const handleManualNavigation = (index: number) => {
    if (isTransitioning) return

    if (index > currentIndex) {
      setDirection("next")
    } else if (index < currentIndex) {
      setDirection("prev")
    } else {
      return // Don't do anything if clicking the current slide
    }

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)

    setIsPlaying(false)
  }

  // Get the previous and next indices for transition
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length
  const nextIndex = (currentIndex + 1) % projects.length

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6 transition-opacity duration-500" style={{ opacity: isTransitioning ? 0.5 : 1 }}>
              <h3 className="xl:text-xl text-lg text-gray-600">Featured Project</h3>
              <h2 className="xl:text-4xl text-2xl md:xl:text-3xl md:text-xl font-bold text-amplusBlue">
                Power Your Business with <br />
                Clean Energy
              </h2>
              <p className="text-gray-700 xl:text-base text-sm">
                Amplus Leads the #CleanEnergy transition for Commercial & Industrial Customers since 2013.
              </p>
              <p className="text-gray-700 xl:text-base text-sm">
                Our low-carbon clean energy solutions are customized to the customer's needs and come with our promise
                of <span className="font-bold">ZERO-INVESTMENT, ZERO-WORRIES & ZERO-RISK.</span>
              </p>
              <p className="text-gray-700 xl:text-base text-sm">{projects[currentIndex].description}</p>
              <div className="pt-4">
                <ShinyButton className="bg-amplusOrange hover:bg-amplusOrange text-white px-8 py-4 rounded-full text-xs xl:text-sm">
                  Switch to Solar Now!
                </ShinyButton>
              </div>
            </div>

            {/* Right side - Project image */}
            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                {/* Slide container */}
                <div className="absolute inset-0 w-full h-full">
                  {/* Current slide */}
                  <div
                    className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                      isTransitioning && direction === "next"
                        ? "-translate-x-full"
                        : isTransitioning && direction === "prev"
                          ? "translate-x-full"
                          : "translate-x-0"
                    }`}
                  >
                    <Image
                      src={projects[currentIndex].image || "/placeholder.svg"}
                      alt={`${projects[currentIndex].name} Solar Project`}
                      fill
                      className="object-cover"
                    />
                    {/* Blue circle overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-[20px] border-[#1a5b8d] rounded-full opacity-80"></div>
                    </div>
                  </div>

                  {/* Next slide (for transition) */}
                  {isTransitioning && direction === "next" && (
                    <div className="absolute inset-0 transition-transform duration-500 ease-in-out translate-x-full">
                      <Image
                        src={projects[nextIndex].image || "/placeholder.svg"}
                        alt={`${projects[nextIndex].name} Solar Project`}
                        fill
                        className="object-cover"
                      />
                      {/* Blue circle overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-[20px] border-[#1a5b8d] rounded-full opacity-80"></div>
                      </div>
                    </div>
                  )}

                  {/* Previous slide (for transition) */}
                  {isTransitioning && direction === "prev" && (
                    <div className="absolute inset-0 transition-transform duration-500 ease-in-out -translate-x-full">
                      <Image
                        src={projects[prevIndex].image || "/placeholder.svg"}
                        alt={`${projects[prevIndex].name} Solar Project`}
                        fill
                        className="object-cover"
                      />
                      {/* Blue circle overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-[20px] border-[#1a5b8d] rounded-full opacity-80"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project details */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 z-10 transition-opacity duration-500"
                  style={{ opacity: isTransitioning ? 0.5 : 1 }}
                >
                  <p className="font-bold xl:text-base text-sm">
                    Project Name: <span className="font-normal">{projects[currentIndex].name}</span>
                  </p>
                  <p className="font-bold xl:text-base text-sm">
                    Capacity: <span className="font-normal">{projects[currentIndex].capacity}</span>
                  </p>
                  <p className="font-bold xl:text-base text-sm">
                    Location: <span className="font-normal">{projects[currentIndex].location}</span>
                  </p>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-20">
                <Button
                  onClick={() => {
                    if (!isTransitioning) {
                      prevSlide()
                      setIsPlaying(false)
                    }
                  }}
                  size="icon"
                  variant="secondary"
                  className="bg-white bg-opacity-70 hover:bg-white rounded-full h-10 w-10"
                  disabled={isTransitioning}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous project</span>
                </Button>
                <Button
                  onClick={() => {
                    if (!isTransitioning) {
                      nextSlide()
                      setIsPlaying(false)
                    }
                  }}
                  size="icon"
                  variant="secondary"
                  className="bg-white bg-opacity-70 hover:bg-white rounded-full h-10 w-10"
                  disabled={isTransitioning}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next project</span>
                </Button>
              </div>

              {/* Play/Pause button */}
              <div className="absolute top-4 right-4 z-20">
                <Button
                  onClick={toggleAutoplay}
                  size="icon"
                  variant="secondary"
                  className="bg-white bg-opacity-70 hover:bg-white rounded-full h-10 w-10"
                  disabled={isTransitioning}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  <span className="sr-only">{isPlaying ? "Pause slideshow" : "Play slideshow"}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => !isTransitioning && handleManualNavigation(index)}
                className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? "bg-amplusOrange" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to project ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
                disabled={isTransitioning}
              />
            ))}
          </div>

          {/* Autoplay indicator */}
          {/* <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-500">
              {isTransitioning
                ? "Changing slide..."
                : isPlaying
                  ? "Auto-advancing slides every 5 seconds"
                  : "Slideshow paused"}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
