
"use client";

import Link from "next/link";
import { useState } from "react";

import {
    Aperture,
    Mail,
    LockKeyhole,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import GoogleAuth from "@/components/auth/GoogleAuth";


const LoginPage = () => {

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setLoading(true);

        const formData = new FormData(e.target);
        const form = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await authClient.signIn.email({
                ...form,
                callbackURL: "/",
            });

            if (error) {
                const message =
                    error.message || "Invalid email or password!";

                setErrorMessage(message);
                toast.error(message);

                return;
            }

            if (data) {
                toast.success("Login successful!");

                // Better Auth callbackURL অনুযায়ী Home Page-এ redirect করবে
            }

        } catch (error) {
            console.error("Login Error:", error);

            const message =
                error.message || "Something went wrong. Please try again!";

            setErrorMessage(message);
            toast.error(message);

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f7f9f7] px-4 py-10 dark:bg-[#101a14]">

            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/60 dark:bg-[#17231d] dark:shadow-black/20 md:grid-cols-2">

                {/* Left Side - Branding */}
                <div className="relative hidden flex-col justify-between overflow-hidden bg-[#235b45] p-10 text-white md:flex">

                    <div className="relative z-10">
                        <Link href="/" className="inline-flex items-center gap-2">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                                <Aperture size={27} />
                            </div>

                            <span className="text-2xl font-black">
                                Studio<span className="text-[#C2F800]">Space</span>
                            </span>

                        </Link>
                    </div>

                    <div className="relative z-10">

                        <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider text-[#C2F800]">
                            YOUR CREATIVE SPACE
                        </span>

                        <h1 className="max-w-sm text-4xl font-bold leading-tight">
                            Bring your creative ideas to life.
                        </h1>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
                            Discover inspiring studios, connect with creative
                            spaces, and make something extraordinary.
                        </p>

                        <div className="mt-8 space-y-4">

                            {[
                                "Discover unique creative studios",
                                "Book your perfect workspace",
                                "Manage all your bookings easily",
                            ].map((item) => (

                                <div
                                    key={item}
                                    className="flex items-center gap-3 text-sm text-white/90"
                                >
                                    <CheckCircle2
                                        size={18}
                                        className="text-[#C2F800]"
                                    />

                                    {item}
                                </div>

                            ))}

                        </div>

                    </div>

                    <p className="relative z-10 text-xs text-white/50">
                        © 2026 StudioSpace. All rights reserved.
                    </p>

                    {/* Decorative Circles */}
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-white/5" />

                    <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border-[50px] border-white/5" />

                </div>


                {/* Right Side - Login Form */}
                <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-14">

                    {/* Mobile Logo */}
                    <Link
                        href="/"
                        className="mb-10 flex items-center justify-center gap-2 md:hidden"
                    >

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#235b45] text-white dark:bg-[#34765b] dark:text-[#C2F800]">
                            <Aperture size={24} />
                        </div>

                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                            Studio<span className="text-[#235b45] dark:text-[#C2F800]">Space</span>
                        </span>

                    </Link>


                    {/* Login Title */}
                    <div className="mb-8">

                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Login to your account
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Welcome back! Please enter your details.
                        </p>

                    </div>


                    {/* Google Login Button */}
                    <GoogleAuth />


                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">

                        <div className="h-px flex-1 bg-gray-200 dark:bg-[#293b30]" />

                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                            OR CONTINUE WITH EMAIL
                        </span>

                        <div className="h-px flex-1 bg-gray-200 dark:bg-[#293b30]" />

                    </div>


                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10 dark:border-[#35483b] dark:bg-[#202f27] dark:focus-within:border-[#C2F800]">

                                <Mail
                                    size={19}
                                    className="text-gray-400 dark:text-gray-500"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Password
                                </label>

                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold text-[#235b45] hover:underline dark:text-[#C2F800]"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10 dark:border-[#35483b] dark:bg-[#202f27] dark:focus-within:border-[#C2F800]">

                                <LockKeyhole
                                    size={19}
                                    className="text-gray-400 dark:text-gray-500"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                                />

                            </div>

                        </div>


                        {/* Error Message */}
                        {errorMessage && (

                            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-500/30 dark:bg-rose-500/10">

                                <AlertCircle
                                    size={18}
                                    className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400"
                                />

                                <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
                                    {errorMessage}
                                </p>

                            </div>

                        )}


                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#235b45] py-3.5 text-sm font-bold text-white transition hover:bg-[#194532] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#34765b] dark:hover:bg-[#235b45]"
                        >

                            {loading ? "Logging in..." : "Login"}

                            {!loading && <ArrowRight size={18} />}

                        </button>

                    </form>


                    {/* Register Link */}
                    <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">

                        Don't have an account?{" "}

                        <Link
                            href="/register"
                            className="font-bold text-[#235b45] hover:underline dark:text-[#C2F800]"
                        >
                            Create an account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default LoginPage;
