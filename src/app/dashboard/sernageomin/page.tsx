"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  CheckCircle2, Clock, AlertTriangle, FileText, Upload,
  Download, Send, Calendar, Shield, HardHat, Zap,
  ChevronRight, Info, Plus, Users,
} from "lucide-react";

const today = new Date(2026, 4, 21); // May 21 2026
const daysUntil = (month: number, day: number) => {
  const target = new Date(2026, month - 1, day);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
};

const formStatus = [
  {
    code: "E-100", name: "Accidentabilidad — Empleadora", desc: "Informe mensual de accidentes del empleador directo", deadline: `15 de junio 2026`, daysLeft: daysUntil(6, 15), period: "Mayo 2026", status: "pendiente",
    fields: { trabajadores: 843, accidentes: 0, diasPerdidos: 0, tasaFreq: 0, tasaGrav: 0 },
  },
  {
    code: "E-200", name: "Accidentabilidad — Contratistas", desc: "Informe mensual de accidentes de empresas contratistas", deadline: `15 de junio 2026`, daysLeft: daysUntil(6, 15), period: "Mayo 2026", status: "pendiente",
    fields: { trabajadores: 312, accidentes: 1, diasPerdidos: 3, tasaFreq: 9.6, tasaGrav: 28.8 },
  },
  {
    code: "E-300", name: "Producción Minera", desc: "Declaración mensual de producción y estadísticas mineras", deadline: `31 de mayo 2026`, daysLeft: daysUntil(5, 31), period: "Abril 2026", status: "enviado",
    fields: { produccionTon: 14820, carbonatoBruto: 98.3, eficiencia: 94.2 },
  },
  {
    code: "E-700", name: "Depósito de Relaves", desc: "Informe trimestral de depósitos de relaves — Q1 2026", deadline: `15 de abril 2026`, daysLeft: daysUntil(4, 15), period: "Q1 2026", status: "enviado",
    fields: { volumenDepositado: 42300, freeboard: 1.82, alturaActual: 28.4, capacidadPct: 61 },
  },
];

const accidentHistory = [
  { mes: "Nov", e100: 0, e200: 2 }, { mes: "Dic", e100: 1, e200: 0 }, { mes: "Ene", e100: 0, e200: 1 },
  { mes: "Feb", e100: 0, e200: 0 }, { mes: "Mar", e100: 1, e200: 2 }, { mes: "Abr", e100: 0, e200: 1 },
  { mes: "May", e100: 0, e200: 1 },
];

const produccionHistory = [
  { mes: "Nov", produccion: 13200, objetivo: 14000 }, { mes: "Dic", produccion: 12800, objetivo: 14000 },
  { mes: "Ene", produccion: 14100, objetivo: 14500 }, { mes: "Feb", produccion: 15200, objetivo: 14500 },
  { mes: "Mar", produccion: 14600, objetivo: 14500 }, { mes: "Abr", produccion: 14820, objetivo: 14500 },
];

const inspections = [
  { fecha: "12/05/2026", tipo: "Ordinaria", area: "Planta de Carbonato", inspector: "Ing. R. Campos (SERNAGEOMIN)", resultado: "Observaciones menores", obs: 2, estado: "En respuesta" },
  { fecha: "03/03/2026", tipo: "Sorpresiva", area: "Pozos de extracción P-04", inspector: "Ing. M. Vidal (SERNAGEOMIN)", resultado: "Sin observaciones", obs: 0, estado: "Cerrada" },
  { fecha: "18/01/2026", tipo: "Ordinaria", area: "Depósito de relaves TR-01", inspector: "Ing. R. Campos (SERNAGEOMIN)", resultado: "Observaciones graves", obs: 1, estado: "Subsanada" },
];

const sanctions = [
  { numero: "RES-2025-0341", infraccion: "E-100 tardío — noviembre 2024", categoria: "Menos grave", utm: 12.5, estado: "Pagada", fecha: "Mar 2025" },
  { numero: "RES-2024-0188", infraccion: "E-700 sin firma de ingeniero", categoria: "Menos grave", utm: 8.0, estado: "Pagada", fecha: "Sep 2024" },
];

const statusConfig = {
  pendiente: { label: "Pendiente", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: Clock },
  enviado: { label: "Enviado", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  vencido: { label: "Vencido", color: "text-red-600", bg: "bg-red-50 border-red-200", icon: AlertTriangle },
};

export default function SernageominPage() {
  const pending = formStatus.filter(f => f.status === "pendiente");
  const submitted = formStatus.filter(f => f.status === "enviado");
  const urgent = pending.filter(f => f.daysLeft <= 7);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SERNAGEOMIN</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gestión de formularios, fiscalizaciones y cumplimiento de seguridad minera
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="gap-2">
            <Send className="h-4 w-4" />
            Ir a SIMIN
          </Button>
        </div>
      </div>

      {urgent.length > 0 && (
        <Alert className="border-amber-300 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-sm">
            <strong>{urgent.length} formulario(s) vence(n) en menos de 7 días.</strong> El {urgent[0].code} — {urgent[0].period} debe enviarse antes del {urgent[0].deadline}.
          </AlertDescription>
        </Alert>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pendientes este mes", value: pending.length, color: "text-amber-600", icon: Clock },
          { label: "Enviados este trimestre", value: submitted.length, color: "text-emerald-600", icon: CheckCircle2 },
          { label: "Días sin accidente (E-100)", value: 47, color: "text-blue-600", icon: Shield },
          { label: "Sanciones activas", value: 0, color: "text-emerald-600", icon: HardHat },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-1">
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="formularios">
        <TabsList className="grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="formularios">Formularios</TabsTrigger>
          <TabsTrigger value="produccion">Producción</TabsTrigger>
          <TabsTrigger value="fiscalizacion">Fiscalización</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        {/* FORMULARIOS */}
        <TabsContent value="formularios" className="mt-4 space-y-4">
          {formStatus.map((form) => {
            const cfg = statusConfig[form.status as keyof typeof statusConfig];
            const Icon = cfg.icon;
            const isUrgent = form.status === "pendiente" && form.daysLeft <= 7;
            return (
              <Card key={form.code} className={`border ${isUrgent ? "border-amber-300" : ""}`}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-lg p-2.5 border ${cfg.bg}`}>
                        <FileText className={`h-5 w-5 ${cfg.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold">{form.code}</span>
                          <span className="text-sm font-medium">{form.name}</span>
                          <Badge variant="outline" className="text-[10px]">{form.period}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{form.desc}</p>
                        <div className="flex items-center gap-4 mt-2">
                          {form.code === "E-100" && (
                            <>
                              <span className="text-xs"><span className="font-medium">{form.fields.trabajadores}</span> <span className="text-muted-foreground">trabajadores</span></span>
                              <span className="text-xs"><span className="font-medium text-emerald-600">{form.fields.accidentes}</span> <span className="text-muted-foreground">accidentes</span></span>
                              <span className="text-xs"><span className="font-medium">{form.fields.diasPerdidos}</span> <span className="text-muted-foreground">días perdidos</span></span>
                            </>
                          )}
                          {form.code === "E-200" && (
                            <>
                              <span className="text-xs"><span className="font-medium">{form.fields.trabajadores}</span> <span className="text-muted-foreground">contratistas</span></span>
                              <span className="text-xs"><span className="font-medium text-amber-600">{form.fields.accidentes}</span> <span className="text-muted-foreground">accidentes</span></span>
                              <span className="text-xs">IF: <span className="font-medium">{form.fields.tasaFreq}</span></span>
                            </>
                          )}
                          {form.code === "E-300" && (
                            <>
                              <span className="text-xs"><span className="font-medium">{form.fields.produccionTon?.toLocaleString("es-CL")}</span> <span className="text-muted-foreground">ton producidas</span></span>
                              <span className="text-xs">Li₂CO₃: <span className="font-medium">{form.fields.carbonatoBruto}%</span></span>
                              <span className="text-xs">Efic.: <span className="font-medium">{form.fields.eficiencia}%</span></span>
                            </>
                          )}
                          {form.code === "E-700" && (
                            <>
                              <span className="text-xs"><span className="font-medium">{form.fields.volumenDepositado?.toLocaleString("es-CL")}</span> <span className="text-muted-foreground">m³ depositados</span></span>
                              <span className="text-xs">Freeboard: <span className="font-medium">{form.fields.freeboard} m</span></span>
                              <span className="text-xs">Capacidad: <span className="font-medium">{form.fields.capacidadPct}%</span></span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 text-right space-y-2">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Icon className={`h-3.5 w-3.5 ${cfg.color}`} />
                        <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Vence: {form.deadline}</p>
                      {form.status === "pendiente" && (
                        <div className="flex gap-1.5 justify-end">
                          <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                            <Upload className="h-3 w-3" />
                            Pre-llenar
                          </Button>
                          <Button size="sm" className="text-xs h-7 gap-1">
                            <Send className="h-3 w-3" />
                            Enviar a SIMIN
                          </Button>
                        </div>
                      )}
                      {form.status === "enviado" && (
                        <Button size="sm" variant="ghost" className="text-xs h-7 gap-1">
                          <Download className="h-3 w-3" />
                          Descargar PDF
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              E-301 Anual
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
              <Info className="h-4 w-4" />
              Guía formularios SERNAGEOMIN
            </Button>
          </div>
        </TabsContent>

        {/* PRODUCCIÓN */}
        <TabsContent value="produccion" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Producción Abril 2026", value: "14.820 ton", sub: "+2.2% vs objetivo", color: "text-emerald-600" },
              { label: "Acumulado 2026", value: "59.720 ton", sub: "Meta: 174.000 ton/año", color: "text-blue-600" },
              { label: "Pureza Li₂CO₃", value: "98.3%", sub: "Especificación: ≥ 98.0%", color: "text-emerald-600" },
            ].map(s => (
              <Card key={s.label}>
                <CardContent className="pt-4">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Producción Mensual vs. Objetivo (ton)</CardTitle>
              <CardDescription>Últimos 6 meses — datos para formulario E-300</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={produccionHistory} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => [Number(v).toLocaleString("es-CL") + " ton"]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="produccion" name="Producción real" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="objetivo" name="Objetivo" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Depósito de Relaves TR-01 — Estado Q1 2026</CardTitle>
              <CardDescription>Datos para formulario E-700 trimestral</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Volumen depositado Q1", value: "42.300 m³", note: "+3.1% vs Q4 2025" },
                  { label: "Altura actual (cota cresta)", value: "28.4 m.s.n.m.", note: "Máx. autorizado: 35 m" },
                  { label: "Freeboard disponible", value: "1.82 m", note: "Mínimo regulatorio: 0.50 m ✓" },
                  { label: "Conductividad seepage", value: "1.42 mS/cm", note: "Umbral alerta: 2.0 mS/cm ✓" },
                ].map(f => (
                  <div key={f.label} className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <p className="text-sm font-bold mt-0.5">{f.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Capacidad utilizada</span>
                  <span className="font-medium">61%</span>
                </div>
                <Progress value={61} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FISCALIZACIÓN */}
        <TabsContent value="fiscalizacion" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Historial de Fiscalizaciones</CardTitle>
              <CardDescription>Inspecciones SERNAGEOMIN en faena — últimos 18 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {inspections.map((ins, i) => (
                  <div key={i} className="py-3 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-full p-1.5 mt-0.5 ${ins.obs === 0 ? "bg-emerald-50" : ins.obs === 1 ? "bg-red-50" : "bg-amber-50"}`}>
                        {ins.obs === 0 ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <AlertTriangle className={`h-3.5 w-3.5 ${ins.obs === 1 ? "text-red-600" : "text-amber-600"}`} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{ins.area}</span>
                          <Badge variant="outline" className="text-[10px]">{ins.tipo}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{ins.inspector}</p>
                        <p className="text-xs text-muted-foreground">{ins.resultado}</p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-mono text-muted-foreground">{ins.fecha}</p>
                      <Badge variant={ins.estado === "Cerrada" ? "outline" : ins.estado === "Subsanada" ? "secondary" : "secondary"} className="text-[10px] mt-1">
                        {ins.estado}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Libro SERNAGEOMIN (Art. 17)</CardTitle>
              <CardDescription>Observaciones del libro físico de la faena</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { folio: "F-0147", fecha: "12/05/2026", obs: "Verificar señalética de ruta de evacuación en área de pozas sector norte. Plazo: 30 días.", estado: "Pendiente" },
                  { folio: "F-0146", fecha: "12/05/2026", obs: "Actualizar procedimiento de bloqueo y etiquetado (LOTO) para bomba BP-07.", estado: "Pendiente" },
                  { folio: "F-0145", fecha: "03/03/2026", obs: "Inspección sorpresiva. Sin observaciones.", estado: "Cerrada" },
                ].map(o => (
                  <div key={o.folio} className="rounded-lg border p-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{o.folio}</span>
                        <span className="text-xs text-muted-foreground">{o.fecha}</span>
                      </div>
                      <p className="text-sm mt-0.5">{o.obs}</p>
                    </div>
                    <Badge variant={o.estado === "Cerrada" ? "outline" : "secondary"} className="text-[10px] shrink-0">{o.estado}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HISTORIAL */}
        <TabsContent value="historial" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Accidentabilidad Mensual — E-100 + E-200</CardTitle>
              <CardDescription>Accidentes del trabajador empleadora y contratistas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={accidentHistory} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip formatter={(v) => [v + " accidentes"]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="e100" name="E-100 Empleadora" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="e200" name="E-200 Contratistas" fill="hsl(var(--muted-foreground))" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sanciones SERNAGEOMIN</CardTitle>
              <CardDescription>Multas aplicadas y su estado de pago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {sanctions.map(s => (
                  <div key={s.numero} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{s.numero}</span>
                        <Badge variant="outline" className="text-[10px]">{s.categoria}</Badge>
                      </div>
                      <p className="text-sm mt-0.5">{s.infraccion}</p>
                      <p className="text-xs text-muted-foreground">{s.fecha} · {s.utm} UTM</p>
                    </div>
                    <Badge variant={s.estado === "Pagada" ? "outline" : "secondary"} className="text-[10px] shrink-0 text-emerald-600 border-emerald-200">{s.estado}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Sin sanciones activas. Última sanción pagada en marzo 2025.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
