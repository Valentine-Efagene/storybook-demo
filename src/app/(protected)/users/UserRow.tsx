import { TableCell, TableRow } from "@/components/ui/table"
import UserHelper from "@/lib/helpers/UserHelper"
import { User } from "@/types/user"

interface UserRowProps {
    user: User
}

export default function UserRow({ user }: UserRowProps) {
    return (
        <TableRow key={user.id}>
            <TableCell className="font-medium">{UserHelper.getFullName(user)}</TableCell>
            <TableCell>{user.email}</TableCell>
        </TableRow>
    )
}
