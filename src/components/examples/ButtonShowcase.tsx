"use client"
import React from 'react';
import { Button } from '@/components/ui/button';

// Example icons
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export function ButtonShowcase() {
    const [loading, setLoading] = React.useState(false);

    const handleLoadingDemo = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 3000);
    };

    return (
        <div className="space-y-8 p-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Button Component Showcase</h1>
                <p className="text-muted-foreground">A comprehensive example of the enhanced button component</p>
            </div>

            {/* Custom Gradient Button - Main Feature */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Custom Gradient Button</h2>
                <p className="text-sm text-muted-foreground">
                    The featured custom gradient button with blue gradient background, custom dimensions, and enhanced styling.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    <Button variant="custom" size="custom">
                        Custom Gradient Button
                    </Button>
                    <Button variant="custom" size="custom" icon={<CheckIcon />}>
                        With Icon
                    </Button>
                </div>
            </section>

            {/* All Variants */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Button Variants</h2>
                <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
                    <Button variant="default">Default</Button>
                    <Button variant="custom" size="custom">Custom</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="outline" size="outline-lg">Outline Large</Button>
                    <Button variant="subtle">Subtle</Button>
                    <Button variant="subtle" size="subtle-lg">Subtle Large</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </section>

            {/* Outline Variants */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Outline Button Variants</h2>
                <p className="text-sm text-muted-foreground">
                    Outline buttons with custom blue border (#026993), white background, and light blue shadow.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                    <Button variant="outline">Default Outline</Button>
                    <Button variant="outline" size="outline-lg">Large Outline (82px)</Button>
                    <Button variant="outline" icon={<CheckIcon />}>With Icon</Button>
                </div>
            </section>

            {/* Subtle Variants */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Subtle Button Variants</h2>
                <p className="text-sm text-muted-foreground">
                    Subtle buttons with light gray border (#DAE6E7), white background, and minimal shadow.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                    <Button variant="subtle">Default Subtle</Button>
                    <Button variant="subtle" size="subtle-lg">Large Subtle (82px)</Button>
                    <Button variant="subtle" icon={<CheckIcon />}>With Icon</Button>
                </div>
            </section>

            {/* Sizes */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Button Sizes</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button variant="custom" size="custom">Custom Size</Button>
                    <Button variant="outline" size="outline-lg">Outline Large</Button>
                    <Button variant="subtle" size="subtle-lg">Subtle Large</Button>
                </div>
            </section>

            {/* With Icons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Buttons with Icons</h2>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <Button icon={<HeartIcon />} iconPosition="left">
                        Like
                    </Button>
                    <Button icon={<DownloadIcon />} iconPosition="right" variant="outline">
                        Download
                    </Button>
                    <Button variant="custom" size="custom" icon={<CheckIcon />}>
                        Custom with Icon
                    </Button>
                </div>
            </section>

            {/* Icon Only Buttons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Icon-Only Buttons</h2>
                <div className="flex gap-3">
                    <Button size="icon" variant="default" title="Like">
                        <HeartIcon />
                    </Button>
                    <Button size="icon-sm" variant="outline" title="Download">
                        <DownloadIcon />
                    </Button>
                    <Button size="icon-lg" variant="secondary" title="Check">
                        <CheckIcon />
                    </Button>
                </div>
            </section>

            {/* Loading States */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Loading States</h2>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <Button loading={loading} onClick={handleLoadingDemo}>
                        {loading ? 'Loading...' : 'Click to Load'}
                    </Button>
                    <Button loading variant="custom" size="custom">
                        Custom Loading
                    </Button>
                    <Button loading variant="outline">
                        Outline Loading
                    </Button>
                </div>
            </section>

            {/* Disabled States */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Disabled States</h2>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <Button disabled>Disabled Default</Button>
                    <Button disabled variant="custom" size="custom">
                        Disabled Custom
                    </Button>
                    <Button disabled variant="outline">
                        Disabled Outline
                    </Button>
                </div>
            </section>

            {/* Full Width */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Full Width Buttons</h2>
                <div className="max-w-md space-y-3">
                    <Button fullWidth>Full Width Default</Button>
                    <Button fullWidth variant="custom" size="custom">
                        Full Width Custom
                    </Button>
                    <Button fullWidth variant="outline" icon={<DownloadIcon />}>
                        Full Width with Icon
                    </Button>
                </div>
            </section>

            {/* Interactive Examples */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Interactive Examples</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Button
                            variant="custom"
                            size="custom"
                            onClick={() => alert('Custom button clicked!')}
                            className="w-full"
                        >
                            Click Me!
                        </Button>
                        <p className="text-xs text-muted-foreground">Try clicking to see the interaction</p>
                    </div>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            icon={<HeartIcon />}
                            onClick={() => alert('Liked!')}
                            className="w-full"
                        >
                            Like This
                        </Button>
                        <p className="text-xs text-muted-foreground">Interactive button with icon</p>
                    </div>
                </div>
            </section>

            {/* Usage Examples */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Common Usage Patterns</h2>
                <div className="space-y-4">
                    {/* Form buttons */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-3">Form Actions</h3>
                        <div className="flex gap-2">
                            <Button variant="custom" size="custom">Submit</Button>
                            <Button variant="outline">Cancel</Button>
                            <Button variant="ghost">Reset</Button>
                        </div>
                    </div>

                    {/* Card actions */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-3">Card Actions</h3>
                        <div className="flex gap-2">
                            <Button size="sm" icon={<CheckIcon />}>Accept</Button>
                            <Button size="sm" variant="destructive">Decline</Button>
                            <Button size="sm" variant="ghost">View Details</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}