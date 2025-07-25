"use client"
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
    to: number;
    from?: number;
    direction?: "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
    startWhen?: boolean;
    separator?: string;
    decimals?: number;  // New prop for decimal places
    onStart?: () => void;
    onEnd?: () => void;
}

export default function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2, // Duration of the animation in seconds
    className = "",
    startWhen = true,
    separator = "",
    decimals = 0,  // Default to 0 decimal places
    onStart,
    onEnd,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === "down" ? to : from);

    // Calculate damping and stiffness based on duration
    const damping = 20 + 40 * (1 / duration); // Adjust this formula for finer control
    const stiffness = 100 * (1 / duration);   // Adjust this formula for finer control

    const springValue = useSpring(motionValue, {
        damping,
        stiffness,
    });

    const isInView = useInView(ref, { once: true, margin: "0px" });

    // Helper function to format number with proper decimals
    const formatNumber = (value: number) => {
        const options = {
            useGrouping: !!separator,
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        };

        const formattedNumber = Intl.NumberFormat("en-US", options).format(value);
        return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    };

    // Set initial text content to the initial value based on direction
    useEffect(() => {
        if (ref.current) {
            const initialValue = direction === "down" ? to : from;
            ref.current.textContent = formatNumber(initialValue);
        }
    }, [from, to, direction, decimals]);

    // Start the animation when in view and startWhen is true
    useEffect(() => {
        if (isInView && startWhen) {
            if (typeof onStart === "function") {
                onStart();
            }

            const timeoutId = setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);

            const durationTimeoutId = setTimeout(() => {
                if (typeof onEnd === "function") {
                    onEnd();
                }
            }, delay * 1000 + duration * 1000);

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(durationTimeoutId);
            };
        }
    }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

    // Update text content with formatted number on spring value change
    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                // Use the actual value without rounding for decimal support
                const value = Number(latest.toFixed(decimals));
                ref.current.textContent = formatNumber(value);
            }
        });

        return () => unsubscribe();
    }, [springValue, separator, decimals]);

    return <span className={`${className}`} ref={ref} />;
}