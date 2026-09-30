"use client";

import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Globe2,
  Mail,
  MapPinned,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";

const contactOptions = [
  {
    icon: Mail,
    title: "Email us",
    value: "shyakas83@gmail.com",
    description: "For general questions, partnerships and support.",
    href: "mailto:shyakas83@gmail.com",
  },
  {
    icon: Phone,
    title: "Call us",
    value: "+250 782 667 888",
    description: "Speak directly with the AsyncAfrica team.",
    href: "tel:+250782667888",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+250 782 667 888",
    description: "Send a quick message about your business.",
    href: "https://wa.me/250782667888?text=Hello%20Vizo%2C%20I%20would%20like%20to%20learn%20more%20about%20business%20visibility.",
  },
  {
    icon: MapPinned,
    title: "Location",
    value: "Kigali, Rwanda",
    description: "Vizo is developed by AsyncAfrica.",
    href: "https://www.google.com/maps/search/?api=1&query=Kigali%2C%20Rwanda",
  },
];

const inquiryTypes = [
  "General question",
  "Business visibility audit",
  "Website Connect",
  "SEO and GEO",
  "AI visibility",
  "Google Business Profile",
  "Digital advertising",
  "Social media",
  "Website development",
  "Partnership",
  "Technical support",
];

const faqs = [
  {
    question: "Can Vizo work with my existing website?",
    answer:
      "Yes. Website Connect is designed to connect Vizo to an existing website without replacing its current design or content.",
  },
  {
    question: "Can I use Vizo without technical experience?",
    answer:
      "Yes. Business owners can manage their information through Vizo, and our team can assist with technical installation when required.",
  },
  {
    question: "Which businesses can use Vizo?",
    answer:
      "Vizo can support hotels, restaurants, salons, spas, retail businesses, clinics and professional service businesses.",
  },
  {
    question: "Does Vizo guarantee Google or AI rankings?",
    answer:
      "No platform can honestly guarantee a specific ranking or AI recommendation. Vizo improves the quality, consistency and accessibility of your business information.",
  },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const business = String(form.get("business") ?? "");
    const inquiry = String(form.get("inquiry") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = encodeURIComponent(
      `Vizo enquiry: ${inquiry || "General question"}`,
    );

    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Business: ${business || "Not provided"}`,
        `Inquiry: ${inquiry}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:shyakas83@gmail.com?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  }

  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="absolute -left-32 top-28 size-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-36 bottom-0 size-[440px] rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[1fr_0.75fr]">
          <div className="max-w-3xl animate-[contactEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur">
              <Sparkles className="size-4 text-blue-300" />
              Contact Vizo
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Let’s improve your business visibility.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Tell us about your business and the visibility challenges you want
              to solve. We will help you identify the right next step.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
              {[
                "Business visibility guidance",
                "Technical support",
                "Custom solutions",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-500 text-white">
                <Clock3 className="size-5" />
              </span>

              <div>
                <p className="text-sm font-black text-blue-200">
                  Contact availability
                </p>
                <p className="mt-2 text-xl font-black">Monday to Friday</p>
                <p className="mt-1 text-sm text-white/55">
                  8:00 AM – 5:00 PM, Central Africa Time
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-sm leading-7 text-white/60">
                You can still send an email or WhatsApp message outside these
                hours. The team will respond when available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1350px] gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {contactOptions.map((option) => {
            const Icon = option.icon;

            return (
              <a
                key={option.title}
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  option.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group bg-white p-6 transition hover:bg-blue-50"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="size-5" />
                </span>

                <p className="mt-4 text-sm font-black text-[#10104b]">
                  {option.title}
                </p>

                <p className="mt-1 font-bold text-blue-700">{option.value}</p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {option.description}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Send an enquiry
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Tell us what your business needs.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Share some information about your business and the service you are
              interested in.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700">
                  <Building2 className="size-5" />
                </span>

                <div>
                  <p className="font-black text-[#10104b]">
                    Developed by AsyncAfrica
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Vizo is a business visibility product developed in Kigali,
                    Rwanda.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700">
                  <Globe2 className="size-5" />
                </span>

                <div>
                  <p className="font-black text-[#10104b]">
                    Different business types
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    We support hospitality, restaurants, beauty, retail and
                    professional services.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700">
                  <Bot className="size-5" />
                </span>

                <div>
                  <p className="font-black text-[#10104b]">
                    Search and AI visibility
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    We help organize business information for modern discovery
                    platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={submitContact}
            className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-sm font-bold text-slate-700"
                >
                  Full name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className="mt-2 h-13 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 h-13 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="text-sm font-bold text-slate-700"
                >
                  Phone number
                </label>

                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+250 ..."
                  className="mt-2 h-13 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-business"
                  className="text-sm font-bold text-slate-700"
                >
                  Business name
                </label>

                <input
                  id="contact-business"
                  name="business"
                  type="text"
                  placeholder="Your business name"
                  className="mt-2 h-13 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-inquiry"
                className="text-sm font-bold text-slate-700"
              >
                What do you need help with?
              </label>

              <select
                id="contact-inquiry"
                name="inquiry"
                required
                defaultValue=""
                className="mt-2 h-13 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select a service
                </option>

                {inquiryTypes.map((inquiry) => (
                  <option key={inquiry} value={inquiry}>
                    {inquiry}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="text-sm font-bold text-slate-700"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="Tell us about your business and what you want to improve..."
                className="mt-2 w-full resize-y rounded-xl border border-slate-300 p-4 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group mt-6 inline-flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="size-5" />
              {submitting ? "Opening email..." : "Continue with email"}
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              This opens your email application with the completed message. It
              does not store the message on the website.
            </p>
          </form>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-100 text-blue-700">
              <CircleHelp className="size-6" />
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Common questions
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-lg"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-black text-[#10104b]">
                  {item.question}

                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-lg transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20">
        <div className="mx-auto flex max-w-[1250px] flex-col items-center justify-between gap-7 rounded-[32px] bg-[#10104b] p-7 text-white sm:p-10 lg:flex-row lg:p-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-300">
              <MessageCircle className="size-5" />
              <span className="text-sm font-black">
                Prefer a quick conversation?
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Send Vizo a WhatsApp message.
            </h2>

            <p className="mt-3 leading-7 text-white/65">
              Tell us your business name and the visibility service you are
              interested in.
            </p>
          </div>

          <a
            href="https://wa.me/250782667888?text=Hello%20Vizo%2C%20I%20would%20like%20to%20discuss%20my%20business%20visibility."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-13 w-full items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-blue-50 sm:w-auto"
          >
            Open WhatsApp
            <ArrowRight className="size-5 transition group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <style>{`
        @keyframes contactEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
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
