
// "use client";

// import { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";
// import { CalendarDays } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";

// const BookingModal = ({ studio }) => {
//     const { data: session, isPending } = authClient.useSession();

//     const user = session?.user;

//     const [open, setOpen] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [confirmed, setConfirmed] = useState(false);
//     const [hasBooked, setHasBooked] = useState(false);

//     const [form, setForm] = useState({
//         date: "",
//         time: "",
//         hours: "1",
//         guests: "1",
//         guestName: "",
//         guestEmail: "",
//         notes: "",
//     });

//     // Studio ID
//     const studioId = studio?._id || studio?.id;

//     // User ID
//     const userId = user?.id || user?.email;

//     // User এবং Studio অনুযায়ী আলাদা booking key
//     const bookingKey =
//         userId && studioId
//             ? `studio-booked-${userId}-${studioId}`
//             : null;

//     // আগে বুকিং করা হয়েছে কি না চেক
//     useEffect(() => {
//         if (!bookingKey) {
//             setHasBooked(false);
//             return;
//         }

//         const alreadyBooked = localStorage.getItem(bookingKey);

//         setHasBooked(alreadyBooked === "true");
//     }, [bookingKey]);

//     // Booking button click
//     const handleBookClick = () => {
//         if (hasBooked) {
//             toast.error("Already Booked!");
//             return;
//         }

//         if (!user) {
//             toast.error("Please login to book this studio.");
//             return;
//         }

//         setOpen(true);
//     };

//     // Modal open এবং close
//     const handleOpenChange = (value) => {
//         setOpen(value);

//         if (!value) {
//             setConfirmed(false);
//             setIsSubmitting(false);
//         }
//     };

//     // Form input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setForm((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     // Booking submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (hasBooked) {
//             toast.error("Already Booked!");
//             return;
//         }

//         if (isSubmitting) return;

//         if (!user) {
//             toast.error("Please login to book this studio.");
//             return;
//         }

//         if (!bookingKey) {
//             toast.error("Studio or user information is missing.");
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             // Submit করার আগেও localStorage চেক
//             const alreadyBooked = localStorage.getItem(bookingKey);

//             if (alreadyBooked === "true") {
//                 setHasBooked(true);
//                 toast.error("Already Booked!");
//                 return;
//             }

//             const data = {
//                 ...form,
//                 studioId,
//                 userId: userId,
//                 userName: user.name,
//                 userEmail: user.email,
//             };

//             const res = await fetch("http://localhost:5000/booking", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });

//             const result = await res.json();

//             if (!res.ok) {
//                 throw new Error(result.message || "Booking failed!");
//             }

//             // Booking সফল হলে localStorage-এ save
//             localStorage.setItem(bookingKey, "true");

//             setHasBooked(true);
//             setConfirmed(true);

//             toast.success("Booking successful!");
//         } catch (error) {
//             console.error("Booking error:", error);

//             toast.error(
//                 error.message || "Something went wrong!"
//             );
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Price calculation
//     const hourRate = Number(studio?.hourRate || 0);
//     const deposit = Number(studio?.deposit || 0);
//     const hours = Number(form.hours || 1);

//     const totalPrice = hourRate * hours + deposit;

//     return (
//         <>
//             {/* Booking Button */}
//             <Button
//                 type="button"
//                 onClick={handleBookClick}
//                 disabled={isPending}
//                 className="h-auto w-full gap-2 rounded-xl bg-[#C2F800] px-6 py-4 text-base font-bold text-gray-900 shadow-sm transition hover:bg-[#b3e600] hover:text-gray-900"
//             >
//                 <CalendarDays size={19} />

//                 {hasBooked
//                     ? "Already Booked"
//                     : "Book Workspace Now"}
//             </Button>

//             {/* Booking Dialog */}
//             <Dialog
//                 open={open}
//                 onOpenChange={handleOpenChange}
//             >
//                 <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">

//                     {confirmed ? (
//                         // Booking Success Message
//                         <div className="py-8 text-center">
//                             <div className="mb-4 text-5xl">
//                                 ✓
//                             </div>

//                             <DialogHeader>
//                                 <DialogTitle className="text-center text-2xl">
//                                     Booking Successful!
//                                 </DialogTitle>

//                                 <DialogDescription className="pt-2 text-center">
//                                     Your studio booking has been submitted successfully.
//                                 </DialogDescription>
//                             </DialogHeader>

//                             <Button
//                                 onClick={() => handleOpenChange(false)}
//                                 className="mt-6 bg-[#C2F800] font-bold text-gray-900 hover:bg-[#b3e600]"
//                             >
//                                 Close
//                             </Button>
//                         </div>
//                     ) : (
//                         <>
//                             <DialogHeader>
//                                 <DialogTitle className="text-xl font-bold">
//                                     Book Your Workspace
//                                 </DialogTitle>

//                                 <DialogDescription>
//                                     Complete the form below to reserve this studio.
//                                 </DialogDescription>
//                             </DialogHeader>

//                             {/* Studio Information */}
//                             <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
//                                 <h3 className="font-semibold">
//                                     {studio?.name}
//                                 </h3>

//                                 <p className="text-sm text-gray-500">
//                                     {studio?.location}
//                                 </p>

//                                 <p className="mt-2 text-sm">
//                                     Hourly Rate: ৳{hourRate}
//                                 </p>

//                                 <p className="text-sm">
//                                     Deposit: ৳{deposit}
//                                 </p>
//                             </div>

//                             {/* Booking Form */}
//                             <form
//                                 onSubmit={handleSubmit}
//                                 className="space-y-4"
//                             >
//                                 {/* Booking Date */}
//                                 <div className="space-y-2">
//                                     <Label htmlFor="date">
//                                         Booking Date
//                                     </Label>

//                                     <Input
//                                         id="date"
//                                         name="date"
//                                         type="date"
//                                         value={form.date}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>

//                                 {/* Starting Time */}
//                                 <div className="space-y-2">
//                                     <Label htmlFor="time">
//                                         Starting Time
//                                     </Label>

//                                     <Input
//                                         id="time"
//                                         name="time"
//                                         type="time"
//                                         value={form.time}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>

//                                 {/* Duration */}
//                                 <div className="space-y-2">
//                                     <Label htmlFor="hours">
//                                         Duration (Hours)
//                                     </Label>

//                                     <Input
//                                         id="hours"
//                                         name="hours"
//                                         type="number"
//                                         min="1"
//                                         value={form.hours}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>

//                                 {/* Guests */}
//                                 <div className="space-y-2">
//                                     <Label htmlFor="guests">
//                                         Number of Guests
//                                     </Label>

//                                     <Input
//                                         id="guests"
//                                         name="guests"
//                                         type="number"
//                                         min="1"
//                                         max={studio?.capacity || undefined}
//                                         value={form.guests}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>

//                                 {/* Guest Name */}
//                                 <div className="space-y-2">
//                                     <Label htmlFor="guestName">
//                                         Your Name
//                                     </Label>

//                                     <Input
//                                         id="guestName"
//                                         name="guestName"
//                                         type="text"
//                                         placeholder="Enter your name"
//                                         value={form.guestName}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>

//                                 {/* Guest Email */}
//                                 <div className="space-y-2">
//                                     <Label htmlFor="guestEmail">
//                                         Your Email
//                                     </Label>

//                                     <Input
//                                         id="guestEmail"
//                                         name="guestEmail"
//                                         type="email"
//                                         placeholder="Enter your email"
//                                         value={form.guestEmail}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>

//                                 {/* Additional Notes */}
//                                 <div className="space-y-2">
//                                     <Label htmlFor="notes">
//                                         Additional Notes
//                                     </Label>

//                                     <Textarea
//                                         id="notes"
//                                         name="notes"
//                                         placeholder="Any special requirements?"
//                                         value={form.notes}
//                                         onChange={handleChange}
//                                     />
//                                 </div>

//                                 {/* Price Breakdown */}
//                                 <div className="space-y-2 rounded-xl border p-4">
//                                     <div className="flex justify-between text-sm">
//                                         <span>Hourly Rate</span>
//                                         <span>৳{hourRate}</span>
//                                     </div>

//                                     <div className="flex justify-between text-sm">
//                                         <span>Duration</span>
//                                         <span>{hours} Hour(s)</span>
//                                     </div>

//                                     <div className="flex justify-between text-sm">
//                                         <span>Deposit</span>
//                                         <span>৳{deposit}</span>
//                                     </div>

//                                     <div className="flex justify-between border-t pt-3 font-bold">
//                                         <span>Total Estimated Price</span>
//                                         <span>৳{totalPrice}</span>
//                                     </div>
//                                 </div>

//                                 {/* Submit Button */}
//                                 <Button
//                                     type="submit"
//                                     disabled={isSubmitting || hasBooked}
//                                     className="w-full bg-[#C2F800] font-bold text-gray-900 hover:bg-[#b3e600]"
//                                 >
//                                     {isSubmitting
//                                         ? "Submitting..."
//                                         : "Confirm Booking"}
//                                 </Button>
//                             </form>
//                         </>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// };

// export default BookingModal;


"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const BookingModal = ({ studio }) => {
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const [hasBooked, setHasBooked] = useState(false);
    const [isCheckingBooking, setIsCheckingBooking] = useState(true);
    const [bookingCheckFailed, setBookingCheckFailed] = useState(false);

    const [form, setForm] = useState({
        date: "",
        time: "",
        hours: "1",
        guests: "1",
        guestName: "",
        guestEmail: "",
        notes: "",
    });

    // Studio ID
    const studioId = String(studio?._id || studio?.id || "");

    // Studio Booking Check
    useEffect(() => {
        if (!studioId) {
            setIsCheckingBooking(false);
            setBookingCheckFailed(true);
            return;
        }

        let isMounted = true;

        const checkBooking = async () => {
            setIsCheckingBooking(true);
            setBookingCheckFailed(false);

            try {
                const res = await fetch(
                    `http://localhost:5000/booking/studio/${studioId}`,
                    {
                        cache: "no-store",
                    }
                );

                if (!res.ok) {
                    throw new Error("Booking check failed!");
                }

                const data = await res.json();

                if (isMounted) {
                    setHasBooked(data.booked);
                }

            } catch (error) {
                console.error("Booking check error:", error);

                if (isMounted) {
                    setBookingCheckFailed(true);
                }

            } finally {
                if (isMounted) {
                    setIsCheckingBooking(false);
                }
            }
        };

        checkBooking();

        return () => {
            isMounted = false;
        };

    }, [studioId]);


    // Booking Button Click
    const handleBookClick = () => {
        if (isCheckingBooking) return;

        if (bookingCheckFailed) {
            toast.error("Unable to check studio availability.");
            return;
        }

        if (hasBooked) {
            toast.error("This studio is already booked!");
            return;
        }

        if (!user) {
            toast.error("Please login to book this studio.");
            return;
        }

        setOpen(true);
    };


    // Modal Open / Close
    const handleOpenChange = (value) => {
        setOpen(value);

        if (!value) {
            setConfirmed(false);
            setIsSubmitting(false);
        }
    };


    // Form Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Submit Booking
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!user) {
            toast.error("Please login to book this studio.");
            return;
        }

        if (hasBooked) {
            toast.error("This studio is already booked!");
            return;
        }

        if (bookingCheckFailed) {
            toast.error("Unable to check studio availability.");
            return;
        }

        if (!studioId) {
            toast.error("Studio information is missing.");
            return;
        }

        setIsSubmitting(true);

        try {
            const data = {
                ...form,
                studioId: studioId,
                userId: user.id || user.email,
                userName: user.name,
                userEmail: user.email,
            };

            const res = await fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {

                // অন্য কেউ আগে Booking করলে
                if (res.status === 409) {
                    setHasBooked(true);
                }

                throw new Error(
                    result.message || "Booking failed!"
                );
            }

            setHasBooked(true);
            setConfirmed(true);

            toast.success("Booking successful!");

        } catch (error) {
            console.error("Booking error:", error);

            toast.error(
                error.message || "Something went wrong!"
            );

        } finally {
            setIsSubmitting(false);
        }
    };


    // Price Calculation
    const hourRate = Number(studio?.hourRate || 0);
    const deposit = Number(studio?.deposit || 0);
    const hours = Number(form.hours || 1);

    const totalPrice = hourRate * hours + deposit;


    return (
        <>
            {/* Booking Button */}
            <Button
                type="button"
                onClick={handleBookClick}
                disabled={
                    isPending ||
                    isCheckingBooking ||
                    bookingCheckFailed ||
                    hasBooked
                }
                className="h-auto w-full gap-2 rounded-xl bg-[#C2F800] px-6 py-4 text-base font-bold text-gray-900 shadow-sm transition hover:bg-[#b3e600] hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <CalendarDays size={19} />

                {isCheckingBooking
                    ? "Checking Availability..."
                    : bookingCheckFailed
                        ? "Availability Unavailable"
                        : hasBooked
                            ? "Currently Unavailable"
                            : "Book Workspace Now"}
            </Button>


            {/* Booking Dialog */}
            <Dialog
                open={open}
                onOpenChange={handleOpenChange}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">

                    {confirmed ? (

                        // Booking Success
                        <div className="py-8 text-center">

                            <div className="mb-4 text-5xl">
                                ✓
                            </div>

                            <DialogHeader>
                                <DialogTitle className="text-center text-2xl">
                                    Booking Successful!
                                </DialogTitle>

                                <DialogDescription className="pt-2 text-center">
                                    Your studio booking has been submitted successfully.
                                </DialogDescription>
                            </DialogHeader>

                            <Button
                                onClick={() => handleOpenChange(false)}
                                className="mt-6 bg-[#C2F800] font-bold text-gray-900 hover:bg-[#b3e600]"
                            >
                                Close
                            </Button>

                        </div>

                    ) : (

                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold">
                                    Book Your Workspace
                                </DialogTitle>

                                <DialogDescription>
                                    Complete the form below to reserve this studio.
                                </DialogDescription>
                            </DialogHeader>


                            {/* Studio Information */}
                            <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">

                                <h3 className="font-semibold">
                                    {studio?.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {studio?.location}
                                </p>

                                <p className="mt-2 text-sm">
                                    Hourly Rate: ৳{hourRate}
                                </p>

                                <p className="text-sm">
                                    Deposit: ৳{deposit}
                                </p>

                            </div>


                            {/* Booking Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >

                                {/* Booking Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="date">
                                        Booking Date
                                    </Label>

                                    <Input
                                        id="date"
                                        name="date"
                                        type="date"
                                        min={new Date().toLocaleDateString("en-CA")}
                                        value={form.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                {/* Starting Time */}
                                <div className="space-y-2">
                                    <Label htmlFor="time">
                                        Starting Time
                                    </Label>

                                    <Input
                                        id="time"
                                        name="time"
                                        type="time"
                                        value={form.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                {/* Duration */}
                                <div className="space-y-2">
                                    <Label htmlFor="hours">
                                        Duration (Hours)
                                    </Label>

                                    <Input
                                        id="hours"
                                        name="hours"
                                        type="number"
                                        min="1"
                                        value={form.hours}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                {/* Guests */}
                                <div className="space-y-2">
                                    <Label htmlFor="guests">
                                        Number of Guests
                                    </Label>

                                    <Input
                                        id="guests"
                                        name="guests"
                                        type="number"
                                        min="1"
                                        max={studio?.capacity || undefined}
                                        value={form.guests}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                {/* Guest Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="guestName">
                                        Your Name
                                    </Label>

                                    <Input
                                        id="guestName"
                                        name="guestName"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={form.guestName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                {/* Guest Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="guestEmail">
                                        Your Email
                                    </Label>

                                    <Input
                                        id="guestEmail"
                                        name="guestEmail"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={form.guestEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                {/* Additional Notes */}
                                <div className="space-y-2">
                                    <Label htmlFor="notes">
                                        Additional Notes
                                    </Label>

                                    <Textarea
                                        id="notes"
                                        name="notes"
                                        placeholder="Any special requirements?"
                                        value={form.notes}
                                        onChange={handleChange}
                                    />
                                </div>


                                {/* Price Breakdown */}
                                <div className="space-y-2 rounded-xl border p-4">

                                    <div className="flex justify-between text-sm">
                                        <span>Hourly Rate</span>
                                        <span>৳{hourRate}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span>Duration</span>
                                        <span>{hours} Hour(s)</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span>Deposit</span>
                                        <span>৳{deposit}</span>
                                    </div>

                                    <div className="flex justify-between border-t pt-3 font-bold">
                                        <span>Total Estimated Price</span>
                                        <span>৳{totalPrice}</span>
                                    </div>

                                </div>


                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        hasBooked ||
                                        isCheckingBooking ||
                                        bookingCheckFailed
                                    }
                                    className="w-full bg-[#C2F800] font-bold text-gray-900 hover:bg-[#b3e600]"
                                >
                                    {isSubmitting
                                        ? "Submitting..."
                                        : "Confirm Booking"}
                                </Button>

                            </form>
                        </>
                    )}

                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookingModal;
