# Taxonomía — EquipApp

## Categorías

Las categorías organizan el equipamiento por dominio principal.

| Categoría | Descripción | Icono |
|-----------|-------------|-------|
| `audio` | Micrófonos, grabadores, sistemas inalámbricos, auriculares | 🎙️ |
| `video` | Cámaras, capture cards, transmisores, switchers | 🎬 |
| `lentes` | Lentes zoom y prime | 🔭 |
| `camara-inmersiva` | Cámaras de acción 360° | 🌐 |
| `vr` | Equipamiento de realidad virtual | 🥽 |
| `almacenamiento` | SSDs, HDDs, tarjetas SD | 💾 |
| `computacion` | Tablets, computadoras | 💻 |
| `alimentacion` | Cargadores, fuentes de poder | 🔋 |
| `iluminacion` | Ring lights, softboxes, paneles LED | 💡 |
| `produccion` | Chroma key, fondos, utilería | 🎭 |
| `movimiento` | Gimbals, trípodes, estabilizadores | 🎥 |
| `fotografia` | Cámaras fotográficas, lentes para foto | 📷 |
| `conectividad` | Cables, adaptadores, extensores | 🔌 |
| `accesorios` | Baterías, trípodes, accesorios generales | 🎒 |

## Tags de Actividad

Relacionan el equipo con tipos de producción específicos.

| Tag | Label |
|-----|-------|
| `entrevista` | Entrevista |
| `podcast` | Podcast |
| `documental` | Documental |
| `streaming` | Streaming |
| `programa-de-radio` | Programa de Radio |
| `fotografia-de-producto` | Fotografía de Producto |
| `corto-inmersivo-3d` | Corto Inmersivo 3D |
| `corto-animado` | Corto Animado |
| `registro-de-eventos` | Registro de Eventos |

## Tags Funcionales

Describen qué puede hacer el equipo.

| Tag | Label |
|-----|-------|
| `grabar-audio` | Grabar Audio |
| `capturar-video` | Capturar Video |
| `iluminar` | Iluminar |
| `estabilizar` | Estabilizar |
| `grabar-voz` | Grabar Voz |
| `capturar-audio` | Capturar Audio |
| `conectar` | Conectar |
| `almacenar` | Almacenar |
| `cargar` | Cargar |
| `transmitir` | Transmitir |
| `alternar-fuentes` | Alternar Fuentes |
| `crear-ambiente` | Crear Ambiente |
| `registrar-360` | Registrar 360° |
| `inmersivo` | Inmersivo |
| `controlar` | Controlar |
| `monitorear` | Monitorear |
| `adaptar` | Adaptar |
| `extender` | Extender |

## Tags de Contexto

Indican dónde se usa el equipo.

| Tag | Label |
|-----|-------|
| `interior` | Interior |
| `exterior` | Exterior |
| `estudio` | Estudio |
| `movilidad` | Movilidad |

## Tags de Tecnología

Especifican interfaces y protocolos.

| Tag | Label |
|-----|-------|
| `hdmi` | HDMI |
| `usb` | USB |
| `xlr` | XLR |
| `wireless` | Wireless |
| `vr` | VR |
| `360` | 360° |
| `phantom-power` | Phantom Power |
| `bluetooth` | Bluetooth |
| `sd` | SD |
| `ssd` | SSD |
| `sata` | SATA |
| `usb-c` | USB-C |
| `mini-jack` | Mini Jack |
| `sdxc` | SDXC |

## Tags de Características

Propiedades físicas o técnicas del equipo.

| Tag | Label |
|-----|-------|
| `portatil` | Portátil |
| `direccional` | Direccional |
| `inalambrico` | Inalámbrico |
| `dinamico` | Dinámico |
| `condensador` | Condensador |
| `shotgun` | Shotgun |
| `omnidireccional` | Omnidireccional |
| `multicanal` | Multicanal |
| `4k` | 4K |
| `8k` | 8K |
| `estabilizador` | Estabilizador |
| `luminoso` | Luminoso |
| `compacto` | Compacto |
| `profesional` | Profesional |

## Tags de Etapa de Producción

Indican en qué fase del proceso se utiliza el equipo.

| Tag | Label |
|-----|-------|
| `captura` | Captura |
| `monitoreo` | Monitoreo |
| `almacenamiento` | Almacenamiento |
| `transmision` | Transmisión |
| `postproduccion` | Postproducción |
| `carga` | Carga |
| `iluminacion` | Iluminación |

## Vocabulario Canónico

**IMPORTANTE:** Los tags son un vocabulario controlado. No crear sinónimos.

❌ Mal: `podcast`, `podcasting`, `podcasts`, `audio-podcast`
✅ Bien: `podcast`

Si necesitás agregar un nuevo tag, verificá que no exista uno similar. Los tags se definen en `src/lib/taxonomy.ts`.
