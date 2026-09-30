"use client";

import { LoaderCircle, LocateFixed, MapPin, Save, X } from "lucide-react";
import { type FormEvent, useState } from "react";

import type {
  BusinessLocation,
  BusinessLocationForm,
} from "@/types/business-location";

interface LocationFormModalProps {
  location: BusinessLocation | null;
  saving: boolean;
  errors: Record<string, string>;
  onClose: () => void;
  onSave: (form: BusinessLocationForm) => Promise<void>;
}

const emptyForm: BusinessLocationForm = {
  name: "",
  is_main: false,
  is_active: true,

  country_code: "RW",
  country: "Rwanda",
  province: "",
  district: "",
  city: "",
  sector: "",
  cell: "",
  village: "",
  street_address: "",
  postal_code: "",

  latitude: "",
  longitude: "",

  phone: "",
  whatsapp: "",
  email: "",
  google_maps_url: "",
  offers_delivery: false,
};

function locationToForm(
  location: BusinessLocation | null,
): BusinessLocationForm {
  if (!location) {
    return emptyForm;
  }

  return {
    name: location.name,
    is_main: location.is_main,
    is_active: location.is_active,

    country_code: location.address.country_code ?? "RW",
    country: location.address.country ?? "Rwanda",
    province: location.address.province ?? "",
    district: location.address.district ?? "",
    city: location.address.city ?? "",
    sector: location.address.sector ?? "",
    cell: location.address.cell ?? "",
    village: location.address.village ?? "",
    street_address: location.address.street_address ?? "",
    postal_code: location.address.postal_code ?? "",

    latitude: location.coordinates.latitude ?? "",
    longitude: location.coordinates.longitude ?? "",

    phone: location.phone ?? "",
    whatsapp: location.whatsapp ?? "",
    email: location.email ?? "",
    google_maps_url: location.google_maps_url ?? "",
    offers_delivery: location.offers_delivery,
  };
}

interface FormInputProps {
  label: string;
  field: keyof BusinessLocationForm;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (field: keyof BusinessLocationForm, value: string) => void;
}

function FormInput({
  label,
  field,
  value,
  error,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: FormInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-800">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(field, event.target.value)}
        className={`mt-2 h-11 w-full rounded-xl border bg-white px-4 text-sm outline-none transition focus:ring-4 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
        }`}
      />

      {error ? (
        <span className="mt-1 block text-xs font-semibold text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function LocationFormModal({
  location,
  saving,
  errors,
  onClose,
  onSave,
}: LocationFormModalProps) {
  const [form, setForm] = useState<BusinessLocationForm>(() =>
    locationToForm(location),
  );
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  function updateField(
    field: keyof BusinessLocationForm,
    value: string | boolean,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError("Your browser does not support location access.");

      return;
    }

    setLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((current) => ({
          ...current,
          latitude: position.coords.latitude.toFixed(7),
          longitude: position.coords.longitude.toFixed(7),
        }));

        setLocating(false);
      },
      () => {
        setLocationError(
          "Unable to access your location. Check your browser permissions.",
        );
        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
      },
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <form
          onSubmit={submit}
          className="my-6 w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                Business location
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                {location ? `Edit ${location.name}` : "Add a location"}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              aria-label="Close"
            >
              <X size={19} />
            </button>
          </header>

          <div className="max-h-[72vh] space-y-8 overflow-y-auto p-5 sm:p-8">
            <section>
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin size={19} />
                </div>
                <div>
                  <h3 className="font-black text-slate-950">
                    Branch information
                  </h3>
                  <p className="text-sm text-slate-500">
                    Name and availability of this location.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <FormInput
                  label="Location name"
                  field="name"
                  value={form.name}
                  required
                  placeholder="Kigali Main Branch"
                  error={errors.name}
                  onChange={updateField}
                />

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={form.is_main}
                      disabled={location?.is_main === true}
                      onChange={(event) =>
                        updateField("is_main", event.target.checked)
                      }
                      className="size-4 accent-blue-600"
                    />
                    <span className="text-sm font-bold text-slate-700">
                      Main branch
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(event) =>
                        updateField("is_active", event.target.checked)
                      }
                      className="size-4 accent-blue-600"
                    />
                    <span className="text-sm font-bold text-slate-700">
                      Active
                    </span>
                  </label>
                </div>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-7">
              <h3 className="font-black text-slate-950">Address</h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <FormInput
                  label="Country code"
                  field="country_code"
                  value={form.country_code}
                  placeholder="RW"
                  error={errors.country_code}
                  onChange={updateField}
                />

                <FormInput
                  label="Country"
                  field="country"
                  value={form.country}
                  placeholder="Rwanda"
                  error={errors.country}
                  onChange={updateField}
                />

                <FormInput
                  label="Province"
                  field="province"
                  value={form.province}
                  placeholder="Kigali City"
                  error={errors.province}
                  onChange={updateField}
                />

                <FormInput
                  label="District"
                  field="district"
                  value={form.district}
                  placeholder="Gasabo"
                  error={errors.district}
                  onChange={updateField}
                />

                <FormInput
                  label="City"
                  field="city"
                  value={form.city}
                  placeholder="Kigali"
                  error={errors.city}
                  onChange={updateField}
                />

                <FormInput
                  label="Sector"
                  field="sector"
                  value={form.sector}
                  placeholder="Remera"
                  error={errors.sector}
                  onChange={updateField}
                />

                <FormInput
                  label="Cell"
                  field="cell"
                  value={form.cell}
                  placeholder="Rukiri"
                  error={errors.cell}
                  onChange={updateField}
                />

                <FormInput
                  label="Village"
                  field="village"
                  value={form.village}
                  placeholder="Your village"
                  error={errors.village}
                  onChange={updateField}
                />

                <FormInput
                  label="Postal code"
                  field="postal_code"
                  value={form.postal_code}
                  error={errors.postal_code}
                  onChange={updateField}
                />

                <div className="sm:col-span-2 lg:col-span-3">
                  <FormInput
                    label="Street address"
                    field="street_address"
                    value={form.street_address}
                    placeholder="Street, building and nearby landmark"
                    error={errors.street_address}
                    onChange={updateField}
                  />
                </div>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-black text-slate-950">Map position</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Add both latitude and longitude.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={useCurrentLocation}
                  disabled={locating}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 text-sm font-black text-blue-700 transition hover:bg-blue-100 disabled:opacity-60"
                >
                  {locating ? (
                    <LoaderCircle className="animate-spin" size={17} />
                  ) : (
                    <LocateFixed size={17} />
                  )}
                  Use current location
                </button>
              </div>

              {locationError ? (
                <p className="mt-3 text-sm font-semibold text-red-600">
                  {locationError}
                </p>
              ) : null}

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <FormInput
                  label="Latitude"
                  field="latitude"
                  type="number"
                  value={form.latitude}
                  placeholder="-1.9440727"
                  error={errors.latitude}
                  onChange={updateField}
                />

                <FormInput
                  label="Longitude"
                  field="longitude"
                  type="number"
                  value={form.longitude}
                  placeholder="30.0618851"
                  error={errors.longitude}
                  onChange={updateField}
                />

                <div className="sm:col-span-2">
                  <FormInput
                    label="Google Maps URL"
                    field="google_maps_url"
                    type="url"
                    value={form.google_maps_url}
                    placeholder="https://maps.google.com/..."
                    error={errors.google_maps_url}
                    onChange={updateField}
                  />
                </div>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-7">
              <h3 className="font-black text-slate-950">
                Contact and delivery
              </h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <FormInput
                  label="Phone"
                  field="phone"
                  value={form.phone}
                  placeholder="+250 788 000 000"
                  error={errors.phone}
                  onChange={updateField}
                />

                <FormInput
                  label="WhatsApp"
                  field="whatsapp"
                  value={form.whatsapp}
                  placeholder="+250 788 000 000"
                  error={errors.whatsapp}
                  onChange={updateField}
                />

                <FormInput
                  label="Email"
                  field="email"
                  type="email"
                  value={form.email}
                  placeholder="branch@example.com"
                  error={errors.email}
                  onChange={updateField}
                />
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <input
                  type="checkbox"
                  checked={form.offers_delivery}
                  onChange={(event) =>
                    updateField("offers_delivery", event.target.checked)
                  }
                  className="size-5 accent-blue-600"
                />

                <div>
                  <p className="font-black text-slate-900">
                    This location offers delivery
                  </p>
                  <p className="text-sm text-slate-500">
                    Customers and AI platforms can identify delivery
                    availability.
                  </p>
                </div>
              </label>
            </section>
          </div>

          <footer className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-8">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="h-11 rounded-xl border border-slate-300 px-5 text-sm font-black text-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle className="animate-spin" size={17} />
              ) : (
                <Save size={17} />
              )}

              {saving
                ? "Saving..."
                : location
                  ? "Save changes"
                  : "Add location"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
