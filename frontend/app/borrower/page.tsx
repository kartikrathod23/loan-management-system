"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProtectedRoute from "@/components/auth/protected-route";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";

import { getBorrowerDashboard } from "@/services/borrower.service";

interface Loan {
    _id: string;
    principalAmount: number;
    totalRepayment: number;
    remainingAmount: number;
    monthlyEMI: number;
    status: string;
    createdAt: string;
}

export default function BorrowerPage() {
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState<any>(null);
    const loadDashboard = async () => {

        try {
            const response = await getBorrowerDashboard();
            setDashboard(response.data);

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Failed to load dashboard"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#020817] text-white">
                Loading...
            </div>
        );
    }

    return (
        <ProtectedRoute allowedRoles={["BORROWER"]}>
            <main className="flex min-h-screen bg-[#020817]">
                <Sidebar />
                <section className="flex-1">
                    <Topbar />
                    <div className="mx-auto max-w-7xl p-8">
                        <div className="mb-10">
                            <h1 className="text-4xl font-bold text-white">
                                Borrower Dashboard
                            </h1>

                            <p className="mt-3 text-gray-400">
                                Track loans and repayments.
                            </p>
                        </div>

                        <div className="mb-10 grid gap-6 md:grid-cols-4">

                            <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-6">
                                <p className="text-sm text-gray-400">
                                    Total Loans
                                </p>

                                <h2 className="mt-3 text-4xl font-bold text-white">
                                    {dashboard?.summary?.totalLoans || 0}
                                </h2>
                            </div>

                            <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-6">
                                <p className="text-sm text-gray-400">
                                    Active Loans
                                </p>

                                <h2 className="mt-3 text-4xl font-bold text-green-400">
                                    {dashboard?.summary?.activeLoans || 0}
                                </h2>
                            </div>

                            <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-6">
                                <p className="text-sm text-gray-400">
                                    Rejected Loans
                                </p>

                                <h2 className="mt-3 text-4xl font-bold text-red-400">
                                    {dashboard?.summary?.rejectedLoans || 0}
                                </h2>
                            </div>

                            <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-6">
                                <p className="text-sm text-gray-400">
                                    Total Borrowed
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-blue-400">
                                    ₹{dashboard?.summary?.totalBorrowedAmount?.toLocaleString() || 0}
                                </h2>
                            </div>

                        </div>

                        <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-8">
                            <h2 className="text-2xl font-bold text-white">
                                Profile Information
                            </h2>

                            <div className="mt-6 grid gap-6 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-gray-400">
                                        Full Name
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold text-white">
                                        {dashboard?.borrower?.fullName}
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">
                                        PAN Number
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold text-white">
                                        {dashboard?.borrower?.panNumber}
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">
                                        Monthly Salary
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold text-white">
                                        ₹{dashboard?.borrower?.monthlySalary?.toLocaleString()}
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">
                                        Employment Type
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold text-white">
                                        {dashboard?.borrower?.employmentType}
                                    </h3>
                                </div>

                            </div>
                        </div>

                        <div className="mt-10 rounded-3xl border border-white/5 bg-[#0F172A] p-8">
                            <h2 className="text-2xl font-bold text-white">
                                Loan Applications
                            </h2>

                            <div className="mt-8 space-y-6">
                                {dashboard?.loans?.map((loan: Loan) => (
                                    <div
                                        key={loan._id}
                                        className="rounded-2xl border border-white/5 bg-[#111827] p-6"
                                    >
                                        <div className="grid gap-6 md:grid-cols-5">
                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    Principal
                                                </p>

                                                <h3 className="mt-2 text-2xl font-bold text-white">
                                                    ₹{loan.principalAmount.toLocaleString()}
                                                </h3>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    Total Repayment
                                                </p>

                                                <h3 className="mt-2 text-xl font-semibold text-white">
                                                    ₹{loan.totalRepayment.toLocaleString()}
                                                </h3>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    Remaining
                                                </p>

                                                <h3 className="mt-2 text-xl font-semibold text-white">
                                                    ₹{loan.remainingAmount.toLocaleString()}
                                                </h3>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    Monthly EMI
                                                </p>

                                                <h3 className="mt-2 text-xl font-semibold text-white">
                                                    ₹{loan.monthlyEMI.toFixed(0)}
                                                </h3>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    Status
                                                </p>

                                                <div className="mt-2 inline-flex rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
                                                    {loan.status}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </ProtectedRoute>
    );
}