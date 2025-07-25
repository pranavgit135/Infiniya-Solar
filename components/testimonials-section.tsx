"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  designation: string
  company: string
  rating: number
  videoId: string
  photoUrl: any
  thambnailUrl: any
  duration: string
  year: number
}

export default function TestimonialsSection({ data }: { data: any }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Sample testimonial data
  const testimonials: Testimonial[] =data.testimonialsSectionCollection.items
  // const testimonial: Testimonial[] = [
  //   {
  //     id: "1",
  //     name: "Rajesh Kumar",
  //     designation: "Chief Sustainability Officer",
  //     company: "Global Industries Ltd.",
  //     rating: 5,
  //     videoId: "dQw4w9WgXcQ",
  //     photoUrl: "/confident-businessman.png",
  //     thumbnailUrl: "/testimonial-thumbnail-1.png",
  //     duration: "2:45",
  //     year: 2023,
  //   },
  //   {
  //     id: "2",
  //     name: "Priya Sharma",
  //     designation: "Head of Operations",
  //     company: "EcoTech Solutions",
  //     rating: 4.5,
  //     videoId: "C0DPdy98e4c",
  //     photoUrl: "/confident-professional.png",
  //     thumbnailUrl: "/testimonial-thumbnail-2.png",
  //     duration: "1:58",
  //     year: 2023,
  //   },
  //   {
  //     id: "3",
  //     name: "Amit Patel",
  //     designation: "Facility Manager",
  //     company: "Sunrise Manufacturing",
  //     rating: 5,
  //     videoId: "M7lc1UVf-VE",
  //     photoUrl: "/confident-indian-entrepreneur.png",
  //     thumbnailUrl: "/testimonial-thumbnail-3.png",
  //     duration: "3:12",
  //     year: 2022,
  //   },
  //   {
  //     id: "4",
  //     name: "Sunita Reddy",
  //     designation: "CEO",
  //     company: "GreenPath Enterprises",
  //     rating: 4.5,
  //     videoId: "eI_q1dT_bKA",
  //     photoUrl: "/confident-leader.png",
  //     thumbnailUrl: "/testimonial-thumbnail-4.png",
  //     duration: "2:24",
  //     year: 2022,
  //   },
  //   {
  //     id: "5",
  //     name: "Vikram Singh",
  //     designation: "Director of Sustainability",
  //     company: "Future Technologies",
  //     rating: 5,
  //     videoId: "rfscVS0vtbw",
  //     photoUrl: "/confident-professional.png",
  //     thumbnailUrl: "/testimonial-thumbnail-5.png",
  //     duration: "3:45",
  //     year: 2021,
  //   },
  //   {
  //     id: "6",
  //     name: "Ananya Desai",
  //     designation: "Head of Engineering",
  //     company: "Renewable Energy Corp",
  //     rating: 5,
  //     videoId: "dQw4w9WgXcQ",
  //     photoUrl: "/confident-professional.png",
  //     thumbnailUrl: "/testimonial-thumbnail-1.png",
  //     duration: "2:15",
  //     year: 2023,
  //   },
  //   {
  //     id: "7",
  //     name: "Rahul Mehta",
  //     designation: "Operations Director",
  //     company: "Green Solutions Ltd",
  //     rating: 4.5,
  //     videoId: "C0DPdy98e4c",
  //     photoUrl: "/confident-businessman.png",
  //     thumbnailUrl: "/testimonial-thumbnail-2.png",
  //     duration: "3:05",
  //     year: 2023,
  //   },
  //   {
  //     id: "8",
  //     name: "Neha Gupta",
  //     designation: "Sustainability Manager",
  //     company: "EcoFriendly Industries",
  //     rating: 5,
  //     videoId: "M7lc1UVf-VE",
  //     photoUrl: "/confident-leader.png",
  //     thumbnailUrl: "/testimonial-thumbnail-3.png",
  //     duration: "2:38",
  //     year: 2022,
  //   },
  //   {
  //     id: "9",
  //     name: "Kiran Shah",
  //     designation: "Chief Technology Officer",
  //     company: "Solar Innovations",
  //     rating: 4.5,
  //     videoId: "eI_q1dT_bKA",
  //     photoUrl: "/confident-indian-entrepreneur.png",
  //     thumbnailUrl: "/testimonial-thumbnail-4.png",
  //     duration: "1:52",
  //     year: 2021,
  //   },
  // ]

  // Place this after the testimonials array declaration
  const mobileSlidesData = testimonials;
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Organize testimonials into slides of 4 cards each
  const slidesData = useMemo(() => {
    // Sort testimonials by year (newest first)
    const sortedTestimonials = [...testimonials].sort((a, b) => b.year - a.year)

    // Group into slides of 4
    const slides = []
    const cardsPerSlide = 3

    for (let i = 0; i < sortedTestimonials.length; i += cardsPerSlide) {
      slides.push(sortedTestimonials.slice(i, i + cardsPerSlide))
    }

    return slides
  }, [testimonials])

  // Navigate to previous slide
  const prevSlide = () => {
    setActiveSlideIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1))
  }

  // Navigate to next slide
  const nextSlide = () => {
    setActiveSlideIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1))
  }

  // Go to specific slide
  const goToSlide = (index: number) => {
    // console.log(index)
    setActiveSlideIndex(index)
  }

  // Navigation handlers
  const prevMobile = () => {
    setActiveMobileIndex((prev) => (prev === 0 ? mobileSlidesData.length - 1 : prev - 1));
  };
  const nextMobile = () => {
    setActiveMobileIndex((prev) => (prev === mobileSlidesData.length - 1 ? 0 : prev + 1));
  };

  // Render star ratings
  const renderRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-[#f47920] text-[#f47920]" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-[#f47920] text-[#f47920]" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  // console.log(slidesData)

  return (
    <section className="py-20 bg-white px-4 sm:px-8 md:px-16 lg:px-28">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold mb-4">
            <span className="text-[#1e3a6e]">What Our </span>
            <span className="text-[#f47920]">Customers Say</span>
          </h2>
          <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#1e3a6e] mb-6">Testimonials</h3>
          <p className="text-gray-600 max-w-2xl md:max-w-4xl mx-auto text-base xl:text-lg">
            Hear from our clients about their experience with our renewable energy solutions.
          </p>
        </div>

        <div className="flex justify-end items-center">
          {/* <h3 className="text-2xl font-bold text-[#1e3a6e]">Client Success Stories</h3> */}
          <div className="flex space-x-4">
            <button
              onClick={isMobile ? prevMobile : prevSlide}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={isMobile ? nextMobile : nextSlide}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden" ref={sliderRef}>
          {isMobile ? (
            <div className=" mx-2">
              <motion.div
                key={mobileSlidesData[activeMobileIndex].id}
                className="bg-white rounded-lg shadow-lg overflow-hidden h-auto flex flex-col"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                onHoverStart={() => setHoveredCard(mobileSlidesData[activeMobileIndex].id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div className="relative w-full aspect-[16/9] bg-black">
                  {hoveredCard === mobileSlidesData[activeMobileIndex].id || isMobile ? (
                    <iframe
                      className="w-full h-full absolute inset-0"
                      src={`https://www.youtube.com/embed/${mobileSlidesData[activeMobileIndex].videoId}?autoplay=${hoveredCard === mobileSlidesData[activeMobileIndex].id ? 1 : 0}&mute=1`}
                      title={`Testimonial from ${mobileSlidesData[activeMobileIndex].name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full relative">
                      <Image
                        src={mobileSlidesData[activeMobileIndex].thambnailUrl.url || "/placeholder.svg"}
                        alt={`Testimonial video thumbnail for ${mobileSlidesData[activeMobileIndex].name}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-[#f47920]/80 flex items-center justify-center mx-auto mb-2">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <p className="text-sm text-white">Hover to play</p>
                        </div>
                      </div>
                      {/* Duration indicator */}
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white font-medium">
                        {mobileSlidesData[activeMobileIndex].duration}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        <Image
                          src={mobileSlidesData[activeMobileIndex].photoUrl.url || "/placeholder.svg"}
                          alt={mobileSlidesData[activeMobileIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-[#1e3a6e] text-sm truncate">{mobileSlidesData[activeMobileIndex].name}</h4>
                        <p className="text-xs text-gray-600 truncate">
                          {mobileSlidesData[activeMobileIndex].designation}, {mobileSlidesData[activeMobileIndex].company}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-2 py-1 rounded text-xs text-gray-500 inline-block mb-2">
                      {mobileSlidesData[activeMobileIndex].year}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="flex flex-nowrap gap-6 my-5 mx-10"
              initial={{ x: 0 }}
              animate={{ x: `-${activeSlideIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {slidesData.map((slide, slideIndex) => (
                <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {slide.map((testimonial) => (
                    <motion.div key={testimonial.id} className="bg-white rounded-lg shadow-lg overflow-hidden h-auto flex flex-col" whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }} onHoverStart={() => setHoveredCard(testimonial.id)} onHoverEnd={() => setHoveredCard(null)}>
                      <div className="relative w-full aspect-[16/9] bg-black">
                        {hoveredCard === testimonial.id || isMobile ? (
                          <iframe
                            className="w-full h-full absolute inset-0"
                            src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=${hoveredCard === testimonial.id ? 1 : 0}&mute=1`}
                            title={`Testimonial from ${testimonial.name}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="w-full h-full relative">
                            <Image
                              src={testimonial.thambnailUrl.url || "/placeholder.svg"}
                              alt={`Testimonial video thumbnail for ${testimonial.name}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors">
                              <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-[#f47920]/80 flex items-center justify-center mx-auto mb-2">
                                  <svg
                                    className="w-8 h-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                                <p className="text-sm text-white">Hover to play</p>
                              </div>
                            </div>
                            {/* Duration indicator */}
                            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white font-medium">
                              {testimonial.duration}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center mb-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                              <Image
                                src={testimonial.photoUrl.url || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-[#1e3a6e] text-sm truncate">{testimonial.name}</h4>
                              <p className="text-xs text-gray-600 truncate">
                                {testimonial.designation}, {testimonial.company}
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-2 py-1 rounded text-xs text-gray-500 inline-block mb-2">
                            {testimonial.year}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center space-x-2 ">
          {isMobile
            ? mobileSlidesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMobileIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeMobileIndex ? "bg-[#f47920] w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeMobileIndex ? "true" : "false"}
                />
              ))
            : slidesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSlideIndex ? "bg-[#f47920] w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeSlideIndex ? "true" : "false"}
                />
              ))}
        </div>

        {/* Slide counter */}
        <div className="text-center mt-4 text-sm text-gray-500">
          {isMobile
            ? <><span className="font-medium">{activeMobileIndex + 1}</span> of <span>{mobileSlidesData.length}</span></>
            : <><span className="font-medium">{activeSlideIndex + 1}</span> of <span>{slidesData.length}</span></>
          }
        </div>
      </div>
    </section>
  )
}
