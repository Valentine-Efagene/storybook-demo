import { useState } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Lightbox from "yet-another-react-lightbox"
import NextImage from "./NextImage"

interface IProps {
    images: Array<{ url: string }>
    height?: number
    width?: number
}

export default function ImageCarousel({ images, height = 200, width = 300 }: IProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    if (!images?.length) {
        return (
            <div className="h-[200px] flex items-center justify-center bg-gray-100 text-gray-400">
                No Images
            </div>
        )
    }

    return (
        <div className="relative w-full">
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-0 group cursor-pointer relative rounded-xl overflow-hidden">
                                <NextImage
                                    src={image.url}
                                    alt={`Property ${index + 1}`}
                                    width={width}
                                    height={height}
                                    style={{
                                        aspectRatio: `${width}/${height}`,
                                    }}
                                    className="object-cover w-full"
                                />
                                <div onClick={() => {
                                    setCurrentIndex(index);
                                    setLightboxOpen(true);
                                }} className="absolute inset-0 rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 
             group-hover:pointer-events-auto pointer-events-none
             flex items-center justify-center text-white text-sm font-medium transition-opacity">
                                    Click to view
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 disabled:pointer-events-auto" />
                <CarouselNext className="right-4 disabled:pointer-events-auto" />
            </Carousel>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={currentIndex}
                slides={images.map((m) => ({ src: m.url }))}
            />
        </div>
    )
}
