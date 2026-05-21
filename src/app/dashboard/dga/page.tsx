"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine, ZAxis,
} from "recharts";
import {
  Droplets, AlertTriangle, CheckCircle2, Clock, Download,
  Send, Shield, FileText, Info, Bell, TrendingDown, DollarSign,
  FlaskConical, Waves, Calculator,
} from "lucide-react";

// ── Demo data ──────────────────────────────────────────────────────────────

const dailyExtraction = Array.from({ length: 30 }, (_, i) => {
  const base = 820 + Math.sin(i * 0.4) * 35 + (Math.random() - 0.5) * 25;
  const fw = 195 + Math.sin(i * 0.3) * 15 + (Math.random() - 0.5) * 10;
  return { dia: `${i + 1}/05`, salmuera: Math.round(base), aguaDulce: Math.round(fw) };
});

const monthlyMEE = [
  { mes: "Jun'25", salmuera: 824, aguaDulce: 191 }, { mes: "Jul'25", salmuera: 841, aguaDulce: 198 },
  { mes: "Ago'25", salmuera: 858, aguaDulce: 203 }, { mes: "Sep'25", salmuera: 812, aguaDulce: 187 },
  { mes: "Oct'25", salmuera: 796, aguaDulce: 182 }, { mes: "Nov'25", salmuera: 809, aguaDulce: 190 },
  { mes: "Dic'25", salmuera: 833, aguaDulce: 196 }, { mes: "Ene'26", salmuera: 851, aguaDulce: 201 },
  { mes: "Feb'26", salmuera: 839, aguaDulce: 194 }, { mes: "Mar'26", salmuera: 818, aguaDulce: 188 },
  { mes: "Abr'26", salmuera: 827, aguaDulce: 192 }, { mes: "May'26", salmuera: 821, aguaDulce: 193 },
];

const monthlyVolume = monthlyMEE.map(m => ({
  mes: m.mes,
  salmuera: Math.round(m.salmuera * 86400 * 30.4 / 1000),   // thousand m³/month
  aguaDulce: Math.round(m.aguaDulce * 86400 * 30.4 / 1000),
}));

const pozoData = [
  { id: "P-04", nombre: "Pozo centinela norte", nivelActual: -31.4, nivelBase: -29.8, umbralPAT: -32.0, estado: "normal", tendencia: -0.133 },
  { id: "P-07", nombre: "Pozo centinela sur", nivelActual: -30.1, nivelBase: -29.2, umbralPAT: -32.0, estado: "normal", tendencia: -0.083 },
  { id: "P-12", nombre: "Pozo margen este", nivelActual: -31.8, nivelBase: -29.5, umbralPAT: -32.0, estado: "alerta", tendencia: -0.192 },
  { id: "P-19", nombre: "Pozo margen oeste", nivelActual: -29.3, nivelBase: -28.9, umbralPAT: -32.0, estado: "normal", tendencia: -0.033 },
];

const piezoHistory = [
  { mes: "Jun'25", p04: -29.8, p07: -29.1, p12: -29.5, p19: -29.0 },
  { mes: "Jul'25", p04: -30.0, p07: -29.3, p12: -29.8, p19: -29.1 },
  { mes: "Ago'25", p04: -30.3, p07: -29.5, p12: -30.1, p19: -29.2 },
  { mes: "Sep'25", p04: -30.1, p07: -29.2, p12: -30.0, p19: -29.0 },
  { mes: "Oct'25", p04: -30.5, p07: -29.6, p12: -30.4, p19: -29.3 },
  { mes: "Nov'25", p04: -30.8, p07: -29.9, p12: -30.8, p19: -29.4 },
  { mes: "Dic'25", p04: -31.0, p07: -30.1, p12: -31.0, p19: -29.5 },
  { mes: "Ene'26", p04: -31.1, p07: -30.0, p12: -31.2, p19: -29.4 },
  { mes: "Feb'26", p04: -30.9, p07: -29.8, p12: -31.5, p19: -29.3 },
  { mes: "Mar'26", p04: -31.2, p07: -30.0, p12: -31.6, p19: -29.3 },
  { mes: "Abr'26", p04: -31.3, p07: -30.0, p12: -31.7, p19: -29.2 },
  { mes: "May'26", p04: -31.4, p07: -30.1, p12: -31.8, p19: -29.3 },
];

// P-12 6-month projection
const patForecast = [
  { mes: "May'26", nivel: -31.8, proyectado: null },
  { mes: "Jun'26", nivel: null, proyectado: -32.0 },
  { mes: "Jul'26", nivel: null, proyectado: -32.19 },
  { mes: "Ago'26", nivel: null, proyectado: -32.38 },
  { mes: "Sep'26", nivel: null, proyectado: -32.57 },
  { mes: "Oct'26", nivel: null, proyectado: -32.77 },
];

// Correlation extraction vs piezometry (monthly pairs)
const correlacionData = [
  { x: 796, y: -30.5 }, { x: 809, y: -30.8 }, { x: 824, y: -30.0 }, { x: 833, y: -31.0 },
  { x: 839, y: -31.5 }, { x: 841, y: -31.2 }, { x: 851, y: -31.1 }, { x: 858, y: -30.3 },
  { x: 812, y: -30.0 }, { x: 818, y: -31.6 }, { x: 827, y: -31.7 }, { x: 821, y: -31.8 },
];

// Precipitation (Atacama — very dry)
const precipitacion = [
  { mes: "Jun'25", precip: 0 }, { mes: "Jul'25", precip: 2.1 }, { mes: "Ago'25", precip: 0 },
  { mes: "Sep'25", precip: 0.4 }, { mes: "Oct'25", precip: 0 }, { mes: "Nov'25", precip: 0 },
  { mes: "Dic'25", precip: 1.2 }, { mes: "Ene'26", precip: 3.8 }, { mes: "Feb'26", precip: 0 },
  { mes: "Mar'26", precip: 0 }, { mes: "Abr'26", precip: 0.6 }, { mes: "May'26", precip: 0 },
];

// PAT historical events
const patEventos = [
  { fecha: "Mar 2024", pozo: "P-08", nivel: -32.1, reduccion: "12%", recuperacion: "45 días", estado: "Cerrado" },
  { fecha: "Nov 2023", pozo: "P-12", nivel: -32.0, reduccion: "8%", recuperacion: "28 días", estado: "Cerrado" },
  { fecha: "Jun 2022", pozo: "P-04", nivel: -32.2, reduccion: "15%", recuperacion: "62 días", estado: "Cerrado" },
];

// Evaporation ponds
const pozasEvap = [
  { id: "PEV-01", ingreso: 68400, evaporacion: 61200, seepage: 1.8, nivel: 78, estado: "Normal" },
  { id: "PEV-02", ingreso: 72000, evaporacion: 63800, seepage: 2.1, nivel: 82, estado: "Normal" },
  { id: "PEV-03", ingreso: 55200, evaporacion: 51400, seepage: 3.4, nivel: 71, estado: "Vigilancia" },
  { id: "PEV-04", ingreso: 48600, evaporacion: 46100, seepage: 1.2, nivel: 65, estado: "Normal" },
];

// Brine chemistry
const brineChemistryHistory = [
  { mes: "Jun'25", Li: 1820, K: 8100, Mg: 1020, B: 410 },
  { mes: "Jul'25", Li: 1835, K: 8180, Mg: 1035, B: 415 },
  { mes: "Ago'25", Li: 1848, K: 8220, Mg: 1048, B: 420 },
  { mes: "Sep'25", Li: 1830, K: 8150, Mg: 1025, B: 412 },
  { mes: "Oct'25", Li: 1855, K: 8240, Mg: 1058, B: 422 },
  { mes: "Nov'25", Li: 1842, K: 8200, Mg: 1042, B: 418 },
  { mes: "Dic'25", Li: 1858, K: 8260, Mg: 1065, B: 425 },
  { mes: "Ene'26", Li: 1845, K: 8190, Mg: 1040, B: 415 },
  { mes: "Feb'26", Li: 1850, K: 8210, Mg: 1055, B: 420 },
  { mes: "Mar'26", Li: 1838, K: 8175, Mg: 1038, B: 412 },
  { mes: "Abr'26", Li: 1847, K: 8210, Mg: 1062, B: 418 },
  { mes: "May'26", Li: 1847, K: 8210, Mg: 1062, B: 418 },
];

const pozosProd = [
  { id: "PP-01", Li: 1832, K: 8150, Mg: 1041, ratio: 1.76, densidad: 1.231, caudal: 142, estado: "Normal" },
  { id: "PP-02", Li: 1818, K: 8080, Mg: 1028, ratio: 1.77, densidad: 1.228, caudal: 138, estado: "Normal" },
  { id: "PP-03", Li: 1924, K: 8450, Mg: 1098, ratio: 1.75, densidad: 1.248, caudal: 96, estado: "Destacado" },
  { id: "PP-04", Li: 1802, K: 8010, Mg: 1015, ratio: 1.78, densidad: 1.225, caudal: 124, estado: "Normal" },
  { id: "PP-05", Li: 1741, K: 7820, Mg: 980, ratio: 1.78, densidad: 1.218, caudal: 187, estado: "Bajo" },
  { id: "PP-06", Li: 1865, K: 8280, Mg: 1068, ratio: 1.75, densidad: 1.239, caudal: 134, estado: "Normal" },
];

const liRecovery = [
  { mes: "Jun'25", efic: 90.2 }, { mes: "Jul'25", efic: 91.4 }, { mes: "Ago'25", efic: 89.8 },
  { mes: "Sep'25", efic: 92.1 }, { mes: "Oct'25", efic: 90.6 }, { mes: "Nov'25", efic: 91.8 },
  { mes: "Dic'25", efic: 88.4 }, { mes: "Ene'26", efic: 91.2 }, { mes: "Feb'26", efic: 92.4 },
  { mes: "Mar'26", efic: 90.9 }, { mes: "Abr'26", efic: 91.5 }, { mes: "May'26", efic: 91.8 },
];

const costosHidricos = [
  { fuente: "Salmuera (extracción)", costo: 0.08, volumenYTD: 10712, color: "#3b82f6" },
  { fuente: "Agua dulce (pozos)", costo: 0.42, volumenYTD: 2520, color: "#0d9488" },
  { fuente: "Agua reciclada", costo: 0.18, volumenYTD: 1200, color: "#8b5cf6" },
  { fuente: "Aljibe emergencia", costo: 8.50, volumenYTD: 0, color: "#ef4444" },
];

const waterRights = [
  { codigo: "DAA-001", tipo: "Consuntivo / Subterráneo", descripcion: "Agua dulce — Pozos W-01 a W-05", caudal: "240 L/s", modalidad: "Permanente / Continuo", estado: "Vigente", inscripcion: "CBR Tocopilla — 2019" },
  { codigo: "DAA-002", tipo: "Consuntivo / Subterráneo", descripcion: "Agua dulce — Pozo emergencia W-06", caudal: "30 L/s", modalidad: "Eventual / Discontinuo", estado: "Vigente", inscripcion: "CBR Tocopilla — 2021" },
  { codigo: "RCA-226", tipo: "Salmuera (RCA)", descripcion: "Extracción salmuera — Sector MOP", caudal: "900 L/s", modalidad: "Operacional / RCA N°226", estado: "Vigente", inscripcion: "SEA — Mod. 47/2024" },
  { codigo: "RCA-226B", tipo: "Salmuera (RCA)", descripcion: "Extracción salmuera — Sector SOP", caudal: "600 L/s", modalidad: "Operacional / RCA N°226", estado: "Vigente", inscripcion: "SEA — Mod. 47/2024" },
];

const meeReports = [
  { periodo: "Abril 2026", archivo: "MEE_SQM_Abr2026.xml", estado: "Transmitido", fecha: "01/05/2026", volumen: "23.472 m³" },
  { periodo: "Marzo 2026", archivo: "MEE_SQM_Mar2026.xml", estado: "Transmitido", fecha: "01/04/2026", volumen: "24.813 m³" },
  { periodo: "Febrero 2026", archivo: "MEE_SQM_Feb2026.xml", estado: "Transmitido", fecha: "01/03/2026", volumen: "21.190 m³" },
  { periodo: "Enero 2026", archivo: "MEE_SQM_Ene2026.xml", estado: "Transmitido", fecha: "01/02/2026", volumen: "24.001 m³" },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function GaugeCard({ label, value, limit, unit, warning }: {
  label: string; value: number; limit: number; unit: string; warning: number;
}) {
  const pct = Math.min((value / limit) * 100, 100);
  const isCrit = pct >= 95;
  const isWarn = pct >= warning;
  return (
    <Card className={isCrit ? "border-red-300" : isWarn ? "border-amber-300" : ""}>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          {isCrit ? <AlertTriangle className="h-4 w-4 text-red-500" /> : isWarn ? <AlertTriangle className="h-4 w-4 text-amber-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-bold ${isCrit ? "text-red-600" : isWarn ? "text-amber-600" : ""}`}>{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>0</span>
            <span className={isWarn ? "font-bold text-amber-600" : ""}>{Math.round(pct)}%</span>
            <span>Límite: {limit} {unit}</span>
          </div>
          <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${isCrit ? "bg-red-500" : isWarn ? "bg-amber-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} />
            <div className="absolute top-0 h-full border-l-2 border-amber-400 border-dashed" style={{ left: `${warning}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground">⚠ Alerta PAT a {warning}% · Límite RCA: {limit} {unit}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function DgaPage() {
  const currentSalmuera = 821;
  const currentFreshwater = 193;

  // P-12 forecast: 0.2m remaining / 0.192m per month * 30 days = 31 days
  const p12DaysToTrigger = 31;
  const alertPozo = pozoData.find(p => p.estado === "alerta");

  // Annual budget (authorized L/s * 86400 s * 365 d / 1000 = thousand m³/year)
  const salmueraAuthorizedYTD = Math.round(900 * 86400 * 141 / 1000);  // 141 days Jan-May
  const salmueraConsumedYTD   = Math.round(821 * 86400 * 141 / 1000);
  const fwAuthorizedYTD       = Math.round(240 * 86400 * 141 / 1000);
  const fwConsumedYTD         = Math.round(193 * 86400 * 141 / 1000);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">DGA — Gestión Hídrica</h1>
          <p className="text-muted-foreground text-sm mt-1">Extracciones MEE, Plan de Alerta Temprana, Química de Brine y Presupuesto Hídrico</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Exportar MEE</Button>
          <Button size="sm" className="gap-2"><Send className="h-4 w-4" />Transmitir a DGA</Button>
        </div>
      </div>

      {alertPozo && (
        <Alert className="border-red-300 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 text-sm">
            <strong>⚠ PAT — P-12 alcanzará umbral en ~{p12DaysToTrigger} días</strong> al ritmo actual de descenso (−0.192 m/mes).
            Nivel actual: −31.8 m · Umbral: −32.0 m · Margen: 0.2 m. Evaluar reducción inmediata en sector margen este.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <GaugeCard label="Extracción Salmuera — Promedio hoy" value={currentSalmuera} limit={900} unit="L/s" warning={88} />
        <GaugeCard label="Extracción Agua Dulce — Promedio hoy" value={currentFreshwater} limit={240} unit="L/s" warning={88} />
      </div>

      <Tabs defaultValue="extracciones">
        <TabsList className="grid grid-cols-6 w-full max-w-3xl">
          <TabsTrigger value="extracciones">Extracciones</TabsTrigger>
          <TabsTrigger value="pat">PAT</TabsTrigger>
          <TabsTrigger value="presupuesto">Presupuesto</TabsTrigger>
          <TabsTrigger value="quimica">Química Brine</TabsTrigger>
          <TabsTrigger value="derechos">Derechos</TabsTrigger>
          <TabsTrigger value="mee">MEE</TabsTrigger>
        </TabsList>

        {/* ── EXTRACCIONES ── */}
        <TabsContent value="extracciones" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Extracción Diaria — Mayo 2026 (L/s promedio diario)</CardTitle>
              <CardDescription>Datos MEE · Líneas de límite RCA en rojo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={dailyExtraction}>
                  <defs>
                    <linearGradient id="salGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fwGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="dia" tick={{ fontSize: 10 }} interval={4} />
                  <YAxis yAxisId="sal" domain={[700, 1000]} tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="fw" orientation="right" domain={[150, 260]} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v, n) => [Number(v).toFixed(0) + " L/s", n === "salmuera" ? "Salmuera" : "Agua dulce"]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <ReferenceLine yAxisId="sal" y={900} stroke="#ef4444" strokeDasharray="4 2" label={{ value: "Límite 900", fontSize: 9, fill: "#ef4444", position: "right" }} />
                  <ReferenceLine yAxisId="fw" y={240} stroke="#f97316" strokeDasharray="4 2" label={{ value: "Límite 240", fontSize: 9, fill: "#f97316", position: "right" }} />
                  <Area yAxisId="sal" type="monotone" dataKey="salmuera" name="Salmuera" stroke="hsl(var(--primary))" fill="url(#salGrad)" strokeWidth={1.5} dot={false} />
                  <Area yAxisId="fw" type="monotone" dataKey="aguaDulce" name="Agua dulce" stroke="#0d9488" fill="url(#fwGrad)" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Correlación Extracción → Nivel P-12</CardTitle>
                <CardDescription>Cada 10 L/s adicional correlaciona con −0.08 m en P-12 (R²=0.71)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="x" name="Salmuera" unit=" L/s" tick={{ fontSize: 10 }} domain={[780, 870]} label={{ value: "Extracción (L/s)", position: "insideBottom", offset: -2, fontSize: 10 }} />
                    <YAxis dataKey="y" name="Nivel P-12" unit=" m" tick={{ fontSize: 10 }} domain={[-32.5, -29.5]} reversed label={{ value: "Nivel P-12 (m)", angle: -90, position: "insideLeft", fontSize: 10 }} />
                    <ZAxis range={[40, 40]} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(v, n) => [Number(v).toFixed(1) + (n === "Salmuera" ? " L/s" : " m"), n]} />
                    <ReferenceLine y={-32.0} stroke="#ef4444" strokeDasharray="4 2" label={{ value: "PAT −32.0m", fontSize: 9, fill: "#ef4444", position: "insideTopLeft" }} />
                    <Scatter data={correlacionData} fill="hsl(var(--primary))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Precipitación en Cuenca — 12 meses (mm)</CardTitle>
                <CardDescription>Recarga natural estimada: 12–18 mm/año (DGA Circular N°3). Insuficiente para compensar extracción.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={precipitacion}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} unit=" mm" />
                    <Tooltip formatter={(v) => [Number(v).toFixed(1) + " mm", "Precipitación"]} />
                    <Bar dataKey="precip" name="Precipitación" fill="#60a5fa" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Total 12 meses: 8.1 mm — muy por debajo del umbral de recarga significativa (50 mm)
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Extracción Promedio Mensual (L/s) — 12 meses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={monthlyMEE} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v) => [Number(v).toFixed(0) + " L/s"]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <ReferenceLine y={900} stroke="#ef4444" strokeDasharray="3 2" label={{ value: "900 L/s", fontSize: 9, fill: "#ef4444" }} />
                  <Bar dataKey="salmuera" name="Salmuera" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="aguaDulce" name="Agua dulce" fill="#0d9488" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── PAT ── */}
        <TabsContent value="pat" className="mt-4 space-y-4">
          {/* Forecast cards */}
          <div className="grid gap-4 md:grid-cols-4">
            {pozoData.map(p => {
              const margen = Math.abs(p.umbralPAT - p.nivelActual);
              const diasProyectados = p.tendencia < 0 ? Math.round(margen / Math.abs(p.tendencia) * 30) : 9999;
              const isAlert = p.estado === "alerta";
              return (
                <Card key={p.id} className={isAlert ? "border-red-400" : ""}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono font-bold">{p.id}</span>
                      {isAlert ? <AlertTriangle className="h-4 w-4 text-red-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    </div>
                    <p className={`text-3xl font-bold ${isAlert ? "text-red-600" : "text-emerald-600"}`}>
                      {diasProyectados > 999 ? "∞" : diasProyectados}
                    </p>
                    <p className="text-xs text-muted-foreground">{diasProyectados > 999 ? "días — Sin riesgo" : "días hasta PAT"}</p>
                    <p className="text-xs text-muted-foreground mt-1">Margen: {margen.toFixed(1)} m · Tendencia: {p.tendencia.toFixed(3)} m/mes</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="border-red-300">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2 text-red-700">
                <TrendingDown className="h-4 w-4" />
                Proyección PAT — Pozo P-12 (próximos 6 meses)
              </CardTitle>
              <CardDescription>Al ritmo actual de −0.192 m/mes, P-12 alcanzará el umbral de −32.0 m en ~31 días (≈ Junio 2026)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={patForecast}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                  <YAxis domain={[-33, -31.5]} reversed tick={{ fontSize: 10 }} tickFormatter={v => `${v} m`} />
                  <Tooltip formatter={(v) => [Number(v).toFixed(2) + " m"]} />
                  <ReferenceLine y={-32.0} stroke="#ef4444" strokeDasharray="4 2" label={{ value: "Umbral PAT −32.0 m", fontSize: 10, fill: "#ef4444", position: "insideTopLeft" }} />
                  <Line type="monotone" dataKey="nivel" name="Nivel real" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 5 }} connectNulls={false} />
                  <Line type="monotone" dataKey="proyectado" name="Proyección" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 3" dot={false} connectNulls={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Historia Piezométrica — 4 Pozos Centinela (12 meses)</CardTitle>
              <CardDescription>Valores más negativos = mayor profundidad. Línea roja = umbral PAT (−32.0 m)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={piezoHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                  <YAxis domain={[-33, -28]} tick={{ fontSize: 10 }} tickFormatter={v => `${v} m`} reversed />
                  <Tooltip formatter={(v) => [Number(v).toFixed(1) + " m"]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <ReferenceLine y={-32} stroke="#ef4444" strokeDasharray="4 2" label={{ value: "Umbral PAT", fontSize: 9, fill: "#ef4444", position: "insideTopLeft" }} />
                  <Line type="monotone" dataKey="p04" name="P-04" stroke="hsl(var(--primary))" dot={false} strokeWidth={1.5} />
                  <Line type="monotone" dataKey="p07" name="P-07" stroke="#0d9488" dot={false} strokeWidth={1.5} />
                  <Line type="monotone" dataKey="p12" name="P-12 ⚠" stroke="#ef4444" dot={false} strokeWidth={2} />
                  <Line type="monotone" dataKey="p19" name="P-19" stroke="#8b5cf6" dot={false} strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Eventos PAT Históricos</CardTitle>
              <CardDescription>Tiempo promedio de recuperación post-PAT: 45 días · Reducción promedio requerida: 11.7%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {patEventos.map(e => (
                  <div key={e.fecha} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-amber-50 border border-amber-200 p-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{e.fecha}</span>
                          <Badge variant="outline" className="text-[10px]">{e.pozo}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Nivel: {e.nivel} m · Reducción extracción: {e.reduccion} · Recuperación: {e.recuperacion}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-200">{e.estado}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { label: "Eventos históricos", value: "3" },
                  { label: "Recuperación promedio", value: "45 días" },
                  { label: "Reducción promedio", value: "11.7%" },
                ].map(s => (
                  <div key={s.label} className="rounded-lg bg-muted/50 p-2.5 text-center">
                    <p className="text-lg font-bold">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── PRESUPUESTO HÍDRICO ── */}
        <TabsContent value="presupuesto" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                label: "Presupuesto Salmuera 2026", authorized: 28382, consumedYTD: salmueraConsumedYTD,
                projectedFull: Math.round(821 * 86400 * 365 / 1000), unit: "miles m³/año",
              },
              {
                label: "Presupuesto Agua Dulce 2026", authorized: 7571, consumedYTD: fwConsumedYTD,
                projectedFull: Math.round(193 * 86400 * 365 / 1000), unit: "miles m³/año",
              },
            ].map(b => {
              const pctYTD = Math.round(b.consumedYTD / b.authorized * 100);
              const pctProj = Math.round(b.projectedFull / b.authorized * 100);
              return (
                <Card key={b.label}>
                  <CardHeader><CardTitle className="text-sm">{b.label}</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-lg bg-muted/50 p-2">
                        <p className="text-sm font-bold">{b.authorized.toLocaleString("es-CL")}</p>
                        <p className="text-[10px] text-muted-foreground">Autorizado/año</p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-2">
                        <p className="text-sm font-bold text-blue-700">{b.consumedYTD.toLocaleString("es-CL")}</p>
                        <p className="text-[10px] text-muted-foreground">Consumido YTD</p>
                      </div>
                      <div className={`rounded-lg p-2 ${pctProj > 95 ? "bg-red-50" : pctProj > 85 ? "bg-amber-50" : "bg-emerald-50"}`}>
                        <p className={`text-sm font-bold ${pctProj > 95 ? "text-red-700" : pctProj > 85 ? "text-amber-700" : "text-emerald-700"}`}>{b.projectedFull.toLocaleString("es-CL")}</p>
                        <p className="text-[10px] text-muted-foreground">Proyectado año</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>YTD consumido</span><span className="font-medium">{pctYTD}%</span>
                      </div>
                      <Progress value={pctYTD} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Proyección año completo</span><span className={`font-medium ${pctProj > 90 ? "text-amber-600" : "text-emerald-600"}`}>{pctProj}% del límite</span>
                      </div>
                      <Progress value={pctProj} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Volumen Mensual Consumido (miles m³/mes)</CardTitle>
              <CardDescription>Línea de referencia = presupuesto mensual autorizado</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyVolume} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}k`} />
                  <Tooltip formatter={(v) => [Number(v).toLocaleString("es-CL") + " mil m³"]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <ReferenceLine y={2365} stroke="#ef4444" strokeDasharray="3 2" label={{ value: "Presup. sal. /mes", fontSize: 9, fill: "#ef4444" }} />
                  <Bar dataKey="salmuera" name="Salmuera" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="aguaDulce" name="Agua dulce" fill="#0d9488" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Balance Pozas de Evaporación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      {["Poza", "Ingreso brine", "Evaporación", "Seepage (L/s)", "Nivel", "Estado"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {pozasEvap.map(p => (
                      <tr key={p.id} className={p.estado === "Vigilancia" ? "bg-amber-50" : ""}>
                        <td className="px-3 py-2.5 font-mono font-bold">{p.id}</td>
                        <td className="px-3 py-2.5">{p.ingreso.toLocaleString("es-CL")} m³/día</td>
                        <td className="px-3 py-2.5">{p.evaporacion.toLocaleString("es-CL")} m³/día</td>
                        <td className="px-3 py-2.5">
                          <span className={p.seepage > 3 ? "text-amber-600 font-medium" : ""}>{p.seepage}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${p.nivel}%` }} />
                            </div>
                            <span>{p.nivel}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <Badge variant={p.estado === "Vigilancia" ? "secondary" : "outline"} className={`text-[10px] ${p.estado === "Vigilancia" ? "bg-amber-100 text-amber-700 border-amber-300" : "text-emerald-600 border-emerald-300"}`}>
                            {p.estado}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2"><DollarSign className="h-4 w-4" />Análisis de Costo Hídrico YTD 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      {["Fuente", "Costo/m³", "Volumen YTD (mil m³)", "Costo YTD (USD)", "% del total"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {costosHidricos.map(c => {
                      const costoTotal = c.costo * c.volumenYTD * 1000;
                      const totalCost = costosHidricos.reduce((a, x) => a + x.costo * x.volumenYTD * 1000, 0);
                      return (
                        <tr key={c.fuente}>
                          <td className="px-3 py-2.5 font-medium">{c.fuente}</td>
                          <td className="px-3 py-2.5 font-mono">${c.costo.toFixed(2)}</td>
                          <td className="px-3 py-2.5">{c.volumenYTD.toLocaleString("es-CL")}</td>
                          <td className="px-3 py-2.5 font-mono">${costoTotal.toLocaleString("es-CL", { maximumFractionDigits: 0 })}</td>
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-muted rounded-full h-1.5">
                                <div className="h-1.5 rounded-full" style={{ width: `${totalCost > 0 ? costoTotal / totalCost * 100 : 0}%`, backgroundColor: c.color }} />
                              </div>
                              <span>{totalCost > 0 ? Math.round(costoTotal / totalCost * 100) : 0}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t bg-muted/50 font-semibold">
                      <td className="px-3 py-2.5" colSpan={3}>Total costo hídrico YTD</td>
                      <td className="px-3 py-2.5 font-mono">
                        ${Math.round(costosHidricos.reduce((a, c) => a + c.costo * c.volumenYTD * 1000, 0)).toLocaleString("es-CL")}
                      </td>
                      <td className="px-3 py-2.5">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── QUÍMICA DE BRINE ── */}
        <TabsContent value="quimica" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { ion: "Li", valor: 1847, unidad: "mg/L", spec: "> 1,500 mg/L", ok: true, color: "text-blue-600" },
              { ion: "K", valor: 8210, unidad: "mg/L", spec: "Referencia", ok: true, color: "text-teal-600" },
              { ion: "Mg", valor: 1062, unidad: "mg/L", spec: "Ratio Li/Mg: 1.74", ok: true, color: "text-purple-600" },
              { ion: "B", valor: 418, unidad: "mg/L", spec: "Referencia", ok: true, color: "text-orange-600" },
            ].map(k => (
              <Card key={k.ion}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="rounded-full bg-muted w-7 h-7 flex items-center justify-center">
                      <span className="text-xs font-bold">{k.ion}</span>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <p className={`text-2xl font-bold ${k.color}`}>{k.valor.toLocaleString("es-CL")}</p>
                  <p className="text-xs text-muted-foreground">{k.unidad}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{k.spec}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Concentraciones en Brine — 12 meses</CardTitle>
              <CardDescription>Li y Mg en mg/L (escala izq.) — K y B en escala derecha</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={brineChemistryHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="li" domain={[1700, 1950]} tick={{ fontSize: 10 }} label={{ value: "Li / Mg (mg/L)", angle: -90, position: "insideLeft", fontSize: 9 }} />
                  <YAxis yAxisId="k" orientation="right" domain={[7700, 8500]} tick={{ fontSize: 10 }} label={{ value: "K / B (mg/L)", angle: 90, position: "insideRight", fontSize: 9 }} />
                  <Tooltip formatter={(v) => [Number(v).toFixed(0) + " mg/L"]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line yAxisId="li" type="monotone" dataKey="Li" name="Li" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line yAxisId="li" type="monotone" dataKey="Mg" name="Mg" stroke="#8b5cf6" strokeWidth={1.5} dot={false} />
                  <Line yAxisId="k" type="monotone" dataKey="K" name="K" stroke="#0d9488" strokeWidth={1.5} dot={false} />
                  <Line yAxisId="k" type="monotone" dataKey="B" name="B" stroke="#f97316" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Concentración por Pozo de Producción — Mayo 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      {["Pozo", "Li (mg/L)", "K (mg/L)", "Mg (mg/L)", "Ratio Li/Mg", "Densidad (g/cm³)", "Caudal (L/s)", "Estado"].map(h => (
                        <th key={h} className="text-left px-3 py-2 font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {pozosProd.map(p => (
                      <tr key={p.id} className={p.estado === "Destacado" ? "bg-emerald-50" : p.estado === "Bajo" ? "bg-amber-50" : ""}>
                        <td className="px-3 py-2.5 font-mono font-bold">{p.id}</td>
                        <td className={`px-3 py-2.5 font-medium ${p.Li > 1900 ? "text-emerald-700" : p.Li < 1780 ? "text-amber-700" : ""}`}>{p.Li.toLocaleString("es-CL")}</td>
                        <td className="px-3 py-2.5">{p.K.toLocaleString("es-CL")}</td>
                        <td className="px-3 py-2.5">{p.Mg.toLocaleString("es-CL")}</td>
                        <td className="px-3 py-2.5 font-mono">{p.ratio.toFixed(2)}</td>
                        <td className="px-3 py-2.5 font-mono">{p.densidad.toFixed(3)}</td>
                        <td className="px-3 py-2.5">{p.caudal}</td>
                        <td className="px-3 py-2.5">
                          <Badge variant="outline" className={`text-[10px] ${p.estado === "Destacado" ? "text-emerald-600 border-emerald-300" : p.estado === "Bajo" ? "text-amber-600 border-amber-300" : ""}`}>
                            {p.estado}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Eficiencia de Recuperación de Litio — 12 meses</CardTitle>
              <CardDescription>Eficiencia = Li en producto final / Li en brine extraído. Pérdidas: evaporación 4.2%, seepage 2.1%, otros 1.9%</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={liRecovery}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                  <YAxis domain={[85, 95]} tick={{ fontSize: 10 }} unit="%" />
                  <Tooltip formatter={(v) => [Number(v).toFixed(1) + "%", "Eficiencia Li"]} />
                  <ReferenceLine y={92} stroke="#0d9488" strokeDasharray="4 2" label={{ value: "Objetivo 92%", fontSize: 10, fill: "#0d9488", position: "insideTopRight" }} />
                  <Line type="monotone" dataKey="efic" name="Eficiencia" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground justify-center">
                <span>Promedio 12m: <strong>91.1%</strong></span>
                <span>Mayo 2026: <strong className="text-primary">91.8%</strong></span>
                <span>Objetivo: <strong className="text-teal-600">92.0%</strong></span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── DERECHOS DAA ── */}
        <TabsContent value="derechos" className="mt-4 space-y-4">
          <div className="space-y-3">
            {waterRights.map(r => (
              <Card key={r.codigo}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-blue-50 border border-blue-200 p-2">
                        <Droplets className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-bold">{r.codigo}</span>
                          <Badge variant="outline" className="text-[10px]">{r.tipo}</Badge>
                          <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-200">{r.estado}</Badge>
                        </div>
                        <p className="text-sm font-medium mt-0.5">{r.descripcion}</p>
                        <p className="text-xs text-muted-foreground">{r.modalidad}</p>
                        <p className="text-xs text-muted-foreground">Inscripción: {r.inscripcion}</p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-bold">{r.caudal}</p>
                      <p className="text-xs text-muted-foreground">caudal autorizado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader><CardTitle className="text-sm">Zona Hídrica — Salar de Atacama</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Clasificación DGA", value: "Zona de Restricción", color: "text-amber-600", note: "Desde 2003 — sin nuevos DAA" },
                  { label: "Acuífero", value: "Cuenca Salar de Atacama", color: "text-blue-600", note: "Código DGA: 02-01" },
                  { label: "Comunidad Aguas Subterr.", value: "Activa desde 2004", color: "text-emerald-600", note: "SQM representante ante DGA" },
                ].map(f => (
                  <div key={f.label} className="rounded-lg border p-3">
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wide">{f.label}</p>
                    <p className={`text-sm font-bold mt-0.5 ${f.color}`}>{f.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{f.note}</p>
                  </div>
                ))}
              </div>
              <Alert className="mt-3">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">Ley N°21.435 (Reforma Código de Aguas, 2022): prohíbe cualquier uso del agua que afecte la sustentabilidad del acuífero. El PAT es el mecanismo legal de verificación permanente.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── MEE ── */}
        <TabsContent value="mee" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Transmisiones MEE al Sistema DGA</CardTitle>
              <CardDescription>Monitoreo de Extracciones Efectivas — Manual Técnico N°1/2025 (Res. DGA N°2.170/2025)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {meeReports.map(r => (
                  <div key={r.periodo} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-emerald-50 border border-emerald-200 p-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{r.periodo}</p>
                        <p className="text-xs font-mono text-muted-foreground">{r.archivo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Volumen total</p>
                        <p className="text-sm font-medium">{r.volumen}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Transmitido</p>
                        <p className="text-xs font-mono">{r.fecha}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-200">{r.estado}</Badge>
                      <Button size="sm" variant="ghost" className="text-xs h-7 gap-1"><Download className="h-3 w-3" />XML</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-3">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Mayo 2026 (en curso)</p>
                <div className="rounded-lg border border-dashed p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm">MEE_SQM_May2026.xml</p>
                    <p className="text-xs text-muted-foreground">Transmisión automática programada: 01/06/2026</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">Generándose</Badge>
                    <Button size="sm" variant="outline" className="text-xs h-7 gap-1"><Send className="h-3 w-3" />Transmitir ahora</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-xs">Sanción por no transmitir MEE: multa de segundo grado (Ley 21.435, Art. 173 ter, lit. b). Verificar conectividad VPN al sistema DGA los días 1 de cada mes.</AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}
