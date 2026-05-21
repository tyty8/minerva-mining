"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, ReferenceLine,
} from "recharts";
import {
  Droplets, AlertTriangle, CheckCircle2, Clock, Download,
  Send, TrendingDown, TrendingUp, Minus, Shield, Zap,
  MapPin, FileText, Info, Bell,
} from "lucide-react";

// ── Demo data ──────────────────────────────────────────────────────────────

// Daily extraction last 30 days (L/s, 5-minute averages aggregated to daily)
const dailyExtraction = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 820 + Math.sin(i * 0.4) * 35 + (Math.random() - 0.5) * 25;
  const fw = 195 + Math.sin(i * 0.3) * 15 + (Math.random() - 0.5) * 10;
  return { dia: `${day}/05`, salmuera: Math.round(base), aguaDulce: Math.round(fw) };
});

// Monthly summary last 12 months
const monthlyMEE = [
  { mes: "Jun'25", salmuera: 824, aguaDulce: 191 }, { mes: "Jul'25", salmuera: 841, aguaDulce: 198 },
  { mes: "Ago'25", salmuera: 858, aguaDulce: 203 }, { mes: "Sep'25", salmuera: 812, aguaDulce: 187 },
  { mes: "Oct'25", salmuera: 796, aguaDulce: 182 }, { mes: "Nov'25", salmuera: 809, aguaDulce: 190 },
  { mes: "Dic'25", salmuera: 833, aguaDulce: 196 }, { mes: "Ene'26", salmuera: 851, aguaDulce: 201 },
  { mes: "Feb'26", salmuera: 839, aguaDulce: 194 }, { mes: "Mar'26", salmuera: 818, aguaDulce: 188 },
  { mes: "Abr'26", salmuera: 827, aguaDulce: 192 }, { mes: "May'26", salmuera: 821, aguaDulce: 193 },
];

// Piezometric levels (m depth from surface — more negative = deeper = worse)
const pozoData = [
  { id: "P-04", nombre: "Pozo centinela norte", nivelActual: -31.4, nivelBase: -29.8, umbralPAT: -32.0, latitud: -23.412, longitud: -68.234, estado: "normal" },
  { id: "P-07", nombre: "Pozo centinela sur", nivelActual: -30.1, nivelBase: -29.2, umbralPAT: -32.0, latitud: -23.498, longitud: -68.218, estado: "normal" },
  { id: "P-12", nombre: "Pozo margen este", nivelActual: -31.8, nivelBase: -29.5, umbralPAT: -32.0, latitud: -23.445, longitud: -68.198, estado: "alerta" },
  { id: "P-19", nombre: "Pozo margen oeste", nivelActual: -29.3, nivelBase: -28.9, umbralPAT: -32.0, latitud: -23.467, longitud: -68.261, estado: "normal" },
];

// Piezometric time series (m from surface, last 12 months)
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

const waterRights = [
  { codigo: "DAA-001", tipo: "Consuntivo / Subterráneo", descripcion: "Agua dulce — Pozos W-01 a W-05", caudal: "240 L/s", modalidad: "Permanente / Continuo", estado: "Vigente", inscripcion: "CBR Tocopilla — 2019" },
  { codigo: "DAA-002", tipo: "Consuntivo / Subterráneo", descripcion: "Agua dulce — Pozo de emergencia W-06", caudal: "30 L/s", modalidad: "Eventual / Discontinuo", estado: "Vigente", inscripcion: "CBR Tocopilla — 2021" },
  { codigo: "RCA-226", tipo: "Salmuera (RCA)", descripcion: "Extracción salmuera — Sector MOP", caudal: "900 L/s", modalidad: "Operacional / RCA N°226", estado: "Vigente", inscripcion: "SEA — Mod. 47/2024" },
  { codigo: "RCA-226B", tipo: "Salmuera (RCA)", descripcion: "Extracción salmuera — Sector SOP", caudal: "600 L/s", modalidad: "Operacional / RCA N°226", estado: "Vigente", inscripcion: "SEA — Mod. 47/2024" },
];

const meeReports = [
  { periodo: "Abril 2026", archivo: "MEE_SQM_Abr2026.xml", estado: "Transmitido", fecha: "01/05/2026", volumen: "23.472 m³" },
  { periodo: "Marzo 2026", archivo: "MEE_SQM_Mar2026.xml", estado: "Transmitido", fecha: "01/04/2026", volumen: "24.813 m³" },
  { periodo: "Febrero 2026", archivo: "MEE_SQM_Feb2026.xml", estado: "Transmitido", fecha: "01/03/2026", volumen: "21.190 m³" },
  { periodo: "Enero 2026", archivo: "MEE_SQM_Ene2026.xml", estado: "Transmitido", fecha: "01/02/2026", volumen: "24.001 m³" },
];

// ── Gauge component ────────────────────────────────────────────────────────

function GaugeCard({ label, value, limit, unit, warning, color }: {
  label: string; value: number; limit: number; unit: string;
  warning: number; color: string;
}) {
  const pct = Math.min((value / limit) * 100, 100);
  const isWarn = pct >= warning;
  const isCrit = pct >= 95;
  const barColor = isCrit ? "bg-red-500" : isWarn ? "bg-amber-500" : `bg-${color}-500`;

  return (
    <Card className={isCrit ? "border-red-300" : isWarn ? "border-amber-300" : ""}>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          {isCrit ? <AlertTriangle className="h-4 w-4 text-red-500" /> : isWarn ? <AlertTriangle className="h-4 w-4 text-amber-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-bold ${isCrit ? "text-red-600" : isWarn ? "text-amber-600" : "text-foreground"}`}>{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>0</span>
            <span className={isWarn ? "font-bold text-amber-600" : ""}>{Math.round(pct)}%</span>
            <span>Límite: {limit} {unit}</span>
          </div>
          <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
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
  const limitSalmuera = 900;
  const limitFreshwater = 240;

  const alertPozo = pozoData.find(p => p.estado === "alerta");
  const pctSalmuera = Math.round((currentSalmuera / limitSalmuera) * 100);
  const pctFreshwater = Math.round((currentFreshwater / limitFreshwater) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">DGA — Gestión Hídrica</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Extracciones MEE, Plan de Alerta Temprana y Derechos de Aprovechamiento
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar MEE
          </Button>
          <Button size="sm" className="gap-2">
            <Send className="h-4 w-4" />
            Transmitir a DGA
          </Button>
        </div>
      </div>

      {alertPozo && (
        <Alert className="border-amber-300 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-sm">
            <strong>Advertencia PAT — Pozo {alertPozo.id}:</strong> Nivel piezométrico en {alertPozo.nivelActual} m. Umbral PAT: {alertPozo.umbralPAT} m ({Math.abs(alertPozo.nivelActual - alertPozo.umbralPAT).toFixed(1)} m de margen).
            Tendencia descendente los últimos 6 meses. Evaluar reducción de extracción en sector próximo.
          </AlertDescription>
        </Alert>
      )}

      {/* Real-time gauges */}
      <div className="grid gap-4 md:grid-cols-2">
        <GaugeCard label="Extracción Salmuera — Promedio hoy" value={currentSalmuera} limit={limitSalmuera} unit="L/s" warning={88} color="blue" />
        <GaugeCard label="Extracción Agua Dulce — Promedio hoy" value={currentFreshwater} limit={limitFreshwater} unit="L/s" warning={88} color="teal" />
      </div>

      <Tabs defaultValue="extracciones">
        <TabsList className="grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="extracciones">Extracciones</TabsTrigger>
          <TabsTrigger value="pat">Plan Alerta PAT</TabsTrigger>
          <TabsTrigger value="derechos">Derechos DAA</TabsTrigger>
          <TabsTrigger value="mee">Reportes MEE</TabsTrigger>
        </TabsList>

        {/* EXTRACCIONES */}
        <TabsContent value="extracciones" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Extracción Diaria — Mayo 2026 (L/s promedio diario)</CardTitle>
              <CardDescription>Datos MEE transmitidos al sistema DGA · Escala izquierda: salmuera · Escala derecha: agua dulce</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
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
                  <ReferenceLine yAxisId="sal" y={900} stroke="#ef4444" strokeDasharray="4 2" label={{ value: "Límite RCA 900", fontSize: 10, fill: "#ef4444", position: "right" }} />
                  <ReferenceLine yAxisId="fw" y={240} stroke="#f97316" strokeDasharray="4 2" label={{ value: "Límite FW 240", fontSize: 10, fill: "#f97316", position: "right" }} />
                  <Area yAxisId="sal" type="monotone" dataKey="salmuera" name="Salmuera" stroke="hsl(var(--primary))" fill="url(#salGrad)" strokeWidth={1.5} dot={false} />
                  <Area yAxisId="fw" type="monotone" dataKey="aguaDulce" name="Agua dulce" stroke="#0d9488" fill="url(#fwGrad)" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Extracción Promedio Mensual (L/s) — 12 meses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
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
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground">Promedio 12 meses — Salmuera</p>
                  <p className="text-xl font-bold">{Math.round(monthlyMEE.reduce((a, m) => a + m.salmuera, 0) / monthlyMEE.length)} <span className="text-sm font-normal text-muted-foreground">L/s</span></p>
                  <p className="text-xs text-muted-foreground">{Math.round((monthlyMEE.reduce((a, m) => a + m.salmuera, 0) / monthlyMEE.length / 900) * 100)}% del límite RCA</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground">Promedio 12 meses — Agua dulce</p>
                  <p className="text-xl font-bold">{Math.round(monthlyMEE.reduce((a, m) => a + m.aguaDulce, 0) / monthlyMEE.length)} <span className="text-sm font-normal text-muted-foreground">L/s</span></p>
                  <p className="text-xs text-muted-foreground">{Math.round((monthlyMEE.reduce((a, m) => a + m.aguaDulce, 0) / monthlyMEE.length / 240) * 100)}% del límite DAA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAT */}
        <TabsContent value="pat" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Estado del Plan de Alerta Temprana (PAT)
              </CardTitle>
              <CardDescription>Indicadores piezométricos — Umbral de activación: descenso &gt; 0.5 m respecto a nivel base (Anexo 3 RCA N°226)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {pozoData.map(p => {
                  const margen = p.umbralPAT - p.nivelActual;
                  const descenso = p.nivelActual - p.nivelBase;
                  const pct = Math.min(Math.abs(descenso) / 2.2 * 100, 100);
                  const isAlert = p.estado === "alerta";
                  return (
                    <div key={p.id} className={`rounded-lg border p-3 ${isAlert ? "border-amber-300 bg-amber-50" : "border-emerald-200 bg-emerald-50/30"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-mono font-bold">{p.id}</span>
                          <span className="text-xs text-muted-foreground ml-2">{p.nombre}</span>
                        </div>
                        <Badge variant={isAlert ? "secondary" : "outline"} className={`text-[10px] ${isAlert ? "bg-amber-100 text-amber-700 border-amber-300" : "text-emerald-600 border-emerald-300"}`}>
                          {isAlert ? "⚠ Alerta" : "✓ Normal"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center mt-2">
                        <div>
                          <p className="text-[10px] text-muted-foreground">Nivel actual</p>
                          <p className={`text-sm font-bold ${isAlert ? "text-amber-700" : ""}`}>{p.nivelActual} m</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">Nivel base</p>
                          <p className="text-sm font-bold">{p.nivelBase} m</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">Margen PAT</p>
                          <p className={`text-sm font-bold ${margen < 0.3 ? "text-red-600" : isAlert ? "text-amber-700" : "text-emerald-700"}`}>{margen.toFixed(1)} m</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
                          <span>Descenso acumulado: {Math.abs(descenso).toFixed(1)} m</span>
                          <span>Umbral: 0.5 m</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${isAlert ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(Math.abs(descenso) / 2.2 * 100, 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {alertPozo && (
                <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3">
                  <p className="text-xs font-semibold text-amber-800 mb-1">Acción requerida — Pozo {alertPozo.id}</p>
                  <p className="text-xs text-amber-700">El nivel en P-12 ha descendido {Math.abs(alertPozo.nivelActual - alertPozo.nivelBase).toFixed(1)} m respecto al nivel de referencia. Según §8.1.3 RCA N°226, se requiere notificación al SMA y evaluación de reducción de extracción en el sector margen este.</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs h-7 gap-1 border-amber-400 text-amber-700">
                      <FileText className="h-3 w-3" />
                      Generar notificación SMA
                    </Button>
                    <Button size="sm" className="text-xs h-7 gap-1">
                      <Bell className="h-3 w-3" />
                      Activar PAT
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Serie Histórica Piezométrica — 12 meses (m profundidad)</CardTitle>
              <CardDescription>Valores más negativos = mayor profundidad. Línea roja = umbral PAT (-32.0 m)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={piezoHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                  <YAxis domain={[-33, -28]} tick={{ fontSize: 10 }} tickFormatter={v => `${v} m`} reversed />
                  <Tooltip formatter={(v) => [Number(v).toFixed(1) + " m"]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <ReferenceLine y={-32} stroke="#ef4444" strokeDasharray="4 2" label={{ value: "Umbral PAT −32 m", fontSize: 9, fill: "#ef4444", position: "insideTopLeft" }} />
                  <Line type="monotone" dataKey="p04" name="P-04" stroke="hsl(var(--primary))" dot={false} strokeWidth={1.5} />
                  <Line type="monotone" dataKey="p07" name="P-07" stroke="#0d9488" dot={false} strokeWidth={1.5} />
                  <Line type="monotone" dataKey="p12" name="P-12 ⚠" stroke="#f59e0b" dot={false} strokeWidth={2} strokeDasharray="5 2" />
                  <Line type="monotone" dataKey="p19" name="P-19" stroke="#8b5cf6" dot={false} strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DERECHOS DAA */}
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
            <CardHeader>
              <CardTitle className="text-sm">Zona Hídrica — Salar de Atacama</CardTitle>
            </CardHeader>
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
                <AlertDescription className="text-xs">
                  Ley N°21.435 (Reforma Código de Aguas, 2022): prohíbe cualquier uso del agua que afecte la sustentabilidad del acuífero. El Plan de Alerta Temprana es el mecanismo legal de verificación permanente.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REPORTES MEE */}
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
                      <Button size="sm" variant="ghost" className="text-xs h-7 gap-1">
                        <Download className="h-3 w-3" />
                        XML
                      </Button>
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
                    <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                      <Send className="h-3 w-3" />
                      Transmitir ahora
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Sanción por no transmitir MEE: multa de segundo grado (Ley 21.435, Art. 173 ter, lit. b). La transmisión automática falla si el VPN hacia el sistema DGA no está activo. Verificar conectividad los días 1 de cada mes.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}
