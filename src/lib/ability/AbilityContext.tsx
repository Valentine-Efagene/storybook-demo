'use client';

import { createContext, useContext, useMemo } from 'react';
import { AppAbility, defineAbilityFor } from './ability.factory';
import { User } from '@/types/user';

const AbilityContext = createContext<AppAbility | null>(null);

interface AbilityProviderProps {
    user: Pick<User, 'id' | 'roles'>;
    children: React.ReactNode;
}

export function AbilityProvider({ user, children }: AbilityProviderProps) {
    const ability = useMemo(() => defineAbilityFor(user), [user]);

    return (
        <AbilityContext.Provider value={ability}>
            {children}
        </AbilityContext.Provider>
    );
}

export function useAbility() {
    const ability = useContext(AbilityContext);
    if (!ability) throw new Error('useAbility must be used inside AbilityProvider');
    return ability;
}
