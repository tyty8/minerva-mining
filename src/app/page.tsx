import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mountain,
  FileText,
  Droplets,
  Map,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: FileText,
    title: "Análisis de Documentos IA",
    description:
      "Sube informes geológicos, EIA y reportes SERNAGEOMIN. La IA extrae grades minerales, riesgos y estado de cumplimiento automáticamente.",
    badge: "Claude AI",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Droplets,
    title: "Optimización del Agua",
    description:
      "Monitorea el consumo hídrico en tiempo real contra los límites regulatorios. Recibe recomendaciones IA para reducir uso y evitar sanciones SERNAGEOMIN.",
    badge: "Tiempo real",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Map,
    title: "Mapa Geológico",
    description:
      "Visualización interactiva con datos de SERNAGEOMIN WMS. Identifica zonas de alta concentración de litio y superpone tus concesiones.",
    badge: "SERNAGEOMIN",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "Reportes Regulatorios",
    description:
      "Genera borradores de reportes SERNAGEOMIN, SEIA y Cochilco automáticamente. Nunca más pierdas un plazo regulatorio.",
    badge: "Automatizado",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const stats = [
  { label: "Reservas mundiales de litio en Chile", value: "33.6%" },
  { label: "Meta de producción para 2030", value: "+70%" },
  { label: "Inversión minera 2025-2033", value: "US$83B" },
  { label: "Reducción de consumo hídrico promedio", value: "12-18%" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Mountain className="h-4 w-4" />
            </div>
            <span className="font-semibold text-sm">Minerva</span>
            <Badge variant="secondary" className="text-[10px]">Beta</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Plataforma
            </Link>
            <Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }))}>
              Ingresar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <Badge variant="secondary" className="mb-6">
          <Sparkles className="h-3 w-3 mr-1" />
          IA para Minería de Litio en Chile
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
          Inteligencia artificial para la{" "}
          <span className="text-primary">minería del futuro</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          La primera plataforma IA en español diseñada para la minería de litio chilena.
          Analiza documentos, optimiza el consumo de agua y cumple con regulaciones SERNAGEOMIN — todo en un solo lugar.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
            Ver la plataforma
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Solicitar demo
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Sin costo durante la fase beta · Sin tarjeta de crédito requerida
        </p>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Todo lo que necesitas para operar con excelencia</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Cuatro módulos integrados que resuelven los mayores desafíos operacionales de la minería de litio
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`rounded-xl p-3 ${feature.bg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <Badge variant="outline" className="text-[10px]">{feature.badge}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Minerva */}
      <section className="bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold">Diseñado para la industria minera chilena</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                A diferencia de soluciones genéricas en inglés, Minerva fue construida con el contexto
                regulatorio, los desafíos hídricos y la terminología técnica de la minería de litio en Chile.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Interfaz 100% en español con terminología minera estándar",
                  "Integrado con SERNAGEOMIN, SEIA, Cochilco y DGA",
                  "Plantillas de reportes según normativa chilena vigente",
                  "Alertas calibradas para límites regulatorios Atacama",
                  "Soporte para minería de litio, cobre y exploración",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              {[
                { icon: Shield, title: "Seguridad de datos", desc: "Datos alojados en Vercel con cifrado en tránsito y en reposo. Cumplimiento GDPR y normativa chilena de datos." },
                { icon: Globe, title: "Datos gubernamentales integrados", desc: "SERNAGEOMIN WMS, Catastro Minero y Cochilco — conectados sin configuración adicional." },
                { icon: Sparkles, title: "IA en español", desc: "Análisis, resúmenes y recomendaciones generados en español chileno con terminología técnica minera." },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="flex gap-3 pt-4">
                    <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Listo para empezar</h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Únete a las empresas mineras que ya usan IA para operar con mayor eficiencia y cumplimiento.
        </p>
        <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "mt-8 gap-2 inline-flex")}>
          Ver el dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Mountain className="h-3.5 w-3.5" />
            <span>Minerva — IA para Minería</span>
          </div>
          <p>Plataforma construida sobre Vercel · Impulsada por Claude AI · Hecha en Chile</p>
        </div>
      </footer>
    </div>
  );
}
