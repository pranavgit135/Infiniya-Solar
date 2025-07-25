"use client"

import type React from "react"

import { useState, useCallback } from "react"

type MaskFunction = (value: string) => string
type MaskOptions = {
  maskFunction: MaskFunction
  stripFunction?: (value: string) => string
  placeholder?: string
}

export function useInputMask(initialValue = "", options: MaskOptions) {
  const [value, setValue] = useState(options.maskFunction(initialValue))

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = options.maskFunction(e.target.value)
      setValue(newValue)

      // Set cursor position after React updates the DOM
      const input = e.target
      const cursorPosition = input.selectionStart || 0

      setTimeout(() => {
        // Calculate new cursor position
        let newCursorPosition = cursorPosition

        // If adding characters, adjust for any mask characters added
        if (newValue.length > e.target.value.length) {
          const addedChars = newValue.length - e.target.value.length
          newCursorPosition += addedChars
        }

        input.setSelectionRange(newCursorPosition, newCursorPosition)
      }, 0)
    },
    [options],
  )

  const getRawValue = useCallback(() => {
    if (options.stripFunction) {
      return options.stripFunction(value)
    }
    return value
  }, [value, options])

  return {
    value,
    setValue,
    handleChange,
    getRawValue,
    placeholder: options.placeholder,
  }
}

// Common mask functions
export const masks = {
  // Phone mask: (XXX) XXX-XXXX
  phone: {
    maskFunction: (value: string): string => {
      if (!value) return value

      // Remove all non-digit characters
      const phoneNumber = value.replace(/\D/g, "")

      // Apply the mask based on the length of the input
      if (phoneNumber.length < 4) {
        return phoneNumber
      } else if (phoneNumber.length < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
      } else {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
      }
    },
    stripFunction: (value: string): string => value.replace(/\D/g, ""),
    placeholder: "(XXX) XXX-XXXX",
  },

  // Credit card mask: XXXX XXXX XXXX XXXX
  creditCard: {
    maskFunction: (value: string): string => {
      if (!value) return value

      const digits = value.replace(/\D/g, "")
      const groups = []

      for (let i = 0; i < digits.length && i < 16; i += 4) {
        groups.push(digits.slice(i, i + 4))
      }

      return groups.join(" ")
    },
    stripFunction: (value: string): string => value.replace(/\D/g, ""),
    placeholder: "XXXX XXXX XXXX XXXX",
  },

  // Date mask: MM/DD/YYYY
  date: {
    maskFunction: (value: string): string => {
      if (!value) return value

      const digits = value.replace(/\D/g, "")

      if (digits.length < 3) {
        return digits
      } else if (digits.length < 5) {
        return `${digits.slice(0, 2)}/${digits.slice(2)}`
      } else {
        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`
      }
    },
    stripFunction: (value: string): string => value.replace(/\D/g, ""),
    placeholder: "MM/DD/YYYY",
  },

  // Currency mask: $X,XXX.XX
  currency: {
    maskFunction: (value: string): string => {
      if (!value) return value

      // Remove all non-digit characters except decimal point
      let number = value.replace(/[^\d.]/g, "")

      // Ensure only one decimal point
      const parts = number.split(".")
      if (parts.length > 2) {
        number = `${parts[0]}.${parts.slice(1).join("")}`
      }

      // Format the integer part with commas
      const decimalIndex = number.indexOf(".")
      let integerPart = decimalIndex >= 0 ? number.slice(0, decimalIndex) : number
      const decimalPart = decimalIndex >= 0 ? number.slice(decimalIndex) : ""

      // Add commas
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

      return `$${integerPart}${decimalPart}`
    },
    stripFunction: (value: string): string => value.replace(/[^\d.]/g, ""),
    placeholder: "$0.00",
  },

  // ZIP code mask: XXXXX or XXXXX-XXXX
  zipCode: {
    maskFunction: (value: string): string => {
      if (!value) return value

      const digits = value.replace(/\D/g, "")

      if (digits.length <= 5) {
        return digits
      } else {
        return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`
      }
    },
    stripFunction: (value: string): string => value.replace(/\D/g, ""),
    placeholder: "XXXXX or XXXXX-XXXX",
  },
}
