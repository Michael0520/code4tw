'use client';

import {useCallback, useState} from 'react';
import {motion} from 'framer-motion';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

interface NavbarProps {
  activeSection: string;
}

export function Navbar({activeSection}: NavbarProps) {
  const t = useTranslations('IndexPage.navigation');

  const handleTabClick = useCallback((id: string) => {
    const section = document.querySelector(`#${id}`);
    if (section) {
      section.scrollIntoView({behavior: 'smooth'});
    }
  }, []);

  // Tabs configuration with modern icon + label design
  const tabs = [
    {
      id: 'hero',
      label: t('home'),
      icon: (
        <Image
          src="/CodeforTaiwan-mono-inverse-1x1.svg"
          alt="Code for Taiwan"
          width={20}
          height={20}
          className="opacity-100"
        />
      )
    },
    {
      id: 'about',
      label: t('about'),
      icon: (
        <InfoIcon className="h-5 w-5 text-white" />
      )
    },
    {
      id: 'join',
      label: t('join'),
      icon: (
        <UsersIcon className="h-5 w-5 text-white" />
      )
    },
    {
      id: 'faq',
      label: t('faq'),
      icon: (
        <QuestionIcon className="h-5 w-5 text-white" />
      )
    }
  ];

  return (
    <div className="flex sticky top-0 z-50 bg-black/80 backdrop-blur-md px-1 py-[3px] rounded-full border border-white/20 shadow-lg">
      <ul className="flex w-full justify-between gap-1 md:gap-2">
        {tabs.map((tab) => {
          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative flex items-center justify-center md:justify-start gap-0 md:gap-2 px-3 md:px-4 py-2 text-sm md:text-base cursor-pointer font-medium outline-none transition-all hover:bg-white/5 focus-visible:outline-2"
              style={{WebkitTapHighlightColor: 'transparent'}}
            >
              <div className="flex items-center gap-0 md:gap-2 pointer-events-none">
                {tab.icon}
                <span className="hidden md:block font-medium text-white">
                  {tab.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </ul>
    </div>
  );
}

// Icon components matching the cult-landing-page SVGs
function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 17H16M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 15.8369C19.4558 16.5683 20.7225 17.742 21.6678 19.2096C21.8929 19.5003 22.0054 19.6457 22.0162 19.8268C22.0244 19.9643 21.9773 20.1345 21.8819 20.2499C21.7655 20.3902 21.5859 20.4517 21.2268 20.5747L17 22M14 8.5C14 10.7091 12.2091 12.5 10 12.5C7.79086 12.5 6 10.7091 6 8.5C6 6.29086 7.79086 4.5 10 4.5C12.2091 4.5 14 6.29086 14 8.5ZM2 20.1496C2 16.6862 2 14.9545 2.74349 13.6857C3.39417 12.576 4.39784 11.7217 5.58603 11.2652C6.94103 10.7476 8.72889 10.9511 12.3046 11.3582C13.2206 11.4628 13.6786 11.5151 14.0754 11.6095C14.3863 11.6829 14.6747 11.7865 14.9527 11.9219C15.3052 12.093 15.6407 12.3208 16.3118 12.7763L17 13.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuestionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
