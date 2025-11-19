import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Action } from '@/types/common';
import { User } from '@/types/user';
import { PropertyStatus } from '@/types/property';

export type Subjects = 'Property' | 'User' | 'all' | { __type: 'Property' } | { __type: 'User' };
export type AppAbility = PureAbility<[Action, Subjects]>;

export function defineAbilityFor(user?: Pick<User, 'id' | 'roles'>): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility);

    const isAdmin = !!user && Array.isArray(user.roles) && user.roles.includes('admin');

    if (isAdmin) {
        can(Action.Manage, 'all');
    } else {
        can(Action.Read, 'all');
    }

    // ✅ Resource-level rules
    // Resource-level rules: only apply object-level conditions when a user is present
    if (user) {
        can(Action.Update, 'Property', { poster_id: user.id } as { poster_id: number });
    }
    cannot(Action.Delete, 'Property', { status: 'allocated' } as { status: PropertyStatus });

    return build({
        detectSubjectType: (item: any) => item.__type,
        conditionsMatcher: (matchConditions: any) => (object: any) => {
            if (!matchConditions || typeof matchConditions !== 'object') return true;
            return Object.keys(matchConditions).every(key => {
                return object && object[key] === matchConditions[key];
            });
        },
    });
}
