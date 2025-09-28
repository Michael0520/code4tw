'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  type Variants
} from 'motion/react';
import type React from 'react';
import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {Code, Palette, Database, Calendar, Users, Heart} from 'lucide-react';
import {BrandKeywordHighlight, BRAND_KEYWORDS} from './BrandKeywordHighlight';
import TextAnimate from './TextAnimate';

// Enhanced SplitText animation component
const SplitText = ({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  staggerChildren = 0.015,
  ease = [0.33, 1, 0.68, 1],
  threshold = 0.5,
  once = true,
  animationType = 'chars'
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  ease?: number[];
  threshold?: number;
  once?: boolean;
  animationType?: 'chars' | 'words' | 'lines';
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {once, amount: threshold});
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  const container: Variants = {
    hidden: {opacity: 0},
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay || 0
      }
    })
  };

  const child: Variants = {
    hidden: {
      y: 40,
      opacity: 0,
      rotateX: -10
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration,
        ease: ease as any
      }
    }
  };

  if (animationType === 'chars') {
    return (
      <motion.span
        animate={isInView ? 'visible' : 'hidden'}
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
                  transformOrigin: 'bottom',
                  display: 'inline-block',
                  willChange: 'transform'
                }}
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

  if (animationType === 'words') {
    return (
      <motion.span
        animate={isInView ? 'visible' : 'hidden'}
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

  return (
    <motion.span
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
      className={`inline-block ${className}`}
      initial={{opacity: 0, y: 20}}
      ref={ref}
      transition={{
        duration,
        ease: ease as any,
        delay
      }}
    >
      {text}
    </motion.span>
  );
};

// Custom hook for checking if element is in view
function useInView(
  ref: React.RefObject<HTMLElement | HTMLDivElement | null>,
  options: {once?: boolean; amount?: number}
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
        threshold: options.amount || 0
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

// Magnetic button component
const MagneticButton = ({
  children,
  className = '',
  strength = 30,
  href = '#',
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({x: 0, y: 0});
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || prefersReducedMotion) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (strength / 2);
    const y = (e.clientY - centerY) / (strength / 2);

    setPosition({x, y});
  };

  const handleMouseLeave = () => {
    setPosition({x: 0, y: 0});
    setIsHovered(false);
  };

  const springConfig = {stiffness: 150, damping: 15};
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
      <motion.button
        className={`relative block ${className}`}
        onClick={onClick}
        style={{
          x: xSpring,
          y: ySpring
        }}
        whileTap={{scale: 0.98}}
      >
        {children}
      </motion.button>

      <AnimatePresence>
        {isHovered && !prefersReducedMotion && (
          <motion.div
            animate={{opacity: 0.3, scale: 1.1}}
            className="-z-10 absolute inset-0 rounded-full bg-blue-200 blur-md"
            exit={{opacity: 0, scale: 1}}
            initial={{opacity: 0, scale: 0.8}}
            transition={{duration: 0.3}}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Role card component
const RoleCard = ({
  icon: Icon,
  title,
  description,
  delay = 0
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {once: true, amount: 0.5});

  return (
    <motion.div
      ref={ref}
      animate={isInView ? {opacity: 1, y: 0, scale: 1} : {}}
      initial={{opacity: 0, y: 20, scale: 0.95}}
      transition={{duration: 0.5, delay}}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-xl hover:scale-[1.02] hover:border-blue-300">
        <motion.div
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50 blur-2xl"
          whileHover={{scale: 1.5, opacity: 0.7}}
          transition={{duration: 0.3}}
        />

        <div className="relative z-10">
          <motion.div
            whileHover={{rotate: 360, scale: 1.1}}
            transition={{duration: 0.5}}
            className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#000095] text-white shadow-lg"
          >
            <Icon className="h-6 w-6" />
          </motion.div>

          <h3 className="mb-2 text-lg md:text-xl font-bold text-gray-900">
            {title}
          </h3>
          <p className="text-base md:text-lg text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function JoinSectionImmersive() {
  const t = useTranslations('IndexPage');
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const roles = [
    {
      icon: Code,
      title: t('join.roles.developers'),
      description: t('join.roles.developers_description')
    },
    {
      icon: Palette,
      title: t('join.roles.designers'),
      description: t('join.roles.designers_description')
    },
    {
      icon: Database,
      title: t('join.roles.data_scientists'),
      description: t('join.roles.data_scientists_description')
    },
    {
      icon: Calendar,
      title: t('join.roles.project_managers'),
      description: t('join.roles.project_managers_description')
    },
    {
      icon: Users,
      title: t('join.roles.community_organizers'),
      description: t('join.roles.community_organizers_description')
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {!prefersReducedMotion && (
          <>
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-30 blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 opacity-30 blur-3xl"
            />
          </>
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left column with text */}
          <div className="space-y-8">
            <div className="flex flex-col">
              <motion.div
                animate={{width: '4rem'}}
                className="h-px w-16 bg-gradient-to-r from-[#000095] to-blue-600"
                initial={{width: 0}}
                transition={{duration: 1, delay: 0.2}}
              />

              <TextAnimate
                text="Frequently Asked "
                type="shiftInUp"
                className="text-3xl md:text-4xl font-bold tracking-tight mt-4 "
              />

              <h2 className="font-bold text-3xl text-gray-900 tracking-tight md:text-4xl">
                <BrandKeywordHighlight
                  text={t('join.title')}
                  keywords={['Community']}
                  normalClassName="text-gray-900"
                  brandKeywordClassName="font-brand text-gray-900"
                  animate={true}
                />
              </h2>

              {/* <div className="text-2xl md:text-3xl font-bold">
                <BrandKeywordHighlight
                  text={t('join.section.title')}
                  keywords={[]}
                  normalClassName="text-gray-900"
                  brandKeywordClassName="font-brand bg-gradient-to-r from-[#000095] to-blue-600 bg-clip-text text-transparent"
                  animate={true}
                />
              </div> */}
            </div>

            <motion.p
              animate={{opacity: 1, y: 0}}
              className="max-w-md text-lg md:text-xl text-gray-600"
              initial={{opacity: 0, y: 20}}
              transition={{duration: 0.8, delay: 0.8}}
            >
              <BrandKeywordHighlight
                text={t('join.description')}
                keywords={[]}
                normalClassName="text-gray-600"
                brandKeywordClassName="font-brand text-gray-600"
                animate={true}
              />
            </motion.p>

            <motion.div
              animate={{opacity: 1, y: 0}}
              initial={{opacity: 0, y: 20}}
              transition={{duration: 0.8, delay: 1}}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#000095] px-8 font-medium text-white shadow-lg hover:shadow-xl hover:bg-[#0000b3] transition-all"
                strength={40}
                onClick={() =>
                  window.open('https://discord.gg/pRFjDXeFyv', '_blank')
                }
              >
                {t('join.cta')}
              </MagneticButton>

              <MagneticButton
                className="inline-flex h-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white px-8 font-medium text-gray-900 hover:border-blue-500 transition-colors"
                strength={30}
                onClick={() => {
                  const faqSection = document.getElementById('faq');
                  faqSection?.scrollIntoView({behavior: 'smooth'});
                }}
              >
                {t('hero.learn_more')}
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right column with animated visual */}
          <div className="relative h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Modern gradient orbs background */}
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-blue-300/30 via-indigo-300/20 to-transparent blur-3xl"
                  />
                  <motion.div
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    }}
                    className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-blue-300/30 via-purple-300/20 to-transparent blur-3xl"
                  />
                </>
              )}

              {/* Central Code for Taiwan logo */}
              <motion.div
                animate={{scale: 1}}
                className="relative z-20 flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-2xl border border-gray-100"
                initial={{scale: 0}}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.5
                }}
                whileHover={{scale: 1.05}}
              >
                <motion.div
                  animate={{opacity: 1}}
                  initial={{opacity: 0}}
                  transition={{delay: 0.8}}
                  className="relative flex items-center justify-center"
                >
                  <Image
                    src="/bg-graphic.svg"
                    alt="Code for Taiwan"
                    width={100}
                    height={100}
                    className="w-25 h-25"
                  />
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/40 to-indigo-500/40 rounded-full blur-2xl animate-pulse" />
                </motion.div>
              </motion.div>

              {/* Orbiting icons with different radii to prevent overlap */}
              {!prefersReducedMotion && (
                <>
                  {/* Multiple orbit circles for each icon */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Circle for Code icon - smallest */}
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="130"
                      fill="none"
                      stroke="#6B7BDF"
                      strokeWidth="2"
                      strokeDasharray="10 10"
                      initial={{strokeDashoffset: 0}}
                      animate={{strokeDashoffset: -60}}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      opacity={0.35}
                    />
                    {/* Circle for Palette icon */}
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="155"
                      fill="none"
                      stroke="#8B9AE3"
                      strokeWidth="2"
                      strokeDasharray="12 8"
                      initial={{strokeDashoffset: 0}}
                      animate={{strokeDashoffset: 60}}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      opacity={0.3}
                    />
                    {/* Circle for Database icon */}
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="180"
                      fill="none"
                      stroke="#A4B1EA"
                      strokeWidth="1.5"
                      strokeDasharray="14 6"
                      initial={{strokeDashoffset: 0}}
                      animate={{strokeDashoffset: -60}}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      opacity={0.25}
                    />
                    {/* Circle for Users icon - largest */}
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="205"
                      fill="none"
                      stroke="#BCC5F0"
                      strokeWidth="1.5"
                      strokeDasharray="16 4"
                      initial={{strokeDashoffset: 0}}
                      animate={{strokeDashoffset: 60}}
                      transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      opacity={0.2}
                    />
                  </svg>

                  {/* Orbiting icons */}
                  {[
                    {Icon: Code, radius: 260, duration: 20, startAngle: 0},
                    {Icon: Palette, radius: 310, duration: 25, startAngle: 90},
                    {
                      Icon: Database,
                      radius: 360,
                      duration: 30,
                      startAngle: 180
                    },
                    {Icon: Users, radius: 410, duration: 35, startAngle: 270}
                  ].map(({Icon, radius, duration, startAngle}, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: [startAngle, startAngle + 360]
                      }}
                      className="absolute pointer-events-none"
                      style={{
                        width: radius,
                        height: radius,
                        left: '50%',
                        top: '50%',
                        marginLeft: -radius / 2,
                        marginTop: -radius / 2
                      }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatType: 'loop'
                      }}
                    >
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-2xl bg-[#000095] p-3 shadow-xl">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Role cards section */}
        <motion.div
          animate={{opacity: 1, y: 0}}
          className="mt-24"
          initial={{opacity: 0, y: 20}}
          transition={{duration: 0.8, delay: 1.2}}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, i) => (
              <RoleCard
                key={i}
                icon={role.icon}
                title={role.title}
                description={role.description}
                delay={1.3 + i * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
