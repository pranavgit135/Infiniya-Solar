"use client";

import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-8">
            <Image
              src="/logo.png"
              alt="Infinia Solar Logo"
              width={150}
              height={50}
              className="h-12 w-auto md:h-10 md:w-auto sm:h-8 sm:w-auto"
            />
          </Link>
          </div>
         
        
        <div className="flex items-center">
        <nav className="hidden md:flex space-x-6 md:space-x-4 sm:space-x-2">
            <Link
              href="/"
              className={`transition-colors text-base md:text-lg sm:text-xs px-1 md:px-0.5 sm:px-0.5 ${
                isActive("/")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`transition-colors text-base md:text-lg sm:text-xs px-1 md:px-0.5 sm:px-0.5 ${
                isActive("/about-us")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/projects"
              className={`transition-colors text-base md:text-lg sm:text-xs px-1 md:px-0.5 sm:px-0.5 ${
                isActive("/projects")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/services"
              className={`transition-colors text-base md:text-lg sm:text-xs px-1 md:px-0.5 sm:px-0.5 ${
                isActive("/services")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Services
            </Link>
            <Link
              href="/contact-us"
              className={`transition-colors text-base md:text-lg sm:text-xs px-1 md:px-0.5 sm:px-0.5 pr-10 ${
                isActive("/contact-us")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Contact Us
            </Link>
            {/* <Link
              href="/knowledge-centre"
              className={`transition-colors text-base md:text-sm sm:text-xs px-1 md:px-0.5 sm:px-0.5 ${
                isActive("/knowledge-centre")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Knowledge Centre
            </Link> */}
            {/* <Link
              href="/Infinia-in-media"
              className={`transition-colors text-base md:text-sm sm:text-xs px-1 md:px-0.5 sm:px-0.5 ${
                isActive("/Infinia-in-media")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Infinia In Media
            </Link> */}
          </nav>
          <div className="hidden md:block mr-4 ml-10">
            <p className="text-sm text-gray-500">Have any Question?</p>
            <a
              href="tel:1800-572-8070"
              className="flex items-center text-gray-800 font-medium"
            >
              <Phone className="h-4 w-4 mr-1" />
              1800-572-8070
            </a>
          </div>
          <Link
            href="/contact"
            className={`hidden md:block px-4 py-2 rounded-md transition-colors ${
              isActive("/contact")
                ? "bg-[#e06a10] text-white"
                : "bg-[#f47920] hover:bg-[#e06a10] text-white"
            }`}
          >
            Get in Touch
          </Link>
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-xl transform transition-transform md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <Image
              src="/logo.png"
              alt="Infinia Solar Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <nav className="flex flex-col  space-y-4">
            <Link
              href="/"
              className={`py-2 text-lg transition-colors ${
                isActive("/")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`py-2 text-lg transition-colors ${
                isActive("/about-us")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/projects"
              className={`py-2 text-lg transition-colors ${
                isActive("/projects")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Projects
            </Link>
            {/* <Link
              href="/what-we-offer"
              className={`py-2 transition-colors ${
                isActive("/what-we-offer")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              What We Offer
            </Link> */}
            <Link
              href="/contact-us"
              className={`py-2 text-lg transition-colors ${
                isActive("/contact-us")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Contact Us
            </Link>
            {/* <Link
              href="/knowledge-centre"
              className={`py-2 transition-colors ${
                isActive("/knowledge-centre")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Knowledge Centre
            </Link> */}
            {/* <Link
              href="/Infinia-in-media"
              className={`py-2 transition-colors ${
                isActive("/Infinia-in-media")
                  ? "text-[#f47920] font-medium"
                  : "text-gray-700 hover:text-[#f47920]"
              }`}
            >
              Infinia In Media
            </Link> */}
          </nav>
          <div className="pt-6 border-t">
            <p className="text-sm text-gray-500">Have any Question?</p>
            <a
              href="tel:1800-572-8070"
              className="flex items-center text-gray-800 font-medium mt-1"
            >
              <Phone className="h-4 w-4 mr-1" />
              1800-572-8070
            </a>
            <Link
              href="/contact"
              className="mt-4 block w-full px-4 py-2 text-center rounded-md bg-[#f47920] hover:bg-[#e06a10] text-white transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;