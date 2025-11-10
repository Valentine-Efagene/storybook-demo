import { Ability, Role, User } from "@/types/user";
import UserHelper from "./UserHelper";

export default class AuthorizationHelper {
  public static isSalesAdmin(user?: User | null): user is User {
    if (!user) return false;

    return (
      user.roles.includes("sales") || user.roles.includes("admin")
    );
  }

  public static isLegalAdmin(user?: User | null): user is User {
    if (!user) return false;

    return (
      user.roles.includes("legal") || user.roles.includes("admin")
    );
  }

  public static isFinanceAdmin(user?: User | null): user is User {
    if (!user) return false;

    return (
      user.roles.includes("finance") || user.roles.includes("admin")
    );
  }

  public static isMortgageOperationsAdmin(user?: User | null): user is User {
    if (!user) return false;

    return (
      user.roles.includes("mortgage_operator") ||
      user.roles.includes("admin")
    );
  }

  public static getAllTopLevelRoles: () => Role[] = () => {
    const roles: Record<Role, string> = {
      project_manager: "",
      user: "",
      support: "",
      pmb: "",
      mofi_admin: "",
      agent: "",
      developer: "",
      finance: "",
      mortgage_operator: "",
      legal: "",
      admin: "",
      sales: "",
      fhf_admin: "",
      home_owner: ""
    }

    return Object.keys(roles) as Role[]
  }

  public static adminRoles: Role[] = [
    'admin',
    'mortgage_operator',
    'sales',
    'project_manager',
    'support',
    'mofi_admin',
    'finance',
    'legal',
  ]

  /**
   * Maps each role to the tabs they can view
   */
  public static roleTabAcl: Record<Role, Role[]> = {
    admin: ['admin'],
    project_manager: ['developer', 'mofi_admin'],
    user: ['agent', 'admin', 'mofi_admin', 'pmb', 'legal', 'mortgage_operator', 'support'],
    sales: ['mofi_admin'],
    support: ['mofi_admin'],
    finance: ['mofi_admin'],
    legal: ['mofi_admin'],
    pmb: ['admin', 'mortgage_operator', 'legal', 'mofi_admin'],
    mofi_admin: ['admin'],
    agent: ['admin', 'mofi_admin'],
    developer: ['project_manager', 'support', 'mofi_admin'],
    mortgage_operator: ['admin', 'mofi_admin'],
    fhf_admin: ['admin', 'mofi_admin'],
    home_owner: ['admin', 'mofi_admin'],
  }

  public static ACL: Record<Ability, Role[]> = {
    // Navs
    access_users_tab: ['admin', 'sales', 'mortgage_operator', 'project_manager', 'support', 'mofi_admin'],
    access_projects_tab: ['legal', 'project_manager', 'mofi_admin', 'sales'],
    access_properties_tab: ['project_manager', 'mofi_admin', 'support', 'sales'],
    access_home_tab: ['admin', 'mofi_admin'],
    access_requests_tab: ['legal', 'mortgage_operator', 'support', 'sales', "pmb", 'mofi_admin'],
    access_bank_statement_tab: [],
    access_transactions_tab: ['finance', 'mortgage_operator', 'sales', 'mofi_admin'],
    // access_reports_tab: [ 'mofi_admin'],
    access_reports_tab: [],
    access_policies_tab: [],
    initiate_credit: [],

    // Approve, decline and edit
    review_mortgage: ['mortgage_operator', "pmb"],
    use_kanban: [],
    preapprove_mortgage: ["mofi_admin"],
    review_application_form: [],
    review_outright_purchase: ['admin'],
    review_price_change: ['sales'],
    review_property_upload: ['sales', 'project_manager'],
    review_property: ['project_manager'],
    review_project: ['legal', 'project_manager', 'mofi_admin'],
    review_mortgage_documents: ['mortgage_operator'],
    review_project_documents: ['mortgage_operator'],
    review_user: [],
    view_prelaunch_application: ['support', 'mofi_admin'],

    // View
    view_unit: ['sales', 'mortgage_operator', "pmb", 'project_manager', 'mofi_admin', 'support'],

    // Exports
    export_mortgage: ['mortgage_operator', 'pmb'],
    export_csv: [],

    // View Request Tabs
    view_price_change_tab: ['sales', 'mofi_admin'],
    view_call_tab: ['support', 'mofi_admin'],
    view_all_tab: ['mofi_admin'],
    view_all_users: ['mofi_admin'],
    view_outright_purchase_tab: ['sales', 'mofi_admin'],
    view_application_form_tab: [],
    view_property_upload_tab: ['sales', 'project_manager', 'mofi_admin'],
    view_indication_of_interest_tab: ['sales', 'support', 'mofi_admin'],
    view_commercial_tab: ['mortgage_operator', 'mofi_admin', 'support', 'sales'],
    view_rto_tab: ['mortgage_operator', 'mofi_admin'],
    view_halal_tab: ['mortgage_operator', 'mofi_admin', 'support', 'sales'],
    view_fhf_tab: ['mortgage_operator', 'mofi_admin', 'support', 'sales'],
    view_support_tab: ['support', 'mofi_admin'],
    view_inspection_tab: ['sales', 'support', 'mofi_admin'],
    view_mortgage_documents: ['mortgage_operator', 'pmb', 'mofi_admin'],
    view_milestone_tab: ['sales', 'mofi_admin'],

    view_all_transactions_tabs: ['admin'],

    view_completed_projects: ['sales', 'project_manager'],
    view_offplan_projects: ['mofi_admin'],

    // Users
    view_user: ['mortgage_operator', 'sales', 'project_manager', 'support', 'mofi_admin'],
    reassign_lender: ['mortgage_operator'],
    access_publications_tab: ['admin', 'mofi_admin'],
    access_lenders_tab: ['admin', 'mofi_admin'],
    view_all_user_tab: ['admin'],
    view_developer_info: ['project_manager', 'mofi_admin', 'sales', 'support'],
    generate_wallet: [],
    toggle_wallet: [],
    edit_developer_poc: [],
    toggle_pmb_listing: [],
    delete_pmb: [],
    edit_project_details: [],
    edit_employment_details: [],
    edit_developer_info: [],
    edit_developer_director: [],
    edit_developer_director_documents: [],
    review_developers: ['project_manager', 'mofi_admin'],

    create_lender: [],
    edit_lender: ['mofi_admin'],
    view_property: ['sales', 'mofi_admin', 'project_manager', 'mortgage_operator', 'support'],
    view_documents: ['sales', 'mofi_admin', 'project_manager', 'mortgage_operator', 'pmb', 'legal', 'finance', "developer", 'support'],
    view_property_documents: ['mofi_admin', 'project_manager', 'mortgage_operator', 'sales'],
    view_developer_documents: ['project_manager', 'mofi_admin', 'mortgage_operator', 'sales'],
    cancel_mortgage_application: [],
    register_user: [],
    review_account_deletion: [],
    view_pending_properties: ['sales'],
    activate_wallets: ['sales', 'mortgage_operator'],
    allocate_payment: ['mortgage_operator'],
    request_bank_statement: [],
    see_raw_errors: [],
    view_permissions_matrix: ['mofi_admin'],
    view_permissions_analytics: ['mofi_admin']
  }

  public static EmailACL: Record<Ability, string[]> = {
    // Approve, decline and edit
    review_outright_purchase: ['oludare.makinde@quickshelter.ng'],
    review_mortgage: [],
    review_property: [],
    review_project: [],
    review_user: [],
    review_application_form: [],
    review_price_change: [],
    review_property_upload: [],
    access_users_tab: [],
    access_projects_tab: [],
    access_properties_tab: [],
    access_requests_tab: [],
    access_transactions_tab: [],
    view_unit: [],
    export_csv: [],
    export_mortgage: [],
    view_application_form_tab: [],
    view_outright_purchase_tab: [],
    view_price_change_tab: [],
    view_property_upload_tab: [],
    view_all_tab: [],
    view_indication_of_interest_tab: [],
    view_commercial_tab: [],
    view_rto_tab: [],
    view_support_tab: [],
    view_all_transactions_tabs: [],
    view_user: [],
    initiate_credit: [],
    view_milestone_tab: [],
    access_home_tab: [],
    view_mortgage_documents: [],
    review_mortgage_documents: [],
    review_developers: [],
    reassign_lender: [],
    view_all_user_tab: [],
    access_publications_tab: [],
    view_halal_tab: [],
    access_lenders_tab: [],
    preapprove_mortgage: [],
    view_inspection_tab: [],
    view_prelaunch_application: [],
    access_reports_tab: [],
    access_policies_tab: [],
    view_call_tab: [],
    generate_wallet: [],
    toggle_wallet: [],
    edit_developer_poc: [],
    toggle_pmb_listing: [],
    delete_pmb: [],
    edit_project_details: [],
    edit_employment_details: [],
    view_developer_info: [],
    edit_developer_info: [],
    edit_developer_director: [],
    edit_developer_director_documents: [],
    create_lender: [],
    edit_lender: [],
    view_property: [],
    view_documents: [],
    view_property_documents: [],
    view_developer_documents: [],
    view_all_users: [],
    cancel_mortgage_application: [],
    register_user: [],
    review_account_deletion: [],
    view_pending_properties: [],
    view_completed_projects: [],
    view_offplan_projects: [],
    review_project_documents: [],
    allocate_payment: [],
    activate_wallets: [],
    access_bank_statement_tab: [],
    request_bank_statement: [],
    view_fhf_tab: [],
    see_raw_errors: [],
    use_kanban: [],
    view_permissions_matrix: [],
    view_permissions_analytics: []
  }

  public static getDefaultUserTab: (user: User | null) => Role | "" = (user) => {
    if (!user || !user.roles || user.roles.length < 1) {
      return 'user'
    }

    const roles = user.roles

    const map: Record<Role, Role | ""> = {
      admin: '',
      mortgage_operator: 'user',
      sales: 'user',
      legal: 'user',
      support: 'user',
      pmb: 'user',
      project_manager: "developer",
      mofi_admin: "",
      finance: "user",
      agent: "user",
      user: "user",
      developer: "user",
      fhf_admin: "user",
      home_owner: "user",
    }

    for (const key in map) {
      if (roles.includes(key as Role)) {
        return map[key as Role];
      }
    }

    return 'user'
  }
}
