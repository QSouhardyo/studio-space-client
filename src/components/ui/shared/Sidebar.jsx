
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    PlusCircle,
    Building2,
    CalendarDays,
    Aperture,
} from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            name: "Add New Studio",
            href: "/dashboard/add-studio",
            icon: PlusCircle,
        },
        {
            name: "My Studio Listings",
            href: "/dashboard/my-listings",
            icon: Building2,
        },
        {
            name: "My Bookings",
            href: "/dashboard/my-bookings",
            icon: CalendarDays,
        },
    ];

    function isActive(href) {
        return pathname === href || pathname.startsWith(href + "/");
    }

    return (
        <aside className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:min-h-[calc(100vh-120px)] lg:w-72">

            {/* Sidebar Header */}
            {/* <div className="mb-7 flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#235b45] text-white">
                    <Aperture size={25} />
                </div>

                <div>
                    <h2 className="font-bold text-gray-900">
                        StudioSpace
                    </h2>

                    <p className="text-xs text-gray-400">
                        Dashboard Menu
                    </p>
                </div>
            </div> */}

            {/* Navigation */}
            <div>
                <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Workspace
                </p>

                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${active
                                    ? "bg-[#235b45] text-white shadow-md shadow-green-900/10"
                                    : "text-gray-600 hover:bg-green-50 hover:text-[#235b45]"
                                    }`}
                            >
                                <Icon size={19} />

                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Sidebar Footer */}
            {/* <div className="mt-10 rounded-xl bg-[#F4F7F5] p-4">
                <p className="text-sm font-bold text-[#235b45]">
                    Create Something Amazing!
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                    Manage your creative spaces and bookings from one place.
                </p>
            </div> */}
        </aside>
    );
}
