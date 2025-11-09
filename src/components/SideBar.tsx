import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Banknote, Building, CircleHelp, HandCoins, Heart, Home } from "lucide-react"
import Logo from "./icons/Logo"

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Properties",
        url: "#",
        icon: Building,
    },
    {
        title: "Saved",
        url: "#",
        icon: Heart,
    },
    {
        title: "Contribution",
        url: "#",
        icon: Banknote,
    },
    {
        title: "Settings",
        url: "#",
        icon: HandCoins,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="text-lg font-bold">
                    <Logo width={120} height={30} />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size="lg">
                                        <a href={item.url}>
                                            <item.icon className="!w-6 !h-6" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarHeader>
                    <div className="flex gap-2">
                        <CircleHelp className="!w-6 !h-6" />
                        <span>Support</span>
                    </div>
                </SidebarHeader>
            </SidebarFooter>
        </Sidebar>
    )
}