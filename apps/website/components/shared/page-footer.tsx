interface PageFooterProps {
  copyrightText: string;
}

export function PageFooter({ copyrightText }: PageFooterProps) {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}