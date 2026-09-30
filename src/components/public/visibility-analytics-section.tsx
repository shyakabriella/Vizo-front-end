import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CircleAlert,
  Code2,
  FileCheck2,
  Gauge,
  Globe2,
  Lightbulb,
  Link2,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const measurements = [
  {
    icon: FileCheck2,
    title: "Profile completeness",
    description:
      "Measure whether important business, location and service information is available.",
    value: "88%",
    change: "+12%",
  },
  {
    icon: Globe2,
    title: "Website status",
    description:
      "Monitor whether the business website and connected visibility resources are reachable.",
    value: "Online",
    change: "Healthy",
  },
  {
    icon: Code2,
    title: "Structured data",
    description:
      "Check whether machine-readable business information is installed and valid.",
    value: "72%",
    change: "+18%",
  },
  {
    icon: Bot,
    title: "AI readiness",
    description:
      "Review the information signals needed for AI systems to interpret the business.",
    value: "64%",
    change: "+9%",
  },
  {
    icon: Link2,
    title: "Connection status",
    description:
      "Confirm that Website Connect remains correctly installed on the website.",
    value: "Active",
    change: "Connected",
  },
  {
    icon: Search,
    title: "Content quality",
    description:
      "Measure the clarity and completeness of business and service descriptions.",
    value: "79%",
    change: "+7%",
  },
];

const history = [
  { month: "May", score: 36 },
  { month: "Jun", score: 45 },
  { month: "Jul", score: 53 },
  { month: "Aug", score: 61 },
  { month: "Sep", score: 74 },
  { month: "Oct", score: 82 },
];

const recommendations = [
  {
    icon: CircleAlert,
    title: "Add missing service prices",
    category: "Content",
    priority: "High",
    style: "bg-red-50 text-red-700",
  },
  {
    icon: Code2,
    title: "Complete location structured data",
    category: "Technical",
    priority: "Medium",
    style: "bg-amber-50 text-amber-700",
  },
  {
    icon: Lightbulb,
    title: "Improve the main business description",
    category: "Profile",
    priority: "Recommended",
    style: "bg-blue-50 text-blue-700",
  },
];

export function VisibilityAnalyticsSection() {
  return (
    <>
      <section
        id="analytics"
        className="scroll-mt-20 overflow-hidden bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18"
      >
        <div className="mx-auto max-w-[1350px]">
          <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-700">
                <BarChart3 className="size-4" />
                Visibility analytics
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.04em] text-[#10104b] sm:text-5xl">
                Turn visibility information into clear business actions.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-slate-600">
                Vizo brings important visibility measurements together so you
                can understand what is working and what needs attention.
              </p>

              <p className="mt-4 max-w-xl leading-8 text-slate-600">
                Instead of receiving a complex technical report, you see clear
                scores, installation status and prioritized recommendations.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "One visibility score",
                  "Simple category measurements",
                  "Progress history",
                  "Prioritized improvement tasks",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/register?intent=visibility-analytics"
                className="group mt-8 inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#10104b] px-7 font-black text-white transition hover:bg-[#211e67]"
              >
                Monitor my visibility
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/8 sm:p-7">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">
                    Example dashboard
                  </p>
                  <h3 className="mt-1 text-xl font-black text-[#10104b]">
                    Aspecto Spa visibility
                  </h3>
                </div>

                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  Updated today
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[170px_1fr]">
                <div className="flex flex-col items-center justify-center rounded-3xl bg-[#10104b] p-5 text-white">
                  <div
                    className="grid size-32 place-items-center rounded-full"
                    style={{
                      background:
                        "conic-gradient(#60a5fa 295deg, rgba(255,255,255,0.12) 295deg)",
                    }}
                  >
                    <div className="grid size-25 place-items-center rounded-full bg-[#10104b]">
                      <div className="text-center">
                        <p className="text-4xl font-black">82</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                          Score
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-black text-emerald-300">
                    <TrendingUp className="size-4" />
                    18 points improved
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Profile", "88%", "bg-emerald-500"],
                    ["Website", "100%", "bg-emerald-500"],
                    ["Schema", "72%", "bg-blue-500"],
                    ["AI ready", "64%", "bg-amber-500"],
                  ].map(([label, value, color]) => (
                    <div key={label} className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold text-slate-400">
                        {label}
                      </p>
                      <p className="mt-2 text-xl font-black text-[#10104b]">
                        {value}
                      </p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full ${color}`}
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Activity className="mt-0.5 size-5 shrink-0 text-blue-600" />
                  <div>
                    <p className="text-sm font-black text-[#10104b]">
                      Visibility is improving
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Structured data and business profile improvements
                      increased the example score this month.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-[11px] text-slate-400">
                Preview data shown for demonstration. Real scores come from your
                connected business.
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-slate-200 pt-14">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
                What you can measure
              </p>

              <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-4xl">
                Important signals in one dashboard
              </h3>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {measurements.map((measurement) => {
                const Icon = measurement.icon;

                return (
                  <article
                    key={measurement.title}
                    className="group rounded-3xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="size-5" />
                      </span>

                      <div className="text-right">
                        <p className="font-black text-[#10104b]">
                          {measurement.value}
                        </p>
                        <p className="mt-1 text-xs font-black text-emerald-600">
                          {measurement.change}
                        </p>
                      </div>
                    </div>

                    <h4 className="mt-5 font-black text-[#10104b]">
                      {measurement.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {measurement.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Progress history
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              See how visibility improves over time.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Keep a record of visibility audits and understand which changes
              improved the business profile and technical setup.
            </p>

            <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    Visibility score
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#10104b]">
                    Six-month progress
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  +46 points
                </span>
              </div>

              <div className="mt-8 flex h-52 items-end gap-3">
                {history.map((item, index) => (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="mb-2 text-center text-xs font-black text-slate-500">
                      {item.score}
                    </div>

                    <div
                      className={`w-full rounded-t-xl transition hover:opacity-80 ${
                        index === history.length - 1
                          ? "bg-blue-600"
                          : "bg-blue-200"
                      }`}
                      style={{ height: `${item.score}%` }}
                    />

                    <p className="mt-3 text-center text-xs font-bold text-slate-400">
                      {item.month}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Improvement tasks
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Focus on improvements that matter.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Vizo translates measurements into clear tasks. Each task explains
              the affected visibility area and its priority.
            </p>

            <div className="mt-8 space-y-3">
              {recommendations.map((recommendation) => {
                const Icon = recommendation.icon;

                return (
                  <article
                    key={recommendation.title}
                    className="rounded-3xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-2xl ${recommendation.style}`}
                      >
                        <Icon className="size-5" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                              {recommendation.category}
                            </p>
                            <h3 className="mt-1 font-black text-[#10104b]">
                              {recommendation.title}
                            </h3>
                          </div>

                          <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-black ${recommendation.style}`}
                          >
                            {recommendation.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl bg-[#10104b] p-6 text-white">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10">
                  <Gauge className="size-5 text-blue-300" />
                </span>

                <div>
                  <h3 className="font-black">Start with a visibility audit</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    Your first audit creates the baseline used to measure future
                    improvements.
                  </p>

                  <Link
                    href="/audit"
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-300"
                  >
                    Run business audit
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
