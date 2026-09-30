import {
  BarChart3,
  Bell,
  Building2,
  CreditCard,
  Headphones,
  LayoutDashboard,
  Settings,
  Tags,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavigationItem {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface AdminNavigationGroup {
  title: string;
  items: AdminNavigationItem[];
}

export const adminNavigation: AdminNavigationGroup[] = [
  {
    title: "Workspace",
    items: [
      {
        label: "Overview",
        description: "Platform statistics",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Users",
        description: "Manage user accounts",
        href: "/admin/users",
        icon: Users,
      },
      {
        label: "Businesses",
        description: "Review all businesses",
        href: "/admin/businesses",
        icon: Building2,
      },
      {
        label: "Business types",
        description: "Manage business categories",
        href: "/admin/business-types",
        icon: Tags,
      },
    ],
  },
  {
    title: "Revenue",
    items: [
      {
        label: "Plans",
        description: "Subscription plans",
        href: "/admin/plans",
        icon: WalletCards,
      },
      {
        label: "Billing",
        description: "Invoices and payments",
        href: "/admin/billing",
        icon: CreditCard,
      },
      {
        label: "Analytics",
        description: "Platform performance",
        href: "/admin/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        label: "Support tickets",
        description: "Customer support",
        href: "/admin/support",
        icon: Headphones,
      },
      {
        label: "Notifications",
        description: "System notifications",
        href: "/admin/notifications",
        icon: Bell,
      },
      {
        label: "System settings",
        description: "Platform configuration",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];
