import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/SideBar";
import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
