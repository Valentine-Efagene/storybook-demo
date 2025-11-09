import * as React from "react"

/**
 * Hook to check if a media query matches.
 * Example: const isMobile = useMediaQuery("(max-width: 768px)")
 */
export function useMediaQuery(query: string) {
    const [matches, setMatches] = React.useState(false)

    React.useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }

        const listener = () => setMatches(media.matches)
        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [matches, query])

    return matches
}
