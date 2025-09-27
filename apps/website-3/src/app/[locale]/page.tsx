import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import {AnimatedRadialGradientBackground} from '@/sections/marketing-hero-radial-gradient/animated-radial-background';
import {Code, Users, Lightbulb, Eye} from 'lucide-react';
import {FAQSection} from '@/components/FAQSection';
import {Footer} from '@/components/Footer';

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

      {/* About Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">{t('about.title')}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-green-50 rounded-2xl p-8 text-center hover:bg-green-100 transition-colors duration-300">
            <div className="w-16 h-16 bg-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              {t('about.values.open_source.title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('about.values.open_source.description')}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 text-center hover:bg-green-100 transition-colors duration-300">
            <div className="w-16 h-16 bg-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              {t('about.values.community_driven.title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('about.values.community_driven.description')}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 text-center hover:bg-green-100 transition-colors duration-300">
            <div className="w-16 h-16 bg-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              {t('about.values.innovation.title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('about.values.innovation.description')}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 text-center hover:bg-green-100 transition-colors duration-300">
            <div className="w-16 h-16 bg-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              {t('about.values.transparency.title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('about.values.transparency.description')}
            </p>
          </div>
        </div>

        {/* Stats integrated into About section */}
        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">{t('stats.contributors')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-gray-600">{t('stats.projects')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">200+</div>
              <div className="text-gray-600">{t('stats.events')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">100K+</div>
              <div className="text-gray-600">{t('stats.impact')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full mb-6">
            {t('join.tag')}
          </div>
          <h2 className="text-4xl font-bold mb-6">{t('join.title')}</h2>
          <p className="text-gray-600 text-xl max-w-4xl mx-auto">
            {t('join.description')}
          </p>
        </div>

        <div className="bg-green-50 rounded-3xl p-12 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-6">
              {t('join.section.title')}
            </h3>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              {t('join.section.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <button className="bg-white p-6 rounded-2xl text-center hover:bg-gray-50 transition-all duration-300 group hover:shadow-lg">
              <div className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                {t('join.roles.developers')}
              </div>
            </button>
            <button className="bg-white p-6 rounded-2xl text-center hover:bg-gray-50 transition-all duration-300 group hover:shadow-lg">
              <div className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                {t('join.roles.designers')}
              </div>
            </button>
            <button className="bg-white p-6 rounded-2xl text-center hover:bg-gray-50 transition-all duration-300 group hover:shadow-lg">
              <div className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                {t('join.roles.data_scientists')}
              </div>
            </button>
            <button className="bg-white p-6 rounded-2xl text-center hover:bg-gray-50 transition-all duration-300 group hover:shadow-lg">
              <div className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                {t('join.roles.project_managers')}
              </div>
            </button>
            <button className="bg-white p-6 rounded-2xl text-center hover:bg-gray-50 transition-all duration-300 group hover:shadow-lg col-span-2 md:col-span-1">
              <div className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                {t('join.roles.community_organizers')}
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
