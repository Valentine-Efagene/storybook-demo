import { SVGProps } from "@/types/common";

export function AnchorPlan({ width = "33", height = "32", ...rest }: SVGProps) {
    return (
        <svg {...rest} width={width} height={height} viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_1158_35972)">
                <path d="M13.6513 0.867844C15.2436 -0.289014 17.3997 -0.289014 18.992 0.867844L30.7703 9.42532C32.3626 10.5822 33.0289 12.6328 32.4207 14.5046L27.9218 28.3509C27.3136 30.2227 25.5692 31.49 23.6011 31.49H9.04223C7.07407 31.49 5.32974 30.2227 4.72154 28.3509L0.222614 14.5046C-0.385582 12.6328 0.280692 10.5822 1.87297 9.42532L13.6513 0.867844Z" fill="#735AF4" />
            </g>
            <defs>
                <filter id="filter0_i_1158_35972" x="0" y="0" width="32.6433" height="34.4514" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2.9612" />
                    <feGaussianBlur stdDeviation="1.4806" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.38 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1158_35972" />
                </filter>
            </defs>
        </svg>

    )
}
