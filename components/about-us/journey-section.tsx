"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

interface TimelineItem {
  year: string
  title: string
  description?: string
  position: "top" | "bottom"
}

export default function JourneySection({ about }: { about: any }) {
  
  const timelineItems1: TimelineItem[] =about.journeySectionCollection.items
 
  
  // const timelineItems: TimelineItem[] = [
  //   {
  //     year: "2013",
  //     title: "Inception",
  //     description:
  //       "Amplus Solar was founded with a vision to accelerate the adoption of clean energy solutions in India, guided by a team of renewable energy experts.",
  //     position: "top",
  //   },
  //   {
  //     year: "2016",
  //     title: "Early Growth",
  //     description:
  //       "Rapid expansion with multiple solar projects across India, establishing Amplus as a key player in the commercial and industrial solar sector.",
  //     position: "bottom",
  //   },
  //   {
  //     year: "2019",
  //     title: "Milestone Achievements",
  //     description:
  //       "Acquired by PETRONAS, Malaysia's national oil and gas company, enabling Amplus to scale operations and expand its renewable energy portfolio.",
  //     position: "top",
  //   },
  //   {
  //     year: "2023",
  //     title: "Global Impact",
  //     description:
  //       "Reached 2.3+ GWp of operational and in-progress assets, making significant contributions to India's clean energy transition and carbon reduction goals.",
  //     position: "bottom",
  //   },
  // ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const AUTO_PLAY_DURATION = 5000 // 5 seconds per slide
  const PROGRESS_UPDATE_INTERVAL = 50 // Update progress every 50ms

  const nextSlide = () => {
    if (isAnimating) return
    resetAutoPlayTimer()
    setDirection("right")
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex === timelineItems1.length - 1 ? 0 : prevIndex + 1))
    }, 300)
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const prevSlide = () => {
    if (isAnimating) return
    resetAutoPlayTimer()
    setDirection("left")
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? timelineItems1.length - 1 : prevIndex - 1))
    }, 300)
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const resetAutoPlayTimer = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    setProgress(0)

    if (isAutoPlaying) {
      startAutoPlayTimer()
    }
  }

  const startAutoPlayTimer = () => {
    // Set up the progress interval
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (PROGRESS_UPDATE_INTERVAL / AUTO_PLAY_DURATION) * 100
        return newProgress > 100 ? 100 : newProgress
      })
    }, PROGRESS_UPDATE_INTERVAL)

    // Set up the main interval to advance slides
    autoPlayIntervalRef.current = setTimeout(() => {
      nextSlide()
    }, AUTO_PLAY_DURATION)
  }

  // Effect for auto-playing the timeline
  useEffect(() => {
    if (isAutoPlaying && !isAnimating) {
      startAutoPlayTimer()
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearTimeout(autoPlayIntervalRef.current)
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isAutoPlaying, activeIndex, isAnimating])

  // Effect for auto-playing toggle
  useEffect(() => {
    if (isAutoPlaying) {
      resetAutoPlayTimer()
    } else {
      if (autoPlayIntervalRef.current) {
        clearTimeout(autoPlayIntervalRef.current)
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      setProgress(0)
    }
  }, [isAutoPlaying])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Calculate progress percentage for the timeline line
  const progressPercentage = ((activeIndex + 1) / timelineItems1.length) * 100

  return (
    <section ref={sectionRef} className="py-16 px-10 md:px-32 xl:px-0 bg-gray-50 mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="xl:text-4xl text-2xl font-bold text-primary mb-4 text-amplusBlue">Our Journey</h2>
        </div>

        <div className="relative">
          {/* Timeline background line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>

          {/* Timeline progress line */}
          <div
            className="absolute left-0 top-1/2 h-1 bg-amplusOrange transform -translate-y-1/2 transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>

          {/* Timeline dots */}
          <div className="relative flex justify-between items-center mb-8">
            {timelineItems1.map((item, index) => (
              <div
                key={index}
                className={`relative z-10 flex flex-col items-center transition-all duration-500 ${
                  index === activeIndex ? "scale-125" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                    index === activeIndex
                      ? "bg-amplusOrange border-secondary animate-pulse-slow"
                      : index < activeIndex
                        ? "bg-amplusOrange border-secondary"
                        : "bg-white border-gray-400"
                  }`}
                ></div>
                <div
                  className={`absolute top-6 text-sm font-medium transition-all duration-300 ${
                    index === activeIndex
                      ? "text-amplusOrange font-bold scale-110"
                      : index < activeIndex
                        ? "text-amplusOrange"
                        : "text-black"
                  }`}
                >
                  {item.year}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline content */}
          <div className="mt-12 relative overflow-hidden">
            <div
              className={`transition-all duration-500 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className={`relative transition-all duration-300 transform ${
                  isAnimating
                    ? direction === "right"
                      ? "translate-x-full opacity-0"
                      : "-translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto transform transition-all duration-500 hover:shadow-lg">
                  <div className="w-12 h-1 bg-amplusOrange mb-4 rounded-full"></div>
                  <h3 className="xl:text-base text-sm font-semibold text-amplusOrange mb-2">{timelineItems1[activeIndex].title}</h3>
                  <p className="text-gray-700 xl:text-base text-sm ">{timelineItems1[activeIndex].description}</p>

                  {/* Auto-play progress indicator */}
                  {isAutoPlaying && (
                    <div className="mt-4 h-1 bg-amplusOrange rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 hover:border-secondary transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
                aria-label="Previous milestone"
                disabled={isAnimating}
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>

              {/* Auto-play toggle button */}
              <button
                onClick={toggleAutoPlay}
                className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 ${
                  isAutoPlaying
                    ? "bg-amplusOrange border-secondary"
                    : "bg-amplusOrange border-gray-300 hover:bg-gray-100 hover:border-secondary"
                }`}
                aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
              >
                {isAutoPlaying ? (
                  <Pause className={`h-5 w-5 ${isAutoPlaying ? "text-white" : "text-amplusOrange"}`} />
                ) : (
                  <Play className={`h-5 w-5 ${isAutoPlaying ? "text-white" : "text-amplusOrange"}`} />
                )}
              </button>

              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 hover:border-secondary transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
                aria-label="Next milestone"
                disabled={isAnimating}
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
