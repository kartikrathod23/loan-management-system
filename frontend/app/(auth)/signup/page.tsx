"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/ui/input";
import AuthLayout from "@/components/layout/auth-layout";
import { signupUser } from "@/services/auth.service";

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setLoading(true);

            await signupUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Account created successfully");

            router.push("/login");

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Signup failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Start your lending journey"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button
                    disabled={loading}
                    className="mt-2 h-12 rounded-xl bg-blue-600 text-sm font-semibold transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.45)]"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Login
                    </Link>
                </p>

            </form>
        </AuthLayout>
    );
}