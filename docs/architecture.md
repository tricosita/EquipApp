# Arquitectura Técnica — EquipApp

## Visión General

EquipApp es una aplicación web estática construida con Next.js que consume contenido desde archivos Markdown. No tiene backend ni base de datos — todo el conocimiento vive en archivos `.md` y se procesa en tiempo de build.

```
CONTENT (.md files)
    ↓
PARSER (gray-matter)
    ↓
NORMALIZED DATA MODEL (TypeScript)
    ↓
RECOMMENDATION ENGINE (tag scoring)
    ↓
UI (Next.js + Tailwind + shadcn/ui)
```

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14+ (App Router, SSG) |
| UI | Tailwind CSS + shadcn/ui |
| Contenido | gray-matter (YAML frontmatter) + marked |
| Búsqueda | Fuse.js (fuzzy search) |
| Lenguaje | TypeScript |
| Deploy | Estático (Vercel, Netlify, etc.) |

## Estructura de Carpetas

```
equipapp/
├── content/                    # Contenido (el "cerebro" de la app)
│   └── equipment/              # Fichas .md organizadas por categoría
│       ├── audio/
│       ├── video/
│       ├── lentes/
│       └── ...
│
├── src/
│   ├── app/                    # Páginas (App Router)
│   │   ├── page.tsx            # Home
│   │   ├── catalogo/           # Catálogo con filtros
│   │   ├── equipo/[id]/        # Ficha individual
│   │   └── planificar/         # Wizard de planificación
│   │
│   ├── components/             # Componentes React
│   │   ├── ui/                 # shadcn/ui (base)
│   │   ├── Navigation.tsx
│   │   ├── SearchBar.tsx
│   │   ├── EquipmentCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── UseCaseCard.tsx
│   │   └── RecommendationResult.tsx
│   │
│   ├── lib/                    # Lógica de negocio
│   │   ├── equipment.ts        # Parser de .md → Equipment[]
│   │   ├── recommendation.ts   # Motor de recomendación
│   │   ├── search.ts           # Búsqueda fuzzy (Fuse.js)
│   │   └── taxonomy.ts         # Taxonomía controlada
│   │
│   └── types/
│       └── equipment.ts        # Tipos TypeScript
│
├── public/images/equipment/    # Fotografías reales
├── docs/                       # Documentación
└── template.md                 # Template para nuevas fichas
```

## Flujo de Datos

### 1. Build Time
```
content/equipment/**/*.md
    ↓ gray-matter parse
    ↓ frontmatter → Equipment (typed object)
    ↓ markdown body → content sections
    ↓
src/lib/equipment.ts: getAllEquipment()
    ↓
Equipamiento normalizado listo para uso
```

### 2. Runtime (Client)
```
Usuario interaction
    ↓
Search: Fuse.js busca en name, brand, model, aliases, tags
    ↓
Recommendation: tag scoring contra EquipmentTags del catálogo
    ↓
UI renderiza resultados
```

## Motor de Recomendación

### Algoritmo

1. **Interpretación**: El input del usuario se traduce a `Partial<EquipmentTags>`
2. **Scoring**: Cada equipo recibe un puntaje basado en coincidencia de tags:

| Factor | Peso |
|--------|------|
| Coincidencia de actividad | 3 |
| Coincidencia de función | 3 |
| Coincidencia de contexto | 2 |
| Compatibilidad | 2 |
| Nivel de habilidad | 1 |
| Versatilidad (# use cases) | 1 |

3. **Clasificación**:
   - Score ≥ 8: **NECESARIO**
   - Score ≥ 4: **RECOMENDADO**
   - Score < 4: **OPCIONAL**

4. **Relaciones**: Se siguen `requires`, `recommendedWith`, y `compatibleWith` para construir kits coherentes.

### Por qué no es solo matching literal

El usuario dice: "Quiero grabar un podcast con dos personas"

El sistema interpreta:
- `activity: podcast`
- `function: grabar-audio, grabar-voz`
- `context: interior` (podcast suele ser interior)

Y busca equipos que tengan esos tags, no que contengan la palabra "podcast" en su nombre.

## Búsqueda

Usa Fuse.js con pesos configurables:

| Campo | Peso |
|-------|------|
| name | 0.35 |
| brand | 0.25 |
| model | 0.25 |
| aliases | 0.30 |
| category | 0.15 |
| tags.activity | 0.15 |
| tags.function | 0.15 |
| useCases | 0.15 |

Esto permite que "micrófono cañón" encuentre el RØDE NTG1 (cuyo tag es `shotgun`), porque "cañón" está en los aliases.

## Modelo de Datos

```typescript
interface Equipment {
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
  status: "available" | "needs-identification";
  content: EquipmentContent;
}
```

## Cómo Agregar Tags

1. Definir el tag en `src/lib/taxonomy.ts` (en la constante correspondiente)
2. Agregar su label en el `*_LABELS` correspondiente
3. Agregarlo al tipo en `src/types/equipment.ts`
4. Usarlo en las fichas `.md`

## Cómo Agregar Casos de Uso

1. Agregar el caso de uso en `USE_CASES` en `src/lib/taxonomy.ts`
2. Definir los tags requeridos
3. Opcionalmente, personalizar las opciones de refinamiento en `src/lib/recommendation.ts`

## Performance

- **Build time**: Se parsean todos los .md y se genera HTML estático
- **Runtime**: Búsqueda fuzzy en cliente (Fuse.js), sin llamadas a API
- **Imágenes**: Optimizadas por Next.js Image component
- **Bundle**: Code-splitting automático por ruta
