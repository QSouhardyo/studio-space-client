
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

const GoogleAuth = () => {
    const [loading, setLoading] = useState(false);

    const handleGoogleAuth = async () => {
        try {
            setLoading(true);

            const { data, error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                toast.error(
                    error.message || "Google authentication failed!"
                );
                setLoading(false);
                return;
            }

            // Better Auth Google OAuth redirect handle করবে।
        } catch (error) {
            toast.error(
                error.message || "Something went wrong. Please try again."
            );

            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleGoogleAuth}
            type="button"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-[#202f27] dark:text-gray-200 dark:hover:bg-[#293b30]"
        >
            {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#235b45] dark:border-gray-600 dark:border-t-[#C2F800]" />
            ) : (
                <svg viewBox="0 0 48 48" className="h-5 w-5">
                    <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />

                    <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.73 6c4.51-4.18 7.04-10.33 7.04-17.65z"
                    />

                    <path
                        fill="#FBBC05"
                        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.93 23.93 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"
                    />

                    <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                </svg>
            )}

            {loading ? "Connecting to Google..." : "Continue with Google"}
        </button>
    );
};

export default GoogleAuth;
