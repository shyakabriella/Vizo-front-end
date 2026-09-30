import {
  ArrowRight,
  CheckCircle2,
  Cookie,
  Database,
  Eye,
  FileText,
  Globe2,
  LockKeyhole,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const policySections = [
  { number: "01", label: "Who we are", href: "#who-we-are" },
  { number: "02", label: "Information we collect", href: "#information" },
  { number: "03", label: "How we use information", href: "#use" },
  { number: "04", label: "Website Connect", href: "#website-connect" },
  { number: "05", label: "Sharing information", href: "#sharing" },
  { number: "06", label: "Data retention", href: "#retention" },
  { number: "07", label: "Security", href: "#security" },
  { number: "08", label: "Your rights", href: "#rights" },
  { number: "09", label: "Cookies", href: "#cookies" },
  { number: "10", label: "Contact us", href: "#contact" },
];

const collectedInformation = [
  {
    title: "Account information",
    description:
      "Your name, email address, telephone number, password credentials, language preference and account roles.",
  },
  {
    title: "Business information",
    description:
      "Business name, description, contacts, locations, opening hours, services, products, prices, images and website addresses.",
  },
  {
    title: "Website information",
    description:
      "Website URL, Website Connect status, technical accessibility, structured data and visibility-audit results.",
  },
  {
    title: "Usage information",
    description:
      "Pages visited, actions performed, device information, browser type, IP address and security events.",
  },
  {
    title: "Communication information",
    description:
      "Messages, support requests, contact-form information and other communications sent to Vizo.",
  },
  {
    title: "Billing information",
    description:
      "Plan, subscription and payment-status information. Payment providers may process payment-card or mobile-payment details separately.",
  },
];

const uses = [
  "Create and manage Vizo accounts",
  "Provide business-profile and visibility services",
  "Run website and business visibility audits",
  "Generate structured business information",
  "Operate and verify Website Connect",
  "Display analytics and recommendations",
  "Provide customer and technical support",
  "Protect accounts and prevent misuse",
  "Improve platform performance and reliability",
  "Send important account and service communications",
  "Meet applicable legal and regulatory obligations",
];

const userRights = [
  {
    title: "Access",
    description:
      "Request information about the personal data associated with your account.",
  },
  {
    title: "Correction",
    description:
      "Update incorrect or incomplete account and business information.",
  },
  {
    title: "Deletion",
    description:
      "Request deletion of eligible personal information and account data.",
  },
  {
    title: "Restriction",
    description: "Request limits on certain processing where applicable.",
  },
  {
    title: "Objection",
    description: "Object to certain processing based on your circumstances.",
  },
  {
    title: "Portability",
    description:
      "Request eligible information in a commonly usable electronic format.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="absolute -left-32 top-28 size-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-36 bottom-0 size-[440px] rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-[1100px]">
          <div className="max-w-4xl animate-[privacyEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur">
              <ShieldCheck className="size-4 text-blue-300" />
              Privacy Policy
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              How Vizo handles your information.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
              This policy explains what information Vizo collects, why we use
              it, how we protect it and the choices available to you.
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
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {policySections.map((section) => (
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
                {policySections.map((section) => (
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
              id="who-we-are"
              number="01"
              icon={Globe2}
              title="Who we are"
            >
              <p>
                Vizo is a business-visibility platform developed and operated by
                AsyncAfrica. In this policy, “Vizo,” “we,” “us” and “our” refer
                to the organization responsible for providing the Vizo platform
                and related services.
              </p>

              <p>
                Vizo helps businesses manage information, connect websites,
                publish structured data, perform visibility audits and improve
                how businesses are understood across digital discovery
                platforms.
              </p>
            </PolicySection>

            <PolicySection
              id="information"
              number="02"
              icon={Database}
              title="Information we collect"
            >
              <p>
                The information we collect depends on how you use Vizo and which
                services you activate.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {collectedInformation.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-[#f7f8fc] p-5"
                  >
                    <h3 className="font-black text-[#10104b]">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>

              <h3 className="mt-8 text-lg font-black text-[#10104b]">
                Information from other sources
              </h3>

              <p>
                When authorized or when information is publicly available, Vizo
                may receive business information from business websites, public
                business listings, connected platforms or service providers. You
                are responsible for ensuring you have permission to submit and
                manage information belonging to a business.
              </p>
            </PolicySection>

            <PolicySection
              id="use"
              number="03"
              icon={Eye}
              title="How we use information"
            >
              <p>
                We use personal and business information to operate, secure and
                improve Vizo and to provide the services requested by users.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {uses.map((use) => (
                  <div
                    key={use}
                    className="flex items-start gap-3 rounded-2xl bg-[#f7f8fc] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm font-semibold leading-6 text-slate-700">
                      {use}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6">
                Where required, we process information based on your consent,
                performance of a service agreement, legitimate business
                interests or compliance with applicable legal obligations.
              </p>
            </PolicySection>

            <PolicySection
              id="website-connect"
              number="04"
              icon={FileText}
              title="Website Connect and visibility audits"
            >
              <h3 className="text-lg font-black text-[#10104b]">
                Website Connect
              </h3>

              <p>
                When Website Connect is installed, Vizo may verify that the
                script is available, identify the connected Site ID and publish
                approved business information associated with that Site ID.
              </p>

              <p>
                Website Connect is not designed to read private website
                databases, payment-card details, passwords or private customer
                communications.
              </p>

              <h3 className="mt-7 text-lg font-black text-[#10104b]">
                Visibility audits
              </h3>

              <p>
                When you request an audit, Vizo may analyze publicly accessible
                website information, technical availability, structured data,
                business-profile completeness and other visibility signals.
                Audit results may be stored so progress can be measured over
                time.
              </p>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="mt-0.5 size-6 shrink-0 text-blue-700" />

                  <div>
                    <h3 className="font-black text-[#10104b]">
                      Business information may be public
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Information marked for publication may be exposed through
                      the connected website, structured data, llms.txt or other
                      public discovery formats.
                    </p>
                  </div>
                </div>
              </div>
            </PolicySection>

            <PolicySection
              id="sharing"
              number="05"
              icon={UserCheck}
              title="How we share information"
            >
              <p>
                We do not sell personal information. We may share limited
                information in the following situations:
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  "With service providers that support hosting, email, analytics, security, payments or customer support",
                  "With people you authorize as business owners, managers or team members",
                  "When information is intentionally published through your business profile or website connection",
                  "When required by law, legal process or a valid government request",
                  "When necessary to protect Vizo, its users or the public from fraud, abuse or security threats",
                  "During a business transfer, reorganization or similar corporate transaction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6">
                Service providers are expected to process information only for
                the agreed purpose and to apply appropriate safeguards.
              </p>
            </PolicySection>

            <PolicySection
              id="retention"
              number="06"
              icon={Database}
              title="Data retention"
            >
              <p>
                We retain information for as long as reasonably necessary to
                provide Vizo, maintain account history, meet security
                requirements, resolve disputes and comply with applicable
                obligations.
              </p>

              <p>
                When an account is deleted, some information may remain for a
                limited period in backups, security records, financial records
                or legal-compliance records. Public information previously
                indexed by external platforms may remain in their systems until
                they refresh or remove it.
              </p>

              <p>
                Business owners should remove the Website Connect script when
                they no longer want a website connected to Vizo.
              </p>
            </PolicySection>

            <PolicySection
              id="security"
              number="07"
              icon={LockKeyhole}
              title="Information security"
            >
              <p>
                We use reasonable technical and organizational safeguards
                designed to protect information against unauthorized access,
                alteration, loss or misuse.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Password hashing and secure authentication",
                  "Role and permission controls",
                  "Encrypted HTTPS connections",
                  "Protected API access",
                  "System monitoring and logging",
                  "Regular software maintenance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"
                  >
                    <ShieldCheck className="size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6">
                No internet service can guarantee complete security. Users must
                protect their passwords, use trusted devices and notify us if
                they suspect unauthorized account access.
              </p>
            </PolicySection>

            <PolicySection
              id="rights"
              number="08"
              icon={Scale}
              title="Your privacy rights"
            >
              <p>
                Depending on your location and applicable law, you may have
                rights regarding your personal information.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {userRights.map((right) => (
                  <article
                    key={right.title}
                    className="rounded-2xl border border-slate-200 bg-[#f7f8fc] p-5"
                  >
                    <h3 className="font-black text-[#10104b]">{right.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {right.description}
                    </p>
                  </article>
                ))}
              </div>

              <p className="mt-6">
                To protect accounts, we may need to verify your identity and
                authority before completing a request. Some requests may be
                limited where retention is required for security, contractual or
                legal reasons.
              </p>
            </PolicySection>

            <PolicySection
              id="cookies"
              number="09"
              icon={Cookie}
              title="Cookies and local storage"
            >
              <p>
                Vizo may use cookies, browser storage and similar technologies
                to keep users signed in, remember preferences, maintain security
                and understand platform performance.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-[0.7fr_1.3fr] bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-wide text-slate-500">
                  <span>Category</span>
                  <span>Purpose</span>
                </div>

                {[
                  [
                    "Essential",
                    "Authentication, security and basic platform operation",
                  ],
                  ["Preference", "Language and user-interface preferences"],
                  [
                    "Analytics",
                    "Understanding usage and improving platform performance",
                  ],
                ].map(([category, purpose]) => (
                  <div
                    key={category}
                    className="grid grid-cols-[0.7fr_1.3fr] border-t border-slate-200 px-4 py-4 text-sm"
                  >
                    <span className="font-black text-[#10104b]">
                      {category}
                    </span>
                    <span className="leading-6 text-slate-600">{purpose}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6">
                Browser settings can be used to remove or block some storage.
                Blocking essential storage may prevent sign-in and other
                platform features from working correctly.
              </p>
            </PolicySection>

            <section
              id="contact"
              className="scroll-mt-28 rounded-[30px] bg-[#10104b] p-7 text-white sm:p-10"
            >
              <Mail className="size-7 text-blue-300" />

              <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-blue-300">
                10 — Contact us
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Privacy questions and requests
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-white/65">
                Contact us if you have a question about this policy or want to
                make a privacy request.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <a
                  href="mailto:shyakas83@gmail.com?subject=Vizo%20privacy%20request"
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

            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="font-black text-amber-900">
                Changes to this policy
              </h2>

              <p className="mt-2 text-sm leading-7 text-amber-800">
                We may update this policy when Vizo services, business practices
                or applicable requirements change. The updated date will be
                displayed at the beginning of this page.
              </p>
            </section>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes privacyEnter {
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
  icon: typeof ShieldCheck;
  title: string;
  children: React.ReactNode;
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
