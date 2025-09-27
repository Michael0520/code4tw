'use client';

import {useTranslations} from 'next-intl';
import {useEffect} from 'react';

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({error, reset}: Props) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <div>
          {t.rich('description', {
            p: (chunks) => <p className="mt-4 text-gray-600">{chunks}</p>,
            retry: (chunks) => (
              <button
                className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                onClick={reset}
                type="button"
              >
                {chunks}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}