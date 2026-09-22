import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Globe2,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Search visibility",
    description:
      "Give search engines accurate and structured information about your business.",
  },
  {
    icon: Bot,
    title: "AI visibility",
    description:
      "Help AI assistants understand your services, locations, hours and business knowledge.",
  },
  {
    icon: Globe2,
    title: "One trusted profile",
    description:
      "Manage your important business information from one central place.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your business profile",
    description:
      "Add your business identity, contact information and locations.",
  },
  {
    number: "02",
    title: "Add useful content",
    description:
      "Publish services, products, opening hours, media and frequently asked questions.",
  },
  {
    number: "03",
    title: "Connect and measure",
    description:
      "Install the Vizo script and monitor how people and platforms find your business.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="text-3xl font-black tracking-tight text-[#12204a]"
          >
            vizo<span className="text-blue-600">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              How it works
            </a>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Get started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#f7f9ff]">
        <div className="absolute -left-32 top-20 size-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.08fr_0.92fr] lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
              <Sparkles size={16} />
              Be visible where customers search
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.06] tracking-[-0.045em] text-[#12204a] sm:text-6xl lg:text-7xl">
              Make your business{" "}
              <span className="text-blue-600">easy to discover.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Vizo helps customers, search engines and AI assistants find and
              understand accurate information about your business.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Create your profile
                <ArrowRight size={18} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-13 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                See how it works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
              {[
                "Free plan available",
                "No technical skills required",
                "Setup in minutes",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-950/10 sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm text-slate-500">Business visibility</p>
                  <p className="mt-1 text-xl font-bold text-slate-950">
                    Kigali Coffee House
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  Published
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ["Profile", "92%"],
                  ["AI ready", "Yes"],
                  ["Locations", "3"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-xl font-bold text-slate-950">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-[#12204a] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-200">Visibility score</p>
                    <p className="mt-1 text-4xl font-bold">88</p>
                  </div>
                  <div className="grid size-14 place-items-center rounded-2xl bg-blue-500">
                    <Search size={25} />
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[88%] rounded-full bg-blue-400" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Business profile is complete",
                  "Structured data is active",
                  "Vizo Connect script is installed",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3"
                  >
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span className="text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-7 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">AI access</p>
                  <p className="text-sm font-bold text-slate-900">
                    Information ready
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            One visibility platform
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Help every platform understand your business.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Maintain trusted business information and publish it in formats that
            modern discovery platforms can understand.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon size={23} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Simple setup
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Start improving your visibility
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-slate-200 bg-white p-7"
              >
                <span className="text-sm font-black text-blue-600">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#12204a] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <ShieldCheck size={38} className="mx-auto text-blue-400" />
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Your business deserves to be found.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100/75">
            Create your Vizo profile and build a trusted source of information
            for customers, search engines and AI.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 font-bold transition hover:bg-blue-400"
          >
            Start for free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-[#12204a]"
          >
            vizo<span className="text-blue-600">.</span>
          </Link>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Vizo. Business visibility made simple.
          </p>

          <div className="flex gap-5 text-sm font-semibold text-slate-600">
            <Link href="/pricing" className="hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
