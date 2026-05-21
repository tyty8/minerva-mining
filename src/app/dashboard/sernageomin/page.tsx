"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, Cell,
} from "recharts";
import {
  CheckCircle2, Clock, AlertTriangle, FileText, Upload,
  Download, Send, Calendar, Shield, HardHat,
  Info, Plus, Users, BookOpen, TrendingUp,
  TrendingDown, AlertCircle, Award, GraduationCap,
} from "lucide-react";

const today = new Date(2026, 4, 21); // May 21 2026
const daysUntil = (month: number, day: number) => {
  const target = new Date(2026, month - 1, day);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
};

// ── Existing data ─────────────────────────────────────────────────────────────

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

// ── Contratistas data ─────────────────────────────────────────────────────────

const contratistas = [
  { empresa: "Transportes Atacama Ltda",      trabajadores: 48,  accidentes: 2, if: 12.4, ig: 62.0, diasSin: 34,  riesgo: "Alto",  accion: "Auditoría pendiente" },
  { empresa: "Servicios Mineros del Norte",   trabajadores: 67,  accidentes: 1, if: 4.4,  ig: 22.2, diasSin: 89,  riesgo: "Medio", accion: "OK" },
  { empresa: "Mantenimiento Industrial Sur",  trabajadores: 43,  accidentes: 0, if: 0.0,  ig: 0.0,  diasSin: 180, riesgo: "Bajo",  accion: "✓ Destacado" },
  { empresa: "Construcciones Atacameñas",     trabajadores: 31,  accidentes: 1, if: 9.6,  ig: 28.8, diasSin: 47,  riesgo: "Medio", accion: "Plan de mejora" },
  { empresa: "Electromecánica Andina",        trabajadores: 28,  accidentes: 0, if: 0.0,  ig: 0.0,  diasSin: 210, riesgo: "Bajo",  accion: "✓ Destacado" },
  { empresa: "Catering y Servicios SA",       trabajadores: 52,  accidentes: 0, if: 0.0,  ig: 0.0,  diasSin: 156, riesgo: "Bajo",  accion: "OK" },
  { empresa: "Logística Desértica Ltda",      trabajadores: 22,  accidentes: 1, if: 13.5, ig: 40.5, diasSin: 21,  riesgo: "Alto",  accion: "Suspensión temporal" },
  { empresa: "Perforaciones del Atacama",     trabajadores: 21,  accidentes: 0, if: 0.0,  ig: 0.0,  diasSin: 95,  riesgo: "Bajo",  accion: "OK" },
];

const riesgoConfig: Record<string, { badge: string; dot: string }> = {
  Alto:  { badge: "bg-red-100 text-red-700 border-red-200",    dot: "bg-red-500" },
  Medio: { badge: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  Bajo:  { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
};

// Near-miss funnel (horizontal BarChart, single-bar)
const nearMissFunnel = [
  { etapa: "Condiciones Inseguras",        valor: 142 },
  { etapa: "Cuasi-accidentes (near-miss)", valor: 38  },
  { etapa: "Accidentes leves",             valor: 7   },
  { etapa: "Accidentes graves",            valor: 1   },
  { etapa: "Accidentes fatales",           valor: 0   },
];

const nearMissTrend = [
  { mes: "Dic'25", reportes: 4 },
  { mes: "Ene'26", reportes: 6 },
  { mes: "Feb'26", reportes: 5 },
  { mes: "Mar'26", reportes: 8 },
  { mes: "Abr'26", reportes: 9 },
  { mes: "May'26", reportes: 6 },
];

// Accidents by area & type (simplified, total = 7)
const accidentesPorArea = [
  { area: "Extracción",        caida: 1, golpe: 1, esfuerzo: 0, contacto: 0, otro: 0 },
  { area: "Transporte",        caida: 0, golpe: 1, esfuerzo: 0, contacto: 1, otro: 0 },
  { area: "Planta",            caida: 0, golpe: 0, esfuerzo: 1, contacto: 0, otro: 0 },
  { area: "Mantención",        caida: 1, golpe: 0, esfuerzo: 0, contacto: 0, otro: 1 },
  { area: "Oficinas/Servicios",caida: 0, golpe: 0, esfuerzo: 0, contacto: 0, otro: 0 },
];

// ── Capacitación data ─────────────────────────────────────────────────────────

const competenciasKPIs = [
  { label: "Certificaciones vigentes",  value: "891 / 1.155", sub: "77% de cobertura", color: "text-amber-600", icon: Award },
  { label: "Vencen en 30 días",         value: "34",          sub: "Requieren renovación urgente", color: "text-red-600",   icon: AlertTriangle },
  { label: "Vencen en 90 días",         value: "87",          sub: "Planificar ahora",  color: "text-amber-600", icon: Clock },
  { label: "Sin certificación",         value: "264",         sub: "Nuevos — en proceso de inducción", color: "text-blue-600",  icon: Users },
];

const matrizCapacitacion = [
  { competencia: "ILO 176 Seguridad Básica",       requeridos: 1155, certificados: 891, vencen30: 34, cumplimiento: 77 },
  { competencia: "Operación de Equipos Pesados",   requeridos: 180,  certificados: 171, vencen30: 8,  cumplimiento: 95 },
  { competencia: "Manejo Sustancias Peligrosas",   requeridos: 340,  certificados: 278, vencen30: 12, cumplimiento: 82 },
  { competencia: "LOTO/Bloqueo y Etiquetado",      requeridos: 420,  certificados: 391, vencen30: 5,  cumplimiento: 93 },
  { competencia: "Primeros Auxilios",              requeridos: 200,  certificados: 136, vencen30: 9,  cumplimiento: 68 },
  { competencia: "Conducción en Faena",            requeridos: 130,  certificados: 117, vencen30: 4,  cumplimiento: 90 },
  { competencia: "Plan de Emergencia",             requeridos: 1155, certificados: 980, vencen30: 21, cumplimiento: 85 },
  { competencia: "Medio Ambiente RCA",             requeridos: 450,  certificados: 306, vencen30: 14, cumplimiento: 68 },
];

const cursosProximos = [
  { fechas: "2–3 jun",  curso: "ILO 176 Básico",                 instructor: "ACHS",                  participantes: 45, tipo: "Obligatorio" },
  { fechas: "10 jun",   curso: "Manejo Sustancias Peligrosas",    instructor: "InHouse",               participantes: 28, tipo: "Obligatorio" },
  { fechas: "18 jun",   curso: "Primeros Auxilios Avanzado",      instructor: "Cruz Roja",             participantes: 20, tipo: "Optativo" },
  { fechas: "1–2 jul",  curso: "Operación Equipos Pesados",       instructor: "Komatsu",              participantes: 15, tipo: "Obligatorio (renovación)" },
  { fechas: "15 jul",   curso: "Medio Ambiente y RCA",            instructor: "Consultora Ambiental", participantes: 60, tipo: "Obligatorio" },
];

const cumplimientoArea = [
  { area: "Seguridad",  pct: 98 },
  { area: "Planta",     pct: 91 },
  { area: "Operaciones",pct: 89 },
  { area: "Mantención", pct: 82 },
  { area: "Transporte", pct: 74 },
  { area: "Admin",      pct: 71 },
];

// ── Historial — IF/IG vs sector data ─────────────────────────────────────────

const ifIgHistory = [
  { mes: "Jun'25", ifEmpresa: 4.2, igEmpresa: 18.4, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Jul'25", ifEmpresa: 3.8, igEmpresa: 12.1, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Ago'25", ifEmpresa: 5.1, igEmpresa: 22.4, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Sep'25", ifEmpresa: 4.6, igEmpresa: 19.8, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Oct'25", ifEmpresa: 3.2, igEmpresa: 14.2, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Nov'25", ifEmpresa: 4.8, igEmpresa: 21.6, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Dic'25", ifEmpresa: 3.6, igEmpresa: 16.8, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Ene'26", ifEmpresa: 5.2, igEmpresa: 23.1, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Feb'26", ifEmpresa: 4.1, igEmpresa: 18.2, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Mar'26", ifEmpresa: 4.7, igEmpresa: 20.4, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "Abr'26", ifEmpresa: 5.4, igEmpresa: 24.1, ifBenchmark: 6.2, igBenchmark: 28.4 },
  { mes: "May'26", ifEmpresa: 4.5, igEmpresa: 19.8, ifBenchmark: 6.2, igBenchmark: 28.4 },
];

const riesgoSancion = [
  { area: "E-100/E-200 puntualidad",            estado: "verde",    nota: "Últimas 8 entregas a tiempo" },
  { area: "E-700 completitud",                   estado: "amarillo", nota: "Q4 2025 faltó firma de ingeniero" },
  { area: "Corrección observaciones libro",       estado: "amarillo", nota: "2 observaciones abiertas >15 días" },
  { area: "Tasa accidentabilidad vs sector",      estado: "verde",    nota: "27% mejor que benchmark Cochilco" },
  { area: "Capacitación ILO 176",                estado: "amarillo", nota: "77% cobertura — mínimo recomendado 85%" },
];

const semaforoConfig: Record<string, { dot: string; text: string; label: string }> = {
  verde:    { dot: "bg-emerald-500", text: "text-emerald-700", label: "Verde" },
  amarillo: { dot: "bg-amber-400",   text: "text-amber-700",   label: "Amarillo" },
  rojo:     { dot: "bg-red-500",     text: "text-red-700",     label: "Rojo" },
};

// ── Component ─────────────────────────────────────────────────────────────────

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
        <TabsList className="grid grid-cols-6 w-full max-w-3xl">
          <TabsTrigger value="formularios">Formularios</TabsTrigger>
          <TabsTrigger value="produccion">Producción</TabsTrigger>
          <TabsTrigger value="contratistas">Contratistas</TabsTrigger>
          <TabsTrigger value="capacitacion">Capacitación</TabsTrigger>
          <TabsTrigger value="fiscalizacion">Fiscalización</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        {/* ── FORMULARIOS ─────────────────────────────────────────────────── */}
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

        {/* ── PRODUCCIÓN ──────────────────────────────────────────────────── */}
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
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
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

        {/* ── CONTRATISTAS ─────────────────────────────────────────────────── */}
        <TabsContent value="contratistas" className="mt-4 space-y-6">

          {/* Ranking de Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Ranking de Seguridad por Contratista
              </CardTitle>
              <CardDescription>312 trabajadores contratistas — indicadores E-200 acumulado 12 meses</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2 pr-3 font-medium text-muted-foreground">Empresa</th>
                    <th className="text-right pb-2 px-3 font-medium text-muted-foreground">Trab.</th>
                    <th className="text-right pb-2 px-3 font-medium text-muted-foreground">Acc. 12m</th>
                    <th className="text-right pb-2 px-3 font-medium text-muted-foreground">IF</th>
                    <th className="text-right pb-2 px-3 font-medium text-muted-foreground">IG</th>
                    <th className="text-right pb-2 px-3 font-medium text-muted-foreground">Días sin acc.</th>
                    <th className="text-center pb-2 px-3 font-medium text-muted-foreground">Riesgo</th>
                    <th className="text-left pb-2 pl-3 font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {contratistas.map((c) => {
                    const rc = riesgoConfig[c.riesgo];
                    return (
                      <tr key={c.empresa} className="hover:bg-muted/30">
                        <td className="py-2.5 pr-3 font-medium">{c.empresa}</td>
                        <td className="py-2.5 px-3 text-right tabular-nums">{c.trabajadores}</td>
                        <td className={`py-2.5 px-3 text-right tabular-nums font-medium ${c.accidentes > 1 ? "text-red-600" : c.accidentes === 1 ? "text-amber-600" : "text-emerald-600"}`}>
                          {c.accidentes}
                        </td>
                        <td className={`py-2.5 px-3 text-right tabular-nums ${c.if > 10 ? "text-red-600 font-semibold" : ""}`}>{c.if.toFixed(1)}</td>
                        <td className={`py-2.5 px-3 text-right tabular-nums ${c.ig > 50 ? "text-red-600 font-semibold" : ""}`}>{c.ig.toFixed(1)}</td>
                        <td className="py-2.5 px-3 text-right tabular-nums">{c.diasSin}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${rc.badge}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${rc.dot}`} />
                            {c.riesgo}
                          </span>
                        </td>
                        <td className="py-2.5 pl-3 text-muted-foreground">{c.accion}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Near-miss funnel + trend */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  Embudo de Cuasi-Accidentes (Near-Miss)
                </CardTitle>
                <CardDescription>Reporte acumulado 12 meses — todos los contratistas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={nearMissFunnel} layout="vertical" margin={{ left: 8, right: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="etapa" tick={{ fontSize: 10 }} width={160} />
                    <Tooltip formatter={(v) => [v + " eventos"]} />
                    <Bar dataKey="valor" name="Eventos" radius={[0, 4, 4, 0]}
                      fill="hsl(var(--primary))"
                      label={{ position: "right", fontSize: 11, formatter: (v: unknown) => Number(v) > 0 ? Number(v) : "" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-800">
                  <strong>Ratio near-miss/accidente: 5.4:1.</strong> Benchmark industria minera Chile: 8:1. Mejorar cultura de reporte.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  Tendencia Near-Miss — Últimos 6 meses
                </CardTitle>
                <CardDescription>Mayor reporte = mejor cultura de seguridad</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={nearMissTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip formatter={(v) => [v + " reportes"]} />
                    <Line
                      type="monotone"
                      dataKey="reportes"
                      name="Near-miss reportados"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Tendencia alcista positiva — indica mejora en cultura de reporte
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Accidentes por tipo y área */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                Distribución de Accidentes por Tipo y Área
              </CardTitle>
              <CardDescription>7 accidentes totales registrados en los últimos 12 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={accidentesPorArea} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted" />
                  <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="area" tick={{ fontSize: 11 }} width={130} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="caida"    name="Caída mismo nivel"   stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="golpe"    name="Golpe por objeto"    stackId="a" fill="#f59e0b" />
                  <Bar dataKey="esfuerzo" name="Esfuerzo excesivo"   stackId="a" fill="#8b5cf6" />
                  <Bar dataKey="contacto" name="Contacto sustancia"  stackId="a" fill="#ef4444" />
                  <Bar dataKey="otro"     name="Otro"                stackId="a" fill="#6b7280" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── CAPACITACIÓN ────────────────────────────────────────────────── */}
        <TabsContent value="capacitacion" className="mt-4 space-y-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {competenciasKPIs.map(kpi => (
              <Card key={kpi.label}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">{kpi.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{kpi.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Matriz de Capacitación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                Matriz de Capacitación — Estado de Competencias ILO 176
              </CardTitle>
              <CardDescription>Cobertura por tipo de competencia obligatoria</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2 pr-4 font-medium text-muted-foreground">Competencia</th>
                    <th className="text-right pb-2 px-3 font-medium text-muted-foreground">Requeridos</th>
                    <th className="text-right pb-2 px-3 font-medium text-muted-foreground">Certificados</th>
                    <th className="text-right pb-2 px-3 font-medium text-muted-foreground">Vencen 30d</th>
                    <th className="text-right pb-2 pl-3 font-medium text-muted-foreground">Cumplimiento</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {matrizCapacitacion.map((row) => {
                    const pct = row.cumplimiento;
                    const pctColor = pct >= 90 ? "text-emerald-600" : pct >= 80 ? "text-amber-600" : "text-red-600";
                    return (
                      <tr key={row.competencia} className="hover:bg-muted/30">
                        <td className="py-2.5 pr-4 font-medium">{row.competencia}</td>
                        <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">{row.requeridos.toLocaleString("es-CL")}</td>
                        <td className="py-2.5 px-3 text-right tabular-nums">{row.certificados.toLocaleString("es-CL")}</td>
                        <td className={`py-2.5 px-3 text-right tabular-nums ${row.vencen30 > 10 ? "text-amber-600 font-semibold" : ""}`}>{row.vencen30}</td>
                        <td className="py-2.5 pl-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Progress value={pct} className="h-1.5 w-16" />
                            <span className={`tabular-nums font-semibold ${pctColor}`}>{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Cursos próximos + Cumplimiento por área */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Cronograma de Cursos Próximos
                </CardTitle>
                <CardDescription>Junio – Julio 2026</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {cursosProximos.map((curso) => {
                    const isObl = curso.tipo.startsWith("Obligatorio");
                    return (
                      <div key={curso.curso} className="py-2.5 flex items-start gap-3">
                        <div className="shrink-0 rounded bg-muted px-2 py-1 text-center min-w-[56px]">
                          <p className="text-[10px] font-mono text-muted-foreground leading-tight">{curso.fechas}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{curso.curso}</p>
                          <p className="text-xs text-muted-foreground">{curso.instructor} · {curso.participantes} participantes</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[10px] shrink-0 ${isObl ? "border-blue-200 bg-blue-50 text-blue-700" : "border-muted text-muted-foreground"}`}
                        >
                          {curso.tipo}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  Tasa de Cumplimiento por Área
                </CardTitle>
                <CardDescription>Porcentaje de trabajadores con competencias ILO 176 vigentes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={cumplimientoArea} layout="vertical" margin={{ left: 8, right: 32 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted" />
                    <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                    <YAxis type="category" dataKey="area" tick={{ fontSize: 11 }} width={80} />
                    <Tooltip formatter={(v) => [`${v}%`, "Cumplimiento"]} />
                    <ReferenceLine x={85} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Mín. 85%", fontSize: 10, fill: "#92400e", position: "top" }} />
                    <Bar dataKey="pct" name="Cumplimiento" radius={[0, 4, 4, 0]}
                      label={{ position: "right", fontSize: 11, formatter: (v: unknown) => `${v}%` }}
                    >
                      {cumplimientoArea.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.pct >= 90 ? "#10b981" : entry.pct >= 80 ? "#f59e0b" : "#ef4444"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── FISCALIZACIÓN ────────────────────────────────────────────────── */}
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
                      <Badge variant={ins.estado === "Cerrada" ? "outline" : "secondary"} className="text-[10px] mt-1">
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

        {/* ── HISTORIAL ───────────────────────────────────────────────────── */}
        <TabsContent value="historial" className="mt-4 space-y-4">

          {/* IF/IG vs Sector — NEW section at top */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                IF / IG vs. Sector Minero — Últimos 12 meses
              </CardTitle>
              <CardDescription>
                Comparación con benchmark Cochilco gran minería 2025 (IF: 6.2 · IG: 28.4)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Summary card */}
              <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-xs text-emerald-800">
                  <p className="font-semibold">IF promedio 12m: 4.5 — 27% mejor que benchmark Cochilco (6.2)</p>
                  <p className="mt-0.5">IG promedio 12m: 19.3 — 32% mejor que benchmark Cochilco (28.4)</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={ifIgHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} interval={1} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="ifEmpresa"   name="IF Empresa"          stroke="#3b82f6" strokeWidth={2}   dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="ifBenchmark" name="IF Benchmark Cochilco" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
                  <Line type="monotone" dataKey="igEmpresa"   name="IG Empresa"          stroke="#f59e0b" strokeWidth={2}   dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="igBenchmark" name="IG Benchmark Cochilco" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-muted-foreground text-right mt-1">
                Fuente: Cochilco — Estadísticas de Accidentabilidad Gran Minería 2025
              </p>
            </CardContent>
          </Card>

          {/* Evaluación de Riesgo de Sanción */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                Evaluación de Riesgo de Sanción
              </CardTitle>
              <CardDescription>
                Análisis de 5 factores de riesgo regulatorio — Resultado: <strong className="text-amber-700">Medio-Bajo (2/5 áreas en amarillo)</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {riesgoSancion.map((r) => {
                  const sc = semaforoConfig[r.estado];
                  return (
                    <div key={r.area} className="rounded-lg border p-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full shrink-0 ${sc.dot}`} />
                        <div>
                          <p className="text-sm font-medium">{r.area}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{r.nota}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] shrink-0 ${
                          r.estado === "verde" ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                          r.estado === "amarillo" ? "border-amber-200 bg-amber-50 text-amber-700" :
                          "border-red-200 bg-red-50 text-red-700"
                        }`}
                      >
                        {sc.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-2.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800">
                  <strong>Riesgo global: Medio-Bajo.</strong> Priorizar cierre de observaciones del libro de faena y aumentar cobertura ILO 176 al 85% antes del próximo ciclo de fiscalización.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Existing accident history chart */}
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

          {/* Existing sanctions table */}
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
                <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Sin sanciones activas. Última sanción pagada en marzo 2025.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
