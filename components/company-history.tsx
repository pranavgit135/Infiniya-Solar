"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface MilestoneProps {
  year: string
  title: string
  description: string
  delay: number
}

function Milestone({ year, title, description, delay }: MilestoneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative pl-8 pb-10 border-l border-gray-200 last:border-0 last:pb-0"
    >
      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#f47920]"></div>
      <div className="bg-[#1e3a6e]/10 px-4 py-1 rounded-full inline-block mb-2 text-sm font-medium text-[#1e3a6e]">
        {year}
      </div>
      <h3 className="text-xl font-semibold text-[#1e3a6e] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

export default function CompanyHistory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const milestones = [
    {
      year: "2015",
      title: "Amplus Solar Founded",
      description:
        "Amplus Solar was established with a vision to accelerate the adoption of clean energy solutions across India.",
      delay: 0.1,
    },
    {
      year: "2016",
      title: "First Major Project",
      description:
        "Completed our first major solar installation project of 30MW, establishing our presence in the renewable energy sector.",
      delay: 0.2,
    },
    {
      year: "2019",
      title: "Acquired by PETRONAS",
      description:
        "Amplus was acquired by PETRONAS (Petroliam Nasional Berhad), Malaysia's integrated energy company, strengthening our capabilities and reach.",
      delay: 0.3,
    },
    {
      year: "2021",
      title: "Reached 500MW Milestone",
      description:
        "Achieved a significant milestone of 500MW of solar capacity across multiple states in India, serving over 200 clients.",
      delay: 0.4,
    },
    {
      year: "2023",
      title: "Expanded Service Portfolio",
      description:
        "Expanded our offerings to include battery storage, energy efficiency solutions, and electric mobility infrastructure.",
      delay: 0.5,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#1e3a6e]">Our </span>
            <span className="text-[#f47920]">Journey</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From our humble beginnings to becoming one of India's leading renewable energy companies, our journey has
            been defined by innovation, excellence, and a commitment to sustainability.
          </p>
        </div>

        <div ref={ref} className="max-w-3xl mx-auto">
          {milestones.map((milestone, index) => (
            <Milestone
              key={index}
              year={milestone.year}
              title={milestone.title}
              description={milestone.description}
              delay={milestone.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
