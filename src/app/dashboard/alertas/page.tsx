"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, AlertTriangle, Info, CheckCircle2, Settings2, Plus, Clock } from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Consumo hídrico supera umbral — Pozo P-04",
    description: "El pozo P-04 registró 92% de su límite regulatorio diario (736/800 m³). Riesgo de infracción SERNAGEOMIN si el consumo no se reduce en las próximas 2 horas.",
    severity: "critical",
    module: "Agua",
    time: "Hace 23 min",
    active: true,
  },
  {
    id: 2,
    title: "Agua reciclada cerca del límite de capacidad",
    description: "Sistema de reciclaje RC-01 en 94% de capacidad. Evaluar expansión del módulo de filtración.",
    severity: "critical",
    module: "Agua",
    time: "Hace 1 h",
    active: true,
  },
  {
    id: 3,
    title: "EIA Expansión Fase III vence en 26 días",
    description: "El Estudio de Impacto Ambiental para la expansión Fase III debe presentarse ante SEIA antes del 15/06/2026.",
    severity: "warning",
    module: "Documentos",
    time: "Hace 2 h",
    active: true,
  },
  {
    id: 4,
    title: "Sensor P-04 sin transmisión de datos",
    description: "El sensor de flujo del pozo P-04 no transmite datos desde las 06:30. Verificar conexión física o reemplazar sensor.",
    severity: "warning",
    module: "Sensores",
    time: "Hace 4 h",
    active: false,
  },
  {
    id: 5,
    title: "Reporte mensual SERNAGEOMIN — datos incompletos",
    description: "El reporte de mayo 2026 detectó 3 días sin registro de consumo en pozo P-07. Debe completarse antes del cierre del período.",
    severity: "warning",
    module: "Reportes",
    time: "Hace 6 h",
    active: false,
  },
  {
    id: 6,
    title: "Consumo hídrico volvió al rango normal",
    description: "El consumo total del 18/05 finalizó en 4,760 m³ (86.5% del límite). Sin infracciones registradas.",
    severity: "info",
    module: "Agua",
    time: "Ayer 23:59",
    active: false,
    resolved: true,
  },
];

const thresholds = [
  { name: "Consumo hídrico diario", trigger: "> 90% del límite SERNAGEOMIN", channel: "Email + Dashboard", active: true },
  { name: "Consumo hídrico diario", trigger: "> 95% del límite SERNAGEOMIN", channel: "Email + SMS + Dashboard", active: true },
  { name: "Vencimiento de documentos", trigger: "30 días antes del plazo", channel: "Email + Dashboard", active: true },
  { name: "Sensor sin datos", trigger: "> 2 horas sin transmisión", channel: "Dashboard", active: true },
  { name: "Concentración Li fuera de rango", trigger: "Variación > 15% vs promedio", channel: "Email", active: false },
];

const severityConfig: Record<string, { color: string; bg: string; icon: typeof AlertTriangle; label: string }> = {
  critical: { color: "text-red-600", bg: "bg-red-50 border-red-200", icon: AlertTriangle, label: "Crítica" },
  warning: { color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: AlertTriangle, label: "Advertencia" },
  info: { color: "text-blue-600", bg: "bg-blue-50 border-blue-200", icon: Info, label: "Información" },
};

export default function AlertasPage() {
  const active = alerts.filter((a) => a.active && !a.resolved);
  const resolved = alerts.filter((a) => !a.active || a.resolved);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alertas</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {active.length} alertas activas · {resolved.length} resueltas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Configurar Umbrales
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Alerta
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Críticas activas", value: active.filter((a) => a.severity === "critical").length, color: "text-red-600", bg: "bg-red-50" },
          { label: "Advertencias activas", value: active.filter((a) => a.severity === "warning").length, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Resueltas (7 días)", value: resolved.length, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-5">
              <div className={`inline-flex rounded-full p-2 ${s.bg} mb-2`}>
                <Bell className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="activas">
        <TabsList>
          <TabsTrigger value="activas">Activas ({active.length})</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="activas" className="mt-4 space-y-3">
          {active.map((alert) => {
            const cfg = severityConfig[alert.severity];
            const Icon = cfg.icon;
            return (
              <div key={alert.id} className={`rounded-lg border p-4 ${cfg.bg}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${cfg.color} shrink-0`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <Badge variant="outline" className="text-[10px]">{alert.module}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={alert.severity === "critical" ? "destructive" : "secondary"} className="text-xs">
                      {cfg.label}
                    </Badge>
                    <Button size="sm" variant="outline" className="gap-1 text-xs h-7">
                      <CheckCircle2 className="h-3 w-3" />
                      Resolver
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </TabsContent>

        <TabsContent value="historial" className="mt-4 space-y-3">
          {resolved.map((alert) => {
            const cfg = severityConfig[alert.severity];
            const Icon = alert.resolved ? CheckCircle2 : cfg.icon;
            return (
              <div key={alert.id} className="rounded-lg border p-4 opacity-70">
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${alert.resolved ? "text-emerald-600" : cfg.color} shrink-0`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <Badge variant="outline" className="text-[10px]">{alert.module}</Badge>
                      {alert.resolved && <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-200">Resuelta</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </TabsContent>

        <TabsContent value="configuracion" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Umbrales Configurados</CardTitle>
              <CardDescription>Define cuándo y cómo se generan las alertas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {thresholds.map((t, i) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">Disparador: {t.trigger}</p>
                      <p className="text-xs text-muted-foreground">Canal: {t.channel}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={t.active ? "default" : "outline"} className="text-xs">
                        {t.active ? "Activo" : "Inactivo"}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-xs">Editar</Button>
                    </div>
                  </div>
                ))}
                <div className="pt-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Añadir umbral
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
