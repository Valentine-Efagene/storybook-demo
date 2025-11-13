import DashboardGrid from "@/components/dashboard/DashboardGrid";
import { WelcomeMessage } from "@/components/dashboard/WelcomeMessage";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-12 flex flex-col gap-8">
      <WelcomeMessage />
      <DashboardGrid />
    </div>
  );
}
