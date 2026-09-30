"use client";

import {
  Building2,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MapPin,
  Save,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { WeeklyHoursEditor } from "@/components/business-workspace/weekly-hours-editor";
import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import { getBusinessLocations } from "@/services/business-location.service";
import {
  getOpeningHours,
  getOpeningHoursError,
  saveOpeningHours,
} from "@/services/opening-hour.service";
import type { BusinessLocation } from "@/types/business-location";
import type { OpeningDay } from "@/types/opening-hour";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function defaultSchedule(): OpeningDay[] {
  return dayNames.map((dayName, dayOfWeek) => ({
    day_of_week: dayOfWeek,
    day_name: dayName,
    is_closed: dayOfWeek === 0,
    periods:
      dayOfWeek === 0
        ? []
        : [
            {
              opens_at: "08:00",
              closes_at: "18:00",
            },
          ],
  }));
}

function validateSchedule(days: OpeningDay[]): string | null {
  if (days.length !== 7) {
    return "All seven days are required.";
  }

  for (const day of days) {
    if (!day.is_closed && day.periods.length === 0) {
      return `${day.day_name} must have at least one opening period.`;
    }

    if (day.is_closed && day.periods.length > 0) {
      return `${day.day_name} is closed and cannot contain opening periods.`;
    }

    for (const period of day.periods) {
      if (!period.opens_at || !period.closes_at) {
        return `Complete all opening and closing times for ${day.day_name}.`;
      }

      if (period.opens_at === period.closes_at) {
        return `${day.day_name} opening and closing times must be different.`;
      }
    }
  }

  return null;
}

export default function OpeningHoursPage() {
  const { selectedBusiness, isLoading: loadingBusiness } =
    useBusinessWorkspace();

  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [days, setDays] = useState<OpeningDay[]>(defaultSchedule());

  const [loadingLocations, setLoadingLocations] = useState(true);
  const [loadingHours, setLoadingHours] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedLocation = useMemo(
    () =>
      locations.find((location) => location.public_id === selectedLocationId) ??
      null,
    [locations, selectedLocationId],
  );

  const loadLocations = useCallback(async () => {
    if (!selectedBusiness) {
      setLocations([]);
      setSelectedLocationId("");
      setLoadingLocations(false);
      return;
    }

    try {
      setLoadingLocations(true);
      setError("");

      const results = await getBusinessLocations(selectedBusiness.public_id);

      setLocations(results);

      const mainLocation =
        results.find((location) => location.is_main) ?? results[0];

      setSelectedLocationId(mainLocation?.public_id ?? "");
    } catch (requestError) {
      setError(
        getOpeningHoursError(
          requestError,
          "Unable to load business locations.",
        ),
      );
    } finally {
      setLoadingLocations(false);
    }
  }, [selectedBusiness]);

  const loadHours = useCallback(async () => {
    if (!selectedBusiness || !selectedLocationId) {
      setDays(defaultSchedule());
      return;
    }

    try {
      setLoadingHours(true);
      setError("");
      setMessage("");

      const schedule = await getOpeningHours(
        selectedBusiness.public_id,
        selectedLocationId,
      );

      const hasSavedHours = schedule.some(
        (day) => !day.is_closed || day.periods.length > 0,
      );

      setDays(hasSavedHours ? schedule : defaultSchedule());
    } catch (requestError) {
      setError(
        getOpeningHoursError(requestError, "Unable to load opening hours."),
      );
    } finally {
      setLoadingHours(false);
    }
  }, [selectedBusiness, selectedLocationId]);

  useEffect(() => {
    void loadLocations();
  }, [loadLocations]);

  useEffect(() => {
    void loadHours();
  }, [loadHours]);

  async function save() {
    if (!selectedBusiness || !selectedLocationId) {
      return;
    }

    const validationError = validateSchedule(days);

    if (validationError) {
      setError(validationError);
      setMessage("");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await saveOpeningHours(
        selectedBusiness.public_id,
        selectedLocationId,
        days,
      );

      setDays(response.data.days);
      setMessage(response.message ?? "Opening hours saved successfully.");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (requestError) {
      setError(
        getOpeningHoursError(requestError, "Unable to save opening hours."),
      );
    } finally {
      setSaving(false);
    }
  }

  if (loadingBusiness) {
    return (
      <div className="grid min-h-[55vh] place-items-center">
        <LoaderCircle className="animate-spin text-blue-600" size={34} />
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <Building2 className="mx-auto text-blue-600" size={36} />
        <h1 className="mt-4 text-2xl font-black text-slate-950">
          Create a business first
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          Opening hours
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Weekly business hours
        </h1>

        <p className="mt-2 max-w-2xl leading-7 text-slate-500">
          Tell customers, search engines and AI assistants when each location is
          open.
        </p>
      </div>

      {message ? (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700">
          <CheckCircle2 size={18} />
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <label className="block flex-1">
            <span className="text-sm font-black text-slate-800">
              Business location
            </span>

            <div className="relative mt-2">
              <MapPin
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-600"
                size={18}
              />

              <select
                value={selectedLocationId}
                disabled={loadingLocations}
                onChange={(event) => setSelectedLocationId(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {loadingLocations ? (
                  <option>Loading locations...</option>
                ) : null}

                {!loadingLocations && locations.length === 0 ? (
                  <option value="">No locations available</option>
                ) : null}

                {locations.map((location) => (
                  <option key={location.public_id} value={location.public_id}>
                    {location.name}
                    {location.is_main ? " — Main" : ""}
                  </option>
                ))}
              </select>
            </div>
          </label>

          {selectedLocation ? (
            <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800">
              <span className="font-black">Editing:</span>{" "}
              {selectedLocation.name}
            </div>
          ) : null}
        </div>
      </section>

      {loadingLocations || loadingHours ? (
        <div className="mt-6 grid min-h-80 place-items-center rounded-3xl border border-slate-200 bg-white">
          <div className="text-center text-slate-500">
            <LoaderCircle
              className="mx-auto animate-spin text-blue-600"
              size={32}
            />
            <p className="mt-3 text-sm">Loading schedule...</p>
          </div>
        </div>
      ) : locations.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <MapPin className="mx-auto text-blue-600" size={36} />

          <h2 className="mt-4 text-xl font-black text-slate-950">
            Add a location first
          </h2>

          <p className="mt-2 text-slate-500">
            Opening hours must belong to a business location.
          </p>
        </div>
      ) : (
        <>
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <WeeklyHoursEditor
              days={days}
              disabled={saving}
              onChange={setDays}
            />
          </section>

          <div className="sticky bottom-4 mt-6 flex justify-end rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
            <button
              type="button"
              disabled={saving || !selectedLocationId}
              onClick={() => void save()}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}

              {saving ? "Saving hours..." : "Save opening hours"}
            </button>
          </div>
        </>
      )}

      <section className="mt-8 rounded-3xl bg-[#10173d] p-6 text-white sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-300">
            <Clock3 size={20} />
          </div>

          <div>
            <h2 className="font-black">Why opening hours matter</h2>
            <p className="mt-2 max-w-3xl leading-7 text-blue-100/70">
              Accurate opening hours help customers know when to visit and allow
              search engines and AI assistants to answer questions such as “Is
              Aspecto Salon open now?”
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
