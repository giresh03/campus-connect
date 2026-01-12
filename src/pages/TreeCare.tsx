import { useState } from "react";
import {
  TreePine,
  MapPin,
  Camera,
  Users,
  Droplets,
  Calendar,
  CheckCircle,
  Plus,
  TrendingUp,
  Leaf,
  Award,
  Heart,
} from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Tree {
  id: string;
  name: string;
  species: string;
  location: string;
  plantedDate: Date;
  lastWatered: Date;
  lastInspection: Date;
  health: "excellent" | "good" | "fair" | "poor";
  caretaker: string;
  co2Absorbed: number;
  imageUrl: string;
}

interface CareActivity {
  id: string;
  treeId: string;
  treeName: string;
  type: "watering" | "inspection" | "fertilizing" | "pruning";
  date: Date;
  volunteer: string;
  notes: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  treesAdopted: number;
  careActivities: number;
  points: number;
}

const initialTrees: Tree[] = [
  {
    id: "1",
    name: "Oak Guardian",
    species: "English Oak",
    location: "Central Park, Zone A",
    plantedDate: subDays(new Date(), 180),
    lastWatered: subDays(new Date(), 2),
    lastInspection: subDays(new Date(), 7),
    health: "excellent",
    caretaker: "Sarah M.",
    co2Absorbed: 48,
    imageUrl:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Maple Dream",
    species: "Sugar Maple",
    location: "Riverside Walk, Zone B",
    plantedDate: subDays(new Date(), 120),
    lastWatered: subDays(new Date(), 1),
    lastInspection: subDays(new Date(), 14),
    health: "good",
    caretaker: "John D.",
    co2Absorbed: 32,
    imageUrl:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Pine Sentinel",
    species: "Eastern White Pine",
    location: "Mountain View, Zone C",
    plantedDate: subDays(new Date(), 90),
    lastWatered: subDays(new Date(), 5),
    lastInspection: subDays(new Date(), 3),
    health: "fair",
    caretaker: "Emma K.",
    co2Absorbed: 24,
    imageUrl:
      "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=400&h=300&fit=crop",
  },
];

const recentActivities: CareActivity[] = [
  {
    id: "1",
    treeId: "1",
    treeName: "Oak Guardian",
    type: "watering",
    date: subDays(new Date(), 2),
    volunteer: "Sarah M.",
    notes: "Watered with 10L of water. Soil moisture looks good.",
  },
  {
    id: "2",
    treeId: "2",
    treeName: "Maple Dream",
    type: "inspection",
    date: subDays(new Date(), 3),
    volunteer: "John D.",
    notes: "New leaf growth observed. No signs of pests.",
  },
  {
    id: "3",
    treeId: "3",
    treeName: "Pine Sentinel",
    type: "fertilizing",
    date: subDays(new Date(), 5),
    volunteer: "Emma K.",
    notes: "Applied organic fertilizer around the base.",
  },
];

const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Sarah M.",
    avatar: "",
    treesAdopted: 12,
    careActivities: 156,
    points: 2450,
  },
  {
    rank: 2,
    name: "John D.",
    avatar: "",
    treesAdopted: 8,
    careActivities: 98,
    points: 1820,
  },
  {
    rank: 3,
    name: "Emma K.",
    avatar: "",
    treesAdopted: 10,
    careActivities: 87,
    points: 1650,
  },
  {
    rank: 4,
    name: "Michael R.",
    avatar: "",
    treesAdopted: 5,
    careActivities: 62,
    points: 1120,
  },
];

const healthColors = {
  excellent: "bg-primary text-primary-foreground",
  good: "bg-primary/80 text-primary-foreground",
  fair: "bg-accent text-accent-foreground",
  poor: "bg-destructive text-destructive-foreground",
};

const activityIcons = {
  watering: Droplets,
  inspection: Camera,
  fertilizing: Leaf,
  pruning: TreePine,
};

export default function TreeCare() {
  const [trees] = useState<Tree[]>(initialTrees);
  const [activities, setActivities] = useState<CareActivity[]>(recentActivities);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState<string>("");
  const { toast } = useToast();

  const handleLogActivity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tree = trees.find((t) => t.id === selectedTree);
    const newActivity: CareActivity = {
      id: Date.now().toString(),
      treeId: selectedTree,
      treeName: tree?.name || "",
      type: formData.get("type") as CareActivity["type"],
      date: new Date(),
      volunteer: "You",
      notes: formData.get("notes") as string,
    };
    setActivities([newActivity, ...activities]);
    setIsActivityDialogOpen(false);
    toast({
      title: "Activity Logged! 🌱",
      description: `Thank you for caring for ${tree?.name}. You earned 25 points!`,
    });
  };

  const totalCO2 = trees.reduce((sum, tree) => sum + tree.co2Absorbed, 0);
  const healthyTrees = trees.filter(
    (t) => t.health === "excellent" || t.health === "good"
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Tree Care Tracker
            </h1>
            <p className="mt-1 text-muted-foreground">
              Track, verify, and sustain post-plantation tree care
            </p>
          </div>
          <Dialog
            open={isActivityDialogOpen}
            onOpenChange={setIsActivityDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Log Care Activity
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Tree Care Activity</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleLogActivity} className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Tree</Label>
                  <Select
                    value={selectedTree}
                    onValueChange={setSelectedTree}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a tree" />
                    </SelectTrigger>
                    <SelectContent>
                      {trees.map((tree) => (
                        <SelectItem key={tree.id} value={tree.id}>
                          {tree.name} ({tree.species})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Activity Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="watering">💧 Watering</SelectItem>
                      <SelectItem value="inspection">📷 Inspection</SelectItem>
                      <SelectItem value="fertilizing">🌱 Fertilizing</SelectItem>
                      <SelectItem value="pruning">✂️ Pruning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    name="notes"
                    placeholder="Describe the activity and tree condition..."
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={!selectedTree}>
                  Log Activity
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Impact Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={TreePine}
            title="Trees Tracked"
            value={trees.length}
            variant="primary"
          />
          <StatsCard
            icon={Leaf}
            title="CO₂ Absorbed"
            value={`${totalCO2}kg`}
            trend={{ value: 12, label: "this month" }}
          />
          <StatsCard
            icon={Heart}
            title="Healthy Trees"
            value={`${Math.round((healthyTrees / trees.length) * 100)}%`}
            variant="accent"
          />
          <StatsCard
            icon={Users}
            title="Active Volunteers"
            value={24}
            trend={{ value: 5, label: "new" }}
          />
        </section>

        {/* Trees Grid */}
        <section>
          <h2 className="mb-4 text-lg font-medium text-foreground">
            Adopted Trees
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trees.map((tree) => (
              <Card key={tree.id} className="overflow-hidden">
                <div className="relative h-40">
                  <img
                    src={tree.imageUrl}
                    alt={tree.name}
                    className="h-full w-full object-cover"
                  />
                  <Badge
                    className={cn(
                      "absolute right-2 top-2",
                      healthColors[tree.health]
                    )}
                  >
                    {tree.health}
                  </Badge>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{tree.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tree.species}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <span className="font-medium text-primary">
                        {tree.co2Absorbed}kg
                      </span>
                      <p className="text-muted-foreground">CO₂</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {tree.location}
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-primary" />
                      <span>
                        {format(tree.lastWatered, "MMM d")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(tree.lastInspection, "MMM d")}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Caretaker: {tree.caretaker}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedTree(tree.id);
                        setIsActivityDialogOpen(true);
                      }}
                    >
                      Log Care
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Recent Care Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.slice(0, 5).map((activity) => {
                const Icon = activityIcons[activity.type];
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 rounded-lg border border-border p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground capitalize">
                          {activity.type}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {activity.treeName}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {activity.notes}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>By {activity.volunteer}</span>
                        <span>•</span>
                        <span>{format(activity.date, "MMM d, yyyy")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Community Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Community Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border p-4",
                    entry.rank === 1
                      ? "border-primary/30 bg-primary/5"
                      : "border-border"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full font-bold",
                      entry.rank === 1
                        ? "bg-primary text-primary-foreground"
                        : entry.rank === 2
                        ? "bg-muted text-muted-foreground"
                        : entry.rank === 3
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {entry.rank}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback>
                      {entry.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.treesAdopted} trees • {entry.careActivities}{" "}
                      activities
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary">
                      {entry.points.toLocaleString()}
                    </span>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Environmental Impact Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <TreePine className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">
                  Total Trees Planted
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <Leaf className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-2xl font-bold text-foreground">2.4T</p>
                <p className="text-sm text-muted-foreground">CO₂ Absorbed</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <Droplets className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-2xl font-bold text-foreground">12K</p>
                <p className="text-sm text-muted-foreground">Liters Water Used</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <Users className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-2xl font-bold text-foreground">89</p>
                <p className="text-sm text-muted-foreground">
                  Community Members
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Tree Survival Rate</span>
                  <span className="font-medium text-primary">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Care Completion Rate</span>
                  <span className="font-medium text-primary">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
