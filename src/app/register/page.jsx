"use client";

import Link from "next/link";
import { useState } from "react";

import {
    Aperture,
    User,
    Mail,
    Image,
    LockKeyhole,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {


    // Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fromData = new FormData(e.target)
        const form = Object.fromEntries(fromData.entries())
        console.log(form);


        const { data, error } = await authClient.signUp.email({
            ...form
        })
        if (data) {
            console.log(data);
            toast.success("Registration form submitted successfully!");
        }
        if (error) {
            console.log(error);

        }
        // toast.success("Registration form submitted successfully!");
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
                            JOIN OUR CREATIVE COMMUNITY
                        </span>

                        <h1 className="max-w-sm text-4xl font-bold leading-tight">
                            Find your space. Create your story.
                        </h1>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
                            Join StudioSpace and discover amazing creative
                            workspaces to bring your next big idea to life.
                        </p>

                        <div className="mt-8 space-y-4">
                            {[
                                "Explore unique creative studios",
                                "Connect with studio owners",
                                "Book your perfect workspace",
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

                {/* Right Side - Registration Form */}
                <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-14">

                    {/* Mobile Logo */}
                    <Link
                        href="/"
                        className="mb-8 flex items-center justify-center gap-2 md:hidden"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#235b45] text-white">
                            <Aperture size={24} />
                        </div>

                        <span className="text-2xl font-black text-gray-900">
                            Studio<span className="text-[#235b45]">Space</span>
                        </span>
                    </Link>

                    {/* Registration Title */}
                    <div className="mb-7">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Create an account
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Join StudioSpace and start your creative journey.
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10">
                                <User size={19} className="text-gray-400" />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10">
                                <Mail size={19} className="text-gray-400" />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Photo URL
                                <span className="ml-1 font-normal text-gray-400">
                                    (Optional)
                                </span>
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10">
                                <Image size={19} className="text-gray-400" />

                                <input
                                    type="url"
                                    name="image"
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Password
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10">
                                <LockKeyhole
                                    size={19}
                                    className="text-gray-400"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    required
                                    minLength={6}
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                />
                            </div>

                            <p className="mt-1.5 text-xs text-gray-400">
                                Password must be at least 6 characters.
                            </p>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#235b45] py-3.5 text-sm font-bold text-white transition hover:bg-[#194532]"
                        >
                            Create Account
                            <ArrowRight size={18} />
                        </button>

                    </form>

                    {/* Login Link */}
                    <p className="mt-7 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-[#235b45] hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
