"use client";

import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useRef, useState } from "react";

// Enhanced SplitText animation component with character-by-character animation
const SplitText = ({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  staggerChildren = 0.015,
  ease = [0.33, 1, 0.68, 1],
  threshold = 0.5,
  once = true,
  animationType = "chars",
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  ease?: number[];
  threshold?: number;
  once?: boolean;
  animationType?: "chars" | "words" | "lines";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion is preferred, just render the text
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  // Split text into words and characters
  const words = text.split(" ");

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay || 0,
      },
    }),
  };

  const child: Variants = {
    hidden: {
      y: 40,
      opacity: 0,
      rotateX: -10,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration,
        ease,
      },
    },
  };

  // For character-by-character animation
  if (animationType === "chars") {
    return (
      <motion.span
        animate={isInView ? "visible" : "hidden"}
        className={`inline-block ${className}`}
        initial="hidden"
        ref={ref}
        variants={container}
      >
        {words.map((word, wordIndex) => (
          <span className="relative mr-[0.25em] inline-block" key={wordIndex}>
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                className="relative inline-block"
                custom={charIndex * 0.1}
                key={charIndex}
                style={{
                  // Add slight random rotation for more organic feel
                  transformOrigin: "bottom",
                  display: "inline-block",
                  willChange: "transform",
                }}
                // Add slight variation to each character
                variants={child}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    );
  }

  // For word-by-word animation
  if (animationType === "words") {
    return (
      <motion.span
        animate={isInView ? "visible" : "hidden"}
        className={`inline-block ${className}`}
        initial="hidden"
        ref={ref}
        variants={container}
      >
        {words.map((word, i) => (
          <motion.span
            className="mr-[0.25em] inline-block"
            key={i}
            variants={child}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // For line-by-line animation (default fallback)
  return (
    <motion.span
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      ref={ref}
      transition={{
        duration,
        ease,
        delay,
      }}
    >
      {text}
    </motion.span>
  );
};

// Custom hook for checking if element is in view
function useInView(
  ref: React.RefObject<HTMLElement>,
  options: { once?: boolean; amount?: number }
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting && options.once) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options.amount || 0,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options.amount, options.once]);

  return isInView;
}

// Custom cursor component that follows mouse position
const CustomCursor = ({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (prefersReducedMotion) return null;

  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  // Create a template for the cursor background
  const cursorBackground = useMotionTemplate`radial-gradient(
    circle at center,
    ${isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.07)"} 0%,
    transparent 100%
  )`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background: cursorBackground,
        backgroundSize: "400px 400px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: useMotionTemplate`${cursorX}px ${cursorY}px`,
      }}
    />
  );
};

// Magnetic button that attracts to cursor
const MagneticButton = ({
  children,
  className = "",
  strength = 30,
  href = "#",
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || prefersReducedMotion) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const x = (e.clientX - centerX) / (strength / 2);
    const y = (e.clientY - centerY) / (strength / 2);

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(position.x, springConfig);
  const ySpring = useSpring(position.y, springConfig);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={buttonRef}
    >
      <motion.a
        className={`relative block ${className}`}
        href={href}
        style={{
          x: xSpring,
          y: ySpring,
        }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>

      <AnimatePresence>
        {isHovered && !prefersReducedMotion && (
          <motion.div
            animate={{ opacity: 0.7, scale: 1.2 }}
            className="-z-10 absolute inset-0 rounded-full bg-slate-100 blur-md dark:bg-slate-800"
            exit={{ opacity: 0, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FeatureSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  // Smooth spring-based values for better animation
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothY = useSpring(y, springConfig);
  const smoothOpacity = useSpring(opacity, springConfig);

  return (
    <>
      {!prefersReducedMotion && (
        <CustomCursor mouseX={mouseX} mouseY={mouseY} />
      )}

      <motion.section
        animate={{ opacity: 1 }}
        className="relative overflow-hidden py-32"
        initial={{ opacity: 0 }}
        ref={containerRef}
        style={{
          y: prefersReducedMotion ? 0 : smoothY,
          opacity: prefersReducedMotion ? 1 : smoothOpacity,
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            {/* Left column with text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div
                  animate={{ width: "4rem" }}
                  className="h-px w-16 bg-slate-300 dark:bg-slate-700"
                  initial={{ width: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />

                <h2 className="font-light text-4xl text-slate-900 tracking-tight md:text-5xl dark:text-white">
                  <SplitText
                    animationType="chars"
                    delay={0.3}
                    duration={0.7}
                    staggerChildren={0.01}
                    text="Transform your"
                  />
                  <br />
                  <SplitText
                    animationType="chars"
                    className="font-medium"
                    delay={0.5}
                    duration={0.7}
                    staggerChildren={0.01}
                    text="digital experience"
                  />
                </h2>
              </div>

              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md text-lg text-slate-600 dark:text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Join the community of forward-thinking teams who have already
                elevated their workflow.
              </motion.p>

              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <MagneticButton
                  className="inline-flex h-14 items-center justify-center rounded-full bg-slate-900 px-8 font-medium text-sm text-white dark:bg-white dark:text-slate-900"
                  strength={40}
                >
                  Get started
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right column with visual element */}
            <div className="relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Animated circles */}
                {!prefersReducedMotion &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      animate={{
                        opacity: 1 - i * 0.2,
                        scale: 1,
                        rotate: i % 2 === 0 ? 360 : -360,
                      }}
                      className="absolute rounded-full border border-slate-200 dark:border-slate-800"
                      initial={{ opacity: 0, scale: 0.8 }}
                      key={i}
                      style={{
                        width: `${(i + 1) * 150}px`,
                        height: `${(i + 1) * 150}px`,
                      }}
                      transition={{
                        duration: 20 + i * 5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "linear",
                        delay: i * 0.2,
                      }}
                    />
                  ))}

                {/* Central element */}
                <motion.div
                  animate={{ scale: 1 }}
                  className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 dark:bg-white"
                  initial={{ scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.8,
                  }}
                >
                  <motion.svg
                    animate={{ opacity: 1 }}
                    className="text-white dark:text-slate-900"
                    fill="none"
                    height="32"
                    initial={{ opacity: 0 }}
                    transition={{ delay: 1.2 }}
                    viewBox="0 0 24 24"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L20 20H4L12 4Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </motion.svg>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom section with stats */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-24 border-slate-200 border-t pt-12 dark:border-slate-800"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { label: "Active users", value: "10K+" },
                { label: "Countries", value: "120+" },
                { label: "Uptime", value: "99.9%" },
                { label: "Satisfaction", value: "4.9/5" },
              ].map((stat, i) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  key={i}
                  transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
                >
                  <div className="font-medium text-2xl text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-slate-500 text-sm dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
