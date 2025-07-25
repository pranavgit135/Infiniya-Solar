"use client"

import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import * as d3 from "d3"
import { useMobile } from "@/hooks/use-mobile"

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
  highlightedStates?: string[]
}

// Cache for GeoJSON data to prevent refetching
let geoJsonCache: any = null

export default function IndiaMap({ statesData, onStateClick, selectedState, highlightedStates = [] }: IndiaMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isMobile } = useMobile()

  // Store path references to avoid reselecting DOM elements
  const pathsRef = useRef<Map<string, SVGPathElement>>(new Map())
  const zoomRef = useRef<any>(null)

  // Memoize the state code map to prevent recreation on each render
  const stateCodeMap = useMemo(() => {
    return {
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
      "Andaman and Nicobar Islands": "AN",
      Chandigarh: "CH",
      "Dadra and Nagar Haveli": "DN",
      "Daman and Diu": "DD",
      Lakshadweep: "LD",
      Puducherry: "PY",
      Ladakh: "LA",
    }
  }, [])

  // Memoize the color mapping function to prevent recreation on each render
  const getStateColor = useCallback((category: string) => {
    switch (category) {
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
  }, [])

  // Create a memoized lookup table for state data to avoid repeated find() operations
  const stateDataLookup = useMemo(() => {
    const lookup = new Map<string, StateData>()
    statesData.forEach((state) => {
      lookup.set(state.id, state)
    })
    return lookup
  }, [statesData])

  // Memoize the highlighted states set for O(1) lookups
  const highlightedStatesSet = useMemo(() => {
    return new Set(highlightedStates)
  }, [highlightedStates])

  // Handle tooltip display - extracted as a separate function to reduce complexity
  const showTooltip = useCallback(
    (event: any, stateName: string, stateCode: string) => {
      const tooltip = d3.select(tooltipRef.current)
      const stateData = stateDataLookup.get(stateCode)

      // Get container bounds for tooltip positioning
      const containerRect = mapContainerRef.current?.getBoundingClientRect()
      const tooltipOffset = 10
      
      let tooltipX = event.layerX + tooltipOffset
      let tooltipY = event.layerY - 28

      // Ensure tooltip stays within container bounds
      if (containerRect) {
        const tooltipWidth = 200 // Approximate tooltip width
        const tooltipHeight = 60 // Approximate tooltip height
        
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
        tooltip
          .style("opacity", 1)
          .html(
            `<div class="font-medium">${stateData.name}</div>
           <div>${stateData.capacity} MWp</div>`,
          )
          .style("left", `${tooltipX}px`)
          .style("top", `${tooltipY}px`)
      } else {
        tooltip
          .style("opacity", 1)
          .html(
            `<div class="font-medium">${stateName}</div>
           <div>No data available</div>`,
          )
          .style("left", `${tooltipX}px`)
          .style("top", `${tooltipY}px`)
      }
    },
    [stateDataLookup],
  )

  // Hide tooltip - extracted as a separate function
  const hideTooltip = useCallback(() => {
    d3.select(tooltipRef.current).style("opacity", 0)
  }, [])

  // Update stroke widths without redrawing the entire map
  const updateStrokeWidths = useCallback(() => {
    if (!pathsRef.current) return

    pathsRef.current.forEach((pathElement, stateCode) => {
      const isSelected = stateCode === selectedState
      const isHighlighted = highlightedStatesSet.has(stateCode)
      d3.select(pathElement).attr("stroke-width", isSelected || isHighlighted ? 2 : 0.5)
    })
  }, [selectedState, highlightedStatesSet])

  // Fetch GeoJSON data - optimized to use cache
  const fetchGeoJsonData = useCallback(async () => {
    if (geoJsonCache) {
      return geoJsonCache
    }

    try {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson",
          { mode: "cors" },
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch GeoJSON data: ${response.status}`)
        }

        geoJsonCache = await response.json()
        return geoJsonCache
      } catch (fetchError) {
        console.warn("Error fetching external map data, using fallback:", fetchError)
        // Use fallback data
        geoJsonCache = createFallbackGeoJson()
        return geoJsonCache
      }
    } catch (err: any) {
      setError(`Error loading map data: ${err.message}`)
      return createFallbackGeoJson() // Still return fallback data on error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createFallbackGeoJson = () => {
    // This is a very simplified version of India's states for fallback purposes
    return {
      type: "FeatureCollection",
      features: [
        // Major states with significant capacity
        createStateFeature("Maharashtra", "MH", [76, 19]),
        createStateFeature("Gujarat", "GJ", [72, 22]),
        createStateFeature("Rajasthan", "RJ", [74, 26]),
        createStateFeature("Madhya Pradesh", "MP", [78, 23]),
        createStateFeature("Karnataka", "KA", [76, 15]),
        createStateFeature("Tamil Nadu", "TN", [78, 11]),
        createStateFeature("Andhra Pradesh", "AP", [80, 16]),
        createStateFeature("Telangana", "TG", [79, 18]),
        createStateFeature("Uttar Pradesh", "UP", [80, 27]),
        createStateFeature("Haryana", "HR", [76, 29]),
        createStateFeature("Punjab", "PB", [75, 31]),
        createStateFeature("Delhi", "DL", [77, 28.5]),
        // Add more states as needed
      ],
    }
  }

  const createStateFeature = (name, code, center) => {
    // Create a simple circular polygon around the center point
    const radius = 1 // in degrees
    const points = 16 // number of points in the circle
    const coordinates = []

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2
      coordinates.push([center[0] + Math.cos(angle) * radius, center[1] + Math.sin(angle) * radius])
    }
    // Close the polygon
    coordinates.push(coordinates[0])

    return {
      type: "Feature",
      properties: {
        NAME_1: name,
        code: code,
      },
      geometry: {
        type: "Polygon",
        coordinates: [coordinates],
      },
    }
  }

  // Zoom functionality
  const handleZoom = useCallback((event: any) => {
    if (svgRef.current) {
      d3.select(svgRef.current).attr("transform", event.transform)
    }
  }, [])

  // Initialize the map
  useEffect(() => {
    const initializeMap = async () => {
      setIsLoading(true)
      setError(null)

      const geoData = await fetchGeoJsonData()

      if (!geoData) {
        return
      }

      const svg = d3.select(svgRef.current)
      const width = mapContainerRef.current?.offsetWidth || 800
      const height = mapContainerRef.current?.offsetHeight || 600

      // Projection and path generator
      const projection = d3
        .geoMercator()
        .center([83, 23]) // roughly center of India
        .scale(width * 1.1)
        .translate([width / 2, height / 2])

      const pathGenerator = d3.geoPath().projection(projection)

      // Zoom behavior
      const zoom = d3.zoom().scaleExtent([0.8, 4]).on("zoom", handleZoom)
      zoomRef.current = zoom // Store zoom instance in ref

      // Initial zoom setup
      svg.call(zoom).transition().duration(750).call(zoom.transform, d3.zoomIdentity)

      // Create map paths
      svg
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", (feature: any) => {
          const stateName = feature.properties.NAME_1
          const stateCode = (stateCodeMap as any)[stateName] // Type assertion here
          const stateData = stateDataLookup.get(stateCode)
          return stateData ? getStateColor(stateData.category) : getStateColor("none")
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .on("mouseover", (event: any, feature: any) => {
          const stateName = feature.properties.NAME_1
          const stateCode = (stateCodeMap as any)[stateName] // Type assertion here
          showTooltip(event, stateName, stateCode)
        })
        .on("mouseout", hideTooltip)
        .on("click", (event: any, feature: any) => {
          const stateName = feature.properties.NAME_1
          const stateCode = (stateCodeMap as any)[stateName] // Type assertion here
          if (stateCode) {
            onStateClick(stateCode)
          }
        })
        .each(function (this: SVGPathElement, feature: any) {
          const stateName = feature.properties.NAME_1
          const stateCode = (stateCodeMap as any)[stateName] // Type assertion here
          if (stateCode) {
            pathsRef.current.set(stateCode, this)
          }
        })

      updateStrokeWidths() // Initial stroke width update
      setIsLoading(false)
    }

    if (mapContainerRef.current) {
      initializeMap()
    }

    // Resize observer to handle dynamic resizing
    const resizeObserver = new ResizeObserver(() => {
      // Re-initialize the map on resize
      initializeMap()
    })

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [
    statesData,
    stateCodeMap,
    getStateColor,
    onStateClick,
    showTooltip,
    hideTooltip,
    updateStrokeWidths,
    fetchGeoJsonData,
    stateDataLookup,
    handleZoom,
  ])

  // Update stroke widths on selectedState or highlightedStates change
  useEffect(() => {
    updateStrokeWidths()
  }, [updateStrokeWidths])

  return (
    <div ref={mapContainerRef} className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 opacity-50 flex justify-center items-center">Loading map...</div>
      )}
      {error && (
        <div className="absolute inset-0 bg-red-100 text-red-800 flex justify-center items-center">{error}</div>
      )}
      <svg ref={svgRef} width="100%" height="100%"></svg>
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none z-10 bg-white border border-gray-300 rounded shadow-md opacity-0 transition-opacity duration-200 px-3 py-2 text-sm"
      ></div>
    </div>
  )
}
