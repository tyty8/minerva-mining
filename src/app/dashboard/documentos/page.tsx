"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText,
  Upload,
  Search,
  Sparkles,
  Download,
  Eye,
  Trash2,
  MessageSquare,
  CheckCircle2,
  Clock,
  FileWarning,
  Bot,
} from "lucide-react";

const documents = [
  {
    id: 1,
    name: "Informe Geológico Q1 2026 — Salar Atacama",
    type: "Informe Geológico",
    pages: 84,
    date: "19/05/2026",
    status: "analizado",
    summary: "El informe identifica 3 nuevas zonas de alta concentración de litio (>1,200 mg/L) en el sector norte del salar. Se recomienda perforación exploratoria en coordenadas UTM 19S 573,420 / 7,395,100.",
    minerals: ["Li: 1,340 mg/L", "K: 8,200 mg/L", "Mg: 1,100 mg/L"],
    risks: ["Zona sísmica moderada en cuadrante NE", "Presencia de comunidades atacameñas en área de influencia"],
    compliance: "Sin observaciones SERNAGEOMIN",
  },
  {
    id: 2,
    name: "EIA Expansión Fase III — SEIA",
    type: "Estudio de Impacto Ambiental",
    pages: 312,
    date: "18/05/2026",
    status: "pendiente",
    summary: null,
    minerals: [],
    risks: [],
    compliance: "Pendiente de análisis",
  },
  {
    id: 3,
    name: "Reporte Mensual SERNAGEOMIN — Abril",
    type: "Reporte Regulatorio",
    pages: 28,
    date: "15/05/2026",
    status: "analizado",
    summary: "Cumplimiento general: 94%. Se detectaron 2 desviaciones menores en el registro de consumo hídrico del pozo P-07. Requieren corrección antes del reporte de mayo.",
    minerals: [],
    risks: ["Desviación en registro pozo P-07 (consumo no registrado 3 días)"],
    compliance: "2 observaciones menores — requieren corrección",
  },
  {
    id: 4,
    name: "Plan de Cierre Faena Sur",
    type: "Plan de Cierre",
    pages: 156,
    date: "12/05/2026",
    status: "en revisión",
    summary: "Plan de cierre progresivo para la faena sur. Se propone un plan de 5 años con inversión estimada de US$12.4M en rehabilitación de suelos y tratamiento de agua.",
    minerals: [],
    risks: ["Pasivos ambientales en depósito de relaves Norte"],
    compliance: "En revisión interna antes de envío a SERNAGEOMIN",
  },
];

export default function DocumentosPage() {
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(null);
  const [chatInput, setChatInput] = useState("");

  const statusColor: Record<string, string> = {
    analizado: "default",
    pendiente: "outline",
    "en revisión": "secondary",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Análisis de Documentos</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sube informes técnicos, geológicos y regulatorios para análisis automático con IA
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Subir Documento
        </Button>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 text-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium text-sm">Arrastra documentos aquí o haz clic para seleccionar</p>
        <p className="text-xs text-muted-foreground mt-1">PDF, Word, Excel — hasta 50 MB por archivo</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Tipos aceptados: Informes geológicos · EIA / SEIA · Reportes SERNAGEOMIN · Planes de cierre · Informes técnicos
        </p>
        <Alert className="mt-4 text-left max-w-md mx-auto">
          <Bot className="h-4 w-4" />
          <AlertDescription className="text-xs">
            La IA extrae automáticamente: grades de mineral, formaciones geológicas, factores de riesgo, estado de cumplimiento y recomendaciones operacionales.
          </AlertDescription>
        </Alert>
      </div>

      <Tabs defaultValue="todos">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="todos">Todos (4)</TabsTrigger>
            <TabsTrigger value="analizado">Analizados (2)</TabsTrigger>
            <TabsTrigger value="pendiente">Pendientes (1)</TabsTrigger>
            <TabsTrigger value="revision">En Revisión (1)</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8 w-64 h-8 text-sm" placeholder="Buscar documentos..." />
          </div>
        </div>

        <TabsContent value="todos" className="mt-4">
          <div className="grid gap-3">
            {documents.map((doc) => (
              <Card
                key={doc.id}
                className={`cursor-pointer transition-colors hover:bg-muted/30 ${
                  selectedDoc?.id === doc.id ? "border-primary/50 bg-muted/20" : ""
                }`}
                onClick={() => setSelectedDoc(doc)}
              >
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-violet-100 p-2">
                      <FileText className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{doc.type}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{doc.pages} págs.</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusColor[doc.status] as "default" | "outline" | "secondary"} className="text-xs">
                      {doc.status === "analizado" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {doc.status === "pendiente" && <Clock className="h-3 w-3 mr-1" />}
                      {doc.status === "en revisión" && <FileWarning className="h-3 w-3 mr-1" />}
                      {doc.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["analizado", "pendiente", "revision"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <p className="text-sm text-muted-foreground">Filtro por estado aplicado.</p>
          </TabsContent>
        ))}
      </Tabs>

      {/* Document Detail Panel */}
      {selectedDoc && (
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-600" />
                  Análisis IA — {selectedDoc.name}
                </CardTitle>
                <CardDescription className="mt-1">{selectedDoc.compliance}</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Download className="h-3 w-3" />
                Exportar Resumen
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDoc.status === "pendiente" ? (
              <div className="rounded-lg border-2 border-dashed p-8 text-center text-muted-foreground">
                <Bot className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">Documento pendiente de análisis</p>
                <p className="text-xs mt-1">Haz clic en "Analizar con IA" para procesarlo</p>
                <Button className="mt-4 gap-2" size="sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Analizar con IA
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Resumen Ejecutivo
                  </p>
                  <p className="text-sm leading-relaxed">{selectedDoc.summary}</p>
                </div>

                {selectedDoc.minerals.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Concentraciones Minerales
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoc.minerals.map((m) => (
                        <Badge key={m} variant="secondary" className="font-mono text-xs">
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDoc.risks.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Factores de Riesgo Identificados
                    </p>
                    <ul className="space-y-1">
                      {selectedDoc.risks.map((r) => (
                        <li key={r} className="text-sm flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">⚠</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Chat with document */}
                <div className="border rounded-lg p-4 bg-muted/20">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Consultar documento en español
                  </p>
                  <div className="rounded-lg bg-background border p-3 mb-3 text-sm text-muted-foreground italic">
                    <Bot className="h-3.5 w-3.5 inline mr-1" />
                    ¿Cuáles son las zonas de mayor concentración de litio identificadas en este informe?
                    <div className="mt-2 text-foreground not-italic">
                      Según el informe, se identificaron 3 zonas de alta concentración: Sector Norte (1,340 mg/L), Sector Central (1,180 mg/L) y Zona Laguna (1,290 mg/L). La zona norte presenta la mayor concentración y es la prioritaria para exploración adicional.
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Haz una pregunta sobre este documento..."
                      className="text-sm"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                    />
                    <Button size="sm" className="gap-1 shrink-0">
                      <Sparkles className="h-3.5 w-3.5" />
                      Preguntar
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Impulsado por Claude — Vercel AI Gateway
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
