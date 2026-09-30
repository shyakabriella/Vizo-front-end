import type { NotificationData, VizoNotification } from "@/types/notification";

function stringValue(data: NotificationData, key: string): string | null {
  const value = data[key];

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return null;
}

export function notificationTitle(notification: VizoNotification): string {
  const data = notification.data;

  const explicitTitle =
    stringValue(data, "title") ?? stringValue(data, "subject");

  if (explicitTitle) {
    return explicitTitle;
  }

  const notificationType = stringValue(data, "type") ?? notification.type;

  const titles: Record<string, string> = {
    support_ticket_created: "New support ticket",
    support_ticket_reply: "New support reply",
    support_ticket_assigned: "Support ticket assigned",
    subscription_invoice_created: "New invoice created",
    payment_succeeded: "Payment successful",
    payment_failed: "Payment failed",
    invoice_overdue: "Invoice overdue",
    subscription_trial_started: "Subscription trial started",
    subscription_cancellation_scheduled: "Subscription cancellation scheduled",
  };

  return (
    titles[notificationType] ??
    notificationType
      .replace("Notification", "")
      .replaceAll("_", " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
  );
}

export function notificationDescription(
  notification: VizoNotification,
): string {
  const data = notification.data;

  const explicitMessage =
    stringValue(data, "message") ?? stringValue(data, "description");

  if (explicitMessage) {
    return explicitMessage;
  }

  const business = stringValue(data, "business_name");
  const reference =
    stringValue(data, "reference") ??
    stringValue(data, "ticket_reference") ??
    stringValue(data, "invoice_number");

  if (business && reference) {
    return `${business} · ${reference}`;
  }

  if (business) {
    return business;
  }

  if (reference) {
    return reference;
  }

  return "You have a new Vizo notification.";
}

export function notificationHref(notification: VizoNotification): string {
  const dataType = stringValue(notification.data, "type") ?? notification.type;

  if (dataType.includes("support") || notification.data.ticket_id) {
    return "/admin/support";
  }

  if (
    dataType.includes("invoice") ||
    dataType.includes("payment") ||
    dataType.includes("subscription")
  ) {
    return "/admin/billing";
  }

  if (notification.data.business_id) {
    return "/admin/businesses";
  }

  return "/admin/notifications";
}
