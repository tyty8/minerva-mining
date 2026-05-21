import Anthropic from "@anthropic-ai/sdk";
import type { ContentBlockParam } from "@anthropic-ai/sdk/resources/messages";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Eres un experto en derecho ambiental y minero chileno, especializado en análisis de Resoluciones de Calificación Ambiental (RCA) emitidas por el SEA (Servicio de Evaluación Ambiental).

Tu tarea es extraer TODAS las obligaciones y compromisos ambientales del documento RCA proporcionado y estructurarlos en formato JSON.

Para cada obligación encontrada, extrae:
- id: un identificador único secuencial (C-001, C-002, etc.)
- seccion: la sección del RCA donde se encuentra (ej: "§8.2.3")
- texto: el texto literal de la obligación (máximo 300 caracteres, resumido si es más largo)
- tipo: categoría de la obligación. Debe ser uno de: "Monitoreo", "Reporte", "Límite Operacional", "Plan de Contingencia", "Diseño/Ingeniería", "Capacitación", "Prohibición"
- responsable: área responsable sugerida (ej: "Medio Ambiente", "Hidrogeología", "Seguridad", "Operaciones", "Gerencia")
- frecuencia: periodicidad. Uno de: "Diaria", "Semanal", "Mensual", "Trimestral", "Semestral", "Anual", "Continua", "Por evento", "Única vez"
- canal: canal de reporte. Uno de: "SMA", "SEA", "DGA", "SERNAGEOMIN", "Interno", "SMA + SEA", "DGA + SMA"
- umbral: valor límite o umbral si aplica (ej: "≤ 240 L/s", "≤ -32 m", "< 90% capacidad"), o null si no aplica
- plazo_dias: días de anticipación para la siguiente entrega desde hoy, estimado según frecuencia. Usa un número entre 1 y 365.
- criticidad: "Alta", "Media", "Baja" según el impacto de incumplimiento

Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "proyecto": "nombre del proyecto extraído del RCA",
  "titular": "nombre de la empresa titular",
  "numero_rca": "número/código de la RCA",
  "fecha_rca": "fecha de emisión",
  "total_compromisos": número,
  "compromisos": [array de objetos con los campos descritos arriba]
}

Si el documento no es una RCA o no contiene obligaciones claras, devuelve:
{"error": "El documento no parece ser una RCA válida o no contiene obligaciones identificables"}`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No se proporcionó archivo" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return Response.json({ error: "El archivo debe ser un PDF" }, { status: 400 });
    }

    if (file.size > 20 * 1024 * 1024) {
      return Response.json({ error: "El archivo no puede superar 20MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const content: ContentBlockParam[] = [
      {
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: base64,
        },
      } as ContentBlockParam,
      {
        type: "text",
        text: "Analiza este documento RCA y extrae todas las obligaciones y compromisos ambientales en el formato JSON especificado. Sé exhaustivo — extrae TODAS las obligaciones, incluyendo las de monitoreo, reporte, límites operacionales y planes de contingencia.",
      },
    ];

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    });

    const firstBlock = response.content[0];
    if (firstBlock.type !== "text") {
      return Response.json({ error: "Respuesta inesperada del modelo" }, { status: 500 });
    }

    // strip markdown code fences if present
    const raw = firstBlock.text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    try {
      const parsed = JSON.parse(raw);
      return Response.json(parsed);
    } catch {
      return Response.json({ error: "El modelo no devolvió JSON válido", raw: firstBlock.text.slice(0, 500) }, { status: 500 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return Response.json({ error: message }, { status: 500 });
  }
}
