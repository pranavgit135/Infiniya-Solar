"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface CultureItemProps {
  
iconame:any
  title: string
  description: string
  isVisible?: boolean
  isAlternate?: boolean
}

function CultureItem({ iconame, title, description, isVisible = false, isAlternate = false }: CultureItemProps) {
  return (
    <div
      className={`p-6 border border-gray-200 transition-all duration-300 ${
        isAlternate ? "bg-gray-50" : "bg-white"
      } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <div className="flex items-center mb-4">
        <Image src={iconame.url || "/placeholder.svg"} alt={title} width={48} height={48} className="mr-4" />
        <h3 className="text-xs lg:text-sm xl:text-lg  font-semibold text-primary">{title}</h3>
      </div>
      <p className="text-gray-600 text-xs lg:text-sm xl:text-lg ">{description}</p>
    </div>
  )
}

export default function CultureSection({ about }: { about: any }) {
const cultureItems = about.cultureSectionCollection.items
  // const cultureItems = [
  //   {
  //     icon: "/icons/office-culture.png",
  //     title: "Open Office Culture",
  //     description: "Transparent workspaces.",
  //   },
  //   {
  //     icon: "/icons/flat-hierarchy.png",
  //     title: "Flat Hierarchy",
  //     description: "Approachable leadership.",
  //   },
  //   {
  //     icon: "/icons/flexible-hours.png",
  //     title: "Flexible Hours",
  //     description: "Supporting your lifestyle.",
  //   },
  //   {
  //     icon: "/icons/diversity.png",
  //     title: "Diversity & Inclusion",
  //     description: "Inclusive Environment.",
  //   },
  //   {
  //     icon: "/icons/young-leaders.png",
  //     title: "Young Leaders Program",
  //     description: "Growth Opportunities.",
  //   },
  //   {
  //     icon: "/icons/collaborative.png",
  //     title: "Collaborative Spirit",
  //     description: "Fostering Connections",
  //   },
  //   {
  //     icon: "/icons/recognition.png",
  //     title: "Instant Recognition",
  //     description: "Celebrating Achievements",
  //   },
  //   {
  //     icon: "/icons/work-life.png",
  //     title: "Work-Life Harmony",
  //     description: "Balanced Lifestyle",
  //   },
  // ]

  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section ref={sectionRef} className="py-16 px-10 md:px-32 xl:px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="xl:text-4xl text-2xl font-bold text-amplusBlue mb-4">Dynamic Culture, Extraordinary Opportunities</h2>
          <p className="xl:text-xl text-lg text-gray-600 max-w-3xl mx-auto">
            Experience a dynamic culture and thrive in a supportive environment where efforts are recognised and
            work-life harmony is valued.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 ${isVisible ? "culture-grid" : ""}`}>
          {cultureItems.map((item:any, index:number) => {
            // Calculate row and column based on index and grid layout
            const row = Math.floor(index / 4)
            const col = index % 4
            // Checkerboard pattern: alternate based on sum of row and column indices
            const isAlternate = (row + col) % 2 === 1

            return <CultureItem key={index} {...item} isVisible={isVisible} isAlternate={isAlternate} />
          })}
        </div>
      </div>
    </section>
  )
}
