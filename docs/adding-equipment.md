# Cómo Agregar un Nuevo Equipo

Agregar un nuevo equipo al catálogo es extremadamente sencillo. No necesitás modificar ningún archivo de código.

## Pasos

### 1. Copiar el template

```bash
cp template.md content/equipment/CATEGORIA/nuevo-equipo.md
```

Reemplazá `CATEGORIA` por una de las categorías existentes:
- `audio`
- `video`
- `lentes`
- `camara-inmersiva`
- `vr`
- `almacenamiento`
- `computacion`
- `alimentacion`
- `iluminacion`
- `produccion`
- `movimiento`
- `fotografia`
- `conectividad`
- `accesorios`

### 2. Completar la metadata (frontmatter)

El frontmatter es la parte entre `---` al inicio del archivo. Es lo que el sistema usa para clasificar y recomendar el equipo.

```yaml
---
id: mi-nuevo-equipo           # ID único (usar guiones, sin espacios)
name: Nombre del Equipo       # Nombre completo
brand: Marca                  # Marca del fabricante
model: Modelo                 # Modelo específico

category: audio               # Categoría principal
subcategory: microphone       # Subcategoría

aliases:                      # Nombres alternativos (para búsqueda)
  - nombre común 1
  - nombre común 2

tags:                         # Tags del sistema
  activity:
    - podcast
  function:
    - grabar-audio
  context:
    - interior
  technology:
    - xlr
  characteristics:
    - dinamico
  productionStage:
    - captura

skillLevel:
  - beginner

useCases:
  - podcast

requires: []                  # Equipos requeridos (IDs)
recommendedWith: []           # Equipos recomendados (IDs)
compatibleWith: []            # Equipos compatibles (IDs)
alternatives: []              # Alternativas (IDs)
notSuitableFor: []            # No adecuado para (IDs)

image: /images/equipment/FILENAME.jpeg
status: available
---
```

### 3. Agregar la fotografía

Copiá la imagen del equipo a:

```
public/images/equipment/
```

**IMPORTANTE:** El nombre del archivo debe coincidir con el campo `image` del frontmatter.

### 4. Completar el contenido markdown

Debajo del frontmatter, escribí la ficha del equipo:

```markdown
# Nombre del Equipo

## En una frase
Descripción breve y directa.

## ¿Para qué sirve?
Explicación técnica sencilla.

## ¿Cuándo lo necesito?
Situaciones concretas de uso.

## ¿Qué necesitás para usarlo?
Equipamiento adicional requerido.

## Consejo rápido
Una recomendación práctica.
```

### 5. Guardar y listo

Guardá el archivo. La aplicación lo incorporará automáticamente en el próximo build.

## Reglas Importantes

### Sobre la metadata
- El `id` debe ser único en todo el catálogo
- Usá guiones `-` en lugar de espacios en IDs y rutas
- Los tags deben pertenecer al vocabulario canónico (ver `docs/taxonomy.md`)
- Las relaciones (`requires`, `recommendedWith`, etc.) usan IDs de otros equipos

### Sobre el contenido
- La "En una frase" es lo primero que ve el usuario — que sea clara y directa
- El contenido técnico debe ser correcto pero accesible
- No incluir información que no esté confirmada
- Si el modelo es desconocido, usar `status: needs-identification`

### Sobre las fotos
- Usar fotografías propias del equipo real
- No inventar imágenes de otros modelos
- Formatos aceptados: `.jpeg`, `.jpg`, `.png`
- Preferir fondo neutro y buena iluminación

## Verificación

Después de agregar un equipo, verificá:

1. ✅ El archivo se parsea correctamente (no hay errores de YAML)
2. ✅ La imagen existe en `public/images/equipment/`
3. ✅ Los tags son válidos (pertenecen al vocabulario canónico)
4. ✅ Las relaciones apuntan a IDs que existen
5. ✅ El contenido responde a las 6 preguntas de calidad:
   - ¿Qué es?
   - ¿Para qué sirve?
   - ¿Cuándo lo necesito?
   - ¿Qué necesito además?
   - ¿Con qué es compatible?
   - ¿Qué alternativas tengo?
