
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#163d30] text-white">
            <div className="mx-auto max-w-7xl px-5 py-14">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#235b45]">
                                <span className="text-2xl font-bold">S</span>
                            </div>

                            <span className="text-xl font-bold">
                                Studio<span className="text-green-300">Space</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
                            Empowering creators with inspiring spaces.
                            Discover, book, and share creative studios
                            all in one place.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            <a href="#" aria-label="Facebook"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold transition hover:bg-white hover:text-[#235b45]">
                                f
                            </a>

                            <a href="#" aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold transition hover:bg-white hover:text-[#235b45]">
                                ◎
                            </a>

                            <a href="#" aria-label="X"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg font-bold transition hover:bg-white hover:text-[#235b45]">
                                𝕏
                            </a>

                            <a href="#" aria-label="LinkedIn"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold transition hover:bg-white hover:text-[#235b45]">
                                in
                            </a>

                            <a href="#" aria-label="YouTube"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold transition hover:bg-white hover:text-[#235b45]">
                                ▶
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-base font-bold">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-sm text-white/65">
                            <li><Link href="/" className="transition hover:text-green-300">Home</Link></li>
                            <li><Link href="/studios" className="transition hover:text-green-300">Explore Studios</Link></li>
                            <li><Link href="/dashboard" className="transition hover:text-green-300">Dashboard</Link></li>
                            <li><Link href="/login" className="transition hover:text-green-300">Sign In</Link></li>
                            <li><Link href="/register" className="transition hover:text-green-300">Create Account</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-5 text-base font-bold">
                            Popular Categories
                        </h3>

                        <ul className="space-y-3 text-sm text-white/65">
                            <li><Link href="/studios" className="transition hover:text-green-300">Photography Studios</Link></li>
                            <li><Link href="/studios" className="transition hover:text-green-300">Podcast Studios</Link></li>
                            <li><Link href="/studios" className="transition hover:text-green-300">Music Studios</Link></li>
                            <li><Link href="/studios" className="transition hover:text-green-300">Film & Production</Link></li>
                            <li><Link href="/studios" className="transition hover:text-green-300">Art Workshops</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="mb-5 text-base font-bold">
                            Stay Inspired
                        </h3>

                        <p className="mb-4 text-sm leading-6 text-white/65">
                            Subscribe to get updates about new studios,
                            creative spaces, and special offers.
                        </p>

                        <form className="flex overflow-hidden rounded-lg bg-white">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email address"
                                className="min-w-0 flex-1 px-3 py-3 text-sm text-gray-800 outline-none"
                                required
                            />

                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="bg-[#235b45] px-4 text-xl text-white transition hover:bg-[#194633]"
                            >
                                →
                            </button>
                        </form>

                        <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                            ✉ Stay connected with us.
                        </p>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-12 border-t border-white/15 pt-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

                        <p className="text-xs text-white/50">
                            © {new Date().getFullYear()} StudioSpace. All rights reserved.
                        </p>

                        <div className="flex gap-5 text-xs text-white/60">
                            <Link href="/terms" className="transition hover:text-green-300">
                                Terms & Conditions
                            </Link>

                            <Link href="/privacy" className="transition hover:text-green-300">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
