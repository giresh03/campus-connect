import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnnouncementCardProps {
  title: string;
  content: string;
  date: string;
  category: "general" | "urgent" | "event" | "academic";
}

const categoryStyles = {
  general: "bg-secondary text-secondary-foreground",
  urgent: "bg-destructive text-destructive-foreground",
  event: "bg-primary text-primary-foreground",
  academic: "bg-accent text-accent-foreground",
};

const categoryLabels = {
  general: "General",
  urgent: "Urgent",
  event: "Event",
  academic: "Academic",
};

export function AnnouncementCard({
  title,
  content,
  date,
  category,
}: AnnouncementCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-card-foreground line-clamp-1">{title}</h3>
          <Badge className={cn("shrink-0", categoryStyles[category])}>
            {categoryLabels[category]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>
        <p className="mt-3 text-xs text-muted-foreground">{date}</p>
      </CardContent>
    </Card>
  );
}
