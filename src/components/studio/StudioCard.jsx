
import Link from "next/link";
import {
    MapPin,
    Star,
    ArrowUpRight,
    Clock,
} from "lucide-react";

const StudioCard = ({ studio }) => {
    const {
        _id,
        name,
        category,
        hourRate,
        location,
        rating,
        image,
    } = studio;

    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Studio Image */}
            <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                    src={image || "https://placehold.co/600x400?text=StudioSpace"}
                    alt={name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                        {category}
                    </span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 shadow-sm">
                    <Star size={15} className="fill-yellow-400 text-yellow-400" />

                    <span className="text-sm font-bold text-gray-800">
                        {rating || "New"}
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5">

                {/* Title */}
                <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-gray-700">
                    {name}
                </h3>

                {/* Location */}
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} className="shrink-0 text-gray-400" />

                    <span className="line-clamp-1">
                        {location}
                    </span>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-gray-100" />

                {/* Price and Button */}
                <div className="flex items-center justify-between gap-3">

                    <div>
                        <p className="text-xs text-gray-400">
                            Hourly Rate
                        </p>

                        <div className="mt-1 flex items-center gap-1">
                            <span className="text-xl font-bold text-gray-900">
                                ৳{Number(hourRate || 0).toLocaleString("en-BD")}
                            </span>

                            <span className="text-xs text-gray-500">
                                / hour
                            </span>
                        </div>
                    </div>

                    <Link
                        href={`/studios/${_id}`}
                        className="flex items-center gap-2 rounded-xl bg-[#C2F800] px-4 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#b3e600]"
                    >
                        View Details

                        <ArrowUpRight size={17} />
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default StudioCard;
