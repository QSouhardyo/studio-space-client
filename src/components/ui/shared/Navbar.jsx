
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    UserRound,
    ArrowUpRight,
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
        { name: "About Us", href: "/#about-us" },
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

    // Scroll to Section After Page Load
    useEffect(() => {
        if (pathname !== "/") return;

        const id = window.location.hash.slice(1);

        if (!id) return;

        const timer = setTimeout(() => {
            const section = document.getElementById(id);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [pathname]);

    // Smooth Section Scrolling
    const handleSectionClick = (id) => {
        setMobileOpen(false);

        if (pathname !== "/") {
            window.location.href = `/#${id}`;
            return;
        }

        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            window.history.replaceState(null, "", `/#${id}`);
        }
    };

    // Navigation Click Handler
    const handleNavClick = (e, href) => {
        if (href.includes("#")) {
            e.preventDefault();

            const id = href.split("#")[1];
            handleSectionClick(id);
        } else {
            setMobileOpen(false);
        }
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
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#235b45] shadow-[0_4px_20px_rgba(0,0,0,0.12)]">

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-2.5"
                    onClick={() => setMobileOpen(false)}
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#235b45] shadow-md transition duration-300 group-hover:rotate-6 group-hover:scale-105">
                        <Aperture size={23} strokeWidth={2.2} />
                    </div>

                    <div>
                        <h1 className="text-lg font-black leading-tight tracking-tight text-white sm:text-xl">
                            Studio<span className="text-green-200">Space</span>
                        </h1>

                        <p className="text-[8px] font-bold uppercase tracking-[1.8px] text-white/60">
                            Create without limits
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1 lg:flex">

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="rounded-full px-3.5 py-2 text-[12px] font-semibold text-white/85 transition-all duration-300 hover:bg-white/15 hover:text-white"
                        >
                            {link.name}
                        </Link>
                    ))}

                </div>

                {/* Desktop Auth Section */}
                <div className="hidden items-center gap-2 lg:flex">

                    {isPending ? (
                        <div className="h-9 w-28 animate-pulse rounded-xl bg-white/20" />
                    ) : !isLoggedIn ? (
                        <>
                            <Link
                                href="/login"
                                className="rounded-lg px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="group inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#235b45] shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-lg"
                            >
                                Register

                                <ArrowUpRight
                                    size={15}
                                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>
                        </>
                    ) : (
                        <div className="relative">

                            {/* User Profile Button */}
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                                className={`flex items-center gap-2.5 rounded-xl border px-2.5 py-1.5 transition-all duration-300 ${dropdownOpen
                                    ? "border-white/40 bg-white/20"
                                    : "border-white/20 bg-white/10 hover:border-white/40 hover:bg-white/15"
                                    }`}
                            >
                                {userImage ? (
                                    <img
                                        src={userImage}
                                        alt={userName}
                                        className="h-8 w-8 rounded-full border-2 border-white/40 object-cover"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#235b45]">
                                        {userInitial}
                                    </div>
                                )}

                                <div className="text-left">
                                    <p className="max-w-28 truncate text-xs font-bold text-white">
                                        {userName}
                                    </p>

                                    <p className="text-[10px] font-medium text-white/60">
                                        My Account
                                    </p>
                                </div>

                                <ChevronDown
                                    size={15}
                                    className={`text-white/80 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Desktop Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-2.5 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.18)]">

                                    {/* Profile Header */}
                                    <div className="bg-[#235b45] px-4 py-4">
                                        <div className="flex items-center gap-3">

                                            {userImage ? (
                                                <img
                                                    src={userImage}
                                                    alt={userName}
                                                    className="h-10 w-10 rounded-full border-2 border-white/30 object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 bg-white/15 text-base font-bold text-white">
                                                    {userInitial}
                                                </div>
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-bold text-white">
                                                    {userName}
                                                </p>

                                                <p className="truncate text-[11px] text-white/70">
                                                    {userEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dashboard Links */}
                                    <div className="p-2">

                                        <p className="px-3 py-2 text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
                                            Manage Workspace
                                        </p>

                                        {dashboardLinks.map((link) => {
                                            const Icon = link.icon;
                                            const active = isActive(link.href);

                                            return (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    onClick={() => setDropdownOpen(false)}
                                                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200 ${active
                                                        ? "bg-[#235b45]/10 text-[#235b45]"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-[#235b45]"
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <Icon size={17} />
                                                        {link.name}
                                                    </span>

                                                    {active && (
                                                        <span className="h-1.5 w-1.5 rounded-full bg-[#235b45]" />
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    {/* Logout */}
                                    <div className="border-t border-gray-100 p-2">
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                                        >
                                            <LogOut size={17} />
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
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X size={21} /> : <Menu size={21} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="border-t border-white/10 bg-[#235b45] px-4 py-4 shadow-lg lg:hidden">

                    {/* Mobile Navigation */}
                    <div>
                        <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[1.5px] text-white/50">
                            Main Navigation
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-center text-xs font-semibold text-white transition-all hover:bg-white/20"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="my-4 border-t border-white/15" />

                    {/* Mobile Auth Section */}
                    {isPending ? (
                        <div className="h-10 animate-pulse rounded-xl bg-white/20" />
                    ) : !isLoggedIn ? (
                        <div className="grid grid-cols-2 gap-2">

                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl border border-white/30 py-2.5 text-center text-xs font-bold text-white transition hover:bg-white/10"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl bg-white py-2.5 text-center text-xs font-bold text-[#235b45] transition hover:bg-green-50"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div>

                            {/* Mobile User Information */}
                            <div className="mb-4 rounded-xl border border-white/15 bg-white/10 p-3">
                                <div className="flex items-center gap-3">

                                    {userImage ? (
                                        <img
                                            src={userImage}
                                            alt={userName}
                                            className="h-10 w-10 rounded-full border-2 border-white/30 object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-bold text-[#235b45]">
                                            {userInitial}
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-bold text-white">
                                            {userName}
                                        </p>

                                        <p className="truncate text-[11px] text-white/60">
                                            {userEmail}
                                        </p>

                                        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-green-200">
                                            StudioSpace Member
                                        </p>
                                    </div>

                                    <UserRound
                                        size={18}
                                        className="shrink-0 text-white/60"
                                    />
                                </div>
                            </div>

                            {/* Mobile Dashboard Links */}
                            <div>
                                <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[1.5px] text-white/50">
                                    My Workspace
                                </p>

                                <div className="grid grid-cols-2 gap-2">
                                    {dashboardLinks.map((link) => {
                                        const Icon = link.icon;
                                        const active = isActive(link.href);

                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setMobileOpen(false)}
                                                className={`flex items-center gap-2 rounded-xl border px-2.5 py-2.5 text-[11px] font-semibold transition-all sm:text-xs ${active
                                                    ? "border-white/40 bg-white/15 text-white"
                                                    : "border-white/10 bg-white/10 text-white hover:bg-white/20"
                                                    }`}
                                            >
                                                <Icon size={16} className="shrink-0" />
                                                <span>{link.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile Logout */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200/20 bg-red-500/10 py-2.5 text-xs font-semibold text-red-100 transition hover:bg-red-500/20"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
