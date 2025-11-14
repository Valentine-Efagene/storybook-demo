import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/SideBar";
import { Header } from "@/components/Header";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen w-full lg:max-w-[min(100vw,2400px)]">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
