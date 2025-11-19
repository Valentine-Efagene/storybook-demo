import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Action } from '@/types/common';
import { User } from '@/types/user';
import { PropertyStatus } from '@/types/property';

export type Subjects = 'Property' | 'User' | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;

export function defineAbilityFor(user: Pick<User, 'id' | 'roles'>): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility);

    const isAdmin = user?.roles?.includes('admin');

    if (isAdmin) {
        can(Action.Manage, 'all');
    } else {
        can(Action.Read, 'all');
    }

    // ✅ Resource-level rules
    can(Action.Update, 'Property', { poster_id: user.id } as { poster_id: number });
    cannot(Action.Delete, 'Property', { status: 'allocated' } as { status: PropertyStatus });

    return build({
        detectSubjectType: (item: any) => item.__type,
    });
}
