import {
  ArrowRight,
  BarChart3,
  Monitor,
  CheckCircle2,
  Cookie,
  Database,
  ExternalLink,
  KeyRound,
  LockKeyhole,
  Mail,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const sections = [
  { number: "01", label: "What cookies are", href: "#what-are-cookies" },
  { number: "02", label: "How Vizo uses storage", href: "#how-we-use" },
  { number: "03", label: "Essential storage", href: "#essential" },
  { number: "04", label: "Preference storage", href: "#preferences" },
  { number: "05", label: "Analytics", href: "#analytics" },
  { number: "06", label: "Third parties", href: "#third-parties" },
  { number: "07", label: "Your choices", href: "#choices" },
  { number: "08", label: "Contact", href: "#contact" },
];

const storageTypes = [
  {
    category: "Authentication",
    technology: "Cookie or browser storage",
    purpose:
      "Keeps a signed-in session available and allows authenticated API requests.",
    duration: "Session or remembered login",
    required: true,
  },
  {
    category: "Stored user",
    technology: "Browser storage",
    purpose:
      "Stores limited account information needed to display and route the signed-in user.",
    duration: "Until logout or removal",
    required: true,
  },
  {
    category: "Security",
    technology: "Cookie, session or server record",
    purpose:
      "Supports account protection, request validation and prevention of unauthorized use.",
    duration: "Session or security period",
    required: true,
  },
  {
    category: "Preferences",
    technology: "Browser storage",
    purpose:
      "May remember language, display preferences and selected account options.",
    duration: "Until changed or removed",
    required: false,
  },
  {
    category: "Analytics",
    technology: "Cookie or similar identifier",
    purpose:
      "May help measure platform usage and performance if analytics tools are enabled.",
    duration: "Depends on the analytics provider",
    required: false,
  },
];

const browserInstructions = [
  {
    browser: "Google Chrome",
    instruction:
      "Open Settings, select Privacy and security, then choose Third-party cookies or Delete browsing data.",
  },
  {
    browser: "Mozilla Firefox",
    instruction:
      "Open Settings, select Privacy & Security, then manage Cookies and Site Data.",
  },
  {
    browser: "Microsoft Edge",
    instruction:
      "Open Settings, select Cookies and site permissions, then manage stored cookies.",
  },
  {
    browser: "Safari",
    instruction:
      "Open Settings or Preferences, select Privacy, then manage website data.",
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="absolute -left-32 top-28 size-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-36 bottom-0 size-[440px] rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-[1100px]">
          <div className="max-w-4xl animate-[cookieEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur">
              <Cookie className="size-4 text-blue-300" />
              Cookie Policy
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              How Vizo uses cookies and browser storage.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
              This policy explains the technologies Vizo may use to keep
              accounts secure, remember preferences and understand platform
              performance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold">
                Effective: September 29, 2026
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold">
                Last updated: September 29, 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <a
              key={section.number}
              href={section.href}
              className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-lg"
            >
              <span className="text-xs font-black text-blue-600">
                {section.number}
              </span>

              <span className="mt-2 block text-sm font-black text-[#10104b]">
                {section.label}
              </span>

              <ArrowRight className="mt-3 size-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
            </a>
          ))}
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-[#f7f8fc] p-5">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">
                On this page
              </p>

              <nav className="mt-4 space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.number}
                    href={section.href}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-blue-700"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 space-y-14">
            <PolicySection
              id="what-are-cookies"
              number="01"
              icon={Cookie}
              title="What cookies and browser storage are"
            >
              <p>
                Cookies are small text files that websites can place in your
                browser. They can help websites maintain sessions, remember
                preferences and understand how services are used.
              </p>

              <p>
                Vizo may also use browser technologies such as local storage and
                session storage. These technologies store limited information
                inside the browser and can perform functions similar to cookies.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-[#f7f8fc] p-5">
                  <Cookie className="size-6 text-blue-600" />
                  <h3 className="mt-4 font-black text-[#10104b]">Cookies</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Small pieces of data exchanged between a website and a
                    browser.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-[#f7f8fc] p-5">
                  <Database className="size-6 text-blue-600" />
                  <h3 className="mt-4 font-black text-[#10104b]">
                    Browser storage
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Information stored locally by the browser for a website or
                    web application.
                  </p>
                </div>
              </div>
            </PolicySection>

            <PolicySection
              id="how-we-use"
              number="02"
              icon={Monitor}
              title="How Vizo uses these technologies"
            >
              <p>
                Vizo uses cookies or browser storage when necessary to operate
                accounts, maintain security and remember user choices.
              </p>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-[760px] w-full border-collapse text-left">
                  <thead className="bg-slate-100 text-xs font-black uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Technology</th>
                      <th className="px-4 py-3">Purpose</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {storageTypes.map((item) => (
                      <tr
                        key={item.category}
                        className="border-t border-slate-200 align-top"
                      >
                        <td className="px-4 py-4 text-sm font-black text-[#10104b]">
                          {item.category}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {item.technology}
                        </td>

                        <td className="px-4 py-4 text-sm leading-6 text-slate-600">
                          {item.purpose}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {item.duration}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-black ${
                              item.required
                                ? "bg-blue-50 text-blue-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.required ? "Essential" : "Optional"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PolicySection>

            <PolicySection
              id="essential"
              number="03"
              icon={LockKeyhole}
              title="Essential cookies and storage"
            >
              <p>
                Essential technologies are required for Vizo to provide secure
                accounts and core platform functionality. They may be used
                without an optional analytics or marketing preference.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Maintain a signed-in session",
                  "Authenticate protected API requests",
                  "Remember the selected login-storage option",
                  "Protect accounts against unauthorized use",
                  "Support secure password and email workflows",
                  "Route users to the correct dashboard",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"
                  >
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm font-semibold leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6">
                Blocking or removing essential storage may sign you out or
                prevent account features from operating correctly.
              </p>
            </PolicySection>

            <PolicySection
              id="preferences"
              number="04"
              icon={SlidersHorizontal}
              title="Preference storage"
            >
              <p>
                Preference storage may be used to remember choices that make
                Vizo more convenient without being strictly necessary for
                account authentication.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  "Preferred language",
                  "Timezone or regional display settings",
                  "Dashboard display preferences",
                  "Remembered interface choices",
                  "Dismissed informational messages",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6">
                Removing preference storage may reset these choices to their
                default values.
              </p>
            </PolicySection>

            <PolicySection
              id="analytics"
              number="05"
              icon={BarChart3}
              title="Analytics and performance"
            >
              <p>
                Vizo may use privacy-conscious analytics or performance tools to
                understand how the platform operates and identify technical
                problems.
              </p>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-start gap-4">
                  <BarChart3 className="mt-0.5 size-6 shrink-0 text-blue-700" />

                  <div>
                    <h3 className="font-black text-[#10104b]">
                      Optional tools must be documented
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      If an external analytics tool is enabled, this policy and
                      any cookie-consent controls should be updated with the
                      provider, purpose and storage duration.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6">
                Analytics information may include viewed pages, feature usage,
                browser type, device type, approximate location derived from an
                IP address, performance measurements and error information.
              </p>
            </PolicySection>

            <PolicySection
              id="third-parties"
              number="06"
              icon={ExternalLink}
              title="Third-party technologies"
            >
              <p>
                External services used through or linked from Vizo may place
                their own cookies or browser storage. Examples can include:
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  "Payment providers",
                  "Embedded maps",
                  "Video or media providers",
                  "Customer-support tools",
                  "Analytics and error-monitoring services",
                  "Authentication or communication providers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ExternalLink className="mt-1 size-5 shrink-0 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6">
                Third parties control their own technologies and process
                information according to their own policies. Following an
                external link may also take you outside the Vizo platform.
              </p>

              <p>
                Website Connect installed on a customer website should not
                automatically authorize unrelated tracking. Any tracking added
                to a connected website must be separately disclosed and
                configured where consent is required.
              </p>
            </PolicySection>

            <PolicySection
              id="choices"
              number="07"
              icon={Settings}
              title="Your cookie and storage choices"
            >
              <p>
                You can manage cookies and browser storage through your browser
                settings. You can also use a private-browsing window or clear
                stored website data.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {browserInstructions.map((browser) => (
                  <article
                    key={browser.browser}
                    className="rounded-2xl border border-slate-200 bg-[#f7f8fc] p-5"
                  >
                    <h3 className="font-black text-[#10104b]">
                      {browser.browser}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {browser.instruction}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="font-black text-amber-900">
                  Removing storage can sign you out
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Clearing Vizo cookies or browser storage may remove your saved
                  session, stored account information and preferences. Your
                  server account is not deleted by clearing browser storage.
                </p>
              </div>
            </PolicySection>

            <section
              id="contact"
              className="scroll-mt-28 rounded-[30px] bg-[#10104b] p-7 text-white sm:p-10"
            >
              <Mail className="size-7 text-blue-300" />

              <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-blue-300">
                08 — Contact us
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Questions about cookies?
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-white/65">
                Contact the Vizo team if you have a question about cookies,
                browser storage or the technologies used by the platform.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <a
                  href="mailto:shyakas83@gmail.com?subject=Vizo%20Cookie%20Policy"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <p className="text-xs font-bold text-white/45">Email</p>
                  <p className="mt-2 font-black">shyakas83@gmail.com</p>
                </a>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-bold text-white/45">Location</p>
                  <p className="mt-2 font-black">Kigali, Rwanda</p>
                </div>
              </div>

              <Link
                href="/contact"
                className="group mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-black text-[#10104b]"
              >
                Contact Vizo
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </Link>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-[#f7f8fc] p-6">
              <h2 className="font-black text-[#10104b]">
                Changes to this policy
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                This policy may be updated when storage technologies, analytics
                providers or Vizo features change. The latest update date will
                be displayed at the beginning of this page.
              </p>
            </section>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes cookieEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

function PolicySection({
  id,
  number,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  number: string;
  icon: typeof Cookie;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700">
          <Icon className="size-6" />
        </span>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">
            {number}
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#10104b] sm:text-3xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm leading-8 text-slate-600 sm:text-base">
        {children}
      </div>
    </section>
  );
}
