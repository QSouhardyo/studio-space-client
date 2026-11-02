
"use client";

import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
    CalendarDays,
    Clock,
    MapPin,
    Users,
    UserRound,
    Mail,
    MessageSquare,
    X,
    CheckCircle2,
    ShieldCheck,
    Loader2,
    ArrowRight,
    Wallet,
    Sparkles,
} from "lucide-react";

const initialFormState = {
    date: "",
    time: "10:00",
    hours: "2",
    guests: "1",
    guestName: "",
    guestEmail: "",
    notes: "",
};

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#A4D500] focus:bg-white focus:ring-2 focus:ring-[#C2F800]/20";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

const BookingModal = ({ studio }) => {
    const {
        name,
        location,
        image,
        hourRate = 0,
        deposit = 0,
        capacity,
    } = studio ?? {};

    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [form, setForm] = useState(initialFormState);

    const today = (() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    })();

    const hours = Math.max(1, Number(form.hours) || 1);
    const subtotal = Number(hourRate || 0) * hours;
    const depositAmount = Number(deposit) || 0;
    const total = subtotal + depositAmount;

    const updateField = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOpenChange = (nextOpen) => {
        setOpen(nextOpen);

        if (!nextOpen) {
            setConfirmed(false);
            setIsSubmitting(false);
            setForm(initialFormState);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        // এখানে পরবর্তীতে Booking API যুক্ত করবে।
        await new Promise((resolve) => setTimeout(resolve, 700));

        setIsSubmitting(false);
        setConfirmed(true);
    };

    const formattedDate = form.date
        ? new Date(`${form.date}T00:00:00`).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "";

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        className="h-auto w-full gap-2 rounded-xl bg-[#C2F800] px-6 py-4 text-base font-bold text-gray-900 shadow-sm transition hover:bg-[#b3e600] hover:text-gray-900"
                    />
                }
            >
                <CalendarDays size={19} />
                Book Workspace Now
            </DialogTrigger>

            <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border-0 bg-white p-0 shadow-2xl sm:max-w-xl">

                {/* Success Screen */}
                {confirmed ? (
                    <div className="p-6 sm:p-8">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C2F800]/20">
                            <CheckCircle2 size={42} className="text-[#80A900]" />
                        </div>

                        <div className="mt-5 text-center">
                            <p className="text-xs font-bold uppercase tracking-[2px] text-[#80A900]">
                                Booking Submitted
                            </p>

                            <DialogHeader className="mt-2">
                                <DialogTitle className="text-2xl font-bold text-gray-900">
                                    You're All Set!
                                </DialogTitle>

                                <DialogDescription className="mt-2 text-sm leading-6 text-gray-500">
                                    Your booking request for{" "}
                                    <span className="font-bold text-gray-800">{name}</span>{" "}
                                    has been prepared successfully.
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        <div className="mt-7 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                            <p className="mb-4 text-sm font-bold text-gray-900">
                                Booking Summary
                            </p>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <CalendarDays size={16} />
                                        Date
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {formattedDate}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <Clock size={16} />
                                        Time & Duration
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {form.time} · {hours}h
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <Users size={16} />
                                        Guests
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {form.guests} People
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-900">
                                            Estimated Total
                                        </span>
                                        <span className="text-xl font-bold text-gray-900">
                                            ৳{total.toLocaleString("en-BD")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <ShieldCheck size={15} />
                            Booking confirmation is not yet connected to the server.
                        </p>

                        <DialogClose
                            render={
                                <Button className="mt-6 h-auto w-full rounded-xl bg-[#C2F800] py-4 font-bold text-gray-900 hover:bg-[#b3e600]">
                                    Done
                                </Button>
                            }
                        />
                    </div>
                ) : (
                    <>
                        {/* Modal Header */}
                        <div className="relative overflow-hidden bg-gray-900 px-6 py-7 text-white sm:px-8">
                            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#C2F800]/10 blur-2xl" />

                            <div className="relative flex items-start justify-between gap-4">
                                <div>
                                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#C2F800]/15 px-3 py-1.5 text-xs font-semibold text-[#C2F800]">
                                        <Sparkles size={14} />
                                        RESERVE YOUR SPACE
                                    </div>

                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-white">
                                            Book Your Workspace
                                        </DialogTitle>

                                        <DialogDescription className="mt-2 flex items-center gap-1.5 text-sm text-gray-300">
                                            <MapPin size={15} />
                                            {location}
                                        </DialogDescription>
                                    </DialogHeader>
                                </div>

                                <DialogClose
                                    render={
                                        <button
                                            type="button"
                                            aria-label="Close booking modal"
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                                        >
                                            <X size={19} />
                                        </button>
                                    }
                                />
                            </div>

                            {/* Studio Summary */}
                            <div className="relative mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                                <img
                                    src={image || "https://placehold.co/100x100?text=Studio"}
                                    alt={name}
                                    className="h-16 w-16 rounded-xl object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-bold text-white">{name}</h3>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {location}
                                    </p>
                                    <p className="mt-2 text-sm font-bold text-[#C2F800]">
                                        ৳{Number(hourRate || 0).toLocaleString("en-BD")}
                                        <span className="font-normal text-gray-300"> / hour</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">

                            {/* Schedule */}
                            <section>
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C2F800]/20">
                                        <CalendarDays size={18} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-900">
                                            Booking Schedule
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            Choose your preferred date and time
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Booking Date *</label>
                                        <input
                                            type="date"
                                            min={today}
                                            required
                                            value={form.date}
                                            onChange={(e) => updateField("date", e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Start Time *</label>
                                        <input
                                            type="time"
                                            required
                                            value={form.time}
                                            onChange={(e) => updateField("time", e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Duration *</label>
                                        <select
                                            value={form.hours}
                                            onChange={(e) => updateField("hours", e.target.value)}
                                            className={inputClass}
                                        >
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i + 1} value={String(i + 1)}>
                                                    {i + 1} {i === 0 ? "Hour" : "Hours"}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Guests *</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max={capacity || undefined}
                                            required
                                            value={form.guests}
                                            onChange={(e) => updateField("guests", e.target.value)}
                                            className={inputClass}
                                        />
                                        {capacity && (
                                            <p className="mt-1 text-xs text-gray-400">
                                                Maximum {capacity} guests
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <div className="border-t border-gray-100" />

                            {/* Guest Information */}
                            <section>
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C2F800]/20">
                                        <UserRound size={18} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-900">
                                            Guest Information
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            Enter your contact details
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Full Name *</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            autoComplete="name"
                                            required
                                            value={form.guestName}
                                            onChange={(e) =>
                                                updateField("guestName", e.target.value)
                                            }
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Email Address *</label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            required
                                            value={form.guestEmail}
                                            onChange={(e) =>
                                                updateField("guestEmail", e.target.value)
                                            }
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Special Requests
                                        </label>
                                        <textarea
                                            rows="3"
                                            placeholder="Any equipment or setup requests?"
                                            value={form.notes}
                                            onChange={(e) => updateField("notes", e.target.value)}
                                            className={`${inputClass} resize-none`}
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="border-t border-gray-100" />

                            {/* Price Breakdown */}
                            <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                                <div className="mb-4 flex items-center gap-2">
                                    <Wallet size={18} className="text-gray-700" />
                                    <h3 className="font-bold text-gray-900">
                                        Price Breakdown
                                    </h3>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between gap-3 text-gray-500">
                                        <span>
                                            ৳{Number(hourRate || 0).toLocaleString("en-BD")} × {hours}{" "}
                                            {hours === 1 ? "hour" : "hours"}
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            ৳{subtotal.toLocaleString("en-BD")}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 text-gray-500">
                                        <span>Security Deposit</span>
                                        <span className="font-semibold text-gray-800">
                                            ৳{depositAmount.toLocaleString("en-BD")}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-bold text-gray-900">
                                                Estimated Total
                                            </span>
                                            <span className="text-2xl font-bold text-gray-900">
                                                ৳{total.toLocaleString("en-BD")}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Includes one-time security deposit
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Submit Button */}
                            <div className="space-y-3">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="h-auto w-full gap-2 rounded-xl bg-[#C2F800] py-4 text-base font-bold text-gray-900 shadow-sm transition hover:bg-[#b3e600] hover:text-gray-900 disabled:opacity-60"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={19} className="animate-spin" />
                                            Sending Request...
                                        </>
                                    ) : (
                                        <>
                                            Confirm Booking
                                            <ArrowRight size={19} />
                                        </>
                                    )}
                                </Button>

                                <p className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                    <ShieldCheck size={15} />
                                    Your booking details will be handled securely.
                                </p>
                            </div>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
