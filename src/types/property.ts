import { QueryParams } from "./common";

export type PropertyStatus = 'allocated' | 'unallocated';

export interface PropertyQueryParams extends QueryParams {
    status?: PropertyStatus | null
    type?: PropertyType | null
    completion_status?: PropertyCompletionStatus | null
    order?: 'asc' | 'desc' | null
}

export type PropertyType = "bungalow" | "condominium" | "fully_detached_duplex" | "semi_detached_duplex" | "detached_bungalows" | "apartments" | "flats" | "terraces" | "maisonette" | "penthouse" | "terrace_bungalows"
    | "semi_detached_bungalow" | "terrace_duplex" | "fully_detached_duplex"

export type PropertyCompletionStatus = 'under_construction' | 'move_in_ready'

export interface Plan {
    "id": number,
    "name": string | null,
    "downpayment_percent": number,
    "allow_downpayment": boolean,
    "allow_mortgage": boolean,
    "created_at": string | null,
    "updated_at": string | null,
    "deleted_at": string | null
}

export interface Apartment {
    id: number
    building_id: number
    name: string | null
    floor: number
    bedroom_count: number | null
    bathroom_count: number | null
    available: boolean
    sold: boolean
    price: number
    pending_price?: number | null
    created_at: string | null
    updated_at: string | null
    deleted_at: string | null

    // Not real
    mortgaging?: boolean
}

export interface Building {
    id: number
    property_id: number
    name: string
    apartment_count: number | null
    bedroom_count: number | null
    bathroom_count: number | null
    floor_count: number | null
    random_floor_position: boolean | null
    created_at: string
    updated_at: string
    deleted_at: string | null
    apartments: Apartment[]
    amenities: string | null
    total_units?: number | null,
    total_sold?: number | null,
    total_available?: number | null,
}

export interface PropertyUpdateDto {
    property_id: number,
    title: string
    ready_for_purchase: boolean
    location: string | undefined
    state: string | undefined
    city: string | undefined
    property_type: PropertyType | undefined
    completion_status: PropertyCompletionStatus | undefined
    model_3d_image: string[] | null,
    floor_plan_image: string[] | null,
    aerial_image: string[] | null,
    display_image: string[] | null,
    youtube_url: string | undefined,
    administrative_fee: number

    // Needed
    // status: string | undefined
    units: number | null
    price?: number,
    finished_price?: number,
    about?: string
}

export interface PropertyDocument {
    name?: string,
    file?: string,
    size?: number,
}

export interface Milestone {
    id: number,
    desc: string | null,
    created_at: string | null,
    updated_at: string | null,
    application_id: null,
    media: string | null,
    updated_by: null,
    property_id: null,
    youtube_url: null | string,
    deleted_at: null | string,
    status: string | null,
    status_reason: string | null
}

export interface Property {
    __type: 'Property';
    id: number
    poster_id: number | null
    amenities: string | null,
    project_id: number
    project_property_id: number | null
    type: PropertyType
    units: number | null
    ready_for_purchase: boolean,
    multiple_buildings: boolean
    buildings_count: number
    developer?: string | null,
    is_vacant: boolean
    time_to_be_vacant: string | null
    approval_number: string | null
    completion_status: PropertyCompletionStatus | undefined
    youtube_url: string | null
    media: string | null
    three_d_walkthroughs: string | null
    floor_plans: string | null
    administrative_fee: number | null
    //property_documents: string | null
    title: string | null
    address: string | null
    state: string | null
    city: string | null
    price: number
    finished_price?: number
    status: PropertyStatus
    //amenities: string | null
    created_at: string
    updated_at: string
    deleted_at: string | null
    buildings: Building[]
    milestones: Milestone[]
    about?: string | null
    pending_price?: null

    //
    //photos?: IPhoto[]
    property_documents?: string | null
    total_units?: number | null,
    total_sold?: number | null,
    total_available?: number | null,
}

export interface PaginatedPropertyResponseBody {
    overview: {
        pending: number,
        sold: number,
        approved: number
        all: number
    },
    offset: number
    limit: number
    properties: Property[]
    total_count: number,
    total_pages: number
}

export type AvailabilityStatus = 'available' | 'provisionally_available' | 'sold_out'