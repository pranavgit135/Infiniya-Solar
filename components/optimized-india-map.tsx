"use client"

import { useRef, useEffect, useState, useMemo, useCallback } from "react"
// @ts-ignore
import * as d3 from "d3"
import { useMobile } from "@/hooks/use-mobile"
import MapSkeleton from "./map-skeleton"

interface StateData {
  id: string
  name: string
  capacity: number
  projects: number
  category: "none" | "veryLow" | "low" | "medium" | "high" | "veryHigh"
}

interface IndiaMapProps {
  statesData: StateData[]
  onStateClick: (stateId: string) => void
  selectedState: string | undefined
  geoJsonUrl?: string
}

// Cache for GeoJSON data to avoid refetching
let geoJsonCache: any = null

// Define detail levels for progressive loading
const DETAIL_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
}

export default function OptimizedIndiaMap({
  statesData,
  onStateClick,
  selectedState,
  geoJsonUrl = "https://raw.githubusercontent.com/geosoftech18/India-Map-GeoJSON/refs/heads/main/india.json",
}: IndiaMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<any>(null)
  const currentTransformRef = useRef<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMapRendered, setIsMapRendered] = useState(false)
  const [geoData, setGeoData] = useState<any>(null)
  const [currentZoomLevel, setCurrentZoomLevel] = useState(1)
  const [detailLevel, setDetailLevel] = useState(DETAIL_LEVELS.LOW)
  const { isMobile } = useMobile()
  const pathsRef = useRef<Map<string, SVGPathElement>>(new Map())

  // Throttle function to limit the rate of function calls
  const throttle = useCallback((func: Function, limit: number) => {
    let inThrottle: boolean
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }, [])

  // Memoize the state code map to avoid recreating it on every render
  const stateCodeMap: { [key: string]: string } = useMemo(
    () => ({
      "Andhra Pradesh": "AP",
      "Arunachal Pradesh": "AR",
      Assam: "AS",
      Bihar: "BR",
      Chhattisgarh: "CT",
      Goa: "GA",
      Gujarat: "GJ",
      Haryana: "HR",
      "Himachal Pradesh": "HP",
      Jharkhand: "JH",
      Karnataka: "KA",
      Kerala: "KL",
      "Madhya Pradesh": "MP",
      Maharashtra: "MH",
      Manipur: "MN",
      Meghalaya: "ML",
      Mizoram: "MZ",
      Nagaland: "NL",
      Odisha: "OR",
      Punjab: "PB",
      Rajasthan: "RJ",
      Sikkim: "SK",
      "Tamil Nadu": "TN",
      Telangana: "TG",
      Tripura: "TR",
      "Uttar Pradesh": "UP",
      Uttarakhand: "UK",
      "West Bengal": "WB",
      Delhi: "DL",
      "Jammu and Kashmir": "JK",
      "Andaman and Nicobar": "AN",
      Chandigarh: "CH",
      "Dādra and Nagar Haveli and Damān and Diu": "DĀ",
      "Daman and Diu": "DD",
      Lakshadweep: "LD",
      Puducherry: "PY",
      Ladakh: "LA",
    }),
    [],
  )

  // Memoize the color mapping function
  const getStateColor = useCallback(
    (stateCode: string) => {
      const stateData = statesData.find((state) => state.id === stateCode)

      if (!stateData) return "#d1d5db" // More visible gray for states without data

      switch (stateData.category) {
        case "veryHigh":
          return "#f47920" // Orange for very high capacity
        case "high":
          return "#03045e" // Dark blue for high capacity
        case "medium":
          return "#023e8a" // Medium blue for medium capacity
        case "low":
          return "#219ebc" // Light blue for low capacity
        case "veryLow":
          return "#8ecae6" // Very light blue for very low capacity
        default:
          return "#e5e7eb" // Gray for no capacity
      }
    },
    [statesData],
  )

  const fetchGeoJsonData = useCallback(async () => {
    if (geoJsonCache) {
      return geoJsonCache
    }

    try {
      const url = geoJsonUrl || "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson"
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch GeoJSON data: ${response.status}`)
      }
      geoJsonCache = await response.json()
      return geoJsonCache
    } catch (err: any) {
      setError(`Error fetching map data: ${err.message}`)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [geoJsonUrl])

  // Fetch GeoJSON data only once
  useEffect(() => {
    setIsLoading(true)
    fetch(geoJsonUrl)
      .then(res => res.json())
      .then(data => {
        setGeoData(data)
      })
      .catch(err => console.error("Map geojson fetch error:", err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [geoJsonUrl])

  // Determine detail level based on zoom level
  useEffect(() => {
    if (currentZoomLevel < 1.5) {
      setDetailLevel(DETAIL_LEVELS.LOW)
    } else if (currentZoomLevel < 2.5) {
      setDetailLevel(DETAIL_LEVELS.MEDIUM)
    } else {
      setDetailLevel(DETAIL_LEVELS.HIGH)
    }
  }, [currentZoomLevel])

  // Render map when data is available or when relevant props change
  useEffect(() => {
    if (!geoData || !svgRef.current || !mapContainerRef) return
    setIsMapRendered(false)
    const renderMap = () => {
      const svg = d3.select(svgRef.current)
      const width = mapContainerRef.current?.clientWidth || 600
      const height = mapContainerRef.current?.clientHeight || 600

      // Set SVG dimensions explicitly
      svg.attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`)

      // Clear previous content
      svg.selectAll("*").remove()

      // Create a projection for India with responsive scaling
      const scaleMultiplier = isMobile ? 1.6 : 1.2 // Larger scale for mobile
      const projection = d3
        .geoMercator()
        .center([82, 23]) // Center of India approximately
        .scale(width * scaleMultiplier)
        .translate([width / 2, height / 2])

      // Create a path generator
      const pathGenerator = d3.geoPath().projection(projection)

      // Create a group for paths and a separate group for labels
      const pathGroup = svg.append("g").attr("class", "path-group")
      const labelGroup = svg.append("g").attr("class", "label-group")
      const detailGroup = svg.append("g").attr("class", "detail-group")

      // Draw the map with optimized rendering
      pathGroup
        .selectAll("path")
        .data(geoData.features)
        .join("path") // More efficient than enter().append()
        .attr("d", pathGenerator)
        .attr("fill", (d: any) => {
          // Check for different property structures in the GeoJSON
          const stateName = d.properties.NAME_1 || d.properties.name || d.properties.ST_NM || ""
          const stateCode = stateCodeMap[stateName]
          return getStateColor(stateCode)
        })
        .attr("stroke", "#ffffff")
        .attr("stroke-width", (d: any) => {
          const stateName = d.properties.NAME_1 || d.properties.name || d.properties.ST_NM || ""
          const stateCode = stateCodeMap[stateName]
          return stateCode === selectedState ? 2 : 0.5
        })
        .attr("class", "state-path")
        .style("cursor", "pointer")
        .on("mouseover", function (this: any, event: any, d: any) {
          const stateName = d.properties.NAME_1 || d.properties.name || d.properties.ST_NM || ""
          const stateCode = stateCodeMap[stateName]
          const stateData = statesData.find((state) => state.id === stateCode)

          d3.select(this).attr("stroke-width", 2)

          // Get container bounds for tooltip positioning
          const containerRect = mapContainerRef.current?.getBoundingClientRect()
          const tooltipOffset = 10
          
          let tooltipX = event.layerX + tooltipOffset
          let tooltipY = event.layerY - 28

          // Ensure tooltip stays within container bounds
          if (containerRect) {
            const tooltipWidth = 200 // Approximate tooltip width
            const tooltipHeight = 80 // Approximate tooltip height
            
            if (tooltipX + tooltipWidth > containerRect.width) {
              tooltipX = event.layerX - tooltipWidth - tooltipOffset
            }
            if (tooltipY < 0) {
              tooltipY = event.layerY + tooltipOffset
            }
            if (tooltipY + tooltipHeight > containerRect.height) {
              tooltipY = containerRect.height - tooltipHeight - tooltipOffset
            }
          }

          if (stateData) {
            d3.select(tooltipRef.current)
              .style("opacity", 1)
              .html(
                `<div class="font-medium text-lg">${stateData.name}</div>
       <div class="text-[#f47920] font-bold text-base">${stateData.capacity} MWp</div>
       <div class="text-sm text-gray-600">${stateData.projects} Projects</div>
       <div class="text-xs text-gray-500 mt-1">Category: ${stateData.category}</div>`,
              )
              .style("left", `${tooltipX}px`)
              .style("top", `${tooltipY}px`)
          } else {
            d3.select(tooltipRef.current)
              .style("opacity", 1)
              .html(
                `<div class="font-medium">${stateName}</div>
       <div class="text-gray-500">No solar data available</div>`,
              )
              .style("left", `${tooltipX}px`)
              .style("top", `${tooltipY}px`)
          }
        })
        .on(
          "mousemove",
          throttle((event: any) => {
            // Get container bounds for tooltip positioning
            const containerRect = mapContainerRef.current?.getBoundingClientRect()
            const tooltipOffset = 10
            
            let tooltipX = event.layerX + tooltipOffset
            let tooltipY = event.layerY - 28

            // Ensure tooltip stays within container bounds
            if (containerRect) {
              const tooltipWidth = 200 // Approximate tooltip width
              const tooltipHeight = 80 // Approximate tooltip height
              
              if (tooltipX + tooltipWidth > containerRect.width) {
                tooltipX = event.layerX - tooltipWidth - tooltipOffset
              }
              if (tooltipY < 0) {
                tooltipY = event.layerY + tooltipOffset
              }
              if (tooltipY + tooltipHeight > containerRect.height) {
                tooltipY = containerRect.height - tooltipHeight - tooltipOffset
              }
            }

            d3.select(tooltipRef.current)
              .style("left", `${tooltipX}px`)
              .style("top", `${tooltipY}px`)
          }, 30),
        ) // Throttle mousemove events to 30ms
        .on("mouseout", function (this: any) {
          const stateName =
            d3.select(this).datum().properties.NAME_1 ||
            d3.select(this).datum().properties.name ||
            d3.select(this).datum().properties.ST_NM ||
            ""
          const stateCode = stateCodeMap[stateName]
          d3.select(this).attr(
            "stroke-width",
            stateCode === selectedState ? 2 : 0.5,
          )
          d3.select(tooltipRef.current).style("opacity", 0)
        })
        .on("click", (event: any, d: any) => {
          const stateName = d.properties.NAME_1 || d.properties.name || d.properties.ST_NM || ""
          const stateCode = stateCodeMap[stateName]
          if (stateCode) {
            onStateClick(stateCode)
          }
        })
        .each(function (this: SVGPathElement, feature: any) {
          const stateName = feature.properties.NAME_1 || feature.properties.name || feature.properties.ST_NM || ""
          const stateCode = stateCodeMap[stateName] // Type assertion here
          if (stateCode) {
            pathsRef.current.set(stateCode, this)
          }
        })

      // Add state abbreviations as labels for all states
      // console.log("Rendering labels for states...",geoData.features)
      labelGroup
        .selectAll("text")
        .data(geoData.features)
        .join("text")
        .attr("transform", (d: any) => {
          const centroid = pathGenerator.centroid(d)
          return `translate(${centroid[0]},${centroid[1]})`
        })
        .attr("text-anchor", "middle")
        .attr("font-size", isMobile ? "6px" : "10px")
        .attr("font-weight", "600")
        .attr("fill", (d: any) => {
          const stateName = d.properties.NAME_1 || d.properties.name || d.properties.ST_NM || ""
          const stateCode = stateCodeMap[stateName]
          const stateData = statesData.find((state) => state.id === stateCode)
          // Use white text for states with data, dark text for states without data
          return stateData && stateData.capacity > 0 ? "#ffffff" : "#374151"
        })
        .attr("pointer-events", "none") // Make sure text doesn't interfere with mouse events
        .text((d: any) => {
          const stateName = d.properties.NAME_1 || d.properties.name || d.properties.ST_NM || ""
          const stateCode = stateCodeMap[stateName]
          // console.log("Rendering label for state:", stateName, "with code:", stateCode)
          const excludedStates = ["DN", "DD", "LD", "PY","AN","DĀ","CH"] // Add state codes to exclude
          return excludedStates.includes(stateCode) ? "" : stateCode || stateName.substring(0, 2).toUpperCase()
        })
        .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.5)") // Add text shadow for better visibility

      // Add zoom capabilities with optimized handling
      const handleZoom = (event: any) => {
        // Store current transform
        currentTransformRef.current = event.transform
        
        // Update zoom level state
        setCurrentZoomLevel(event.transform.k)

        // Apply transform to groups
        pathGroup.attr("transform", event.transform)
        labelGroup.attr("transform", event.transform)
        detailGroup.attr("transform", event.transform)
      }

      const zoom = d3.zoom()
        .scaleExtent([0.8, 4])
        .on("start", () => {
          svg.style("cursor", "grabbing")
        })
        .on("zoom", handleZoom)
        .on("end", () => {
          svg.style("cursor", "grab")
        })

      // Store zoom reference for external controls
      zoomRef.current = zoom

      // Apply zoom behavior to SVG
      svg.call(zoom as any)

      // Set initial zoom if needed
      if (currentZoomLevel !== 1) {
        svg.call(zoom.transform, d3.zoomIdentity.scale(currentZoomLevel))
      }

      // Set map as rendered
      setIsMapRendered(true)
    }

    renderMap()
  }, [
    geoData,
    statesData,
    selectedState,
    isMobile,
    getStateColor,
    stateCodeMap,
    onStateClick,
    throttle,
    geoJsonUrl,
  ])

  // Handle detail level changes without full re-render
  useEffect(() => {
    if (!isMapRendered || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    const pathGroup = svg.select(".path-group")
    const detailGroup = svg.select(".detail-group")

    // Apply current transform to detail group if it exists
    if (currentTransformRef.current) {
      detailGroup.attr("transform", currentTransformRef.current)
    }

    // Update city markers based on detail level
    if (detailLevel === DETAIL_LEVELS.HIGH) {
      // Add city markers if not already present
      if (detailGroup.selectAll("circle").empty()) {
        const width = mapContainerRef.current?.clientWidth || 600
        const height = mapContainerRef.current?.clientHeight || 600
        
        const scaleMultiplier = isMobile ? 1.6 : 1.2 // Larger scale for mobile
        const projection = d3
          .geoMercator()
          .center([82, 23])
          .scale(width * scaleMultiplier)
          .translate([width / 2, height / 2])

        const majorCities = [
          { name: "Mumbai", coordinates: [72.8777, 19.076], projects: 8 },
          { name: "Delhi", coordinates: [77.1025, 28.7041], projects: 7 },
          { name: "Bangalore", coordinates: [77.5946, 12.9716], projects: 5 },
          { name: "Chennai", coordinates: [80.2707, 13.0827], projects: 6 },
          { name: "Hyderabad", coordinates: [78.4867, 17.385], projects: 4 },
        ]

        detailGroup
          .selectAll("circle")
          .data(majorCities)
          .join("circle")
          .attr("cx", (d: any) => projection(d.coordinates)[0])
          .attr("cy", (d: any) => projection(d.coordinates)[1])
          .attr("r", 3)
          .attr("fill", "#f47920")
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 1)
          .attr("opacity", 0.8)
          .on("mouseover", function (this: any, event: any, d: any) {
            const containerRect = mapContainerRef.current?.getBoundingClientRect()
            const tooltipOffset = 10
            
            let tooltipX = event.layerX + tooltipOffset
            let tooltipY = event.layerY - 28

            if (containerRect) {
              const tooltipWidth = 150
              const tooltipHeight = 60
              
              if (tooltipX + tooltipWidth > containerRect.width) {
                tooltipX = event.layerX - tooltipWidth - tooltipOffset
              }
              if (tooltipY < 0) {
                tooltipY = event.layerY + tooltipOffset
              }
              if (tooltipY + tooltipHeight > containerRect.height) {
                tooltipY = containerRect.height - tooltipHeight - tooltipOffset
              }
            }

            d3.select(tooltipRef.current)
              .style("opacity", 1)
              .html(
                `<div class="font-medium">${d.name}</div>
                 <div>${d.projects} Projects</div>`,
              )
              .style("left", `${tooltipX}px`)
              .style("top", `${tooltipY}px`)

            d3.select(this).attr("r", 5).attr("opacity", 1)
          })
          .on("mouseout", function (this: any) {
            d3.select(tooltipRef.current).style("opacity", 0)
            d3.select(this).attr("r", 3).attr("opacity", 0.8)
          })
      }
    } else {
      // Remove city markers for non-high detail levels
      detailGroup.selectAll("circle").remove()
    }

    // Update stroke widths based on detail level
    if (detailLevel === DETAIL_LEVELS.MEDIUM || detailLevel === DETAIL_LEVELS.HIGH) {
      pathGroup.selectAll("path").attr("stroke-width", (d: any) => {
        const stateName = d.properties.NAME_1
        const stateCode = stateCodeMap[stateName]
        return stateCode === selectedState ? 2 : 0.8
      })
    } else {
      pathGroup.selectAll("path").attr("stroke-width", (d: any) => {
        const stateName = d.properties.NAME_1
        const stateCode = stateCodeMap[stateName]
        return stateCode === selectedState ? 2 : 0.5
      })
    }
  }, [detailLevel, selectedState, stateCodeMap, isMapRendered])

  // Handle resize with debounce
  useEffect(() => {
    if (!geoData) return

    const handleResize = () => {
      if (svgRef.current && mapContainerRef.current) {
        svgRef.current.setAttribute("width", `${mapContainerRef.current.clientWidth}`)
        svgRef.current.setAttribute("height", `${mapContainerRef.current.clientHeight}`)

        // Re-render the map on resize
        const svg = d3.select(svgRef.current)
        const width = mapContainerRef.current.clientWidth
        const height = mapContainerRef.current.clientHeight

        // Update projection without full re-render with responsive scaling
        const scaleMultiplier = isMobile ? 1.6 : 1.2 // Larger scale for mobile
        const projection = d3
          .geoMercator()
          .center([82, 23])
          .scale(width * scaleMultiplier)
          .translate([width / 2, height / 2])

        const pathGenerator = d3.geoPath().projection(projection)

        // Update paths
        svg.selectAll("path").attr("d", (d: any) => pathGenerator(d))

        // Update labels
        svg.selectAll("text").attr("transform", (d: any) => {
          const centroid = pathGenerator.centroid(d)
          return `translate(${centroid[0]},${centroid[1]})`
        })

        // Update city markers if they exist
        svg.selectAll("circle").each(function (this: any, d: any) {
          if (d.coordinates) {
            const [x, y] = projection(d.coordinates)
            d3.select(this).attr("cx", x).attr("cy", y)
          }
        })
      }
    }

    // Debounce resize handler
    let resizeTimer: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 100)
    }

    window.addEventListener("resize", debouncedResize)
    handleResize() // Initial call

    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(resizeTimer)
    }
  }, [geoData])

  // Memoized zoom control handlers
  const handleZoomIn = useCallback(() => {
    if (zoomRef.current && svgRef.current) {
      const svg = d3.select(svgRef.current)
      svg.transition().duration(300).call(zoomRef.current.scaleBy, 1.5)
    }
  }, [])

  const handleZoomOut = useCallback(() => {
    if (zoomRef.current && svgRef.current) {
      const svg = d3.select(svgRef.current)
      svg.transition().duration(300).call(zoomRef.current.scaleBy, 0.67)
    }
  }, [])

  const handleZoomReset = useCallback(() => {
    if (zoomRef.current && svgRef.current) {
      const svg = d3.select(svgRef.current)
      svg.transition().duration(300).call(zoomRef.current.transform, d3.zoomIdentity)
      setCurrentZoomLevel(1)
    }
  }, [])

  return (
    <div ref={mapContainerRef} className="relative w-full h-full overflow-hidden">
      {/* Show skeleton loader while loading or rendering */}
      {(isLoading || !isMapRendered) && <MapSkeleton />}

      {/* Show error message if there's an error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-md text-red-500">{error}</div>
        </div>
      )}

      {/* The actual map */}
      <div className={`w-full h-full overflow-hidden ${isMapRendered ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <svg ref={svgRef} className="w-full h-full" style={{ cursor: 'grab' }}></svg>
        <div
          ref={tooltipRef}
          className="hidden md:block absolute pointer-events-none bg-white px-4 py-3 rounded-lg shadow-lg text-sm opacity-0 transition-opacity z-10 border border-gray-200 max-w-xs"
        ></div>

        {/* Zoom controls - only show when map is rendered */}
        {isMapRendered && (
          <div className="zoom-controls absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={handleZoomIn}
              className="zoom-in bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              onClick={handleZoomOut}
              className="zoom-out bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Zoom out"
            >
              -
            </button>
            <button
              onClick={handleZoomReset}
              className="zoom-reset bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors text-xs"
              aria-label="Reset zoom"
            >
              Reset
            </button>
          </div>
        )}

        {/* Detail level indicator */}
        {isMapRendered && (
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-3 py-1 rounded-md text-xs font-medium shadow-sm">
            {detailLevel === DETAIL_LEVELS.LOW && "Overview Mode"}
            {detailLevel === DETAIL_LEVELS.MEDIUM && "Standard Detail"}
            {detailLevel === DETAIL_LEVELS.HIGH && "High Detail"}
            <span className="ml-2 text-gray-500">Zoom: {Math.round(currentZoomLevel * 100) / 100}x</span>
          </div>
        )}
      </div>
    </div>
  )
}
