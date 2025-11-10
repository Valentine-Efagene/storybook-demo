import { Role, User } from "@/types/user";
import StringHelper from "./StringHelper";

export default class UserHelper {
  public static getFullName(user: Partial<Pick<User, 'first_name' | 'last_name'>> | Partial<Pick<User, 'first_name' | 'last_name'>>) {
    if (UserHelper.isDevApiUser(user)) {
      return UserHelper.getFullNameOfDevApiUser(user)
    }

    if (!UserHelper.isRegularUser(user)) {
      return null
    }

    if (!user.first_name && !user.last_name) {
      return null
    }

    if (!user.first_name && user.last_name) {
      return user.last_name
    }

    if (!user.last_name && user.first_name) {
      return user.first_name
    }

    return `${user.first_name} ${user.last_name}`;
  }

  public static isDevApiUser(user: Partial<Pick<User, 'first_name' | 'last_name'>> | Partial<Pick<User, 'first_name' | 'last_name'>>): user is User {
    return (user as User).first_name !== undefined
  }

  public static isRegularUser(user: Partial<Pick<User, 'first_name' | 'last_name'>> | Partial<Pick<User, 'first_name' | 'last_name'>>): user is User {
    return (user as User).first_name !== undefined
  }

  public static getFullNameOfDevApiUser(user: {
    first_name: string | null,
    last_name: string | null
  }) {
    return `${user.first_name} ${user.last_name}`;
  }

  public static rolesWithStatus: Role[] = ['developer']

  public static getLink(user: User) {
    const subscriberLink = `/users/${user.id}`
    return subscriberLink
  }

  public static getUserLinkById(id: number) {
    const subscriberLink = `/users/${id}`
    return subscriberLink
  }

  public static getOneName(user: User) {
    if (user.first_name) {
      return user.first_name;
    }

    if (user.last_name) {
      return user.last_name;
    }

    return "No Name";
  }

  public static hasRole(user: Pick<User, 'roles'>, role: Role): boolean {
    if (!user || !user.roles) {
      return false;
    }

    return user.roles.includes(role)
  }

  public static roleAsString(user: Pick<User, 'roles'>) {
    return StringHelper.stripUnderscores(user.roles.join(', '));
  }

  public static rolesMap: Record<Role, Role[]> = {
    finance: ["finance"],
    project_manager: ["project_manager"],
    mortgage_operator: ["mortgage_operator"],
    support: ["support"],
    legal: ["legal"],
    admin: ["legal", "mortgage_operator", "finance", "sales"],
    developer: ["user", "developer"],
    user: ["user"],
    agent: ["agent"],
    sales: ["sales"],
    pmb: ["pmb"],
    mofi_admin: ["mofi_admin"],
    fhf_admin: ["fhf_admin"],
    home_owner: ["home_owner"],
  }

  public static isSubscriber(user: User): user is User {
    return this.hasRole(user, 'user');
  }

  public static isHomeOwner(user: User): user is User {
    return this.hasRole(user, 'home_owner');
  }

  public static isAgent(user: User): user is User {
    return this.hasRole(user, 'agent');
  }

  public static isPermitted(allowedRoles: (Role | 'all')[], user: User) {
    if (allowedRoles.includes('all')) {
      return true
    }

    const isPermitted = this.hasRole(user, 'admin') || user.roles.some(role => allowedRoles.includes(role))
    return isPermitted
  }

  public static hasAllPermissions(allowedRoles: (Role | 'all')[][], user: User) {
    for (const roles of allowedRoles) {
      if (!this.isPermitted(roles, user)) {
        return false
      }
    }

    return true
  }

  public static isLegalAdmin(user: User): user is User {
    return this.hasRole(user, 'legal');
  }

  public static isSuperAdmin(user: User): user is User {
    return this.hasRole(user, 'admin');
  }

  public static isMortgageOperationsAdmin(user: User): user is User {
    return this.hasRole(user, 'mortgage_operator');
  }

  public static isFinanceAdmin(user: User): user is User {
    return this.hasRole(user, 'finance');
  }

  public static isDeveloper(user: User): user is User {
    return this.hasRole(user, 'developer')
  }

  public static formRolesOption(roles: Role[]) {
    //return JSON.stringify(roles)
    return roles
  }

  public static roleToHumanMap: Record<Role, string> = {
    finance: "Finance Admin",
    mortgage_operator: "Mortgage Ops Admin",
    legal: "Legal Admin",
    admin: "Super Admin",
    developer: "Developer",
    sales: "Sales Admin",
    user: "Home Buyer",
    support: "Support",
    agent: "Agent",
    pmb: "Lender",
    mofi_admin: "MOFI Admin",
    fhf_admin: "FHF Admin",
    project_manager: "Project Manager",
    home_owner: "Home Owner",
  }

  public static baseRoleToHumanMap: Record<Role, string> = {
    finance: "Finance Admin",
    mortgage_operator: "Mortgage Ops Admin",
    legal: "Legal Admin",
    admin: "Super Admin",
    developer: "Developer",
    sales: "Sales Admin",
    user: "Home Buyer",
    support: "Support",
    agent: "Agent",
    pmb: "Lender",
    mofi_admin: "MOFI Admin",
    project_manager: "Project Manager",
    fhf_admin: "SPV Admin",
    home_owner: "Home Owner",
  }

  public static getActiveRoles(user: User | null) {
    if (!user) {
      return []
    }

    const roles = user?.roles

    if (!roles || roles.length < 1) {
      return []
    }

    if (roles.length === 1) {
      return roles
    }

    const filteredRoles = user?.roles
      .filter(role => role !== 'user')
      .map((role) => role)

    return filteredRoles
  }

  public static getRoleDisplay(user: User | null) {
    return this.getActiveRoles(user).map(role => this.roleToHumanMap[role]).join(', ')
  }

  public static getStartRoute: (user: User | null) => string = (user) => {
    if (!user || !user.roles || user.roles.length < 1) {
      return '/dashboard'
    }

    const roles = user.roles

    const routeMap: Record<Role, string> = {
      admin: '/dashboard',
      legal: '/requests',
      project_manager: '/projects',
      mortgage_operator: '/requests',
      sales: '/requests',
      pmb: '/requests',
      support: '/requests',
      finance: '/requests',
      user: "/requests",
      developer: "/requests",
      agent: "/requests",
      home_owner: "/requests",
      mofi_admin: "/dashboard",
      fhf_admin: "/requests",
    }

    for (const key in routeMap) {
      if (roles.includes(key as Role)) {
        return routeMap[key as Role];
      }
    }

    return '/dashboard'
  }
}
