import { useState } from "react";
import {
  Calendar,
  Clock,
  Pill,
  Plus,
  Bell,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  Heart,
  Activity,
} from "lucide-react";
import { format, addDays } from "date-fns";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  refillDate: Date;
  taken: boolean;
}

const initialAppointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "General Physician",
    date: addDays(new Date(), 2),
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: addDays(new Date(), 7),
    time: "2:30 PM",
    status: "upcoming",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Brown",
    specialty: "Dentist",
    date: addDays(new Date(), -3),
    time: "9:00 AM",
    status: "completed",
  },
];

const initialMedications: Medication[] = [
  {
    id: "1",
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "Once daily",
    timeOfDay: ["Morning"],
    refillDate: addDays(new Date(), 15),
    taken: true,
  },
  {
    id: "2",
    name: "Omega-3 Fish Oil",
    dosage: "1000mg",
    frequency: "Twice daily",
    timeOfDay: ["Morning", "Evening"],
    refillDate: addDays(new Date(), 30),
    taken: false,
  },
  {
    id: "3",
    name: "Multivitamin",
    dosage: "1 tablet",
    frequency: "Once daily",
    timeOfDay: ["Morning"],
    refillDate: addDays(new Date(), 7),
    taken: false,
  },
];

export default function Healthcare() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [appointmentDate, setAppointmentDate] = useState<Date>();
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isMedicationDialogOpen, setIsMedicationDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorName: formData.get("doctorName") as string,
      specialty: formData.get("specialty") as string,
      date: appointmentDate || new Date(),
      time: formData.get("time") as string,
      status: "upcoming",
    };
    setAppointments([...appointments, newAppointment]);
    setIsAppointmentDialogOpen(false);
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with ${newAppointment.doctorName} has been booked.`,
    });
  };

  const handleAddMedication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      dosage: formData.get("dosage") as string,
      frequency: formData.get("frequency") as string,
      timeOfDay: [(formData.get("timeOfDay") as string)],
      refillDate: addDays(new Date(), 30),
      taken: false,
    };
    setMedications([...medications, newMedication]);
    setIsMedicationDialogOpen(false);
    toast({
      title: "Medication Added",
      description: `${newMedication.name} has been added to your schedule.`,
    });
  };

  const toggleMedicationTaken = (id: string) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  );
  const medicationsToTake = medications.filter((med) => !med.taken);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Healthcare Scheduler
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage appointments, medications, and health reminders
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog
              open={isAppointmentDialogOpen}
              onOpenChange={setIsAppointmentDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddAppointment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Doctor Name</Label>
                    <Input
                      id="doctorName"
                      name="doctorName"
                      placeholder="Dr. John Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select name="specialty" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Physician">
                          General Physician
                        </SelectItem>
                        <SelectItem value="Dentist">Dentist</SelectItem>
                        <SelectItem value="Dermatologist">
                          Dermatologist
                        </SelectItem>
                        <SelectItem value="Cardiologist">
                          Cardiologist
                        </SelectItem>
                        <SelectItem value="Orthopedist">Orthopedist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !appointmentDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {appointmentDate
                            ? format(appointmentDate, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={appointmentDate}
                          onSelect={setAppointmentDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select name="time" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                        <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Schedule Appointment
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isMedicationDialogOpen}
              onOpenChange={setIsMedicationDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Pill className="mr-2 h-4 w-4" />
                  Add Medication
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Medication</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddMedication} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Medication Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Aspirin"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      name="dosage"
                      placeholder="e.g., 100mg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select name="frequency" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Once daily">Once daily</SelectItem>
                        <SelectItem value="Twice daily">Twice daily</SelectItem>
                        <SelectItem value="Three times daily">
                          Three times daily
                        </SelectItem>
                        <SelectItem value="As needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeOfDay">Time of Day</Label>
                    <Select name="timeOfDay" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning">Morning</SelectItem>
                        <SelectItem value="Afternoon">Afternoon</SelectItem>
                        <SelectItem value="Evening">Evening</SelectItem>
                        <SelectItem value="Night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Add Medication
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={Stethoscope}
            title="Upcoming Appointments"
            value={upcomingAppointments.length}
            variant="primary"
          />
          <StatsCard
            icon={Pill}
            title="Active Medications"
            value={medications.length}
          />
          <StatsCard
            icon={Bell}
            title="Today's Reminders"
            value={medicationsToTake.length}
            variant="accent"
          />
          <StatsCard
            icon={Heart}
            title="Health Score"
            value="85%"
            trend={{ value: 5, label: "improved" }}
          />
        </section>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No upcoming appointments
                </p>
              ) : (
                upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Stethoscope className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {apt.doctorName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {apt.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {format(apt.date, "MMM d, yyyy")}
                      </p>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-sm">{apt.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Today's Medications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((med) => (
                <div
                  key={med.id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-4 transition-colors",
                    med.taken
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-card"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleMedicationTaken(med.id)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                        med.taken
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30 text-muted-foreground hover:border-primary"
                      )}
                    >
                      {med.taken ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Pill className="h-4 w-4" />
                      )}
                    </button>
                    <div>
                      <p
                        className={cn(
                          "font-medium",
                          med.taken
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        )}
                      >
                        {med.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} • {med.frequency}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={med.taken ? "secondary" : "default"}
                      className="mb-1"
                    >
                      {med.timeOfDay.join(", ")}
                    </Badge>
                    {!med.taken && (
                      <div className="flex items-center gap-1 text-accent-foreground">
                        <AlertCircle className="h-3 w-3" />
                        <span className="text-xs">Due now</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Health Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Health Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-accent bg-accent/50 p-4">
                <div className="flex items-center gap-2 text-accent-foreground">
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Refill Reminder</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Multivitamin refill needed in 7 days
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Annual Checkup</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Schedule your yearly physical exam
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-foreground">
                  <Activity className="h-5 w-5" />
                  <span className="font-medium">Activity Goal</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  You've walked 6,500 of 10,000 steps today
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
