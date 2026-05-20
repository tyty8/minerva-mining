import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BarChart3,
  Download,
  FileText,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  Building,
} from "lucide-react";

const reports = [
  {
    id: "RPT-2026-05",
    name: "Reporte Mensual SERNAGEOMIN — Mayo 2026",
    type: "SERNAGEOMIN",
    status: "borrador",
    due: "31/05/2026",
    generated: true,
    description: "Reporte mensual de consumo hídrico, seguridad y producción para SERNAGEOMIN",
  },
  {
    id: "EIA-2026-03",
    name: "Declaración de Impacto Ambiental — Expansión Fase III",
    type: "SEIA",
    status: "pendiente",
    due: "15/06/2026",
    generated: false,
    description: "DIA para nueva área de extracción de 6.2 km² en Zona Laguna Sur",
  },
  {
    id: "RPT-2026-04",
    name: "Reporte Mensual SERNAGEOMIN — Abril 2026",
    type: "SERNAGEOMIN",
    status: "enviado",
    due: "30/04/2026",
    generated: true,
    description: "Reporte mensual de abril — aprobado con 2 observaciones menores",
  },
  {
    id: "CIERRE-2026-01",
    name: "Plan de Cierre Faena Sur — Actualización Anual",
    type: "SERNAGEOMIN",
    status: "aprobado",
    due: "31/03/2026",
    generated: true,
    description: "Plan de cierre progresivo aprobado sin observaciones",
  },
];

const reportTypes = [
  { name: "Reporte Mensual SERNAGEOMIN", description: "Consumo hídrico, seguridad, producción", period: "Mensual" },
  { name: "Declaración de Impacto Ambiental", description: "DIA o EIA para SEIA según magnitud del proyecto", period: "Por proyecto" },
  { name: "Reporte de Seguridad ILO 176", description: "Incidentes, condiciones, capacitación", period: "Trimestral" },
  { name: "Balance Hídrico Anual", description: "Consumo, fuentes, reciclaje — para DGA", period: "Anual" },
  { name: "Informe de Producción Cochilco", description: "Producción y exportaciones de litio", period: "Mensual" },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  borrador: { label: "Borrador", variant: "secondary" },
  pendiente: { label: "Pendiente", variant: "outline" },
  enviado: { label: "Enviado", variant: "default" },
  aprobado: { label: "Aprobado", variant: "default" },
};

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reportes Regulatorios</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Generación automática de informes SERNAGEOMIN, SEIA y Cochilco con IA
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Reporte
        </Button>
      </div>

      <Alert>
        <Sparkles className="h-4 w-4 text-violet-600" />
        <AlertTitle>Generación IA disponible</AlertTitle>
        <AlertDescription>
          Minerva puede generar borradores de reportes regulatorios automáticamente usando los datos de tus documentos
          y registros de consumo. Selecciona un reporte para generar o editar.
        </AlertDescription>
      </Alert>

      {/* Upcoming deadlines */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Próximo vencimiento", value: "31/05/2026", sub: "Reporte SERNAGEOMIN Mayo", icon: Calendar, urgent: true },
          { label: "Reportes pendientes", value: "2", sub: "Requieren acción", icon: Clock, urgent: true },
          { label: "Reportes enviados", value: "8", sub: "En 2026", icon: CheckCircle2, urgent: false },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center gap-3 pt-5">
              <div className={`rounded-lg p-2 ${item.urgent ? "bg-amber-50" : "bg-emerald-50"}`}>
                <item.icon className={`h-5 w-5 ${item.urgent ? "text-amber-600" : "text-emerald-600"}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Mis Reportes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {reports.map((report) => (
              <div key={report.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2 mt-0.5">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{report.name}</p>
                      <Badge variant="outline" className="text-[10px]">
                        {report.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Vencimiento: {report.due} · ID: {report.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={statusConfig[report.status].variant} className="text-xs">
                    {statusConfig[report.status].label}
                  </Badge>
                  {report.generated ? (
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <Download className="h-3 w-3" />
                      Descargar
                    </Button>
                  ) : (
                    <Button size="sm" className="gap-1 text-xs">
                      <Sparkles className="h-3 w-3" />
                      Generar con IA
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building className="h-4 w-4" />
            Tipos de Reportes Disponibles
          </CardTitle>
          <CardDescription>Plantillas pre-configuradas según normativa chilena</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reportTypes.map((rt) => (
              <div key={rt.name} className="border rounded-lg p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium leading-snug">{rt.name}</p>
                  <Badge variant="outline" className="text-[10px] shrink-0 ml-2">{rt.period}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{rt.description}</p>
                <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs gap-1 px-2">
                  <Plus className="h-3 w-3" />
                  Crear
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
