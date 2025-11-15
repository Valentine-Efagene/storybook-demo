"use client"

import { useProperty } from '../useProperties'
import useToastRawError from '@/hooks/useToastRawError'
import PropertyCard from '../PropertyCard'
import { EmptyProperty } from '../EmptyProperty'
import NextImage from '@/components/NextImage'
import ImageHelper from '@/lib/helpers/ImageHelper'
import FormatHelper from '@/lib/helpers/FormatHelper'
import PropertyHelper from '@/lib/helpers/PropertyHelper'
import IconChip from '@/components/IconChip'
import { Bath, Bed, Building, CheckCircle, HammerIcon, House, LucideProps, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import StyledIconChip from '@/components/StyledIconChip'
import { PropertyFinishStatus } from '@/types/property'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import CenteredLoader from '@/components/CenteredLoader'

interface Props {
    id: number
}

export function Property({ id }: Props) {
    const { data, isFetching, isError, error } = useProperty(id)

    useToastRawError({ isError, error })

    const property = data?.body?.property

    if (isFetching) {
        return <CenteredLoader size='md' />
    }

    if (!property) {
        return <EmptyProperty />
    }

    const finishingIcon: Record<PropertyFinishStatus, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
        semi_finished: HammerIcon,
        finished: House
    }

    const FinishingIconComponent = finishingIcon[property.finished_status ?? 'semi_finished']

    return (
        <div className='flex flex-col gap-4 p-8'>
            <div className='flex justify-between items-center'>
                <h1 className='font-medium text-xl text-primary-text'>{property?.title}</h1>
                <div className='flex gap-4'>
                    <Button variant='subtle' icon={<RefreshCcw />} iconPosition='left'>Update Completion Status</Button>
                    <Button variant='subtle' icon={<RefreshCcw />} iconPosition='left'>Update Availability</Button>
                </div>
            </div>
            <div className='flex gap-4 w-full'>
                <div className='rounded-lg border border-primary-border'>
                    <NextImage
                        src={ImageHelper.getCdnLink(property.display_image, 'property') || ''}
                        alt={property.title ?? ''}
                        width={180}
                        height={172}
                        className="w-[270px] h-[260px] object-cover rounded-lg"
                    />
                </div>
                <div className='rounded-lg border border-primary-border flex-1'>
                    <div className="flex flex-col gap-2 p-4 justify-between h-full">
                        <div className='flex gap-4'>
                            <StyledIconChip
                                icon={<CheckCircle className='text-success w-[10px] h-[10px]' />}
                                label='Available'
                            />
                            <StyledIconChip
                                icon={<CheckCircle className='text-warning w-[10px] h-[10px]' />}
                                label='No Milestone Started'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='text-primary-text text-sm'>0/4 Units allocated</div>
                            <p className="text-lg text-primary-text font-semibold">{FormatHelper.nairaFormatter.format(property.price)}</p>
                            <div className='grid grid-cols-3 gap-4'>
                                <div className="border border-primary-border shadow-[0px_1px_2px_rgba(230,230,217,0.5)] rounded-md flex flex-col gap-4 p-4 items-start">
                                    <div className="flex items-center gap-2">
                                        <FinishingIconComponent className="w-6 h-6 text-brand-border" />
                                    </div>
                                    <div className="text-sm text-primary-text font-medium">{property.finished_status}</div>
                                </div>

                                {property.buildings?.[0]?.bathroom_count !== undefined && (
                                    <div className="border border-primary-border shadow-[0px_1px_2px_rgba(230,230,217,0.5)] rounded-md flex flex-col gap-4 p-4 items-start">
                                        <div className="flex items-center gap-2">
                                            <Bath className="w-6 h-6 text-brand-border" />
                                        </div>
                                        <div className="text-sm text-primary-text font-medium">{property.buildings?.[0]?.bathroom_count} Baths</div>
                                    </div>
                                )}

                                {property.buildings?.[0]?.bedroom_count !== undefined && (
                                    <div className="border border-primary-border shadow-[0px_1px_2px_rgba(230,230,217,0.5)] rounded-md flex flex-col gap-4 p-4 items-start">
                                        <div className="flex items-center gap-2">
                                            <Bath className="w-6 h-6 text-brand-border" />
                                        </div>
                                        <div className="text-sm text-primary-text font-medium">{property.buildings?.[0]?.bedroom_count} Baths</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
