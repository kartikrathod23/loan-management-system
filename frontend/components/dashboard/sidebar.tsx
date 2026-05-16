"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store/auth.store";
import { logoutUser } from "@/services/auth.service";

const roleMenus: Record<string, { label: string; href: string; }[]>={
    BORROWER: [
        {
            label: "Dashboard",
            href: "/borrower",
        },
        {
            label: "Apply Loan",
            href: "/borrower/apply-loan",
        },
        {
            label: "My Loans",
            href: "/borrower/my-loans",
        },
    ],

    SANCTION: [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        // {
        //     label: "Pending Loans",
        //     href: "/dashboard",
        // },
    ],

    DISBURSEMENT: [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        // {
        //     label: "Disbursements",
        //     href: "/dashboard",
        // },
    ],

    COLLECTION: [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        // {
        //     label: "Repayments",
        //     href: "/dashboard",
        // },
    ],

    ADMIN: [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
    ],

    SALES: [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
    ],
};

export default function Sidebar() {

    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const links =roleMenus[user?.role || ""] || [];

    const handleLogout = async () => {

        try {
            await logoutUser();
            logout();
            toast.success(
                "Logged out successfully"
            );
            router.push("/login");

        } catch {
            toast.error(
                "Logout failed"
            );
        }
    };

    return (
        <aside className="hidden w-[260px] border-r border-white/5 bg-[#081120] lg:flex lg:flex-col">
            <div className="flex h-20 items-center border-b border-white/5 px-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                    LMS
                </div>

                <div className="ml-4">
                    <h2 className="text-lg font-semibold text-white">
                        LoanMS
                    </h2>

                    <p className="text-xs text-gray-400">
                        Management Portal
                    </p>
                </div>

            </div>

            <nav className="flex-1 space-y-2 p-5">
                {links.map((link) => { const active =pathname === link.href;

                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`
                                flex h-12 items-center rounded-2xl px-5 text-sm font-medium transition-all
                                ${
                                    active
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }
                            `}
                        >
                            {link.label}
                        </Link>
                    );
                })}

            </nav>

            <div className="border-t border-white/5 p-5">
                <div className="mb-5">
                    <p className="text-sm font-medium text-white">
                        {user?.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        {user?.role}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex h-12 w-full items-center justify-center rounded-2xl bg-red-600 text-sm font-semibold text-white transition-all hover:bg-red-500"
                >
                    Logout
                </button>

            </div>
        </aside>
    );
}