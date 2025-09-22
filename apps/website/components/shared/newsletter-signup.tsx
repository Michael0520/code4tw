import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterSignupProps {
  title: string;
  description: string;
  emailPlaceholder: string;
  buttonText: string;
}

export function NewsletterSignup({
  title,
  description,
  emailPlaceholder,
  buttonText,
}: NewsletterSignupProps) {
  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={emailPlaceholder}
              className="flex-1"
            />
            <Button>{buttonText}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}