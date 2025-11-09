import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Banknote, Building2, CircleHelp, HandCoins, Heart, Home, Settings, Wallet } from "lucide-react"
import Logo from "./icons/Logo"

const items = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Home",
                url: "",
                icon: Home,
            },
            {
                title: "Properties",
                url: "#",
                icon: Building2,
            },
            {
                title: "Saved",
                url: "#",
                icon: Heart,
            },
        ]
    },
    {
        title: "Financial",
        items: [
            {
                title: "Contribution",
                url: "#",
                icon: Banknote,
            },
            {
                title: "Mortgage",
                url: "#",
                icon: HandCoins,
            },
        ]
    },
    {
        title: "Account",
        items: [
            {
                title: "Wallet",
                url: "#",
                icon: Wallet,
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings,
            },
        ]
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="p-5 bg-[var(--sidebar)]">
            <SidebarHeader>
                <div className="text-lg font-bold mb-6">
                    <Logo width={120} height={30} />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((section, sectionIndex) => (
                                <div key={section.title}>
                                    {section.items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild size="lg" className="hover:bg-[[var(--sidebar)]/10] hover:text-[var(--sidebar-foreground)] data-[active=true]:bg-[#0165F1] data-[active=true]:text-white">
                                                <a href={item.url}>
                                                    <item.icon className="!w-6 !h-6" />
                                                    <span className="text-[14px] font-medium">{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                    {sectionIndex < items.length - 1 && (
                                        <div className="my-2">
                                            <div className="h-px bg-border" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarHeader>
                    <div className="flex gap-2">
                        <CircleHelp className="!w-6 !h-6" />
                        <span className="text-[14px] font-medium">Support</span>
                    </div>
                </SidebarHeader>
            </SidebarFooter>
        </Sidebar>
    )
}