
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
    Aperture,
    Menu,
    X,
    ChevronDown,
    LayoutDashboard,
    PlusCircle,
    Building2,
    CalendarDays,
    LogOut,
} from "lucide-react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const pathname = usePathname();

    // Better Auth Session
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;
    const isLoggedIn = !!user;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Explore Studios", href: "/studios" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "About Us", href: "/about" },
    ];

    const dashboardLinks = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
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

    // Active Route Check
    const isActive = (href) => {
        if (href === "/") {
            return pathname === "/";
        }

        if (href.includes("#")) {
            return false;
        }

        return pathname === href || pathname.startsWith(href + "/");
    };

    // Logout
    const handleLogout = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "Logout failed!");
                return;
            }

            setDropdownOpen(false);
            setMobileOpen(false);

            toast.success("Logout successful!");
        } catch (error) {
            toast.error(error?.message || "Something went wrong!");
        }
    };

    // User Information
    const userName = user?.name || "User";
    const userEmail = user?.email || "";
    const userImage = user?.image || "";
    const userInitial = userName?.charAt(0)?.toUpperCase() || "U";

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5"
                    onClick={() => setMobileOpen(false)}
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#235b45] text-white">
                        <Aperture size={27} strokeWidth={2.2} />
                    </div>

                    <div>
                        <h1 className="text-xl font-black tracking-tight text-gray-900">
                            Studio<span className="text-[#235b45]">Space</span>
                        </h1>

                        <p className="text-[10px] font-semibold uppercase tracking-[2px] text-gray-400">
                            Create without limits
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`relative py-2 text-sm font-semibold transition ${isActive(link.href)
                                ? "text-[#235b45]"
                                : "text-gray-600 hover:text-[#235b45]"
                                }`}
                        >
                            {link.name}

                            {isActive(link.href) && (
                                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#235b45]" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth Section */}
                <div className="hidden items-center gap-3 lg:flex">

                    {isPending ? (
                        <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
                    ) : !isLoggedIn ? (
                        <>
                            <Link
                                href="/login"
                                className="rounded-xl px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-100"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-xl bg-[#235b45] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#194532]"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="relative">

                            {/* User Profile Button */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 transition hover:bg-gray-50"
                            >
                                {userImage ? (
                                    <img
                                        src={userImage}
                                        alt={userName}
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#235b45] font-bold text-white">
                                        {userInitial}
                                    </div>
                                )}

                                <div className="text-left">
                                    <p className="max-w-28 truncate text-sm font-bold text-gray-800">
                                        {userName}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        My Account
                                    </p>
                                </div>

                                <ChevronDown
                                    size={16}
                                    className={`text-gray-500 transition ${dropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Desktop Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">

                                    <div className="border-b border-gray-100 px-5 py-3">
                                        <p className="font-bold text-gray-900">
                                            {userName}
                                        </p>

                                        <p className="truncate text-xs text-gray-500">
                                            {userEmail}
                                        </p>
                                    </div>

                                    <div className="py-2">
                                        {dashboardLinks.map((link) => {
                                            const Icon = link.icon;

                                            return (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    onClick={() => setDropdownOpen(false)}
                                                    className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition ${isActive(link.href)
                                                        ? "bg-green-50 text-[#235b45]"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-[#235b45]"
                                                        }`}
                                                >
                                                    <Icon size={18} />
                                                    {link.name}
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    <div className="border-t border-gray-100 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {mobileOpen ? <X size={25} /> : <Menu size={25} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg lg:hidden">

                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive(link.href)
                                    ? "bg-green-50 text-[#235b45]"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="my-4 border-t border-gray-100" />

                    {/* Mobile Auth Section */}
                    {isPending ? (
                        <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
                    ) : !isLoggedIn ? (
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl border border-gray-200 py-3 text-center text-sm font-bold text-gray-700"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl bg-[#235b45] py-3 text-center text-sm font-bold text-white"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div>

                            {/* Mobile User Information */}
                            <div className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 p-4">

                                {userImage ? (
                                    <img
                                        src={userImage}
                                        alt={userName}
                                        className="h-11 w-11 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#235b45] font-bold text-white">
                                        {userInitial}
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="truncate font-bold text-gray-900">
                                        {userName}
                                    </p>

                                    <p className="truncate text-xs text-gray-500">
                                        {userEmail}
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Dashboard Links */}
                            <div className="flex flex-col gap-1">
                                {dashboardLinks.map((link) => {
                                    const Icon = link.icon;

                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive(link.href)
                                                ? "bg-green-50 text-[#235b45]"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-[#235b45]"
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {link.name}
                                        </Link>
                                    );
                                })}

                                {/* Mobile Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
