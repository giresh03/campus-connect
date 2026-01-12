import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Eye,
  Lock,
  CheckCircle,
  XCircle,
  Link as LinkIcon,
  Mail,
  MessageSquare,
  TrendingUp,
  FileWarning,
  ShieldCheck,
  ShieldAlert,
  Globe,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ThreatReport {
  id: string;
  type: "phishing" | "scam" | "malware" | "suspicious";
  source: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: Date;
  status: "pending" | "verified" | "resolved";
}

interface SecurityTip {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
}

const initialThreats: ThreatReport[] = [
  {
    id: "1",
    type: "phishing",
    source: "suspicious-bank@fake-domain.com",
    description: "Email claiming account suspension, requesting login credentials",
    severity: "high",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "verified",
  },
  {
    id: "2",
    type: "scam",
    source: "+1-555-FAKE-NUM",
    description: "Phone call claiming to be from IRS demanding immediate payment",
    severity: "medium",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "resolved",
  },
  {
    id: "3",
    type: "suspicious",
    source: "unknown-sender@mail.com",
    description: "Unexpected attachment from unknown sender",
    severity: "low",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "pending",
  },
];

const securityTips: SecurityTip[] = [
  {
    id: "1",
    title: "Verify Email Senders",
    description:
      "Always check the actual email address, not just the display name. Hover over links before clicking.",
    category: "Email Safety",
    icon: Mail,
  },
  {
    id: "2",
    title: "Use Strong Passwords",
    description:
      "Create unique passwords with 12+ characters including numbers, symbols, and mixed case letters.",
    category: "Account Security",
    icon: Lock,
  },
  {
    id: "3",
    title: "Enable Two-Factor Auth",
    description:
      "Add an extra layer of security by enabling 2FA on all important accounts.",
    category: "Account Security",
    icon: ShieldCheck,
  },
  {
    id: "4",
    title: "Avoid Public WiFi for Banking",
    description:
      "Never access sensitive accounts on public networks without a VPN.",
    category: "Network Security",
    icon: Globe,
  },
];

const severityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-accent text-accent-foreground",
  high: "bg-destructive/10 text-destructive",
  critical: "bg-destructive text-destructive-foreground",
};

const typeIcons = {
  phishing: Mail,
  scam: MessageSquare,
  malware: FileWarning,
  suspicious: AlertTriangle,
};

export default function SafetyGuardian() {
  const [threats, setThreats] = useState<ThreatReport[]>(initialThreats);
  const [urlToCheck, setUrlToCheck] = useState("");
  const [urlResult, setUrlResult] = useState<"safe" | "unsafe" | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const handleUrlCheck = () => {
    if (!urlToCheck.trim()) return;
    setIsChecking(true);
    // Simulate URL check
    setTimeout(() => {
      const isSafe = !urlToCheck.includes("suspicious") && !urlToCheck.includes("fake");
      setUrlResult(isSafe ? "safe" : "unsafe");
      setIsChecking(false);
    }, 1500);
  };

  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newThreat: ThreatReport = {
      id: Date.now().toString(),
      type: formData.get("type") as ThreatReport["type"],
      source: formData.get("source") as string,
      description: formData.get("description") as string,
      severity: "medium",
      timestamp: new Date(),
      status: "pending",
    };
    setThreats([newThreat, ...threats]);
    toast({
      title: "Report Submitted",
      description: "Thank you for helping keep the community safe!",
    });
    e.currentTarget.reset();
  };

  const verifiedThreats = threats.filter((t) => t.status === "verified").length;
  const pendingThreats = threats.filter((t) => t.status === "pending").length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Online Safety Guardian
          </h1>
          <p className="mt-1 text-muted-foreground">
            Protect yourself from online threats and security risks
          </p>
        </div>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={ShieldAlert}
            title="Active Threats"
            value={verifiedThreats}
            variant="accent"
          />
          <StatsCard
            icon={Eye}
            title="Pending Review"
            value={pendingThreats}
          />
          <StatsCard
            icon={Shield}
            title="Safety Score"
            value="92%"
            variant="primary"
            trend={{ value: 3, label: "improved" }}
          />
          <StatsCard
            icon={TrendingUp}
            title="Threats Blocked"
            value={156}
            trend={{ value: 12, label: "this week" }}
          />
        </section>

        {/* URL Checker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              URL Safety Checker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input
                placeholder="Enter URL to check (e.g., https://example.com)"
                value={urlToCheck}
                onChange={(e) => {
                  setUrlToCheck(e.target.value);
                  setUrlResult(null);
                }}
                className="flex-1"
              />
              <Button onClick={handleUrlCheck} disabled={isChecking}>
                {isChecking ? "Checking..." : "Check URL"}
              </Button>
            </div>
            {urlResult && (
              <div
                className={cn(
                  "mt-4 flex items-center gap-3 rounded-lg p-4",
                  urlResult === "safe"
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                )}
              >
                {urlResult === "safe" ? (
                  <>
                    <CheckCircle className="h-6 w-6" />
                    <div>
                      <p className="font-medium">URL appears safe</p>
                      <p className="text-sm opacity-80">
                        No known threats detected for this URL
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Potential threat detected!</p>
                      <p className="text-sm opacity-80">
                        This URL may be associated with phishing or malware
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="threats" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="threats">Recent Threats</TabsTrigger>
            <TabsTrigger value="report">Report Threat</TabsTrigger>
            <TabsTrigger value="tips">Safety Tips</TabsTrigger>
          </TabsList>

          {/* Recent Threats */}
          <TabsContent value="threats">
            <Card>
              <CardHeader>
                <CardTitle>Community Threat Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {threats.map((threat) => {
                  const Icon = typeIcons[threat.type];
                  return (
                    <div
                      key={threat.id}
                      className="flex items-start gap-4 rounded-lg border border-border p-4"
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                          threat.severity === "high" ||
                            threat.severity === "critical"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground capitalize">
                            {threat.type}
                          </span>
                          <Badge
                            className={cn(
                              "text-xs",
                              severityColors[threat.severity]
                            )}
                          >
                            {threat.severity}
                          </Badge>
                          <Badge
                            variant={
                              threat.status === "verified"
                                ? "destructive"
                                : threat.status === "resolved"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {threat.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Source: {threat.source}
                        </p>
                        <p className="text-sm text-foreground">
                          {threat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Form */}
          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle>Report a Security Threat</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Threat Type</label>
                      <select
                        name="type"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      >
                        <option value="phishing">Phishing Email</option>
                        <option value="scam">Phone/SMS Scam</option>
                        <option value="malware">Malware/Virus</option>
                        <option value="suspicious">Suspicious Activity</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Source (email, phone, URL)
                      </label>
                      <Input
                        name="source"
                        placeholder="e.g., scam@fake-domain.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      name="description"
                      placeholder="Describe what happened and any suspicious details..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Tips */}
          <TabsContent value="tips">
            <div className="grid gap-4 sm:grid-cols-2">
              {securityTips.map((tip) => (
                <Card key={tip.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <tip.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {tip.category}
                        </Badge>
                        <h3 className="font-medium text-foreground">
                          {tip.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Security Score Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Your Security Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Password Strength</span>
                <span className="text-primary font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Two-Factor Authentication</span>
                <span className="text-primary font-medium">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Device Security</span>
                <span className="text-accent-foreground font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Browsing Safety</span>
                <span className="text-accent-foreground font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
