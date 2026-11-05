import {
    Aperture,
    Sparkles,
} from "lucide-react";

export default function Loading() {
    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-[#f8faf9] px-4 dark:bg-[#101a14]">

            <div className="w-full max-w-sm text-center">

                {/* Logo */}
                <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center">

                    <div className="absolute inset-0 animate-ping rounded-3xl border-2 border-green-100 opacity-50 dark:border-[#34765b]" />

                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#235b45] text-white shadow-xl shadow-green-900/20 dark:bg-[#34765b] dark:text-[#C2F800]">
                        <Aperture size={36} strokeWidth={1.8} />
                    </div>

                    <Sparkles
                        size={19}
                        className="absolute -right-2 -top-2 text-[#235b45] dark:text-[#C2F800]"
                    />
                </div>

                {/* Brand Name */}
                <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                    Studio<span className="text-[#235b45] dark:text-[#C2F800]">Space</span>
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Your creative space is just a moment away.
                </p>

                {/* Loading Spinner */}
                <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-green-100 bg-white px-5 py-3 shadow-sm dark:border-[#293b30] dark:bg-[#17231d]">

                    <div className="h-5 w-5 animate-spin rounded-full border-[3px] border-green-100 border-t-[#235b45] dark:border-[#34765b] dark:border-t-[#C2F800]" />

                    <span className="text-xs font-bold text-[#235b45] dark:text-[#C2F800]">
                        Loading your experience...
                    </span>
                </div>

                {/* Loading Dots */}
                <div className="mt-7 flex items-center justify-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#235b45] dark:bg-[#C2F800]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#235b45] dark:bg-[#C2F800] [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#235b45] dark:bg-[#C2F800] [animation-delay:300ms]" />
                </div>

                <p className="mt-8 text-[10px] font-semibold uppercase tracking-[2px] text-gray-400 dark:text-gray-500">
                    Create Without Limits
                </p>

            </div>
        </main>
    );
}
