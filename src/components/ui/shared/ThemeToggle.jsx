"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="btn btn-circle btn-ghost" disabled>
                🌙
            </button>
        );
    }

    return (
        <button
            onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
            }}
            className="btn btn-circle btn-ghost text-xl"
            aria-label="Toggle dark mode"
            title="Toggle theme"
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}
