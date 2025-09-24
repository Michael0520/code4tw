'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { TeamMemberDto } from '@/lib/features/about/actions';
import { Card, CardContent } from '@/components/ui/card';

interface TeamSectionProps {
  team: TeamMemberDto[];
  stats: {
    foundedYear: number;
    age: number;
    principlesCount: number;
    valuesCount: number;
    activeMembers: number;
    totalMembers: number;
  };
}

export function TeamSection({ team, stats }: TeamSectionProps) {
  const { t } = useTranslation();

  if (team.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('about.team')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t('about.teamDescription')}
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-16">
          <Card className="text-center border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.activeMembers}</div>
              <div className="text-sm text-muted-foreground">{t('about.activeMembers')}</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.principlesCount}</div>
              <div className="text-sm text-muted-foreground">{t('about.principles')}</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.valuesCount}</div>
              <div className="text-sm text-muted-foreground">{t('about.valuesLabel')}</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.age}</div>
              <div className="text-sm text-muted-foreground">{t('about.yearsOld')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card
              key={member.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary font-semibold text-lg">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {member.bio}
                </p>
                {Object.keys(member.socialLinks).length > 0 && (
                  <div className="flex space-x-2">
                    {Object.entries(member.socialLinks).map(([platform, handle]) => (
                      <a
                        key={platform}
                        href={`https://${platform}.com/${handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                      >
                        {platform.charAt(0).toUpperCase()}
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}