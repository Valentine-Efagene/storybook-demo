import PropertyTabsLayout from "./LayoutComponent";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PropertyTabsLayout>
            {children}
        </PropertyTabsLayout>
    );
}
