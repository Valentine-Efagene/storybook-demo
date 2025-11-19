import { AbilityBuilder, PureAbility } from '@casl/ability'
import { Action } from '@/types/common'
import { User } from '@/types/user'

export type Subjects =
    | 'Property'
    | 'User'
    | 'Transaction'
    | 'Mortgage'
    | 'all'
    | { __type: 'Property' }
    | { __type: 'User' }
    | { __type: 'Transaction' }
    | { __type: 'Mortgage' }

export type AppAbility = PureAbility<[Action, Subjects]>

/**
 * Defines abilities for a given user based on their roles
 * This is an admin dashboard - guests/unauthenticated users have no access
 */
export function defineAbilityFor(user: Pick<User, 'id' | 'roles'> | null): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility)

    // No access for unauthenticated users in admin dashboard
    if (!user || !user.roles?.length) {
        // Explicitly deny all access for guests
        return build({
            detectSubjectType: (item: any) => item.__type,
            conditionsMatcher: (matchConditions: any) => (object: any) => {
                if (!matchConditions || typeof matchConditions !== 'object') return true
                return Object.keys(matchConditions).every(key => {
                    return object && object[key] === matchConditions[key]
                })
            }
        })
    }

    const { id: userId, roles } = user

    // Admin has full access to everything
    if (roles.includes('admin')) {
        can(Action.Manage, 'all')
        return build({
            detectSubjectType: (item: any) => item.__type,
            conditionsMatcher: (matchConditions: any) => (object: any) => {
                if (!matchConditions || typeof matchConditions !== 'object') return true
                return Object.keys(matchConditions).every(key => {
                    return object && object[key] === matchConditions[key]
                })
            }
        })
    }

    // Sales role permissions (to be refined later)
    if (roles.includes('sales')) {
        can(Action.Read, 'Property')
        can(Action.Create, 'Property')
        can(Action.Update, 'Property')
        // Add specific sales permissions here
    }

    // Support role permissions (to be refined later)
    if (roles.includes('support')) {
        can(Action.Read, 'Property')
        can(Action.Read, 'User')
        // Add specific support permissions here
    }

    // Finance role permissions (to be refined later)
    if (roles.includes('finance')) {
        can(Action.Read, 'Property')
        can(Action.Read, 'Transaction')
        // Add specific finance permissions here
    }

    // Mortgage operator permissions (to be refined later)
    if (roles.includes('mortgage_operator')) {
        can(Action.Read, 'Property')
        can(Action.Update, 'Property')
        can(Action.Read, 'Mortgage')
        can(Action.Update, 'Mortgage')
        // Add specific mortgage operator permissions here
    }

    // User role - for display purposes only, minimal permissions
    if (roles.includes('user')) {
        can(Action.Read, 'Property')
    }

    return build({
        detectSubjectType: (item: any) => item.__type,
        conditionsMatcher: (matchConditions: any) => (object: any) => {
            if (!matchConditions || typeof matchConditions !== 'object') return true
            return Object.keys(matchConditions).every(key => {
                return object && object[key] === matchConditions[key]
            })
        }
    })
}