"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

export default function ContactCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-20 bg-slate-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Clean Energy Journey?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Contact us today to learn how Amplus Solar can help your business reduce carbon footprint and achieve
            sustainability goals with our clean energy solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact-us"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md inline-block transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border border-white hover:bg-white hover:text-slate-800 text-white px-8 py-3 rounded-md inline-block transition-colors"
            >
              View Our Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
