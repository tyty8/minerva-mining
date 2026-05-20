"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Droplets, AlertTriangle, TrendingDown, TrendingUp,
  Upload, Download, Plus, Sparkles, CheckCircle2,
  Activity, Gauge, Waves, Wind, ThermometerSun, Beaker,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, BarChart, Bar, AreaChart, Area, RadarChart,
  Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

const dailyData = [
  { dia: "14/05", consumo: 5200, limite: 5500, reciclado: 1800, desaliniz: 1480 },
  { dia: "15/05", consumo: 5050, limite: 5500, reciclado: 1900, desaliniz: 1500 },
  { dia: "16/05", consumo: 4980, limite: 5500, reciclado: 2100, desaliniz: 1520 },
  { dia: "17/05", consumo: 5320, limite: 5500, reciclado: 1750, desaliniz: 1540 },
  { dia: "18/05", consumo: 4760, limite: 5500, reciclado: 2200, desaliniz: 1560 },
  { dia: "19/05", consumo: 4820, limite: 5500, reciclado: 2350, desaliniz: 1580 },
  { dia: "20/05", consumo: 4650, limite: 5500, reciclado: 2400, desaliniz: 1600 },
];

const monthlyData = [
  { mes: "Ene", consumo: 158000, reciclado: 42000, desaliniz: 38000, pozo: 78000 },
  { mes: "Feb", consumo: 152000, reciclado: 46000, desaliniz: 40000, pozo: 66000 },
  { mes: "Mar", consumo: 148000, reciclado: 50000, desaliniz: 44000, pozo: 54000 },
  { mes: "Abr", consumo: 143000, reciclado: 54000, desaliniz: 47000, pozo: 42000 },
  { mes: "May", consumo: 96400, reciclado: 37000, desaliniz: 32000, pozo: 27400 },
];

const hourlyToday = Array.from({ length: 24 }, (_, i) => ({
  hora: `${String(i).padStart(2, "0")}:00`,
  flujo: Math.round(180 + Math.sin(i / 3) * 40 + Math.random() * 20),
  limite: 230,
}));

const radarData = [
  { kpi: "Eficiencia", value: 88, fullMark: 100 },
  { kpi: "Reciclaje", value: 78, fullMark: 100 },
  { kpi: "Cumplimiento", value: 94, fullMark: 100 },
  { kpi: "Calidad", value: 91, fullMark: 100 },
  { kpi: "Disponib.", value: 96, fullMark: 100 },
  { kpi: "Ahorro", value: 72, fullMark: 100 },
];

const sources = [
  { id: "P-01", name: "Pozo Atacama Norte", current: 1720, limit: 2500, unit: "m³/día", status: "normal", trend: -8, flow: "71.7 m³/h", ph: 7.4, temp: "18.2°C", conductiv: "248 mS/cm" },
  { id: "P-04", name: "Pozo Atacama Sur", current: 693, limit: 800, unit: "m³/día", status: "alerta", trend: +12, flow: "86.4 m³/h", ph: 7.6, temp: "19.1°C", conductiv: "312 mS/cm" },
  { id: "DS-01", name: "Planta Desalinizadora", current: 1480, limit: 1800, unit: "m³/día", status: "normal", trend: +5, flow: "61.7 m³/h", ph: 7.1, temp: "22.0°C", conductiv: "120 mS/cm" },
  { id: "RC-01", name: "Agua Reciclada Proceso", current: 940, limit: 1000, unit: "m³/día", status: "alerta", trend: +3, flow: "39.2 m³/h", ph: 7.3, temp: "16.8°C", conductiv: "198 mS/cm" },
  { id: "AQ-01", name: "Acuífero Profundo", current: 320, limit: 600, unit: "m³/día", status: "normal", trend: -2, flow: "13.3 m³/h", ph: 7.8, temp: "14.5°C", conductiv: "280 mS/cm" },
];

const aiRecommendations = [
  {
    priority: "alta", title: "Reducir extracción Pozo P-04",
    description: "Pozo en 86.6% de capacidad regulatoria. Transferir 120 m³/día a planta desalinizadora para evitar infracción SERNAGEOMIN.",
    saving: "120 m³/día ahorrados · Riesgo regulatorio eliminado",
    effort: "Sin inversión", implemented: false,
  },
  {
    priority: "alta", title: "Ampliar módulo de reciclaje RC-01",
    description: "RC-01 al 94% de capacidad. Instalar módulo adicional de filtración. Potencial para alcanzar 1,200 m³/día.",
    saving: "260 m³/día adicionales de agua reciclada",
    effort: "Inversión ~US$85,000", implemented: false,
  },
  {
    priority: "media", title: "Optimizar horario de evaporación",
    description: "Concentrar operaciones de evaporación entre 10:00-16:00 aprovecha temperatura máxima del Atacama, reduciendo tiempo de proceso 18%.",
    saving: "~5% reducción consumo · Sin inversión",
    effort: "Solo cambio operacional", implemented: true,
  },
  {
    priority: "media", title: "Sistema de detección de fugas en red de distribución",
    description: "Análisis de presiones detectó anomalía en tramo B-07 → B-11. Pérdida estimada de 35 m³/día por micro-fugas.",
    saving: "35 m³/día recuperados",
    effort: "Inversión ~US$12,000", implemented: false,
  },
  {
    priority: "baja", title: "Reutilizar agua de proceso de flotación",
    description: "El agua de descarga del proceso de flotación tiene calidad suficiente para reutilizarse en el lavado de equipos.",
    saving: "~80 m³/día adicionales",
    effort: "Inversión ~US$28,000", implemented: false,
  },
];

const qualityReadings = [
  { param: "pH", value: "7.4", rango: "6.5 – 8.5", ok: true },
  { param: "Conductividad", value: "248 mS/cm", rango: "< 350 mS/cm", ok: true },
  { param: "Litio disuelto", value: "1,340 mg/L", rango: "Monitoreo", ok: true },
  { param: "Arsénico", value: "0.012 mg/L", rango: "< 0.05 mg/L", ok: true },
  { param: "Turbidez", value: "1.8 NTU", rango: "< 5 NTU", ok: true },
  { param: "DBO₅", value: "2.1 mg/L", rango: "< 10 mg/L", ok: true },
  { param: "Sulfatos", value: "412 mg/L", rango: "< 500 mg/L", ok: true },
  { param: "Sólidos Susp.", value: "8.4 mg/L", rango: "< 25 mg/L", ok: true },
];

export default function AguaPage() {
  const priorityConfig: Record<string, { variant: "default" | "destructive" | "secondary" | "outline"; label: string }> = {
    alta: { variant: "destructive", label: "Alta" },
    media: { variant: "secondary", label: "Media" },
    baja: { variant: "outline", label: "Baja" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Waves className="h-6 w-6 text-blue-600" />
            Gestión del Agua
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitoreo hídrico integral · Salar de Atacama · Límite regulatorio SERNAGEOMIN: <strong>5,500 m³/día</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Upload className="h-4 w-4" />Importar CSV</Button>
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Exportar</Button>
          <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Registrar Lectura</Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Consumo Hoy", value: "4,820 m³", sub: "87.6% del límite diario", icon: Droplets, good: true, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Agua Reciclada Hoy", value: "2,350 m³", sub: "48.8% del total consumido", icon: Activity, good: true, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Eficiencia Hídrica", value: "87.6%", sub: "+3.1% vs mes anterior", icon: Gauge, good: true, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Temperatura Ambiente", value: "28.4 °C", sub: "Evaporación elevada", icon: ThermometerSun, good: false, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-xl font-bold mt-1">{kpi.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.sub}</p>
                </div>
                <div className={`rounded-lg p-2 ${kpi.bg}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-700">Pozo P-04 y sistema RC-01 requieren atención</AlertTitle>
        <AlertDescription className="text-amber-600 text-xs">
          P-04 está al 86.6% del límite (693/800 m³). RC-01 está al 94% de capacidad de reciclaje. La IA tiene 2 recomendaciones de alta prioridad.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="consumo">
        <TabsList className="grid w-full grid-cols-4 max-w-lg">
          <TabsTrigger value="consumo">Consumo</TabsTrigger>
          <TabsTrigger value="fuentes">Fuentes</TabsTrigger>
          <TabsTrigger value="calidad">Calidad</TabsTrigger>
          <TabsTrigger value="ia">IA</TabsTrigger>
        </TabsList>

        {/* CONSUMO TAB */}
        <TabsContent value="consumo" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Consumo diario — Últimos 7 días</CardTitle>
                <CardDescription className="text-xs">m³/día vs. límite SERNAGEOMIN</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={dailyData}>
                    <defs>
                      <linearGradient id="gConsumo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gReciclado" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="dia" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => [`${Number(v).toLocaleString("es-CL")} m³`]} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="limite" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Límite" />
                    <Area type="monotone" dataKey="consumo" stroke="#3b82f6" strokeWidth={2} fill="url(#gConsumo)" name="Consumo" />
                    <Area type="monotone" dataKey="reciclado" stroke="#10b981" strokeWidth={2} fill="url(#gReciclado)" name="Reciclado" />
                    <Area type="monotone" dataKey="desaliniz" stroke="#8b5cf6" strokeWidth={1.5} fill="none" name="Desaliniz." />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Flujo horario — Hoy</CardTitle>
                <CardDescription className="text-xs">Caudal total en m³/h vs. límite horario</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={hourlyToday}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hora" tick={{ fontSize: 9 }} interval={3} />
                    <YAxis tick={{ fontSize: 11 }} domain={[100, 280]} />
                    <Tooltip formatter={(v) => [`${Number(v).toLocaleString("es-CL")} m³/h`]} />
                    <Line type="monotone" dataKey="limite" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Límite" />
                    <Line type="monotone" dataKey="flujo" stroke="#3b82f6" strokeWidth={2} dot={false} name="Flujo" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Evolución mensual de consumo por fuente (m³/mes)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => [`${Number(v).toLocaleString("es-CL")} m³`]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="pozo" fill="#3b82f6" name="Pozo" radius={[2, 2, 0, 0]} stackId="a" />
                  <Bar dataKey="desaliniz" fill="#8b5cf6" name="Desaliniz." radius={[0, 0, 0, 0]} stackId="a" />
                  <Bar dataKey="reciclado" fill="#10b981" name="Reciclado" radius={[2, 2, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FUENTES TAB */}
        <TabsContent value="fuentes" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Estado de Fuentes — Detalle</CardTitle>
                <CardDescription className="text-xs">Consumo actual vs. límite concesión · Datos en tiempo real</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sources.map((src) => {
                  const pct = Math.round((src.current / src.limit) * 100);
                  return (
                    <div key={src.id} className="space-y-1.5">
                      <div className="flex justify-between items-start text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-muted-foreground bg-muted px-1 rounded">{src.id}</span>
                          <div>
                            <span className="font-medium">{src.name}</span>
                            {src.status === "alerta" && <AlertTriangle className="h-3.5 w-3.5 text-amber-500 inline ml-1" />}
                            <div className="flex gap-3 text-[10px] text-muted-foreground font-mono mt-0.5">
                              <span>Flujo: {src.flow}</span>
                              <span>pH: {src.ph}</span>
                              <span>T°: {src.temp}</span>
                              <span>Cond.: {src.conductiv}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`text-sm font-bold ${pct > 90 ? "text-red-600" : pct > 80 ? "text-amber-600" : "text-emerald-600"}`}>{pct}%</span>
                          <p className="text-[10px] text-muted-foreground">{src.current.toLocaleString("es-CL")} / {src.limit.toLocaleString("es-CL")} {src.unit}</p>
                        </div>
                      </div>
                      <Progress
                        value={pct}
                        className={`h-2 ${pct > 90 ? "[&>div]:bg-red-500" : pct > 80 ? "[&>div]:bg-amber-500" : "[&>div]:bg-blue-500"}`}
                      />
                      <p className={`text-[11px] flex items-center gap-1 ${src.trend > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                        {src.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {src.trend > 0 ? "+" : ""}{src.trend}% vs. ayer
                        {pct > 90 && <span className="ml-auto text-red-600 font-medium">⚠ Riesgo regulatorio</span>}
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Índice de Desempeño Hídrico</CardTitle>
                <CardDescription className="text-xs">Radar multidimensional</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="kpi" tick={{ fontSize: 10 }} />
                    <Radar name="Desempeño" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                    <Tooltip formatter={(v) => [`${v}%`]} />
                  </RadarChart>
                </ResponsiveContainer>
                <Separator className="my-3" />
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  {radarData.map((r) => (
                    <div key={r.kpi} className="flex justify-between gap-2">
                      <span className="text-muted-foreground">{r.kpi}</span>
                      <span className={`font-bold ${r.value < 80 ? "text-amber-600" : "text-emerald-600"}`}>{r.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* CALIDAD TAB */}
        <TabsContent value="calidad" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Beaker className="h-4 w-4 text-blue-600" />
                  Parámetros de Calidad — Pozo Atacama Norte (P-01)
                </CardTitle>
                <CardDescription className="text-xs">Última medición: hoy 08:30 · Laboratorio interno</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  <div className="grid grid-cols-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide py-2">
                    <span>Parámetro</span>
                    <span>Valor</span>
                    <span>Rango</span>
                    <span>Estado</span>
                  </div>
                  {qualityReadings.map((q) => (
                    <div key={q.param} className="grid grid-cols-4 items-center py-2.5 text-xs">
                      <span className="font-medium">{q.param}</span>
                      <span className="font-mono">{q.value}</span>
                      <span className="text-muted-foreground">{q.rango}</span>
                      <Badge variant="outline" className="text-[10px] w-fit text-emerald-600 border-emerald-200">
                        <CheckCircle2 className="h-3 w-3 mr-0.5" />OK
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Historial de pH — Últimas 24h</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={130}>
                    <LineChart data={Array.from({ length: 24 }, (_, i) => ({ h: `${i}:00`, ph: 7.2 + Math.sin(i / 4) * 0.3 }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="h" tick={{ fontSize: 9 }} interval={5} />
                      <YAxis tick={{ fontSize: 11 }} domain={[6.5, 8.5]} />
                      <Tooltip formatter={(v) => [Number(v).toFixed(2)]} />
                      <Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Historial de Conductividad — Últimas 24h</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={130}>
                    <LineChart data={Array.from({ length: 24 }, (_, i) => ({ h: `${i}:00`, cond: 245 + Math.sin(i / 3) * 12 + Math.random() * 5 }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="h" tick={{ fontSize: 9 }} interval={5} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v) => [`${Number(v).toFixed(0)} mS/cm`]} />
                      <Line type="monotone" dataKey="cond" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* IA TAB */}
        <TabsContent value="ia" className="mt-4 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-violet-600" />
            <span>5 recomendaciones generadas en base a 90 días de datos históricos · Límites SERNAGEOMIN 2026</span>
          </div>

          <div className="grid gap-3">
            {aiRecommendations.map((rec, i) => (
              <Card key={i} className={rec.implemented ? "opacity-60 bg-muted/30" : ""}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge variant={priorityConfig[rec.priority].variant} className="text-xs">
                          {priorityConfig[rec.priority].label} prioridad
                        </Badge>
                        {rec.implemented && (
                          <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />Implementada
                          </Badge>
                        )}
                      </div>
                      <p className="font-semibold text-sm">{rec.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs text-emerald-700 bg-emerald-50 rounded px-2 py-0.5 border border-emerald-100">
                          💧 {rec.saving}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted rounded px-2 py-0.5">
                          🔧 {rec.effort}
                        </span>
                      </div>
                    </div>
                    {!rec.implemented && (
                      <Button size="sm" variant="outline" className="shrink-0 gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />Implementar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-600" />
                Impacto proyectado si se implementan todas las recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Ahorro hídrico mensual", value: "~15,000 m³", sub: "≈ 3.4 días de producción", color: "text-blue-600" },
                  { label: "Reducción de riesgo regulatorio", value: "95%", sub: "2 pozos en zona segura", color: "text-emerald-600" },
                  { label: "Inversión total requerida", value: "US$125,000", sub: "Recuperación en ~8 meses", color: "text-amber-600" },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-lg bg-muted/30 border">
                    <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                    <p className="text-xs font-medium mt-1">{item.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
