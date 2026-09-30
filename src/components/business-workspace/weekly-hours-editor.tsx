"use client";

import { Clock3, Copy, Plus, Trash2 } from "lucide-react";

import type { OpeningDay, OpeningPeriod } from "@/types/opening-hour";

interface WeeklyHoursEditorProps {
  days: OpeningDay[];
  disabled?: boolean;
  onChange: (days: OpeningDay[]) => void;
}

const displayOrder = [1, 2, 3, 4, 5, 6, 0];

function makeDefaultPeriod(): OpeningPeriod {
  return {
    opens_at: "08:00",
    closes_at: "18:00",
  };
}

export function WeeklyHoursEditor({
  days,
  disabled = false,
  onChange,
}: WeeklyHoursEditorProps) {
  function updateDay(
    dayOfWeek: number,
    updater: (day: OpeningDay) => OpeningDay,
  ) {
    onChange(
      days.map((day) => (day.day_of_week === dayOfWeek ? updater(day) : day)),
    );
  }

  function setClosed(dayOfWeek: number, isClosed: boolean) {
    updateDay(dayOfWeek, (day) => ({
      ...day,
      is_closed: isClosed,
      periods: isClosed
        ? []
        : day.periods.length > 0
          ? day.periods
          : [makeDefaultPeriod()],
    }));
  }

  function updatePeriod(
    dayOfWeek: number,
    periodIndex: number,
    field: keyof OpeningPeriod,
    value: string,
  ) {
    updateDay(dayOfWeek, (day) => ({
      ...day,
      periods: day.periods.map((period, index) =>
        index === periodIndex
          ? {
              ...period,
              [field]: value,
            }
          : period,
      ),
    }));
  }

  function addPeriod(dayOfWeek: number) {
    updateDay(dayOfWeek, (day) => {
      if (day.periods.length >= 3) {
        return day;
      }

      return {
        ...day,
        periods: [
          ...day.periods,
          {
            opens_at: "14:00",
            closes_at: "18:00",
          },
        ],
      };
    });
  }

  function removePeriod(dayOfWeek: number, periodIndex: number) {
    updateDay(dayOfWeek, (day) => {
      if (day.periods.length <= 1) {
        return day;
      }

      return {
        ...day,
        periods: day.periods.filter((_, index) => index !== periodIndex),
      };
    });
  }

  function copyMondayToWeekdays() {
    const monday = days.find((day) => day.day_of_week === 1);

    if (!monday) {
      return;
    }

    onChange(
      days.map((day) => {
        if (day.day_of_week < 1 || day.day_of_week > 5) {
          return day;
        }

        return {
          ...day,
          is_closed: monday.is_closed,
          periods: monday.periods.map((period) => ({ ...period })),
        };
      }),
    );
  }

  const orderedDays = displayOrder
    .map((dayNumber) => days.find((day) => day.day_of_week === dayNumber))
    .filter((day): day is OpeningDay => day !== undefined);

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">Weekly schedule</h2>
          <p className="mt-1 text-sm text-slate-500">
            Configure regular opening hours for this branch.
          </p>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={copyMondayToWeekdays}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-600 disabled:opacity-50"
        >
          <Copy size={16} />
          Copy Monday to weekdays
        </button>
      </div>

      <div className="divide-y divide-slate-200">
        {orderedDays.map((day) => (
          <div
            key={day.day_of_week}
            className="grid gap-4 py-6 lg:grid-cols-[150px_130px_1fr]"
          >
            <div>
              <p className="font-black text-slate-950">{day.day_name}</p>
              <p className="mt-1 text-xs text-slate-400">
                Day {day.day_of_week}
              </p>
            </div>

            <label className="flex h-11 cursor-pointer items-center gap-3 rounded-xl bg-slate-50 px-4">
              <input
                type="checkbox"
                checked={!day.is_closed}
                disabled={disabled}
                onChange={(event) =>
                  setClosed(day.day_of_week, !event.target.checked)
                }
                className="size-4 accent-blue-600"
              />

              <span
                className={`text-sm font-black ${
                  day.is_closed ? "text-slate-500" : "text-emerald-700"
                }`}
              >
                {day.is_closed ? "Closed" : "Open"}
              </span>
            </label>

            {day.is_closed ? (
              <div className="flex min-h-11 items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 text-sm text-slate-500">
                Closed all day
              </div>
            ) : (
              <div className="space-y-3">
                {day.periods.map((period, periodIndex) => (
                  <div
                    key={`${day.day_of_week}-${periodIndex}`}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center"
                  >
                    <div className="flex flex-1 items-center gap-2">
                      <Clock3 className="shrink-0 text-blue-600" size={17} />

                      <input
                        type="time"
                        value={period.opens_at}
                        disabled={disabled}
                        onChange={(event) =>
                          updatePeriod(
                            day.day_of_week,
                            periodIndex,
                            "opens_at",
                            event.target.value,
                          )
                        }
                        className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                      <span className="text-sm font-semibold text-slate-400">
                        to
                      </span>

                      <input
                        type="time"
                        value={period.closes_at}
                        disabled={disabled}
                        onChange={(event) =>
                          updatePeriod(
                            day.day_of_week,
                            periodIndex,
                            "closes_at",
                            event.target.value,
                          )
                        }
                        className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    {day.periods.length > 1 ? (
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() =>
                          removePeriod(day.day_of_week, periodIndex)
                        }
                        className="grid size-10 shrink-0 place-items-center rounded-xl text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                        aria-label="Remove period"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : null}
                  </div>
                ))}

                {day.periods.length < 3 ? (
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => addPeriod(day.day_of_week)}
                    className="inline-flex items-center gap-2 text-sm font-black text-blue-600 disabled:opacity-50"
                  >
                    <Plus size={16} />
                    Add another period
                  </button>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
