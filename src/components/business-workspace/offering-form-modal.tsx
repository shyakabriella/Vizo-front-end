"use client";

import { ImagePlus, LoaderCircle, Save, Trash2, X } from "lucide-react";
import { type FormEvent, useState } from "react";

import type {
  Offering,
  OfferingCategory,
  OfferingForm,
  OfferingPricingType,
  OfferingType,
} from "@/types/offering";

interface Props {
  offering: Offering | null;
  categories: OfferingCategory[];
  currency: string;
  saving: boolean;
  errors: Record<string, string>;
  onClose: () => void;
  onSave: (form: OfferingForm) => Promise<void>;
}

function makeForm(offering: Offering | null, currency: string): OfferingForm {
  return {
    category_public_id: offering?.category?.public_id ?? "",
    type: offering?.type ?? "service",
    name: offering?.name ?? "",
    short_description: offering?.short_description ?? "",
    description: offering?.description ?? "",
    pricing_type: offering?.pricing_type ?? "fixed",
    price: offering?.price ?? "",
    price_min: offering?.price_min ?? "",
    price_max: offering?.price_max ?? "",
    currency: offering?.currency ?? currency,
    unit: offering?.unit ?? "service",
    duration_minutes: String(offering?.duration_minutes ?? 60),
    image: null,
    remove_image: false,
    action_url: offering?.action_url ?? "",
    is_available: offering?.is_available ?? true,
    sort_order: String(offering?.sort_order ?? 0),
  };
}

export function OfferingFormModal({
  offering,
  categories,
  currency,
  saving,
  errors,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<OfferingForm>(() =>
    makeForm(offering, currency),
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    offering?.image_url ?? null,
  );
  const [imageError, setImageError] = useState("");

  function update(field: keyof OfferingForm, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function selectImage(file: File | null) {
    setImageError("");

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setImageError("Choose a JPG, PNG or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("The image must not be larger than 5 MB.");
      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setForm((current) => ({
      ...current,
      image: file,
      remove_image: false,
    }));

    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setForm((current) => ({
      ...current,
      image: null,
      remove_image: Boolean(offering?.image_url),
    }));

    setImagePreview(null);
    setImageError("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <form
          onSubmit={submit}
          className="my-6 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                Services and prices
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                {offering ? `Edit ${offering.name}` : "Add a service"}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-xl bg-slate-100"
            >
              <X size={18} />
            </button>
          </header>

          <div className="max-h-[72vh] space-y-7 overflow-y-auto p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="text-sm font-bold">Service name</span>
                <input
                  required
                  value={form.name}
                  placeholder="Bridal makeup"
                  onChange={(event) => update("name", event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                {errors.name ? (
                  <span className="mt-1 block text-xs text-red-600">
                    {errors.name}
                  </span>
                ) : null}
              </label>

              <label>
                <span className="text-sm font-bold">Category</span>
                <select
                  value={form.category_public_id}
                  onChange={(event) =>
                    update("category_public_id", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                >
                  <option value="">No category</option>
                  {categories.map((category) => (
                    <option key={category.public_id} value={category.public_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="text-sm font-bold">Offering type</span>
                <select
                  value={form.type}
                  onChange={(event) =>
                    update("type", event.target.value as OfferingType)
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                >
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                  <option value="package">Package</option>
                  <option value="experience">Experience</option>
                  <option value="menu_item">Menu item</option>
                  <option value="room">Room</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label>
                <span className="text-sm font-bold">Duration in minutes</span>
                <input
                  type="number"
                  min="1"
                  value={form.duration_minutes}
                  onChange={(event) =>
                    update("duration_minutes", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-bold">Short description</span>
              <input
                maxLength={500}
                value={form.short_description}
                placeholder="Short summary shown in search results."
                onChange={(event) =>
                  update("short_description", event.target.value)
                }
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold">Full description</span>
              <textarea
                rows={5}
                value={form.description}
                placeholder="Explain what is included in this service."
                onChange={(event) => update("description", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
              />
            </label>

            <section className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-black text-slate-950">Pricing</h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <label>
                  <span className="text-sm font-bold">Pricing type</span>
                  <select
                    value={form.pricing_type}
                    onChange={(event) =>
                      update(
                        "pricing_type",
                        event.target.value as OfferingPricingType,
                      )
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"
                  >
                    <option value="fixed">Fixed price</option>
                    <option value="from">Starting from</option>
                    <option value="range">Price range</option>
                    <option value="free">Free</option>
                    <option value="contact">Contact for price</option>
                  </select>
                </label>

                <label>
                  <span className="text-sm font-bold">Currency</span>
                  <input
                    required
                    maxLength={3}
                    value={form.currency}
                    onChange={(event) =>
                      update("currency", event.target.value.toUpperCase())
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"
                  />
                </label>

                <label>
                  <span className="text-sm font-bold">Unit</span>
                  <input
                    value={form.unit}
                    placeholder="service"
                    onChange={(event) => update("unit", event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"
                  />
                </label>
              </div>

              {form.pricing_type === "fixed" ? (
                <label className="mt-4 block">
                  <span className="text-sm font-bold">Price</span>
                  <input
                    type="number"
                    min="0"
                    required
                    value={form.price}
                    onChange={(event) => update("price", event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"
                  />
                  {errors.price ? (
                    <span className="mt-1 block text-xs text-red-600">
                      {errors.price}
                    </span>
                  ) : null}
                </label>
              ) : null}

              {form.pricing_type === "from" ? (
                <label className="mt-4 block">
                  <span className="text-sm font-bold">Starting price</span>
                  <input
                    type="number"
                    min="0"
                    required
                    value={form.price_min}
                    onChange={(event) =>
                      update("price_min", event.target.value)
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"
                  />
                </label>
              ) : null}

              {form.pricing_type === "range" ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="text-sm font-bold">Minimum price</span>
                    <input
                      type="number"
                      min="0"
                      required
                      value={form.price_min}
                      onChange={(event) =>
                        update("price_min", event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"
                    />
                  </label>

                  <label>
                    <span className="text-sm font-bold">Maximum price</span>
                    <input
                      type="number"
                      min="0"
                      required
                      value={form.price_max}
                      onChange={(event) =>
                        update("price_max", event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"
                    />
                  </label>
                </div>
              ) : null}
            </section>

            <section className="rounded-2xl border border-slate-200 p-5">
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-slate-100 sm:w-64">
                  {imagePreview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Service preview"
                        className="size-full object-cover"
                      />
                    </>
                  ) : (
                    <div className="grid size-full place-items-center text-center text-slate-400">
                      <div>
                        <ImagePlus className="mx-auto" size={34} />
                        <p className="mt-2 text-sm font-bold">
                          No image selected
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-black text-slate-950">
                    Service image
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Upload a clear JPG, PNG or WebP image. Maximum size is 5 MB.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <label className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white">
                      <ImagePlus size={17} />
                      {imagePreview ? "Change image" : "Choose image"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="sr-only"
                        onChange={(event) =>
                          selectImage(event.target.files?.[0] ?? null)
                        }
                      />
                    </label>

                    {imagePreview ? (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="inline-flex h-11 items-center gap-2 rounded-xl border border-red-200 px-5 text-sm font-black text-red-600"
                      >
                        <Trash2 size={17} />
                        Remove
                      </button>
                    ) : null}
                  </div>

                  {imageError || errors.image ? (
                    <p className="mt-3 text-sm font-semibold text-red-600">
                      {imageError || errors.image}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>

            <label className="block">
              <span className="text-sm font-bold">Booking or action URL</span>
              <input
                type="url"
                value={form.action_url}
                placeholder="https://..."
                onChange={(event) => update("action_url", event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
              />
              <span className="mt-1 block text-xs text-slate-500">
                Optional link where customers can book or learn more.
              </span>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-sm font-bold">Sort order</span>
                <input
                  type="number"
                  min="0"
                  value={form.sort_order}
                  onChange={(event) => update("sort_order", event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                />
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
                <input
                  type="checkbox"
                  checked={form.is_available}
                  onChange={(event) =>
                    update("is_available", event.target.checked)
                  }
                  className="size-4 accent-blue-600"
                />
                <span className="text-sm font-bold">Service is available</span>
              </label>
            </div>
          </div>

          <footer className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 p-4">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-300 px-5 text-sm font-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle className="animate-spin" size={17} />
              ) : (
                <Save size={17} />
              )}
              Save service
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
