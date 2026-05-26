import { usePage } from "@inertiajs/react";

export function useAuth() {

    const { auth }: any = usePage().props;

    const user = auth?.user;

    const hasRole = (...roles: string[]) => {

        if (!user) return false;

        return roles.includes(
            user.role?.name
        );
    };

    return {
        user,
        hasRole,
    };
}