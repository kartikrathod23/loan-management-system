    "use client";

    import { useEffect } from "react";
    import { useRouter } from "next/navigation";

    import { useAuthStore } from "@/store/auth.store";

    interface Props {
        children: React.ReactNode;
        allowedRoles?: string[];
    }

    export default function ProtectedRoute({ children, allowedRoles, }: Props) {
        const router = useRouter();

        const { user, loading } = useAuthStore();

        useEffect(() => {
            if (loading) return;

            if (!user) {
                router.push("/login");
                return;
            }

            if (
                allowedRoles &&
                !allowedRoles.includes(user.role)
            ) {
                router.push("/login");
            }
        }, [user, loading, router, allowedRoles]);

        if (loading) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[#020817] text-white">
                    Loading...
                </div>
            );
        }

        if (!user) return null;

        return children;
    }