import { Button } from "@/components/ui/button";
import { ButtonShowcase } from "@/components/examples/ButtonShowcase";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Custom Button */}
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Enhanced Button Component
            </h1>
            <p className="text-xl text-muted-foreground">
              A full-featured button component with custom gradient styling, loading states, icons, and comprehensive variants.
            </p>

            {/* Featured Custom Button */}
            <div className="flex flex-col items-center gap-6">
              <Button
                size="custom"
                icon={<CheckIcon />}
                className="mx-auto"
              >
                Custom Gradient Button
              </Button>
              <p className="text-sm text-muted-foreground">
                The featured custom button with gradient background, shadow, and enhanced styling
              </p>
            </div>

            {/* Featured Buttons */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4 flex-wrap justify-center">
                <Button size="custom" icon={<CheckIcon />}>
                  Primary Action
                </Button>
                <Button variant="outline" size="outline-lg">
                  Secondary
                </Button>
                <Button variant="subtle" size="subtle-lg">
                  Subtle
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                All three custom variants with specified styling and dimensions
              </p>
            </div>

            {/* Quick Examples */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="default">Default</Button>
              <Button variant="outline" icon={<HeartIcon />}>
                With Icon
              </Button>
              <Button variant="secondary" loading>
                Loading
              </Button>
              <Button variant="ghost" size="sm">
                Small Ghost
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="custom" asChild>
                <a href="#showcase">
                  View Full Showcase
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://storybook.js.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Storybook
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Showcase */}
      <section id="showcase">
        <ButtonShowcase />
      </section>
    </div>
  );
}
