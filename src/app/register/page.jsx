
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Aperture,
    User,
    Mail,
    Image,
    LockKeyhole,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import GoogleAuth from "@/components/auth/GoogleAuth";

const RegisterPage = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setPasswordError("");

        const formData = new FormData(e.target);
        const form = Object.fromEntries(formData.entries());

        // Password Validation
        const password = form.password;

        if (password.length < 6) {
            setPasswordError(
                "Password must be at least 6 characters long."
            );
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setPasswordError(
                "Password must contain at least one uppercase letter."
            );
            return;
        }

        if (!/[a-z]/.test(password)) {
            setPasswordError(
                "Password must contain at least one lowercase letter."
            );
            return;
        }

        try {
            setLoading(true);

            // Empty image হলে পাঠানো হবে না
            if (!form.image) {
                delete form.image;
            }

            const { data, error } = await authClient.signUp.email({
                ...form,
                callbackURL: "/login",
            });

            if (error) {
                const message =
                    error.message || "Registration failed. Please try again.";

                setErrorMessage(message);
                toast.error(message);
                return;
            }

            if (data) {
                toast.success("Registration successful! Please login.");

                router.push("/login");
            }
        } catch (error) {
            const message =
                error.message || "Something went wrong. Please try again.";

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

                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                            Studio<span className="text-[#235b45] dark:text-[#C2F800]">Space</span>
                        </span>
                    </Link>

                    {/* Registration Title */}
                    <div className="mb-7">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Create an account
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Join StudioSpace and start your creative journey.
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10 dark:border-gray-700 dark:bg-[#202f27]">
                                <User size={19} className="text-gray-400" />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10 dark:border-gray-700 dark:bg-[#202f27]">
                                <Mail size={19} className="text-gray-400" />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Photo URL
                                <span className="ml-1 font-normal text-gray-400">
                                    (Optional)
                                </span>
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10 dark:border-gray-700 dark:bg-[#202f27]">
                                <Image size={19} className="text-gray-400" />

                                <input
                                    type="url"
                                    name="image"
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Password
                            </label>

                            <div className={`flex items-center gap-3 rounded-xl border px-4 transition focus-within:border-[#235b45] focus-within:ring-2 focus-within:ring-[#235b45]/10 dark:bg-[#202f27] ${passwordError
                                    ? "border-red-500"
                                    : "border-gray-200 dark:border-gray-700"
                                }`}>
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
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white"
                                    onChange={() => {
                                        setPasswordError("");
                                        setErrorMessage("");
                                    }}
                                />
                            </div>

                            <p className="mt-1.5 text-xs text-gray-400">
                                Password must contain:
                                <br />
                                • At least 6 characters
                                <br />
                                • One uppercase letter (A-Z)
                                <br />
                                • One lowercase letter (a-z)
                            </p>

                            {passwordError && (
                                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                                    <AlertCircle size={15} />
                                    {passwordError}
                                </p>
                            )}
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#235b45] py-3.5 text-sm font-bold text-white transition hover:bg-[#194532] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

                        <span className="text-xs font-medium text-gray-400">
                            OR CONTINUE WITH GOOGLE
                        </span>

                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                    </div>

                    {/* Google Login Button */}
                    <GoogleAuth />

                    {/* Login Link */}
                    <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-[#235b45] hover:underline dark:text-[#C2F800]"
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
