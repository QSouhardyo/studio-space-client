import Link from "next/link";
import StudioCard from "@/components/studio/StudioCard";

import {
    Search,
    SlidersHorizontal,
    Building2,
    X,
} from "lucide-react";

// Studio Categories
const categories = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Workshop",
    "other",
];

const ExploreStudiosPage = async ({ searchParams }) => {

    // URL থেকে Category সংগ্রহ
    const params = await searchParams;
    const selectedCategory = params?.category || "";

    let studios = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
            cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();

            studios = Array.isArray(data) ? data : data.data || [];
        }

    } catch (error) {
        console.error("Failed to fetch studios:", error);
    }

    // Selected Category অনুযায়ী Studio Filter
    if (selectedCategory) {
        studios = studios.filter(
            (studio) => studio.category === selectedCategory
        );
    }

    return (
        <main className="min-h-screen bg-[#F8F9F6]">

            {/* Page Header */}
            <section className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">

                    <div className="max-w-2xl">

                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#C2F800]/20 px-4 py-2 text-xs font-bold text-gray-800">
                            <Building2 size={15} />
                            EXPLORE WORKSPACES
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
                            Find Your Perfect{" "}
                            <span className="text-[#91B900]">
                                Creative Space.
                            </span>
                        </h1>

                        <p className="mt-4 text-sm leading-7 text-gray-500 md:text-base">
                            Discover inspiring studios and creative workspaces.
                            Find the perfect place to bring your next big idea to life.
                        </p>

                    </div>

                </div>
            </section>

            {/* Studios Section */}
            <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">

                {/* Section Heading */}
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900">
                            {selectedCategory === "other"
                                ? "Other"
                                : selectedCategory || "Explore Studios"}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Discover a space that matches your creativity.
                        </p>

                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">

                        <Building2 size={18} />

                        <span>
                            <strong className="text-gray-900">
                                {studios.length}
                            </strong>{" "}
                            Studios Available
                        </span>

                    </div>

                </div>

                {/* Search and Filter UI */}
                <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row">

                    {/* Search Input */}
                    <div className="relative flex-1">

                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search studios by name or location..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#C2F800] focus:bg-white focus:ring-2 focus:ring-[#C2F800]/20"
                        />

                    </div>

                    {/* Category Filter */}
                    <form action="/studios" method="GET">

                        <div className="flex items-center gap-2">

                            <SlidersHorizontal
                                size={17}
                                className="text-gray-500"
                            />

                            <select
                                name="category"
                                defaultValue={selectedCategory}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-[#C2F800] sm:w-52"
                            >

                                <option value="">
                                    All Categories
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category === "other" ? "Other" : category}
                                    </option>
                                ))}

                            </select>

                            <button
                                type="submit"
                                className="rounded-xl bg-[#C2F800] px-5 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#b3e600]"
                            >
                                Apply
                            </button>

                        </div>

                    </form>

                </div>

                {/* Selected Category */}
                {selectedCategory && (
                    <div className="mb-6 flex items-center gap-3">

                        <span className="rounded-full bg-[#C2F800]/20 px-4 py-2 text-sm font-semibold text-gray-800">
                            Category: {selectedCategory === "other" ? "Other" : selectedCategory}
                        </span>

                        <Link
                            href="/studios"
                            className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-700"
                        >
                            <X size={16} />
                            Clear Filter
                        </Link>

                    </div>
                )}

                {/* Studio Grid */}
                {studios.length > 0 ? (

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {studios.map((studio) => (
                            <StudioCard
                                key={studio._id}
                                studio={studio}
                            />
                        ))}

                    </div>

                ) : (

                    /* Empty State */
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2F800]/20">

                            <Building2
                                size={30}
                                className="text-gray-800"
                            />

                        </div>

                        <h3 className="text-xl font-bold text-gray-900">
                            No Studios Found
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">

                            {selectedCategory
                                ? `No studios available in ${selectedCategory === "other" ? "Other" : selectedCategory} category.`
                                : "There are currently no available studios. Please check back later for new creative spaces."
                            }

                        </p>

                        {selectedCategory && (
                            <Link
                                href="/studios"
                                className="mt-6 inline-flex items-center rounded-xl bg-[#C2F800] px-5 py-3 text-sm font-bold text-gray-900 hover:bg-[#b3e600]"
                            >
                                View All Studios
                            </Link>
                        )}

                    </div>

                )}

            </section>

        </main>
    );
};

export default ExploreStudiosPage;