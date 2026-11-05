
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

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
    Moon,
    Sun,
} from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const { theme, setTheme } = useTheme();

    const [mobileMenu, setMobileMenu] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Theme এবং Auth Session
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Navigation Links
    const navLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Explore Studios",
            href: "/studios",
        },
        {
            name: "How It Works",
            href: "/#how-it-works",
        },
        {
            name: "About Us",
            href: "/#about-us",
        },
    ];

    // Dashboard Links
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

    const user = session?.user;

    // Active Route Check
    const isActive = (href) => {
        if (href.includes("#")) return false;

        if (href === "/") {
            return pathname === "/";
        }

        return pathname === href || pathname.startsWith(href + "/");
    };

    // Logout Function
    const handleLogout = async () => {
        try {
            await authClient.signOut();

            toast.success("Logged out successfully!");

            setProfileMenu(false);
            setMobileMenu(false);

            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    // Theme Toggle
    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Close mobile menu
    const closeMobileMenu = () => {
        setMobileMenu(false);
    };

    // Smooth scrolling
    const handleHashClick = (href) => {
        if (!href.includes("#")) return;

        setMobileMenu(false);

        const [page, section] = href.split("#");

        if (pathname === page || (page === "" && pathname === "/")) {
            setTimeout(() => {
                document.getElementById(section)?.scrollIntoView({
                    behavior: "smooth",
                });
            }, 100);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-gray-800 dark:bg-[#101c17]/95">

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex shrink-0 items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#235b45] text-white">
                        <Aperture size={25} />
                    </div>

                    <span className="text-xl font-bold text-[#163d30] dark:text-white">
                        Studio<span className="text-[#235b45] dark:text-green-400">Space</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => handleHashClick(link.href)}
                            className={`relative py-3 text-sm font-semibold transition ${isActive(link.href)
                                    ? "text-[#235b45] dark:text-green-400"
                                    : "text-gray-600 hover:text-[#235b45] dark:text-gray-300 dark:hover:text-green-400"
                                }`}
                        >
                            {link.name}

                            {isActive(link.href) && (
                                <span className="absolute bottom-1 left-0 h-0.5 w-full rounded-full bg-[#235b45] dark:bg-green-400" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={handleThemeToggle}
                            aria-label="Toggle theme"
                            title={theme === "dark" ? "Light Mode" : "Dark Mode"}
                            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-[#235b45] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400"
                        >
                            {theme === "dark" ? (
                                <Sun size={21} />
                            ) : (
                                <Moon size={21} />
                            )}
                        </button>
                    )}

                    {/* Authentication Loading */}
                    {isPending ? (
                        <div className="hidden h-9 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 sm:block" />
                    ) : user ? (

                        /* Logged In User */
                        <div className="relative hidden sm:block">

                            <button
                                onClick={() => setProfileMenu(!profileMenu)}
                                className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt="Profile"
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#235b45] font-bold text-white">
                                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                )}

                                <span className="max-w-24 truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    {user.name || "User"}
                                </span>

                                <ChevronDown
                                    size={16}
                                    className={`text-gray-500 transition ${profileMenu ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Profile Dropdown */}
                            {profileMenu && (
                                <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-[#1a2923]">

                                    <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-700">
                                        <p className="truncate text-sm font-bold text-gray-800 dark:text-white">
                                            {user.name}
                                        </p>

                                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div className="p-2">
                                        {dashboardLinks.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setProfileMenu(false)}
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-[#235b45] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400"
                                                >
                                                    <Icon size={17} />
                                                    {item.name}

                                                    {item.href === "/dashboard" && (
                                                        <ArrowUpRight
                                                            size={15}
                                                            className="ml-auto"
                                                        />
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    <div className="border-t border-gray-100 p-2 dark:border-gray-700">
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                                        >
                                            <LogOut size={17} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (

                        /* Logged Out User */
                        <div className="hidden items-center gap-3 sm:flex">
                            <Link
                                href="/login"
                                className="px-3 py-2 text-sm font-semibold text-gray-700 transition hover:text-[#235b45] dark:text-gray-200 dark:hover:text-green-400"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-lg bg-[#235b45] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#194633]"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        aria-label="Toggle menu"
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 lg:hidden"
                    >
                        {mobileMenu ? (
                            <X size={25} />
                        ) : (
                            <Menu size={25} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {mobileMenu && (
                <div className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg dark:border-gray-800 dark:bg-[#101c17] lg:hidden">

                    <div className="flex flex-col gap-1">

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => {
                                    handleHashClick(link.href);
                                    closeMobileMenu();
                                }}
                                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${isActive(link.href)
                                        ? "bg-green-50 text-[#235b45] dark:bg-green-950/30 dark:text-green-400"
                                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile User Details */}
                    {!isPending && user && (
                        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">

                            <div className="mb-3 flex items-center gap-3 px-3">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#235b45] font-bold text-white">
                                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-gray-800 dark:text-white">
                                        {user.name}
                                    </p>

                                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                {dashboardLinks.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-[#235b45] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400"
                                        >
                                            <Icon size={18} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            <button
                                onClick={handleLogout}
                                className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}

                    {/* Mobile Logged Out Buttons */}
                    {!isPending && !user && (
                        <div className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                            <Link
                                href="/login"
                                onClick={closeMobileMenu}
                                className="rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:border-gray-700 dark:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                onClick={closeMobileMenu}
                                className="rounded-lg bg-[#235b45] px-4 py-3 text-center text-sm font-semibold text-white"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
