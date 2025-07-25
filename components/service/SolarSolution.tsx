"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

import { useState } from "react"


export default function SolarSolution() {
  const [activeToggle, setActiveToggle] = useState<string | null>("rooftop")
  const [showAdvanced, setShowAdvanced] = useState<{ [key: string]: boolean }>({})

  const toggleAdvanced = (section: string) => {
    setShowAdvanced((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen">
     

      

      {/* Customized Onsite Solar Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a6e] mb-6 leading-tight">
                Customized Onsite Solar Solutions for Your Clean Energy 
              </h2>
             
              <p className="text-lg text-gray-600 mb-8">
                Championing the clean energy transition with Onsite Solar Solutions
              </p>

              <div className="mb-8 space-y-4">
                {/* Rooftop Solar Toggle */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveToggle(activeToggle === "rooftop" ? null : "rooftop")}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-600">Rooftop Solar</h3>
                    <div className="text-blue-600">{activeToggle === "rooftop" ? "−" : "+"}</div>
                  </button>
                  {activeToggle === "rooftop" && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-600 mb-4">
                        Amplus Rooftop Solar Solutions can help transform your rooftop into a personal power plant. We
                        help you reduce reliance on the traditional grid and lower your electricity bills. Amplus
                        provides the rooftop solar solution at zero investment through a PPA agreement, where you can
                        avail electricity at a lower than grid tariff.
                      </p>
                      <p className="text-gray-600 mb-6">
                        Don't wait to take control of your energy—explore rooftop solar solutions today and start
                        gaining the benefits of clean, sustainable power.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full">
                          Know More
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => toggleAdvanced("rooftop")}
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          {showAdvanced.rooftop ? "Hide Advanced Options" : "Show Advanced Options"}
                        </Button>
                      </div>

                      {showAdvanced.rooftop && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-3">Advanced Rooftop Options:</h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Installation Types:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• Ballasted mounting systems</li>
                                <li>• Penetrating roof mounts</li>
                                <li>• Standing seam clamps</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Financing Options:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• Zero CAPEX PPA model</li>
                                <li>• OPEX leasing options</li>
                                <li>• Hybrid financing structures</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Technical Specifications:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• 1kW to 10MW+ capacity</li>
                                <li>• Monocrystalline panels</li>
                                <li>• 25-year performance warranty</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Monitoring & Maintenance:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• Real-time performance tracking</li>
                                <li>• Predictive maintenance alerts</li>
                                <li>• Remote diagnostics</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Ground Mount Toggle */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveToggle(activeToggle === "ground" ? null : "ground")}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-600">Ground Mount</h3>
                    <div className="text-blue-600">{activeToggle === "ground" ? "−" : "+"}</div>
                  </button>
                  {activeToggle === "ground" && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-600 mb-4">
                        Ground-mounted solar systems offer maximum flexibility and optimal positioning for solar panels.
                        Perfect for businesses with available land space, these systems can be designed for maximum
                        energy generation with ideal tilt angles and orientations.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full">
                          Know More
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => toggleAdvanced("ground")}
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          {showAdvanced.ground ? "Hide Advanced Options" : "Show Advanced Options"}
                        </Button>
                      </div>

                      {showAdvanced.ground && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-3">Advanced Ground Mount Options:</h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Mounting Systems:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• Fixed-tilt racking systems</li>
                                <li>• Single-axis tracking systems</li>
                                <li>• Dual-axis tracking systems</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Land Requirements:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• 4-5 acres per MW capacity</li>
                                <li>• Minimal shading requirements</li>
                                <li>• Soil analysis and preparation</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Capacity Range:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• 100kW to 100MW+ systems</li>
                                <li>• Scalable modular design</li>
                                <li>• Future expansion capability</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Environmental Benefits:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• Agrivoltaics compatibility</li>
                                <li>• Wildlife-friendly design</li>
                                <li>• Soil conservation features</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Floating Solar Toggle */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveToggle(activeToggle === "floating" ? null : "floating")}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-600">Floating Solar</h3>
                    <div className="text-blue-600">{activeToggle === "floating" ? "−" : "+"}</div>
                  </button>
                  {activeToggle === "floating" && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-600 mb-4">
                        Floating solar photovoltaic (FPV) systems represent the cutting-edge of renewable energy
                        technology. Installed on water bodies, these systems offer higher efficiency due to natural
                        cooling and eliminate land use concerns while reducing water evaporation.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full">
                          Know More
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => toggleAdvanced("floating")}
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          {showAdvanced.floating ? "Hide Advanced Options" : "Show Advanced Options"}
                        </Button>
                      </div>

                      {showAdvanced.floating && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-3">Advanced Floating Solar Options:</h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Floating Platforms:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• HDPE floating platforms</li>
                                <li>• Modular pontoon systems</li>
                                <li>• Anti-corrosion materials</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Water Body Types:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• Industrial reservoirs</li>
                                <li>• Irrigation ponds</li>
                                <li>• Wastewater treatment plants</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Efficiency Benefits:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• 10-15% higher efficiency</li>
                                <li>• Natural cooling effect</li>
                                <li>• Reduced algae growth</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Environmental Impact:</strong>
                              <ul className="mt-1 space-y-1 text-gray-600">
                                <li>• 70% reduction in evaporation</li>
                                <li>• Improved water quality</li>
                                <li>• Zero land footprint</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/sustainable-future-m.png"
                alt="Aerial view of industrial facility with extensive rooftop solar panel installation"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      
      

     
    </div>
  )
}
