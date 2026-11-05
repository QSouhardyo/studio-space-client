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

import HomeSlider from "@/components/home/HomeSlider";
import StudioCard from "@/components/studio/StudioCard";

// Studio Categories
const categories = [
  {
    name: "Photo Studio",
    value: "Photo Studio",
    description: "Perfect lighting and backdrops for every shot.",
    icon: Camera,
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Film Stage",
    value: "Film Stage",
    description: "Professional spaces for film and video production.",
    icon: Clapperboard,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Podcast Lounge",
    value: "Podcast Lounge",
    description: "Create your next great conversation.",
    icon: Mic2,
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Music Suite",
    value: "Music Suite",
    description: "Make music in a space built for sound.",
    icon: Music2,
    color: "bg-pink-100 text-pink-700",
  },
  {
    name: "Workshop",
    value: "Workshop",
    description: "Find room to experiment and create.",
    icon: Palette,
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Other",
    value: "other",
    description: "Discover other unique creative workspaces.",
    icon: CircleHelp,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const bookingSteps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore creative studios and find a space that matches your project.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date, time and the number of hours you need.",
    icon: Clock,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Send your booking request and manage your reservation with ease.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Show up, get creative and turn your ideas into something amazing.",
    icon: Video,
  },
];

const guarantees = [
  {
    title: "Liability Protection",
    description:
      "Clear booking policies and protection guidelines help make every experience more reliable.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Profiles",
    description:
      "Connect with creators and hosts through transparent profile information.",
    icon: UserCheck,
  },
  {
    title: "Equipment Safety",
    description:
      "Review studio facilities and equipment details before confirming your booking.",
    icon: Wrench,
  },
  {
    title: "24/7 Host Support",
    description:
      "Get assistance with your booking and communicate with hosts when you need help.",
    icon: Headphones,
  },
];

const Home = async () => {
  let studios = [];

  try {
    const res = await fetch("http://localhost:5000/featured-studios", {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      studios = Array.isArray(data) ? data : data.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch featured studios:", error);
  }

  return (
    <main className="min-h-screen bg-[#F8F9F6]">
      {/* Hero Slider */}
      <HomeSlider />

      {/* Featured Studios */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#C2F800]/20 px-4 py-2 text-xs font-bold text-gray-800">
              <Sparkles size={15} />
              HANDPICKED SPACES
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Featured Studios
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
              Discover some of the most inspiring creative spaces
              available for your next project.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 transition hover:text-[#7c9f00]"
          >
            Explore All Studios
            <ArrowRight size={18} />
          </Link>
        </div>

        {studios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2F800]/20">
              <Camera size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              No Featured Studios Yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              New creative spaces will appear here soon.
            </p>

            <Link
              href="/studios"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C2F800] px-5 py-3 text-sm font-bold text-gray-900 hover:bg-[#b3e600]"
            >
              Browse All Studios
              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </section>

      {/* Browse Categories */}
      <section className="border-y border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-[#C2F800]/20 px-4 py-2 text-xs font-bold text-gray-800">
              FIND YOUR CREATIVE SPACE
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Explore by Category
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-base">
              Whatever you create, there is a perfect space
              waiting for you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const CategoryIcon = category.icon;

              return (
                <Link
                  key={category.value}
                  href={`/studios?category=${encodeURIComponent(category.value)}`}
                  className="group rounded-2xl border border-gray-100 bg-[#F8F9F6] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C2F800] hover:bg-white hover:shadow-lg"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.color}`}
                  >
                    <CategoryIcon size={27} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {category.name}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-gray-800 transition group-hover:text-[#7c9f00]">
                    Explore
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Booking Works */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-[#C2F800]/20 px-4 py-2 text-xs font-bold text-gray-800">
            SIMPLE & EASY
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            How Booking Works
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500 md:text-base">
            Your next creative project is just four simple steps
            away.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bookingSteps.map((step) => {
            const StepIcon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-gray-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C2F800]/20 text-gray-900">
                    <StepIcon size={27} />
                  </div>

                  <span className="text-4xl font-extrabold text-gray-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Host Guarantee & Creator Support */}
      <section className="bg-[#172B23] py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C2F800]/30 bg-[#C2F800]/10 px-4 py-2 text-xs font-bold text-[#C2F800]">
              <ShieldCheck size={16} />
              CREATE WITH CONFIDENCE
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
              Your Creativity Deserves a
              <span className="text-[#C2F800]"> Safe Space.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
              We believe great creative experiences start with
              trust. StudioSpace helps hosts and creators connect
              through a more transparent and supportive booking
              experience.
            </p>

            <Link
              href="/studios"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C2F800] px-6 py-4 text-sm font-bold text-gray-900 transition hover:bg-[#b3e600]"
            >
              Find Your Studio
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {guarantees.map((item) => {
              const GuaranteeIcon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-[#C2F800]/40 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C2F800]/15 text-[#C2F800]">
                    <GuaranteeIcon size={25} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F8F9F6] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#C2F800] px-6 py-14 text-center md:px-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Ready to Bring Your Ideas to Life?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-800 md:text-base">
            Find your ideal creative workspace or share your studio
            with a community of passionate creators.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              Explore Studios
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-900/30 px-6 py-4 text-sm font-bold text-gray-900 transition hover:bg-white/40"
            >
              Host Your Space
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;