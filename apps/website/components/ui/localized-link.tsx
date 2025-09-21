"use client"

import { useParams } from 'next/navigation'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { createLocalizedUrl, getValidLocale } from '@/lib/locale-utils'

type LocalizedLinkProps = ComponentProps<typeof Link> & {
  href: string
  locale?: string
}

export function LocalizedLink({ href, locale, ...rest }: LocalizedLinkProps) {
  const params = useParams()
  const currentLocale = getValidLocale(locale || (params.locale as string))

  const localizedHref = createLocalizedUrl(href, currentLocale)

  return <Link {...rest} href={localizedHref} />
}