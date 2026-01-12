import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface SafetyAlertProps {
  type: "warning" | "info" | "success" | "danger";
  title: string;
  description: string;
}

const alertStyles = {
  warning: {
    icon: AlertTriangle,
    className: "border-accent-foreground/20 bg-accent text-accent-foreground",
    iconClassName: "text-accent-foreground",
  },
  info: {
    icon: Info,
    className: "border-primary/20 bg-primary/10 text-primary",
    iconClassName: "text-primary",
  },
  success: {
    icon: CheckCircle,
    className: "border-primary/20 bg-primary/10 text-foreground",
    iconClassName: "text-primary",
  },
  danger: {
    icon: XCircle,
    className: "border-destructive/20 bg-destructive/10 text-destructive",
    iconClassName: "text-destructive",
  },
};

export function SafetyAlert({ type, title, description }: SafetyAlertProps) {
  const { icon: Icon, className, iconClassName } = alertStyles[type];

  return (
    <Alert className={cn("transition-all duration-200", className)}>
      <Icon className={cn("h-5 w-5", iconClassName)} />
      <AlertTitle className="ml-2 font-medium">{title}</AlertTitle>
      <AlertDescription className="ml-2 mt-1 text-sm opacity-90">
        {description}
      </AlertDescription>
    </Alert>
  );
}
