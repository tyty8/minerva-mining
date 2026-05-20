import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Map, Layers, Download, ZoomIn, Info, Pickaxe } from "lucide-react";

const zones = [
  { id: "ZL-01", name: "Zona Norte — Alta Concentración", li: "1,340", k: "8,200", status: "prioritaria", area: "12.4 km²" },
  { id: "ZL-02", name: "Zona Central", li: "1,180", k: "7,100", status: "exploración", area: "8.7 km²" },
  { id: "ZL-03", name: "Zona Laguna Sur", li: "1,290", k: "7,800", status: "prioritaria", area: "6.2 km²" },
  { id: "ZL-04", name: "Zona Marginal Este", li: "780", k: "4,200", status: "baja prioridad", area: "15.1 km²" },
];

const layers = [
  { name: "Mapa Geológico 1:1M", source: "SERNAGEOMIN", active: true },
  { name: "Concesiones Mineras", source: "Catastro Minero", active: true },
  { name: "Zonas de Litio (IA)", source: "Minerva IA", active: true },
  { name: "Red Hídrica", source: "DGA", active: false },
  { name: "Áreas Protegidas", source: "CONAF", active: false },
  { name: "Comunidades Indígenas", source: "CONADI", active: false },
];

export default function GeologiaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mapa Geológico</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Visualización interactiva con datos de SERNAGEOMIN · Salar de Atacama y zonas aledañas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar KML
          </Button>
          <Button size="sm" className="gap-2">
            <ZoomIn className="h-4 w-4" />
            Ver en pantalla completa
          </Button>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Integración pendiente</AlertTitle>
        <AlertDescription>
          El mapa interactivo requiere una clave de API de Mapbox. Integración con WMS de SERNAGEOMIN lista para conectar.
          Los datos geológicos y zonas de litio están disponibles para visualización una vez configurado Mapbox.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Map Placeholder */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <div className="relative h-[480px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
              {/* Simulated terrain */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-amber-400 blur-3xl" />
                <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-orange-300 blur-3xl" />
                <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-amber-500 blur-2xl" />
              </div>
              {/* Zone markers */}
              <div className="absolute top-[30%] left-[35%] flex items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg animate-pulse" />
                <span className="text-xs font-medium bg-white/80 px-1.5 py-0.5 rounded shadow">ZL-01</span>
              </div>
              <div className="absolute top-[45%] left-[50%] flex items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
                <span className="text-xs font-medium bg-white/80 px-1.5 py-0.5 rounded shadow">ZL-02</span>
              </div>
              <div className="absolute top-[60%] left-[40%] flex items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg animate-pulse" />
                <span className="text-xs font-medium bg-white/80 px-1.5 py-0.5 rounded shadow">ZL-03</span>
              </div>
              <div className="absolute top-[50%] right-[25%] flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-gray-400 border-2 border-white shadow" />
                <span className="text-xs font-medium bg-white/80 px-1.5 py-0.5 rounded shadow">ZL-04</span>
              </div>
              <div className="text-center">
                <Map className="h-12 w-12 text-amber-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-amber-800">Salar de Atacama</p>
                <p className="text-xs text-amber-600/80 mt-1">23°S — 68°W · Región de Antofagasta</p>
                <p className="text-xs text-muted-foreground mt-3 bg-white/60 rounded px-3 py-1">
                  Mapa interactivo con Mapbox + SERNAGEOMIN WMS
                </p>
              </div>
              {/* Map controls mock */}
              <div className="absolute top-3 right-3 flex flex-col gap-1">
                <div className="bg-white rounded shadow p-1 text-xs font-bold w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-50">+</div>
                <div className="bg-white rounded shadow p-1 text-xs font-bold w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-50">−</div>
              </div>
              <div className="absolute bottom-3 left-3 text-xs bg-white/80 rounded px-2 py-1">
                © SERNAGEOMIN · © Mapbox · © OpenStreetMap
              </div>
            </div>
          </Card>
        </div>

        {/* Layers Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Capas Activas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {layers.map((layer) => (
                <div key={layer.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">{layer.name}</p>
                    <p className="text-xs text-muted-foreground">{layer.source}</p>
                  </div>
                  <div className={`h-3 w-3 rounded-full ${layer.active ? "bg-emerald-500" : "bg-gray-300"}`} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Pickaxe className="h-4 w-4" />
                Leyenda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-3 w-3 rounded-full bg-emerald-500 shrink-0" />
                <span>Zona prioritaria Li &gt;1,200 mg/L</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-3 w-3 rounded-full bg-blue-500 shrink-0" />
                <span>En exploración</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-3 w-3 rounded-full bg-gray-400 shrink-0" />
                <span>Baja prioridad</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Zones Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Zonas de Litio Identificadas</CardTitle>
          <CardDescription>Datos extraídos de informes geológicos por IA · Salar de Atacama</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            <div className="grid grid-cols-6 text-xs font-semibold text-muted-foreground uppercase tracking-wide py-2">
              <span>ID</span>
              <span className="col-span-2">Zona</span>
              <span>Li (mg/L)</span>
              <span>K (mg/L)</span>
              <span>Estado</span>
            </div>
            {zones.map((z) => (
              <div key={z.id} className="grid grid-cols-6 items-center py-3 text-sm">
                <span className="font-mono text-xs text-muted-foreground">{z.id}</span>
                <span className="col-span-2 font-medium">{z.name}</span>
                <span className="font-mono">{z.li}</span>
                <span className="font-mono">{z.k}</span>
                <Badge
                  variant={z.status === "prioritaria" ? "default" : z.status === "exploración" ? "secondary" : "outline"}
                  className="text-xs w-fit"
                >
                  {z.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
