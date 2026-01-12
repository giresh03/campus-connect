import { Users, Wifi, Monitor, Coffee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  name: string;
  building: string;
  capacity: number;
  amenities: readonly ("wifi" | "monitor" | "coffee")[];
  available: boolean;
  nextAvailable?: string;
}

const amenityIcons = {
  wifi: Wifi,
  monitor: Monitor,
  coffee: Coffee,
};

export function RoomCard({
  name,
  building,
  capacity,
  amenities,
  available,
  nextAvailable,
}: RoomCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{building}</p>
          </div>
          <Badge
            className={cn(
              available
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {available ? "Available" : "Occupied"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{capacity}</span>
          </div>
          <div className="flex items-center gap-2">
            {amenities.map((amenity) => {
              const Icon = amenityIcons[amenity];
              return (
              <Icon
                  key={amenity}
                  className="h-4 w-4 text-muted-foreground"
                  aria-label={amenity}
                />
              );
            })}
          </div>
        </div>
        {!available && nextAvailable && (
          <p className="mt-2 text-xs text-muted-foreground">
            Next available: {nextAvailable}
          </p>
        )}
        <Button
          className="mt-4 w-full"
          size="sm"
          variant={available ? "default" : "secondary"}
          disabled={!available}
        >
          {available ? "Book Now" : "View Schedule"}
        </Button>
      </CardContent>
    </Card>
  );
}
