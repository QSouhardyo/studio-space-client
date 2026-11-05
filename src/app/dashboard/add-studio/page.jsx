
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Building2,
    MapPin,
    Image as ImageIcon,
    DollarSign,
    Users,
    FileText,
    PlusCircle,
    Star,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const categories = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Workshop",
    "Art Studio",
    "Creative Office",
    "Other",
];

const amenitiesList = [
    "Free Wi-Fi",
    "Air Conditioning",
    "Parking",
    "Lighting Equipment",
    "Sound System",
    "Photography Equipment",
    "Changing Room",
    "Restroom",
    "Kitchen",
    "Power Backup",
];

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#C2F800] focus:ring-2 focus:ring-[#C2F800]/20 dark:border-gray-700 dark:bg-[#18251f] dark:text-gray-100 dark:placeholder:text-gray-500";

const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

const sectionClass =
    "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-[#17231d] md:p-7";

const AddStudioPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    const [amenities, setAmenities] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAmenityChange = (amenity) => {
        if (amenities.includes(amenity)) {
            const remainingAmenities = amenities.filter(
                (item) => item !== amenity
            );

            setAmenities(remainingAmenities);
        } else {
            setAmenities([...amenities, amenity]);
        }
    };

    const handleAddStudio = async (e) => {
        e.preventDefault();

        const formElement = e.currentTarget;

        const formData = new FormData(formElement);
        const form = Object.fromEntries(formData.entries());

        form.amenities = formData.getAll("amenities");

        form.hourRate = Number(form.hourRate);
        form.deposit = Number(form.deposit);
        form.capacity = Number(form.capacity);
        form.rating = Number(form.rating);

        setIsSubmitting(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/add-studio`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const result = await res.json();

            if (res.ok) {
                toast.success("Studio added successfully!");

                formElement.reset();
                setAmenities([]);

                router.refresh();
            } else {
                toast.error(result.message || "Failed to add studio!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto mr-5 my-10 w-full max-w-5xl space-y-6 pb-10">

            {/* Page Header */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#17231d]">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#C2F800]/20 p-3">
                        <Building2
                            size={25}
                            className="text-gray-900 dark:text-[#C2F800]"
                        />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Add New Studio
                        </h1>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Share your creative space and start receiving bookings.
                        </p>
                    </div>
                </div>
            </div>

            {/* Studio Form */}
            <form onSubmit={handleAddStudio} className="space-y-6">

                {/* Basic Information */}
                <section className={sectionClass}>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Basic Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Provide the basic details about your studio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className={labelClass}>Studio Title *</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter studio name"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Category *</label>

                            <select
                                name="category"
                                required
                                defaultValue=""
                                className={inputClass}
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>

                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Maximum Capacity *</label>

                            <div className="relative">
                                <Users
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="number"
                                    name="capacity"
                                    min="1"
                                    placeholder="e.g. 10"
                                    required
                                    className={`${inputClass} pl-11`}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className={sectionClass}>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Pricing Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Set your rental price and security deposit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>Hourly Rate (৳) *</label>

                            <div className="relative">
                                <DollarSign
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="number"
                                    name="hourRate"
                                    min="1"
                                    placeholder="e.g. 1000"
                                    required
                                    className={`${inputClass} pl-11`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>
                                Security Deposit (৳) *
                            </label>

                            <div className="relative">
                                <DollarSign
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="number"
                                    name="deposit"
                                    min="0"
                                    placeholder="e.g. 2000"
                                    required
                                    className={`${inputClass} pl-11`}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rating */}
                <section className={sectionClass}>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Studio Rating
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Set a rating for your studio.
                        </p>
                    </div>

                    <div>
                        <label className={labelClass}>
                            Rating (Out of 5) *
                        </label>

                        <div className="relative">
                            <Star
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 fill-yellow-400 text-yellow-400"
                            />

                            <select
                                name="rating"
                                required
                                defaultValue=""
                                className={`${inputClass} pl-11`}
                            >
                                <option value="" disabled>
                                    Select studio rating
                                </option>

                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Location */}
                <section className={sectionClass}>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Studio Location
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Provide the complete address of your studio.
                        </p>
                    </div>

                    <label className={labelClass}>Full Address *</label>

                    <div className="relative">
                        <MapPin
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Enter your studio address"
                            required
                            className={`${inputClass} pl-11`}
                        />
                    </div>
                </section>

                {/* Image */}
                <section className={sectionClass}>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Studio Image
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Add an image to showcase your creative space.
                        </p>
                    </div>

                    <label className={labelClass}>Image URL *</label>

                    <div className="relative">
                        <ImageIcon
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="url"
                            name="image"
                            placeholder="https://example.com/studio-image.jpg"
                            required
                            className={`${inputClass} pl-11`}
                        />
                    </div>
                </section>

                {/* Amenities */}
                <section className={sectionClass}>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Studio Amenities
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Select all available facilities.
                            </p>
                        </div>

                        <span className="rounded-lg bg-[#C2F800]/20 px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-[#C2F800]">
                            {amenities.length} Selected
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                        {amenitiesList.map((amenity) => (
                            <label
                                key={amenity}
                                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${amenities.includes(amenity)
                                        ? "border-[#A8D600] bg-[#C2F800]/10 dark:border-[#C2F800] dark:bg-[#C2F800]/10"
                                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-500"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    name="amenities"
                                    value={amenity}
                                    checked={amenities.includes(amenity)}
                                    onChange={() => handleAmenityChange(amenity)}
                                    className="h-4 w-4 accent-[#A8D600]"
                                />

                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {amenity}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Description */}
                <section className={sectionClass}>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Studio Description
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Tell guests what makes your studio special.
                        </p>
                    </div>

                    <label className={labelClass}>Details *</label>

                    <div className="relative">
                        <FileText
                            size={18}
                            className="absolute left-4 top-4 text-gray-400"
                        />

                        <textarea
                            name="details"
                            rows="5"
                            placeholder="Describe your studio, facilities and available equipment..."
                            required
                            className={`${inputClass} resize-none pl-11`}
                        />
                    </div>
                </section>

                {/* Owner Information */}
                <section className={sectionClass}>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Owner Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Your account information.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>Owner Name</label>

                            <input
                                type="text"
                                name="ownerName"
                                value={user?.name || ""}
                                readOnly
                                className={`${inputClass} bg-gray-50 text-gray-500 dark:bg-[#202f27] dark:text-gray-400`}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Owner Email</label>

                            <input
                                type="email"
                                name="ownerEmail"
                                value={user?.email || ""}
                                readOnly
                                className={`${inputClass} bg-gray-50 text-gray-500 dark:bg-[#202f27] dark:text-gray-400`}
                            />
                        </div>
                    </div>
                </section>

                {/* Submit Button */}
                <div className="flex flex-col-reverse gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-[#17231d] sm:flex-row sm:items-center sm:justify-between md:p-6">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Please review your information before submitting.
                    </p>

                    <button
                        type="submit"
                        disabled={isSubmitting || isPending}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#C2F800] px-7 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-[#b2e500] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <PlusCircle size={19} />

                        {isSubmitting ? "Adding Studio..." : "Add Studio"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudioPage;
