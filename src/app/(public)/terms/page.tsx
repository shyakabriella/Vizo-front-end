import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Ban,
  Building2,
  CircleDollarSign,
  FileCheck2,
  Globe2,
  KeyRound,
  Link2,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const sections = [
  { number: "01", label: "Agreement", href: "#agreement" },
  { number: "02", label: "Vizo services", href: "#services" },
  { number: "03", label: "Accounts", href: "#accounts" },
  { number: "04", label: "Business information", href: "#business-data" },
  { number: "05", label: "Subscriptions", href: "#subscriptions" },
  { number: "06", label: "Acceptable use", href: "#acceptable-use" },
  {
    number: "07",
    label: "Intellectual property",
    href: "#intellectual-property",
  },
  { number: "08", label: "Third-party services", href: "#third-party" },
  { number: "09", label: "Disclaimers", href: "#disclaimers" },
  { number: "10", label: "Termination", href: "#termination" },
  { number: "11", label: "Liability", href: "#liability" },
  { number: "12", label: "Contact", href: "#contact" },
];

const services = [
  "Business-profile management",
  "Location and opening-hours management",
  "Service, product and pricing information",
  "Website Connect",
  "Structured business data",
  "AI and search visibility preparation",
  "Business visibility audits",
  "Visibility analytics and recommendations",
  "Website, advertising and digital-support services",
];

const accountResponsibilities = [
  "Provide accurate registration information",
  "Keep account credentials confidential",
  "Use strong passwords and trusted devices",
  "Maintain current contact information",
  "Notify Vizo about suspected unauthorized access",
  "Take responsibility for authorized team members",
];

const prohibitedActivities = [
  "Using Vizo for unlawful, fraudulent or deceptive activities",
  "Submitting information you do not own or have authority to manage",
  "Impersonating another person, organization or business",
  "Publishing false, misleading or harmful business information",
  "Attempting to access another user’s account or private information",
  "Introducing malware, harmful scripts or destructive code",
  "Interfering with Vizo infrastructure, security or availability",
  "Scraping or copying the platform through unauthorized automated methods",
  "Using Vizo to send spam or unsolicited communications",
  "Attempting to reverse engineer protected parts of the platform",
];

export default function TermsPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="absolute -left-32 top-28 size-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-36 bottom-0 size-[440px] rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-[1100px]">
          <div className="max-w-4xl animate-[termsEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur">
              <Scale className="size-4 text-blue-300" />
              Terms of Service
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              The terms for using Vizo.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
              These terms explain the rules, responsibilities and conditions
              that apply when you access or use Vizo services.
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
            <TermsSection
              id="agreement"
              number="01"
              icon={FileCheck2}
              title="Agreement to these terms"
            >
              <p>
                These Terms of Service form an agreement between you and Vizo, a
                business-visibility platform developed and operated by
                AsyncAfrica.
              </p>

              <p>
                By creating an account, accessing the platform, purchasing a
                service or using Website Connect, you confirm that you have read
                and agree to these terms and the Vizo Privacy Policy.
              </p>

              <p>
                If you use Vizo for a company or another organization, you
                confirm that you have authority to accept these terms on its
                behalf.
              </p>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="mt-0.5 size-6 shrink-0 text-amber-700" />

                  <div>
                    <h3 className="font-black text-amber-900">
                      Do not use Vizo if you do not agree
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-amber-800">
                      If you do not agree to these terms, you should not create
                      an account or use Vizo services.
                    </p>
                  </div>
                </div>
              </div>
            </TermsSection>

            <TermsSection
              id="services"
              number="02"
              icon={Globe2}
              title="Vizo services"
            >
              <p>
                Vizo helps businesses organize, publish and evaluate business
                information used across websites, search engines, maps, social
                media and AI discovery platforms.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service}
                    className="flex items-start gap-3 rounded-2xl bg-[#f7f8fc] p-4"
                  >
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-blue-600" />
                    <span className="text-sm font-semibold leading-6 text-slate-700">
                      {service}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6">
                Features may vary by subscription plan, business type, location,
                technical compatibility and the services selected by the
                customer.
              </p>

              <p>
                We may improve, update, replace or discontinue parts of the
                platform. Where practical, we will provide notice when a
                material change affects an active paid service.
              </p>
            </TermsSection>

            <TermsSection
              id="accounts"
              number="03"
              icon={KeyRound}
              title="Accounts and account security"
            >
              <p>
                You must provide accurate account information and maintain the
                security of your account credentials.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {accountResponsibilities.map((responsibility) => (
                  <div
                    key={responsibility}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"
                  >
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm font-semibold leading-6 text-slate-700">
                      {responsibility}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6">
                You are responsible for actions performed through your account
                unless you notified Vizo about unauthorized access and took
                reasonable action to secure the account.
              </p>

              <p>
                Vizo may require email verification, identity confirmation or
                proof that you are authorized to represent a business.
              </p>
            </TermsSection>

            <TermsSection
              id="business-data"
              number="04"
              icon={Building2}
              title="Business information and content"
            >
              <p>
                You retain ownership of business information, images,
                descriptions, trademarks and other content you submit to Vizo.
              </p>

              <p>
                You grant Vizo a limited, non-exclusive permission to store,
                process, format, display and publish that content as needed to
                provide the services you activate.
              </p>

              <h3 className="mt-7 text-lg font-black text-[#10104b]">
                Your responsibilities
              </h3>

              <ul className="mt-4 space-y-3">
                {[
                  "You have authority to manage the submitted business",
                  "The information is accurate and not intentionally misleading",
                  "You have permission to use uploaded images and content",
                  "Published prices, hours and services are kept current",
                  "The content does not violate intellectual-property or privacy rights",
                  "Required licences, permits and legal disclosures are maintained",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-1 size-5 shrink-0 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6">
                Business information marked for publication may appear through
                the connected website, structured data, llms.txt, public
                profiles or other discovery formats.
              </p>
            </TermsSection>

            <TermsSection
              id="subscriptions"
              number="05"
              icon={CircleDollarSign}
              title="Plans, payments and additional services"
            >
              <p>
                Some Vizo services require a paid subscription or a separate
                custom-service agreement. Prices, billing intervals and included
                features are shown during purchase or in a written quotation.
              </p>

              <h3 className="mt-7 text-lg font-black text-[#10104b]">
                Subscription conditions
              </h3>

              <ul className="mt-4 space-y-3">
                {[
                  "Fees must be paid using an accepted payment method",
                  "Subscriptions may renew according to the selected billing interval",
                  "Taxes and transaction fees may apply where required",
                  "Advertising-platform budgets are normally separate from Vizo service fees",
                  "Website development and custom integrations may require separate quotations",
                  "Failure to pay may result in restriction or suspension of paid features",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-1 size-5 shrink-0 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6">
                Refund eligibility depends on the service purchased, work
                already completed, third-party costs and the applicable
                quotation or agreement. Custom development, advertising spend
                and completed professional services may be non-refundable.
              </p>
            </TermsSection>

            <TermsSection
              id="acceptable-use"
              number="06"
              icon={Ban}
              title="Acceptable use"
            >
              <p>
                You must use Vizo lawfully and in a way that does not damage the
                platform, other users or third parties.
              </p>

              <div className="mt-6 space-y-3">
                {prohibitedActivities.map((activity) => (
                  <div
                    key={activity}
                    className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4"
                  >
                    <Ban className="mt-0.5 size-5 shrink-0 text-red-600" />
                    <span className="text-sm font-semibold leading-6 text-red-800">
                      {activity}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6">
                We may investigate suspected misuse and restrict access when
                reasonably necessary to protect users, businesses or platform
                security.
              </p>
            </TermsSection>

            <TermsSection
              id="intellectual-property"
              number="07"
              icon={ShieldCheck}
              title="Intellectual property"
            >
              <p>
                Vizo, its software, design, documentation, branding, platform
                structure and original content are owned by AsyncAfrica or its
                licensors and are protected by applicable intellectual-property
                rules.
              </p>

              <p>
                These terms grant you a limited, revocable, non-exclusive and
                non-transferable right to use Vizo for its intended business
                purpose. They do not transfer ownership of the platform or its
                technology.
              </p>

              <p>
                You may not copy, resell, sublicense, reverse engineer or create
                a competing service from protected parts of Vizo except where
                such restriction is prohibited by applicable law.
              </p>
            </TermsSection>

            <TermsSection
              id="third-party"
              number="08"
              icon={Link2}
              title="Third-party services"
            >
              <p>
                Vizo may connect with or link to services operated by third
                parties, including hosting providers, analytics platforms,
                search engines, social networks, Maps, payment providers,
                advertising platforms and website-management systems.
              </p>

              <p>
                Third-party services operate under their own terms and privacy
                policies. Vizo does not control their availability, ranking
                decisions, policy changes, account restrictions or data
                processing.
              </p>

              <p>
                You are responsible for maintaining any external accounts,
                permissions, licences and fees required to use those services.
              </p>
            </TermsSection>

            <TermsSection
              id="disclaimers"
              number="09"
              icon={AlertTriangle}
              title="Visibility and service disclaimers"
            >
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="font-black text-amber-900">
                  Vizo does not guarantee rankings or business results
                </h3>

                <p className="mt-2 text-sm leading-7 text-amber-800">
                  Vizo improves how business information is organized, published
                  and measured. Search engines, AI platforms, advertising
                  platforms and customers make independent decisions.
                </p>
              </div>

              <p className="mt-6">Vizo does not guarantee:</p>

              <ul className="mt-4 space-y-3">
                {[
                  "A specific search-engine ranking",
                  "A mention or recommendation by an AI platform",
                  "Acceptance of structured data by every platform",
                  "Specific website traffic, leads, bookings or sales",
                  "Advertising approval or campaign performance",
                  "Continuous availability of third-party platforms",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <AlertTriangle className="mt-1 size-5 shrink-0 text-amber-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6">
                Vizo is provided on an “as available” basis. We work to provide
                a reliable service, but temporary interruptions, maintenance,
                technical limitations and third-party failures may occur.
              </p>
            </TermsSection>

            <TermsSection
              id="termination"
              number="10"
              icon={UserCheck}
              title="Suspension and termination"
            >
              <p>
                You may stop using Vizo and request account closure. You should
                remove Website Connect from websites you no longer want
                connected.
              </p>

              <p>
                We may restrict, suspend or terminate access when reasonably
                necessary because of:
              </p>

              <ul className="mt-4 space-y-3">
                {[
                  "A serious or repeated violation of these terms",
                  "Fraudulent, illegal or harmful activity",
                  "Security threats or unauthorized access",
                  "Failure to pay applicable fees",
                  "A valid legal or regulatory requirement",
                  "Actions that create material risk for Vizo or other users",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-1 size-5 shrink-0 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6">
                Where appropriate, we may provide notice and an opportunity to
                correct the problem. Immediate action may be taken when needed
                for security, legal compliance or prevention of harm.
              </p>
            </TermsSection>

            <TermsSection
              id="liability"
              number="11"
              icon={Scale}
              title="Limitation of liability"
            >
              <p>
                To the extent permitted by applicable law, Vizo and AsyncAfrica
                will not be responsible for indirect, incidental, special or
                consequential losses arising from the use or inability to use
                the platform.
              </p>

              <p>
                This may include loss of profits, revenue, customers, data,
                reputation, advertising spend or business opportunities caused
                by platform interruptions, inaccurate submitted information or
                third-party services.
              </p>

              <p>
                Nothing in these terms excludes liability that cannot legally be
                excluded or limited. Any applicable limitation will be
                interpreted according to the governing law and the specific
                service agreement.
              </p>

              <h3 className="mt-7 text-lg font-black text-[#10104b]">
                Indemnification
              </h3>

              <p>
                You agree to be responsible for claims and reasonable costs
                resulting from content you submit, your unlawful use of Vizo,
                your violation of these terms or your violation of another
                person’s rights.
              </p>
            </TermsSection>

            <TermsSection
              id="general"
              number="12"
              icon={FileCheck2}
              title="General terms"
            >
              <h3 className="text-lg font-black text-[#10104b]">
                Changes to these terms
              </h3>

              <p>
                We may update these terms when services, business practices or
                applicable requirements change. The updated date will appear at
                the beginning of this page.
              </p>

              <h3 className="mt-7 text-lg font-black text-[#10104b]">
                Governing law
              </h3>

              <p>
                These terms are intended to be governed by the laws applicable
                to the Vizo operating entity in Rwanda, without removing any
                mandatory consumer rights that apply in your location.
              </p>

              <h3 className="mt-7 text-lg font-black text-[#10104b]">
                Entire agreement
              </h3>

              <p>
                These terms, the Privacy Policy, the selected plan and any
                written quotation or custom-service agreement form the agreement
                governing your use of Vizo.
              </p>

              <h3 className="mt-7 text-lg font-black text-[#10104b]">
                Severability
              </h3>

              <p>
                If one part of these terms is found unenforceable, the remaining
                parts will continue to apply to the extent permitted by law.
              </p>
            </TermsSection>

            <section
              id="contact"
              className="scroll-mt-28 rounded-[30px] bg-[#10104b] p-7 text-white sm:p-10"
            >
              <Mail className="size-7 text-blue-300" />

              <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-blue-300">
                Contact
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Questions about these terms?
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-white/65">
                Contact the Vizo team if you need clarification about these
                terms or a service agreement.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <a
                  href="mailto:shyakas83@gmail.com?subject=Vizo%20Terms%20of%20Service"
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
          </div>
        </div>
      </section>

      <style>{`
        @keyframes termsEnter {
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

function TermsSection({
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
