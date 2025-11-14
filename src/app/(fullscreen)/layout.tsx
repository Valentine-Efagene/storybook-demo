export default function FullscreenLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen w-full w-full lg:max-w-[min(100vw,2400px)] mx-auto">
            {children}
        </div>
    );
}