import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings,
  Building2,
  Users,
  Key,
  Bell,
  Database,
  Plug,
  Globe,
  Shield,
  CheckCircle2,
  Clock,
  Zap,
  Plus,
} from "lucide-react";

const integrations = [
  { name: "SERNAGEOMIN WMS", description: "Mapa Geológico de Chile — capas geológicas en tiempo real", status: "conectado", icon: Globe },
  { name: "Vercel AI Gateway", description: "Claude API para análisis documental y recomendaciones IA", status: "conectado", icon: Zap },
  { name: "Catastro Minero", description: "Registro de concesiones y derechos mineros", status: "conectado", icon: Database },
  { name: "Sensores IoT (MQTT)", description: "Conexión con sensores de flujo y calidad de agua", status: "pendiente", icon: Plug },
  { name: "SAP Mining", description: "Integración con ERP para datos de producción", status: "pendiente", icon: Database },
  { name: "Cochilco API", description: "Datos de mercado y estadísticas de producción de litio", status: "pendiente", icon: Globe },
];

const team = [
  { name: "Carlos Muñoz", email: "c.munoz@sqm.cl", role: "Administrador", last: "Hoy 09:14" },
  { name: "Ana Reyes", email: "a.reyes@sqm.cl", role: "Geólogo Senior", last: "Hoy 08:32" },
  { name: "Felipe Torres", email: "f.torres@sqm.cl", role: "Ing. de Procesos", last: "Ayer 16:45" },
  { name: "María González", email: "m.gonzalez@sqm.cl", role: "Jefe de Medio Ambiente", last: "Ayer 11:20" },
];

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Administra tu empresa, equipo, integraciones y preferencias de la plataforma
        </p>
      </div>

      <Tabs defaultValue="empresa">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="empresa" className="gap-1.5">
            <Building2 className="h-3.5 w-3.5" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="equipo" className="gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Equipo
          </TabsTrigger>
          <TabsTrigger value="integraciones" className="gap-1.5">
            <Plug className="h-3.5 w-3.5" />
            Integraciones
          </TabsTrigger>
          <TabsTrigger value="alertas" className="gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Alertas
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-1.5">
            <Key className="h-3.5 w-3.5" />
            API
          </TabsTrigger>
        </TabsList>

        {/* Empresa */}
        <TabsContent value="empresa" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Información de la Empresa</CardTitle>
              <CardDescription>Datos de tu organización en la plataforma Minerva</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Razón Social", value: "SQM S.A.", id: "razon" },
                  { label: "RUT", value: "93.007.000-9", id: "rut" },
                  { label: "Faena Principal", value: "Salar de Atacama", id: "faena" },
                  { label: "Región", value: "Región de Antofagasta", id: "region" },
                  { label: "Contacto Técnico", value: "ingenieria@sqm.cl", id: "contacto" },
                  { label: "Límite Hídrico (m³/día)", value: "5,500", id: "limite" },
                ].map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {field.label}
                    </label>
                    <Input defaultValue={field.value} className="text-sm" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button size="sm">Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Información Regulatoria
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Código SERNAGEOMIN", value: "RM-2018-0041" },
                { label: "Expediente SEIA", value: "2018-0189-IV-CO" },
                { label: "Concesión DGA", value: "DGA-II-2019-089" },
                { label: "Certificación ILO 176", value: "Vigente hasta 12/2026" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-mono font-medium mt-0.5">{item.value}</p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Equipo */}
        <TabsContent value="equipo" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Miembros del Equipo</CardTitle>
                <CardDescription>Gestiona accesos y roles en tu organización</CardDescription>
              </div>
              <Button size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Invitar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {team.map((member) => (
                  <div key={member.email} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">{member.role}</Badge>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 justify-end">
                          <Clock className="h-3 w-3" />
                          {member.last}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integraciones */}
        <TabsContent value="integraciones" className="mt-4 space-y-3">
          {integrations.map((integ) => (
            <Card key={integ.name}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <integ.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{integ.name}</p>
                    <p className="text-xs text-muted-foreground">{integ.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={integ.status === "conectado" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {integ.status === "conectado" ? (
                      <><CheckCircle2 className="h-3 w-3 mr-1" />Conectado</>
                    ) : (
                      "Pendiente"
                    )}
                  </Badge>
                  <Button variant="outline" size="sm" className="text-xs">
                    {integ.status === "conectado" ? "Configurar" : "Conectar"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Alertas config */}
        <TabsContent value="alertas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preferencias de Notificación</CardTitle>
              <CardDescription>Configura cómo y cuándo recibes alertas</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Settings className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  La configuración detallada de alertas está disponible en el módulo de Alertas.
                  Aquí puedes configurar los canales de notificación globales.
                </AlertDescription>
              </Alert>
              <div className="mt-4 space-y-3">
                {["Email (c.munoz@sqm.cl)", "SMS (+56 9 1234 5678)", "Notificaciones en plataforma"].map((channel) => (
                  <div key={channel} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm">{channel}</span>
                    <Badge variant="default" className="text-xs">Activo</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API */}
        <TabsContent value="api" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Key className="h-4 w-4" />
                Claves de API
              </CardTitle>
              <CardDescription>Para integrar Minerva con sistemas externos vía REST API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Las claves de API permiten acceso programático a tus datos. Trátalas como contraseñas y no las compartas.
                </AlertDescription>
              </Alert>
              <div className="rounded-lg border p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Clave de Producción</p>
                  <p className="text-sm font-mono mt-0.5">min_live_••••••••••••••••••••••••</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs">Mostrar</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Clave
                </Button>
                <Button variant="outline" size="sm" className="text-xs text-muted-foreground">
                  Ver Documentación API
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
