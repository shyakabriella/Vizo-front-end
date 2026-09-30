"use client";

import {
  Building2,
  CheckCircle2,
  ExternalLink,
  LoaderCircle,
  MapPin,
  MapPinned,
  MoreVertical,
  Pencil,
  Plus,
  RefreshCw,
  Star,
  Trash2,
  Truck,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { LocationFormModal } from "@/components/business-workspace/location-form-modal";
import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  createBusinessLocation,
  deleteBusinessLocation,
  getBusinessLocations,
  getLocationError,
  getLocationFieldErrors,
  updateBusinessLocation,
} from "@/services/business-location.service";
import type {
  BusinessLocation,
  BusinessLocationForm,
} from "@/types/business-location";

function formatAddress(location: BusinessLocation): string {
  return [
    location.address.street_address,
    location.address.village,
    location.address.cell,
    location.address.sector,
    location.address.district,
    location.address.city,
    location.address.province,
    location.address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export default function LocationsPage() {
  const { selectedBusiness, isLoading: loadingBusiness } =
    useBusinessWorkspace();

  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<BusinessLocation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loadLocations = useCallback(async () => {
    if (!selectedBusiness) {
      setLocations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const results = await getBusinessLocations(selectedBusiness.public_id);

      setLocations(results);
    } catch (requestError) {
      setError(
        getLocationError(requestError, "Unable to load business locations."),
      );
    } finally {
      setLoading(false);
    }
  }, [selectedBusiness]);

  useEffect(() => {
    void loadLocations();
  }, [loadLocations]);

  function openCreate() {
    setEditing(null);
    setFieldErrors({});
    setError("");
    setMessage("");
    setModalOpen(true);
  }

  function openEdit(location: BusinessLocation) {
    setEditing(location);
    setFieldErrors({});
    setError("");
    setMessage("");
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditing(null);
    setFieldErrors({});
  }

  async function saveLocation(form: BusinessLocationForm) {
    if (!selectedBusiness) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");
      setFieldErrors({});

      const response = editing
        ? await updateBusinessLocation(
            selectedBusiness.public_id,
            editing.public_id,
            form,
          )
        : await createBusinessLocation(selectedBusiness.public_id, form);

      setMessage(
        response.message ??
          (editing
            ? "Location updated successfully."
            : "Location created successfully."),
      );

      setModalOpen(false);
      setEditing(null);
      await loadLocations();
    } catch (requestError) {
      setFieldErrors(getLocationFieldErrors(requestError));

      setError(getLocationError(requestError, "Unable to save the location."));
    } finally {
      setSaving(false);
    }
  }

  async function removeLocation(location: BusinessLocation) {
    if (!selectedBusiness) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${location.name}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(location.public_id);
      setError("");
      setMessage("");

      const response = await deleteBusinessLocation(
        selectedBusiness.public_id,
        location.public_id,
      );

      setMessage(response.message);
      await loadLocations();
    } catch (requestError) {
      setError(
        getLocationError(requestError, "Unable to delete the location."),
      );
    } finally {
      setDeletingId(null);
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
        <p className="mt-2 text-slate-500">
          A business is required before adding locations.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Business locations
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Locations for {selectedBusiness.name}
          </h1>

          <p className="mt-2 max-w-2xl leading-7 text-slate-500">
            Manage branches, addresses, map coordinates and location contact
            information.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add location
        </button>
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

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-500">
            Total locations
          </p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {locations.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-500">
            Active locations
          </p>
          <p className="mt-2 text-3xl font-black text-emerald-600">
            {locations.filter((location) => location.is_active).length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-500">
            Delivery locations
          </p>
          <p className="mt-2 text-3xl font-black text-blue-600">
            {locations.filter((location) => location.offers_delivery).length}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 grid min-h-64 place-items-center rounded-3xl border border-slate-200 bg-white">
          <div className="text-center text-slate-500">
            <LoaderCircle
              className="mx-auto animate-spin text-blue-600"
              size={30}
            />
            <p className="mt-3 text-sm">Loading locations...</p>
          </div>
        </div>
      ) : locations.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <MapPinned size={25} />
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-950">
            No locations added
          </h2>

          <p className="mx-auto mt-2 max-w-lg leading-7 text-slate-500">
            Add the main location where customers can find{" "}
            {selectedBusiness.name}.
          </p>

          <button
            type="button"
            onClick={openCreate}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white"
          >
            <Plus size={17} />
            Add first location
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {locations.map((location) => {
            const address = formatAddress(location);

            return (
              <article
                key={location.public_id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                      <MapPin size={22} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-black text-slate-950">
                          {location.name}
                        </h2>

                        {location.is_main ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700">
                            <Star size={12} fill="currentColor" />
                            Main
                          </span>
                        ) : null}

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-black ${
                            location.is_active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {location.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {address || "Address not added"}
                      </p>
                    </div>
                  </div>

                  <MoreVertical className="shrink-0 text-slate-300" size={20} />
                </div>

                <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Phone
                    </p>
                    <p className="mt-1 font-semibold text-slate-700">
                      {location.phone ?? "Not added"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Delivery
                    </p>
                    <p className="mt-1 flex items-center gap-2 font-semibold text-slate-700">
                      <Truck size={15} />
                      {location.offers_delivery ? "Available" : "Not available"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(location)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  {location.google_maps_url ? (
                    <a
                      href={location.google_maps_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                    >
                      <ExternalLink size={15} />
                      Open map
                    </a>
                  ) : null}

                  <button
                    type="button"
                    disabled={deletingId === location.public_id}
                    onClick={() => void removeLocation(location)}
                    className="ml-auto inline-flex h-10 items-center gap-2 rounded-xl border border-red-100 px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === location.public_id ? (
                      <LoaderCircle className="animate-spin" size={15} />
                    ) : (
                      <Trash2 size={15} />
                    )}
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!loading && locations.length > 0 ? (
        <button
          type="button"
          onClick={() => void loadLocations()}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-blue-600"
        >
          <RefreshCw size={16} />
          Refresh locations
        </button>
      ) : null}

      {modalOpen ? (
        <LocationFormModal
          key={editing?.public_id ?? "new"}
          location={editing}
          saving={saving}
          errors={fieldErrors}
          onClose={closeModal}
          onSave={saveLocation}
        />
      ) : null}
    </div>
  );
}
