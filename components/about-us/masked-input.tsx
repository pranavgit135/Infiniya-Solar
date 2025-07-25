"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { masks } from "@/hooks/use-input-mask"

type MaskType = "phone" | "creditCard" | "date" | "currency" | "zipCode" | "custom"

interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  mask: MaskType
  customMask?: {
    maskFunction: (value: string) => string
    stripFunction?: (value: string) => string
    placeholder?: string
  }
  value: string
  onChange: (value: string, rawValue: string) => void
  icon?: React.ReactNode
  error?: string
  showValidIcon?: boolean
  isValid?: boolean
}

export default function MaskedInput({
  mask,
  customMask,
  value,
  onChange,
  icon,
  error,
  showValidIcon = false,
  isValid = false,
  className = "",
  ...props
}: MaskedInputProps) {
  // Get the appropriate mask configuration
  const maskConfig = mask === "custom" ? customMask : masks[mask]

  if (!maskConfig) {
    console.error(`Mask type "${mask}" is not supported`)
    return null
  }

  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Apply the mask to the initial value
  const initialDisplayValue = maskConfig.maskFunction(value)
  const [displayValue, setDisplayValue] = useState(initialDisplayValue)

  // Update display value when the value prop changes
  useEffect(() => {
    setDisplayValue(maskConfig.maskFunction(value))
  }, [value, maskConfig])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const maskedValue = maskConfig.maskFunction(newValue)
    const rawValue = maskConfig.stripFunction ? maskConfig.stripFunction(maskedValue) : maskedValue

    setDisplayValue(maskedValue)
    onChange(maskedValue, rawValue)

    // Set cursor position after React updates the DOM
    const input = e.target
    const cursorPosition = input.selectionStart || 0

    setTimeout(() => {
      // Calculate new cursor position
      let newCursorPosition = cursorPosition

      // If adding characters, adjust for any mask characters added
      if (maskedValue.length > newValue.length) {
        const addedChars = maskedValue.length - newValue.length
        newCursorPosition += addedChars
      }

      input.setSelectionRange(newCursorPosition, newCursorPosition)
    }, 0)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  // Combine classes
  const inputClasses = `w-full px-2 py-2 border rounded text-xs xl:text-sm h-9 xl:h-11 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary
    ${isFocused ? "form-field-focus shadow-lg border-secondary" : ""}
    ${error ? "border-red-500 bg-red-50" : ""}
    ${isValid && !error ? "border-green-400 bg-green-50" : ""}
    ${!isFocused && !error && !isValid ? "border-yellow-200" : ""}
    ${icon ? "pl-10" : ""}
    ${className}`

  return (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}

      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={inputClasses}
        placeholder={maskConfig.placeholder || props.placeholder}
        {...props}
      />

      {isValid && showValidIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
      )}

      {error && <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">{error}</p>}
    </div>
  )
}
