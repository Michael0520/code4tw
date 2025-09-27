'use client';

import {useTranslations} from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection() {
  const t = useTranslations('IndexPage');
  const faqData: FAQItem[] = t.raw('faq.questions') as FAQItem[];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">{t('faq.title')}</h2>
        <p className="text-xl text-gray-600">{t('faq.subtitle')}</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-200 rounded-xl bg-white px-6 py-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 text-gray-900">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-relaxed pb-6 text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
