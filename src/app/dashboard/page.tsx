"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Droplets, FileText, AlertTriangle, TrendingDown, TrendingUp,
  CheckCircle2, Clock, Zap, Mountain, Pickaxe, ThermometerSun,
  BarChart3, ArrowRight, Gauge, Waves, Activity,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const weeklyWater = [
  { dia: "Lun", consumo: 5200, limite: 5500, reciclado: 1800 },
  { dia: "Mar", consumo: 5050, limite: 5500, reciclado: 1900 },
  { dia: "Mié", consumo: 4980, limite: 5500, reciclado: 2100 },
  { dia: "Jue", consumo: 5320, limite: 5500, reciclado: 1750 },
  { dia: "Vie", consumo: 4760, limite: 5500, reciclado: 2200 },
  { dia: "Sáb", consumo: 4820, limite: 5500, reciclado: 2350 },
  { dia: "Dom", consumo: 4650, limite: 5500, reciclado: 2400 },
];

const productionData = [
  { mes: "Ene", litio: 2840, meta: 3000 },
  { mes: "Feb", litio: 2960, meta: 3000 },
  { mes: "Mar", litio: 3120, meta: 3000 },
  { mes: "Abr", litio: 3050, meta: 3000 },
  { mes: "May", litio: 3280, meta: 3200 },
];

const waterSourcePie = [
  { name: "Pozo Norte", value: 36, color: "#3b82f6" },
  { name: "Pozo Sur", value: 14, color: "#60a5fa" },
  { name: "Desalinizadora", value: 31, color: "#8b5cf6" },
  { name: "Reciclado", value: 19, color: "#10b981" },
];

const kpis = [
  { title: "Consumo de Agua Hoy", value: "4,820 m³", change: "-12% vs ayer", trend: "down", good: true, icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Producción Li (mes)", value: "3,280 t", change: "+2.5% vs meta", trend: "up", good: true, icon: Pickaxe, color: "text-amber-600", bg: "bg-amber-50" },
  { title: "Eficiencia Hídrica", value: "87.6%", change: "+3.1% vs mes ant.", trend: "up", good: true, icon: Gauge, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Documentos IA (mes)", value: "47", change: "+8 esta semana", trend: "up", good: true, icon: FileText, color: "text-violet-600", bg: "bg-violet-50" },
  { title: "Alertas Activas", value: "3", change: "2 críticas, 1 aviso", trend: "up", good: false, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  { title: "Días sin incidente", value: "18", change: "Última: 02/05/2026", trend: "up", good: true, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Temp. Promedio Mina", value: "28.4 °C", change: "+1.2°C vs semana", trend: "up", good: false, icon: ThermometerSun, color: "text-orange-600", bg: "bg-orange-50" },
  { title: "Energía Consumida", value: "12.4 MWh", change: "-5.3% vs ayer", trend: "down", good: true, icon: Zap, color: "text-yellow-600", bg: "bg-yellow-50" },
];

const recentAlerts = [
  { id: 1, title: "Consumo hídrico supera umbral — Pozo P-04", severity: "critical", module: "Agua", time: "Hace 23 min" },
  { id: 2, title: "Agua reciclada RC-01 en 94% de capacidad", severity: "critical", module: "Agua", time: "Hace 1 h" },
  { id: 3, title: "EIA Expansión Fase III vence en 26 días", severity: "warning", module: "Documentos", time: "Hace 2 h" },
];

const recentDocs = [
  { name: "Informe Geológico Q1 2026 — Salar Atacama", status: "analizado", date: "19/05" },
  { name: "EIA Expansión Fase III — SEIA", status: "pendiente", date: "18/05" },
  { name: "Reporte Mensual SERNAGEOMIN — Abril", status: "analizado", date: "15/05" },
  { name: "Plan de Cierre Faena Sur", status: "en revisión", date: "12/05" },
  { name: "Estudio Hidrogeológico Maricunga", status: "analizado", date: "10/05" },
];

const sensorReadings = [
  { id: "P-01", name: "Pozo Atacama Norte", flow: "71.7 m³/h", temp: "18.2°C", ph: "7.4", status: "normal" },
  { id: "P-04", name: "Pozo Atacama Sur", flow: "86.4 m³/h", temp: "19.1°C", ph: "7.6", status: "alerta" },
  { id: "DS-01", name: "Desalinizadora 1", flow: "61.7 m³/h", temp: "22.0°C", ph: "7.1", status: "normal" },
  { id: "RC-01", name: "Agua Reciclada", flow: "39.2 m³/h", temp: "16.8°C", ph: "7.3", status: "alerta" },
];

const complianceItems = [
  { name: "Límite hídrico SERNAGEOMIN", value: 87, ok: true },
  { name: "Registro diario pozos", value: 100, ok: true },
  { name: "Monitoreo calidad agua", value: 92, ok: true },
  { name: "Reportes ILO 176 (seguridad)", value: 75, ok: false },
  { name: "Plan de cierre actualizado", value: 60, ok: false },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Mountain className="h-6 w-6 text-amber-600" />
            Resumen Operacional
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Faena: <strong>Salar de Atacama</strong> · Región de Antofagasta ·{" "}
            {new Date().toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1"><Activity className="h-3 w-3 text-emerald-500" />En línea</Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Exportar resumen
          </Button>
        </div>
      </div>

      {/* Critical alert */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-700">2 alertas críticas activas</AlertTitle>
        <AlertDescription className="text-red-600 text-xs">
          Pozo P-04 al 91% del límite regulatorio · Sistema RC-01 al 94% de capacidad. Revisar módulo de Agua.
        </AlertDescription>
      </Alert>

      {/* KPI Grid 4x2 */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="hover:shadow-sm transition-shadow">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide leading-none mb-2 truncate">
                    {kpi.title}
                  </p>
                  <p className="text-xl font-bold leading-none">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {kpi.trend === "up" ? (
                      <TrendingUp className={`h-3 w-3 shrink-0 ${kpi.good ? "text-emerald-500" : "text-red-500"}`} />
                    ) : (
                      <TrendingDown className={`h-3 w-3 shrink-0 ${kpi.good ? "text-emerald-500" : "text-red-500"}`} />
                    )}
                    <p className="text-[11px] text-muted-foreground truncate">{kpi.change}</p>
                  </div>
                </div>
                <div className={`rounded-lg p-2 shrink-0 ml-2 ${kpi.bg}`}>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Water consumption chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Waves className="h-4 w-4 text-blue-600" />
              Consumo de Agua — Últimos 7 días (m³/día)
            </CardTitle>
            <CardDescription className="text-xs">Consumo total vs. límite SERNAGEOMIN y agua reciclada</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyWater}>
                <defs>
                  <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorReciclado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dia" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 6000]} />
                <Tooltip formatter={(v) => [`${Number(v).toLocaleString("es-CL")} m³`]} />
                <Area type="monotone" dataKey="limite" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 4" fill="none" name="Límite" />
                <Area type="monotone" dataKey="consumo" stroke="#3b82f6" strokeWidth={2} fill="url(#colorConsumo)" name="Consumo" />
                <Area type="monotone" dataKey="reciclado" stroke="#10b981" strokeWidth={2} fill="url(#colorReciclado)" name="Reciclado" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Water source pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              Fuentes de Agua Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={waterSourcePie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={2}>
                    {waterSourcePie.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full mt-1">
                {waterSourcePie.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                    <span className="text-xs text-muted-foreground truncate">{s.name}</span>
                    <span className="text-xs font-medium ml-auto">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production + Compliance + Alerts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Production chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Pickaxe className="h-4 w-4 text-amber-600" />
              Producción de Litio (t/mes)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={productionData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[2500, 3500]} />
                <Tooltip formatter={(v) => [`${Number(v).toLocaleString("es-CL")} t`]} />
                <Bar dataKey="meta" fill="#e5e7eb" name="Meta" radius={[2, 2, 0, 0]} />
                <Bar dataKey="litio" fill="#f59e0b" name="Producción" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-sm bg-amber-400" />Producción</div>
              <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-sm bg-gray-200" />Meta</div>
              <Badge variant="secondary" className="text-[10px]">+9.3% YTD</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Compliance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Cumplimiento Regulatorio
            </CardTitle>
            <CardDescription className="text-xs">Estado vs. SERNAGEOMIN e ILO 176</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {complianceItems.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium truncate pr-2">{item.name}</span>
                  <span className={`text-xs font-bold shrink-0 ${item.ok ? "text-emerald-600" : "text-amber-600"}`}>{item.value}%</span>
                </div>
                <Progress
                  value={item.value}
                  className={`h-1.5 ${item.ok ? "[&>div]:bg-emerald-500" : "[&>div]:bg-amber-500"}`}
                />
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Cumplimiento global</span>
              <span className="font-bold text-emerald-600">82.8%</span>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Alertas Activas
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2 gap-1">
                Ver todas <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className={`rounded-lg border p-2.5 text-xs ${alert.severity === "critical" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}>
                <div className="flex items-start justify-between gap-1 mb-0.5">
                  <p className="font-medium leading-snug">{alert.title}</p>
                  <Badge variant={alert.severity === "critical" ? "destructive" : "outline"} className="text-[10px] shrink-0">
                    {alert.severity === "critical" ? "Crítica" : "Aviso"}
                  </Badge>
                </div>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />{alert.time}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sensors + Documents row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Live sensor readings */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-600" />
                Lecturas de Sensores — Tiempo Real
              </CardTitle>
              <Badge variant="outline" className="text-[10px] gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                En vivo
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              <div className="grid grid-cols-5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide pb-2">
                <span className="col-span-2">Fuente</span>
                <span>Flujo</span>
                <span>pH</span>
                <span>Estado</span>
              </div>
              {sensorReadings.map((s) => (
                <div key={s.id} className="grid grid-cols-5 items-center py-2.5 text-xs">
                  <div className="col-span-2">
                    <p className="font-medium">{s.name}</p>
                    <p className="text-muted-foreground font-mono text-[10px]">{s.id} · {s.temp}</p>
                  </div>
                  <span className="font-mono">{s.flow}</span>
                  <span className="font-mono">{s.ph}</span>
                  <Badge
                    variant={s.status === "normal" ? "outline" : "destructive"}
                    className="text-[10px] w-fit"
                  >
                    {s.status === "normal" ? <><CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />OK</> : "Alerta"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent documents */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-600" />
                Documentos Recientes
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2 gap-1">
                Ver todos <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <CardDescription className="text-xs">Últimos informes procesados por IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {recentDocs.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-xs font-medium truncate">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[11px] text-muted-foreground">{doc.date}</span>
                    <Badge
                      variant={doc.status === "analizado" ? "default" : doc.status === "pendiente" ? "outline" : "secondary"}
                      className="text-[10px]"
                    >
                      {doc.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
