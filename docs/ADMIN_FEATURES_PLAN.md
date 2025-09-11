# Plan de trabajo para administración de contenido y moderación

Última actualización: 2025-09-10

Este plan está dividido en fases. Cada paso tiene casillas para marcar y requiere tu aprobación antes de avanzar a la siguiente fase.

Leyenda:

- [ ] Pendiente
- [x] Completado
- [~] En progreso

## Objetivo

Habilitar paneles de administración para:

- Slides del Hero (portada) administrables.
- Banner principal administrable.
- Promo banner administrable.
- Moderación: banear, suspender, verificar usuarios; y eliminar/ocultar productos que no cumplan normas.
- Espacios publicitarios comprables por vendedores (Hero/Banners/Modal de promos).
- Gestión de roles y permisos (registro libre; auto-cambio a seller; solo super_admin eleva a admin/moderator).

## Roles y permisos — Estrategia

Nota: Ya existe la tabla `user_roles` y la columna `users.role_id` en la BD. No crearemos una nueva tabla, sino que la utilizaremos correctamente.

- Roles base: `super_admin`, `admin`, `moderator`, `seller`, `buyer`.
- Registro: cualquier usuario se registra por la app y recibe por defecto el rol `buyer`.
- Cambio de rol:
  - Autogestión: el usuario puede cambiarse a `seller` (buyer → seller) desde el flujo “Vender”.
  - Elevaciones sensibles (`admin`, `moderator`): solo `super_admin` puede asignarlas o retirarlas.
- Compatibilidad: mantenemos `users.is_seller` por retrocompatibilidad, pero la autorización dependerá de `user_roles`. Sincronizamos `is_seller=true` cuando el rol sea `seller`.
- Salvaguardas para auto-cambio a seller:
  - Precondiciones: email verificado, teléfono/KYC opcional, aceptar Términos de Vendedor.
  - Antiabuso: límite de intentos, throttle, auditoría.
  - Aprovisionamiento: crear/ligar `stores` al completar el flujo.
- RLS: políticas por rol para lectura/escritura. Los usuarios solo pueden auto-cambiar de buyer a seller; cualquier otra transición requiere `super_admin`.

Impacto por fases:

- Fase 0 (definición): acordar el mapa de permisos por rol (JSON en `user_roles.permissions`) y precondiciones del flujo a seller.
- Fase 1 (BD): seeds de roles; trigger/función para rol por defecto; función `can_self_promote_to_seller(user_id)` y trigger de transición controlada; vistas/funciones helper para checks de rol; RLS.
- Fase 2 (API): endpoint/RPC `become_seller()` para autogestión (valida precondiciones y registra auditoría); endpoint de cambio de rol restringido a `super_admin` para admin/moderator.
- Fase 3 (UI): wizard “Vender” (datos mínimos, verificación, creación de tienda) y sección de roles solo para `super_admin`.
- Fase 5 (QA): pruebas de RLS, intento de escalada bloqueado, y flujo buyer→seller exitoso.

## Fase 0 — Descubrimiento y alineación (Aprobación requerida)

- [ ] Revisar diseño/UX deseado para: Hero, Banner, Promo banner (imágenes, títulos, links, prioridades, fechas de vigencia).
- [ ] Definir reglas de moderación (políticas, mensajes de rechazo, tiempos de suspensión, criterios de verificación).
- [ ] Acordar roles/permiso mínimos (super_admin, admin, moderator, seller, buyer) y flujos de aprobación.
- [ ] Definir precondiciones para auto-cambio a seller (verificación, Términos, datos mínimos de tienda/identidad).
- [ ] Definir modelo de compra de espacios (precios, duración, segmentación, aprobación, políticas de contenido, reembolsos).
- [ ] Definir comportamiento del modal de promociones (momento de aparición, frecuencia por usuario, botón para “Publica tu marca aquí”).
- [ ] Aprobar alcance y orden de implementación.

Entregables: breve documento con definiciones y maquetas de referencia si aplica.

## Fase 1 — Esquema de Base de Datos (Aprobación requerida)

Cambios aplicados (completado):

- [x] Crear tablas de CMS ligero:
  - hero_slides(id, title, subtitle, image_url, cta_label, cta_url, sort_order, is_active, valid_from, valid_until, created_at, updated_at, created_by, updated_by)
  - homepage_banners(id, title, image_url, cta_label, cta_url, placement, sort_order, is_active, valid_from, valid_until, created_at, updated_at, created_by, updated_by)
  - promo_banners(id, title, description, image_url, cta_label, cta_url, discount_text, valid_from, valid_until, is_active, created_at, updated_at, created_by, updated_by)
- [x] Espacios publicitarios comprables:
  - ad_slots(id, type['hero'|'banner'|'modal'], placement, title, description, image_requirements, base_price, currency, sort_order, is_active, valid_from, valid_until, created_at, updated_at, created_by)
  - ad_applications(id, slot_id->ad_slots.id, store_id->stores.id, message, status['pending'|'approved'|'rejected'], reviewed_by, reviewed_at, created_at)
  - ad_reservations(id, slot_id->ad_slots.id, store_id->stores.id, start_date, end_date, price, currency, status['pending'|'approved'|'paid'|'canceled'], payment_ref, notes, approved_by, created_at, updated_at)
  - ad_assets(id, reservation_id->ad_reservations.id, image_url, cta_label, cta_url, alt_text, is_approved, approved_by, created_at)
- [x] Modal de promociones:
  - Extender promo_banners con: is_modal(bool), modal_priority(int), audience(jsonb|string), show_once_per_session(bool)
  - promotion_events(id, promo_id->promo_banners.id, user_id->users.id, event['view'|'click'|'dismiss'], created_at) para frecuencia/medición
- [x] Moderación de usuarios:
  - Añadir a users: banned_at, ban_reason, suspended_until, suspension_reason, verified_by, verified_at, moderation_notes.
- [x] Moderación de productos:
  - Añadir a products: moderation_status['draft'|'published'|'rejected'|'flagged'], moderation_reason, moderated_by, moderated_at, is_removed.
- [x] Auditoría mínima: moderation_logs(id, target_type['user'|'product'|'store'|'asset'|'slot'], target_id, action, reason, actor_id, metadata, created_at).
- [x] Roles y permisos (aprovechando `user_roles` ya existente):
  - [x] Seeds: insertar roles base y `permissions` JSON por rol.
  - [x] Default role: función/trigger para asignar `buyer` a nuevos usuarios en `public.users` al crearse.
  - [x] Helpers: SQL functions `is_super_admin()`, `has_permission(key text)`, `enforce_role_transition()`.
        Nota: la validación de auto-cambio a seller se resuelve dentro del trigger `enforce_role_transition()` (función separada `can_self_promote_to_seller` opcional a futuro).
  - [x] Transiciones: trigger `enforce_role_transition()` que permite solo buyer→seller por el propio usuario; otras transiciones solo para `super_admin`.
  - [x] Sync: trigger que pone `users.is_seller=true` cuando el rol pase a `seller`.
  - [x] RLS: políticas por tabla (admin/moderator con permisos de aprobación; seller solo sus propios recursos; buyer solo lectura pública).
- [x] RLS y políticas por rol para lectura/escritura segura (vendedores solo ven/someter sus aplicaciones/reservas/activos; admin/moderator aprueban).

Entregables: SQL de migración aplicado y documentado (ver `SUPABASE_SCHEMA.md`).

Estado: Completado — esperando tu autorización para iniciar Fase 2.

## Fase 2 — API y Servicios (Aprobación requerida)

- [ ] Endpoints/acciones del panel admin para CRUD de hero_slides, homepage_banners, promo_banners.
- [ ] Marketplace de espacios publicitarios (seller-facing y admin):
  - [ ] Listar slots disponibles/ocupados por fechas, detalle de requisitos y precio.
  - [ ] Crear aplicación a slot (seller), cargar creativos, editar/cancelar antes de aprobación.
  - [ ] Aprobación/rechazo de aplicaciones y activos (admin/moderator).
  - [ ] Crear reserva aprobada, manejo de conflictos de fechas.
  - [ ] Integración de pago (placeholder) y actualización a estado 'paid'.
- [ ] Modal de promociones:
  - [ ] Servicio para obtener promos activas (prioridad, segmentación, vigencia) y registrar eventos (view/click/dismiss).
  - [ ] Endpoint “Quiero aparecer aquí” que crea aplicación a slot de tipo 'modal'.
- [ ] Endpoints/acciones de moderación:
  - [ ] Banear/Desbanear usuario.
  - [ ] Suspender/Reactivar usuario.
  - [ ] Verificar usuario (con marca y fecha).
  - [ ] Rechazar/ocultar/eliminar producto (soft delete recomendado mediante is_removed + status).
- [ ] Roles y permisos (API):
  - [ ] RPC segura `set_user_role(user_id, role_name)` con SECURITY DEFINER y chequeo de `is_super_admin()`; logging en `moderation_logs`.
  - [ ] RPC `become_seller()` para autogestión (valida precondiciones/terms y usa `enforce_role_transition()`), crea/actualiza `stores` y sincroniza `is_seller`.
- [ ] Telemetría y eventos (creación/edición/baneo/suspensión/aprobación de anuncios/cambios de rol) para auditoría.

Entregables: contratos de API (tipos), pruebas básicas y handlers protegidos por rol.

## Fase 3 — Panel de Administración (UI) (Aprobación requerida)

- [ ] Sección “Portada” con 3 subsecciones:
  - [ ] Slides del Hero: listado, crear/editar, ordenar, activar/desactivar, vigencia.
  - [ ] Banner principal: CRUD, previsualización, vigencia.
  - [ ] Promo banner: CRUD, previsualización, vigencia.
- [ ] Sección “Marketplace de espacios”:
  - [ ] Admin: gestión de slots, precios, calendario, cola de aplicaciones, aprobación de reservas/activos, vista de conflictos.
  - [ ] Seller: explorar slots, aplicar, pagar, subir creativos y ver estado.
- [ ] Sección “Moderación”:
  - [ ] Usuarios: buscar, ver estado, banear/suspender/verificar con motivos y expiración, historial.
  - [ ] Productos: buscar, ver flags/motivos, cambiar estado (revisado, rechazado, publicado), ocultar/eliminar.
- [ ] Sección “Roles” (solo `super_admin`):
  - [ ] Listado de usuarios (búsqueda/filtrado) y cambio de rol con confirmación y auditoría.
  - [ ] Vista de roles disponibles y permisos.
- [ ] Flujo “Vender” (autogestión seller):
  - [ ] Wizard para completar requisitos (verificación/terms, datos mínimos de tienda, logo/banner opcional).
  - [ ] Llamada a `become_seller()` y creación/edición de `stores`.
- [ ] Controles de acceso por rol y protección de rutas en Next.js middleware (`/admin` solo para admin/moderator/super_admin; vista Roles solo super_admin).

Entregables: páginas y componentes en `src/app/admin/**`, estados y llamadas a servicios.

## Fase 4 — Integración en la Home (Aprobación requerida)

- [ ] Hero, banner y promo banner leen desde tablas CMS con caché (ISR/RTK Query/React Query) y fallbacks.
- [ ] Resolución de contenido según reservas pagadas: si hay reserva activa para el placement, se prioriza sobre contenido default.
- [ ] Modal de promociones: aparece al inicio según reglas (frecuencia, segmentación) con CTA “Publica tu marca aquí”.
- [ ] Manejo de vigencias y activación.
- [ ] Optimización de imágenes (next/image) y accesibilidad básica (alt text, aria-labels).

Entregables: Home conectada a contenido administrable.

## Fase 5 — QA, Seguridad y Lanzamiento (Aprobación requerida)

- [ ] Pruebas: unitarias mínimas, smoke tests de UI admin, y pruebas de RLS.
- [ ] Intentos de escalada (buyer→admin) bloqueados; buyer→seller permitido y auditado.
- [ ] Revisión de políticas RLS/roles (no elevación de privilegios, principio de mínimo privilegio).
- [ ] Backups y plan de rollback.
- [ ] Documentación de uso del panel admin.

Entregables: checklist de QA, reporte de pruebas y guía rápida.

## Prioridad baja — Contenido y Home (al final)

- [ ] Colecciones destacadas/curación (manual y por reglas por categoría/marca).
- [ ] Calendario de publicación y caducidad (scheduling) avanzado para Hero/Banners/Promos.
- [ ] A/B testing básico de banners y CTAs.
- [ ] Biblioteca de medios con recorte/optimización y reutilización de assets.

## Plan a futuro (roadmap)

- Catálogo y búsqueda:
  - [ ] Importación/actualización masiva (CSV/Excel) y exportaciones.
  - [ ] Plantillas de productos/variantes y duplicar producto.
  - [ ] Reglas de precios (promos por categoría/marca, volumen, mayorista).
  - [ ] Validaciones automáticas (imágenes mínimas, SKU único, tallas válidas).
  - [ ] Sinónimos y boosting en buscador, gestión de índices.
- Moderación avanzada:
  - [ ] Cola de revisión con estados y reportes de usuarios sobre productos/tiendas.
  - [ ] Reglas automáticas (flag por palabras/imágenes prohibidas).
  - [ ] Lista negra/whitelist de vendedores, bloqueo por IP/usuario.
  - [ ] Bitácora de moderación extendida.
- Vendedores/Tiendas:
  - [ ] Onboarding y KYC (documentos, verificación manual/automática).
  - [ ] Comisiones por categoría/tienda, tarifas y niveles.
  - [ ] Payouts/liquidaciones (resúmenes y conciliación).
  - [ ] Salud de tienda (SLA, cancelaciones, reclamos), strikes y sanciones.
- Usuarios:
  - [ ] Impersonación segura para soporte (con auditoría).
  - [ ] Gestión de sesiones y revocación de tokens.
  - [ ] Mensajes a usuario (advertencias, motivos de baneo/suspensión).
- Pedidos y postventa:
  - [ ] Gestión de pedidos (estados, comentarios internos).
  - [ ] Reembolsos y devoluciones/RMA, etiquetas de retorno.
  - [ ] Disputas y resolución (timeline y evidencias).
- Marketing y crecimiento:
  - [ ] Cupones avanzados (segmentos, límite por usuario/tienda).
  - [ ] Campañas y plantillas de notificaciones (email/push/WhatsApp).
  - [ ] Feed Google Merchant / Facebook Catalog.
- Analítica y reporting:
  - [ ] KPIs de ventas, conversión, productos top/flagged.
  - [ ] Embudo de publicación (borrador→publicado), tiempos de aprobación.
  - [ ] Cohortes de vendedores, alertas operativas (stock bajo, picos de rechazo).
- Seguridad, cumplimiento y configuración:
  - [ ] Revisión RLS/roles y permisos granulares (admin/moderator/soporte).
  - [ ] Exportación/elim. de datos (privacy), consentimientos.
  - [ ] Feature flags, mantenimiento, invalidación de caché.
  - [ ] SEO: metadatos, redirects, sitemaps.

## Riesgos y mitigaciones

- Contenido sensible/abusivo: moderación manual con auditoría y motivos obligatorios.
- Borrado accidental: usar soft delete y confirmaciones dobles.
- Rendimiento en Home: paginación/caché y límites de consulta.

## Gate de aprobación

Marca los pasos completados y confirma cuando podamos avanzar a la siguiente fase. Dejé cada fase “Aprobación requerida” para que controles el ritmo.

---

## Estado actual del esquema (snapshot)

El archivo `SUPABASE_SCHEMA.md` fue actualizado hoy con el estado real del proyecto. Cambios estructurales propuestos se aplicarán sólo después de tu aprobación en Fase 1.
