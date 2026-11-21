# Auditoría funcional de Madrugón — noviembre 2026

Estado tras actualizar a Next 16 / React 19.3 / Tailwind 4 / Zod 4 / pnpm 12.
El proyecto nunca salió a producción, así que las recomendaciones asumen libertad
para cambiar el esquema y romper compatibilidad.

Leyenda: ✅ funciona · ⚠️ existe con problemas · ❌ no existe · 🗄️ la tabla existe en BD pero el código no la usa

---

## 1. Resumen ejecutivo

Hoy Madrugón es un **catálogo con contacto por WhatsApp**, no una tienda. Se puede
navegar, ver productos, marcar favoritos y que un vendedor publique productos, pero
**no se puede comprar**: no hay carrito, checkout, pagos, pedidos ni stock.

Lo positivo es que la base de datos ya tiene buena parte del modelo comercial
(`shopping_carts`, `cart_items`, `orders`, `order_items`, `product_variants`,
`coupons`, `reviews`, `user_addresses`, `notifications`), pero **ninguna de esas
tablas se usa en el código**.

Lo que más pesa:

1. **No hay flujo de compra** (carrito → checkout → pago → pedido).
2. **No hay variantes reales**: las tallas son un `text[]` en `products`, no existe el color,
   no hay stock por combinación y el precio no puede variar por variante.
3. **El botón "Contactar al vendedor" apunta a un número fijo** (`wa.me/573507107300`),
   el mismo para todas las tiendas.
4. **La home muestra datos de prueba**: "Artículos más vendidos" son 20 copias de `MOCK_PRODUCT`.
5. **No hay blog** ni SEO técnico (sitemap, robots, datos estructurados).

---

## 2. Revisión por funcionalidad

### 2.1 Catálogo y navegación

| Funcionalidad | Estado | Notas |
|---|---|---|
| Listado por género (`/hombre`, `/mujer`, `/ninos`) | ✅ | Ahora con ISR (revalida cada 5 min). |
| Listado por categoría (`/categorias/[category]`) | ⚠️ | Muestra el slug crudo como título (`camisas-manga-larga`). Sin paginación. |
| `/todo` | ⚠️ | Trae **todos** los productos sin paginar. Texto vacío dice "No tienes favoritos". |
| `/promos` | ⚠️ | Consulta `gender = "Remates"` (igual que `/remates`) y el título dice "Niños/as". Debería filtrar por `compare_price > base_price` o por una colección. |
| `/marcas/[brand]` | ❌ | Página vacía (`<div></div>`). |
| Página pública de tienda (`/tienda/[slug]`) | ❌ | Las tiendas existen pero no tienen vitrina pública. |
| Búsqueda (`/busqueda`) | ⚠️ | Solo por género + categorías vía query string. No hay búsqueda por texto completo, filtros por precio/talla/color ni ordenamiento. Se corrigió un crash cuando falta `categorias`. |
| Filtros y ordenamiento | ❌ | Ni en listados ni en búsqueda. |
| Paginación / scroll infinito | ❌ | Todas las consultas traen la tabla completa. |
| Productos inactivos/moderados | ⚠️ | Las consultas públicas no filtran `is_active`, `status`, `moderation_status` ni `is_removed`. Si las políticas RLS no lo hacen, se muestran productos rechazados o en borrador. **Verificar RLS o filtrar en la consulta.** |
| "Género" como eje del catálogo | ⚠️ | `product_gender` mezcla público objetivo con promociones (`Remates`). "Remates" debe ser una colección o etiqueta, no un género. |

### 2.2 Ficha de producto

| Funcionalidad | Estado | Notas |
|---|---|---|
| Galería | ✅ | Swiper. |
| Precio y descuento | ✅ (corregido) | Con `compare_price = null` mostraba **$0**. Corregido: siempre muestra `base_price`, y `compare_price` tachado solo si hay descuento. |
| Metadata SEO por producto | ✅ (nuevo) | `generateMetadata` con título, descripción e imagen OG. |
| Producto inexistente | ✅ (corregido) | Mostraba `<h1>Loading</h1>`; ahora responde 404. |
| Selección de talla/color | ❌ | Las tallas se muestran como etiquetas sin selección. No hay color. |
| Stock / disponibilidad | ❌ | No existe. |
| Agregar al carrito | ❌ | Solo "Contactar al vendedor". |
| Contacto con vendedor | ⚠️ | Número de WhatsApp fijo. Debe usar `stores.phone` y prellenar el mensaje con el producto y la variante. |
| Productos recomendados | ❌ | El bloque está comentado. |
| Reseñas / calificación | 🗄️ | Existe `reviews` (con `is_verified_purchase`) y `products.rating`, sin UI. |
| Datos estructurados (JSON-LD `Product`) | ❌ | Necesario para Google Shopping y rich results. |
| Info del vendedor/tienda | ❌ | No se muestra qué tienda vende el producto. |
| Guía de tallas | ❌ | Importante en ropa. |
| `material`, `care_instructions`, `short_description` | 🗄️ | Columnas existentes sin mostrar ni editar. |

### 2.3 Variantes — ver la sección 3 (propuesta completa)

### 2.4 Carrito y checkout

| Funcionalidad | Estado | Notas |
|---|---|---|
| Carrito | 🗄️ | `shopping_carts` + `cart_items` (con `variant_id`) sin usar. |
| Carrito de invitado | ❌ | Se necesita carrito local que se fusione con el del usuario al iniciar sesión. |
| Checkout | ❌ | |
| Direcciones | 🗄️ | `user_addresses` sin UI. |
| Costos de envío | ❌ | `orders.shipping_amount` existe; no hay reglas de envío (por ciudad, gratis desde X). |
| Impuestos | ❌ | `orders.tax_amount` existe; definir si los precios incluyen IVA. |
| Cupones | 🗄️ | `coupons` completa (tipo, mínimo, tope, límite por usuario) sin lógica ni UI. |
| Pagos | ❌ | Sin pasarela. Para Colombia (el WhatsApp es +57): Wompi, Mercado Pago o ePayco. Confirmar el pago **vía webhook en el servidor**, nunca desde el cliente. |
| Pedidos | 🗄️ | `orders`, `order_items` (con `product_snapshot` y `store_id`) y `generate_order_number()` existen sin usar. |
| Emails transaccionales | ❌ | Confirmación de pedido, cambios de estado, recuperación de contraseña. |
| Pedido multi-tienda | ❌ | Si es marketplace, un carrito con productos de varias tiendas debe dividirse en sub-pedidos por tienda (`order_items.store_id` ya lo permite). |

### 2.5 Cuenta de usuario

| Funcionalidad | Estado | Notas |
|---|---|---|
| Registro / login | ⚠️ | Funciona en el cliente. **El registro inserta la fila de `public.users` desde el navegador justo después de `signUp`**: si se activa la confirmación por email no hay sesión, y RLS bloquea el insert. Debe hacerlo un trigger en `auth.users`. |
| Recuperar contraseña | ❌ | No existe. |
| Login social (Google) | ❌ | Recomendado. |
| Perfil y avatar | ✅ | |
| Favoritos | ⚠️ | Funciona, pero cada `FavoriteStar` hace **su propia consulta** a `wishlists`: N consultas por página. Debe cargarse una vez por usuario (React Query) y consultarse en memoria. |
| Mis pedidos | ❌ | |
| Direcciones guardadas | ❌ | |
| Notificaciones | 🗄️ | Tabla `notifications` sin uso. |
| Cookie `user` | ⚠️ | `login`/`updateUser` guardan la fila completa del usuario en una cookie no `httpOnly` (teléfono, email, fecha de nacimiento…). Eliminarla y leer el perfil de Supabase. |

### 2.6 Vendedores, tiendas y marcas

| Funcionalidad | Estado | Notas |
|---|---|---|
| Crear tienda / marca | ✅ | Desde "Mi perfil". |
| Publicar producto (`/vender`) | ⚠️ | Sin variantes, sin stock, sin SKU, sin borrador/publicar. Las tallas salen de una lista fija por género/categoría (`AVAILABLE_SIZES`). |
| Mis productos / editar | ✅ | |
| Panel del vendedor (ventas, pedidos) | ❌ | |
| Gestión de inventario | ❌ | |
| Onboarding de vendedor (buyer → seller) | ⚠️ | El trigger de transición de rol existe en BD; falta el wizard de la sección 3 del `ADMIN_FEATURES_PLAN.md`. |
| Comisiones y liquidaciones | ❌ | Solo si es marketplace. |

### 2.7 Panel de administración

| Funcionalidad | Estado | Notas |
|---|---|---|
| Protección de `/admin` | ✅ | Layout de servidor que verifica el rol, más el proxy. |
| Dashboard | ❌ | Página vacía. |
| Productos | ⚠️ | Reutiliza la grilla pública; sin tabla, filtros, moderación ni acciones masivas. |
| Usuarios (banear / verificar) | ✅ | |
| Moderación de productos | 🗄️ | Columnas y `services/moderation.ts` existen; no hay UI. |
| Categorías | ❌ | No hay CRUD; hoy se gestionan directo en la BD. |
| Pedidos | ❌ | |
| Cupones | ❌ | |
| Espacios publicitarios (`ad_*`) | 🗄️ | Esquema y servicios listos (`services/ads.ts`), sin UI. |
| Roles (solo super_admin) | ❌ | |

### 2.8 Configuración de banners y contenido de la home

| Elemento | Origen | Estado | Notas |
|---|---|---|---|
| Hero (carrusel) | `promo_banners` | ✅ | Admin en `/admin/banners`. Ahora se renderiza en el servidor (antes era `ssr:false`: la imagen principal no venía en el HTML y empeoraba el LCP). |
| Banner principal | `homepage_banners` (`placement = main`) | ⚠️ | **No tiene UI de administración**. Si no hay fila, cae a un mock. |
| Modal de promoción | `promo_modals` | ✅ | Admin en `/admin/modals`. Se carga en el cliente en todas las rutas, incluidas `/admin` y `/auth`. |
| Franja superior ("¡Extendemos la PROMO MADRUGÓN! 60% OFF") | **Hardcodeada** en `PromoBanner.tsx` | ❌ | Debe ser configurable (texto, link, activo, vigencia). |
| `hero_slides` | — | 🗄️ | Tabla duplicada con `promo_banners`: el hero usa `promo_banners`. **Unificar** en una sola tabla `banners` con `placement` (`hero`, `main`, `strip`, `modal`, `category:<slug>`). |
| Vigencia (`valid_from` / `valid_until`) | — | ⚠️ | Las columnas existen, pero la home no las filtra: un banner vencido sigue visible mientras `is_active = true`. |
| Revalidación al editar | `/api/revalidate/promo` | ✅ (corregido) | Antes **no tenía autenticación** (cualquiera podía invalidar la caché) y usaba revalidación diferida. Ahora exige rol admin, solo acepta tags permitidos y expira al instante. |
| "Artículos más vendidos" | `MOCK_PRODUCT` × 20 | ❌ | Datos falsos. Usar `products.total_sales`/`is_featured` o colecciones curadas. |
| Categorías principales | `mainCategoriesContent` (mock) | ⚠️ | Hardcodeadas; deberían salir de `categories` (`image_url`, `sort_order`). |
| Programación y A/B de banners | — | ❌ | Prioridad baja. |

### 2.9 SEO, rendimiento y legal

| Funcionalidad | Estado | Notas |
|---|---|---|
| `sitemap.xml` / `robots.txt` | ❌ | Agregar `app/sitemap.ts` (productos, categorías, tiendas, blog) y `app/robots.ts`. |
| Metadata | ⚠️ | Global, con `lang="en"` en un sitio en español (debe ser `es-CO`), y la imagen OG apunta a `madrugon.vercel.app/immages/...` (typo y dominio viejo). |
| URLs canónicas | ❌ | |
| JSON-LD (`Product`, `BreadcrumbList`, `Organization`) | ❌ | |
| Páginas 404 / not-found | ⚠️ | No hay `not-found.tsx` personalizado. |
| Imágenes | ✅ | `next/image` con AVIF/WebP. Next 16 solo permite `quality` 75 por defecto; se configuró `[75, 100]`. |
| Política de privacidad | ✅ | |
| Términos y condiciones, envíos, cambios y devoluciones | ❌ | **Obligatorios** para vender en Colombia (Estatuto del Consumidor, derecho de retracto). |
| Consentimiento de cookies / analítica | ❌ | Firebase Analytics corre sin consentimiento. |

### 2.10 Infraestructura y seguridad

| Tema | Estado | Notas |
|---|---|---|
| Dos almacenamientos de imágenes | ⚠️ | Firebase Storage para productos y Supabase para otras cosas (`next.config` permite ambos). Unificar en **Supabase Storage** simplifica auth, RLS y costos, y permite quitar Firebase. |
| Proyecto Supabase | ⚠️ | `next.config.mjs` permite `hzkxzvmxjrwshjeducza.supabase.co`, pero `SUPABASE_SCHEMA.md` documenta `wdciupspomamkepqdfxz`. Confirmar cuál es el real. |
| Migraciones versionadas | ❌ | `supabase/` solo tiene `config.toml`; el esquema vive en un `.md`. Pasar a `supabase/migrations/*.sql`. |
| `/api/images/compress` | ✅ (corregido) | Era público: cualquiera podía usar el CPU del servidor con `sharp`. Ahora exige sesión. |
| `/api/dev/make-me-admin` | ✅ (eliminado) | Respondía 410; se borró. |
| Estado global en el servidor | ✅ (corregido) | `auth/actions.ts` usaba la store de Zustand en el servidor (un singleton compartido entre requests). Eliminado. |
| Tests | ❌ | No hay ninguno. Mínimo: E2E del flujo de compra (Playwright) y tests de RLS. |
| CI | ❌ | Lint + typecheck + build en cada PR. |

---

## 3. Propuesta: variantes según el tipo de producto

### Problema actual

- `products.sizes text[]` es una lista suelta de tallas, sin stock ni precio.
- El color no existe.
- `product_variants` ya existe (`sku`, `price`, `compare_price`, `inventory_quantity`,
  `variant_options jsonb`), pero no se usa y no tiene forma de validar qué opciones
  son válidas para cada tipo de producto.
- `product_images.variant_id` existe: sirve para fotos por color.

### Modelo propuesto (opciones definidas por tipo de producto)

La idea, al estilo de Shopify: cada **tipo de producto** define qué ejes de variante
tiene (ropa → Talla + Color; calzado → Talla + Color; un perfume → Tamaño; un
accesorio → solo Color o ninguno). Cada producto elige sus valores, y cada
**combinación** es una variante con su propio SKU, stock y, opcionalmente, precio.

```
product_types            (ropa, calzado, accesorios, perfumería, hogar…)
  └─ option_types        (Talla, Color, Tamaño, Material…)  ← plantilla por tipo
       └─ option_values  (S, M, L / Rojo #E53935 / 50 ml…)   ← catálogo normalizado

products ── product_type_id
  ├─ product_options         (qué ejes usa ESTE producto y en qué orden)
  │    └─ product_option_values (qué valores ofrece: solo S, M, L; solo Rojo y Negro)
  └─ product_variants        (una fila por combinación: M/Rojo)
       ├─ sku, price (null = usa el del producto), compare_price
       ├─ stock, is_active
       └─ variant_option_values (variant_id, option_value_id)  ← reemplaza variant_options jsonb
product_images ── variant_id / option_value_id (fotos por color)
```

Tablas clave (resumen):

```sql
create table product_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,              -- 'Ropa', 'Calzado', 'Accesorios'
  slug text unique not null
);

create table option_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,              -- 'Talla', 'Color', 'Tamaño'
  slug text unique not null,
  input_type text not null default 'select'  -- 'select' | 'color_swatch' | 'button'
);

-- Qué ejes tiene cada tipo de producto (plantilla)
create table product_type_option_types (
  product_type_id uuid references product_types on delete cascade,
  option_type_id  uuid references option_types  on delete cascade,
  position int not null default 0,
  is_required boolean not null default true,
  primary key (product_type_id, option_type_id)
);

create table option_values (
  id uuid primary key default gen_random_uuid(),
  option_type_id uuid not null references option_types on delete cascade,
  value text not null,             -- 'M', 'Rojo', '50 ml'
  label text,                      -- 'Mediana'
  hex_color text,                  -- '#E53935' solo para Color
  size_system text,                -- 'alpha' | 'numeric' | 'co_kids' | 'eu_shoe' (agrupa tallas)
  position int not null default 0,
  unique (option_type_id, value, size_system)
);

create table variant_option_values (
  variant_id uuid references product_variants on delete cascade,
  option_value_id uuid references option_values on delete restrict,
  primary key (variant_id, option_value_id)
);

alter table product_variants
  add column stock int not null default 0 check (stock >= 0),
  add constraint product_variants_sku_key unique (sku);
-- y luego: drop column products.sizes, drop column product_variants.variant_options
```

Ejemplos de plantillas:

| Tipo de producto | Ejes de variante | Valores típicos |
|---|---|---|
| Ropa superior | Talla (alpha) + Color | XS–XXL · paleta de colores |
| Pantalones / jeans | Talla (numérica) + Color | 6–20 (dama), 28–40 (caballero) |
| Ropa infantil | Talla (infantil) + Color | 2, 4, 6… 16 |
| Calzado | Talla (calzado) + Color | 34–44 |
| Accesorios | Color (o ninguno) | — |
| Perfumería | Tamaño | 30 / 50 / 100 ml |
| Producto sin variantes | — | una sola variante "por defecto" (simplifica carrito y stock) |

Reglas:

- **Todo producto tiene al menos una variante**: el carrito, el stock y los pedidos
  siempre apuntan a `variant_id`, nunca a `product_id`.
- **Precio**: `variant.price ?? product.base_price`.
- **Stock**: se descuenta al confirmar el pago, dentro de una función SQL transaccional
  (`place_order()`), para evitar sobreventa.
- **Fotos por color**: al elegir un color, la galería filtra por `option_value_id`.
- **Filtros del catálogo**: "talla M", "color negro" y "en stock" se resuelven con un
  join a `variant_option_values`, y aplican a cualquier tipo de producto.
- **Formulario de vendedor**: elige el tipo de producto → se muestran sus ejes → marca
  los valores → se genera la matriz de combinaciones para cargar stock (y precio
  opcional) en una tabla editable, con "aplicar a todas".

### Si el foco es mayorista (el nombre es "Madrugón Mayorista")

Probablemente se necesite además:

- **Precios por volumen**: tabla `price_tiers (variant_id | product_id, min_qty, unit_price)`.
- **Cantidad mínima de compra** por producto (`min_order_qty`).
- **Venta por curva o paquete**: por ejemplo, una "curva" de 1 S + 2 M + 2 L + 1 XL. Se
  modela como un producto tipo *bundle* que referencia variantes y cantidades.

---

## 4. Propuesta: blog

Objetivo: contenido para SEO (tendencias, guías de tallas, lookbooks) que enlace a
productos.

```sql
create table blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null, slug text unique not null
);

create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  cover_image_url text,
  content jsonb not null,             -- documento TipTap (editor enriquecido)
  status text not null default 'draft' check (status in ('draft','scheduled','published')),
  published_at timestamptz,
  author_id uuid references users(id),
  category_id uuid references blog_categories(id),
  seo_title text, seo_description text,
  reading_minutes int,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table blog_post_tags     (post_id uuid references blog_posts on delete cascade, tag text, primary key (post_id, tag));
create table blog_post_products (post_id uuid references blog_posts on delete cascade,
                                 product_id uuid references products on delete cascade,
                                 position int default 0, primary key (post_id, product_id));
```

- RLS: lectura pública de `status = 'published' and published_at <= now()`; escritura
  solo para admin/editor (nuevo permiso `blog.write`).
- Rutas: `/blog` (listado paginado, ISR), `/blog/[slug]` (ISR + `generateStaticParams`),
  `/blog/categoria/[slug]`, `/blog/rss.xml`.
- Admin: `/admin/blog` con editor TipTap, subida de portada, vista previa con
  `draftMode()`, programación por `published_at`, y selector de productos
  relacionados (se muestran como tarjetas comprables dentro del post).
- SEO: JSON-LD `Article`, entradas en `sitemap.ts` y revalidación por tag
  (`blog`, `blog:<slug>`) al publicar.

---

## 5. Hoja de ruta sugerida

**Fase 0 — Decisiones (bloqueantes):** modelo de negocio (marketplace multi-tienda o
tienda única), mayorista o minorista, pasarela de pago, ¿se elimina Firebase?

**Fase 1 — Cimientos de datos**
- Migraciones versionadas en `supabase/migrations`.
- Modelo de variantes (sección 3) y migración de `products.sizes` a variantes.
- Trigger `auth.users → public.users`, eliminar la cookie `user`.
- Unificar banners en una sola tabla con `placement` y vigencia.
- Filtrar productos publicados (RLS o vista `public_products`).

**Fase 2 — Catálogo completo**
- Selector de variantes en la ficha, stock y JSON-LD.
- Filtros (talla, color, precio, tienda), ordenamiento, paginación y búsqueda de
  texto (Postgres FTS con `unaccent`).
- Páginas de marca y de tienda; home con datos reales; favoritos en una sola consulta.

**Fase 3 — Compra**
- Carrito (invitado + usuario, con fusión), direcciones, envío y cupones.
- Checkout, pasarela con webhook y `place_order()` transaccional.
- Mis pedidos y emails transaccionales.

**Fase 4 — Operación**
- Admin: dashboard, pedidos, moderación, categorías, tipos de producto y opciones,
  cupones, banners (todos los placements).
- Panel de vendedor: pedidos, inventario y ventas.

**Fase 5 — Contenido y crecimiento**
- Blog (sección 4), sitemap/robots/canónicas, reseñas.
- Páginas legales, consentimiento de cookies, feed para Google Merchant / Meta.

**Transversal:** E2E con Playwright del flujo de compra, tests de RLS y CI
(lint + typecheck + build).
