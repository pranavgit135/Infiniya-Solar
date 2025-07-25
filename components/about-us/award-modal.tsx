"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export interface AwardDetails {
  image: any
  title: string
  description: string
  fullTitle?: string
  awardedBy?: string
  awardedDate?: string
  criteria?: string[]
  achievement?: string
  quote?: {
    text: string
    author: string
    position: string
  }
}

interface AwardModalProps {
  award: AwardDetails | null
  isOpen: boolean
  onClose: () => void
}

export default function AwardModal({ award, isOpen, onClose }: AwardModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "" // Restore scrolling when modal is closed
    }
  }, [isOpen, onClose])

  // Handle clicks outside the modal content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!isOpen || !award) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="award-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 id="award-modal-title" className="text-xl font-semibold text-primary">
            {award.fullTitle || award.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative w-full aspect-square">
                <Image src={award.image.url || "/placeholder.svg"} alt={award.title} fill className="object-contain" />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-900">About this Award</h4>
                <p className="text-gray-700 mt-2">{award.description}</p>
              </div>

              {award.awardedBy && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Awarded By</h4>
                  <p className="text-gray-700">{award.awardedBy}</p>
                </div>
              )}

              {award.awardedDate && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Date Awarded</h4>
                  <p className="text-gray-700">{award.awardedDate}</p>
                </div>
              )}

              {award.criteria && award.criteria.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Award Criteria</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-700">
                    {award.criteria.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {award.achievement && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Achievement</h4>
                  <p className="text-gray-700 mt-2">{award.achievement}</p>
                </div>
              )}
            </div>
          </div>

          {award.quote && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <blockquote className="italic text-gray-700">"{award.quote.text}"</blockquote>
              <div className="mt-2 text-right">
                <p className="font-medium text-gray-900">{award.quote.author}</p>
                <p className="text-sm text-gray-600">{award.quote.position}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
