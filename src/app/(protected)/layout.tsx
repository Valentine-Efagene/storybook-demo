import { SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/SideBar";
import { Header } from "@/components/Header";
// import { Breadcrumbs } from "@/components/BreadCrumbs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen p-4">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
