"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  DollarSign,
  Award,
  TrendingUp,
} from "lucide-react";
import { ShinyButton } from "./ui/animated-button";

export default function RenewableEnergyBenefitsSection({ data }: { data: any }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Significant Cost Savings",
      description:
        "Reduce up to 50% in your energy costs through renewable energy solutions",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Achieve RE100 Goals",
      description:
        "Achieve your 100% renewable energy goals and position yourself as a forefront leader",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Develop a Competitive Advantage",
      description:
        "Gain a competitive advantage by embracing green business practices",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden px-4 sm:px-8 md:px-16 lg:px-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <h2 className="text-3xl xl:text-4xl font-bold mb-6">
              <span className="text-[#1e3a6e]">Why </span>
              <span className="text-[#f47920]">{data.renewableEnergyBenefitsSection.title1}</span>
              <span className="text-[#1e3a6e]">
                {" "}
                {data.renewableEnergyBenefitsSection.title2}
              </span>
            </h2>
            <div className="relative h-56 sm:h-72 md:h-[300px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={data.renewableEnergyBenefitsSection.image.url}
                alt="Renewable energy landscape with solar panels and wind turbines"
                fill
                className="object-cover"
              />

              {/* Glass overlay with animated gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-[#1e3a6e]/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />

              {/* Animated floating elements */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-[#f47920]/20 backdrop-blur-sm"
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-[#1e3a6e]/20 backdrop-blur-sm"
                animate={{
                  y: [0, 15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>

            {/* Glass card overlay */}
            <motion.div
              className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 p-3 sm:p-6 rounded-xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 w-[90%] sm:w-3/4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-lg sm:text-sm font-bold text-[#1e3a6e] mb-1 sm:mb-2">
              {data.renewableEnergyBenefitsSection.imageTitle}
              </h3>
              <p className="text-gray-700 text-sm sm:xs">
              {data.renewableEnergyBenefitsSection.imageDescription}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <motion.div
                    className="mr-4 p-2 xl:p-4 rounded-full bg-gradient-to-br from-[#f47920] to-[#f8a05f] text-white shadow-lg flex-shrink-0"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    {benefit.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-lg xl:text-xl font-semibold text-[#1e3a6e] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm xl:text-base">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* <motion.div variants={itemVariants} className="mt-8">
              <ShinyButton className="bg-[#f47920]">
                <div className="flex items-center gap-2 h-8 text-xs xl:text-base">
                  <div>Learn More About Benefits</div>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </ShinyButton>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
