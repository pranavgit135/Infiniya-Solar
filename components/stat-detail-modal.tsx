"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

export interface StatDetail {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  details: {
    longDescription: string
    bulletPoints: string[]
    image?: string
    chart?: string
    additionalMetric?: {
      label: string
      value: string
    }
  }
}

interface StatDetailModalProps {
  isOpen: boolean
  onClose: () => void
  stat: StatDetail | null
}

export default function StatDetailModal({ isOpen, onClose, stat }: StatDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!stat) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="bg-[#1e3a6e]/20 p-3 rounded-full mr-4">
                  <div className="text-[#f47920]">{stat.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1e3a6e]">{stat.title}</h3>
                  <p className="text-2xl font-bold text-[#f47920]">{stat.value}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <p className="text-gray-700 mb-6">{stat.details.longDescription}</p>

              {stat.details.image && (
                <div className="mb-6 relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={stat.details.image || "/placeholder.svg"}
                    alt={`${stat.title} visualization`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {stat.details.chart && (
                <div className="mb-6 relative h-64 rounded-lg overflow-hidden bg-gray-50 p-4">
                  <Image
                    src={stat.details.chart || "/placeholder.svg"}
                    alt={`${stat.title} chart`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {stat.details.additionalMetric && (
                <div className="mb-6 bg-[#1e3a6e]/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">{stat.details.additionalMetric.label}</p>
                  <p className="text-xl font-bold text-[#1e3a6e]">{stat.details.additionalMetric.value}</p>
                </div>
              )}

              <h4 className="font-semibold text-lg text-[#1e3a6e] mb-3">Key Highlights</h4>
              <ul className="space-y-2 mb-6">
                {stat.details.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-[#f47920] mr-2 mt-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#1e3a6e] text-white rounded-md hover:bg-[#1e3a6e]/90 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
