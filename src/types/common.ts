
export interface ApiPaginationMeta {
    itemsPerPage: number
    totalItems: number
    currentPage: number
    totalPages: number
    sortBy: string[][]
}

export interface SVGProps extends React.SVGAttributes<SVGElement> { }

export interface ImagePlaceholder {
    src: string;
    blurDataURL: string;
    width: number;
    height: number;
}

export interface ApiResponse<T> {
    message: string | null
    statusCode: number
    payload: T
    error?: string
}

export interface ApiPaginationResponse<T> {
    message: string | null
    statusCode: number
    payload: ApiPagination<T>
}

export interface ApiPagination<T> {
    data: T[]
    meta: ApiPaginationMeta
    links: ApiPaginationLinks
}

export interface ApiPaginationMeta {
    itemsPerPage: number
    totalItems: number
    currentPage: number
    totalPages: number
    sortBy: string[][]
}

export interface ApiResponse<T> {
    message: string | null
    status: number
    body: T
    error?: string
}

export interface ApiPaginationResponse<T> {
    message: string | null
    statusCode: number
    payload: ApiPagination<T>
}

export interface ApiPagination<T> {
    data: T[]
    meta: ApiPaginationMeta
    links: ApiPaginationLinks
}

export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    JPY = 'JPY',
    NGN = 'NGN',
}

export interface ApiPaginationLinks {
    current: string
}

export interface QueryParams {
    page?: string | null
    limit?: string | null
    offset?: string | null
    search?: string | null
    from?: string | null
    to?: string | null
}