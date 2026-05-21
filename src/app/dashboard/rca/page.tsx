"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload, FileText, Sparkles, AlertTriangle, CheckCircle2, Clock,
  Download, Filter, Calendar, Shield, Bell, ChevronRight, Loader2,
  Building2, Hash, BarChart3, Info,
} from "lucide-react";

interface Compromiso {
  id: string;
  seccion: string;
  texto: string;
  tipo: string;
  responsable: string;
  frecuencia: string;
  canal: string;
  umbral: string | null;
  plazo_dias: number;
  criticidad: "Alta" | "Media" | "Baja";
}

interface RcaResult {
  proyecto: string;
  titular: string;
  numero_rca: string;
  fecha_rca: string;
  total_compromisos: number;
  compromisos: Compromiso[];
  error?: string;
}

const DEMO_RESULT: RcaResult = {
  proyecto: "Expansión Salar de Atacama — Fase III",
  titular: "SQM S.A.",
  numero_rca: "RCA N°226/2006 — Modificación N°47",
  fecha_rca: "12 de enero de 2024",
  total_compromisos: 18,
  compromisos: [
    { id: "C-001", seccion: "§8.1.1", texto: "Monitorear mensualmente los niveles piezométricos en los pozos de observación P-04, P-07, P-12 y P-19, remitiendo resultados al SMA dentro de los primeros 15 días hábiles del mes siguiente.", tipo: "Monitoreo", responsable: "Hidrogeología", frecuencia: "Mensual", canal: "SMA", umbral: null, plazo_dias: 8, criticidad: "Alta" },
    { id: "C-002", seccion: "§8.1.2", texto: "Mantener la extracción de salmuera por debajo de los 900 L/s en el sector MOP y 600 L/s en el sector SOP, medido como promedio mensual.", tipo: "Límite Operacional", responsable: "Operaciones", frecuencia: "Continua", canal: "SMA + SEA", umbral: "≤ 900 L/s (MOP) / ≤ 600 L/s (SOP)", plazo_dias: 1, criticidad: "Alta" },
    { id: "C-003", seccion: "§8.1.3", texto: "Activar el Plan de Alerta Temprana (PAT) cuando el nivel freático en cualquier pozo centinela descienda más de 0.5 m respecto al nivel de referencia del Anexo 3.", tipo: "Plan de Contingencia", responsable: "Medio Ambiente", frecuencia: "Por evento", canal: "SMA", umbral: "Descenso > 0.5 m vs. línea base", plazo_dias: 1, criticidad: "Alta" },
    { id: "C-004", seccion: "§8.2.1", texto: "Presentar informe ambiental anual (INFA) al SMA antes del 31 de marzo de cada año, con todos los resultados de monitoreo del año anterior.", tipo: "Reporte", responsable: "Medio Ambiente", frecuencia: "Anual", canal: "SMA", umbral: null, plazo_dias: 45, criticidad: "Alta" },
    { id: "C-005", seccion: "§8.2.2", texto: "Realizar censo semestral de flamencos (Phoenicoparrus andinus, Ph. jamesi y Ph. chilensis) en la laguna Chaxa y áreas de alimentación del salar.", tipo: "Monitoreo", responsable: "Medio Ambiente", frecuencia: "Semestral", canal: "SEA", umbral: null, plazo_dias: 67, criticidad: "Alta" },
    { id: "C-006", seccion: "§8.2.3", texto: "Monitorear diariamente la concentración de litio, potasio, magnesio y boro en el brine extraído de cada pozo de producción.", tipo: "Monitoreo", responsable: "Hidrogeología", frecuencia: "Diaria", canal: "Interno", umbral: null, plazo_dias: 1, criticidad: "Media" },
    { id: "C-007", seccion: "§8.3.1", texto: "No superar la extracción de agua dulce de los pozos de agua fresca autorizados (W-01 a W-05) en un total de 240 L/s.", tipo: "Límite Operacional", responsable: "Operaciones", frecuencia: "Continua", canal: "DGA + SMA", umbral: "≤ 240 L/s total", plazo_dias: 1, criticidad: "Alta" },
    { id: "C-008", seccion: "§8.3.2", texto: "Transmitir datos de extracción efectiva (MEE) al sistema DGA con la frecuencia requerida según Resolución N°2.170/2025 del Manual Técnico N°1/2025.", tipo: "Reporte", responsable: "Medio Ambiente", frecuencia: "Diaria", canal: "DGA", umbral: null, plazo_dias: 1, criticidad: "Alta" },
    { id: "C-009", seccion: "§8.4.1", texto: "Mantener operativa la red de monitoreo de calidad del agua superficial en 12 estaciones de la cuenca, con análisis de 18 parámetros fisicoquímicos.", tipo: "Monitoreo", responsable: "Medio Ambiente", frecuencia: "Trimestral", canal: "SMA", umbral: null, plazo_dias: 21, criticidad: "Media" },
    { id: "C-010", seccion: "§8.4.2", texto: "Realizar monitoreo de vegetación y biota del salar en transectos fijos definidos en el Anexo 6, con reporte semestral al SEA.", tipo: "Monitoreo", responsable: "Medio Ambiente", frecuencia: "Semestral", canal: "SEA", umbral: null, plazo_dias: 67, criticidad: "Media" },
    { id: "C-011", seccion: "§8.5.1", texto: "Presentar informe trimestral de cumplimiento del PAT al SMA dentro de los 20 días hábiles siguientes al cierre de cada trimestre.", tipo: "Reporte", responsable: "Medio Ambiente", frecuencia: "Trimestral", canal: "SMA", umbral: null, plazo_dias: 29, criticidad: "Alta" },
    { id: "C-012", seccion: "§8.5.2", texto: "Contratar una Entidad Técnica de Certificación Ambiental (ETCA) para la verificación anual del cumplimiento de la RCA, con entrega del certificado al SMA.", tipo: "Reporte", responsable: "Gerencia", frecuencia: "Anual", canal: "SMA", umbral: null, plazo_dias: 45, criticidad: "Media" },
    { id: "C-013", seccion: "§9.1.1", texto: "Prohibido realizar operaciones de extracción en zona núcleo del Salar (coordenadas UTM 19S: 600000-607000 E, 7330000-7340000 N).", tipo: "Prohibición", responsable: "Operaciones", frecuencia: "Continua", canal: "Interno", umbral: null, plazo_dias: 1, criticidad: "Alta" },
    { id: "C-014", seccion: "§9.2.1", texto: "Mantener plan de contingencia de derrames de salmuera actualizado, con simulacro de activación al menos una vez al año.", tipo: "Plan de Contingencia", responsable: "Seguridad", frecuencia: "Anual", canal: "SERNAGEOMIN", umbral: null, plazo_dias: 120, criticidad: "Media" },
    { id: "C-015", seccion: "§9.3.1", texto: "Instalar y mantener sistema de impermeabilización en todas las pozas de evaporación con coeficiente de permeabilidad ≤ 10⁻⁹ m/s.", tipo: "Diseño/Ingeniería", responsable: "Operaciones", frecuencia: "Única vez", canal: "SEA", umbral: "k ≤ 10⁻⁹ m/s", plazo_dias: 180, criticidad: "Media" },
    { id: "C-016", seccion: "§9.4.1", texto: "Realizar capacitación anual de 8 horas a todo el personal operativo sobre el PAT, protocolos de emergencia hídrica y normativa ambiental vigente.", tipo: "Capacitación", responsable: "Medio Ambiente", frecuencia: "Anual", canal: "Interno", umbral: null, plazo_dias: 90, criticidad: "Baja" },
    { id: "C-017", seccion: "§9.5.1", texto: "Notificar al SMA y a la comunidad atacameña dentro de 24 horas en caso de derrame, explosión, incendio o cualquier accidente con potencial impacto ambiental.", tipo: "Plan de Contingencia", responsable: "Gerencia", frecuencia: "Por evento", canal: "SMA", umbral: null, plazo_dias: 1, criticidad: "Alta" },
    { id: "C-018", seccion: "§9.6.1", texto: "Publicar mensualmente en el sitio web corporativo los datos de extracción de salmuera y agua dulce, niveles piezométricos y estado del PAT.", tipo: "Reporte", responsable: "Medio Ambiente", frecuencia: "Mensual", canal: "Interno", umbral: null, plazo_dias: 8, criticidad: "Baja" },
  ],
};

const tipoColor: Record<string, string> = {
  "Monitoreo": "bg-blue-100 text-blue-700 border-blue-200",
  "Reporte": "bg-purple-100 text-purple-700 border-purple-200",
  "Límite Operacional": "bg-red-100 text-red-700 border-red-200",
  "Plan de Contingencia": "bg-orange-100 text-orange-700 border-orange-200",
  "Diseño/Ingeniería": "bg-teal-100 text-teal-700 border-teal-200",
  "Capacitación": "bg-green-100 text-green-700 border-green-200",
  "Prohibición": "bg-rose-100 text-rose-700 border-rose-200",
};

const criticidadConfig = {
  Alta: { color: "text-red-600", bg: "bg-red-50 border-red-200", dot: "bg-red-500" },
  Media: { color: "text-amber-600", bg: "bg-amber-50 border-amber-200", dot: "bg-amber-500" },
  Baja: { color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
};

function plazoBadge(dias: number) {
  if (dias <= 7) return <Badge variant="destructive" className="text-[10px] gap-1"><AlertTriangle className="h-2.5 w-2.5" />{dias}d</Badge>;
  if (dias <= 30) return <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">{dias}d</Badge>;
  return <Badge variant="outline" className="text-[10px]">{dias}d</Badge>;
}

export default function RcaPage() {
  const [result, setResult] = useState<RcaResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [filterTipo, setFilterTipo] = useState<string>("Todos");
  const [filterCriticidad, setFilterCriticidad] = useState<string>("Todos");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    if (file.type !== "application/pdf") {
      setError("Solo se aceptan archivos PDF.");
      return;
    }
    setFileName(file.name);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/extract-rca", { method: "POST", body: fd });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al procesar el documento.");
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  const compromisos = result?.compromisos ?? [];
  const filtered = compromisos.filter((c) => {
    const tipoOk = filterTipo === "Todos" || c.tipo === filterTipo;
    const critOk = filterCriticidad === "Todos" || c.criticidad === filterCriticidad;
    return tipoOk && critOk;
  });

  const urgentes = compromisos.filter((c) => c.plazo_dias <= 7).length;
  const proximos = compromisos.filter((c) => c.plazo_dias > 7 && c.plazo_dias <= 30).length;
  const tiposCounts = compromisos.reduce((acc, c) => { acc[c.tipo] = (acc[c.tipo] || 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Extractor RCA</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sube una RCA y Claude extrae automáticamente todos los compromisos ambientales
          </p>
        </div>
        {result && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              Activar Alertas
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar Excel
            </Button>
          </div>
        )}
      </div>

      {!result && (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "Extracción IA con Claude", desc: "Analiza PDFs de hasta 5.000 páginas e identifica cada obligación, umbral y plazo automáticamente." },
            { icon: Calendar, title: "Calendario de Vencimientos", desc: "Genera automáticamente el calendario de compromisos con alertas 30/7/1 días antes." },
            { icon: Shield, title: "Matriz de Cumplimiento", desc: "Produce la misma matriz que SIGEA hace manualmente — en segundos, no en semanas." },
          ].map((f) => (
            <Card key={f.title} className="border-dashed">
              <CardContent className="pt-5">
                <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center mb-3">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium">{f.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload zone */}
      {!result && (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            {loading ? (
              <>
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-sm font-medium">Analizando RCA con Claude…</p>
                <p className="text-xs text-muted-foreground mt-1">Extrayendo compromisos de <span className="font-mono">{fileName}</span></p>
                <Progress className="w-48 mt-4" value={null} />
              </>
            ) : (
              <>
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">Arrastra tu RCA aquí o haz clic para seleccionar</p>
                <p className="text-xs text-muted-foreground mt-1">PDF hasta 20 MB · SEIA, SEA, o modificaciones de RCA</p>
                <Button size="sm" className="mt-4 gap-2" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
                  <FileText className="h-4 w-4" />
                  Seleccionar PDF
                </Button>
                <Button size="sm" variant="ghost" className="mt-2 text-xs text-muted-foreground" onClick={(e) => { e.stopPropagation(); setResult(DEMO_RESULT); }}>
                  Ver demo con RCA de ejemplo
                </Button>
              </>
            )}
          </CardContent>
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {result && (
        <>
          {/* RCA Header */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4 pb-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wide">Titular</p>
                    <p className="text-sm font-medium">{result.titular}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wide">N° RCA</p>
                    <p className="text-sm font-mono">{result.numero_rca}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wide">Compromisos</p>
                    <p className="text-sm font-bold text-primary">{result.total_compromisos}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wide">Fecha RCA</p>
                    <p className="text-sm">{result.fecha_rca}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold text-red-600">{urgentes}</p>
                <p className="text-xs text-muted-foreground">Vencen en 7 días</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold text-amber-600">{proximos}</p>
                <p className="text-xs text-muted-foreground">Vencen en 30 días</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold text-blue-600">{compromisos.filter(c => c.criticidad === "Alta").length}</p>
                <p className="text-xs text-muted-foreground">Criticidad alta</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold text-emerald-600">{Object.keys(tiposCounts).length}</p>
                <p className="text-xs text-muted-foreground">Tipos de obligación</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="matriz">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="matriz">Matriz de Compromisos</TabsTrigger>
                <TabsTrigger value="calendario">Calendario</TabsTrigger>
                <TabsTrigger value="resumen">Resumen por Tipo</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <select className="text-xs border rounded-md px-2 py-1 bg-background" value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)}>
                  <option value="Todos">Todos los tipos</option>
                  {Object.keys(tiposCounts).map(t => <option key={t} value={t}>{t} ({tiposCounts[t]})</option>)}
                </select>
                <select className="text-xs border rounded-md px-2 py-1 bg-background" value={filterCriticidad} onChange={(e) => setFilterCriticidad(e.target.value)}>
                  <option value="Todos">Toda criticidad</option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
            </div>

            <TabsContent value="matriz" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground w-16">ID</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground">Obligación</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground w-28">Tipo</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground w-24">Responsable</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground w-20">Frecuencia</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground w-16">Canal</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground w-20">Umbral</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground w-20">Próx. venc.</th>
                          <th className="text-left px-3 py-2 font-medium text-muted-foreground w-16">Criticidad</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filtered.map((c) => {
                          const crit = criticidadConfig[c.criticidad];
                          return (
                            <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-3 py-2.5 font-mono text-muted-foreground">{c.id}</td>
                              <td className="px-3 py-2.5">
                                <p className="font-medium leading-snug line-clamp-2">{c.texto}</p>
                                <p className="text-muted-foreground mt-0.5">{c.seccion}</p>
                              </td>
                              <td className="px-3 py-2.5">
                                <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${tipoColor[c.tipo] ?? "bg-gray-100 text-gray-700"}`}>
                                  {c.tipo}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 text-muted-foreground">{c.responsable}</td>
                              <td className="px-3 py-2.5 text-muted-foreground">{c.frecuencia}</td>
                              <td className="px-3 py-2.5 font-mono text-muted-foreground">{c.canal}</td>
                              <td className="px-3 py-2.5 font-mono text-[10px]">{c.umbral ?? "—"}</td>
                              <td className="px-3 py-2.5">{plazoBadge(c.plazo_dias)}</td>
                              <td className="px-3 py-2.5">
                                <div className="flex items-center gap-1">
                                  <span className={`h-2 w-2 rounded-full ${crit.dot}`} />
                                  <span className={crit.color}>{c.criticidad}</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-3 py-2 border-t text-xs text-muted-foreground">
                    Mostrando {filtered.length} de {compromisos.length} compromisos
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendario" className="mt-4">
              <div className="space-y-3">
                {["Esta semana", "Próximos 30 días", "Próximos 90 días"].map((period, idx) => {
                  const ranges = [7, 30, 90];
                  const prevRanges = [0, 7, 30];
                  const items = compromisos.filter(c => c.plazo_dias <= ranges[idx] && c.plazo_dias > prevRanges[idx]);
                  if (items.length === 0 && idx > 0) return null;
                  return (
                    <div key={period}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{period} — {items.length} vencimientos</p>
                      {items.length === 0 ? (
                        <Card><CardContent className="py-4 text-center text-xs text-muted-foreground">Sin vencimientos en este período</CardContent></Card>
                      ) : (
                        <div className="space-y-2">
                          {items.map(c => {
                            const crit = criticidadConfig[c.criticidad];
                            return (
                              <Card key={c.id} className={`border ${crit.bg}`}>
                                <CardContent className="py-3 flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`rounded-full p-1.5 ${crit.bg}`}>
                                      <Clock className={`h-3.5 w-3.5 ${crit.color}`} />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-muted-foreground">{c.id}</span>
                                        <span className={`inline-block rounded-full border px-1.5 py-0 text-[10px] font-medium ${tipoColor[c.tipo] ?? ""}`}>{c.tipo}</span>
                                      </div>
                                      <p className="text-sm font-medium mt-0.5 line-clamp-1">{c.texto}</p>
                                      <p className="text-xs text-muted-foreground">Canal: {c.canal} · Responsable: {c.responsable}</p>
                                    </div>
                                  </div>
                                  <div className="shrink-0 text-right">
                                    {plazoBadge(c.plazo_dias)}
                                    <p className="text-[10px] text-muted-foreground mt-1">{c.frecuencia}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="resumen" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Distribución por Tipo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(tiposCounts).map(([tipo, count]) => (
                      <div key={tipo} className="flex items-center gap-2">
                        <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium w-36 text-center ${tipoColor[tipo] ?? ""}`}>{tipo}</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${(count / compromisos.length) * 100}%` }} />
                        </div>
                        <span className="text-xs font-medium w-4">{count}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Distribución por Canal de Reporte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(
                      compromisos.reduce((acc, c) => { acc[c.canal] = (acc[c.canal] || 0) + 1; return acc; }, {} as Record<string, number>)
                    ).sort((a, b) => b[1] - a[1]).map(([canal, count]) => (
                      <div key={canal} className="flex items-center justify-between py-1 border-b last:border-0">
                        <span className="text-sm font-mono">{canal}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(count / compromisos.length) * 100}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{count}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Esta extracción fue generada por Claude Sonnet. Revisa las obligaciones de criticidad Alta antes de usar esta matriz en producción. La IA puede interpretar incorrectamente condiciones que hacen referencia cruzada a anexos externos.
                </AlertDescription>
              </Alert>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => { setResult(null); setFileName(null); }}>
                  <Upload className="h-4 w-4" />
                  Analizar otro RCA
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
