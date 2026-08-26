import {
  Category,
  Subcategory,
  ActivityTag,
  FunctionTag,
  ContextTag,
  TechTag,
  CharTag,
  StageTag,
  UseCase,
} from "@/types/equipment";

export const CATEGORIES: Record<
  Category,
  { label: string; icon: string; subcategories: Subcategory[] }
> = {
  audio: {
    label: "Audio",
    icon: "🎙️",
    subcategories: [
      "microphone",
      "recorder",
      "wireless-system",
      "headphones",
      "pistol-grip",
      "extender",
    ],
  },
  video: {
    label: "Video / Streaming",
    icon: "🎬",
    subcategories: ["camera", "capture", "transmitter", "switcher"],
  },
  lentes: {
    label: "Lentes",
    icon: "🔭",
    subcategories: ["zoom", "prime"],
  },
  "camara-inmersiva": {
    label: "Cámara Inmersiva",
    icon: "🌐",
    subcategories: ["action-camera"],
  },
  vr: {
    label: "Realidad Virtual",
    icon: "🥽",
    subcategories: ["headset", "lens-accessory"],
  },
  almacenamiento: {
    label: "Almacenamiento",
    icon: "💾",
    subcategories: ["ssd", "hdd"],
  },
  computacion: {
    label: "Computación / Interfaz",
    icon: "💻",
    subcategories: ["tablet"],
  },
  alimentacion: {
    label: "Alimentación",
    icon: "🔋",
    subcategories: ["charger"],
  },
  iluminacion: {
    label: "Iluminación",
    icon: "💡",
    subcategories: ["led-panel", "ring-light", "softbox"],
  },
  produccion: {
    label: "Producción",
    icon: "🎭",
    subcategories: ["chroma"],
  },
  movimiento: {
    label: "Movimiento",
    icon: "🎥",
    subcategories: ["gimbal", "tripod"],
  },
  fotografia: {
    label: "Fotografía",
    icon: "📷",
    subcategories: ["camera", "prime", "zoom"],
  },
  conectividad: {
    label: "Conectividad",
    icon: "🔌",
    subcategories: ["cable", "adapter"],
  },
  accesorios: {
    label: "Accesorios",
    icon: "🎒",
    subcategories: ["battery", "tripod"],
  },
};

export const CATEGORY_LIST: Category[] = Object.keys(CATEGORIES) as Category[];

export const ACTIVITY_LABELS: Record<ActivityTag, string> = {
  entrevista: "Entrevista",
  podcast: "Podcast",
  documental: "Documental",
  streaming: "Streaming",
  "programa-de-radio": "Programa de Radio",
  "fotografia-de-producto": "Fotografía de Producto",
  "corto-inmersivo-3d": "Corto Inmersivo 3D",
  "corto-animado": "Corto Animado",
  "registro-de-eventos": "Registro de Eventos",
};

export const FUNCTION_LABELS: Record<FunctionTag, string> = {
  "grabar-audio": "Grabar Audio",
  "capturar-video": "Capturar Video",
  iluminar: "Iluminar",
  estabilizar: "Estabilizar",
  "grabar-voz": "Grabar Voz",
  "capturar-audio": "Capturar Audio",
  conectar: "Conectar",
  almacenar: "Almacenar",
  cargar: "Cargar",
  transmitir: "Transmitir",
  "alternar-fuentes": "Alternar Fuentes",
  "crear-ambiente": "Crear Ambiente",
  "registrar-360": "Registrar 360°",
  inmersivo: "Inmersivo",
  controlar: "Controlar",
  monitorear: "Monitorear",
  adaptar: "Adaptar",
  extender: "Extender",
};

export const CONTEXT_LABELS: Record<ContextTag, string> = {
  interior: "Interior",
  exterior: "Exterior",
  estudio: "Estudio",
  movilidad: "Movilidad",
};

export const TECH_LABELS: Record<TechTag, string> = {
  hdmi: "HDMI",
  usb: "USB",
  xlr: "XLR",
  wireless: "Wireless",
  vr: "VR",
  "360": "360°",
  "phantom-power": "Phantom Power",
  bluetooth: "Bluetooth",
  sd: "SD",
  ssd: "SSD",
  sata: "SATA",
  "usb-c": "USB-C",
  "mini-jack": "Mini Jack",
  sdxc: "SDXC",
};

export const CHAR_LABELS: Record<CharTag, string> = {
  portatil: "Portátil",
  direccional: "Direccional",
  inalambrico: "Inalámbrico",
  dinamico: "Dinámico",
  condensador: "Condensador",
  shotgun: "Shotgun",
  omnidireccional: "Omnidireccional",
  multicanal: "Multicanal",
  "4k": "4K",
  "8k": "8K",
  estabilizador: "Estabilizador",
  luminoso: "Luminoso",
  compacto: "Compacto",
  profesional: "Profesional",
};

export const STAGE_LABELS: Record<StageTag, string> = {
  captura: "Captura",
  monitoreo: "Monitoreo",
  almacenamiento: "Almacenamiento",
  transmision: "Transmisión",
  postproduccion: "Postproducción",
  carga: "Carga",
  iluminacion: "Iluminación",
};

export const USE_CASES: UseCase[] = [
  {
    id: "entrevista",
    name: "Entrevista",
    description: "Grabar una entrevista con audio y video profesional",
    icon: "🎤",
    requiredTags: {
      activity: ["entrevista"],
      function: ["grabar-audio", "capturar-video"],
      context: ["interior"],
    },
  },
  {
    id: "documental",
    name: "Documental",
    description: "Producir un documental con calidad cinematográfica",
    icon: "🎞️",
    requiredTags: {
      activity: ["documental"],
      function: ["grabar-audio", "capturar-video"],
      context: ["interior", "exterior"],
    },
  },
  {
    id: "animacion",
    name: "Animación",
    description: "Crear contenido animado con efectos especiales",
    icon: "✨",
    requiredTags: {
      activity: ["corto-animado"],
      function: ["capturar-video"],
    },
  },
  {
    id: "streaming",
    name: "Streaming",
    description: "Realizar transmisiones en vivo con calidad profesional",
    icon: "📡",
    requiredTags: {
      activity: ["streaming"],
      function: ["transmitir", "alternar-fuentes"],
    },
  },
  {
    id: "programa-de-radio",
    name: "Programa de Radio",
    description: "Producir un programa de radio o podcast radial",
    icon: "📻",
    requiredTags: {
      activity: ["programa-de-radio"],
      function: ["grabar-audio", "grabar-voz"],
      context: ["estudio"],
    },
  },
  {
    id: "fotografia-de-producto",
    name: "Fotografía de Producto",
    description: "Fotografiar productos con iluminación profesional",
    icon: "📸",
    requiredTags: {
      activity: ["fotografia-de-producto"],
      function: ["iluminar", "capturar-video"],
      context: ["estudio"],
    },
  },
  {
    id: "corto-inmersivo-3d",
    name: "Corto Inmersivo 3D",
    description: "Producir un cortometraje inmersivo en 360° o VR",
    icon: "🥽",
    requiredTags: {
      activity: ["corto-inmersivo-3d"],
      function: ["registrar-360", "inmersivo"],
    },
  },
  {
    id: "podcast",
    name: "Podcast",
    description: "Producir un podcast con audio de calidad",
    icon: "🎧",
    requiredTags: {
      activity: ["podcast"],
      function: ["grabar-audio", "grabar-voz"],
      context: ["interior"],
    },
  },
  {
    id: "corto-animado-vefx",
    name: "Corto Animado con Efectos Especiales",
    description: "Crear un corto animado con intervención de efectos especiales",
    icon: "🎬",
    requiredTags: {
      activity: ["corto-animado"],
      function: ["capturar-video", "iluminar"],
    },
  },
  {
    id: "registro-de-eventos",
    name: "Registro de Eventos",
    description: "Documentar eventos en vivo con múltiples ángulos",
    icon: "🎪",
    requiredTags: {
      activity: ["registro-de-eventos"],
      function: ["capturar-video", "grabar-audio"],
      context: ["exterior", "interior"],
    },
  },
];

export const SKILL_LABELS: Record<string, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  professional: "Profesional",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  audio: "Audio",
  video: "Video / Streaming",
  lentes: "Lentes",
  "camara-inmersiva": "Cámara Inmersiva",
  vr: "Realidad Virtual",
  almacenamiento: "Almacenamiento",
  computacion: "Computación / Interfaz",
  alimentacion: "Alimentación",
  iluminacion: "Iluminación",
  produccion: "Producción",
  movimiento: "Movimiento",
  fotografia: "Fotografía",
  conectividad: "Conectividad",
  accesorios: "Accesorios",
};
