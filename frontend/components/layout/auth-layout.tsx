"use client";

import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export default function AuthLayout({children,title,subtitle,}: Props) {
    return (
        <main className="min-h-screen grid lg:grid-cols-2 bg-[#020817] text-white">

            <section className="hidden lg:flex items-center justify-center bg-[#2563EB] relative overflow-hidden">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_35%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 w-full max-w-xl px-14"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl font-bold">
                        LMS
                    </div>

                    <h1 className="mt-12 text-[64px] leading-[1] font-bold tracking-[-2px]">
                        Smart Loan
                        <br />
                        Management
                    </h1>

                    <p className="mt-8 text-lg leading-8 text-blue-100 max-w-md">
                        Secure and scalable lending workflow platform
                        for borrowers and operations teams.
                    </p>
                </motion.div>

                <div className="absolute bottom-10 left-14 text-sm text-blue-100">
                    © 2026 Loan Management System
                </div>
            </section>

            <section className="relative flex items-center justify-center overflow-hidden bg-[#020617] px-6 lg:px-16">
                <div className="absolute w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                        relative z-10
                        w-[90%] max-w-[620px]
                        rounded-3xl
                        bg-[#081225]/80
                        px-12 py-12
                        sm:px-12 sm:py-14
                        backdrop-blur-2xl
                        shadow-[0_0_60px_rgba(37,99,235,0.12)]
                        border border-white/10
                    "
                >
                    <div className="space-y-3">
                        <h2 className="text-[48px] text-center sm:text-[56px] leading-[1.05] font-bold tracking-[-2px]">
                            {title}
                        </h2>

                        <p className="text-gray-400 text-base text-center">
                            {subtitle}
                        </p>
                    </div>

                    <div className="mt-10">
                        {children}
                    </div>
                </motion.div>
            </section>
        </main>
    );
}