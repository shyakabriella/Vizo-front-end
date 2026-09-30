"use client";

import { ArrowLeft, Building2, LoaderCircle, Save } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

import {
  getBusinessError,
  getBusinessFieldErrors,
  getBusinessTypes,
} from "@/services/business.service";
import type { BusinessForm, BusinessTypeSummary } from "@/types/business";

interface BusinessProfileFormProps {
  title: string;
  description: string;
  submitLabel: string;
  initialValues: BusinessForm;
  onSubmit: (form: BusinessForm) => Promise<void>;
}

interface InputProps {
  label: string;
  name: keyof BusinessForm;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  onChange: (field: keyof BusinessForm, value: string) => void;
}

function FormInput({
  label,
  name,
  value,
  placeholder,
  type = "text",
  required = false,
  error,
  onChange,
}: InputProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-800">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(name, event.target.value)}
        className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
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

export function BusinessProfileForm({
  title,
  description,
  submitLabel,
  initialValues,
  onSubmit,
}: BusinessProfileFormProps) {
  const [form, setForm] = useState<BusinessForm>(initialValues);
  const [businessTypes, setBusinessTypes] = useState<BusinessTypeSummary[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  useEffect(() => {
    async function loadTypes() {
      try {
        setLoadingTypes(true);
        setMessage("");

        const results = await getBusinessTypes();

        setBusinessTypes(results);

        if (!form.business_type_id && results[0]) {
          setForm((current) => ({
            ...current,
            business_type_id: String(results[0].id),
          }));
        }
      } catch (error) {
        setMessage(getBusinessError(error, "Unable to load business types."));
      } finally {
        setLoadingTypes(false);
      }
    }

    void loadTypes();
  }, [form.business_type_id]);

  function updateField(field: keyof BusinessForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      const next = { ...current };
      delete next[field];

      return next;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.business_type_id) {
      setErrors({
        business_type_id: "Select a business type.",
      });

      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setErrors({});

      await onSubmit(form);
    } catch (error) {
      setErrors(getBusinessFieldErrors(error));
      setMessage(getBusinessError(error, "Unable to save the business."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={17} />
        Back to dashboard
      </Link>

      <div className="mt-5">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          Business profile
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl leading-7 text-slate-500">{description}</p>
      </div>

      {message ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {message}
        </div>
      ) : null}

      <form onSubmit={submit} className="mt-8 space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <Building2 size={20} />
            </div>

            <div>
              <h2 className="font-black text-slate-950">Business identity</h2>
              <p className="text-sm text-slate-500">
                Basic information used to identify your business.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-800">
                Business type
                <span className="ml-1 text-red-500">*</span>
              </span>

              <select
                value={form.business_type_id}
                required
                disabled={loadingTypes}
                onChange={(event) =>
                  updateField("business_type_id", event.target.value)
                }
                className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:ring-4 ${
                  errors.business_type_id
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              >
                <option value="">
                  {loadingTypes
                    ? "Loading business types..."
                    : "Select business type"}
                </option>

                {businessTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

              {errors.business_type_id ? (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.business_type_id}
                </span>
              ) : null}
            </label>

            <FormInput
              label="Business name"
              name="name"
              value={form.name}
              placeholder="Example: Aspecto Spa"
              required
              error={errors.name}
              onChange={updateField}
            />

            <FormInput
              label="Legal name"
              name="legal_name"
              value={form.legal_name}
              placeholder="Registered company name"
              error={errors.legal_name}
              onChange={updateField}
            />

            <FormInput
              label="Business email"
              name="email"
              type="email"
              value={form.email}
              placeholder="info@example.com"
              error={errors.email}
              onChange={updateField}
            />

            <div className="sm:col-span-2">
              <label className="block">
                <span className="text-sm font-bold text-slate-800">
                  Business description
                </span>

                <textarea
                  value={form.description}
                  rows={6}
                  maxLength={5000}
                  placeholder="Explain what your business offers and what makes it different."
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  className={`mt-2 w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                    errors.description
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                <div className="mt-1 flex justify-between text-xs">
                  <span className="font-semibold text-red-600">
                    {errors.description ?? ""}
                  </span>
                  <span className="text-slate-400">
                    {form.description.length}/5000
                  </span>
                </div>
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="font-black text-slate-950">Contact and website</h2>

          <p className="mt-1 text-sm text-slate-500">
            Information customers and AI platforms can use to contact your
            business.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <FormInput
              label="Phone number"
              name="phone"
              value={form.phone}
              placeholder="+250 788 000 000"
              error={errors.phone}
              onChange={updateField}
            />

            <FormInput
              label="WhatsApp number"
              name="whatsapp"
              value={form.whatsapp}
              placeholder="+250 788 000 000"
              error={errors.whatsapp}
              onChange={updateField}
            />

            <div className="sm:col-span-2">
              <FormInput
                label="Website"
                name="website"
                type="url"
                value={form.website}
                placeholder="https://example.com"
                error={errors.website}
                onChange={updateField}
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="font-black text-slate-950">Regional settings</h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            <FormInput
              label="Currency"
              name="currency"
              value={form.currency}
              placeholder="RWF"
              required
              error={errors.currency}
              onChange={updateField}
            />

            <label className="block">
              <span className="text-sm font-bold text-slate-800">Timezone</span>

              <select
                value={form.timezone}
                onChange={(event) =>
                  updateField("timezone", event.target.value)
                }
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="Africa/Kigali">Africa/Kigali</option>
                <option value="Africa/Juba">Africa/Juba</option>
                <option value="Africa/Nairobi">Africa/Nairobi</option>
                <option value="Africa/Kampala">Africa/Kampala</option>
                <option value="UTC">UTC</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-800">
                Default language
              </span>

              <select
                value={form.default_language}
                onChange={(event) =>
                  updateField("default_language", event.target.value)
                }
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </label>
          </div>
        </section>

        <div className="sticky bottom-4 flex justify-end rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
          <button
            type="submit"
            disabled={saving || loadingTypes}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}

            {saving ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
