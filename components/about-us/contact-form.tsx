"use client";

import type React from "react";
import type { ContactFormData } from "@/actions/contact-form";

// First, import the necessary hooks and utilities at the top of the file
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Loader2,
  CheckCircle2,
  Save,
  Trash2,
  Hash,
} from "lucide-react";
import { submitContactForm } from "@/actions/contact-form";
import { toast } from "@/hooks/use-toast";
import ReCAPTCHA from "react-google-recaptcha";

// Replace the Phone Field section with the MaskedInput component
// First, add the import at the top of the file
import MaskedInput from "./masked-input";
import { ShinyButton } from "../ui/animated-button";

// Storage key for the form data
const FORM_STORAGE_KEY = "amplus-contact-form";

// Add this to access env variable (Next.js exposes NEXT_PUBLIC_*)
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY || "";

// Fix for TypeScript: declare grecaptcha on window
declare global {
  interface Window {
    grecaptcha: any;
  }
}

// Add these utility functions for input masking before the ContactForm component
const formatPhoneNumber = (value: string): string => {
  if (!value) return value;

  // Remove all non-digit characters
  const phoneNumber = value.replace(/\D/g, "");

  // Apply the mask based on the length of the input
  if (phoneNumber.length < 4) {
    return phoneNumber;
  } else if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }
};

const stripMask = (value: string): string => {
  return value.replace(/\D/g, "");
};

// Add this function to handle cursor position after masking
const getCursorPosition = (
  previousValue: string,
  newValue: string,
  position: number
): number => {
  // If deleting, keep the cursor position
  if (newValue.length < previousValue.length) {
    return position;
  }

  // Count added non-digit characters
  const addedChars =
    newValue.length -
    stripMask(newValue).length -
    (previousValue.length - stripMask(previousValue).length);

  return position + (addedChars > 0 ? addedChars : 0);
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    location: "",
    customerType: "",
    companyName: "",
    companyRating: "",
    contractLoad: "",
    rooftopArea: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});
  const [formVisible, setFormVisible] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [hasSavedData, setHasSavedData] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Animation on component mount
  useEffect(() => {
    setFormVisible(true);

    // Load saved form data on mount
    loadSavedFormData();
  }, []);

  // Intersection Observer for form animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFormVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  // Autosave effect
  useEffect(() => {
    // Skip initial render and empty form
    if (Object.values(formData).every((value) => !value)) {
      return;
    }

    // Debounce save operations
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setSaveStatus("saving");

    saveTimeoutRef.current = setTimeout(() => {
      saveFormData();
    }, 1000); // Save after 1 second of inactivity

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData]);

  // Save form data to localStorage
  const saveFormData = () => {
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
      setSaveStatus("saved");
      setHasSavedData(true);

      // Reset save status after 3 seconds
      setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error saving form data:", error);
      setSaveStatus("error");

      toast({
        title: "Autosave Error",
        description:
          "Could not save your form data. You may be in private browsing mode.",
        variant: "destructive",
      });
    }
  };

  // Load saved form data from localStorage
  const loadSavedFormData = () => {
    try {
      const savedData = localStorage.getItem(FORM_STORAGE_KEY);

      if (savedData) {
        const parsedData = JSON.parse(savedData) as ContactFormData;
        setFormData(parsedData);
        setHasSavedData(true);

        // Validate loaded fields
        Object.keys(parsedData).forEach((key) => {
          const fieldName = key as keyof ContactFormData;
          if (parsedData[fieldName]) {
            validateField(fieldName, parsedData[fieldName]);
          }
        });

        toast({
          title: "Form Data Restored",
          description: "Your previously entered information has been loaded.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }
  };

  // Clear saved form data
  const clearSavedFormData = () => {
    try {
      localStorage.removeItem(FORM_STORAGE_KEY);
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        customerType: "",
        companyName: "",
        companyRating: "",
        contractLoad: "",
        rooftopArea: "",
        message: "",
      });
      setValidFields({});
      setHasSavedData(false);

      toast({
        title: "Form Data Cleared",
        description: "Your saved information has been cleared.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error clearing saved form data:", error);
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName: string) => {
    setFocusedField(null);

    // Validate field on blur
    validateField(
      fieldName,
      formData[fieldName as keyof ContactFormData] ?? ""
    );
  };

  // Replace the handleChange function in the ContactForm component with this updated version
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Apply masking for specific fields
    if (name === "phone") {
      const input = e.target as HTMLInputElement;
      const cursorPosition = input.selectionStart || 0;
      const previousValue = formData.phone;
      const maskedValue = formatPhoneNumber(value);

      setFormData((prev) => ({ ...prev, [name]: maskedValue }));

      // Set cursor position after React updates the DOM
      setTimeout(() => {
        const newCursorPosition = getCursorPosition(
          previousValue,
          maskedValue,
          cursorPosition
        );
        input.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Update the validateField function to handle masked phone numbers
  const validateField = (name: string, value: string) => {
    let isValid = true;
    let errorMessage = "";

    if (!value) {
      isValid = false;
      switch (name) {
        case "name":
          errorMessage = "Enter Your Name";
          break;
        case "phone":
          errorMessage = "Enter Your Phone Number";
          break;
        case "email":
          errorMessage = "Enter Your Official Email ID";
          break;
        case "location":
          errorMessage = "Enter Your Location";
          break;
        case "customerType":
          errorMessage = "Select Customer Type";
          break;
        case "companyName":
          errorMessage = "Enter Your Company Name";
          break;
        case "companyRating":
          errorMessage = "Select Company Rating";
          break;
        case "contractLoad":
          errorMessage = "Select Contract load/Connected Load ( kVA/kW )";
          break;
        case "rooftopArea":
          errorMessage = "Select Available Rooftop Area (Sq. ft)";
          break;
        case "message":
          errorMessage = "Enter Your Message";
          break;
        default:
          errorMessage = "This field is required";
      }
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    } else if (name === "phone") {
      // For phone validation, strip the mask and check if it's a valid 10-digit number
      const strippedPhone = stripMask(value);
      if (strippedPhone.length !== 10) {
        isValid = false;
        errorMessage = "Please enter a valid 10-digit phone number";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));

    setValidFields((prev) => ({
      ...prev,
      [name]: isValid,
    }));

    return isValid;
  };

  const validateClientSide = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!validateField(key, value)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError(null);
    // Client-side validation
    if (!validateClientSide()) {
      // Shake the form to indicate validation errors
      if (formRef.current) {
        formRef.current.classList.add("animate-shake");
        setTimeout(() => {
          formRef.current?.classList.remove("animate-shake");
        }, 500);
      }
      return;
    }
    if (!captchaToken) {
      setCaptchaError("Please complete the captcha.");
      toast({
        title: "Captcha Required",
        description: "Please complete the captcha before submitting.",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsSubmitting(true);
      // Call the server action, pass token
      const response = await submitContactForm({
        ...formData,
        captcha: captchaToken,
      });

      if (response.success) {
        // Clear saved form data on successful submission
        localStorage.removeItem(FORM_STORAGE_KEY);
        setHasSavedData(false);

        // Show success message
        setFormSuccess(true);
        toast({
          title: "Success!",
          description: response.message,
          variant: "default",
        });

        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          location: "",
          customerType: "",
          companyName: "",
          companyRating: "",
          contractLoad: "",
          rooftopArea: "",
          message: "",
        });
        setValidFields({});
      } else {
        // Handle validation errors from server
        if (response.errors) {
          const newErrors: Record<string, string> = {};
          Object.entries(response.errors).forEach(([key, messages]) => {
            newErrors[key] = messages[0];
          });
          setErrors(newErrors);
        }

        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClasses = (fieldName: string) => {
    let baseClasses =
      "w-full px-2 py-2 border rounded text-xs xl:text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary h-9 xl:h-11 placeholder:text-xs xl:placeholder:text-sm";

    if (focusedField === fieldName) {
      baseClasses += " form-field-focus shadow-lg border-secondary";
    } else if (errors[fieldName]) {
      baseClasses += " border-red-500 bg-red-50";
    } else if (validFields[fieldName]) {
      baseClasses += " border-green-400 bg-green-50";
    } else {
      baseClasses += " border-yellow-200";
    }

    return baseClasses;
  };

  // Get save status indicator
  const getSaveStatusIndicator = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <div className="flex items-center text-gray-500 text-sm animate-pulse">
            <Save className="h-4 w-4 mr-1" />
            <span>Saving...</span>
          </div>
        );
      case "saved":
        return (
          <div className="flex items-center text-green-600 text-sm animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span>Saved</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center text-red-500 text-sm">
            <span>Could not save</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 px-10 md:px-32 xl:px-4 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto">
        

        {formSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center max-w-2xl mx-auto animate-in fade-in zoom-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="xl:text-2xl text-xl font-bold text-green-800 mb-2">
              Thank You!
            </h3>
            <p className="xl:text-lg text-base text-green-700 mb-6">
              Your inquiry has been submitted successfully. Our team will
              contact you shortly.
            </p>
            <ShinyButton className="bg-amplusOrange text-white py-3 rounded-md  transition-all">
              <div className="flex items-center justify-center">
                Submit Another Inquiry
              </div>
            </ShinyButton>
          </div>
        ) : (
          <>
            {/* Autosave status and clear button */}
            <div className="flex justify-between items-center max-w-7xl mx-auto mb-4 px-2">
              {getSaveStatusIndicator()}

              {hasSavedData && (
                <button
                  type="button"
                  onClick={clearSavedFormData}
                  className="flex items-center text-sm text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear saved data
                </button>
              )}
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={`grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 staggered-animation ${
                formVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  placeholder="Name"
                  className={getFieldClasses("name")}
                  disabled={isSubmitting}
                />
                {validFields.name && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5 animate-in fade-in" />
                )}
                {errors.name && (
                  <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="relative">
                <MaskedInput
                  mask="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(maskedValue) => {
                    setFormData((prev) => ({ ...prev, phone: maskedValue }));

                    // Clear error when user types
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: "" }));
                    }
                  }}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  placeholder="Phone Number"
                  disabled={isSubmitting}
                  error={errors.phone}
                  isValid={validFields.phone}
                  showValidIcon={validFields.phone}
                  icon={<Hash className="h-5 w-5" />}
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  placeholder="Email ID"
                  className={getFieldClasses("email")}
                  disabled={isSubmitting}
                />
                {validFields.email && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5 animate-in fade-in" />
                )}
                {errors.email && (
                  <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Location Field */}
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  onFocus={() => handleFocus("location")}
                  onBlur={() => handleBlur("location")}
                  placeholder="Location"
                  className={getFieldClasses("location")}
                  disabled={isSubmitting}
                />
                {validFields.location && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5 animate-in fade-in" />
                )}
                {errors.location && (
                  <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Customer Type Dropdown */}
              <div className="relative">
                <div className="relative">
                  <select
                    name="customerType"
                    value={formData.customerType}
                    onChange={handleChange}
                    onFocus={() => handleFocus("customerType")}
                    onBlur={() => handleBlur("customerType")}
                    className={`appearance-none ${getFieldClasses(
                      "customerType"
                    )} text-xs xl:text-sm`}
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Customer Type
                    </option>
                    <option value="industrial">Industrial/Commercial</option>
                    <option value="residential">Residential</option>
                    <option value="government">Government</option>
                  </select>
                  <ChevronDown
                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === "customerType"
                        ? "text-secondary"
                        : "text-gray-400"
                    }`}
                    size={20}
                  />
                </div>
                {validFields.customerType && (
                  <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5 animate-in fade-in" />
                )}
                {errors.customerType && (
                  <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">
                    {errors.customerType}
                  </p>
                )}
              </div>

              {/* Company Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  onFocus={() => handleFocus("companyName")}
                  onBlur={() => handleBlur("companyName")}
                  placeholder="Company Name"
                  className={getFieldClasses("companyName")}
                  disabled={isSubmitting}
                />
                {validFields.companyName && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5 animate-in fade-in" />
                )}
                {errors.companyName && (
                  <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Company Rating Dropdown */}
              <div className="relative">
                <div className="relative">
                  <select
                    name="companyRating"
                    value={formData.companyRating}
                    onChange={handleChange}
                    onFocus={() => handleFocus("companyRating")}
                    onBlur={() => handleBlur("companyRating")}
                    className={`appearance-none ${getFieldClasses(
                      "companyRating"
                    )} text-xs xl:text-sm`}
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Company Rating
                    </option>
                    <option value="AAA">AAA</option>
                    <option value="AA">AA</option>
                    <option value="A">A</option>
                    <option value="BBB">BBB</option>
                    <option value="BB">BB</option>
                    <option value="B">B</option>
                  </select>
                  <ChevronDown
                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === "companyRating"
                        ? "text-secondary"
                        : "text-gray-400"
                    }`}
                    size={20}
                  />
                </div>
                {validFields.companyRating && (
                  <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5 animate-in fade-in" />
                )}
                {errors.companyRating && (
                  <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">
                    {errors.companyRating}
                  </p>
                )}
              </div>

              {/* Contract Load Dropdown */}
              <div className="relative">
                <div className="relative">
                  <select
                    name="contractLoad"
                    value={formData.contractLoad}
                    onChange={handleChange}
                    onFocus={() => handleFocus("contractLoad")}
                    onBlur={() => handleBlur("contractLoad")}
                    className={`appearance-none ${getFieldClasses(
                      "contractLoad"
                    )} text-xs xl:text-sm`}
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Contract Load (kVA/kW)
                    </option>
                    <option value="0-50">0-50 kVA/kW</option>
                    <option value="51-100">51-100 kVA/kW</option>
                    <option value="101-500">101-500 kVA/kW</option>
                    <option value="501-1000">501-1000 kVA/kW</option>
                    <option value="1000+">1000+ kVA/kW</option>
                  </select>
                  <ChevronDown
                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === "contractLoad"
                        ? "text-secondary"
                        : "text-gray-400"
                    }`}
                    size={20}
                  />
                </div>
                {validFields.contractLoad && (
                  <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5 animate-in fade-in" />
                )}
                {errors.contractLoad && (
                  <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">
                    {errors.contractLoad}
                  </p>
                )}
              </div>

              {/* Rooftop Area Dropdown */}
              <div className="relative">
                <div className="relative">
                  <select
                    name="rooftopArea"
                    value={formData.rooftopArea}
                    onChange={handleChange}
                    onFocus={() => handleFocus("rooftopArea")}
                    onBlur={() => handleBlur("rooftopArea")}
                    className={`appearance-none ${getFieldClasses(
                      "rooftopArea"
                    )} text-xs xl:text-sm`}
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Rooftop Area (Sq. ft)
                    </option>
                    <option value="0-1000">0-1,000 sq. ft</option>
                    <option value="1001-5000">1,001-5,000 sq. ft</option>
                    <option value="5001-10000">5,001-10,000 sq. ft</option>
                    <option value="10001-50000">10,001-50,000 sq. ft</option>
                    <option value="50000+">50,000+ sq. ft</option>
                  </select>
                  <ChevronDown
                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === "rooftopArea"
                        ? "text-secondary"
                        : "text-gray-400"
                    }`}
                    size={20}
                  />
                </div>
                {validFields.rooftopArea && (
                  <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5 animate-in fade-in" />
                )}
                {errors.rooftopArea && (
                  <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">
                    {errors.rooftopArea}
                  </p>
                )}
              </div>

              {/* Message Field - Full Width */}
              <div className="relative md:col-span-2 lg:col-span-3">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  placeholder="Message"
                  rows={5}
                  className={getFieldClasses("message")}
                  disabled={isSubmitting}
                ></textarea>
                {validFields.message && (
                  <CheckCircle2 className="absolute right-3 top-5 text-green-500 h-5 w-5 animate-in fade-in" />
                )}
                {errors.message && (
                  <p className="absolute text-red-500 text-xs mt-1 animate-in fade-in">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* reCAPTCHA v2 Checkbox */}
              <div className="md:col-span-2 lg:col-span-3 flex justify-center">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token: string | null) => {
                    setCaptchaToken(token);
                    setCaptchaError(null);
                  }}
                  onExpired={() => setCaptchaToken(null)}
                />
              </div>
              {captchaError && (
                <div className="md:col-span-2 lg:col-span-3">
                  <p className="text-red-500 text-sm text-center mt-2">
                    {captchaError}
                  </p>
                </div>
              )}

              {/* Submit Button - Centered */}
              <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-6">
                <ShinyButton className="bg-amplusOrange text-white py-3 rounded-md  transition-all">
                  <div className="flex items-center justify-center text-xs xl:text-sm">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Processing...
                      </>
                    ) : (
                      "Switch to Clean Energy"
                    )}
                  </div>
                </ShinyButton>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
