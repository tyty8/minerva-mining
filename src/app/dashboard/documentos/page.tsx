"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  FileText, Upload, Search, Sparkles, Download, Eye,
  Trash2, MessageSquare, CheckCircle2, Clock, FileWarning,
  Bot, BarChart3, Map, Shield, Pickaxe, TrendingUp,
  AlertTriangle, BookOpen, Layers,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell,
} from "recharts";

const documents = [
  {
    id: 1,
    name: "Informe Geológico Q1 2026 — Salar Atacama",
    type: "Informe Geológico",
    pages: 84,
    date: "19/05/2026",
    status: "analizado",
    size: "12.4 MB",
    author: "Dr. C. Muñoz",
    summary: "El informe identifica 3 nuevas zonas de alta concentración de litio (>1,200 mg/L) en el sector norte del salar. Se recomienda perforación exploratoria en coordenadas UTM 19S 573,420 / 7,395,100. La zona norte presenta el mayor potencial económico con grades de hasta 1,340 mg/L de litio.",
    minerals: [
      { name: "Li", value: "1,340 mg/L", status: "óptimo" },
      { name: "K", value: "8,200 mg/L", status: "alto" },
      { name: "Mg", value: "1,100 mg/L", status: "normal" },
      { name: "B", value: "420 mg/L", status: "normal" },
      { name: "Na", value: "92,000 mg/L", status: "normal" },
    ],
    risks: [
      "Zona sísmica moderada en cuadrante NE — evaluar diseño de infraestructura",
      "Presencia de comunidades atacameñas en área de influencia — requiere consulta previa",
      "Variabilidad estacional de la salmuera en sector sur puede afectar calidad",
    ],
    recommendations: [
      "Iniciar campaña de perforación exploratoria en ZL-01 (Zona Norte)",
      "Contratar estudios sismológicos para cuadrante NE",
      "Gestionar proceso de consulta indígena con anticipación (Ley 19.253)",
    ],
    compliance: "Sin observaciones SERNAGEOMIN · Apto para trámite DGA",
    complianceScore: 95,
  },
  {
    id: 2,
    name: "EIA Expansión Fase III — SEIA",
    type: "Estudio de Impacto Ambiental",
    pages: 312,
    date: "18/05/2026",
    status: "pendiente",
    size: "48.2 MB",
    author: "Equipo Ambiental SQM",
    summary: null,
    minerals: [],
    risks: [],
    recommendations: [],
    compliance: "Pendiente de análisis",
    complianceScore: 0,
  },
  {
    id: 3,
    name: "Reporte Mensual SERNAGEOMIN — Abril",
    type: "Reporte Regulatorio",
    pages: 28,
    date: "15/05/2026",
    status: "analizado",
    size: "3.1 MB",
    author: "Dpto. Regulatorio",
    summary: "Cumplimiento general: 94%. Se detectaron 2 desviaciones menores en el registro de consumo hídrico del pozo P-07 (3 días sin reporte, posible falla de sensor). Requieren corrección en reporte de mayo para evitar observaciones formales de SERNAGEOMIN.",
    minerals: [],
    risks: [
      "Desviación en registro pozo P-07: 3 días sin datos (14-16/04)",
      "Retraso de 2 días en envío de muestras al laboratorio externo",
    ],
    recommendations: [
      "Revisar y reemplazar sensor de flujo en P-07",
      "Establecer protocolo de respaldo para envío de muestras",
      "Incluir nota aclaratoria en reporte de mayo sobre la falla del sensor",
    ],
    compliance: "2 observaciones menores — requieren corrección antes del 31/05",
    complianceScore: 78,
  },
  {
    id: 4,
    name: "Plan de Cierre Faena Sur",
    type: "Plan de Cierre",
    pages: 156,
    date: "12/05/2026",
    status: "en revisión",
    size: "22.8 MB",
    author: "Consultora AMEC Foster Wheeler",
    summary: "Plan de cierre progresivo para la faena sur. Se propone un plan de 5 años con inversión estimada de US$12.4M en rehabilitación de suelos y tratamiento de agua. Los pasivos de relaves en el depósito Norte son el principal desafío técnico.",
    minerals: [],
    risks: [
      "Pasivos ambientales en depósito de relaves Norte — concentraciones elevadas de As y metales pesados",
      "Financiamiento del 100% de las garantías SERNAGEOMIN aún pendiente",
      "Comunidades vecinas requieren información clara sobre plazos de cierre",
    ],
    recommendations: [
      "Contratar auditoría independiente de pasivos ambientales",
      "Acelerar constitución de garantías financieras (SERNAGEOMIN requiere el 30% antes del cierre)",
      "Elaborar plan de comunicación comunitaria",
    ],
    compliance: "En revisión interna — pendiente aprobación gerencia antes de envío a SERNAGEOMIN",
    complianceScore: 62,
  },
  {
    id: 5,
    name: "Estudio Hidrogeológico Maricunga",
    type: "Informe Técnico",
    pages: 97,
    date: "10/05/2026",
    status: "analizado",
    size: "18.6 MB",
    author: "Dr. A. Reyes",
    summary: "El estudio confirma un acuífero de salmuera en el Salar de Maricunga con reservas estimadas de 3.4 Mt de litio metálico. La concentración promedio es de 980 mg/L, con peaks de 1,180 mg/L en el sector central. La tasa de recarga anual es de ~2.1 km³/año.",
    minerals: [
      { name: "Li", value: "980 mg/L", status: "alto" },
      { name: "K", value: "4,100 mg/L", status: "normal" },
      { name: "Mg", value: "840 mg/L", status: "normal" },
    ],
    risks: [
      "Acuífero compartido con Argentina — podría requerir acuerdo bilateral",
      "Acceso vial limitado — altitud 3,700 msnm con problemas logísticos",
      "Zona de alto valor ecosistémico (flamingos andinos)",
    ],
    recommendations: [
      "Iniciar contacto con organismos argentinos para delimitar cuenca compartida",
      "Diseñar plan de monitoreo de fauna para evaluar impactos de extracción",
      "Explorar posibilidad de CORFO Litio para financiar exploración",
    ],
    compliance: "Sin observaciones regulatorias — acuífero no sujeto a Estrategia Nacional del Litio actual",
    complianceScore: 91,
  },
];

const docStats = [
  { mes: "Feb", analizados: 8, pendientes: 3 },
  { mes: "Mar", analizados: 12, pendientes: 2 },
  { mes: "Abr", analizados: 15, pendientes: 4 },
  { mes: "May", analizados: 12, pendientes: 2 },
];

const docTypes = [
  { name: "Informes Geológicos", value: 18, color: "#f59e0b" },
  { name: "Reportes SERNAGEOMIN", value: 14, color: "#3b82f6" },
  { name: "EIA / SEIA", value: 6, color: "#8b5cf6" },
  { name: "Planes de Cierre", value: 5, color: "#ef4444" },
  { name: "Informes Técnicos", value: 4, color: "#10b981" },
];

const statusConfig: Record<string, { variant: "default" | "outline" | "secondary"; color: string }> = {
  analizado: { variant: "default", color: "text-emerald-600" },
  pendiente: { variant: "outline", color: "text-amber-600" },
  "en revisión": { variant: "secondary", color: "text-blue-600" },
};

export default function DocumentosPage() {
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(documents[0]);
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-violet-600" />
            Análisis de Documentos IA
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sube informes técnicos, geológicos y regulatorios para extracción automática con Claude AI
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Subir Documento
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total documentos", value: "47", icon: FileText, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Analizados", value: "39", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pendientes", value: "5", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Con observaciones", value: "3", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 pt-4 pb-4">
              <div className={`rounded-lg p-2 ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="documentos">
        <TabsList>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="documentos" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-5">
            {/* Left: Document list */}
            <div className="lg:col-span-2 space-y-3">
              {/* Upload Zone */}
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-6 text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer">
                <Upload className="h-7 w-7 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium text-sm">Arrastra o haz clic para subir</p>
                <p className="text-xs text-muted-foreground mt-0.5">PDF, Word · hasta 50 MB</p>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-8 text-sm" placeholder="Buscar documentos..." />
              </div>

              {/* Document list */}
              <div className="space-y-1.5">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`rounded-lg border p-3 cursor-pointer transition-all hover:bg-muted/30 ${selectedDoc?.id === doc.id ? "border-primary/50 bg-primary/5 shadow-sm" : ""}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="rounded-md bg-violet-100 p-1.5 shrink-0 mt-0.5">
                        <FileText className="h-4 w-4 text-violet-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold leading-snug line-clamp-2">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={statusConfig[doc.status].variant} className="text-[10px] h-4 px-1">
                            {doc.status}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">{doc.pages} págs · {doc.size}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{doc.date} · {doc.author}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Document detail */}
            <div className="lg:col-span-3">
              {selectedDoc ? (
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-[10px]">{selectedDoc.type}</Badge>
                          <Badge variant={statusConfig[selectedDoc.status].variant} className="text-[10px]">
                            {selectedDoc.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-sm leading-snug">{selectedDoc.name}</CardTitle>
                        <CardDescription className="text-xs mt-0.5">
                          {selectedDoc.pages} páginas · {selectedDoc.size} · {selectedDoc.author} · {selectedDoc.date}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedDoc.status === "pendiente" ? (
                      <div className="rounded-xl border-2 border-dashed p-10 text-center">
                        <Bot className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
                        <p className="font-medium">Pendiente de análisis</p>
                        <p className="text-xs text-muted-foreground mt-1">Este documento aún no fue procesado por la IA</p>
                        <Button className="mt-4 gap-2"><Sparkles className="h-4 w-4" />Analizar con Claude AI</Button>
                      </div>
                    ) : (
                      <>
                        {/* Compliance score */}
                        <div className="rounded-lg bg-muted/30 p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                              <Shield className="h-3.5 w-3.5" />
                              Cumplimiento Regulatorio
                            </p>
                            <span className={`text-sm font-bold ${selectedDoc.complianceScore >= 90 ? "text-emerald-600" : selectedDoc.complianceScore >= 70 ? "text-amber-600" : "text-red-600"}`}>
                              {selectedDoc.complianceScore}%
                            </span>
                          </div>
                          <Progress value={selectedDoc.complianceScore} className={`h-2 ${selectedDoc.complianceScore >= 90 ? "[&>div]:bg-emerald-500" : selectedDoc.complianceScore >= 70 ? "[&>div]:bg-amber-500" : "[&>div]:bg-red-500"}`} />
                          <p className="text-xs text-muted-foreground mt-1.5">{selectedDoc.compliance}</p>
                        </div>

                        {/* Summary */}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
                            <Sparkles className="h-3.5 w-3.5 text-violet-500" />Resumen Ejecutivo IA
                          </p>
                          <p className="text-sm leading-relaxed text-foreground/90">{selectedDoc.summary}</p>
                        </div>

                        {/* Minerals */}
                        {selectedDoc.minerals.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
                              <Pickaxe className="h-3.5 w-3.5 text-amber-500" />Concentraciones Minerales
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {selectedDoc.minerals.map((m) => (
                                <div key={m.name} className="rounded-lg border bg-muted/20 p-2 text-center">
                                  <p className="text-xs font-semibold text-muted-foreground">{m.name}</p>
                                  <p className="text-sm font-bold font-mono mt-0.5">{m.value}</p>
                                  <Badge variant="outline" className="text-[10px] mt-1">{m.status}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Risks & Recs in 2 cols */}
                        <div className="grid grid-cols-2 gap-3">
                          {selectedDoc.risks.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
                                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />Factores de Riesgo
                              </p>
                              <ul className="space-y-1">
                                {selectedDoc.risks.map((r, i) => (
                                  <li key={i} className="text-xs flex items-start gap-1.5 text-foreground/80">
                                    <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>{r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {selectedDoc.recommendations.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
                                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />Recomendaciones
                              </p>
                              <ul className="space-y-1">
                                {selectedDoc.recommendations.map((r, i) => (
                                  <li key={i} className="text-xs flex items-start gap-1.5 text-foreground/80">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">→</span>{r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <Separator />

                        {/* Chat */}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />Consultar en español
                          </p>
                          <div className="rounded-lg bg-muted/30 border p-3 mb-2 space-y-2">
                            <div className="flex gap-2">
                              <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                                <Bot className="h-3 w-3" />
                              </div>
                              <p className="text-xs italic text-muted-foreground">¿Cuáles son las zonas de mayor concentración de litio?</p>
                            </div>
                            <div className="flex gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles className="h-3 w-3 text-primary-foreground" />
                              </div>
                              <p className="text-xs">Se identificaron 3 zonas prioritarias: Zona Norte (1,340 mg/L), Zona Laguna (1,290 mg/L) y Zona Central (1,180 mg/L). La Zona Norte es la más relevante para exploración adicional según el informe.</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Input placeholder="Haz una pregunta sobre este documento..." className="text-xs" value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
                            <Button size="sm" className="gap-1 shrink-0 text-xs"><Sparkles className="h-3 w-3" />Preguntar</Button>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="rounded-xl border-2 border-dashed p-16 text-center text-muted-foreground">
                  <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>Selecciona un documento para ver el análisis IA</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="estadisticas" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Documentos procesados por mes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={docStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="analizados" fill="#8b5cf6" name="Analizados" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="pendientes" fill="#e5e7eb" name="Pendientes" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Por tipo de documento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={docTypes} cx="50%" cy="50%" outerRadius={55} dataKey="value" strokeWidth={2}>
                      {docTypes.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v, n) => [v, n]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {docTypes.map((t) => (
                    <div key={t.name} className="flex items-center gap-2 text-xs">
                      <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: t.color }} />
                      <span className="flex-1 text-muted-foreground truncate">{t.name}</span>
                      <span className="font-bold">{t.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Puntuaciones de cumplimiento por documento (analizados)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {documents.filter(d => d.complianceScore > 0).map((d) => (
                    <div key={d.id}>
                      <div className="flex justify-between mb-1 text-xs">
                        <span className="font-medium truncate pr-4">{d.name}</span>
                        <span className={`font-bold shrink-0 ${d.complianceScore >= 90 ? "text-emerald-600" : d.complianceScore >= 70 ? "text-amber-600" : "text-red-600"}`}>{d.complianceScore}%</span>
                      </div>
                      <Progress value={d.complianceScore} className={`h-1.5 ${d.complianceScore >= 90 ? "[&>div]:bg-emerald-500" : d.complianceScore >= 70 ? "[&>div]:bg-amber-500" : "[&>div]:bg-red-500"}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
