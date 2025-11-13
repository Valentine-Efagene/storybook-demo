import { SVGProps } from "@/types/common";

export function IgnitePlan({ width = "35", height = "35", ...rest }: SVGProps) {
    return (
        <svg {...rest} width={width} height={height} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_1158_35976)">
                <path d="M15.5097 0.650491C16.377 -0.216825 17.7832 -0.216823 18.6505 0.650492L33.5097 15.5097C34.377 16.377 34.377 17.7832 33.5097 18.6505L18.6505 33.5097C17.7832 34.377 16.377 34.377 15.5097 33.5097L0.650491 18.6505C-0.216825 17.7832 -0.216823 16.377 0.650492 15.5097L15.5097 0.650491Z" fill="#32A7FB" />
            </g>
            <defs>
                <filter id="filter0_i_1158_35976" x="0" y="0" width="34.1602" height="37.1214" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2.9612" />
                    <feGaussianBlur stdDeviation="1.4806" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.38 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1158_35976" />
                </filter>
            </defs>
        </svg>
    )
}
