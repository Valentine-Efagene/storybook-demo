import { JWTPayload } from "jose"
import { ApiResponse } from "./common"

export type Role =
    | "user"
    | "admin"
    | "project_manager"
    | "sales"
    | "support"
    | "finance"
    | "legal"
    | "pmb"
    | "mofi_admin"
    | "agent"
    | "developer"
    | "mortgage_operator"
    | "fhf_admin"
    | "home_owner"

export type IEmploymentStatus = 'employed' | 'self_employed'

export interface User {
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
    token: {
        authToken: string;
    };
    user: User;
}

export type Session = {
    accessToken: string
    refreshToken: string
    user: JWTPayload
    profile: User
} | null