import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  BookOpen,
  MessageSquare,
  Shield,
  Settings,
  X,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: BookOpen, label: "Room Booking", path: "/rooms" },
  { icon: MessageSquare, label: "Announcements", path: "/announcements" },
  { icon: MapPin, label: "Campus Map", path: "/map" },
  { icon: Users, label: "Clubs", path: "/clubs" },
  { icon: Shield, label: "Safety", path: "/safety" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-sidebar transition-transform duration-300 md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <span className="text-sm font-bold text-sidebar-primary-foreground">C</span>
            </div>
            <span className="font-serif text-xl font-bold text-sidebar-foreground">
              CampusHub
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-accent p-4">
            <p className="text-sm font-medium text-accent-foreground">
              Need Help?
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Contact campus support 24/7
            </p>
            <Button size="sm" className="mt-3 w-full">
              Get Support
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
