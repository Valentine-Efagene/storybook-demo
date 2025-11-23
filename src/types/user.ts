import { JWTPayload } from "jose"
import { ApiResponse, QueryParams } from "./common"

export type Role =
    | "user"
    | "admin"
    | "sales"
    | "support"
    | "finance"
    | "mortgage_operator"



export type IEmploymentStatus = 'employed' | 'self_employed'

export interface User {
    __type: 'User';
    id: number,
    first_name: string | null,
    last_name: string | null,
    extra_name: string | null,
    is_civil_servant: boolean | null,
    account_number: string | null,
    phone: string | null,
    nhf_number: string | null,
    employer_id: number | null,
    name_of_employer: string | null,
    job_title: string | null,
    email: string | null,
    password: string | null,
    email_verified: boolean | null,
    bvn_verified: boolean | null,
    bvn: string | null,
    roles: Role[],
    avatar: string | null,
    gender: string | null,
    dob: string | null,
    country: string | null,
    pmb_employer_id: number | null,
    pmb_parent_id: number | null,
    home_address: string | null,
    is_first_time_login: boolean | null,
    identity_document: string | null,
    identity_document_verified: boolean | null,
    employment_status: IEmploymentStatus | null,
    monthly_net_salary: number | null,
    is_nhf_active: boolean | null,
    pfa: string | null,
    address: string | null,
    nin: string | null,
    marital_status: string | null,
    rsa: string | null,
    bank_name: string | null,
    business_sector: string | null,
    years_of_work: number | null,
    suspended: boolean | null,
    created_at: string | null,
    updated_at: string | null

    employment_type: string | null,
    employer_number: string | null,
    address_2: string | null,
    staff_id: number | null,
    date_of_employment: string | null,
    contribution_location: string | null,
    kin_first_name: string | null,
    kin_last_name: string | null,
    kin_relationship: string | null,
    kin_phone: string | null,
    kin_address: string | null,
}

export type AuthResponse = ApiResponse<IAuthData>

export interface IAuthData {
    token: string;
    user: User;
}

export type Session = {
    accessToken: string
    refreshToken: string
    user: JWTPayload
    profile: User
} | null

export interface UserQueryParams extends QueryParams {
    contributionStatus?: string | null
}

export interface PaginatedUserResponseBody {
    offset: number
    limit: number
    total_count: number
    total_pages: number
    users: User[]
    overview: {
        admin_count: number
        user_count: number
        developer_count: 3
        employee_count: 3
    }
}

export const QUERY_KEYS = {
    USERS: 'users',
    USER: 'user',
    PROFILE: 'profile',
    PROPERTIES: 'properties',
    PLANS: 'plans',
    EVENT_MEDIA: 'event-media',
    TICKET_CATEGORIES: 'ticket-categories',
    EVENT_TICKET_TYPES: 'event-ticket-types',
    ORDERS: 'orders',
    ORDER_ITEMS: 'order-items',
    TICKETS: 'tickets',
    TICKET: 'ticket',
    ROLES: 'roles',
}

export interface TokenMetadata {
    iat: number
    exp: number
    user_id: number
    roles: Role[]
}


export type Ability =
    'review_developers'
    | "use_kanban"
    | 'see_raw_errors'
    | 'view_all_users'
    | 'request_bank_statement'
    | 'activate_wallets'
    | 'initiate_credit'
    | 'access_bank_statement_tab'
    | 'allocate_payment'
    | 'view_pending_properties'
    | 'view_completed_projects'
    | 'view_offplan_projects'
    | 'review_project_documents'
    | 'review_account_deletion'
    | 'view_developer_documents'
    | 'register_user'
    | 'review_mortgage'
    | 'view_property'
    | 'view_documents'
    | 'view_property_documents'
    | 'review_property'
    | 'review_project'
    | 'review_user'
    | 'review_application_form'
    | 'review_outright_purchase'
    | 'review_price_change'
    | 'view_prelaunch_application'
    | 'review_property_upload'
    | 'preapprove_mortgage'
    | 'view_developer_info'
    | 'edit_developer_info'
    | 'edit_developer_director'
    | 'edit_developer_director_documents'

    | 'reassign_lender'
    | 'create_lender'
    | 'edit_lender'

    | 'view_application_form_tab'
    | 'view_call_tab'
    | 'view_all_tab'
    | 'view_inspection_tab'
    | 'view_fhf_tab'
    | 'view_indication_of_interest_tab'
    | 'view_commercial_tab'
    | 'view_rto_tab'
    | 'view_halal_tab'
    | 'view_support_tab'
    | 'view_outright_purchase_tab'
    | 'view_price_change_tab'
    | 'view_milestone_tab'
    | 'view_property_upload_tab'
    | 'view_mortgage_documents'
    | 'review_mortgage_documents'

    | 'access_home_tab'
    | 'access_reports_tab'
    | 'access_policies_tab'
    | 'access_users_tab'
    | 'access_projects_tab'
    | 'access_properties_tab'
    | 'access_requests_tab'
    | 'access_lenders_tab'
    | 'access_transactions_tab'
    | 'view_unit'
    | 'export_csv'
    | 'export_mortgage'
    | 'view_all_transactions_tabs'

    | 'generate_wallet'
    | 'edit_project_details'
    | 'edit_employment_details'

    | 'toggle_wallet'
    | 'edit_developer_poc'
    | 'toggle_pmb_listing'
    | 'delete_pmb'

    | 'view_user'
    | 'view_all_user_tab'

    | 'access_publications_tab'

    | 'cancel_mortgage_application'

    | 'view_permissions_matrix'
    | 'view_permissions_analytics'