"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/input";
import AuthLayout from "@/components/layout/auth-layout";
import { loginUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import { getBorrowerProfile } from "@/services/borrower.service";

export default function LoginPage() {
    const router = useRouter();
    const { setUser } =useAuthStore();
    const [formData, setFormData] =useState({email: "",password: "",});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit =async (e: React.FormEvent ) => {
            e.preventDefault();

            try {
                setLoading(true);

                const response =await loginUser( formData);
                console.log("res: ",response);
                console.log(response.data);
                console.log(response.data.user)
                setUser(response.data.user);

                toast.success("Login successful");

                const role =response.data.user.role;

                if(role ==="BORROWER"){
                    try {
                        await getBorrowerProfile();
                        router.push("/borrower");
                    } catch {
                        router.push("/borrower/onboarding");
                    }

                }else {
                    router.push("/dashboard");
                }
            } catch (error: any) {
                console.log("error: ",error);
                toast.error(error.response?.data ?.message || "Login failed");
            } finally {
                setLoading(false);
            }
        };

    return (
        <AuthLayout title="Welcome Back" subtitle="Login to continue">
            <form onSubmit={ handleSubmit } className="flex flex-col gap-6 mt-2">
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                />

                <button
                    disabled={loading}
                    className="mt-2 h-14 rounded-2xl bg-blue-600 text-sm font-semibold transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/20 disabled:opacity-70"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-sm text-gray-400">
                    Don&apos;t have an account?{" "}
                    
                    <Link
                        href="/signup"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Create account
                    </Link>
                </p>

            </form>
        </AuthLayout>
    );
}