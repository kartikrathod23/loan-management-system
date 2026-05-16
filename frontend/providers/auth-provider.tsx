"use client";

import { useEffect } from "react";
import { getCurrentUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function AuthProvider({children,}: {children: React.ReactNode;}) {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getCurrentUser();
                setUser(response.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [setUser, setLoading]);

    return children;
}