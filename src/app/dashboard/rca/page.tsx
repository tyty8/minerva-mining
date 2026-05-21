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
  Building2, Hash, BarChart3, Info, Paperclip, ChevronDown,
  TrendingUp, AlertCircle, DollarSign, Target,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

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

// Seguimiento tab data
type SeguimientoEstado = "Cumplido + Evidencia" | "Cumplido sin evidencia" | "En curso" | "Pendiente" | "Vencido";

const seguimientoData: Record<string, { estado: SeguimientoEstado; evidencia?: string; fechaEvidencia?: string }> = {
  "C-001": { estado: "En curso" },
  "C-002": { estado: "Cumplido sin evidencia" },
  "C-003": { estado: "Vencido" },
  "C-004": { estado: "En curso" },
  "C-005": { estado: "En curso" },
  "C-006": { estado: "Cumplido + Evidencia", evidencia: "monitoreo-brine-may2025.pdf", fechaEvidencia: "15 may 2025" },
  "C-007": { estado: "Cumplido sin evidencia" },
  "C-008": { estado: "Cumplido sin evidencia" },
  "C-009": { estado: "En curso" },
  "C-010": { estado: "Pendiente" },
  "C-011": { estado: "En curso" },
  "C-012": { estado: "Pendiente" },
  "C-013": { estado: "Cumplido + Evidencia", evidencia: "inspeccion-zona-nucleo-abr2025.pdf", fechaEvidencia: "03 abr 2025" },
  "C-014": { estado: "Pendiente" },
  "C-015": { estado: "Cumplido sin evidencia" },
  "C-016": { estado: "Cumplido + Evidencia", evidencia: "capacitacion-PAT-mar2025.pdf", fechaEvidencia: "22 mar 2025" },
  "C-017": { estado: "Pendiente" },
  "C-018": { estado: "Cumplido + Evidencia", evidencia: "publicacion-web-abr2025.pdf", fechaEvidencia: "30 abr 2025" },
};

const estadoBadge: Record<SeguimientoEstado, { label: string; className: string }> = {
  "Cumplido + Evidencia": { label: "Cumplido + Evidencia", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  "Cumplido sin evidencia": { label: "Cumplido sin evidencia", className: "bg-blue-100 text-blue-700 border-blue-200" },
  "En curso": { label: "En curso", className: "bg-amber-100 text-amber-700 border-amber-200" },
  "Pendiente": { label: "Pendiente", className: "bg-gray-100 text-gray-600 border-gray-200" },
  "Vencido": { label: "Vencido", className: "bg-red-100 text-red-700 border-red-200" },
};

const cargaData = [
  { responsable: "Medio Ambiente", cantidad: 8, fill: "#ef4444" },
  { responsable: "Operaciones", cantidad: 4, fill: "#f59e0b" },
  { responsable: "Hidrogeología", cantidad: 3, fill: "#f59e0b" },
  { responsable: "Gerencia", cantidad: 2, fill: "#10b981" },
  { responsable: "Seguridad", cantidad: 1, fill: "#10b981" },
];

const exposicionTipoData = [
  { tipo: "Límite Operacional", uta: 20000 },
  { tipo: "Prohibición", uta: 10000 },
  { tipo: "Plan Contingencia", uta: 8000 },
  { tipo: "Reporte", uta: 6000 },
  { tipo: "Monitoreo", uta: 4000 },
  { tipo: "Diseño", uta: 2000 },
  { tipo: "Capacitación", uta: 1000 },
];

// 3x3 risk matrix data: [severidad][probabilidad]
const matrizRiesgo: { label: string; count: number; ids: string; color: string }[][] = [
  // Gravísima row (top)
  [
    { label: "", count: 0, ids: "", color: "bg-orange-100" },
    { label: "", count: 0, ids: "", color: "bg-orange-200" },
    { label: "C-002, C-007", count: 2, ids: "C-002, C-007", color: "bg-red-200" },
  ],
  // Grave row
  [
    { label: "C-005, C-008", count: 2, ids: "C-005, C-008", color: "bg-yellow-100" },
    { label: "C-001, C-004, C-011", count: 3, ids: "C-001, C-004, C-011", color: "bg-orange-100" },
    { label: "C-003", count: 1, ids: "C-003", color: "bg-red-100" },
  ],
  // Leve row (bottom)
  [
    { label: "C-006, C-010, C-014, C-016", count: 4, ids: "C-006, C-010, C-014, C-016", color: "bg-green-100" },
    { label: "C-009, C-012, C-013, C-015, C-018", count: 5, ids: "C-009, C-012, C-013, C-015, C-018", color: "bg-yellow-100" },
    { label: "C-017", count: 1, ids: "C-017", color: "bg-orange-100" },
  ],
];

const multasReales = [
  { empresa: "Albemarle Ltda", fecha: "Oct 2025", infraccion: "Sobreextracción salmuera + PAT no activado", tipo: "Grave", uta: "4,713 UTA", usd: "USD 4.1M" },
  { empresa: "Minera Escondida (BHP)", fecha: "2024", infraccion: "Impacto humedal Tilopozo", tipo: "Gravísima", uta: "10,000 UTA", usd: "USD 8.7M" },
  { empresa: "SQM (caso anterior)", fecha: "2023", infraccion: "Superación límite hídrico", tipo: "Grave", uta: "2,800 UTA", usd: "USD 2.4M" },
  { empresa: "Codelco Chuquicamata", fecha: "2022", infraccion: "Incumplimiento plan seguimiento", tipo: "Leve", uta: "450 UTA", usd: "USD 0.4M" },
];

const tipoMultaBadge: Record<string, string> = {
  "Gravísima": "bg-red-100 text-red-700 border-red-200",
  "Grave": "bg-orange-100 text-orange-700 border-orange-200",
  "Leve": "bg-yellow-100 text-yellow-700 border-yellow-200",
};

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
            <div className="flex items-center justify-between flex-wrap gap-2">
              <TabsList>
                <TabsTrigger value="matriz">Matriz</TabsTrigger>
                <TabsTrigger value="calendario">Calendario</TabsTrigger>
                <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
                <TabsTrigger value="exposicion">Exposición al Riesgo</TabsTrigger>
                <TabsTrigger value="resumen">Resumen</TabsTrigger>
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

            {/* ── MATRIZ TAB ── */}
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

            {/* ── CALENDARIO TAB ── */}
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

            {/* ── SEGUIMIENTO TAB ── */}
            <TabsContent value="seguimiento" className="mt-4">
              <div className="space-y-6">

                {/* ETCA Readiness Score */}
                <Card className="border-amber-200 bg-amber-50/40">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Target className="h-4 w-4 text-amber-600" />
                        ETCA Readiness Score
                      </CardTitle>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-amber-600">64</span>
                        <span className="text-lg text-muted-foreground font-medium"> / 100</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={64} className="h-3" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="rounded-lg border bg-white px-3 py-2.5 space-y-1">
                        <p className="font-medium text-muted-foreground">Evidencia adjunta</p>
                        <p className="font-bold text-sm">4 / 18 (22%)</p>
                        <p className="text-muted-foreground">Contribuye 22 pts</p>
                      </div>
                      <div className="rounded-lg border bg-white px-3 py-2.5 space-y-1">
                        <p className="font-medium text-muted-foreground">Marcados cumplidos</p>
                        <p className="font-bold text-sm">7 / 18 (39%)</p>
                        <p className="text-muted-foreground">Contribuye 39 pts</p>
                      </div>
                      <div className="rounded-lg border bg-white px-3 py-2.5 space-y-1">
                        <p className="font-medium text-muted-foreground">Sin vencidos (30d)</p>
                        <p className="font-bold text-sm text-amber-600">No</p>
                        <p className="text-muted-foreground">Contribuye 3 pts</p>
                      </div>
                    </div>
                    <Alert className="border-amber-200 bg-amber-50">
                      <Info className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-xs text-amber-800">
                        Una ETCA evaluaría 64 pts como &ldquo;En proceso de cumplimiento&rdquo;. Objetivo para próxima certificación: ≥ 80 pts.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* Carga por Responsable */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Carga por Responsable</CardTitle>
                    <CardDescription className="text-xs">Número de compromisos asignados por área. Color indica criticidad promedio.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={cargaData} layout="vertical" margin={{ left: 80, right: 20, top: 4, bottom: 4 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                        <YAxis type="category" dataKey="responsable" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={80} />
                        <Tooltip
                          formatter={(value) => [`${value ?? 0} compromisos`, "Cantidad"]}
                          contentStyle={{ fontSize: 12, borderRadius: 8 }}
                        />
                        <Bar dataKey="cantidad" radius={[0, 4, 4, 0]}>
                          {cargaData.map((entry, index) => (
                            <rect key={index} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Tracker de Compromisos */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Tracker de Compromisos</CardTitle>
                    <CardDescription className="text-xs">Estado de cumplimiento y evidencia por compromiso. Datos de demostración.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-14">ID</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground">Obligación</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-24">Responsable</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-36">Estado</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-36">Evidencia</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-24">Fecha</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-28">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {DEMO_RESULT.compromisos.map((c) => {
                            const seg = seguimientoData[c.id];
                            const badge = estadoBadge[seg.estado];
                            return (
                              <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-3 py-2.5 font-mono text-muted-foreground">{c.id}</td>
                                <td className="px-3 py-2.5 max-w-[240px]">
                                  <p className="line-clamp-2 leading-snug">{c.texto}</p>
                                </td>
                                <td className="px-3 py-2.5 text-muted-foreground">{c.responsable}</td>
                                <td className="px-3 py-2.5">
                                  <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${badge.className}`}>
                                    {badge.label}
                                  </span>
                                </td>
                                <td className="px-3 py-2.5">
                                  {seg.evidencia ? (
                                    <div className="flex items-center gap-1 text-blue-600">
                                      <Paperclip className="h-3 w-3 shrink-0" />
                                      <span className="truncate max-w-[120px] text-[10px]">{seg.evidencia}</span>
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">—</span>
                                  )}
                                </td>
                                <td className="px-3 py-2.5 text-muted-foreground text-[10px]">{seg.fechaEvidencia ?? "—"}</td>
                                <td className="px-3 py-2.5">
                                  <div className="flex gap-1">
                                    <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 gap-1">
                                      Marcar <ChevronDown className="h-2.5 w-2.5" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 gap-1">
                                      <Paperclip className="h-2.5 w-2.5" />
                                      Adjuntar
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Investigaciones en Curso */}
                <Card className="border-red-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Investigaciones en Curso
                    </CardTitle>
                    <CardDescription className="text-xs">Procedimientos sancionatorios abiertos en la SMA relacionados con esta RCA.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-red-700">C-003</span>
                        <span className="text-[10px] rounded-full border border-amber-200 bg-amber-100 text-amber-700 px-2 py-0.5">Descargos presentados</span>
                      </div>
                      <p className="text-xs font-medium">PAT no activado durante evento P-12 Nov 2023</p>
                      <p className="text-[11px] text-muted-foreground">Investigación SMA abierta — Expediente D-2023-147</p>
                    </div>
                    <div className="rounded-lg border border-orange-200 bg-orange-50/50 p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-orange-700">C-011</span>
                        <span className="text-[10px] rounded-full border border-blue-200 bg-blue-100 text-blue-700 px-2 py-0.5">Cierre esperado: Jun 2026</span>
                      </div>
                      <p className="text-xs font-medium">Reporte PAT Q4 2025 entregado con 3 días de retraso</p>
                      <p className="text-[11px] text-muted-foreground">Expediente D-2026-023 — En etapa de formulación de cargos</p>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>

            {/* ── EXPOSICIÓN AL RIESGO TAB ── */}
            <TabsContent value="exposicion" className="mt-4">
              <div className="space-y-6">

                {/* Exposición Financiera Total */}
                <Card className="border-red-300 bg-gradient-to-br from-red-50 to-orange-50">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-red-600" />
                          <p className="text-sm font-semibold text-red-800">Exposición Financiera Máxima Teórica</p>
                        </div>
                        <p className="text-4xl font-bold text-red-700">USD 52.2M</p>
                        <p className="text-sm text-red-600 font-medium">60,000 UTA · 1 UTA ≈ USD 870</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Escenario más probable (25%)</p>
                        <p className="text-2xl font-bold text-amber-700">USD 13.1M</p>
                        <p className="text-xs text-muted-foreground">15,000 UTA estimadas</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                      <div className="rounded-lg border border-red-200 bg-white/70 px-3 py-2.5">
                        <p className="text-[10px] uppercase text-muted-foreground font-medium mb-1">Gravísimas (2)</p>
                        <p className="font-bold text-red-700 text-sm">20,000 UTA</p>
                        <p className="text-muted-foreground">Límite Operacional · 10k UTA c/u</p>
                      </div>
                      <div className="rounded-lg border border-orange-200 bg-white/70 px-3 py-2.5">
                        <p className="text-[10px] uppercase text-muted-foreground font-medium mb-1">Graves (6)</p>
                        <p className="font-bold text-orange-700 text-sm">30,000 UTA</p>
                        <p className="text-muted-foreground">5,000 UTA máx. por infracción</p>
                      </div>
                      <div className="rounded-lg border border-yellow-200 bg-white/70 px-3 py-2.5">
                        <p className="text-[10px] uppercase text-muted-foreground font-medium mb-1">Leves (10)</p>
                        <p className="font-bold text-yellow-700 text-sm">10,000 UTA</p>
                        <p className="text-muted-foreground">1,000 UTA máx. por infracción</p>
                      </div>
                    </div>
                    <Alert className="mt-4 border-red-200 bg-white/60">
                      <Info className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-xs text-red-800">
                        Referencia real: Albemarle multada 4,713 UTA (USD 4.1M) en oct 2025 por 2 infracciones graves. Minera Escondida: 10,000 UTA (máximo legal).
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* Matriz de Riesgo */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Matriz de Riesgo</CardTitle>
                    <CardDescription className="text-xs">Probabilidad de incumplimiento vs. severidad de sanción. Número de compromisos en cada celda.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {/* Y-axis label */}
                      <div className="flex items-center justify-center w-6 shrink-0">
                        <span className="text-[10px] text-muted-foreground font-medium tracking-wider [writing-mode:vertical-rl] rotate-180">Severidad de sanción</span>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {/* Row labels + cells */}
                        {(["Gravísima", "Grave", "Leve"] as const).map((sev, rowIdx) => {
                          const rowColors: Record<string, string> = { "Gravísima": "text-red-700", "Grave": "text-orange-700", "Leve": "text-yellow-700" };
                          return (
                            <div key={sev} className="flex gap-1.5 items-stretch">
                              <div className={`text-[10px] font-medium w-16 shrink-0 flex items-center justify-end pr-2 ${rowColors[sev]}`}>{sev}</div>
                              {(["Baja", "Media", "Alta"] as const).map((prob, colIdx) => {
                                const cell = matrizRiesgo[rowIdx][colIdx];
                                return (
                                  <div
                                    key={prob}
                                    className={`flex-1 rounded-lg border p-2 min-h-[64px] flex flex-col items-center justify-center gap-1 ${cell.color}`}
                                  >
                                    {cell.count > 0 ? (
                                      <>
                                        <span className="text-xl font-bold">{cell.count}</span>
                                        <span className="text-[9px] text-muted-foreground text-center leading-tight">{cell.ids}</span>
                                      </>
                                    ) : (
                                      <span className="text-sm text-muted-foreground/50">—</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                        {/* X-axis labels */}
                        <div className="flex gap-1.5 mt-1">
                          <div className="w-16 shrink-0" />
                          {["Baja", "Media", "Alta"].map(p => (
                            <div key={p} className="flex-1 text-center text-[10px] text-muted-foreground font-medium">{p}</div>
                          ))}
                        </div>
                        <div className="text-center text-[10px] text-muted-foreground mt-0.5">Probabilidad de incumplimiento</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-3 text-[10px] text-muted-foreground flex-wrap">
                      <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-green-100 border" />Riesgo bajo</div>
                      <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-yellow-100 border" />Riesgo medio</div>
                      <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-orange-100 border" />Riesgo alto</div>
                      <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-red-200 border" />Riesgo crítico</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Exposición por Tipo */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Exposición por Tipo de Compromiso</CardTitle>
                    <CardDescription className="text-xs">Multa máxima acumulada (UTA) según el tipo de obligación incumplida.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={exposicionTipoData} layout="vertical" margin={{ left: 110, right: 30, top: 4, bottom: 4 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <YAxis type="category" dataKey="tipo" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={110} />
                        <Tooltip
                          formatter={(value) => { const v = Number(value ?? 0); return [`${v.toLocaleString()} UTA ≈ USD ${(v * 870 / 1000000).toFixed(1)}M`, "Exposición máx."]; }}
                          contentStyle={{ fontSize: 12, borderRadius: 8 }}
                        />
                        <Bar dataKey="uta" fill="#ef4444" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Comparación con Multas Reales */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Comparación con Multas Reales del Sector</CardTitle>
                    <CardDescription className="text-xs">Sanciones aplicadas por la SMA a empresas mineras en Chile.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground">Empresa</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-16">Fecha</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground">Infracción</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-20">Tipo</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-20">UTA</th>
                            <th className="text-left px-3 py-2 font-medium text-muted-foreground w-20">USD</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {multasReales.map((m, i) => (
                            <tr key={i} className="hover:bg-muted/30 transition-colors">
                              <td className="px-3 py-2.5 font-medium">{m.empresa}</td>
                              <td className="px-3 py-2.5 text-muted-foreground">{m.fecha}</td>
                              <td className="px-3 py-2.5 text-muted-foreground">{m.infraccion}</td>
                              <td className="px-3 py-2.5">
                                <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${tipoMultaBadge[m.tipo] ?? "bg-gray-100 text-gray-600"}`}>
                                  {m.tipo}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 font-mono font-medium">{m.uta}</td>
                              <td className="px-3 py-2.5 font-mono text-muted-foreground">{m.usd}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-3 py-2 border-t">
                      <p className="text-[10px] text-muted-foreground">
                        Fuente: SNIFA — Sistema Nacional de Información de Fiscalización Ambiental (snifa.sma.gob.cl)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recomendaciones */}
                <div>
                  <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Recomendaciones Prioritarias de Mitigación
                  </p>
                  <div className="grid gap-3 md:grid-cols-3">
                    <Card className="border-red-200 bg-red-50/30">
                      <CardContent className="pt-4 pb-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs font-bold">1</span>
                          <p className="text-xs font-semibold text-red-800">Activar PAT P-12 antes de umbral</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Reduce exposición C-003 de USD 8.7M a cero si se actúa esta semana.</p>
                        <div className="rounded border border-red-200 bg-white/60 px-2 py-1">
                          <p className="text-[10px] font-medium text-red-700">Acción: Semana próxima</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-amber-200 bg-amber-50/30">
                      <CardContent className="pt-4 pb-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-bold">2</span>
                          <p className="text-xs font-semibold text-amber-800">Adjuntar evidencia a 4 compromisos</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Aumenta ETCA readiness de 64 a 78 pts. Solo requiere subir archivos existentes.</p>
                        <div className="rounded border border-amber-200 bg-white/60 px-2 py-1">
                          <p className="text-[10px] font-medium text-amber-700">Acción: 2 horas de trabajo</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-emerald-200 bg-emerald-50/30">
                      <CardContent className="pt-4 pb-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">3</span>
                          <p className="text-xs font-semibold text-emerald-800">Reducir extracción sector MOP 5%</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Aleja el límite operacional C-002. Ahorro potencial: hasta USD 17.4M en sanción máxima.</p>
                        <div className="rounded border border-emerald-200 bg-white/60 px-2 py-1">
                          <p className="text-[10px] font-medium text-emerald-700">Acción: Plan de operaciones</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

              </div>
            </TabsContent>

            {/* ── RESUMEN TAB ── */}
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
