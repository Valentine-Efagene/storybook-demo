"use client"

import { useGetFullUserFromSession } from "@/hooks/useGetCurrentUserFromSession"
import UserHelper from "@/lib/helpers/UserHelper"

const getGreetingByTimeOfDay = () => {
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
        return "Good morning"
    } else if (currentHour < 18) {
        return "Good afternoon"
    } else {
        return "Good evening"
    }
}

const getIconByTimeOfDay = () => {
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
        return "☀️"
    } else if (currentHour < 18) {
        return "🌤️"
    } else {
        return "🌙"
    }
}

export function WelcomeMessage() {
    const { data } = useGetFullUserFromSession()

    if (!data) {
        return <div>Welcome User</div>
    }

    const greeting = getGreetingByTimeOfDay()
    const icon = getIconByTimeOfDay()

    return (
        <p className="font-semibold text-xl text-[var(--primary-text)]">{greeting} {UserHelper.getFullName(data)} <span>{icon}</span></p>
    )
}
