'use client';

import {useTranslations} from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import TextAnimate from './TextAnimate';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection() {
  const t = useTranslations('IndexPage');
  const faqData: FAQItem[] = t.raw('faq.questions') as FAQItem[];

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-20 bg-transparent rounded-t-[48px]">
      <div className="flex flex-col py-12 justify-start">
        <TextAnimate
          text="Frequently Asked "
          type="shiftInUp"
          className="text-3xl md:text-4xl font-bold tracking-tight text-blue-100"
        />
        <TextAnimate
          text="Questions."
          type="shiftInUp"
          className="text-3xl md:text-4xl font-bold md:leading-tight tracking-tight text-blue-100 font-brand"
        />
      </div>

      {/* CREDIT BG PATTERN -  https://bg.ibelick.com/ */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#000095_100%)]"></div>

      <div className="md:mx-auto">
        <Accordion
          type="multiple"
          className="w-full md:space-y-9 bg-black/10 rounded-xl border border-blue-50/20 text-white backdrop-blur"
        >
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-x border-b-0 border-black/10 rounded-md md:px-4"
            >
              <AccordionTrigger className="text-xl md:text-2xl text-left pr-4 md:pr-0 font-medium">
                <span className="px-6 md:px-2">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg font-semibold text-neutral-300 px-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
