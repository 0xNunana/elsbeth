"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, PlusCircle, LogOut, ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarSeparator,
} from "../ui/sidebar";
import { Logo } from "../logo";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Arrow } from "@radix-ui/react-tooltip";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/create", label: "New Post", icon: PlusCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut: firebaseSignOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
      toast.success("Logged out successfully.");
      router.push("/admin/login");
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="flex items-center pl-4 mb-4 ">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Link>
          </SidebarMenuItem>

          {menuItems.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <Link href={href}>
                <SidebarMenuButton isActive={pathname === href} tooltip={label}>
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarGroup>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              {user?.photoURL && (
                <AvatarImage src={user.photoURL} alt={user.displayName || ""} />
              )}
              <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden group-data-[collapsible=icon]:hidden">
              <p className="font-medium truncate">
                {user?.displayName || user?.email}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
