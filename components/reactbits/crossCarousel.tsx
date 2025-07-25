import React, { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

// New props for image carousel
interface CrossCarouselProps {
  imageRows: string[][]; // Array of arrays of image URLs
  rowSpeeds?: number[]; // Optional: speed for each row
  rowHeight?: number; // Optional: height for each row (px)
  numCopies?: number; // Optional: number of copies for seamless scroll
  className?: string;
  rowClassName?: string;
  imageClassName?: string;
  style?: React.CSSProperties;
}

function useElementWidth(ref: React.RefObject<HTMLDivElement>): number {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);
  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return "0px";
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies!; i++) {
      spans.push(
        <div
          className={`flex-shrink-0 ${className}`}
          key={i}
          ref={i === 0 ? copyRef : null}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        className={`${parallaxClassName} relative overflow-hidden`}
        style={parallaxStyle}
      >
        <motion.div
          className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text: string, index: number) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;

// VelocityRow: renders a row of images with seamless scroll
const VelocityRow: React.FC<{
  images: string[];
  baseVelocity: number;
  rowHeight: number;
  numCopies: number;
  className?: string;
  imageClassName?: string;
}> = ({ images, baseVelocity, rowHeight, numCopies, className = '', imageClassName = '' }) => {
  const baseX = useMotionValue(0);
  const copyRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const copyWidth = useElementWidth(copyRef);

  function wrap(min: number, max: number, v: number): number {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  // Render numCopies of the image row for seamless effect
  const rows = [];
  for (let i = 0; i < numCopies; i++) {
    rows.push(
      <div
        className={`flex flex-shrink-0 ${className}`}
        key={i}
        ref={i === 0 ? copyRef : null}
        style={{ height: rowHeight, alignItems: 'center' }}
      >
        {images.map((src, idx) => (
          <img
            src={src}
            alt="carousel-img"
            key={idx}
            className={`mx-8 ${imageClassName}`}
            style={{ height: rowHeight * 0.8, objectFit: 'contain', width: 'auto' }}
            loading="lazy"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full" style={{ height: rowHeight }}>
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {rows}
      </motion.div>
    </div>
  );
};

// Main CrossCarousel component
export const CrossCarousel: React.FC<CrossCarouselProps> = ({
  imageRows,
  rowSpeeds = [],
  rowHeight = 100,
  numCopies = 6,
  className = '',
  rowClassName = '',
  imageClassName = '',
  style = {},
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`} style={style}>
      {imageRows.map((images, idx) => (
        <VelocityRow
          key={idx}
          images={images}
          baseVelocity={rowSpeeds[idx] ?? (idx % 2 === 0 ? 50 : -50)}
          rowHeight={rowHeight}
          numCopies={numCopies}
          className={rowClassName}
          imageClassName={imageClassName}
        />
      ))}
    </div>
  );
};

// Sample usage export
export const CrossCarouselSample = () => {
  // Example: 3 rows, each with 6 images
  const imageRows = [
    [
      "/images/sandisk.png",
      "/images/schlumberger.png",
      "/images/showa.png",
      "/images/fortis.png",
      "/images/andritz.png",
      "/images/cipla.png",
    ],
    [
      "/images/oracle.png",
      "/images/ultratech.png",
      "/images/tvs.png",
      "/images/vatika.png",
      "/images/hilton.png",
      "/images/standardchartered.png",
    ],
    [
      "/images/ge.png",
      "/images/metro.png",
      "/images/pepsico.png",
      "/images/indiaemblem.png",
      "/images/dominos.png",
      "/images/decathlon.png",
    ],
  ];
  const rowSpeeds = [10, -10, 10];
  return (
    <div className="w-full bg-white py-8">
      <CrossCarousel
        imageRows={imageRows}
        rowSpeeds={rowSpeeds}
        rowHeight={90}
        numCopies={5}
        className="mx-auto max-w-7xl"
        imageClassName="h-16"
      />
    </div>
  );
};
