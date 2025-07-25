"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Info } from "lucide-react"
import AwardModal, { type AwardDetails } from "./award-modal"

interface AwardProps {
  award: AwardDetails
  isVisible?: boolean
  delay: number
  onClick: () => void
}

function Award({ award, isVisible = false, delay, onClick }: AwardProps) {
  return (
    <div
      className={`flex flex-col items-center transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div
        className="relative w-full h-64 mb-4 overflow-hidden group cursor-pointer"
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`View details about ${award.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick()
          }
        }}
      >
        <Image
          src={award.image.url || "/placeholder.svg"}
          alt={award.title}
          fill
          className="object-contain transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Info className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
      <h3 className="xl:text-xl text-lg font-semibold text-primary text-center mb-2">{award.title}</h3>
      <p className="text-gray-700 text-center">{award.description}</p>
    </div>
  )
}

export default function WorkLifeBalanceSection({ about }: { about: any }) {
  const awards :AwardDetails[] = about.workLifeBalanceSectionCollection.items
  // const awards: AwardDetails[] = [
  //   {
  //     image: "/images/great-place-to-work.png",
  //     title: "Great Place to Work Certified",
  //     description: "Feb 2024 - Feb 2025 India",
  //     fullTitle: "Great Place to Work® Certified™",
  //     awardedBy: "Great Place to Work® Institute",
  //     awardedDate: "February 2024 - February 2025",
  //     criteria: [
  //       "Trust Index© Employee Survey measuring employee experience",
  //       "Culture Audit© assessment of leadership and HR practices",
  //       "Evaluation of workplace culture and employee engagement",
  //       "Assessment of diversity, inclusion, and belonging initiatives",
  //     ],
  //     achievement:
  //       "Amplus has been recognized as a workplace that fosters a culture of trust, respect, and fairness. This certification acknowledges our commitment to creating an environment where employees can thrive professionally and personally.",
  //     quote: {
  //       text: "This certification reflects our ongoing commitment to creating a workplace where every employee feels valued, heard, and empowered to grow.",
  //       author: "Sharad Pungalia",
  //       position: "CEO, Amplus Solar",
  //     },
  //   },
  //   {
  //     image: "/images/hr-asia-award.png",
  //     title: "HR Asia Award 2021",
  //     description: "for exceptional HR practices",
  //     fullTitle: "HR Asia Best Companies to Work for in Asia 2021",
  //     awardedBy: "HR Asia",
  //     awardedDate: "November 2021",
  //     criteria: [
  //       "Total Engagement Assessment Model (TEAM) survey",
  //       "Employee engagement and satisfaction metrics",
  //       "Workplace culture and environment assessment",
  //       "HR policies and practices evaluation",
  //     ],
  //     achievement:
  //       "Amplus was recognized among the best companies to work for in Asia, highlighting our exceptional human resource practices and employee-centric approach to business.",
  //     quote: {
  //       text: "This award validates our efforts to create a workplace that prioritizes employee well-being and professional growth while fostering innovation and collaboration.",
  //       author: "Priya Sharma",
  //       position: "Head of HR, Amplus Solar",
  //     },
  //   },
  //   {
  //     image: "/images/cii-award.png",
  //     title: "CII Award for Best",
  //     description: "Employee Relations and Engagement",
  //     fullTitle: "CII National HR Circle Competition 2018 - Best Employee Relations and Engagement",
  //     awardedBy: "Confederation of Indian Industry (CII)",
  //     awardedDate: "September 2018",
  //     criteria: [
  //       "Employee engagement strategies and implementation",
  //       "Workplace communication effectiveness",
  //       "Conflict resolution mechanisms",
  //       "Work-life balance initiatives",
  //       "Employee recognition programs",
  //     ],
  //     achievement:
  //       "Amplus was recognized for excellence in fostering positive employee relations and implementing effective engagement strategies that contribute to organizational success and employee satisfaction.",
  //     quote: {
  //       text: "Our focus on building meaningful relationships with our employees and creating channels for open communication has been key to our success in fostering a positive workplace culture.",
  //       author: "Sanjeev Kumar",
  //       position: "Director of Operations, Amplus Solar",
  //     },
  //   },
  // ]

  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedAward, setSelectedAward] = useState<AwardDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (award: AwardDetails) => {
    setSelectedAward(award)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

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
        rootMargin: "0px 0px -100px 0px",
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
    <section ref={sectionRef} className="py-16 px-10 md:px-32 xl:px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="xl:text-4xl text-2xl font-bold text-amplusBlue mb-4">Enjoy the Work-Life Balance at Amplus</h2>
          <p className="text-xs lg:text-sm xl:text-lg  text-gray-600 max-w-4xl mx-auto">
            We are committed to fostering a supportive environment where you can thrive professionally while enjoying
            meaningful personal pursuits. Experience the best of both worlds at Amplus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <Award
              key={index}
              award={award}
              isVisible={isVisible}
              delay={index * 200} // Stagger the animations
              onClick={() => openModal(award)}
            />
          ))}
        </div>
      </div>

      {/* Award Detail Modal */}
      <AwardModal award={selectedAward} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
