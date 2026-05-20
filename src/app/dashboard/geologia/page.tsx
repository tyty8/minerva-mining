"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Map, Layers, Download, ZoomIn, Info, Pickaxe,
  Mountain, TrendingUp, BarChart3, Globe, Activity,
} from "lucide-react";
import {
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis,
} from "recharts";

const zones = [
  { id: "ZL-01", name: "Zona Norte", li: 1340, k: 8200, mg: 1100, area: 12.4, depth: 42, status: "prioritaria", rank: 1 },
  { id: "ZL-03", name: "Zona Laguna Sur", li: 1290, k: 7800, mg: 980, area: 6.2, depth: 38, status: "prioritaria", rank: 2 },
  { id: "ZL-02", name: "Zona Central", li: 1180, k: 7100, mg: 870, area: 8.7, depth: 55, status: "exploración", rank: 3 },
  { id: "ZL-05", name: "Zona Maricunga Norte", li: 980, k: 4100, mg: 640, area: 21.0, depth: 68, status: "exploración", rank: 4 },
  { id: "ZL-04", name: "Zona Marginal Este", li: 780, k: 4200, mg: 520, area: 15.1, depth: 72, status: "baja prioridad", rank: 5 },
  { id: "ZL-06", name: "Zona Sur Profunda", li: 640, k: 3200, mg: 480, area: 9.3, depth: 95, status: "baja prioridad", rank: 6 },
];

const scatterData = zones.map(z => ({ x: z.depth, y: z.li, name: z.name, area: z.area }));

const gradeHistory = [
  { año: "2020", promedio: 980, maximo: 1120 },
  { año: "2021", promedio: 1020, maximo: 1180 },
  { año: "2022", promedio: 1080, maximo: 1240 },
  { año: "2023", promedio: 1140, maximo: 1290 },
  { año: "2024", promedio: 1210, maximo: 1320 },
  { año: "2025", promedio: 1260, maximo: 1340 },
];

const layersConfig = [
  { name: "Mapa Geológico 1:1M", source: "SERNAGEOMIN WMS", active: true, color: "bg-amber-500" },
  { name: "Concesiones Mineras", source: "Catastro Minero", active: true, color: "bg-blue-500" },
  { name: "Zonas de Litio (IA)", source: "Minerva IA", active: true, color: "bg-emerald-500" },
  { name: "Gradiente Litio", source: "Análisis geoquímico", active: true, color: "bg-violet-500" },
  { name: "Red Hídrica", source: "DGA Chile", active: false, color: "bg-cyan-500" },
  { name: "Áreas Protegidas", source: "CONAF", active: false, color: "bg-green-500" },
  { name: "Comunidades Indígenas", source: "CONADI", active: false, color: "bg-red-500" },
  { name: "Sismos (últimos 5 años)", source: "CSN Chile", active: false, color: "bg-orange-500" },
];

const radarZones = [
  { kpi: "Grade Li", a: 100, b: 96, c: 88 },
  { kpi: "Volumen", a: 59, b: 50, c: 69 },
  { kpi: "Profundidad", a: 85, b: 92, c: 74 },
  { kpi: "Acceso", a: 90, b: 70, c: 80 },
  { kpi: "Mg/Li ratio", a: 88, b: 84, c: 86 },
  { kpi: "Recarga", a: 72, b: 65, c: 78 },
];

const formations = [
  { name: "Halita (NaCl)", depth: "0–18 m", thickness: "18 m", li: "N/A", relevance: "Cobertura" },
  { name: "Salmuera Superficial", depth: "18–42 m", thickness: "24 m", li: "1,340 mg/L", relevance: "Producción principal" },
  { name: "Andesita Alterada", depth: "42–68 m", thickness: "26 m", li: "820 mg/L", relevance: "Producción secundaria" },
  { name: "Ignimbrita Compacta", depth: "68–95 m", thickness: "27 m", li: "320 mg/L", relevance: "Roca base" },
  { name: "Basamento Granítico", depth: "> 95 m", thickness: "—", li: "< 100 mg/L", relevance: "Sin potencial" },
];

export default function GeologiaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Mountain className="h-6 w-6 text-amber-600" />
            Mapa Geológico
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Visualización interactiva · SERNAGEOMIN WMS · Salar de Atacama y Maricunga · 6 zonas de litio identificadas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />KML/Shapefile</Button>
          <Button size="sm" className="gap-2"><ZoomIn className="h-4 w-4" />Pantalla completa</Button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Zonas identificadas", value: "6", sub: "2 prioritarias", icon: Map, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Grade máximo Li", value: "1,340 mg/L", sub: "Zona Norte ZL-01", icon: Pickaxe, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Área total concesiones", value: "72.7 km²", sub: "Salar Atacama + Maricunga", icon: Globe, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Reservas estimadas", value: "3.4 Mt Li", sub: "Recursos indicados JORC", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent className="flex items-center gap-3 pt-5 pb-4">
              <div className={`rounded-lg p-2 ${k.bg}`}><k.icon className={`h-5 w-5 ${k.color}`} /></div>
              <div>
                <p className="text-lg font-bold leading-none">{k.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
                <p className="text-[10px] text-muted-foreground">{k.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Mapa interactivo pendiente de configuración</AlertTitle>
        <AlertDescription className="text-xs">
          Requiere API key de Mapbox. La integración WMS de SERNAGEOMIN está preconfigurada. Una vez conectado, el mapa mostrará capas geológicas en tiempo real sobre las coordenadas del Salar de Atacama (23°S, 68°W).
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="mapa">
        <TabsList>
          <TabsTrigger value="mapa">Vista de Mapa</TabsTrigger>
          <TabsTrigger value="zonas">Zonas de Litio</TabsTrigger>
          <TabsTrigger value="columna">Columna Estratigráfica</TabsTrigger>
          <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
        </TabsList>

        {/* MAP TAB */}
        <TabsContent value="mapa" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <div className="relative h-[500px] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
                  {/* Simulated terrain */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-amber-200/40 blur-3xl" />
                    <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-orange-200/30 blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-amber-300/40 blur-2xl" />
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-yellow-300/50 blur-2xl" />
                    {/* Salar outline */}
                    <div className="absolute top-[20%] left-[20%] right-[25%] bottom-[25%] border-2 border-amber-400/30 rounded-3xl bg-amber-100/20" />
                  </div>

                  {/* Zone markers */}
                  {[
                    { id: "ZL-01", top: "28%", left: "32%", color: "bg-emerald-500", pulse: true },
                    { id: "ZL-02", top: "45%", left: "50%", color: "bg-blue-500", pulse: false },
                    { id: "ZL-03", top: "58%", left: "38%", color: "bg-emerald-500", pulse: true },
                    { id: "ZL-04", top: "52%", left: "65%", color: "bg-gray-400", pulse: false },
                    { id: "ZL-05", top: "20%", left: "60%", color: "bg-blue-400", pulse: false },
                    { id: "ZL-06", top: "72%", left: "48%", color: "bg-gray-400", pulse: false },
                  ].map((m) => (
                    <div key={m.id} className="absolute flex items-center gap-1" style={{ top: m.top, left: m.left }}>
                      <div className={`h-4 w-4 rounded-full ${m.color} border-2 border-white shadow-lg ${m.pulse ? "animate-pulse" : ""}`} />
                      <span className="text-[10px] font-bold bg-white/90 px-1.5 py-0.5 rounded shadow">{m.id}</span>
                    </div>
                  ))}

                  {/* Center label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4">
                      <Mountain className="h-8 w-8 text-amber-500 mx-auto mb-1" />
                      <p className="text-sm font-bold text-amber-900">Salar de Atacama</p>
                      <p className="text-xs text-amber-700">23°S — 68°W · 2,305 msnm</p>
                    </div>
                  </div>

                  {/* Map controls */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {["+", "−"].map(c => (
                      <div key={c} className="bg-white rounded shadow px-2 py-1 text-xs font-bold cursor-pointer hover:bg-gray-50 text-center w-7 h-7 flex items-center justify-center">{c}</div>
                    ))}
                  </div>

                  {/* Scale bar */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] bg-white/80 px-2 py-1 rounded">
                    <div className="h-0.5 w-12 bg-foreground" />
                    <span>10 km</span>
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] bg-white/80 px-2 py-1 rounded">
                    © SERNAGEOMIN · © Mapbox · © OpenStreetMap
                  </div>
                </div>
              </Card>
            </div>

            {/* Layers panel */}
            <div className="space-y-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Layers className="h-4 w-4" />Capas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {layersConfig.map((layer) => (
                    <div key={layer.name} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`h-2.5 w-2.5 rounded-sm shrink-0 ${layer.active ? layer.color : "bg-gray-200"}`} />
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate">{layer.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{layer.source}</p>
                        </div>
                      </div>
                      <div className={`h-2 w-2 rounded-full shrink-0 ${layer.active ? "bg-emerald-500" : "bg-gray-300"}`} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Leyenda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {[
                    { color: "bg-emerald-500", label: "Li > 1,200 mg/L · Prioritaria" },
                    { color: "bg-blue-500", label: "Li 900-1,200 mg/L · Exploración" },
                    { color: "bg-gray-400", label: "Li < 900 mg/L · Baja prioridad" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-2 text-xs">
                      <div className={`h-3 w-3 rounded-full ${l.color} shrink-0`} />
                      <span className="text-muted-foreground">{l.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ZONAS TAB */}
        <TabsContent value="zonas" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Concentración de Li vs. Profundidad del acuífero</CardTitle>
                <CardDescription className="text-xs">Cada burbuja = una zona · tamaño = área en km²</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="x" name="Profundidad (m)" tick={{ fontSize: 11 }} label={{ value: "Profundidad (m)", position: "insideBottom", offset: -5, fontSize: 10 }} />
                    <YAxis dataKey="y" name="Li (mg/L)" tick={{ fontSize: 11 }} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(v, n) => [n === "x" ? `${v} m` : `${Number(v).toLocaleString("es-CL")} mg/L`, n === "x" ? "Profundidad" : "Li"]} />
                    <Scatter data={scatterData} fill="#f59e0b" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Comparativa Top 3 Zonas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarZones}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="kpi" tick={{ fontSize: 9 }} />
                    <Radar name="ZL-01" dataKey="a" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
                    <Radar name="ZL-03" dataKey="b" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                    <Radar name="ZL-02" dataKey="c" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="flex gap-3 text-[10px] justify-center mt-1">
                  {[{ name: "ZL-01", color: "#f59e0b" }, { name: "ZL-03", color: "#3b82f6" }, { name: "ZL-02", color: "#10b981" }].map(z => (
                    <div key={z.name} className="flex items-center gap-1"><div className="h-2 w-2 rounded-full" style={{ background: z.color }} />{z.name}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Detalle de Zonas de Litio Identificadas</CardTitle>
              <CardDescription className="text-xs">Ordenadas por potencial económico estimado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                <div className="grid grid-cols-8 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide py-2">
                  <span>#</span><span>ID</span><span className="col-span-2">Zona</span><span>Li (mg/L)</span><span>K (mg/L)</span><span>Área</span><span>Estado</span>
                </div>
                {zones.map((z) => (
                  <div key={z.id} className="grid grid-cols-8 items-center py-3 text-xs">
                    <span className="text-muted-foreground font-mono">{z.rank}</span>
                    <span className="font-mono text-muted-foreground bg-muted px-1 rounded text-[10px] w-fit">{z.id}</span>
                    <span className="col-span-2 font-medium">{z.name}</span>
                    <span className={`font-mono font-bold ${z.li >= 1200 ? "text-emerald-700" : z.li >= 900 ? "text-blue-700" : "text-muted-foreground"}`}>
                      {z.li.toLocaleString("es-CL")}
                    </span>
                    <span className="font-mono">{z.k.toLocaleString("es-CL")}</span>
                    <span>{z.area} km²</span>
                    <Badge variant={z.status === "prioritaria" ? "default" : z.status === "exploración" ? "secondary" : "outline"} className="text-[10px] w-fit">
                      {z.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* COLUMNA ESTRATIGRÁFICA */}
        <TabsContent value="columna" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Columna Estratigráfica — Perforación ZL-01 Norte</CardTitle>
                <CardDescription className="text-xs">Sondaje ER-2026-04 · Profundidad total: 95 m</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1.5">
                  {formations.map((f, i) => (
                    <div key={i} className={`rounded-lg border p-3 ${i === 1 ? "border-emerald-200 bg-emerald-50" : i === 2 ? "border-blue-100 bg-blue-50/50" : ""}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold">{f.name}</p>
                          <p className="text-[11px] text-muted-foreground">{f.depth} · Espesor: {f.thickness}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-bold font-mono ${f.li !== "N/A" && f.li !== "< 100 mg/L" ? "text-emerald-700" : "text-muted-foreground"}`}>{f.li}</p>
                          <p className="text-[10px] text-muted-foreground">{f.relevance}</p>
                        </div>
                      </div>
                      {i === 1 && (
                        <div className="mt-2">
                          <Progress value={100} className="h-1.5 [&>div]:bg-emerald-500" />
                          <p className="text-[10px] text-emerald-700 mt-0.5">Zona de producción principal — Grade óptimo</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Li por formación (mg/L)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={formations.filter(f => f.li !== "N/A").map(f => ({ name: f.name.split(" ").slice(0, 2).join(" "), li: parseInt(f.li) || 0 }))} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={80} />
                    <Tooltip formatter={(v) => [`${Number(v).toLocaleString("es-CL")} mg/L`]} />
                    <Bar dataKey="li" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Li" />
                  </BarChart>
                </ResponsiveContainer>
                <Separator className="my-3" />
                <Alert className="border-emerald-200 bg-emerald-50">
                  <Activity className="h-4 w-4 text-emerald-600" />
                  <AlertDescription className="text-xs text-emerald-700">
                    La Salmuera Superficial (18-42 m) presenta el mayor grade. La relación Mg/Li de 0.82 es favorable para el proceso de extracción.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TENDENCIAS TAB */}
        <TabsContent value="tendencias" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-amber-600" />
                  Evolución del Grade de Litio 2020–2025
                </CardTitle>
                <CardDescription className="text-xs">Promedio y máximo de todas las zonas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={gradeHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="año" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} domain={[800, 1400]} />
                    <Tooltip formatter={(v) => [`${Number(v).toLocaleString("es-CL")} mg/L`]} />
                    <Bar dataKey="promedio" fill="#f59e0b" name="Promedio" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="maximo" fill="#fde68a" name="Máximo" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Indicadores del Salar 2026</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Saturación de la salmuera (NaCl)", value: 94, unit: "%", color: "amber" },
                  { label: "Nivel del acuífero vs. 2020", value: 82, unit: "% (–18%)", color: "blue" },
                  { label: "Tasa de recarga anual", value: 67, unit: "% de extracción", color: "emerald" },
                  { label: "Variabilidad estacional del grade", value: 12, unit: "% coeficiente variación", color: "violet" },
                  { label: "Confianza en reservas estimadas", value: 88, unit: "% (JORC Indicado)", color: "emerald" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-bold">{item.value} {item.unit}</span>
                    </div>
                    <Progress value={item.value} className={`h-1.5 ${item.color === "amber" ? "[&>div]:bg-amber-500" : item.color === "blue" ? "[&>div]:bg-blue-500" : item.color === "violet" ? "[&>div]:bg-violet-500" : "[&>div]:bg-emerald-500"}`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
