
"use client";

import Link from "next/link";
import { useState } from "react";

import {
    Aperture,
    Mail,
    LockKeyhole,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import GoogleAuth from "@/components/auth/GoogleAuth";


const LoginPage = () => {


    // Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const fromData = new FormData(e.target)
        const form = Object.fromEntries(fromData.entries())
        console.log(form);

        const { data, error } = authClient.signIn.email({
            ...form,
            callbackURL: "/"
        })
        if (data) {
            toast.success("Login form submitted successfully!");
            console.log(data);


        }
        if (error) {
            console.log(error);

        }


    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f7f9f7] px-4 py-10">

            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/60 md:grid-cols-2">

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
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#235b45] text-white">
                            <Aperture size={24} />
                        </div>

                        <span className="text-2xl font-black text-gray-900">
                            Studio<span className="text-[#235b45]">Space</span>
                        </span>
                    </Link>

                    {/* Login Title */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Login to your account
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    {/* Google Login Button */}
                    <GoogleAuth></GoogleAuth>

                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs font-medium text-gray-400">
                            OR CONTINUE WITH EMAIL
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10">
                                <Mail
                                    size={19}
                                    className="text-gray-400"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-sm font-semibold text-gray-700">
                                    Password
                                </label>

                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold text-[#235b45] hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10">
                                <LockKeyhole
                                    size={19}
                                    className="text-gray-400"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#235b45] py-3.5 text-sm font-bold text-white transition hover:bg-[#194532]"
                        >
                            Login
                            <ArrowRight size={18} />
                        </button>

                    </form>

                    {/* Register Link */}
                    <p className="mt-8 text-center text-sm text-gray-500">
                        Dont have an account?{" "}
                        <Link
                            href="/register"
                            className="font-bold text-[#235b45] hover:underline"
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
