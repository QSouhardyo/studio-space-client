
import Link from "next/link";
import { Home, Search, Aperture } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8faf9] px-4">
            <div className="w-full max-w-md text-center">

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#235b45] text-white">
                    <Aperture size={32} />
                </div>

                <h1 className="text-7xl font-extrabold text-[#235b45]">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-bold text-gray-800">
                    Page Not Found!
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                    Sorry, the page you are looking for does nott exist
                    or may have been moved.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg bg-[#235b45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#194633]"
                    >
                        <Home size={17} />
                        Back to Home
                    </Link>

                    <Link
                        href="/studios"
                        className="flex items-center gap-2 rounded-lg border border-[#235b45] px-5 py-3 text-sm font-semibold text-[#235b45] transition hover:bg-[#235b45] hover:text-white"
                    >
                        <Search size={17} />
                        Explore Studios
                    </Link>
                </div>

                <p className="mt-10 text-xs text-gray-400">
                    © {new Date().getFullYear()} StudioSpace. All rights reserved.
                </p>

            </div>
        </div>
    );
}
