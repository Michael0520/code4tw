'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Code, Users, Lightbulb, Eye } from 'lucide-react';

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 50;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#000095] to-blue-600 bg-clip-text text-transparent">
        {count}{suffix}
      </span>
    </div>
  );
}

export function AboutSection() {
  const t = useTranslations('IndexPage');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const values = [
    {
      icon: Code,
      key: 'open_source',
      gradient: 'from-blue-500 to-blue-600',
      delay: 0
    },
    {
      icon: Users,
      key: 'community_driven',
      gradient: 'from-purple-500 to-purple-600',
      delay: 0.1
    },
    {
      icon: Lightbulb,
      key: 'innovation',
      gradient: 'from-yellow-500 to-yellow-600',
      delay: 0.2
    },
    {
      icon: Eye,
      key: 'transparency',
      gradient: 'from-[#000095] to-blue-600',
      delay: 0.3
    }
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'contributors' },
    { value: 50, suffix: '+', label: 'projects' },
    { value: 200, suffix: '+', label: 'events' },
    { value: 100, suffix: 'K+', label: 'impact' }
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: value.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} p-4 mb-6`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
                    {t(`about.values.${value.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`about.values.${value.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl" />
          <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-gray-200/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                    type: "spring"
                  }}
                  className="text-center"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-gray-700 font-medium">
                    {t(`stats.${stat.label}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}