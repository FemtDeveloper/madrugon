import { useShallow } from "zustand/shallow";
import { useUserStore } from "@/stores";

export const useRole = () => {
    const { user } = useUserStore(useShallow((state) => ({ user: state.user })));

    const isAdmin =
        user?.role_name === "admin" || user?.role_name === "super_admin";


    const isSeller = user?.role_name === 'seller'


    return { role: user?.role_name, isAdmin, isSeller };
};