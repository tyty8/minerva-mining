"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3, Download, FileText, Plus, Sparkles,
  CheckCircle2, Clock, Calendar, Building, AlertTriangle,
  TrendingUp, Shield, Globe, Activity,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, LineChart, Line,
} from "recharts";

const reports = [
  {
    id: "RPT-2026-05", name: "Reporte Mensual SERNAGEOMIN — Mayo 2026",
    type: "SERNAGEOMIN", status: "borrador", due: "31/05/2026",
    generated: true, compliance: 87,
    description: "Reporte mensual de consumo hídrico, seguridad y producción",
    sections: ["Consumo hídrico por fuente", "Incidentes de seguridad", "Producción de litio", "Calidad del agua"],
  },
  {
    id: "EIA-2026-03", name: "Declaración de Impacto Ambiental — Expansión Fase III",
    type: "SEIA", status: "pendiente", due: "15/06/2026",
    generated: false, compliance: 0,
    description: "DIA para nueva área de extracción de 6.2 km² en Zona Laguna Sur",
    sections: ["Línea de base ambiental", "Identificación de impactos", "Medidas de mitigación", "Plan de seguimiento"],
  },
  {
    id: "RPT-2026-04", name: "Reporte Mensual SERNAGEOMIN — Abril 2026",
    type: "SERNAGEOMIN", status: "enviado", due: "30/04/2026",
    generated: true, compliance: 94,
    description: "Reporte mensual de abril — aprobado con 2 observaciones menores",
    sections: [],
  },
  {
    id: "ILO-2026-01", name: "Informe Trimestral Seguridad ILO 176 — Q1 2026",
    type: "ILO 176", status: "enviado", due: "15/04/2026",
    generated: true, compliance: 91,
    description: "Informe de seguridad y condiciones de trabajo Q1 2026",
    sections: [],
  },
  {
    id: "CIERRE-2026-01", name: "Plan de Cierre Faena Sur — Actualización Anual",
    type: "SERNAGEOMIN", status: "aprobado", due: "31/03/2026",
    generated: true, compliance: 100,
    description: "Plan de cierre progresivo aprobado sin observaciones",
    sections: [],
  },
  {
    id: "DGA-2026-01", name: "Balance Hídrico Anual 2025 — DGA",
    type: "DGA", status: "aprobado", due: "28/02/2026",
    generated: true, compliance: 98,
    description: "Balance hídrico 2025 aprobado. Meta de reciclaje superada.",
    sections: [],
  },
];

const complianceHistory = [
  { mes: "Nov", sernageomin: 88, ilo: 85, dga: 91 },
  { mes: "Dic", sernageomin: 90, ilo: 87, dga: 93 },
  { mes: "Ene", sernageomin: 91, ilo: 88, dga: 94 },
  { mes: "Feb", sernageomin: 89, ilo: 90, dga: 95 },
  { mes: "Mar", sernageomin: 93, ilo: 91, dga: 96 },
  { mes: "Abr", sernageomin: 94, ilo: 91, dga: 97 },
  { mes: "May", sernageomin: 87, ilo: 75, dga: 94 },
];

const deadlines = [
  { name: "Reporte SERNAGEOMIN Mayo", date: "31/05/2026", daysLeft: 11, urgent: true },
  { name: "DIA Expansión Fase III", date: "15/06/2026", daysLeft: 26, urgent: false },
  { name: "Informe ILO 176 Q2", date: "15/07/2026", daysLeft: 56, urgent: false },
  { name: "Reporte Cochilco Junio", date: "10/07/2026", daysLeft: 51, urgent: false },
  { name: "Actualización DGA Anual", date: "28/02/2027", daysLeft: 284, urgent: false },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive"; color: string }> = {
  borrador: { label: "Borrador", variant: "secondary", color: "text-blue-600" },
  pendiente: { label: "Pendiente", variant: "outline", color: "text-amber-600" },
  enviado: { label: "Enviado", variant: "default", color: "text-emerald-600" },
  aprobado: { label: "Aprobado", variant: "default", color: "text-emerald-700" },
};

const typeColors: Record<string, string> = {
  SERNAGEOMIN: "bg-blue-100 text-blue-700",
  SEIA: "bg-purple-100 text-purple-700",
  "ILO 176": "bg-amber-100 text-amber-700",
  DGA: "bg-cyan-100 text-cyan-700",
  Cochilco: "bg-green-100 text-green-700",
};

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Reportes Regulatorios
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Generación automática de informes SERNAGEOMIN, SEIA, ILO 176 y Cochilco con IA
          </p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" />Nuevo Reporte</Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Cumplimiento global", value: "89.3%", sub: "Promedio todos los entes", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Reportes pendientes", value: "2", sub: "Requieren acción urgente", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Próximo vencimiento", value: "11 días", sub: "SERNAGEOMIN Mayo 2026", icon: Calendar, color: "text-red-600", bg: "bg-red-50" },
          { label: "Enviados en 2026", value: "8", sub: "0 rechazados · 2 con obs.", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent className="flex items-center gap-3 pt-5 pb-4">
              <div className={`rounded-lg p-2 ${k.bg}`}><k.icon className={`h-5 w-5 ${k.color}`} /></div>
              <div>
                <p className="text-xl font-bold leading-none">{k.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
                <p className="text-[10px] text-muted-foreground">{k.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert className="border-amber-200 bg-amber-50">
        <Sparkles className="h-4 w-4 text-violet-600" />
        <AlertTitle>Generación IA disponible</AlertTitle>
        <AlertDescription className="text-xs">
          Minerva puede generar el borrador del Reporte SERNAGEOMIN Mayo 2026 usando tus datos de consumo hídrico, alertas y lecturas de sensores. Tiempo estimado: 2-3 minutos.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="reportes">
        <TabsList>
          <TabsTrigger value="reportes">Mis Reportes</TabsTrigger>
          <TabsTrigger value="vencimientos">Vencimientos</TabsTrigger>
          <TabsTrigger value="cumplimiento">Historial Cumplimiento</TabsTrigger>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
        </TabsList>

        {/* REPORTS TAB */}
        <TabsContent value="reportes" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="grid grid-cols-12 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3">
                  <span className="col-span-5">Reporte</span>
                  <span className="col-span-2">Tipo</span>
                  <span className="col-span-2">Cumplimiento</span>
                  <span>Vence</span>
                  <span>Estado</span>
                  <span />
                </div>
                {reports.map((report) => (
                  <div key={report.id} className="grid grid-cols-12 items-center px-4 py-4 gap-2 hover:bg-muted/20 transition-colors">
                    <div className="col-span-5">
                      <p className="text-sm font-medium leading-snug">{report.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
                      {report.sections.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {report.sections.map(s => (
                            <span key={s} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="col-span-2">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${typeColors[report.type] ?? "bg-gray-100 text-gray-700"}`}>
                        {report.type}
                      </span>
                    </div>
                    <div className="col-span-2">
                      {report.compliance > 0 ? (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-bold ${report.compliance >= 90 ? "text-emerald-600" : report.compliance >= 75 ? "text-amber-600" : "text-red-600"}`}>
                              {report.compliance}%
                            </span>
                          </div>
                          <Progress value={report.compliance} className={`h-1.5 ${report.compliance >= 90 ? "[&>div]:bg-emerald-500" : "[&>div]:bg-amber-500"}`} />
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{report.due}</span>
                    <Badge variant={statusConfig[report.status].variant} className="text-[10px] w-fit">
                      {statusConfig[report.status].label}
                    </Badge>
                    <div className="flex justify-end">
                      {report.generated ? (
                        <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
                          <Download className="h-3 w-3" />PDF
                        </Button>
                      ) : (
                        <Button size="sm" className="gap-1 text-xs h-7">
                          <Sparkles className="h-3 w-3" />Generar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VENCIMIENTOS TAB */}
        <TabsContent value="vencimientos" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Calendar className="h-4 w-4" />Próximos Vencimientos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deadlines.map((d) => (
                    <div key={d.name} className={`rounded-lg border p-3 ${d.urgent ? "border-red-200 bg-red-50" : ""}`}>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.date}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-lg font-bold ${d.daysLeft <= 15 ? "text-red-600" : d.daysLeft <= 30 ? "text-amber-600" : "text-emerald-600"}`}>
                            {d.daysLeft}d
                          </p>
                          <p className="text-[10px] text-muted-foreground">restantes</p>
                        </div>
                      </div>
                      <Progress
                        value={Math.max(0, 100 - (d.daysLeft / 90) * 100)}
                        className={`h-1 mt-2 ${d.daysLeft <= 15 ? "[&>div]:bg-red-500" : d.daysLeft <= 30 ? "[&>div]:bg-amber-500" : "[&>div]:bg-emerald-500"}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Calendario de Obligaciones 2026</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y text-xs">
                  {[
                    { mes: "Mayo 2026", items: ["Reporte SERNAGEOMIN mensual (31/05)"] },
                    { mes: "Junio 2026", items: ["DIA Expansión Fase III SEIA (15/06)", "Reporte Cochilco producción (10/06)"] },
                    { mes: "Julio 2026", items: ["Informe ILO 176 Q2 (15/07)", "Reporte Cochilco producción (10/07)"] },
                    { mes: "Agosto 2026", items: ["Reporte SERNAGEOMIN mensual (31/08)", "Actualización Plan de Cierre (15/08)"] },
                    { mes: "Septiembre 2026", items: ["Informe ILO 176 Q3 (15/09)", "Reporte DGA trimestral (30/09)"] },
                  ].map((m) => (
                    <div key={m.mes} className="py-2.5">
                      <p className="font-semibold text-xs mb-1.5">{m.mes}</p>
                      <ul className="space-y-1">
                        {m.items.map(i => (
                          <li key={i} className="flex items-start gap-1.5 text-muted-foreground">
                            <FileText className="h-3 w-3 shrink-0 mt-0.5" />{i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* CUMPLIMIENTO TAB */}
        <TabsContent value="cumplimiento" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Historial de Cumplimiento por Ente Regulador</CardTitle>
              <CardDescription className="text-xs">% cumplimiento mensual · Nov 2025 – May 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={complianceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[70, 100]} />
                  <Tooltip formatter={(v) => [`${Number(v).toFixed(0)}%`]} />
                  <Line type="monotone" dataKey="sernageomin" stroke="#3b82f6" strokeWidth={2} dot name="SERNAGEOMIN" />
                  <Line type="monotone" dataKey="ilo" stroke="#f59e0b" strokeWidth={2} dot name="ILO 176" />
                  <Line type="monotone" dataKey="dga" stroke="#10b981" strokeWidth={2} dot name="DGA" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { ente: "SERNAGEOMIN", score: 87, trend: -7, issues: ["Consumo hídrico P-04 al 86% límite", "Sensor P-07 sin datos 3 días en abril"] },
              { ente: "ILO 176 (Seguridad)", score: 75, trend: -16, issues: ["Reporte trimestral Q2 pendiente", "2 incidentes leves sin cierre formal", "Capacitación RIOHS atrasada"] },
              { ente: "DGA (Aguas)", score: 94, trend: -3, issues: ["Caudal ecológico verificado OK", "Registros completos al día"] },
            ].map((e) => (
              <Card key={e.ente}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{e.ente}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between mb-2">
                    <p className={`text-3xl font-bold ${e.score >= 90 ? "text-emerald-600" : e.score >= 75 ? "text-amber-600" : "text-red-600"}`}>{e.score}%</p>
                    <p className={`text-sm ${e.trend >= 0 ? "text-emerald-600" : "text-red-600"}`}>{e.trend >= 0 ? "+" : ""}{e.trend}% vs. mes ant.</p>
                  </div>
                  <Progress value={e.score} className={`h-2 mb-3 ${e.score >= 90 ? "[&>div]:bg-emerald-500" : e.score >= 75 ? "[&>div]:bg-amber-500" : "[&>div]:bg-red-500"}`} />
                  <ul className="space-y-1">
                    {e.issues.map(i => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5 text-amber-500" />{i}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* PLANTILLAS TAB */}
        <TabsContent value="plantillas" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Reporte Mensual SERNAGEOMIN", desc: "Consumo hídrico, seguridad, producción. Plantilla oficial 2026.", period: "Mensual", ente: "SERNAGEOMIN", icon: Building },
              { name: "Declaración de Impacto Ambiental", desc: "DIA para proyectos < 5,000 m³/día. Incluye línea de base.", period: "Por proyecto", ente: "SEIA", icon: Globe },
              { name: "Estudio de Impacto Ambiental", desc: "EIA para proyectos mayores. 12+ secciones requeridas.", period: "Por proyecto", ente: "SEIA", icon: Globe },
              { name: "Informe Seguridad ILO 176", desc: "Incidentes, condiciones, capacitación. Formato Chile 2024.", period: "Trimestral", ente: "ILO 176", icon: Shield },
              { name: "Balance Hídrico Anual", desc: "Consumo, fuentes, reciclaje y caudales ecológicos — para DGA.", period: "Anual", ente: "DGA", icon: Activity },
              { name: "Informe Producción Cochilco", desc: "Producción y exportaciones de litio. Formatos Cochilco 2026.", period: "Mensual", ente: "Cochilco", icon: TrendingUp },
            ].map((t) => (
              <Card key={t.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2 shrink-0">
                      <t.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className="text-sm font-semibold leading-snug">{t.name}</p>
                        <Badge variant="outline" className="text-[10px] shrink-0">{t.period}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${typeColors[t.ente] ?? "bg-gray-100 text-gray-700"}`}>{t.ente}</span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 px-2">
                          <Sparkles className="h-3 w-3" />Generar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
