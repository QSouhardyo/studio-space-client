import Link from "next/link";
import {
    ArrowLeft,
    Banknote,
    Battery,
    Building2,
    Camera,
    Car,
    Check,
    DoorOpen,
    DollarSign,
    Lightbulb,
    Mail,
    MapPin,
    Quote,
    ShieldCheck,
    Shirt,
    Snowflake,
    Star,
    Users,
    Utensils,
    Volume2,
    Wifi,
} from "lucide-react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import BookingModal from "@/components/studio/BookingModal";

const placeholderImage = "https://placehold.co/1200x800?text=StudioSpace";

const amenityIcons = {
    "Free Wi-Fi": Wifi,
    "Air Conditioning": Snowflake,
    Parking: Car,
    "Lighting Equipment": Lightbulb,
    "Sound System": Volume2,
    "Photography Equipment": Camera,
    "Changing Room": Shirt,
    Restroom: DoorOpen,
    Kitchen: Utensils,
    "Power Backup": Battery,
};

// Placeholder reviews used only until the API exposes real ones
// (add a `reviews` array to the studio document to replace these).
const fallbackReviews = [
    {
        name: "Nusrat Jahan",
        rating: 5,
        date: "2 weeks ago",
        comment:
            "Spacious, spotless, and the lighting gear is top-notch. Booked it for a product shoot and everything worked perfectly.",
    },
    {
        name: "Tanvir Ahmed",
        rating: 5,
        date: "a month ago",
        comment:
            "Great soundproofing and fast Wi-Fi. The host responded within minutes and check-in was seamless.",
    },
    {
        name: "Farhana Karim",
        rating: 4,
        date: "3 months ago",
        comment:
            "Comfortable for a small team offsite. Parking was easy and the kitchenette was a nice touch.",
    },
];

const getInitials = (value) =>
    (value || "Guest")
        .split(" ")
        .map((word) => word[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();

const StarRating = ({ value, size = 15 }) => {
    const filled = Math.round(Number(value) || 0);

    return (
        <span className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={
                        star <= filled
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200"
                    }
                />
            ))}
        </span>
    );
};

const StudioDetailsPage = async ({ params }) => {
    const { id } = await params;

    let studio = null;

    try {
        const res = await fetch(`http://localhost:5000/studios/${id}`, {
            cache: "no-store",
        });

        if (res.ok) {
            studio = await res.json();

            console.log(studio);

        }
    } catch (error) {
        console.error("Failed to fetch studio:", error);
    }

    if (!studio) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F8F9F6] px-5">
                <div className="max-w-md rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                    <Building2
                        size={40}
                        className="mx-auto text-gray-300"
                    />

                    <h1 className="mt-4 text-xl font-bold text-gray-900">
                        Studio Not Found
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        We couldn&apos;t load this studio. It may have been
                        removed, or the API server isn&apos;t running.
                    </p>

                    <Link
                        href="/studios"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C2F800] px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#b3e600]"
                    >
                        Browse Studios
                        <ArrowLeft size={16} />
                    </Link>
                </div>
            </main>
        );
    }

    const {
        name = "Untitled Studio",
        category,
        hourRate = 0,
        deposit = 0,
        capacity,
        location,
        image,
        gallery,
        amenities = [],
        details,
        rating,
        ownerName,
        ownerEmail,
        reviews,
    } = studio;

    const galleryImages =
        Array.isArray(gallery) && gallery.length > 0
            ? gallery.filter(Boolean)
            : [image || placeholderImage];

    const reviewList =
        Array.isArray(reviews) && reviews.length > 0
            ? reviews
            : fallbackReviews;

    const averageRating = reviewList.length
        ? reviewList.reduce(
            (sum, review) => sum + (Number(review.rating) || 0),
            0
        ) / reviewList.length
        : 0;

    const headerRating = Number(rating) || averageRating;

    const specs = [
        { icon: Building2, label: "Category", value: category || "Not set" },
        {
            icon: Users,
            label: "Max Capacity",
            value: capacity ? `${capacity} guests` : "Not set",
        },
        {
            icon: DollarSign,
            label: "Hourly Rate",
            value: `৳${Number(hourRate || 0).toLocaleString("en-BD")} / hour`,
        },
        {
            icon: Banknote,
            label: "Security Deposit",
            value: `৳${Number(deposit || 0).toLocaleString("en-BD")}`,
        },
        { icon: MapPin, label: "Location", value: location || "Not set" },
    ];

    return (
        <main className="min-h-screen bg-[#F8F9F6] pb-16">
            {/* Page Header */}
            <section className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
                    <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-900"
                    >
                        <ArrowLeft size={16} />
                        Back to Studios
                    </Link>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                        {category ? (
                            <span className="rounded-full bg-[#C2F800]/20 px-3 py-1.5 text-xs font-bold text-gray-800">
                                {category}
                            </span>
                        ) : null}

                        <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm ring-1 ring-gray-100">
                            <Star
                                size={13}
                                className="fill-yellow-400 text-yellow-400"
                            />
                            {headerRating.toFixed(1)}
                        </span>
                    </div>

                    <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                        {name}
                    </h1>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin size={15} className="shrink-0" />
                        {location}
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Gallery */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <Carousel>
                                <CarouselContent>
                                    {galleryImages.map((src, index) => (
                                        <CarouselItem key={`${src}-${index}`}>
                                            <div className="relative h-80 overflow-hidden rounded-xl bg-gray-100 md:h-[420px]">
                                                <img
                                                    src={src}
                                                    alt={`${name} — photo ${index + 1
                                                        }`}
                                                    className="h-full w-full object-cover"
                                                />

                                                <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                                                    {index + 1} /{" "}
                                                    {galleryImages.length}
                                                </span>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                {galleryImages.length > 1 ? (
                                    <>
                                        <CarouselPrevious className="left-2" />
                                        <CarouselNext className="right-2" />
                                    </>
                                ) : null}
                            </Carousel>
                        </div>

                        {/* About + Specifications */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
                            <h2 className="text-lg font-bold text-gray-900">
                                About This Workspace
                            </h2>

                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                                {details ||
                                    "No description has been provided for this studio yet."}
                            </p>

                            <div className="my-6 border-t border-gray-100" />

                            <h2 className="text-lg font-bold text-gray-900">
                                Workspace Specifications
                            </h2>

                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {specs.map(({ icon: Icon, label, value }) => (
                                    <div
                                        key={label}
                                        className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
                                    >
                                        <span className="rounded-lg bg-[#C2F800]/20 p-2">
                                            <Icon
                                                size={17}
                                                className="text-gray-800"
                                            />
                                        </span>

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                {label}
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-gray-900">
                                                {value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Amenities
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Everything included during your stay.
                                    </p>
                                </div>

                                <span className="rounded-lg bg-[#C2F800]/20 px-3 py-1.5 text-xs font-semibold text-gray-800">
                                    {amenities.length} available
                                </span>
                            </div>

                            {amenities.length > 0 ? (
                                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {amenities.map((amenity) => {
                                        const Icon =
                                            amenityIcons[amenity] || Check;

                                        return (
                                            <div
                                                key={amenity}
                                                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3"
                                            >
                                                <span className="rounded-lg bg-[#C2F800]/20 p-2">
                                                    <Icon
                                                        size={17}
                                                        className="text-gray-800"
                                                    />
                                                </span>

                                                <span className="text-sm font-medium text-gray-700">
                                                    {amenity}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="mt-5 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400">
                                    No amenities listed yet.
                                </p>
                            )}
                        </div>

                        {/* Reviews */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Guest Reviews
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        What guests say about this workspace.
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-2.5">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {averageRating.toFixed(1)}
                                    </span>

                                    <div>
                                        <StarRating
                                            value={averageRating}
                                            size={13}
                                        />

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            {reviewList.length} reviews
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {reviewList.map((review, index) => (
                                    <div
                                        key={review.id || index}
                                        className="rounded-xl border border-gray-100 bg-gray-50/50 p-5"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C2F800]/30 text-sm font-bold text-gray-800">
                                                    {getInitials(review.name)}
                                                </span>

                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {review.name || "Guest"}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        {review.date}
                                                    </p>
                                                </div>
                                            </div>

                                            <StarRating
                                                value={review.rating}
                                                size={13}
                                            />
                                        </div>

                                        <Quote
                                            size={16}
                                            className="mt-4 text-[#C2F800]"
                                        />

                                        <p className="mt-1.5 text-sm leading-6 text-gray-600">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Booking Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-6">
                            <p className="text-xs text-gray-400">
                                Hourly Rate
                            </p>

                            <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-gray-900">
                                    ৳
                                    {Number(hourRate || 0).toLocaleString(
                                        "en-BD"
                                    )}
                                </span>

                                <span className="text-sm text-gray-500">
                                    / hour
                                </span>
                            </div>

                            <div className="my-5 border-t border-gray-100" />

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <Banknote size={16} />
                                        Security deposit
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        ৳
                                        {Number(deposit || 0).toLocaleString(
                                            "en-BD"
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <Users size={16} />
                                        Capacity
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        {capacity
                                            ? `${capacity} guests`
                                            : "Not set"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <Star size={16} />
                                        Rating
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        {headerRating.toFixed(1)} / 5
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5">
                                <BookingModal studio={studio} />
                            </div>

                            <p className="mt-3 text-center text-xs leading-5 text-gray-500">
                                Your booking request is sent to the host for
                                confirmation.
                            </p>
                        </div>

                        {/* Host Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900">
                                Hosted By
                            </h2>

                            <div className="mt-4 flex items-center gap-3">
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#C2F800]/30 text-base font-bold text-gray-800">
                                    {getInitials(ownerName)}
                                </span>

                                <div>
                                    <p className="text-sm font-bold text-gray-900">
                                        {ownerName || "Studio Host"}
                                    </p>

                                    <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-[#91B900]">
                                        <ShieldCheck size={13} />
                                        Verified Host
                                    </p>
                                </div>
                            </div>

                            {ownerEmail ? (
                                <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 text-sm">
                                    <p className="flex items-center gap-2 break-all text-gray-600">
                                        <Mail
                                            size={15}
                                            className="shrink-0 text-gray-400"
                                        />
                                        {ownerEmail}
                                    </p>

                                    <a
                                        href={`mailto:${ownerEmail}`}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                                    >
                                        <Mail size={16} />
                                        Contact Host
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default StudioDetailsPage;
