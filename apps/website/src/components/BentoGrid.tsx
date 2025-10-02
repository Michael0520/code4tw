'use client';

import {cn} from '@repo/ui/lib/utils';
import React from 'react';

export const BentoGrid = ({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-2xl group/bento hover:shadow-xl transition-all duration-300 shadow-sm p-4 md:p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200/60 justify-between flex flex-col gap-4 relative overflow-hidden min-h-0',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-gray-50/30 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">{header}</div>
      <div className="group-hover/bento:translate-x-1 transition-transform duration-200 relative z-10">
        {icon}
        <div className="font-bold text-neutral-800 mb-1 mt-2">{title}</div>
        <div className="font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};

export const BentoGridItemCta = ({
  className,
  title,
  description,
  header,
  icon
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-2xl group/bento hover:shadow-2xl transition-all duration-300 shadow-md p-4 md:p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-2 border-blue-300/60 justify-between flex flex-col gap-4 relative overflow-hidden min-h-0',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-blue-200/20 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{header}</div>
      <div className="group-hover/bento:translate-x-1 group-hover/bento:scale-105 transition-all duration-300 relative z-10">
        {icon}
        <div className="font-black text-blue-900 mb-1 mt-2">{title}</div>
        <div className="font-medium text-blue-700">{description}</div>
      </div>
    </div>
  );
};

export const BentoImageCard = ({
  text,
  description,
  className,
  children
}: {
  text?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-2xl relative group/bento hover:shadow-2xl transition-all duration-300 shadow-md',
        'bg-gradient-to-br from-blue-100 via-indigo-50 to-blue-200',
        'border border-blue-300/60 overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-blue-200/30 via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />

      <div className="relative p-4 md:p-6 h-full flex flex-col justify-between">
        <div className="flex justify-center items-center flex-1">
          {children}
        </div>

        <div className="space-y-1">
          {description && (
            <p className="text-xs md:text-sm uppercase tracking-widest text-blue-700 font-bold opacity-80">
              {description}
            </p>
          )}
          {text && (
            <h3 className="font-black text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#000095] to-blue-700">
              {text}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};
