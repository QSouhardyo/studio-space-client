
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import MyBookingsCard from "@/components/dashboard/MyBookingsCard";

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    // User login না থাকলে login page-এ পাঠাবে
    if (!user?.email) {
        redirect("/login");
    }

    let bookings = [];
    let studios = [];

    // User এর booking গুলো আনা
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user.email}`,
            {
                cache: "no-store",
            }
        );

        if (res.ok) {
            const data = await res.json();
            bookings = Array.isArray(data) ? data : [];
        }
    } catch (error) {
        console.log("Failed to fetch bookings:", error);
    }

    // Booking গুলোর studio তথ্য (image, name, location, price) আনা
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
            cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();
            studios = Array.isArray(data) ? data : data.data || [];
        }
    } catch (error) {
        console.log("Failed to fetch studios:", error);
    }

    // Booking গুলোকে Studio দিয়ে join করা + মোট দাম হিসাব করা
    const studioMap = new Map(
        studios.map((studio) => [String(studio._id), studio])
    );

    const enrichedBookings = bookings.map((booking) => {
        const studio = studioMap.get(String(booking.studioId)) || null;

        const hours = Number(booking.hours || 1);
        const hourRate = Number(studio?.hourRate || 0);
        const deposit = Number(studio?.deposit || 0);

        const total = hourRate * hours + deposit;

        return { ...booking, studio, total };
    });

    return <MyBookingsCard bookings={enrichedBookings} />;
};

export default MyBookingsPage;
