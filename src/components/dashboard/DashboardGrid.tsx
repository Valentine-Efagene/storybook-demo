import { Building2, CreditCard, ShoppingBag, Users } from 'lucide-react'
import { DashboardCard, DashboardCardData } from '../DashboardCard'

export default function DashboardGrid() {
    const data: DashboardCardData[] = [
        {
            icon: Users,
            title: "Total Users",
            value: 1280,
        },
        {
            icon: Building2,
            title: "Active Properties",
            value: 342,
        },
        {
            icon: CreditCard,
            title: "Transactions",
            value: "$245,000",
        },
        {
            icon: ShoppingBag,
            title: "Pending Orders",
            value: 57,
        },
        {
            icon: Users,
            title: "Total Users",
            value: 1280,
        },
        {
            icon: Building2,
            title: "Active Properties",
            value: 342,
        },
        {
            icon: CreditCard,
            title: "Transactions",
            value: "$245,000",
        },
        {
            icon: ShoppingBag,
            title: "Pending Orders",
            value: 57,
        },
    ]

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((card, index) => (
                    <DashboardCard
                        key={index}
                        data={card}
                    />
                ))}
            </div>
        </div>
    )
}
