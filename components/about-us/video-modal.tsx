"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import Spinner from "./spinner"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  videoTitle: string
}

export default function VideoModal({ isOpen, onClose, videoUrl, videoTitle }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
      // Reset loading state when modal opens
      setIsLoading(true)
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

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="video-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 id="video-modal-title" className="text-lg font-semibold text-primary">
            {videoTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="relative pt-[56.25%] bg-gray-100">
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <Spinner className="text-secondary" />
            </div>
          )}

          {/* Video iframe */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={videoUrl}
            title={videoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>
    </div>
  )
}
