import DashboardGrid from "@/components/dashboard/DashboardGrid";
import { WelcomeMessage } from "@/components/dashboard/WelcomeMessage";

export default function Home() {
  return (
    <div className="min-h-screen bg-background py-12 sm:px-12 px-4 flex flex-col gap-8">
      <WelcomeMessage />
      <DashboardGrid />
    </div>
  );
}
