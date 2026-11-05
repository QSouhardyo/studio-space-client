
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    PlusCircle,
    Building2,
    CalendarDays,
    Aperture,
    ArrowUpRight,
    Sparkles,
    LayoutDashboard,
} from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            name: "Add New Studio",
            href: "/dashboard/add-studio",
            icon: PlusCircle,
            description: "Create a studio listing",
        },
        {
            name: "My Studio Listings",
            href: "/dashboard/my-listings",
            icon: Building2,
            description: "Manage your studios",
        },
        {
            name: "My Bookings",
            href: "/dashboard/my-bookings",
            icon: CalendarDays,
            description: "Track your reservations",
        },
    ];

    function isActive(href) {
        return pathname === href || pathname.startsWith(href + "/");
    }

    return (
        <aside className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_8px_35px_rgba(0,0,0,0.05)] lg:min-h-[calc(100vh-120px)] lg:w-72">



            {/* Navigation */}
            <div className="p-3 sm:p-4 lg:p-5">

                <div className="mb-3 hidden items-center justify-between px-2 lg:flex">
                    <p className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-gray-400">
                        Menu
                    </p>

                    <span className="rounded-md bg-green-50 px-2 py-1 text-[9px] font-bold text-[#235b45]">
                        03 ITEMS
                    </span>
                </div>

                <nav className="flex flex-row gap-2 lg:flex-col">

                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border px-2 py-3 text-center transition-all duration-300 sm:flex-row sm:justify-start sm:gap-3 sm:px-3 lg:px-3.5 lg:py-3.5 ${active
                                    ? "border-[#235b45] bg-gradient-to-r from-[#235b45] to-[#34765b] text-white shadow-[0_6px_18px_rgba(35,91,69,0.22)]"
                                    : "border-gray-100 bg-white text-gray-600 hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50/70 hover:shadow-md"
                                    }`}
                            >

                                {/* Active Background Decoration */}
                                {active && (
                                    <>
                                        <span className="absolute -right-5 -top-7 h-20 w-20 rounded-full bg-white/5" />
                                        <span className="absolute bottom-0 left-0 top-0 hidden w-1 rounded-r-full bg-green-200 lg:block" />
                                    </>
                                )}

                                {/* Icon */}
                                <div
                                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${active
                                        ? "bg-white/15 text-white shadow-inner"
                                        : "bg-green-50 text-[#235b45] group-hover:scale-110 group-hover:bg-[#235b45] group-hover:text-white"
                                        }`}
                                >
                                    <Icon size={20} strokeWidth={2} />
                                </div>

                                {/* Text */}
                                <div className="relative z-10 min-w-0 flex-1 sm:text-left">
                                    <p className={`text-[10px] font-bold leading-tight sm:text-xs lg:text-[13px] ${active ? "text-white" : "text-gray-700 group-hover:text-[#235b45]"
                                        }`}>
                                        {item.name}
                                    </p>

                                    <p className={`mt-1 hidden text-[10px] leading-tight lg:block ${active ? "text-green-100/70" : "text-gray-400"
                                        }`}>
                                        {item.description}
                                    </p>
                                </div>

                                {/* Active Badge / Arrow */}
                                <div className="relative z-10 hidden sm:block">
                                    {active ? (
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                                            <ArrowUpRight size={14} className="text-white" />
                                        </span>
                                    ) : (
                                        <ArrowUpRight
                                            size={15}
                                            className="text-gray-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#235b45]"
                                        />
                                    )}
                                </div>

                            </Link>
                        );
                    })}

                </nav>





            </div>
        </aside>
    );
}
