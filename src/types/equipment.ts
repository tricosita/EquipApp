export type Category =
  | "audio"
  | "video"
  | "lentes"
  | "camara-inmersiva"
  | "vr"
  | "almacenamiento"
  | "computacion"
  | "alimentacion"
  | "iluminacion"
  | "produccion"
  | "movimiento"
  | "fotografia"
  | "conectividad"
  | "accesorios";

export type Subcategory =
  | "microphone"
  | "recorder"
  | "wireless-system"
  | "headphones"
  | "extender"
  | "pistol-grip"
  | "camera"
  | "capture"
  | "transmitter"
  | "switcher"
  | "zoom"
  | "prime"
  | "action-camera"
  | "headset"
  | "lens-accessory"
  | "led-panel"
  | "ring-light"
  | "softbox"
  | "ssd"
  | "hdd"
  | "tablet"
  | "charger"
  | "chroma"
  | "gimbal"
  | "adapter"
  | "cable"
  | "battery"
  | "tripod";

export type ActivityTag =
  | "entrevista"
  | "podcast"
  | "documental"
  | "streaming"
  | "programa-de-radio"
  | "fotografia-de-producto"
  | "corto-inmersivo-3d"
  | "corto-animado"
  | "registro-de-eventos";

export type FunctionTag =
  | "grabar-audio"
  | "capturar-video"
  | "iluminar"
  | "estabilizar"
  | "grabar-voz"
  | "capturar-audio"
  | "conectar"
  | "almacenar"
  | "cargar"
  | "transmitir"
  | "alternar-fuentes"
  | "crear-ambiente"
  | "registrar-360"
  | "inmersivo"
  | "controlar"
  | "monitorear"
  | "adaptar"
  | "extender";

export type ContextTag =
  | "interior"
  | "exterior"
  | "estudio"
  | "movilidad";

export type TechTag =
  | "hdmi"
  | "usb"
  | "xlr"
  | "wireless"
  | "vr"
  | "360"
  | "phantom-power"
  | "bluetooth"
  | "sd"
  | "ssd"
  | "sata"
  | "usb-c"
  | "mini-jack"
  | "sdxc";

export type CharTag =
  | "portatil"
  | "direccional"
  | "inalambrico"
  | "dinamico"
  | "condensador"
  | "shotgun"
  | "omnidireccional"
  | "multicanal"
  | "4k"
  | "8k"
  | "estabilizador"
  | "luminoso"
  | "compacto"
  | "profesional";

export type StageTag =
  | "captura"
  | "monitoreo"
  | "almacenamiento"
  | "transmision"
  | "postproduccion"
  | "carga"
  | "iluminacion";

export type SkillLevel = "beginner" | "intermediate" | "professional";

export type EquipmentStatus = "available" | "needs-identification";

export interface EquipmentTags {
  activity: ActivityTag[];
  function: FunctionTag[];
  context: ContextTag[];
  technology: TechTag[];
  characteristics: CharTag[];
  productionStage: StageTag[];
}

export interface EquipmentContent {
  oneLiner: string;
  whatFor: string;
  whenToUse: string;
  whatYouNeed: string;
  quickTip: string;
}

export interface Equipment {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: Category;
  subcategory: Subcategory;
  aliases: string[];
  tags: EquipmentTags;
  skillLevel: SkillLevel[];
  useCases: string[];
  requires: string[];
  recommendedWith: string[];
  compatibleWith: string[];
  alternatives: string[];
  notSuitableFor: string[];
  image: string;
  status: EquipmentStatus;
  content: EquipmentContent;
}

export interface UseCase {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredTags: {
    activity: ActivityTag[];
    function: FunctionTag[];
    context?: ContextTag[];
  };
}

export interface PlanningResult {
  useCase: UseCase;
  equipment: {
    necessary: Equipment[];
    recommended: Equipment[];
    optional: Equipment[];
  };
  refinements: RefinementOption[];
}

export interface RefinementOption {
  id: string;
  label: string;
  type: "number" | "toggle" | "select";
  options?: string[];
  affectsTags: Partial<EquipmentTags>;
}

export interface SearchResult {
  item: Equipment;
  score: number;
  matches: string[];
}
