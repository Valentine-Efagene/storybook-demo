import UserHelper from '@/lib/helpers/UserHelper';
import { useGetFullUserFromSession } from './useGetCurrentUserFromSession';
import { Role } from '@/types/user';

interface IProps {
    allowedRoles: ("all" | Role)[];
}

function useIsAuthorized({ allowedRoles }: IProps) {

    const { data: profile } = useGetFullUserFromSession();

    if (!profile) return false;

    return UserHelper.isPermitted(allowedRoles, profile);
}

export default useIsAuthorized;
