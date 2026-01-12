import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickLinkCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  variant?: "default" | "accent";
}

export function QuickLinkCard({
  icon: Icon,
  title,
  description,
  onClick,
  variant = "default",
}: QuickLinkCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        variant === "accent" && "bg-accent border-accent-foreground/20"
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
            variant === "accent"
              ? "bg-accent-foreground/10 text-accent-foreground"
              : "bg-primary/10 text-primary"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-card-foreground truncate">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
