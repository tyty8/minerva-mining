"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Droplets,
  AlertTriangle,
  TrendingDown,
  Upload,
  Download,
  Plus,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

const dailyData = [
  { dia: "14/05", consumo: 5200, limite: 5500, reciclado: 1800 },
  { dia: "15/05", consumo: 5050, limite: 5500, reciclado: 1900 },
  { dia: "16/05", consumo: 4980, limite: 5500, reciclado: 2100 },
  { dia: "17/05", consumo: 5320, limite: 5500, reciclado: 1750 },
  { dia: "18/05", consumo: 4760, limite: 5500, reciclado: 2200 },
  { dia: "19/05", consumo: 4820, limite: 5500, reciclado: 2350 },
  { dia: "20/05", consumo: 4650, limite: 5500, reciclado: 2400 },
];

const sourceData = [
  { fuente: "Pozo Norte", enero: 2100, febrero: 1980, marzo: 1850, abril: 1720 },
  { fuente: "Desaliniz.", enero: 1200, febrero: 1350, marzo: 1480, abril: 1600 },
  { fuente: "Reciclado", enero: 800, febrero: 950, marzo: 1100, abril: 1200 },
];

const sources = [
  {
    id: "P-01",
    name: "Pozo Atacama Norte",
    current: 1720,
    limit: 2500,
    unit: "m³/día",
    status: "normal",
    trend: -8,
  },
  {
    id: "P-04",
    name: "Pozo Atacama Sur",
    current: 680,
    limit: 800,
    unit: "m³/día",
    status: "alerta",
    trend: +12,
  },
  {
    id: "DS-01",
    name: "Planta Desalinizadora",
    current: 1480,
    limit: 1800,
    unit: "m³/día",
    status: "normal",
    trend: +5,
  },
  {
    id: "RC-01",
    name: "Agua Reciclada Proceso",
    current: 940,
    limit: 1000,
    unit: "m³/día",
    status: "alerta",
    trend: +3,
  },
];

const aiRecommendations = [
  {
    priority: "alta",
    title: "Reducir extracción Pozo P-04",
    description: "Pozo en 85% de capacidad regulatoria. Transferir 120 m³/día a planta desalinizadora para evitar sanción SERNAGEOMIN.",
    saving: "Ahorro estimado: 120 m³/día · Riesgo regulatorio: eliminado",
    implemented: false,
  },
  {
    priority: "media",
    title: "Aumentar reutilización agua proceso",
    description: "El sistema de reciclaje opera al 94% de capacidad. Instalar módulo adicional de filtración para alcanzar 1,200 m³/día.",
    saving: "Ahorro potencial: 260 m³/día · Inversión: ~US$85,000",
    implemented: false,
  },
  {
    priority: "baja",
    title: "Optimizar horario de evaporación",
    description: "Concentrar operaciones de evaporación entre 10:00-16:00 aprovecha temperatura máxima del Atacama, reduciendo tiempo de proceso 18%.",
    saving: "Reducción de consumo agua: ~5% · Sin costo de inversión",
    implemented: true,
  },
];

export default function AguaPage() {
  const priorityColor: Record<string, string> = {
    alta: "destructive",
    media: "secondary",
    baja: "outline",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión del Agua</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitoreo de consumo hídrico · Salar de Atacama · Límite diario: 5,500 m³
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Importar CSV
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Reporte
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Registrar Lectura
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Consumo Hoy", value: "4,820 m³", sub: "87% del límite diario", ok: true },
          { label: "Promedio Semana", value: "5,012 m³", sub: "91% del límite diario", ok: true },
          { label: "Agua Reciclada Hoy", value: "2,350 m³", sub: "48.8% del consumo total", ok: true },
          { label: "Días sin Alerta", value: "4 días", sub: "Última alerta: 16/05", ok: true },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{kpi.label}</p>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="consumo">
        <TabsList>
          <TabsTrigger value="consumo">Consumo Diario</TabsTrigger>
          <TabsTrigger value="fuentes">Por Fuente</TabsTrigger>
          <TabsTrigger value="ia">Recomendaciones IA</TabsTrigger>
        </TabsList>

        <TabsContent value="consumo" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Consumo vs. Límite Regulatorio (últimos 7 días)</CardTitle>
              <CardDescription>Comparación con límite SERNAGEOMIN y agua reciclada — en m³/día</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [
                      `${Number(value).toLocaleString("es-CL")} m³`,
                    ]}
                  />
                  <Legend
                    formatter={(value) =>
                      value === "consumo" ? "Consumo total" : value === "limite" ? "Límite SERNAGEOMIN" : "Agua reciclada"
                    }
                  />
                  <Line type="monotone" dataKey="consumo" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="limite" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  <Line type="monotone" dataKey="reciclado" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fuentes" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estado por Fuente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sources.map((src) => (
                  <div key={src.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{src.id}</span>
                        <span className="font-medium">{src.name}</span>
                        {src.status === "alerta" && (
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        )}
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {src.current.toLocaleString("es-CL")} / {src.limit.toLocaleString("es-CL")} {src.unit}
                      </span>
                    </div>
                    <Progress
                      value={(src.current / src.limit) * 100}
                      className={`h-2 ${
                        (src.current / src.limit) > 0.9
                          ? "[&>div]:bg-red-500"
                          : (src.current / src.limit) > 0.8
                          ? "[&>div]:bg-amber-500"
                          : "[&>div]:bg-blue-500"
                      }`}
                    />
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">
                        {Math.round((src.current / src.limit) * 100)}% del límite
                      </p>
                      <p className={`text-xs ${src.trend > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                        {src.trend > 0 ? "+" : ""}{src.trend}% vs ayer
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Evolución por Fuente (mensual)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={[
                      { mes: "Ene", pozo: 2100, desaliniz: 1200, reciclado: 800 },
                      { mes: "Feb", pozo: 1980, desaliniz: 1350, reciclado: 950 },
                      { mes: "Mar", pozo: 1850, desaliniz: 1480, reciclado: 1100 },
                      { mes: "Abr", pozo: 1720, desaliniz: 1600, reciclado: 1200 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => [`${Number(v).toLocaleString("es-CL")} m³`]} />
                    <Legend />
                    <Bar dataKey="pozo" fill="#3b82f6" name="Pozo" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="desaliniz" fill="#8b5cf6" name="Desaliniz." radius={[2, 2, 0, 0]} />
                    <Bar dataKey="reciclado" fill="#10b981" name="Reciclado" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <Alert className="mt-4">
                  <TrendingDown className="h-4 w-4 text-emerald-600" />
                  <AlertTitle className="text-sm">Tendencia positiva</AlertTitle>
                  <AlertDescription className="text-xs">
                    El consumo de pozos cayó 18% en 4 meses mientras el reciclado aumentó 50%. Buen progreso hacia la meta de 50% agua reciclada.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ia" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span>Recomendaciones generadas por IA basadas en datos históricos y límites regulatorios SERNAGEOMIN</span>
            </div>
            {aiRecommendations.map((rec, i) => (
              <Card key={i} className={rec.implemented ? "opacity-60" : ""}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={priorityColor[rec.priority] as "default" | "destructive" | "outline" | "secondary"} className="text-xs">
                          Prioridad {rec.priority}
                        </Badge>
                        {rec.implemented && (
                          <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Implementada
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium text-sm">{rec.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      <p className="text-xs text-emerald-700 bg-emerald-50 rounded px-2 py-1 mt-2 inline-block">
                        {rec.saving}
                      </p>
                    </div>
                    {!rec.implemented && (
                      <Button size="sm" variant="outline" className="shrink-0 gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Implementar
                      </Button>
                    )}
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
