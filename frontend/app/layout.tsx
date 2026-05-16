import "./globals.css";
import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/auth-provider";

export const metadata: Metadata = {
    title:"Loan Management System",
    description:"LMS Dashboard",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body>
                <QueryProvider>
                    <AuthProvider>
                        <Toaster position="top-right" />
                        {children}
                    </AuthProvider>
                </QueryProvider>
            </body>
        </html>
    );
}