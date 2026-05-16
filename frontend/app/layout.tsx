import "./globals.css";
import type { Metadata } from "next";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title:"Loan Management System",
    description:"LMS Dashboard",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body>
                <QueryProvider>
                    <Toaster
                        position="top-right"
                    />
                    {children}
                </QueryProvider>
            </body>
        </html>
    );
}