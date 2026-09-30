"use client";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  UserX,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { getApiErrorMessage } from "@/lib/api";
import { adminUserService } from "@/services/admin-user.service";
import type {
  AdminUser,
  AdminUserFilters,
  AdminUserPagination,
} from "@/types/admin-user";
import type { UserRole } from "@/types/auth";

const roles: Array<{
  value: "" | UserRole;
  label: string;
}> = [
  { value: "", label: "All roles" },
  { value: "super_admin", label: "Super admin" },
  { value: "business_owner", label: "Business owner" },
  { value: "manager", label: "Manager" },
  { value: "content_editor", label: "Content editor" },
  { value: "analyst", label: "Analyst" },
];

const statuses = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
] as const;

function formatRole(role: string): string {
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(value: string | null): string {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${
        active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-red-500"
        }`}
      />

      {active ? "Active" : "Suspended"}
    </span>
  );
}

function UserAvatar({
  user,
  large = false,
}: {
  user: AdminUser;
  large?: boolean;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-2xl bg-[#10104b] font-black text-white ${
        large ? "size-16 text-xl" : "size-11 text-sm"
      }`}
    >
      {initials(user.name)}
    </span>
  );
}

function EmptyUsers() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
        <Users className="size-7" />
      </span>

      <h2 className="mt-5 text-xl font-black text-slate-900">No users found</h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        No user accounts match your current search and filters.
      </p>
    </div>
  );
}

interface UserDetailsModalProps {
  user: AdminUser | null;
  loading: boolean;
  onClose: () => void;
  onChangeStatus: (user: AdminUser) => void;
  canChangeStatus: boolean;
}

function UserDetailsModal({
  user,
  loading,
  onClose,
  onChangeStatus,
  canChangeStatus,
}: UserDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
            <div>
              <h2 className="text-xl font-black text-slate-950">
                User information
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Account, role and business information
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600"
              aria-label="Close user information"
            >
              <X className="size-5" />
            </button>
          </div>

          {loading || !user ? (
            <div className="grid min-h-80 place-items-center">
              <Loader2 className="size-7 animate-spin text-blue-700" />
            </div>
          ) : (
            <div className="p-5 sm:p-7">
              <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center">
                <UserAvatar user={user} large />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-xl font-black text-slate-950">
                    {user.name}
                  </h3>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {user.email}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <StatusBadge active={user.is_active} />

                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700"
                      >
                        {formatRole(role)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailItem icon={Mail} label="Email" value={user.email} />

                <DetailItem
                  icon={Phone}
                  label="Phone"
                  value={user.phone || "Not provided"}
                />

                <DetailItem
                  icon={ShieldCheck}
                  label="Email verification"
                  value={user.email_verified_at ? "Verified" : "Not verified"}
                />

                <DetailItem
                  icon={CalendarDays}
                  label="Registered"
                  value={formatDate(user.created_at)}
                />

                <DetailItem
                  icon={CalendarDays}
                  label="Last login"
                  value={formatDate(user.last_login_at)}
                />

                <DetailItem
                  icon={Building2}
                  label="Owned businesses"
                  value={String(user.owned_businesses_count ?? 0)}
                />

                <DetailItem
                  icon={Building2}
                  label="Business memberships"
                  value={String(user.businesses_count ?? 0)}
                />

                <DetailItem
                  icon={ShieldCheck}
                  label="Language and timezone"
                  value={`${user.language.toUpperCase()} · ${user.timezone}`}
                />
              </div>

              {canChangeStatus ? (
                <div className="mt-7 flex justify-end border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    onClick={() => onChangeStatus(user)}
                    className={`inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-black ${
                      user.is_active
                        ? "bg-red-50 text-red-700 hover:bg-red-100"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                  >
                    {user.is_active ? (
                      <UserX className="size-4" />
                    ) : (
                      <UserCheck className="size-4" />
                    )}

                    {user.is_active ? "Suspend account" : "Reactivate account"}
                  </button>
                </div>
              ) : (
                <p className="mt-7 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                  Super administrator accounts cannot be suspended.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="size-4" />
        <p className="text-xs font-bold uppercase tracking-wider">{label}</p>
      </div>

      <p className="mt-2 break-words text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default function AdminUsersPage() {
  const { user: authenticatedUser } = useAuth();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<AdminUserPagination>({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AdminUserFilters["status"]>("");
  const [role, setRole] = useState<AdminUserFilters["role"]>("");

  const [appliedFilters, setAppliedFilters] = useState<AdminUserFilters>({
    page: 1,
    per_page: 15,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [confirmUser, setConfirmUser] = useState<AdminUser | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const loadUsers = useCallback(
    async (filters: AdminUserFilters, refresh = false) => {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setPageError("");

      try {
        const data = await adminUserService.list(filters);

        setUsers(data.users);
        setPagination(data.pagination);
      } catch (error) {
        setPageError(
          getApiErrorMessage(error, "Unable to load platform users."),
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadUsers(appliedFilters);
  }, [appliedFilters, loadUsers]);

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setAppliedFilters({
      search: search.trim(),
      status,
      role,
      page: 1,
      per_page: 15,
    });
  }

  function resetFilters() {
    setSearch("");
    setStatus("");
    setRole("");

    setAppliedFilters({
      page: 1,
      per_page: 15,
    });
  }

  function changePage(page: number) {
    if (
      page < 1 ||
      page > pagination.last_page ||
      page === pagination.current_page
    ) {
      return;
    }

    setAppliedFilters((current) => ({
      ...current,
      page,
    }));
  }

  async function openUserDetails(userId: number) {
    setDetailsOpen(true);
    setDetailsLoading(true);
    setSelectedUser(null);

    try {
      const user = await adminUserService.show(userId);
      setSelectedUser(user);
    } catch (error) {
      setDetailsOpen(false);
      setPageError(
        getApiErrorMessage(error, "Unable to load user information."),
      );
    } finally {
      setDetailsLoading(false);
    }
  }

  function canChangeStatus(user: AdminUser): boolean {
    return (
      user.id !== authenticatedUser?.id && !user.roles.includes("super_admin")
    );
  }

  async function updateStatus() {
    if (!confirmUser) {
      return;
    }

    setUpdatingStatus(true);
    setPageError("");
    setSuccessMessage("");

    try {
      const response = await adminUserService.updateStatus(
        confirmUser.id,
        !confirmUser.is_active,
      );

      setSuccessMessage(response.message);
      setConfirmUser(null);

      if (selectedUser?.id === response.data.user.id) {
        setSelectedUser(response.data.user);
      }

      await loadUsers(appliedFilters, true);
    } catch (error) {
      setPageError(
        getApiErrorMessage(error, "Unable to update the user account."),
      );

      setConfirmUser(null);
    } finally {
      setUpdatingStatus(false);
    }
  }

  return (
    <main className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              User management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Search accounts, review user information and manage account access
              across Vizo.
            </p>
          </div>

          <button
            type="button"
            disabled={refreshing}
            onClick={() => void loadUsers(appliedFilters, true)}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              className={`size-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {successMessage ? (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
            {successMessage}
          </div>
        ) : null}

        {pageError ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {pageError}
          </div>
        ) : null}

        <form
          onSubmit={applyFilters}
          className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="grid gap-3 lg:grid-cols-[1fr_210px_220px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email or phone"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as AdminUserFilters["status"])
              }
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-400"
            >
              {statuses.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={role}
              onChange={(event) =>
                setRole(event.target.value as AdminUserFilters["role"])
              }
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-400"
            >
              {roles.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                type="submit"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#10104b] px-5 text-sm font-black text-white"
              >
                <Filter className="size-4" />
                Apply
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="grid size-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500"
                aria-label="Reset filters"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-500">
            {pagination.total.toLocaleString()} users
          </p>

          <p className="text-xs font-semibold text-slate-400">
            Page {pagination.current_page} of {pagination.last_page}
          </p>
        </div>

        {loading ? (
          <div className="mt-5 grid min-h-96 place-items-center rounded-3xl border border-slate-200 bg-white">
            <div className="text-center">
              <Loader2 className="mx-auto size-7 animate-spin text-blue-700" />
              <p className="mt-3 text-sm font-bold text-slate-500">
                Loading users…
              </p>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="mt-5">
            <EmptyUsers />
          </div>
        ) : (
          <>
            <div className="mt-5 hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px]">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-[11px] font-black uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-4">User</th>
                      <th className="px-5 py-4">Role</th>
                      <th className="px-5 py-4">Businesses</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Registered</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="transition hover:bg-slate-50/80"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <UserAvatar user={user} />

                            <div className="min-w-0">
                              <p className="max-w-64 truncate text-sm font-black text-slate-900">
                                {user.name}
                              </p>
                              <p className="mt-1 max-w-64 truncate text-xs text-slate-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <span
                                key={role}
                                className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-700"
                              >
                                {formatRole(role)}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm font-bold text-slate-700">
                          {user.owned_businesses_count ?? 0}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge active={user.is_active} />
                        </td>

                        <td className="px-5 py-4 text-xs font-semibold text-slate-500">
                          {formatDate(user.created_at)}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => void openUserDetails(user.id)}
                              className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                              aria-label={`View ${user.name}`}
                            >
                              <Eye className="size-4" />
                            </button>

                            {canChangeStatus(user) ? (
                              <button
                                type="button"
                                onClick={() => setConfirmUser(user)}
                                className={`grid size-9 place-items-center rounded-xl transition ${
                                  user.is_active
                                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                }`}
                                aria-label={
                                  user.is_active
                                    ? `Suspend ${user.name}`
                                    : `Reactivate ${user.name}`
                                }
                              >
                                {user.is_active ? (
                                  <UserX className="size-4" />
                                ) : (
                                  <UserCheck className="size-4" />
                                )}
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:hidden">
              {users.map((user) => (
                <article
                  key={user.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <UserAvatar user={user} />

                    <div className="min-w-0 flex-1">
                      <h2 className="truncate font-black text-slate-900">
                        {user.name}
                      </h2>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>

                    <StatusBadge active={user.is_active} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-700"
                      >
                        {formatRole(role)}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => void openUserDetails(user.id)}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-black text-slate-700"
                    >
                      <Eye className="size-4" />
                      View
                    </button>

                    {canChangeStatus(user) ? (
                      <button
                        type="button"
                        onClick={() => setConfirmUser(user)}
                        className={`inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-black ${
                          user.is_active
                            ? "bg-red-50 text-red-700"
                            : "bg-emerald-600 text-white"
                        }`}
                      >
                        {user.is_active ? (
                          <UserX className="size-4" />
                        ) : (
                          <UserCheck className="size-4" />
                        )}

                        {user.is_active ? "Suspend" : "Reactivate"}
                      </button>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {pagination.last_page > 1 ? (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={pagination.current_page <= 1}
              onClick={() => changePage(pagination.current_page - 1)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>

            <span className="grid min-w-10 place-items-center rounded-xl bg-[#10104b] px-3 py-2 text-sm font-black text-white">
              {pagination.current_page}
            </span>

            <button
              type="button"
              disabled={pagination.current_page >= pagination.last_page}
              onClick={() => changePage(pagination.current_page + 1)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}
      </div>

      {detailsOpen ? (
        <UserDetailsModal
          user={selectedUser}
          loading={detailsLoading}
          onClose={() => {
            setDetailsOpen(false);
            setSelectedUser(null);
          }}
          onChangeStatus={setConfirmUser}
          canChangeStatus={selectedUser ? canChangeStatus(selectedUser) : false}
        />
      ) : null}

      {confirmUser ? (
        <div className="fixed inset-0 z-[110] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <span
              className={`grid size-12 place-items-center rounded-2xl ${
                confirmUser.is_active
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {confirmUser.is_active ? (
                <UserX className="size-6" />
              ) : (
                <UserCheck className="size-6" />
              )}
            </span>

            <h2 className="mt-5 text-xl font-black text-slate-950">
              {confirmUser.is_active
                ? "Suspend this user?"
                : "Reactivate this user?"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {confirmUser.is_active
                ? `${confirmUser.name} will immediately lose access and all active sessions will be removed.`
                : `${confirmUser.name} will be allowed to sign in to Vizo again.`}
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                disabled={updatingStatus}
                onClick={() => setConfirmUser(null)}
                className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-black text-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={updatingStatus}
                onClick={() => void updateStatus()}
                className={`inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-black text-white disabled:opacity-60 ${
                  confirmUser.is_active ? "bg-red-600" : "bg-emerald-600"
                }`}
              >
                {updatingStatus ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}

                {confirmUser.is_active ? "Suspend user" : "Reactivate user"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
