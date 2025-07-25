"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import VideoModal from "./video-modal"

export default function VideoSection({ about }: { about: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // YouTube embed URL with additional parameters for better loading
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"

  return (
    <section className="relative overflow-hidden md:px-20 xl:px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/solar-wind-background.png"
          alt="Solar panels and wind turbines"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>

      {/* Wave Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#f47920"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 md:mx-auto max-w-7xl  px-4 py-24 md:py-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
          <h2 className="xl:text-3xl text-2xl font-bold text-white mb-6">{about.videoSectionCollection.items[0].title}</h2>
          <p className="text-white/90 xl:text-lg text-base mb-8">
          {about.videoSectionCollection.items[0].description}
          </p>
          <button
            className="bg-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-secondary transition-colors group relative overflow-hidden"
            onClick={openModal}
            aria-label="Play video about Amplus clean energy initiatives"
          >
            <div className="absolute inset-0 bg-secondary scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></div>
            <Play className="h-8 w-8 text-primary group-hover:text-white ml-1 relative z-10" fill="currentColor" />
          </button>
        </div>

        <div className="md:w-1/2 relative">
          <div className="relative">
            <Image
              src={about.videoSectionCollection.items[0].posterImage.url}
              alt={about.videoSectionCollection.items[0].posterTitle}
              width={500}
              height={500}
              className="rounded-lg"
            />
            <div className="absolute -bottom-2 right-0 z-20">
              <div className="bg-amplusBlue text-white px-6 py-2 font-bold">{about.videoSectionCollection.items[0].posterTitle}</div>
              <div className="bg-amplusOrange text-white px-6 py-2">{about.videoSectionCollection.items[0].posterdescription}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoUrl={about.videoSectionCollection.items[0].videoUrl}
        videoTitle="Amplus: Empowering the Future of Clean Energy"
      />
    </section>
  )
}
