
import Link from "next/link";
import { Home, Search, Aperture } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8faf9] px-4 dark:bg-[#101a14]">

            <div className="w-full max-w-md text-center">

                {/* Logo */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#235b45] text-white dark:bg-[#34765b] dark:text-[#C2F800]">
                    <Aperture size={32} />
                </div>

                {/* Error Code */}
                <h1 className="text-7xl font-extrabold text-[#235b45] dark:text-[#C2F800]">
                    404
                </h1>

                {/* Heading */}
                <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
                    Page Not Found!
                </h2>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Sorry, the page you are looking for does not exist
                    or may have been moved.
                </p>

                {/* Action Buttons */}
                <div className="mt-7 flex flex-wrap justify-center gap-3">

                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg bg-[#235b45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#194633] dark:bg-[#34765b] dark:hover:bg-[#235b45]"
                    >
                        <Home size={17} />
                        Back to Home
                    </Link>

                    <Link
                        href="/studios"
                        className="flex items-center gap-2 rounded-lg border border-[#235b45] px-5 py-3 text-sm font-semibold text-[#235b45] transition hover:bg-[#235b45] hover:text-white dark:border-[#C2F800] dark:text-[#C2F800] dark:hover:bg-[#C2F800] dark:hover:text-[#101a14]"
                    >
                        <Search size={17} />
                        Explore Studios
                    </Link>

                </div>

                {/* Copyright */}
                <p className="mt-10 text-xs text-gray-400 dark:text-gray-500">
                    © {new Date().getFullYear()} StudioSpace. All rights reserved.
                </p>

            </div>

        </div>
    );
}
