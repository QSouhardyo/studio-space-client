
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { ArrowRight, Camera, Mic2, Music2 } from "lucide-react";

const slides = [
    {
        eyebrow: "YOUR SPACE. YOUR STORY.",
        title: "Find the Perfect Space to Create Something Amazing.",
        description:
            "Discover inspiring photography studios, podcast rooms and creative spaces for your next big project.",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=90",
        icon: Camera,
    },
    {
        eyebrow: "CREATE WITHOUT LIMITS",
        title: "Big Ideas Deserve Extraordinary Spaces.",
        description:
            "From professional sound stages to cozy podcast rooms, find everything you need to bring your vision to life.",
        image:
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=90",
        icon: Mic2,
    },
    {
        eyebrow: "SHARE YOUR CREATIVE SPACE",
        title: "Turn Your Studio Into an Opportunity.",
        description:
            "List your creative workspace, connect with talented creators and earn by sharing your space.",
        image:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=2000&q=90",
        icon: Music2,
    },
];

const HomeSlider = () => {
    return (
        <section className="relative">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="home-hero-swiper"
            >
                {slides.map((slide, index) => {
                    const SlideIcon = slide.icon;

                    return (
                        <SwiperSlide key={index}>
                            <div
                                className="relative flex min-h-[560px] items-center bg-cover bg-center md:min-h-[680px]"
                                style={{
                                    backgroundImage: `url("${slide.image}")`,
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

                                <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
                                    <div className="max-w-3xl text-white">
                                        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C2F800]/40 bg-[#C2F800]/10 px-4 py-2 text-xs font-bold tracking-widest text-[#C2F800]">
                                            <SlideIcon size={16} />
                                            {slide.eyebrow}
                                        </span>

                                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                                            {slide.title}
                                        </h1>

                                        <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-200 md:text-lg md:leading-8">
                                            {slide.description}
                                        </p>

                                        <div className="mt-9 flex flex-wrap gap-4">
                                            <Link
                                                href="/studios"
                                                className="inline-flex items-center gap-2 rounded-xl bg-[#C2F800] px-6 py-4 text-sm font-bold text-gray-900 transition hover:bg-[#b3e600]"
                                            >
                                                Explore Studios
                                                <ArrowRight size={18} />
                                            </Link>

                                            <Link
                                                href="/studios"
                                                className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900"
                                            >
                                                Host Your Space
                                                <ArrowRight size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <style jsx global>{`
                .home-hero-swiper .swiper-pagination {
                    bottom: 28px !important;
                }

                .home-hero-swiper .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: white;
                    opacity: 0.6;
                }

                .home-hero-swiper .swiper-pagination-bullet-active {
                    width: 28px;
                    border-radius: 10px;
                    background: #c2f800;
                    opacity: 1;
                }
            `}</style>
        </section>
    );
};

export default HomeSlider;
