"use client";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isInitialLoad } = useAuth();
  const router = useRouter();
  console.log("user", user);
  useEffect(() => {
    if (!loading && !user && !isInitialLoad) {
      router.push("/login");
    }
  }, [user, loading, router, isInitialLoad]);

  if (loading || isInitialLoad) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminAuthGuard>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AdminSidebar />
            <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
          </div>
        </SidebarProvider>
      </AdminAuthGuard>
    </AuthProvider>
  );
}
