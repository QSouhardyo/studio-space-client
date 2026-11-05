
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import {
    ArrowRight,
    CalendarDays,
    CircleCheck,
    CircleX,
    Clock,
    MapPin,
    XCircle,
} from "lucide-react";

// Booking status অনুযায়ী badge style
const STATUS_STYLES = {
    confirmed: {
        label: "Confirmed",
        icon: CircleCheck,
        className: "bg-green-50 text-green-600",
    },
    pending: {
        label: "Pending",
        icon: Clock,
        className: "bg-amber-50 text-amber-600",
    },
    cancelled: {
        label: "Cancelled",
        icon: CircleX,
        className: "bg-rose-50 text-rose-600",
    },
    completed: {
        label: "Completed",
        icon: CircleCheck,
        className: "bg-blue-50 text-blue-600",
    },
};

const getStatusStyle = (status) => {
    const key = String(status || "pending").toLowerCase();

    const normalizedKey = key === "canceled" ? "cancelled" : key;

    return (
        STATUS_STYLES[normalizedKey] || {
            label: status || "Pending",
            icon: CircleCheck,
            className: "bg-gray-100 text-gray-600",
        }
    );
};

// "10:00" + 4 hours -> "14:00"
const getEndTime = (startTime, hours) => {
    if (!startTime) return null;

    const [startHour, startMinute] = startTime.split(":").map(Number);

    if (Number.isNaN(startHour)) return null;

    const endHour = (startHour + Number(hours || 0)) % 24;
    const endMinute = Number.isNaN(startMinute) ? 0 : startMinute;

    return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
};

const formatMoney = (value) =>
    Number(value || 0).toLocaleString("en-US", {
        maximumFractionDigits: 2,
    });

const MyBookingsCard = ({ bookings = [] }) => {
    const { data: session } = authClient.useSession();

    const currentUser = session?.user;

    const currentUserId =
        currentUser?.id || currentUser?.email;

    const [bookingList, setBookingList] = useState(bookings);
    const [cancellingId, setCancellingId] = useState(null);

    // Cancel booking function
    const handleCancelBooking = async (bookingId) => {
        try {
            setCancellingId(bookingId);

            const res = await fetch(
                `http://localhost:5000/my-bookings/${bookingId}`,
                {
                    method: "DELETE",
                }
            );

            const deleteData = await res.json();

            if (!res.ok) {
                throw new Error(
                    deleteData.message || "Booking deletion failed"
                );
            }

            // কোন studio-র booking cancel হচ্ছে তার তথ্য
            const booking = bookingList.find(
                (item) => String(item._id) === String(bookingId)
            );

            // Studio ID বের করা
            const studioValue =
                booking?.studioId ??
                booking?.studio?._id ??
                booking?.studio?.id ??
                booking?.studio;

            const studioId =
                typeof studioValue === "object" && studioValue !== null
                    ? studioValue._id || studioValue.id
                    : studioValue;

            // Booking-এর user ID
            const bookingUserId =
                booking?.userId || currentUserId;

            // localStorage থেকে booking key মুছে ফেলা
            if (bookingUserId && studioId) {
                const bookingKey =
                    `studio-booked-${bookingUserId}-${studioId}`;

                localStorage.removeItem(bookingKey);

                console.log("Removed localStorage key:", bookingKey);
            } else {
                console.log("Booking ID information missing:", {
                    bookingUserId,
                    studioId,
                    booking,
                });
            }

            // UI থেকে booking সরানো
            setBookingList((previousBookings) =>
                previousBookings.filter(
                    (item) => String(item._id) !== String(bookingId)
                )
            );

            toast.success("Booking deleted successfully!");

        } catch (error) {
            console.error("Booking delete error:", error);

            toast.error(
                error.message || "Something went wrong!"
            );
        } finally {
            setCancellingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                            <CalendarDays size={15} />
                            Production Schedule
                        </span>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                            My Studio Bookings
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Track reservation statuses, cancellation requests, and shoot times
                        </p>
                    </div>

                    <Link
                        href="/studios"
                        className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                    >
                        Explore More Studios
                        <ArrowRight size={17} />
                    </Link>

                </div>

                {/* Booking List / Empty State */}
                {bookingList.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-orange-200 bg-white px-5 py-16 text-center">

                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                            <CalendarDays size={30} />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">
                            No Bookings Yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                            You have not booked any studios yet. Explore our
                            workspaces and reserve your first shoot.
                        </p>

                        <Link
                            href="/studios"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                        >
                            Explore More Studios
                            <ArrowRight size={17} />
                        </Link>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {bookingList.map((booking) => {

                            const studio = booking.studio;
                            const status = getStatusStyle(booking.status);

                            const shortId = booking._id
                                ? String(booking._id).slice(0, 6)
                                : "------";

                            const bookingId = booking._id;

                            const hours = Number(booking.hours || 1);
                            const endTime = getEndTime(booking.time, hours);

                            const timeLabel =
                                booking.time && endTime
                                    ? `${booking.time} - ${endTime} (${hours} hrs)`
                                    : `${hours} hrs`;

                            const isPending =
                                String(booking.status || "pending").toLowerCase() === "pending";

                            return (

                                <div
                                    key={booking._id || shortId}
                                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
                                >

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                                        {/* Studio Image */}
                                        <img
                                            src={
                                                studio?.image ||
                                                "https://placehold.co/600x400?text=StudioSpace"
                                            }
                                            alt={studio?.name || "Studio"}
                                            className="h-24 w-24 shrink-0 rounded-xl object-cover"
                                        />

                                        {/* Booking Information */}
                                        <div className="min-w-0 flex-1">

                                            {/* Status + Booking ID */}
                                            <div className="flex flex-wrap items-center gap-2.5">

                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
                                                >
                                                    <status.icon size={14} />
                                                    {status.label}
                                                </span>

                                                <span className="text-xs text-gray-400">
                                                    ID: #{shortId}
                                                </span>

                                            </div>

                                            {/* Studio Name */}
                                            <h2 className="mt-2.5 text-lg font-bold text-gray-900">
                                                {studio?.name || "Studio Booking"}
                                            </h2>

                                            {/* Date + Time */}
                                            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-gray-600">

                                                <span className="inline-flex items-center gap-1.5">
                                                    <CalendarDays size={15} className="shrink-0 text-orange-500" />
                                                    {booking.date || "N/A"}
                                                </span>

                                                <span className="h-1 w-1 rounded-full bg-gray-300" />

                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock size={15} className="shrink-0 text-orange-500" />
                                                    {timeLabel}
                                                </span>

                                            </div>

                                            {/* Location */}
                                            <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                                                <MapPin size={15} className="shrink-0 text-gray-400" />

                                                <span className="truncate">
                                                    {studio?.location || "Location not available"}
                                                </span>
                                            </div>

                                        </div>

                                        {/* Total + Cancel Button */}
                                        <div className="flex flex-row items-center justify-between gap-3 sm:w-44 sm:flex-col sm:items-end sm:justify-start">

                                            <div className="sm:text-right">
                                                <p className="text-xs text-gray-400">
                                                    Total Charged / Due
                                                </p>

                                                <p className="mt-1 text-2xl font-bold text-orange-500">
                                                    ${formatMoney(booking.total)}
                                                </p>
                                            </div>

                                            {/* Only Pending Booking Can Be Cancelled */}
                                            {isPending && (
                                                <button
                                                    type="button"
                                                    disabled={cancellingId === bookingId}
                                                    onClick={() => handleCancelBooking(bookingId)}
                                                    className="inline-flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <XCircle size={16} />

                                                    {cancellingId === bookingId
                                                        ? "Deleting..."
                                                        : "Cancel Booking"}
                                                </button>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>
    );
};

export default MyBookingsCard;
