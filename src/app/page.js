import Link from "next/link";

import {
  ArrowRight,
  Camera,
  Clapperboard,
  Mic2,
  Music2,
  Palette,
  Search,
  CalendarCheck,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Headphones,
  Wrench,
  Clock,
  Video,
  CircleHelp,
} from "lucide-react";


import StudioCard from "@/components/studio/StudioCard";
import HomeSlider from "@/components/home/HomeSlider";


// Studio Categories
const categories = [
  {
    name: "Photo Studio",
    icon: Camera,
    description: "Perfect spaces for photography",
  },
  {
    name: "Film Stage",
    icon: Clapperboard,
    description: "Professional filmmaking spaces",
  },
  {
    name: "Podcast Lounge",
    icon: Mic2,
    description: "Create your next podcast",
  },
  {
    name: "Music Suite",
    icon: Music2,
    description: "Spaces for music production",
  },
  {
    name: "Workshop",
    icon: Palette,
    description: "Creative art and workshop spaces",
  },
  {
    name: "Other",
    icon: CircleHelp,
    description: "Explore more creative spaces",
  },
];

// Booking Steps
const bookingSteps = [
  {
    icon: Search,
    title: "Find Your Space",
    description:
      "Explore creative studios and find the perfect space for your project.",
  },
  {
    icon: CalendarCheck,
    title: "Book Your Slot",
    description:
      "Choose your preferred date and time and submit your booking request.",
  },
  {
    icon: ShieldCheck,
    title: "Confirm & Pay",
    description:
      "Enjoy a transparent booking process with clear pricing and details.",
  },
  {
    icon: Video,
    title: "Create Something Amazing",
    description:
      "Show up, get creative, and bring your ideas to life.",
  },
];

// StudioSpace Guarantees
const guarantees = [
  {
    icon: ShieldCheck,
    title: "Trusted Spaces",
    description:
      "Discover creative spaces with transparent information and reliable hosts.",
  },
  {
    icon: UserCheck,
    title: "Creator Friendly",
    description:
      "A platform designed to make the creative experience simple and convenient.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "We are here to help make your studio booking experience easier.",
  },
  {
    icon: Clock,
    title: "Flexible Booking",
    description:
      "Find available spaces and book according to your schedule.",
  },
];

// Home Component
const Home = async () => {
  let featuredStudios = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/featured-studios`);

    if (response.ok) {
      featuredStudios = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch featured studios:", error);
  }

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <HomeSlider />

      {/* Featured Studios Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="rounded-full bg-[#C2F800]/20 px-4 py-2 text-xs font-bold text-gray-800">
              EXPLORE OUR COLLECTION
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Featured <span className="text-[#91b900]">Studios</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
              Discover handpicked creative spaces designed to bring your
              ideas and projects to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#235b45] transition hover:gap-3"
          >
            Explore All Studios
            <ArrowRight size={18} />
          </Link>
        </div>

        {featuredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredStudios.slice(0, 6).map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
            <Camera className="mx-auto text-gray-400" size={40} />

            <h3 className="mt-4 text-lg font-bold text-gray-800">
              No Featured Studios Yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              New creative spaces will appear here soon.
            </p>
          </div>
        )}
      </section>

      {/* About Us Section */}
      <section
        id="about-us"
        className="scroll-mt-24 border-y border-gray-100 bg-white py-20"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
          {/* About Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900"
              alt="Creative Studio Workspace"
              className="h-[350px] w-full rounded-3xl object-cover md:h-[480px]"
            />

            <div className="absolute -bottom-6 right-5 rounded-2xl bg-[#C2F800] p-5 shadow-xl md:right-8">
              <p className="text-3xl font-extrabold text-gray-900">
                100%
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-800">
                Creative Freedom
              </p>
            </div>
          </div>

          {/* About Content */}
          <div className="pt-5 lg:pt-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C2F800]/20 px-4 py-2 text-xs font-bold text-gray-800">
              <Sparkles size={15} />
              ABOUT STUDIOSPACE
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
              A Space Where{" "}
              <span className="text-[#91b900]">Creativity</span> Comes to
              Life.
            </h2>

            <p className="mt-6 text-sm leading-8 text-gray-500 md:text-base">
              StudioSpace is a creative workspace sharing platform
              designed to connect talented creators with inspiring
              production spaces. Whether you are a photographer,
              filmmaker, podcaster, musician, or artist, we help you
              find the perfect environment to bring your ideas to life.
            </p>

            <p className="mt-4 text-sm leading-8 text-gray-500 md:text-base">
              We also empower studio owners to share their spaces,
              reach new audiences, and turn their unused creative
              spaces into valuable opportunities. Our goal is to make
              discovering, booking, and sharing creative workspaces
              simple, transparent, and accessible for everyone.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Our Mission
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Making creative spaces accessible to everyone.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Our Vision
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Building a connected community of creators.
                </p>
              </div>
            </div>

            <Link
              href="/studios"
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#C2F800] px-6 py-4 text-sm font-bold text-gray-900 transition hover:bg-[#b3e600]"
            >
              Discover Our Studios
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="text-center">
          <span className="rounded-full bg-[#C2F800]/20 px-4 py-2 text-xs font-bold text-gray-800">
            EXPLORE BY CATEGORY
          </span>

          <h2 className="mt-5 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Find Your Perfect{" "}
            <span className="text-[#91b900]">Creative Space</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            From photography studios to professional recording suites,
            discover a space that matches your creative vision.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/studios?category=${encodeURIComponent(category.name)}`}
                className="group rounded-2xl border border-gray-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C2F800] hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C2F800]/20 text-[#235b45] transition group-hover:bg-[#C2F800]">
                  <Icon size={27} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#235b45]">
                  Explore Category

                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-[#172B23] py-20"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <span className="rounded-full bg-[#C2F800]/15 px-4 py-2 text-xs font-bold text-[#C2F800]">
              SIMPLE BOOKING PROCESS
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-white md:text-4xl">
              How StudioSpace{" "}
              <span className="text-[#C2F800]">Works</span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
              Finding and booking your ideal creative workspace has
              never been easier. Follow these simple steps.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {bookingSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C2F800] text-[#172B23]">
                      <Icon size={26} />
                    </div>

                    <span className="text-4xl font-extrabold text-white/10">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="text-center">
          <span className="rounded-full bg-[#C2F800]/20 px-4 py-2 text-xs font-bold text-gray-800">
            WHY CHOOSE US
          </span>

          <h2 className="mt-5 text-3xl font-extrabold text-gray-900 md:text-4xl">
            A Better Experience for{" "}
            <span className="text-[#91b900]">Everyone</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            We make creative space sharing easier for both studio
            owners and creators.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-7 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2F800]/20 text-[#235b45]">
                  <Icon size={30} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#235b45] px-6 py-16 text-center md:px-12">
          <Wrench
            size={35}
            className="mx-auto text-[#C2F800]"
          />

          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold text-white md:text-5xl">
            Ready to Bring Your Creative Ideas to Life?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-200 md:text-base">
            Discover inspiring creative spaces or share your own
            studio with a growing community of creators.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/studios"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2F800] px-7 py-4 text-sm font-bold text-gray-900 transition hover:bg-[#b3e600]"
            >
              Explore Studios
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/dashboard/add-studio"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
            >
              List Your Studio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;