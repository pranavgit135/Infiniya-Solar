"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useCountUp } from "@/hooks/use-count-up"
import StatDetailModal, { type StatDetail } from "./stat-detail-modal"

export default function AboutSection() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStat, setSelectedStat] = useState<StatDetail | null>(null)

  // Start animation when stats come into view
  const shouldAnimate = isStatsInView && !hasAnimated

  // Use the counting hook for each stat
  const portfolioCount = useCountUp({
    end: shouldAnimate ? 1.2 : 0,
    decimals: 1,
    suffix: "+",
    duration: 2500,
    onComplete: () => setHasAnimated(true),
  })

  const clientsCount = useCountUp({
    end: shouldAnimate ? 400 : 0,
    suffix: "+",
    duration: 2500,
  })

  const statesCount = useCountUp({
    end: shouldAnimate ? 14 : 0,
    suffix: "+",
    duration: 2500,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Define stat details
  const stats: StatDetail[] = [
    {
      title: "Portfolio",
      value: `${portfolioCount} GW`,
      description: "Total solar capacity",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      details: {
        longDescription:
          "Amplus Solar has built an impressive portfolio of over 1.2 GW of solar capacity across India, making us one of the leading renewable energy providers in the country. Our projects range from rooftop installations to large-scale solar farms, all contributing to India's clean energy transition.",
        bulletPoints: [
          "Over 800 MW of operational capacity across various states",
          "400+ MW of projects under development",
          "Mix of rooftop, ground-mounted, and floating solar installations",
          "Average project size has increased by 35% year-over-year",
          "Reduced carbon emissions equivalent to planting 20 million trees",
        ],
        image: "/vast-solar-array.png",
        chart: "/global-solar-growth.png",
        additionalMetric: {
          label: "Annual Clean Energy Generation",
          value: "1,500+ GWh",
        },
      },
    },
    {
      title: "Clients",
      value: `${clientsCount}`,
      description: "Satisfied customers",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      details: {
        longDescription:
          "We're proud to serve over 400 commercial and industrial clients across India, ranging from multinational corporations to local businesses. Our client-centric approach ensures that each solution is tailored to meet specific energy needs while maximizing cost savings and sustainability benefits.",
        bulletPoints: [
          "65% of clients are from manufacturing sector",
          "20% from commercial and retail",
          "15% from public sector and institutions",
          "Average client energy cost savings of 30-40%",
          "95% client retention rate with multiple expansion projects",
          "Client base has doubled in the last 3 years",
        ],
        image: "/boardroom-discussion.png",
        chart: "/client-industry-distribution.png",
        additionalMetric: {
          label: "Average Client Savings",
          value: "₹1.2 Crore Annually",
        },
      },
    },
    {
      title: "States in India",
      value: `${statesCount}`,
      description: "Geographic presence",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      details: {
        longDescription:
          "Amplus Solar has established a strong presence across 14+ states in India, from Maharashtra and Gujarat in the west to Tamil Nadu in the south, and from Rajasthan in the north to West Bengal in the east. Our nationwide footprint allows us to serve clients wherever they are located, with local teams providing responsive service and support.",
        bulletPoints: [
          "Highest capacity concentration in Maharashtra, Gujarat, and Rajasthan",
          "Rapidly expanding in southern states like Tamil Nadu and Karnataka",
          "Strategic presence in industrial hubs across the country",
          "Local teams in each major region for better client support",
          "Navigating diverse state policies and regulations for renewable energy",
          "Planning expansion to 5 additional states in the next 2 years",
        ],
        image: "/india-highlighted-states.png",
        additionalMetric: {
          label: "Largest State Presence",
          value: "Maharashtra (250+ MW)",
        },
      },
    },
  ]

  const handleStatClick = (stat: StatDetail) => {
    setSelectedStat(stat)
    setIsModalOpen(true)
  }

  return (
    <section id="about" className="py-20 bg-white px-4 sm:px-8 md:px-16 lg:px-28">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">About Amplus Solar</h2>
            <p className="text-lg text-gray-600 mb-6">
              Amplus empowers commercial and industrial clients with low-carbon energy solutions, offering clean power
              through on-site solar installations (rooftop and ground-mounted) and off-site solar farms (Open Access).
            </p>
            <p className="text-lg text-gray-600 mb-6">
              The company has further expanded its portfolio to provide a diverse range of clean energy solutions
              including solar, battery storage, energy efficiency, and electric mobility.
            </p>
            <div ref={statsRef} className="flex flex-wrap gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-[#1e3a6e]/10 p-4 rounded-lg flex items-center group transition-all duration-300 hover:bg-[#1e3a6e]/15 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => handleStatClick(stat)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details about ${stat.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleStatClick(stat)
                    }
                  }}
                >
                  <div className="bg-[#1e3a6e]/20 p-3 rounded-full mr-4 transition-all duration-300 group-hover:bg-[#1e3a6e]/30">
                    <motion.div
                      className="text-[#f47920]"
                      whileHover={
                        index === 0
                          ? { rotate: 360, transition: { duration: 0.6 } }
                          : index === 1
                            ? { scale: 1.2, transition: { duration: 0.3 } }
                            : {
                                y: [-2, 2, -2],
                                transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
                              }
                      }
                    >
                      {stat.icon}
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1e3a6e] group-hover:text-[#1e3a6e]/90">
                      <span className="tabular-nums transition-all duration-300">{stat.value}</span>
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-700">{stat.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/about-amplus.png"
                alt="Solar installation"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="PETRONAS logo"
                width={100}
                height={100}
                className="h-16 w-auto"
              />
              <p className="text-sm text-gray-600 mt-2">A member of PETRONAS Group</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal for displaying detailed stat information */}
      <StatDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} stat={selectedStat} />
    </section>
  )
}
