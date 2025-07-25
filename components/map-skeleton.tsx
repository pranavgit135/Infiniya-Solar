"use client"

import { motion } from "framer-motion"

export default function MapSkeleton() {
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden relative">
      {/* Shimmer effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        animate={{
          x: ["calc(-100%)", "calc(100%)"],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <svg
        viewBox="0 0 600 600"
        className="w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Simplified outline of India */}
        <path
          d="M300,150 C320,140 350,145 370,130 C390,115 410,100 430,110 C450,120 460,140 470,160 
             C480,180 490,200 480,220 C470,240 450,250 440,270 C430,290 425,310 430,330 
             C435,350 450,365 445,385 C440,405 420,415 405,430 C390,445 380,465 360,475 
             C340,485 315,480 290,485 C265,490 240,500 220,485 C200,470 195,445 180,425 
             C165,405 140,395 130,375 C120,355 125,330 120,310 C115,290 100,275 110,255 
             C120,235 145,230 165,215 C185,200 195,175 215,160 C235,145 260,150 280,155 C300,160 280,160 300,150z"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="2"
        />

        {/* Add some state boundaries as simple lines to suggest map detail */}
        <path
          d="M300,250 L400,300 M250,300 L350,350 M200,250 L300,200 M350,200 L400,250"
          stroke="#9ca3af"
          strokeWidth="1"
          fill="none"
        />

        {/* Add some dots to represent major cities/data points */}
        <circle cx="250" cy="200" r="5" fill="#9ca3af" />
        <circle cx="350" cy="250" r="5" fill="#9ca3af" />
        <circle cx="300" cy="350" r="5" fill="#9ca3af" />
        <circle cx="200" cy="300" r="5" fill="#9ca3af" />
        <circle cx="400" cy="300" r="5" fill="#9ca3af" />
      </svg>

      {/* Legend skeleton */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Zoom controls skeleton */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  )
}
