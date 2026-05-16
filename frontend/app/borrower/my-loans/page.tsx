"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/protected-route";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";

import { getMyLoans } from "@/services/loan.service";

interface Loan {
    _id: string;
    principalAmount: number;
    totalRepayment: number;
    remainingAmount: number;
    totalPaidAmount: number;
    interestRate: number;
    tenureDays: number;
    status: string;
    createdAt: string;
}

export default function MyLoansPage() {
    const [loading, setLoading] = useState(true);
    const [loans, setLoans] = useState<Loan[]>([]);

    useEffect(() => {
        const loadLoans = async () => {
            try {
                const response =await getMyLoans();
                setLoans(response.data);

            } finally {
                setLoading(false);
            }
        };

        loadLoans();

    }, []);

    const getStatusStyle = (status: string) => {

        switch (status) {
            case "PENDING": return "bg-yellow-500/15 text-yellow-400";
            case "SANCTIONED":return "bg-blue-500/15 text-blue-400";
            case "DISBURSED":return "bg-green-500/15 text-green-400";
            case "CLOSED":return "bg-emerald-500/15 text-emerald-400";
            case "REJECTED":return "bg-red-500/15 text-red-400";
            default:return "bg-gray-500/15 text-gray-400";
        }
    };

    return (
        <ProtectedRoute allowedRoles={["BORROWER"]}>
            <main className="flex min-h-screen bg-[#020817]">
                <Sidebar />
                <section className="flex-1">
                    <Topbar />
                    <div className="mx-auto max-w-7xl p-8">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-white">
                                My Loans
                            </h1>

                            <p className="mt-3 text-gray-400">
                                Track your applications, repayments and loan lifecycle.
                            </p>

                        </div>

                        {loading ? (
                            <div className="rounded-3xl bg-[#0F172A] p-10 text-center text-gray-400">
                                Loading loans...
                            </div>

                        ) : loans.length === 0 ? (
                            <div className="rounded-3xl bg-[#0F172A] p-16 text-center">
                                <h2 className="text-2xl font-semibold text-white">
                                    No loans found
                                </h2>

                                <p className="mt-3 text-gray-400">
                                    You haven’t applied for any loans yet.
                                </p>

                            </div>

                        ) : (
                            <div className="grid gap-6">
                                {loans.map((loan) => {
                                    const repaymentProgress =
                                        ((loan.totalPaidAmount || 0) /
                                            loan.totalRepayment) * 100;

                                    return (
                                        <div
                                            key={loan._id}
                                            className="rounded-3xl border border-white/5 bg-[#0F172A] p-8"
                                        >

                                            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-4">
                                                        <h2 className="text-3xl font-bold text-white">
                                                            ₹{loan.principalAmount.toLocaleString()}
                                                        </h2>

                                                        <span
                                                            className={`
                                                                rounded-full px-4 py-2 text-xs font-semibold
                                                                ${getStatusStyle(loan.status)}
                                                            `}
                                                        >
                                                            {loan.status}
                                                        </span>

                                                    </div>

                                                    <p className="mt-3 text-gray-400">
                                                        Applied on{" "}
                                                        {new Date(
                                                            loan.createdAt
                                                        ).toLocaleDateString()}
                                                    </p>

                                                </div>

                                                <div className="grid gap-6 sm:grid-cols-3">
                                                    <div>
                                                        <p className="text-sm text-gray-400">
                                                            Interest Rate
                                                        </p>

                                                        <h3 className="mt-2 text-2xl font-bold text-white">
                                                            {loan.interestRate}%
                                                        </h3>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-400">
                                                            Tenure
                                                        </p>

                                                        <h3 className="mt-2 text-2xl font-bold text-white">
                                                            {loan.tenureDays} Days
                                                        </h3>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-400">
                                                            Remaining
                                                        </p>

                                                        <h3 className="mt-2 text-2xl font-bold text-white">
                                                            ₹{(loan.remainingAmount || 0).toFixed(2)}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="mb-3 flex items-center justify-between">
                                                    <p className="text-sm text-gray-400">
                                                        Repayment Progress
                                                    </p>

                                                    <p className="text-sm text-white">
                                                        {repaymentProgress.toFixed(0)}%
                                                    </p>

                                                </div>

                                                <div className="h-3 overflow-hidden rounded-full bg-[#111827]">
                                                    <div
                                                        style={{
                                                            width: `${repaymentProgress}%`,
                                                        }}
                                                        className="h-full rounded-full bg-blue-600"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </div>
                </section>
            </main>

        </ProtectedRoute>
    );
}