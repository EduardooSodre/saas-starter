'use client';

import Link from 'next/link';
import { use, Suspense } from 'react';
import { useUser } from '@/lib/auth';
import {
  Users,
  Settings,
  Shield,
  Activity,
  BadgeDollarSign,
  Crown,
  LockKeyhole,
  Star,
  Gem,
  Layers,
} from 'lucide-react';

function SidebarLink({
  href,
  icon: Icon,
  children,
  highlight = false
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${highlight
        ? 'bg-orange-100 border border-orange-300 text-orange-900'
        : 'text-muted-foreground'
        }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
}

function Sidebar() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  const role = user?.role;
  const plan = user?.team?.planName as 'Free' | 'Base' | 'Plus';

  const planRoutes: Record<
    'Free' | 'Base' | 'Plus',
    { href: string; icon: React.ElementType }
  > = {
    Free: {
      href: '/dashboard/free-only',
      icon: LockKeyhole,
    },
    Base: {
      href: '/dashboard/base-only',
      icon: Star,
    },
    Plus: {
      href: '/dashboard/plus-only',
      icon: Gem,
    },
  };

  const pagePlan = plan ? planRoutes[plan] : null;

  return (
    <div className="w-64 border-r p-4 space-y-1">
      <SidebarLink href="/dashboard" icon={Users}>Team</SidebarLink>
      <SidebarLink href="/dashboard/general" icon={Settings}>General</SidebarLink>
      <SidebarLink href="/dashboard/activity" icon={Activity}>Activity</SidebarLink>
      <SidebarLink href="/dashboard/security" icon={Shield}>Security</SidebarLink>
      <SidebarLink href="/dashboard/plan-details" icon={BadgeDollarSign}>Plan Details</SidebarLink>

      {role === 'owner' && (
        <SidebarLink href="/dashboard/admin-only" icon={Crown}>Admin Only</SidebarLink>
      )}

      {/* Página exclusiva conforme o plano atual */}
      {pagePlan && (
        <SidebarLink href={pagePlan.href} icon={pagePlan.icon}>
          Page Plan
        </SidebarLink>
      )}
    </div>
  );
}


export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense fallback={<div className="w-64" />}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
