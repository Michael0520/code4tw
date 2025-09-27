import {AnimatedRadialGradientBackground} from './animated-radial-background';

export default function MarketingHeroSection() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-black">
      <div className="relative h-screen w-full overflow-hidden">
        <AnimatedRadialGradientBackground />

        <div className="relative z-10 flex h-full flex-col items-center justify-start px-4 pt-32 text-center">
          <p className="mt-4 max-w-lg text-gray-300 text-lg md:text-xl">
            A customizable animated radial gradient background with a subtle
            breathing effect.
          </p>
        </div>
      </div>
    </main>
  );
}
