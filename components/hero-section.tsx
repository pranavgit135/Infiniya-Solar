"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Solar panels field"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1e3a6e]/60" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.3,
              },
            },
          }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Amplus-Trusted Clean Energy Partner</h1>
          <p className="text-xl md:text-2xl mb-8">Spearheading the Clean Energy Transition in India</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 1,
              },
            }}
          >
            <a
              href="#about"
              className="bg-[#f47920] hover:bg-[#e06a10] text-white px-6 py-3 rounded-md inline-block transition-colors"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
