'use client';

import { motion, useScroll, useSpring, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Code2, Users, Lightbulb, Rocket, Heart } from 'lucide-react';

// Magnetic button component
const MagneticButton = ({
  children,
  className = '',
  strength = 30,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || prefersReducedMotion) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (strength / 2);
    const y = (e.clientY - centerY) / (strength / 2);

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(position.x, springConfig);
  const ySpring = useSpring(position.y, springConfig);

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

export function JoinSection() {
  const t = useTranslations('IndexPage');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const springConfig = { stiffness: 100, damping: 30 };
  const smoothY = useSpring(y, springConfig);
  const smoothOpacity = useSpring(opacity, springConfig);

  const roles = [
    {
      key: 'developers',
      icon: Code2,
      gradient: 'from-blue-500 to-purple-600',
      delay: 0
    },
    {
      key: 'designers',
      icon: Heart,
      gradient: 'from-pink-500 to-rose-600',
      delay: 0.1
    },
    {
      key: 'data_scientists',
      icon: Lightbulb,
      gradient: 'from-yellow-500 to-orange-600',
      delay: 0.2
    },
    {
      key: 'project_managers',
      icon: Rocket,
      gradient: 'from-[#000095] to-blue-600',
      delay: 0.3
    },
    {
      key: 'community_organizers',
      icon: Users,
      gradient: 'from-indigo-500 to-blue-600',
      delay: 0.4
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative overflow-hidden py-32"
      style={{
        y: prefersReducedMotion ? 0 : smoothY,
        opacity: prefersReducedMotion ? 1 : smoothOpacity,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-100 opacity-50 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
            <motion.div
              className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-100 opacity-50 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -30, 0],
                y: [0, -50, 0]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="h-1 w-16 bg-gradient-to-r from-[#000095] to-blue-600 rounded-full mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />

              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
                {t('join.title')}
              </h2>

              <p className="mt-6 text-base md:text-lg text-gray-600 max-w-xl">
                {t('join.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
                {t('join.section.title')}
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-8">
                {t('join.section.description')}
              </p>

              <MagneticButton
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#000095] to-blue-700 text-white rounded-full font-semibold text-base md:text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                strength={40}
                onClick={() => window.open('https://github.com/code-for-taiwan', '_blank')}
              >
                {t('join.cta')}
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right side - Role cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {roles.map((role, index) => {
                const Icon = role.icon;
                const isLast = index === roles.length - 1;

                return (
                  <motion.div
                    key={role.key}
                    className={`${isLast ? 'col-span-2 lg:col-span-1' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: role.delay,
                      type: 'spring',
                      stiffness: 100
                    }}
                  >
                    <motion.div
                      className="relative group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl`} />

                      <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${role.gradient} mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <h4 className="font-semibold text-base md:text-lg text-gray-800 mb-2">
                          {t(`join.roles.${role.key}`)}
                        </h4>

                        <p className="text-sm text-gray-600">
                          {t(`join.roles.${role.key}_description`)}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Floating decoration */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -z-10 top-1/2 left-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 opacity-30 blur-3xl"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 10, repeat: Infinity, repeatType: 'reverse' }
                }}
                style={{
                  transformOrigin: 'center',
                  x: '-50%',
                  y: '-50%'
                }}
              />
            )}
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { value: '500+', label: t('stats.contributors') },
            { value: '50+', label: t('stats.projects') },
            { value: '200+', label: t('stats.events') },
            { value: '100K+', label: t('stats.impact') },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.6 + i * 0.1,
                type: 'spring'
              }}
            >
              <div className="text-2xl md:text-3xl font-bold text-[#000095]">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}