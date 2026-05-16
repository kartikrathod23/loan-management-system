"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/auth/protected-route";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import StatsCard from "@/components/dashboard/stats-card";
import {
    getDashboardStats,
    getPendingLoans,
    sanctionLoan,
    getDisbursedLoans,
    getSanctionedLoans,
    collectRepayment,
    disburseLoan,
} from "@/services/dashboard.service";
import { useAuthStore } from "@/store/auth.store";

interface Loan {
    _id: string;
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
    totalRepayment?: number;
    remainingAmount?: number;

    borrowerId: {
        name: string;
        email: string;
    };
}

export default function DashboardPage() {

    const { user } = useAuthStore();
    const [stats, setStats] = useState<any>(null);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [sanctionedLoans, setSanctionedLoans] = useState<Loan[]>([]);
    const [disbursedLoans, setDisbursedLoans] = useState<Loan[]>([]);

    const [remarks, setRemarks] = useState<{ [key: string]: string; }>({});

    const loadData = async () => {
        try {
            const statsResponse = await getDashboardStats();
            setStats(statsResponse.data);
            if (user?.role === "SANCTION") {
                const response = await getPendingLoans();
                setLoans(response.data);
            }

            if (user?.role === "DISBURSEMENT") {
                const response = await getSanctionedLoans();
                setSanctionedLoans(response.data);
            }

            if (user?.role === "COLLECTION") {
                const response = await getDisbursedLoans();
                setDisbursedLoans(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user?.role) {
            loadData();
        }

    }, [user?.role]);

    const handleDecision = async (
        loanId: string,
        decision: string
    ) => {

        try {
            await sanctionLoan(
                loanId,
                {
                    decision,
                    remarks: remarks[loanId] || "Reviewed",
                }
            );

            toast.success(
                `Loan ${decision.toLowerCase()}`
            );
            loadData();

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Action failed"
            );
        }
    };

    const handleDisburse = async (
        loanId: string
    ) => {

        try {
            await disburseLoan(
                loanId,
                {
                    transactionReference: `TXN-${Date.now()}`,
                }
            );

            toast.success(
                "Loan disbursed successfully"
            );

            loadData();

        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Disbursement failed"
            );
        }
    };

    const handleCollection = async (
        loanId: string
    ) => {

        try {
            await collectRepayment(
                loanId,
                {
                    amount: 1000,
                    transactionReference: `PAY-${Date.now()}`,
                }
            );

            setDisbursedLoans((prev) =>
                prev.map((loan) =>
                    loan._id === loanId
                        ? {
                            ...loan,
                            remainingAmount:
                                (loan.remainingAmount || 0) - 1000,
                        }
                        : loan
                )
            );

            toast.success("Repayment collected");

            loadData();

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Collection failed"
            );
        }
    };

    return (
        <ProtectedRoute
            allowedRoles={[
                "ADMIN",
                "SALES",
                "SANCTION",
                "DISBURSEMENT",
                "COLLECTION",
            ]}
        >

            <main className="flex min-h-screen bg-[#020817]">
                <Sidebar />
                <section className="flex-1">
                    <Topbar />
                    <div className="mx-auto max-w-7xl p-8">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-white">
                                Operations Dashboard
                            </h1>

                            <p className="mt-3 text-gray-400">
                                Monitor approvals, collections and loan operations.
                            </p>

                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            <StatsCard
                                title="Total Applications"
                                value={String(stats?.totalLoans || 0)}
                                subtitle="Loan applications received"
                            />

                            <StatsCard
                                title="Pending Loans"
                                value={String(stats?.pendingLoans || 0)}
                                subtitle="Awaiting approval workflow"
                            />

                            <StatsCard
                                title="Disbursed Loans"
                                value={String(stats?.disbursedLoans || 0)}
                                subtitle="Successfully released"
                            />

                            <StatsCard
                                title="Closed Loans"
                                value={String(stats?.closedLoans || 0)}
                                subtitle="Loans fully repaid"
                            />

                        </div>

                        {/* sanctiion*/}

                        {user?.role === "SANCTION" && (
                            <div className="mt-10 rounded-3xl border border-white/5 bg-[#0F172A] p-8">
                                <h2 className="text-3xl font-bold text-white">
                                    Pending Loan Applications
                                </h2>

                                <div className="mt-8 space-y-6">
                                    {loans.map((loan) => (
                                        <div
                                            key={loan._id}
                                            className="rounded-2xl border border-white/5 bg-[#111827] p-6"
                                        >

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-3xl font-bold text-white">
                                                        ₹{loan.principalAmount.toLocaleString()}
                                                    </h3>

                                                    <p className="mt-2 text-gray-300">
                                                        {loan.borrowerId.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        {loan.borrowerId.email}
                                                    </p>

                                                </div>

                                                <div className="flex gap-10">
                                                    <div>
                                                        <p className="text-sm text-gray-400">
                                                            Interest Rate
                                                        </p>

                                                        <h4 className="mt-2 text-2xl font-bold text-white">
                                                            {loan.interestRate}%
                                                        </h4>

                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-400">
                                                            Tenure
                                                        </p>

                                                        <h4 className="mt-2 text-2xl font-bold text-white">
                                                            {loan.tenureDays} Days
                                                        </h4>

                                                    </div>
                                                </div>
                                            </div>

                                            <textarea
                                                placeholder="Add remarks..."
                                                value={remarks[loan._id] || ""}
                                                onChange={(e) =>
                                                    setRemarks({
                                                        ...remarks,
                                                        [loan._id]: e.target.value,
                                                    })
                                                }
                                                className="mt-6 min-h-[120px] w-full rounded-2xl border border-white/10 bg-[#020817] p-5 text-white outline-none"
                                            />

                                            <div className="mt-6 flex gap-4">
                                                <button
                                                    onClick={() =>
                                                        handleDecision(
                                                            loan._id,
                                                            "SANCTIONED"
                                                        )
                                                    }
                                                    className="h-12 rounded-2xl bg-green-600 px-6 text-sm font-semibold text-white hover:bg-green-500"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDecision(
                                                            loan._id,
                                                            "REJECTED"
                                                        )
                                                    }
                                                    className="h-12 rounded-2xl bg-red-600 px-6 text-sm font-semibold text-white hover:bg-red-500"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* disbursement */}

                        {user?.role === "DISBURSEMENT" && (
                            <div className="mt-10 rounded-3xl border border-white/5 bg-[#0F172A] p-8">
                                <h2 className="text-3xl font-bold text-white">
                                    Sanctioned Loans
                                </h2>

                                <div className="mt-8 space-y-6">
                                    {sanctionedLoans.map((loan) => (
                                        <div
                                            key={loan._id}
                                            className="rounded-2xl border border-white/5 bg-[#111827] p-6"
                                        >

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-3xl font-bold text-white">
                                                        ₹{loan.principalAmount.toLocaleString()}
                                                    </h3>

                                                    <p className="mt-2 text-gray-300">
                                                        {loan.borrowerId.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        {loan.borrowerId.email}
                                                    </p>
                                                </div>

                                                <div className="flex gap-10">
                                                    <div>
                                                        <p className="text-sm text-gray-400">
                                                            Interest Rate
                                                        </p>

                                                        <h4 className="mt-2 text-2xl font-bold text-white">
                                                            {loan.interestRate}%
                                                        </h4>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-400">
                                                            Tenure
                                                        </p>

                                                        <h4 className="mt-2 text-2xl font-bold text-white">
                                                            {loan.tenureDays} Days
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDisburse(loan._id)}
                                                className="mt-6 h-12 rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-500"
                                            >
                                                Disburse Loan
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* collection */}

                        {user?.role === "COLLECTION" && (
                            <div className="mt-10 rounded-3xl border border-white/5 bg-[#0F172A] p-8">
                                <h2 className="text-3xl font-bold text-white">
                                    Active Repayments
                                </h2>

                                <div className="mt-8 space-y-6">
                                    {disbursedLoans.map((loan) => (
                                        <div
                                            key={loan._id}
                                            className="rounded-2xl border border-white/5 bg-[#111827] p-6"
                                        >

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-3xl font-bold text-white">
                                                        ₹{loan.remainingAmount?.toLocaleString()}
                                                    </h3>

                                                    <p className="mt-2 text-gray-300">
                                                        {loan.borrowerId.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        {loan.borrowerId.email}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-400">
                                                        Total Repayment
                                                    </p>

                                                    <h4 className="mt-2 text-2xl font-bold text-white">
                                                        ₹{loan.totalRepayment?.toLocaleString()}
                                                    </h4>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleCollection(loan._id)}
                                                className="mt-6 h-12 rounded-2xl bg-green-600 px-6 text-sm font-semibold text-white hover:bg-green-500"
                                            >
                                                Collect ₹1000
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </section>
            </main>
        </ProtectedRoute>
    );
}