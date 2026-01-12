import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "primary" | "accent";
}

export function StatsCard({
  icon: Icon,
  title,
  value,
  trend,
  variant = "default",
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "accent" && "bg-accent"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                variant === "default"
                  ? "text-muted-foreground"
                  : variant === "primary"
                  ? "text-primary-foreground/80"
                  : "text-accent-foreground/80"
              )}
            >
              {title}
            </p>
            <p
              className={cn(
                "mt-2 text-3xl font-bold",
                variant === "default"
                  ? "text-card-foreground"
                  : variant === "primary"
                  ? "text-primary-foreground"
                  : "text-accent-foreground"
              )}
            >
              {value}
            </p>
            {trend && (
              <p
                className={cn(
                  "mt-1 text-sm",
                  variant === "default"
                    ? trend.value >= 0
                      ? "text-primary"
                      : "text-destructive"
                    : "text-primary-foreground/70"
                )}
              >
                {trend.value >= 0 ? "+" : ""}
                {trend.value}% {trend.label}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              variant === "default"
                ? "bg-primary/10 text-primary"
                : variant === "primary"
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-accent-foreground/10 text-accent-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
