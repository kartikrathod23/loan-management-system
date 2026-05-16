"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/auth/protected-route";
import Input from "@/components/ui/input";
import { createBorrowerProfile } from "@/services/borrower.service";

export default function BorrowerOnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        panNumber: "",
        dateOfBirth: "",
        monthlySalary: "",
        employmentType: "SALARIED",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response =
                await createBorrowerProfile({
                    ...formData,
                    monthlySalary: Number(
                        formData.monthlySalary
                    ),
                });

            console.log("onboarding: ",response);

            toast.success(
                response.message
            );

            router.push("/borrower");

        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Onboarding failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute allowedRoles={["BORROWER"]}>
            <main className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-3xl rounded-3xl bg-[#0F172A] p-10 shadow-2xl">
                    <div>
                        <h1 className="text-4xl font-bold">
                            Complete Your Profile
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Provide your details to continue loan application.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
                    >
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-300">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="h-14 rounded-2xl border border-white/10 bg-[#0B1120] px-5 text-sm text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-300">
                                PAN Number
                            </label>

                            <input
                                type="text"
                                name="panNumber"
                                value={formData.panNumber}
                                onChange={handleChange}
                                className="h-14 rounded-2xl border border-white/10 bg-[#0B1120] px-5 text-sm uppercase text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-300">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="h-14 rounded-2xl border border-white/10 bg-[#0B1120] px-5 text-sm text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-300">
                                Monthly Salary
                            </label>

                            <input
                                type="number"
                                name="monthlySalary"
                                value={formData.monthlySalary}
                                onChange={handleChange}
                                className="h-14 rounded-2xl border border-white/10 bg-[#0B1120] px-5 text-sm text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-300">
                                Employment Type
                            </label>

                            <select
                                name="employmentType"
                                value={formData.employmentType}
                                onChange={handleChange}
                                className="h-14 rounded-2xl border border-white/10 bg-[#0B1120] px-5 text-sm text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            >
                                <option value="SALARIED">
                                    Salaried
                                </option>

                                <option value="SELF_EMPLOYED">
                                    Self Employed
                                </option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <button
                                disabled={loading}
                                className="w-full h-14 rounded-2xl bg-blue-600 font-semibold transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/20"
                            >
                                {loading
                                    ? "Submitting..."
                                    : "Complete Onboarding"}
                            </button>
                        </div>
                    </form>

                </div>

            </main>

        </ProtectedRoute>
    );
}