import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import {AnimatedRadialGradientBackground} from '@/sections/marketing-hero-radial-gradient/animated-radial-background';

export default function IndexPage({params}: PageProps<'/[locale]'>) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const t = useTranslations('IndexPage');

  return (
    <div className="min-h-screen">
      {/* Custom Layout without Container */}
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedRadialGradientBackground
          Breathing={true}
          containerClassName="absolute inset-0"
        />
        <div className="relative z-10 text-center text-white px-4 w-full">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">{t('title')}</h1>
          <p className="text-2xl md:text-3xl text-gray-200 mb-4">
            {t('subtitle')}
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
              {t('hero.cta')}
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white/50 rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              {t('hero.learn_more')}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('features.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold mb-2">
              {t('features.open_source.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('features.open_source.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold mb-2">
              {t('features.community.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('features.community.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold mb-2">
              {t('features.transparency.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('features.transparency.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold mb-2">
              {t('features.education.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('features.education.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">{t('stats.contributors')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-gray-600">{t('stats.projects')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">200+</div>
              <div className="text-gray-600">{t('stats.events')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">100K+</div>
              <div className="text-gray-600">{t('stats.impact')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">{t('join.title')}</h2>
          <p className="text-gray-600 text-xl mb-16 max-w-3xl mx-auto">
            {t('join.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <button className="p-8 border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 group">
              <div className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                {t('join.developer')}
              </div>
            </button>
            <button className="p-8 border border-gray-200 rounded-2xl hover:border-green-500 hover:shadow-lg transition-all duration-300 group">
              <div className="text-xl font-semibold group-hover:text-green-600 transition-colors">
                {t('join.designer')}
              </div>
            </button>
            <button className="p-8 border border-gray-200 rounded-2xl hover:border-purple-500 hover:shadow-lg transition-all duration-300 group">
              <div className="text-xl font-semibold group-hover:text-purple-600 transition-colors">
                {t('join.citizen')}
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
