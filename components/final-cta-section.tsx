"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ShinyButton } from "./ui/animated-button";

export default function FinalCTASection({ data }: { data: any }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 px-4 sm:px-8 md:px-16 lg:px-28">
      <div className="container mx-auto px-0 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 lg:p-16 max-w-6xl mx-auto relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f47920]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1e3a6e]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
              <motion.h2
                className="text-2xl sm:text-3xl xl:text-4xl font-bold text-[#1e3a6e] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {data.finalctaSection.title}
              </motion.h2>
              <motion.p
                className="text-gray-600 text-base xl:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                 {data.finalctaSection.description}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ShinyButton className="px-8 py-3 bg-[#f47920] hover:bg-[#e06a10] text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg text-center min-w-[160px]">
                {" "}
                <Link
                  href="/contact-us"
                  className="text-xs xl:text-base"
                >
                   {data.finalctaSection.btn1}
                </Link>
              </ShinyButton>

              <ShinyButton className="px-8 py-3 bg-[#1e3a6e] hover:bg-[#162d57] text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg text-center min-w-[160px]">
                {" "}
                <Link
                  href="/contact-us"
                  className="text-xs xl:text-base"
                >
                   {data.finalctaSection.btn2}
                </Link>
              </ShinyButton>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
