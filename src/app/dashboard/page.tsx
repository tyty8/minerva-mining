import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Droplets,
  FileText,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";

const kpis = [
  {
    title: "Consumo de Agua",
    value: "4,820 m³",
    change: "-12% vs mes anterior",
    trend: "down",
    good: true,
    icon: Droplets,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Documentos Analizados",
    value: "47",
    change: "+8 esta semana",
    trend: "up",
    good: true,
    icon: FileText,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Alertas Activas",
    value: "3",
    change: "2 críticas, 1 advertencia",
    trend: "up",
    good: false,
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Eficiencia Hídrica",
    value: "87%",
    change: "+3% vs meta mensual",
    trend: "up",
    good: true,
    icon: Zap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const recentAlerts = [
  {
    id: 1,
    title: "Consumo hídrico supera umbral",
    description: "Sector Evaporación Norte — 142% del límite regulatorio diario",
    severity: "critical",
    time: "Hace 23 min",
  },
  {
    id: 2,
    title: "Documento SEIA pendiente de revisión",
    description: "EIA Expansión Salar Maricunga requiere respuesta antes del 25/05",
    severity: "warning",
    time: "Hace 2 h",
  },
  {
    id: 3,
    title: "Sensor P-04 sin datos",
    description: "Sensor de flujo en pozo P-04 sin transmisión desde las 06:30",
    severity: "warning",
    time: "Hace 4 h",
  },
];

const waterSources = [
  { name: "Pozo Atacama Norte", usage: 72, limit: 2500, unit: "m³/día" },
  { name: "Planta Desalinizadora", usage: 45, limit: 1800, unit: "m³/día" },
  { name: "Agua Reciclada Proceso", usage: 88, limit: 800, unit: "m³/día" },
];

const recentDocs = [
  {
    name: "Informe Geológico Q1 2026 — Salar Atacama",
    status: "analizado",
    date: "19/05/2026",
  },
  {
    name: "EIA Expansión Fase III — SEIA",
    status: "pendiente",
    date: "18/05/2026",
  },
  {
    name: "Reporte Mensual SERNAGEOMIN — Abril",
    status: "analizado",
    date: "15/05/2026",
  },
  {
    name: "Plan de Cierre Faena Sur",
    status: "en revisión",
    date: "12/05/2026",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resumen Operacional</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Faena: Salar de Atacama — {new Date().toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className={`h-3 w-3 ${kpi.good ? "text-emerald-500" : "text-red-500"}`} />
                    ) : (
                      <TrendingDown className={`h-3 w-3 ${kpi.good ? "text-emerald-500" : "text-red-500"}`} />
                    )}
                    <p className="text-xs text-muted-foreground">{kpi.change}</p>
                  </div>
                </div>
                <div className={`rounded-lg p-2 ${kpi.bg}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Water Sources */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              Fuentes de Agua — Estado Actual
            </CardTitle>
            <CardDescription>Consumo vs. límite regulatorio SERNAGEOMIN</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {waterSources.map((src) => (
              <div key={src.name} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{src.name}</span>
                  <span className="text-muted-foreground">
                    {src.usage}% de {src.limit} {src.unit}
                  </span>
                </div>
                <Progress
                  value={src.usage}
                  className={`h-2 ${src.usage > 85 ? "[&>div]:bg-amber-500" : src.usage > 95 ? "[&>div]:bg-red-500" : "[&>div]:bg-blue-500"}`}
                />
                <p className="text-xs text-muted-foreground">
                  {src.usage > 85 ? "⚠ Cerca del límite — revisar consumo" : "✓ Dentro del rango normal"}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Alertas Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg border p-3 text-sm ${
                  alert.severity === "critical"
                    ? "border-red-200 bg-red-50"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium leading-snug">{alert.title}</p>
                  <Badge
                    variant={alert.severity === "critical" ? "destructive" : "outline"}
                    className="text-[10px] shrink-0"
                  >
                    {alert.severity === "critical" ? "Crítica" : "Aviso"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-violet-600" />
            Documentos Recientes
          </CardTitle>
          <CardDescription>Últimos informes procesados por la IA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {recentDocs.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium">{doc.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground">{doc.date}</span>
                  <Badge
                    variant={
                      doc.status === "analizado"
                        ? "default"
                        : doc.status === "pendiente"
                        ? "outline"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {doc.status === "analizado" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {doc.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
