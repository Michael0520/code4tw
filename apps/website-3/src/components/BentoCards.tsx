'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {
  Code2,
  Users,
  Lightbulb,
  Eye,
  Github,
  Globe,
  Database,
  Server,
  Brain,
  Sparkles
} from 'lucide-react';

// Tech Stack Animation - Open Source Card
export const TechStackSkeleton = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] flex-row gap-2 p-1">
      {/* GitHub Card */}
      <motion.div
        whileHover={{y: -8, rotate: -3}}
        transition={{type: 'spring', damping: 10, stiffness: 100}}
        className="h-full w-1/3 rounded-xl bg-gradient-to-br from-gray-50 to-white p-3 border border-gray-200 shadow-sm hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        <Github className="h-8 w-8 md:h-10 md:w-10 text-gray-700" />
        <p className="text-xs mt-1 font-bold text-gray-600 z-10">GitHub</p>
      </motion.div>

      {/* Open Data Card - Center */}
      <motion.div
        whileHover={{scale: 1.05, y: -5}}
        transition={{type: 'spring', damping: 10, stiffness: 100}}
        className="h-full relative z-20 w-1/3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3 border border-blue-300 shadow-md hover:shadow-xl flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{y: [0, -5, 0]}}
          transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
        >
          <Database className="h-8 w-8 md:h-10 md:w-10 text-[#000095]" />
        </motion.div>
        <p className="text-xs mt-1 font-bold text-blue-700">Open Data</p>
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-[#000095] rounded-full"
          animate={{scale: [0, 1, 0]}}
          transition={{duration: 2, repeat: Infinity}}
        />
      </motion.div>

      {/* Web APIs Card */}
      <motion.div
        whileHover={{y: -8, rotate: 3}}
        transition={{type: 'spring', damping: 10, stiffness: 100}}
        className="h-full w-1/3 rounded-xl bg-gradient-to-br from-blue-50 to-white p-3 border border-blue-200 shadow-sm hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        <Globe className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
        <p className="text-xs mt-1 font-bold text-blue-700 z-10">Web APIs</p>
      </motion.div>
    </div>
  );
};

// Animated Gradient Background with Pulse Effect
export const GradientSkeleton = () => {
  const variants = {
    initial: {backgroundPosition: '0% 50%'},
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl flex-col relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '200% 200%'
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="h-full w-full rounded-xl flex items-center justify-center"
      >
        <Server className="h-12 w-12 md:h-14 md:w-14 text-white drop-shadow-md" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
    </motion.div>
  );
};

// Community Testimonials with Floating Animation
export const TestimonialsSkeleton = () => {
  const t = useTranslations('IndexPage');
  const first = {
    initial: {x: 20, rotate: -3, y: 0},
    hover: {x: 0, rotate: 0, y: -3}
  };
  const second = {
    initial: {x: -20, rotate: 3, y: 0},
    hover: {x: 0, rotate: 0, y: -3}
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] flex-row gap-2 p-2"
    >
      <motion.div
        variants={first}
        transition={{type: 'spring', damping: 15}}
        className="h-full w-1/3 rounded-xl bg-gradient-to-br from-white to-gray-50 p-4 border border-gray-200 shadow-sm hover:shadow-lg flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{rotate: [0, 360]}}
          transition={{duration: 20, repeat: Infinity, ease: 'linear'}}
          className="rounded-full h-8 w-8 bg-[#000095] shadow-md"
        />
        <p className="text-xs text-center font-bold text-gray-800 mt-2 leading-tight">
          {t('about.testimonials.opensource_collaboration')}
        </p>
        <span className="bg-[#000095] text-white text-xs rounded-full px-2 py-0.5 mt-2 font-bold shadow-sm">
          {t('about.testimonials.developer')}
        </span>
      </motion.div>

      <motion.div
        whileHover={{y: -5, scale: 1.02}}
        transition={{type: 'spring', stiffness: 300}}
        className="h-full relative z-20 w-1/3 rounded-xl bg-gradient-to-br from-white to-purple-50 p-4 border border-purple-200 shadow-sm hover:shadow-lg flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{scale: [1, 1.1, 1]}}
          transition={{duration: 2, repeat: Infinity}}
          className="rounded-full h-8 w-8 bg-gradient-to-r from-purple-400 to-pink-500 shadow-md"
        />
        <p className="text-xs text-center font-bold text-gray-800 mt-2 leading-tight">
          {t('about.testimonials.transparency_changes')}
        </p>
        <span className="bg-black text-white text-xs rounded-full px-2 py-0.5 mt-2 font-bold shadow-sm">
          {t('about.testimonials.citizen')}
        </span>
      </motion.div>

      <motion.div
        variants={second}
        transition={{type: 'spring', damping: 15}}
        className="h-full w-1/3 rounded-xl bg-gradient-to-br from-white to-orange-50 p-4 border border-orange-200 shadow-sm hover:shadow-lg flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{rotate: [0, -360]}}
          transition={{duration: 25, repeat: Infinity, ease: 'linear'}}
          className="rounded-full h-8 w-8 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md"
        />
        <p className="text-xs text-center font-bold text-gray-800 mt-2 leading-tight">
          {t('about.testimonials.tech_creates_value')}
        </p>
        <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs rounded-full px-2 py-0.5 mt-2 font-bold shadow-sm">
          {t('about.testimonials.designer')}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Interactive Message Card with Chat Bubble Animation
export const MessageSkeleton = () => {
  const t = useTranslations('IndexPage');
  const variants = {
    initial: {x: 0, scale: 1},
    animate: {x: 5, scale: 1.02, transition: {duration: 0.3, type: 'spring'}}
  };
  const variantsSecond = {
    initial: {x: 0, scale: 1},
    animate: {x: -5, scale: 1.02, transition: {duration: 0.3, type: 'spring'}}
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-xl p-4 flex-col gap-3 relative overflow-hidden"
    >
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{x: [0, 10, 0], y: [0, -10, 0]}}
          transition={{duration: 5, repeat: Infinity}}
          className="absolute top-2 right-2 w-20 h-20 bg-blue-300 rounded-full blur-2xl"
        />
      </div>

      <motion.div
        variants={variants}
        whileHover={{rotate: 1}}
        className="flex flex-row rounded-xl border border-blue-200/80 backdrop-blur-sm shadow-md p-3 items-start gap-2.5 bg-white/90 relative"
      >
        <motion.div
          animate={{scale: [1, 1.1, 1]}}
          transition={{duration: 2, repeat: Infinity}}
          className="rounded-full h-6 w-6 bg-[#000095] flex-shrink-0 shadow-sm"
        />
        <p className="text-sm text-gray-700 font-medium leading-relaxed">
          {t('about.message_card.user_message')}
        </p>
        <div className="absolute -bottom-1 left-8 w-3 h-3 bg-white/90 rotate-45 border-b border-l border-blue-200/80" />
      </motion.div>

      <motion.div
        variants={variantsSecond}
        whileHover={{rotate: -1}}
        className="flex flex-row rounded-xl border-2 border-blue-500 p-3 items-center justify-end gap-2.5 w-4/5 ml-auto bg-[#000095] text-white shadow-lg relative"
      >
        <p className="text-sm font-bold">
          {t('about.message_card.join_message')} ✨
        </p>
        <Brain className="h-4 w-4 flex-shrink-0 animate-pulse" />
        <div className="absolute -bottom-1 right-8 w-3 h-3 bg-gradient-to-br from-[#000095] to-blue-600 rotate-45 border-b-2 border-l-2 border-blue-500" />
      </motion.div>
    </motion.div>
  );
};

// AI Features Card with Particle Effects
export const AISkeleton = () => {
  const t = useTranslations('IndexPage');
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-xl p-5 flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 20, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut'
          }}
          style={{
            left: `${20 + i * 25}%`,
            top: `${30 + i * 15}%`
          }}
        />
      ))}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative z-10"
      >
        <Sparkles className="h-12 w-12 md:h-14 md:w-14 text-purple-600 drop-shadow-lg" />
        <motion.div
          animate={{scale: [0, 1.5, 0], opacity: [0, 0.5, 0]}}
          transition={{duration: 2, repeat: Infinity, ease: 'easeOut'}}
          className="absolute inset-0 bg-purple-400 rounded-full blur-xl -z-10"
        />
      </motion.div>
      <p className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-3">
        {t('about.ai_card.title')}
      </p>
      <p className="text-sm text-purple-700 mt-1 text-center font-medium">
        {t('about.ai_card.description')}
      </p>
    </motion.div>
  );
};
