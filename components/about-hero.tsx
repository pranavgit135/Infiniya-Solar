"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/rooftop-solar-blue-sky.png" alt="Amplus Solar facilities" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#1e3a6e]/60" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About Amplus Solar</h1>
          <p className="text-xl md:text-2xl mb-8">
            Leading India's transition to clean and sustainable energy solutions
          </p>
        </motion.div>
      </div>
    </section>
  )
}
