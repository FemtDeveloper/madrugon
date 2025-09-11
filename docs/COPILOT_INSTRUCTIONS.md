---
applyTo: "**"
---

# Instrucciones del proyecto para GitHub Copilot (Madrugón)

Por favor, sigue estas reglas al generar o modificar código en este repositorio:

## UI y formularios

- Usa React Hook Form (RHF) con nuestros componentes ya existentes en `src/components/Inputs`:
  - RHFCustomInput, RHFCustomNumericInput, RHFCustomSelect, RHFRadioButtons, RHFCheckboxes, RHFCustomCheckbox.
- Botones y links: usa `CustomButton` y `CustomLink` de `src/components/Ui`.
- Mantén componentes como funciones de React con TypeScript estricto.

## Data fetching y estado

- Usa TanStack Query (`@tanstack/react-query`) para lecturas remotas y caché. No uses `useEffect` para fetch directo salvo casos muy puntuales.
- Encapsula llamadas a Supabase en módulos de `src/services/**`. Las vistas consumen estos servicios vía React Query.

## Supabase

- Cliente del navegador: `import { createClient } from "@/utils"` (wrap de `src/utils/supabase/client`).
- Cliente de servidor: `import { createClient as createServerClient } from "@/utils/supabase/server"` cuando sea estrictamente necesario en Server Actions o rutas.
- Respeta RLS: las escrituras admin/moderación dependen de funciones/roles. Maneja errores claramente.

## Nuevas funcionalidades (Fase 2)

- CMS: CRUD para `hero_slides`, `homepage_banners`, `promo_banners` implementado en `src/services/cms.ts` y consumido con React Query.
- Ads Marketplace: `ad_slots`, `ad_applications`, `ad_reservations`, `ad_assets` en `src/services/ads.ts` con helpers para aplicar a espacios, listar slots y gestionar reservas.
- Moderación: acciones de `ban`, `suspend`, `verify` usuarios y `remove` productos en `src/services/moderation.ts` (registra `moderation_logs`).
- Promos/Modal: lector de promos activas y `recordPromotionEvent` en `src/services/promotions.ts`.

## Estilo

- Preferir `const`, `async/await`, y `try/catch` con mensajes de error útiles.
- Tipar con `Database` de `database.types.ts` cuando sea posible.
- No introducir librerías nuevas sin justificarlo.

Gracias 💙
