'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { EventDto } from '@/lib/features/events/actions';
import Link from 'next/link';

interface EventsListProps {
  events: EventDto[];
  variant?: 'grid' | 'featured' | 'compact';
}

export function EventsList({ events, variant = 'grid' }: EventsListProps) {
  const t = useTranslations();

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">{t('events.noEvents')}</p>
        <Button variant="outline" asChild>
          <Link href="/events">{t('common.viewMore')}</Link>
        </Button>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {events.map((event) => (
          <Card
            key={event.id}
            className={`group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden ${
              event.isFeatured ? 'lg:col-span-2' : ''
            }`}
          >
            <div className={`grid gap-0 ${event.isFeatured ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
              <div
                className={`${
                  event.isFeatured ? 'aspect-video lg:aspect-square' : 'aspect-video'
                } overflow-hidden`}
              >
                <img
                  src={event.imageUrl || '/placeholder.svg'}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="default" className="text-xs">
                    {event.typeDisplay}
                  </Badge>
                  {event.isFeatured && (
                    <Badge variant="secondary" className="text-xs">
                      {t('events.featured')}
                    </Badge>
                  )}
                </div>
                <CardTitle className={`mb-3 text-balance ${event.isFeatured ? 'text-2xl' : 'text-lg'}`}>
                  {event.title}
                </CardTitle>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {event.description}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{new Date(event.eventDate).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.timeInfo}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.locationDisplay}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {event.currentRegistered}/{event.maxCapacity} {t('events.peopleRegistered')}
                    </span>
                  </div>
                </div>
                {event.canRegister && event.registrationUrl && (
                  <Button asChild className="w-full sm:w-auto">
                    <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                      {event.isFull ? t('events.soldOut') : t('events.registerNow')}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card
            key={event.id}
            className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={event.imageUrl || '/placeholder.svg'}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="p-4">
              <Badge variant="outline" className="w-fit mb-2 text-xs">
                {event.typeDisplay}
              </Badge>
              <CardTitle className="text-lg mb-2 text-balance">
                {event.title}
              </CardTitle>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>
                    {event.currentRegistered} {t('events.registeredCount')}
                  </span>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  // Default grid variant
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <img
              src={event.imageUrl || '/placeholder.svg'}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="text-xs">
                {event.typeDisplay}
              </Badge>
              <Badge
                variant={event.status === 'upcoming' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {event.statusDisplay}
              </Badge>
            </div>
            <CardTitle className="text-lg mb-3 text-balance">
              {event.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {event.description}
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(event.eventDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="line-clamp-1">{event.locationDisplay}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                <span>
                  {event.availableSpots > 0
                    ? `${event.availableSpots} ${t('events.spotsAvailable')}`
                    : t('events.soldOut')
                  }
                </span>
              </div>
            </div>
            {event.canRegister && event.registrationUrl && (
              <Button
                asChild
                className="w-full"
                variant={event.isFull ? 'outline' : 'default'}
                disabled={event.isFull}
              >
                <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                  {event.isFull ? t('events.soldOut') : t('events.register')}
                  {!event.isFull && <ExternalLink className="ml-2 h-4 w-4" />}
                </Link>
              </Button>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}