
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


import MyListingsCard from "@/components/dashboard/MyListingsCard";

const MyListingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    // User login না থাকলে login page-এ পাঠাবে
    if (!user?.email) {
        redirect("/login");
    }

    let myLists = [];

    try {
        const res = await fetch(
            `http://localhost:5000/my-listings/${user.email}`,
            {
                cache: "no-store",
            }
        );

        if (res.ok) {
            myLists = await res.json();
        }
    } catch (error) {
        console.log("Failed to fetch listings:", error);
    }

    return (
        <MyListingsCard myLists={myLists} />
    );
};

export default MyListingsPage;
