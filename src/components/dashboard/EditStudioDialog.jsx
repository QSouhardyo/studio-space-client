"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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

const EditStudioDialog = ({ listing }) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // আগের listing থেকে amenities নেওয়া
    const [amenities, setAmenities] = useState(
        listing?.amenities || []
    );

    // Checkbox পরিবর্তন
    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setAmenities((previous) => [...previous, value]);
        } else {
            setAmenities((previous) =>
                previous.filter((item) => item !== value)
            );
        }
    };

    // Dialog খোলার সময় listing-এর amenities সেট করা
    const handleOpenChange = (value) => {
        setOpen(value);

        if (value) {
            setAmenities(listing?.amenities || []);
        }
    };

    const handleUpdateStudio = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const form = Object.fromEntries(formData.entries());

        // Amenities-এর updated data
        form.amenities = formData.getAll("amenities");

        // Number conversion
        form.hourRate = Number(form.hourRate);
        form.deposit = Number(form.deposit);
        form.capacity = Number(form.capacity);

        setIsSubmitting(true);

        try {
            const res = await fetch(
                `http://localhost:5000/studios/edit/${listing._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                toast.error(
                    result.message || "Failed to update studio!"
                );
                return;
            }

            toast.success("Studio updated successfully!");

            // Dialog বন্ধ
            setOpen(false);

            // My Listings-এর data refresh
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {/* আগের Pencil Icon */}
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-700 hover:bg-green-50"
                >
                    <Pencil size={18} />
                </Button>
            </DialogTrigger>

            <DialogContent className="!w-[95vw] !max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border-0 p-0">
                <div className="p-6 md:p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold">
                            Update Studio
                        </DialogTitle>

                        <DialogDescription>
                            Update your studio information below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdateStudio}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Studio Name */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Studio Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={listing?.name}
                                    required
                                    className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    defaultValue={listing?.category}
                                    required
                                    className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
                                />
                            </div>

                            {/* Hour Rate */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Hourly Rate
                                </label>

                                <input
                                    type="number"
                                    name="hourRate"
                                    defaultValue={listing?.hourRate}
                                    required
                                    className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
                                />
                            </div>

                            {/* Deposit */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Deposit
                                </label>

                                <input
                                    type="number"
                                    name="deposit"
                                    defaultValue={listing?.deposit}
                                    required
                                    className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
                                />
                            </div>

                            {/* Capacity */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Capacity
                                </label>

                                <input
                                    type="number"
                                    name="capacity"
                                    defaultValue={listing?.capacity}
                                    required
                                    className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={listing?.location}
                                    required
                                    className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
                                />
                            </div>

                            {/* Image */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block font-medium">
                                    Image URL
                                </label>

                                <input
                                    type="url"
                                    name="image"
                                    defaultValue={listing?.image}
                                    required
                                    className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
                                />
                            </div>

                            {/* Amenities */}
                            <div className="md:col-span-2">
                                <label className="mb-3 block font-medium">
                                    Amenities
                                </label>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                    {amenitiesList.map((amenity) => (
                                        <label
                                            key={amenity}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <input
                                                type="checkbox"
                                                name="amenities"
                                                value={amenity}
                                                checked={amenities.includes(amenity)}
                                                onChange={handleAmenityChange}
                                                className="h-4 w-4 accent-green-700"
                                            />

                                            {amenity}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block font-medium">
                                    Studio Details
                                </label>

                                <textarea
                                    name="details"
                                    defaultValue={listing?.details}
                                    required
                                    rows={5}
                                    className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
                                />
                            </div>

                            {/* Host Name */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Host Name
                                </label>

                                <input
                                    type="text"
                                    name="ownerName"
                                    value={listing?.ownerName || ""}
                                    readOnly
                                    className="w-full cursor-not-allowed rounded-lg border bg-gray-100 p-3 text-gray-500"
                                />
                            </div>

                            {/* Host Email */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Host Email
                                </label>

                                <input
                                    type="email"
                                    name="ownerEmail"
                                    value={listing?.ownerEmail || ""}
                                    readOnly
                                    className="w-full cursor-not-allowed rounded-lg border bg-gray-100 p-3 text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#235b45] text-white hover:bg-[#194532]"
                            >
                                {isSubmitting ? "Updating..." : "Update Studio"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditStudioDialog;
