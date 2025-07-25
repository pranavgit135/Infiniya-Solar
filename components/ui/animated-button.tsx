"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, type AnimationProps } from "motion/react";
import React from "react";

const animationProps = {
  initial: { "--x": "100%" },
  whileHover: { 
    "--x": "-100%",
    transition: {
      duration: 1,
      ease: "linear"
    }
  },
  whileTap: { scale: 0.95 },
} as AnimationProps;

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium overflow-hidden bg-white/30 backdrop-blur-xl transition-all duration-300 ease-in-out hover:shadow-lg dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/20%]",
        className,
      )}
      {...animationProps}
      {...props}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-white"
      >
        {children}
      </span>
      <span
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          transform: "translateX(var(--x))",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit]"
      ></span>
    </motion.button>
  );
});

ShinyButton.displayName = "ShinyButton";
