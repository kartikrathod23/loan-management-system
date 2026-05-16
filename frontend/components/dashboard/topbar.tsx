"use client";

import { useAuthStore } from "@/store/auth.store";

export default function Topbar() {
    const { user } = useAuthStore();

    return (
        <header className="flex h-[80px] items-center justify-between border-b border-white/5 px-8">

            <div>
                <h1 className="text-2xl font-bold text-white">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                    Welcome back, {user?.name}
                </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-[#0F172A] px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                    {user?.name?.charAt(0)}
                </div>

                <div>
                    <p className="text-sm font-medium text-white">
                        {user?.name}
                    </p>

                    <p className="text-xs uppercase tracking-wide text-gray-400">
                        {user?.role}
                    </p>
                </div>
            </div>

        </header>
    );
}