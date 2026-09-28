import {
  ArrowUpRight,
  MessagesSquare,
  Camera,
  BriefcaseBusiness,
  Mail,
  MapPin,
} from "lucide-react";
import { VizoLogo } from "@/components/public/vizo-logo";
import Link from "next/link";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Business audit", href: "/audit" },
      { label: "Website Connect", href: "/solutions#website-connect" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "AI visibility", href: "/solutions#ai-visibility" },
      { label: "Structured data", href: "/solutions#structured-data" },
      { label: "Visibility analytics", href: "/solutions#analytics" },
      { label: "Business profiles", href: "/solutions#business-profile" },
    ],
  },
  {
    title: "Business types",
    links: [
      { label: "Hotels", href: "/solutions/hotels" },
      { label: "Restaurants", href: "/solutions/restaurants" },
      { label: "Salons and spas", href: "/solutions/salons" },
      { label: "Retail businesses", href: "/solutions/retail" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Vizo", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "Help centre", href: "/help" },
      { label: "Sign in", href: "/login" },
    ],
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: BriefcaseBusiness,
  },
  {
    label: "Camera",
    href: "#",
    icon: Camera,
  },
  {
    label: "MessagesSquare",
    href: "#",
    icon: MessagesSquare,
  },
];

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#030817] text-white">
      <div className="absolute -left-40 top-10 size-96 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="absolute -right-40 bottom-0 size-96 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-14 border-b border-white/10 pb-14 lg:grid-cols-[1.15fr_2fr]">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              <VizoLogo size={48} className="size-12" />

              <span>
                <span className="block text-2xl font-black tracking-[-0.04em]">
                  Vizo
                </span>

                <span className="block text-xs font-medium text-slate-400">
                  AI business visibility
                </span>
              </span>
            </Link>

            <p className="mt-6 text-base leading-7 text-slate-400">
              Vizo helps businesses organize and publish accurate information so
              AI assistants and search engines can understand, discover and
              recommend them.
            </p>

            <div className="mt-7 space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-blue-400" />
                Kigali, Rwanda
              </div>

              <Link
                href="/contact"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-blue-400" />
                Contact the Vizo team
              </Link>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:-translate-y-0.5 hover:border-blue-400/50 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-bold text-white">{group.title}</h2>

                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-sm leading-6 text-slate-400 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 border-b border-white/10 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.03em]">
              Ready to make your business visible to AI?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Create your business profile and connect your website with Vizo.
            </p>
          </div>

          <Link
            href="/register"
            className="group inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-500"
          >
            Get started
            <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Vizo. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy policy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms of service
            </Link>

            <Link href="/cookies" className="transition hover:text-white">
              Cookie policy
            </Link>
          </div>

          <p>
            Designed and developed by{" "}
            <a
              href="https://asyncafrica.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-300 transition hover:text-white"
            >
              AsyncAfrica
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
