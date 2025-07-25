"use client"

import { useState } from "react"
import { Info, X } from "lucide-react"

export default function MapInfoOverlay() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10 "
        aria-label="Show map information"
      >
        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#1e3a6e] " />
      </button>
    )
  }

  return (
    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white rounded-lg shadow-md p-3 sm:p-4 max-w-[280px] sm:max-w-xs z-10 hidden md:block">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-[#1e3a6e] text-sm sm:text-base">Interactive Map</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 ml-2"
          aria-label="Close information"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed">
        This interactive map shows Amplus Solar's presence across India. Click on states to see detailed information.
      </p>
      <ul className="text-xs text-gray-600 space-y-1">
        <li className="flex items-center">
          <span className="w-2 h-2 bg-[#f47920] rounded-full mr-2 flex-shrink-0"></span>
          <span className="text-xs leading-tight">States with highest capacity (&gt;40 MWp)</span>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-[#03045e] rounded-full mr-2 flex-shrink-0"></span>
          <span className="text-xs leading-tight">States with high capacity (20-40 MWp)</span>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-[#023e8a] rounded-full mr-2 flex-shrink-0"></span>
          <span className="text-xs leading-tight">States with medium capacity (10-20 MWp)</span>
        </li>
      </ul>
    </div>
  )
}
