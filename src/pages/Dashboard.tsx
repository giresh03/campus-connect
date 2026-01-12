import {
  BookOpen,
  Calendar,
  GraduationCap,
  Library,
  Users,
  Utensils,
  Bus,
  Laptop,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { QuickLinkCard } from "@/components/QuickLinkCard";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { EventCard } from "@/components/EventCard";
import { RoomCard } from "@/components/RoomCard";
import { SafetyAlert } from "@/components/SafetyAlert";
import { StatsCard } from "@/components/StatsCard";
import campusHero from "@/assets/campus-hero.jpg";

const quickLinks = [
  {
    icon: Library,
    title: "Library",
    description: "Access resources & hours",
    variant: "default" as const,
  },
  {
    icon: Utensils,
    title: "Dining",
    description: "Menus & meal plans",
    variant: "default" as const,
  },
  {
    icon: Bus,
    title: "Shuttle",
    description: "Live tracking & schedules",
    variant: "accent" as const,
  },
  {
    icon: Laptop,
    title: "IT Services",
    description: "Tech support & WiFi",
    variant: "default" as const,
  },
];

const announcements = [
  {
    title: "Spring Registration Now Open",
    content:
      "Spring 2024 course registration is now available for all students. Check your enrollment appointment time in the student portal.",
    date: "Today at 9:00 AM",
    category: "academic" as const,
  },
  {
    title: "Campus Construction Notice",
    content:
      "The west parking lot will be closed for renovations starting Monday. Alternative parking available in Lot C.",
    date: "Yesterday",
    category: "general" as const,
  },
  {
    title: "Weather Advisory",
    content:
      "Heavy rain expected this weekend. All outdoor events have been moved indoors. Check updated locations.",
    date: "2 days ago",
    category: "urgent" as const,
  },
];

const events = [
  {
    title: "Tech Career Fair 2024",
    date: "March 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Student Union Ballroom",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=225&fit=crop",
  },
  {
    title: "Spring Concert Series",
    date: "March 20, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Campus Amphitheater",
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=225&fit=crop",
  },
  {
    title: "Research Symposium",
    date: "March 25, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Science Building Atrium",
    imageUrl:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=225&fit=crop",
  },
];

const rooms = [
  {
    name: "Study Room A",
    building: "Main Library",
    capacity: 6,
    amenities: ["wifi", "monitor"] as const,
    available: true,
  },
  {
    name: "Conference Room 201",
    building: "Student Union",
    capacity: 12,
    amenities: ["wifi", "monitor", "coffee"] as const,
    available: false,
    nextAvailable: "3:00 PM",
  },
  {
    name: "Quiet Pod 3",
    building: "Engineering Hall",
    capacity: 2,
    amenities: ["wifi"] as const,
    available: true,
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0">
            <img
              src={campusHero}
              alt="Campus"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          </div>
          <div className="relative px-6 py-12 md:px-10 md:py-16">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
              Welcome back, Alex! 👋
            </h1>
            <p className="mt-2 max-w-xl text-primary-foreground/80">
              Stay connected with everything happening on campus. Your hub for
              resources, events, and community.
            </p>
          </div>
        </section>

        {/* Safety Alert */}
        <SafetyAlert
          type="info"
          title="Campus Status: Normal Operations"
          description="All facilities are operating on regular schedule. Emergency services available 24/7 at (555) 123-4567."
        />

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={Calendar}
            title="Upcoming Events"
            value={12}
            trend={{ value: 8, label: "this week" }}
          />
          <StatsCard
            icon={BookOpen}
            title="Available Rooms"
            value={24}
            variant="primary"
          />
          <StatsCard
            icon={Users}
            title="Active Clubs"
            value={85}
            trend={{ value: 5, label: "new" }}
          />
          <StatsCard
            icon={GraduationCap}
            title="Study Hours"
            value="32h"
            variant="accent"
          />
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="mb-4 text-lg font-medium text-foreground">
            Quick Access
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <QuickLinkCard key={link.title} {...link} />
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Announcements */}
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-foreground">
                Latest Announcements
              </h2>
              <a
                href="/announcements"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </a>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <AnnouncementCard key={index} {...announcement} />
              ))}
            </div>
          </section>

          {/* Room Availability */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-foreground">
                Study Rooms
              </h2>
              <a
                href="/rooms"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </a>
            </div>
            <div className="space-y-4">
              {rooms.map((room, index) => (
                <RoomCard key={index} {...room} />
              ))}
            </div>
          </section>
        </div>

        {/* Upcoming Events */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">
              Upcoming Events
            </h2>
            <a
              href="/events"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
