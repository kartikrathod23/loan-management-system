"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/auth/protected-route";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { applyLoan } from "@/services/loan.service";

export default function ApplyLoanPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        principalAmount: 50000,
        tenureDays: 30,
        interestRate: 12,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: Number(e.target.value),
        });
    };

    const calculations = useMemo(() => {

        const interest =(formData.principalAmount *formData.interestRate *formData.tenureDays) /(365 * 100);
        const repayment =formData.principalAmount + interest;
        const emi =repayment / (formData.tenureDays / 30);

        return {
            interest,
            repayment,
            emi,
        };

    }, [formData]);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {
            setLoading(true);
            await applyLoan(formData);
            toast.success("Loan application submitted");

            setFormData({
                principalAmount: 50000,
                tenureDays: 30,
                interestRate: 12,
            });

        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Loan application failed"
            );

        } finally {
            setLoading(false);
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
                                Apply For Loan
                            </h1>

                            <p className="mt-3 text-gray-400">
                                Submit your loan request with transparent repayment calculations.
                            </p>
                        </div>

                        <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
                            <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-8">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-7"
                                >
                                    <div>
                                        <label className="mb-3 block text-sm text-gray-300">
                                            Principal Amount
                                        </label>

                                        <input
                                            type="number"
                                            name="principalAmount"
                                            value={formData.principalAmount}
                                            onChange={handleChange}
                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] px-5 text-white outline-none transition-all focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-3 flex items-center justify-between">
                                            <label className="text-sm text-gray-300">
                                                Tenure
                                            </label>
                                            <span className="text-sm text-blue-400">
                                                {formData.tenureDays} Days
                                            </span>

                                        </div>

                                        <input
                                            type="range"
                                            min={30}
                                            max={365}
                                            step={30}
                                            name="tenureDays"
                                            value={formData.tenureDays}
                                            onChange={handleChange}
                                            className="w-full accent-blue-600"
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-3 flex items-center justify-between">
                                            <label className="text-sm text-gray-300">
                                                Interest Rate
                                            </label>
                                            <span className="text-sm text-blue-400">
                                                {formData.interestRate}%
                                            </span>

                                        </div>

                                        <input
                                            type="range"
                                            min={1}
                                            max={30}
                                            name="interestRate"
                                            value={formData.interestRate}
                                            onChange={handleChange}
                                            className="w-full accent-blue-600"
                                        />
                                    </div>

                                    <button
                                        disabled={loading}
                                        className="h-14 w-full rounded-2xl bg-blue-600 text-sm font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-70"
                                    >
                                        {loading
                                            ? "Submitting..."
                                            : "Submit Loan Application"}
                                    </button>

                                </form>

                            </div>

                            <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-8">
                                <h2 className="text-2xl font-bold text-white">
                                    Loan Summary
                                </h2>
                                <div className="mt-8 space-y-6">
                                    <div className="rounded-2xl bg-[#0B1120] p-5">
                                        <p className="text-sm text-gray-400">
                                            Total Interest
                                        </p>
                                        <h3 className="mt-2 text-3xl font-bold text-white">
                                            ₹{calculations.interest.toFixed(2)}
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl bg-[#0B1120] p-5">
                                        <p className="text-sm text-gray-400">
                                            Total Repayment
                                        </p>

                                        <h3 className="mt-2 text-3xl font-bold text-white">
                                            ₹{calculations.repayment.toFixed(2)}
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl bg-[#0B1120] p-5">
                                        <p className="text-sm text-gray-400">
                                            Estimated EMI
                                        </p>

                                        <h3 className="mt-2 text-3xl font-bold text-white">
                                            ₹{calculations.emi.toFixed(2)}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </ProtectedRoute>
    );
}