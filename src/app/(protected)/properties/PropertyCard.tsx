import IconChip from "@/components/IconChip"
import NextImage from "@/components/NextImage"
import FormatHelper from "@/lib/helpers/FormatHelper"
import ImageHelper from "@/lib/helpers/ImageHelper"
import PropertyHelper from "@/lib/helpers/PropertyHelper"
import { Property } from "@/types/property"
import { Bath, Bed, Building } from "lucide-react"
import Link from "next/link"

interface PropertyCardProps {
    property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link href={`/properties/${property.id}`} className="border rounded-lg flex hover:shadow-md transition-shadow duration-200 ease-in-out">
            <NextImage
                src={ImageHelper.getCdnLink(property.display_image, 'property') || ''}
                alt={property.title ?? ''}
                width={400}
                height={300}
                className="w-[180px] h-[172px] object-cover rounded-tl-lg rounded-bl-lg"
            />
            <div className="flex flex-col gap-2 p-4">
                <h3 className="text-sm text-primary-text font-normal">{property.title}</h3>
                <p className="text-lg text-primary-text font-semibold">{FormatHelper.nairaFormatter.format(property.price)}</p>
                <p className="text-sm text-secondary-text font-normal">{property.address}</p>
                <div className="flex gap-4 mt-auto">
                    <IconChip icon={Bed} label={`${PropertyHelper.getBedroomCount(property)} Beds`} />
                    <IconChip icon={Bath} label={`${PropertyHelper.getBathroomCount(property)} Baths`} />
                    <IconChip icon={Building} label={property.finished_status} />
                </div>
            </div>
        </Link>
    )
}
