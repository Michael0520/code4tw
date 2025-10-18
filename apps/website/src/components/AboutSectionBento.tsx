'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {
  BentoGrid,
  BentoGridItem,
  BentoGridItemCta,
  BentoImageCard
} from './BentoGrid';
import {
  TechStackSkeleton,
  TestimonialsSkeleton,
  MessageSkeleton,
  AISkeleton
} from './BentoCards';
import {BrandKeywordHighlight} from './BrandKeywordHighlight';
import {
  Code2,
  Users,
  Lightbulb,
  Globe,
  Sparkles,
  Heart,
  Rocket
} from 'lucide-react';

export function AboutSectionBento() {
  const t = useTranslations('IndexPage');

  const items = [
    {
      title: (
        <span className="text-lg md:text-xl font-extrabold tracking-tight">
          {t('about.values.open_source.title')}
        </span>
      ),
      description: (
        <span className="text-base md:text-lg leading-[1.5] text-gray-600">
          {t('about.values.open_source.description')}
        </span>
      ),
      header: <TechStackSkeleton />,
      className: 'md:col-span-1 md:row-span-1 group',
      icon: (
        <Code2 className="h-4 w-4 text-[#000095] group-hover:text-blue-700 transition-colors" />
      )
    },
    {
      title: (
        <span className="text-lg md:text-xl font-extrabold tracking-tight">
          {t('about.values.community_driven.title')}
        </span>
      ),
      description: (
        <span className="text-base md:text-lg leading-[1.5] text-gray-600">
          {t('about.values.community_driven.description')}
        </span>
      ),
      header: <TestimonialsSkeleton />,
      className: 'md:col-span-2 md:row-span-1 group',
      icon: (
        <Users className="h-4 w-4 text-blue-600 group-hover:text-blue-700 transition-colors" />
      )
    },
    {
      title: (
        <span className="text-lg md:text-xl font-extrabold tracking-tight">
          {t('about.values.innovation.title')}
        </span>
      ),
      description: (
        <span className="text-base md:text-lg leading-[1.5] text-gray-600">
          {t('about.values.innovation.description')}
        </span>
      ),
      header: <AISkeleton />,
      className: 'md:col-span-1 md:row-span-1 group',
      icon: (
        <Lightbulb className="h-4 w-4 text-yellow-600 group-hover:text-yellow-700 transition-colors" />
      )
    }
  ];

  const ctaCard = {
    title: (
      <motion.span
        className="text-lg md:text-xl font-black"
        animate={{
          color: ['#000095', '#0000b3', '#000080', '#0000b3', '#000095']
        }}
        transition={{duration: 3, repeat: Infinity, ease: 'easeInOut'}}
      >
        {t('join.section.cta_title')}
      </motion.span>
    ),
    description: (
      <span className="text-base md:text-lg leading-[1.5] text-gray-700 font-medium">
        {t('join.section.cta_description_line1')}
        <span className="block mt-1">
          <Rocket className="inline-block h-3 w-3 mr-1" />
          {t('join.section.cta_description_line2')}
        </span>
      </span>
    ),
    header: <MessageSkeleton />,
    className: 'md:col-span-1 md:row-span-1 group relative overflow-hidden',
    icon: <Heart className="h-4 w-4 text-red-500 animate-pulse" />
  };

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-white">
      {/* Modern Geometric Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] [background-size:4rem_4rem]" />
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              <BrandKeywordHighlight
                text={t('about.title')}
                keywords={['Code', 'Concepts']}
                normalClassName="text-black"
                brandKeywordClassName="font-brand "
                animate={false}
              />
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-4">
            <BrandKeywordHighlight
              text={t('about.subtitle')}
              keywords={[]}
              normalClassName="text-gray-600"
              brandKeywordClassName="font-brand text-gray-600"
              animate={false}
            />
          </p>
        </div>

        {/* Modern Bento Grid */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
        >
          <BentoGrid className="md:auto-rows-[minmax(16rem,auto)]">
            <BentoImageCard
              text={t('about.civic_tech')}
              description={t('about.civic_tech_zh')}
              className="md:col-span-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 hover:from-blue-100 hover:via-indigo-100 hover:to-blue-200 transition-all duration-300"
            >
              <motion.div className="relative">
                <Globe className="h-16 w-16 md:h-20 md:w-20 text-[#000095] drop-shadow-lg" />
                <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </motion.div>
            </BentoImageCard>

            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
              >
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={`${item.className} hover:scale-[1.01] hover:shadow-lg transition-all duration-300 cursor-pointer`}
                  icon={item.icon}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{
                duration: 0.5,
                delay: 0.5,
                type: 'spring',
                stiffness: 100
              }}
            >
              <BentoGridItemCta
                title={ctaCard.title}
                description={ctaCard.description}
                header={ctaCard.header}
                className={`${ctaCard.className} hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-blue-200 hover:border-blue-400`}
                icon={ctaCard.icon}
              />
            </motion.div>
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
