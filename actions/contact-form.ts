"use server"

import { z } from "zod"

// Define validation schema using Zod
const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  location: z.string().min(1, { message: "Location is required" }),
  customerType: z.string().min(1, { message: "Customer type is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  companyRating: z.string().min(1, { message: "Company rating is required" }),
  contractLoad: z.string().min(1, { message: "Contract load is required" }),
  rooftopArea: z.string().min(1, { message: "Rooftop area is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  captcha: z.string().optional(),
})

// Type for the form data
export type ContactFormData = z.infer<typeof ContactFormSchema>

// Type for the response
export type ContactFormResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
  try {
    // Validate form data
    const validatedData = ContactFormSchema.safeParse(formData)

    if (!validatedData.success) {
      // Return validation errors
      const errors: Record<string, string[]> = {}
      validatedData.error.issues.forEach((issue) => {
        const path = issue.path[0] as string
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(issue.message)
      })

      return {
        success: false,
        message: "Please fix the errors in the form",
        errors,
      }
    }

    // Simulate a delay to mimic server processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically:
    // 1. Save the data to a database
    // 2. Send an email notification
    // 3. Integrate with a CRM system

    console.log("Form submission received:", validatedData.data)

    // For demonstration, we'll just return a success response
    return {
      success: true,
      message: "Thank you for your interest! Our team will contact you shortly.",
    }
  } catch (error) {
    console.error("Error submitting form:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
