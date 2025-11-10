import React, { DetailedHTMLProps, ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react'
import { Card } from './ui/card'
import { LucideProps } from 'lucide-react';

export interface DashboardCardData {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    title: string;
    value: string | number;
}

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: DashboardCardData;
}

export function DashboardCard({ className, data, ...rest }: IProps) {
    const { icon: Icon, title, value } = data;

    return (
        <Card className={`${className} flex flex-col items-start gap-4 p-4 rounded-lg`} {...rest}>
            <div className='p-2 bg-[var(--tertiary-bg)] rounded-md'>
                <Icon className='' />
            </div>
            <div className='text-sm text-[var(--secondary-text)]'>{title}</div>
            <div className='text-xl font-semibold text-[var(--primary-text)]'>{value}</div>
        </Card>
    )
}
