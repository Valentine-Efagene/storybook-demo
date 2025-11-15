// https://github.com/vercel/next.js/blob/canary/examples/image-component/app/shimmer/page.tsx
import Image, { ImageProps } from 'next/image'
import placeholders from "@/data/placeholders.json"
import type { ImagePlaceholder } from "@/types/placeholder"

const shimmer = (w: number, h: number, isDark = false) => {
    const colors = isDark
        ? {
            primary: "#1a1a1a",
            secondary: "#2a2a2a",
            tertiary: "#1a1a1a"
        }
        : {
            primary: "#f6f7f8",
            secondary: "#edeef1",
            tertiary: "#f6f7f8"
        }

    return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="${colors.primary}" offset="20%" />
      <stop stop-color="${colors.secondary}" offset="50%" />
      <stop stop-color="${colors.tertiary}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${colors.primary}" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`
}

const toBase64 = (str: string) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str)

interface NextImageProps extends ImageProps {
    useShimmerFallback?: boolean
    useDarkShimmer?: boolean
}

export default function NextImage({ alt, src, useShimmerFallback = false, useDarkShimmer = false, ...props }: NextImageProps) {
    // Get width and height, with fallbacks for common image sizes
    const width = (props.width as number) || (props.fill ? 800 : 400)
    const height = (props.height as number) || (props.fill ? 600 : 300)

    // Check for existing custom placeholder first
    const hasCustomPlaceholder = props.placeholder || props.blurDataURL

    // Look for pre-generated placeholder if no custom one exists
    let finalBlurDataURL = props.blurDataURL
    let finalPlaceholder = props.placeholder

    if (!hasCustomPlaceholder && typeof src === 'string') {
        const typedPlaceholders = placeholders as ImagePlaceholder[]
        const foundPlaceholder = typedPlaceholders.find(p => p.src === src)

        if (foundPlaceholder) {
            // Use pre-generated blur placeholder
            finalBlurDataURL = foundPlaceholder.blurDataURL
            finalPlaceholder = 'blur'
        } else if (useShimmerFallback) {
            // Fallback to shimmer placeholder only if enabled
            finalBlurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(width, height, useDarkShimmer))}`
            finalPlaceholder = 'blur'
        }
    }

    return (
        <Image
            alt={alt || 'image'}
            src={src}
            placeholder={finalPlaceholder}
            blurDataURL={finalBlurDataURL}
            {...props}
        />
    )
}
