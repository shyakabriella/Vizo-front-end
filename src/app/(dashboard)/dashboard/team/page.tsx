"use client";

import {
  Crown,
  LoaderCircle,
  Mail,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  getBusinessTeam,
  getBusinessTeamError,
  inviteBusinessMember,
  removeBusinessMember,
  revokeBusinessInvitation,
  updateBusinessMemberRole,
} from "@/services/team.service";
import type {
  BusinessInvitation,
  BusinessTeam,
  BusinessTeamMember,
  BusinessTeamRole,
  InviteBusinessMemberPayload,
} from "@/types/business-team";

const assignableRoles: Array<{
  value: InviteBusinessMemberPayload["role"];
  label: string;
  description: string;
}> = [
  {
    value: "manager",
    label: "Manager",
    description: "Can manage most business information and team operations.",
  },
  {
    value: "editor",
    label: "Editor",
    description: "Can manage business content, services and media.",
  },
  {
    value: "analyst",
    label: "Analyst",
    description: "Can view dashboards, audits and analytics.",
  },
];

function formatDate(value?: string | null): string {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function roleLabel(role: BusinessTeamRole): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function roleClasses(role: BusinessTeamRole): string {
  switch (role) {
    case "owner":
      return "bg-violet-50 text-violet-700";
    case "manager":
      return "bg-blue-50 text-blue-700";
    case "editor":
      return "bg-emerald-50 text-emerald-700";
    default:
      return "bg-amber-50 text-amber-700";
  }
}

function MemberCard({
  member,
  action,
  onRoleChange,
  onRemove,
}: {
  member: BusinessTeamMember;
  action: string | null;
  onRoleChange: (
    member: BusinessTeamMember,
    role: InviteBusinessMemberPayload["role"],
  ) => Promise<void>;
  onRemove: (member: BusinessTeamMember) => Promise<void>;
}) {
  const memberAction = action === `member-${member.id}`;

  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-950 text-sm font-black text-white">
          {member.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.avatar}
              alt={member.name}
              className="size-full object-cover"
            />
          ) : (
            initials(member.name)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words font-black text-slate-950">
              {member.name}
            </h3>

            {member.is_owner && (
              <Crown className="shrink-0 text-violet-600" size={17} />
            )}

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-black ${roleClasses(
                member.role,
              )}`}
            >
              {roleLabel(member.role)}
            </span>
          </div>

          <p className="mt-1 break-all text-sm text-slate-500">
            {member.email}
          </p>

          {member.phone && (
            <p className="mt-1 text-sm text-slate-500">{member.phone}</p>
          )}
        </div>

        <span
          className={`size-2.5 shrink-0 rounded-full ${
            member.is_active ? "bg-emerald-500" : "bg-slate-300"
          }`}
          title={member.is_active ? "Active" : "Inactive"}
        />
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold text-slate-400">
          Joined {formatDate(member.joined_at)}
        </p>

        {member.is_owner ? (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2.5 text-sm font-bold text-violet-700">
            <ShieldCheck size={17} />
            The owner cannot be changed or removed.
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <select
              value={member.role}
              disabled={memberAction}
              onChange={(event) =>
                void onRoleChange(
                  member,
                  event.target.value as InviteBusinessMemberPayload["role"],
                )
              }
              className="h-10 min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 disabled:bg-slate-100"
            >
              {assignableRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={memberAction}
              onClick={() => void onRemove(member)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-3 text-sm font-black text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              {memberAction ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
              Remove
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function InvitationCard({
  invitation,
  action,
  onRevoke,
}: {
  invitation: BusinessInvitation;
  action: string | null;
  onRevoke: (invitation: BusinessInvitation) => Promise<void>;
}) {
  const invitationAction = action === `invitation-${invitation.public_id}`;

  return (
    <article className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
          <Mail size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="break-all font-black text-slate-900">
            {invitation.email}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-black ${roleClasses(
                invitation.role,
              )}`}
            >
              {roleLabel(invitation.role)}
            </span>

            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-700">
              Pending
            </span>
          </div>

          <p className="mt-3 text-xs font-semibold text-slate-500">
            Expires {formatDate(invitation.expires_at)}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={invitationAction}
        onClick={() => void onRevoke(invitation)}
        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-black text-red-600 transition hover:bg-red-50 disabled:opacity-50 sm:w-auto"
      >
        {invitationAction ? (
          <LoaderCircle className="animate-spin" size={16} />
        ) : (
          <X size={16} />
        )}
        Cancel invitation
      </button>
    </article>
  );
}

export default function TeamPage() {
  const { selectedBusiness, isLoading: businessLoading } =
    useBusinessWorkspace();

  const [team, setTeam] = useState<BusinessTeam | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] =
    useState<InviteBusinessMemberPayload["role"]>("editor");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadTeam = useCallback(
    async (refresh = false) => {
      if (!selectedBusiness) {
        setTeam(null);
        setLoading(false);
        return;
      }

      try {
        if (refresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const result = await getBusinessTeam(selectedBusiness.public_id);

        setTeam(result);
      } catch (requestError) {
        setError(
          getBusinessTeamError(
            requestError,
            "Business team could not be loaded.",
          ),
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [selectedBusiness],
  );

  useEffect(() => {
    void loadTeam();
  }, [loadTeam]);

  function openInviteModal() {
    setEmail("");
    setRole("editor");
    setError("");
    setMessage("");
    setModalOpen(true);
  }

  function closeInviteModal() {
    if (action === "invite") {
      return;
    }

    setModalOpen(false);
  }

  async function submitInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedBusiness) {
      return;
    }

    try {
      setAction("invite");
      setError("");
      setMessage("");

      const response = await inviteBusinessMember(selectedBusiness.public_id, {
        email: email.trim(),
        role,
      });

      setModalOpen(false);
      setMessage(response.message || "Invitation sent successfully.");
      await loadTeam(true);
    } catch (requestError) {
      setError(
        getBusinessTeamError(requestError, "The invitation could not be sent."),
      );
    } finally {
      setAction(null);
    }
  }

  async function changeMemberRole(
    member: BusinessTeamMember,
    newRole: InviteBusinessMemberPayload["role"],
  ) {
    if (!selectedBusiness || member.role === newRole) {
      return;
    }

    try {
      setAction(`member-${member.id}`);
      setError("");
      setMessage("");

      const response = await updateBusinessMemberRole(
        selectedBusiness.public_id,
        member.id,
        newRole,
      );

      setMessage(response.message || "Team member updated.");
      await loadTeam(true);
    } catch (requestError) {
      setError(
        getBusinessTeamError(
          requestError,
          "The member role could not be changed.",
        ),
      );

      await loadTeam(true);
    } finally {
      setAction(null);
    }
  }

  async function removeMember(member: BusinessTeamMember) {
    if (!selectedBusiness) {
      return;
    }

    const confirmed = window.confirm(
      `Remove ${member.name} from ${selectedBusiness.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setAction(`member-${member.id}`);
      setError("");
      setMessage("");

      const response = await removeBusinessMember(
        selectedBusiness.public_id,
        member.id,
      );

      setMessage(response.message || "Team member removed.");
      await loadTeam(true);
    } catch (requestError) {
      setError(
        getBusinessTeamError(
          requestError,
          "The team member could not be removed.",
        ),
      );
    } finally {
      setAction(null);
    }
  }

  async function revokeInvitation(invitation: BusinessInvitation) {
    if (!selectedBusiness) {
      return;
    }

    const confirmed = window.confirm(
      `Cancel the invitation sent to ${invitation.email}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setAction(`invitation-${invitation.public_id}`);
      setError("");
      setMessage("");

      const response = await revokeBusinessInvitation(
        selectedBusiness.public_id,
        invitation.public_id,
      );

      setMessage(response.message || "Invitation cancelled.");
      await loadTeam(true);
    } catch (requestError) {
      setError(
        getBusinessTeamError(
          requestError,
          "The invitation could not be cancelled.",
        ),
      );
    } finally {
      setAction(null);
    }
  }

  if (businessLoading || loading) {
    return (
      <div className="grid min-h-[420px] place-items-center">
        <div className="text-center">
          <LoaderCircle
            className="mx-auto animate-spin text-blue-600"
            size={32}
          />
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Loading team members...
          </p>
        </div>
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
        <Users className="mx-auto text-slate-300" size={44} />

        <h1 className="mt-4 text-xl font-black text-slate-950">
          No business selected
        </h1>

        <p className="mt-2 text-slate-500">
          Create or select a business before managing its team.
        </p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">
        <p className="font-black text-red-900">Team members unavailable</p>

        <p className="mt-2 text-sm leading-6 text-red-700">
          {error || "Please try again."}
        </p>

        <button
          type="button"
          onClick={() => void loadTeam()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-black text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden pb-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Team members
          </p>

          <h1 className="mt-2 break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {selectedBusiness.name}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
            Invite trusted people and control how they help manage your
            business.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <button
            type="button"
            disabled={refreshing}
            onClick={() => void loadTeam(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={refreshing ? "animate-spin" : ""} size={17} />
            Refresh
          </button>

          <button
            type="button"
            onClick={openInviteModal}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Invite member
          </button>
        </div>
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          {message}
        </div>
      )}

      {error && !modalOpen && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {error}
        </div>
      )}

      <section className="mt-6 grid min-w-0 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Team members
              </p>
              <p className="text-2xl font-black text-slate-950">
                {team.members.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
              <Mail size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Pending invitations
              </p>
              <p className="text-2xl font-black text-slate-950">
                {team.pending_invitations.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-600">
              <Crown size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-500">
                Business owner
              </p>
              <p className="truncate font-black text-slate-950">
                {team.owner.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div>
          <h2 className="text-xl font-black text-slate-950">Current team</h2>
          <p className="mt-1 text-sm text-slate-500">
            Change member roles or remove access.
          </p>
        </div>

        <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {team.members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              action={action}
              onRoleChange={changeMemberRole}
              onRemove={removeMember}
            />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            Pending invitations
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Invitations expire automatically after seven days.
          </p>
        </div>

        {team.pending_invitations.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <UserCheck className="mx-auto text-slate-300" size={36} />
            <p className="mt-3 font-black text-slate-700">
              No pending invitations
            </p>
          </div>
        ) : (
          <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {team.pending_invitations.map((invitation) => (
              <InvitationCard
                key={invitation.public_id}
                invitation={invitation}
                action={action}
                onRevoke={revokeInvitation}
              />
            ))}
          </div>
        )}
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <form
              onSubmit={submitInvitation}
              className="my-6 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    Invite team member
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    An invitation will be sent by email.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeInviteModal}
                  className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </div>
                )}

                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Email address
                  </span>

                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    disabled={action === "invite"}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="member@example.com"
                    className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                  />
                </label>

                <div>
                  <p className="text-sm font-black text-slate-700">
                    Member role
                  </p>

                  <div className="mt-2 space-y-2">
                    {assignableRoles.map((item) => (
                      <label
                        key={item.value}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 ${
                          role === item.value
                            ? "border-blue-300 bg-blue-50"
                            : "border-slate-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={item.value}
                          checked={role === item.value}
                          disabled={action === "invite"}
                          onChange={() => setRole(item.value)}
                          className="mt-1"
                        />

                        <span>
                          <span className="block font-black text-slate-900">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-slate-500">
                            {item.description}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={closeInviteModal}
                  className="h-11 rounded-xl border border-slate-300 px-5 text-sm font-black text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={action === "invite"}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white disabled:opacity-60"
                >
                  {action === "invite" ? (
                    <LoaderCircle className="animate-spin" size={17} />
                  ) : (
                    <UserPlus size={17} />
                  )}
                  {action === "invite"
                    ? "Sending invitation..."
                    : "Send invitation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
