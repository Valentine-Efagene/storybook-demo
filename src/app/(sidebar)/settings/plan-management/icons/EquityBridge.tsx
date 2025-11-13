import { SVGProps } from "@/types/common";

export function EquityBridge({ width = "29", height = "29", ...rest }: SVGProps) {
    return (
        <svg {...rest} width={width} height={height} viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_1158_35974)">
                <path d="M12.5264 1.2637C13.1454 -0.420885 15.528 -0.420882 16.1469 1.2637L18.8656 8.66289C19.0608 9.19412 19.4795 9.6128 20.0107 9.80799L27.4099 12.5267C29.0945 13.1456 29.0945 15.5282 27.4099 16.1472L20.0107 18.8658C19.4795 19.061 19.0608 19.4797 18.8656 20.0109L16.1469 27.4101C15.5279 29.0947 13.1454 29.0947 12.5264 27.4101L9.80775 20.0109C9.61256 19.4797 9.19388 19.061 8.66264 18.8658L1.26345 16.1472C-0.421129 15.5282 -0.421126 13.1456 1.26345 12.5267L8.66264 9.80799C9.19388 9.6128 9.61256 9.19412 9.80775 8.66289L12.5264 1.2637Z" fill="#00B8A8" />
            </g>
            <defs>
                <filter id="filter0_i_1158_35974" x="0" y="0" width="28.6733" height="31.2453" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2.57143" />
                    <feGaussianBlur stdDeviation="1.28571" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.51 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1158_35974" />
                </filter>
            </defs>
        </svg>
    )
}
