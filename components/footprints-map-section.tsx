"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import MapInfoOverlay from "./map-info-overlay"

// Dynamically import the optimized map component to avoid SSR issues
const OptimizedIndiaMap = dynamic(() => import("./optimized-india-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse"></div>,
})

interface StateData {
  id: string
  name: string
  capacity: number
  projects: number
  category: "none" | "veryLow" | "low" | "medium" | "high" | "veryHigh"
}

// Helper to determine category from capacity
function getCategoryByCapacity(capacity: number): StateData["category"] {
  if (capacity > 40) return "veryHigh"
  if (capacity > 20) return "high"
  if (capacity > 10) return "medium"
  if (capacity > 5) return "low"
  if (capacity > 0) return "veryLow"
  return "none"
}

export default function FootprintsMapSection({ data }: { data: any }) {
  const [selectedState, setSelectedState] = useState<StateData | null>(null)
  const [animatedCapacity, setAnimatedCapacity] = useState(0)
  const [animatedProjects, setAnimatedProjects] = useState(0)
  const [animatedStates, setAnimatedStates] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  // Complete data for all states - in a real app, this would come from an API or CMS
  const rawStatesData = [
    { id: "AP", name: "Andhra Pradesh", capacity: 21.5, projects: 11, },
    { id: "AR", name: "Arunachal Pradesh", capacity: 0.2, projects: 1,},
    { id: "AS", name: "Assam", capacity: 0.8, projects: 2,  },
    { id: "BR", name: "Bihar", capacity: 1.2, projects: 2,},
    { id: "CT", name: "Chhattisgarh", capacity: 0.9, projects: 1, },
    { id: "GA", name: "Goa", capacity: 0.3, projects: 1, },
    { id: "GJ", name: "Gujarat", capacity: 65.1, projects: 24,  },
    { id: "HR", name: "Haryana", capacity: 17.8, projects: 12, },
    { id: "HP", name: "Himachal Pradesh", capacity: 0.5, projects: 1, },
    { id: "JH", name: "Jharkhand", capacity: 0.9, projects: 1,  },
    { id: "KA", name: "Karnataka", capacity: 36.4, projects: 15, },
    { id: "KL", name: "Kerala", capacity: 7.1, projects: 6,  },
    { id: "MP", name: "Madhya Pradesh", capacity: 45.3, projects: 14,  },
    { id: "MH", name: "Maharashtra", capacity: 87.0, projects: 32, },
    { id: "MN", name: "Manipur", capacity: 0.0, projects: 0, },
    { id: "ML", name: "Meghalaya", capacity: 0.0, projects: 0,  },
    { id: "MZ", name: "Mizoram", capacity: 0.0, projects: 0,  },
    { id: "NL", name: "Nagaland", capacity: 0.0, projects: 0, },
    { id: "OR", name: "Odisha", capacity: 3.5, projects: 3, },
    { id: "PB", name: "Punjab", capacity: 9.7, projects: 8,  },
    { id: "RJ", name: "Rajasthan", capacity: 82.6, projects: 18, },
    { id: "SK", name: "Sikkim", capacity: 0.0, projects: 0,  },
    { id: "TN", name: "Tamil Nadu", capacity: 33.0, projects: 21, },
    { id: "TG", name: "Telangana", capacity: 19.7, projects: 9,  },
    { id: "TR", name: "Tripura", capacity: 0.0, projects: 0, },
    { id: "UP", name: "Uttar Pradesh", capacity: 40.5, projects: 17,  },
    { id: "UK", name: "Uttarakhand", capacity: 2.3, projects: 2,  },
    { id: "WB", name: "West Bengal", capacity: 5.3, projects: 4,  },
    { id: "DL", name: "Delhi", capacity: 8.5, projects: 7, },
    { id: "JK", name: "Jammu and Kashmir", capacity: 0.1, projects: 1,  },
  ]

    // Dynamically calculate category
    const statesData: StateData[] = data.mapSectionCollection.items.map((state:any) => ({
      ...state,
      category: getCategoryByCapacity(state.capacity),
    }))

  // Calculate total capacity and active states
  const totalCapacity = statesData.reduce((sum, state) => sum + state.capacity, 0)
  const totalProjects = statesData.reduce((sum, state) => sum + state.projects, 0)
  const activeStates = statesData.filter((state) => state.capacity > 0).length

  // Animate counters when section is in view
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let capacityTimer: NodeJS.Timeout | null = null
    let projectsTimer: NodeJS.Timeout | null = null
    let statesTimer: NodeJS.Timeout | null = null

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          // Animate capacity counter
          const capacityDuration = 2000 // 2 seconds
          const capacityInterval = 20 // Update every 20ms
          const capacitySteps = capacityDuration / capacityInterval
          const capacityIncrement = totalCapacity / capacitySteps
          let currentCapacity = 0

          capacityTimer = setInterval(() => {
            currentCapacity += capacityIncrement
            if (currentCapacity >= totalCapacity) {
              currentCapacity = totalCapacity
              clearInterval(capacityTimer!)
            }
            setAnimatedCapacity(currentCapacity)
          }, capacityInterval)

          // Animate projects counter
          const projectsDuration = 1500 // 1.5 seconds
          const projectsInterval = 30 // Update every 30ms
          const projectsSteps = projectsDuration / projectsInterval
          const projectsIncrement = totalProjects / projectsSteps
          let currentProjects = 0

          projectsTimer = setInterval(() => {
            currentProjects += projectsIncrement
            if (currentProjects >= totalProjects) {
              currentProjects = totalProjects
              clearInterval(projectsTimer!)
            }
            setAnimatedProjects(Math.floor(currentProjects))
          }, projectsInterval)

          // Animate states counter
          const statesDuration = 1000 // 1 second
          const statesInterval = 50 // Update every 50ms
          const statesSteps = statesDuration / statesInterval
          const statesIncrement = activeStates / statesSteps
          let currentStates = 0

          statesTimer = setInterval(() => {
            currentStates += statesIncrement
            if (currentStates >= activeStates) {
              currentStates = activeStates
              clearInterval(statesTimer!)
            }
            setAnimatedStates(Math.floor(currentStates))
          }, statesInterval)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current && observer) {
        observer.unobserve(sectionRef.current)
      }
      if (capacityTimer) clearInterval(capacityTimer)
      if (projectsTimer) clearInterval(projectsTimer)
      if (statesTimer) clearInterval(statesTimer)
      observer = null
    }
  }, [totalCapacity, totalProjects, activeStates])

  const handleStateClick = (stateId: string) => {
    const stateData = statesData.find((state) => state.id === stateId)
    if (stateData) {
      // Only update if it's different from current selection
      if (!selectedState || selectedState.id !== stateId) {
        setSelectedState(stateData)
      }
    } else {
      setSelectedState(null)
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "veryHigh":
        return "> 40 MWp"
      case "high":
        return "20 - 40 MWp"
      case "medium":
        return "10 - 20 MWp"
      case "low":
        return "5 - 10 MWp"
      case "veryLow":
        return ">0 - 5 MWp"
      default:
        return "0 MWp"
    }
  }

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  <span className="text-[#f47920]">Footprints</span>{" "}
                  <span className="text-[#1e3a6e]">of Transformation</span>
                </h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                With a strong presence across the country—from <strong>north to south, east to west</strong>—we're
                driving India toward a greener, more sustainable future.
              </p>
              <div className="mb-6 sm:mb-8">
                <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
                  In just 6 years, we've delivered over{" "}
                  <span className="text-[#f47920] font-bold text-lg sm:text-xl">
                    <span className="tabular-nums">{animatedCapacity.toFixed(1)}</span> MW
                  </span>{" "}
                  of on-site and off-site renewable energy solutions through{" "}
                  <span className="text-[#f47920] font-bold text-lg sm:text-xl">
                    <span className="tabular-nums">{animatedProjects}</span> projects
                  </span>{" "}
                  across{" "}
                  <span className="text-[#f47920] font-bold text-lg sm:text-xl">
                    <span className="tabular-nums">{animatedStates}</span> states
                  </span>{" "}
                  in India.
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  This milestone is a testament to our <span className="text-[#1e3a6e] font-bold">deep expertise</span>{" "}
                  in helping businesses across India, no matter where they're located.
                </p>
              </div>

              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-[#1e3a6e] mb-3 sm:mb-4">Capacity Legend (MWp)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 mr-2 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">0 MWp</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#8ecae6] mr-2 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">&gt;0 - 5 MWp</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#219ebc] mr-2 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">5 - 10 MWp</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#023e8a] mr-2 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">10 - 20 MWp</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#03045e] mr-2 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">20 - 40 MWp</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#f47920] mr-2 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">&gt; 40 MWp</span>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {selectedState && (
                  <motion.div
                    key={selectedState.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-md"
                  >
                    <div className=" justify-between items-start gap-4 ">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1e3a6e] mb-2">{selectedState.name}</h3>
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="text-gray-500 text-sm sm:text-base">Capacity:</span>
                            <span className="sm:ml-2 text-[#f47920] font-bold text-base sm:text-lg">{selectedState.capacity} MWp</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="text-gray-500 text-sm sm:text-base">Projects:</span>
                            <span className="sm:ml-2 font-medium text-sm sm:text-base">{selectedState.projects}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="text-gray-500 text-sm sm:text-base">Category:</span>
                            <span className="sm:ml-2 font-medium text-sm sm:text-base">{getCategoryLabel(selectedState.category)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedState(null)}
                        className="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1"
                        aria-label="Close"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden rounded-lg order-first lg:order-last">
            <OptimizedIndiaMap
              key={typeof window !== "undefined" ? window.location.pathname : "map"}
              statesData={statesData}
              onStateClick={handleStateClick}
              selectedState={selectedState?.id}
            />
            <MapInfoOverlay />
          </div>
        </div>
      </div>
    </section>
  )
}
