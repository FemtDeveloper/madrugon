# Analytics Events Plan

This document outlines the recommended Google Analytics 4 (GA4) event strategy for the Madrugon e‑commerce and content site.

## What’s already tracked

- page_view (initial + SPA route changes)
- Automatic GA4 events: first_visit, session_start, user_engagement

## E‑commerce core events

Use GA4 ecommerce schema with `items[]`, `currency`, and `value`.

- view_item
  - When: product detail page
  - Params: items: [{ item_id, item_name, item_brand, item_category, price }], currency
- view_item_list
  - When: category/brand/listing pages
  - Params: item_list_id/name, items: [...]
- select_item
  - When: click product from a list
  - Params: item_list_id/name, items: [clicked item]
- add_to_cart / remove_from_cart
  - When: add/remove product from cart
  - Params: currency, value (line total), items: [...]
- view_cart
  - When: open cart
  - Params: currency, value, items: [...]
- begin_checkout
  - When: checkout start
  - Params: currency, value, items: [...]
- add_shipping_info
  - When: shipping step
  - Params: currency, value, items: [...], shipping_tier
- add_payment_info
  - When: payment step
  - Params: currency, value, items: [...], payment_type
- purchase
  - When: order completes
  - Params: transaction_id, currency, value (order total), tax, shipping, coupon, items: [...]
- refund (optional)
  - When: refund issued
  - Params: transaction_id, currency, value, items (for partial)
- add_to_wishlist
  - When: favorite product
  - Params: items: [...]

## Content and marketing events

- search or view_search_results
  - When: site search submit or results view
  - Params: search_term
- share
  - When: share product or article
  - Params: method, content_type (product|article), item_id
- view_promotion / select_promotion
  - When: promotional banner shown/clicked
  - Params: promotion_id, promotion_name, creative_name, creative_slot
- Optional content approach: track articles either with dedicated content events or as `view_item` with `item_category='article'`.

## Account and lead events

- sign_up
  - When: new account created
  - Params: method
- login
  - When: login success
  - Params: method
- generate_lead
  - When: seller onboarding, contact form, or newsletter signup
  - Params: lead_type (seller|contact|newsletter), value/currency if applicable

## Wiring guide by routes

- /producto/...: view_item; add_to_cart; share
- Listings (/categorias, /marcas, /hombre, /mujer, /ninos, /todo, /promos, /remates): view_item_list; select_item; view_promotion/select_promotion
- /busqueda: search or view_search_results
- /mis-favoritos: add_to_wishlist/remove_from_wishlist
- Checkout: view_cart → begin_checkout → add_shipping_info → add_payment_info → purchase
- /auth: sign_up, login
- /vender: generate_lead

## Next steps

- Implement `src/lib/analytics.ts` helpers for these events
- Ensure currency/value consistency across cart/checkout/purchase
- Consider consent mode and outbound link tracking for articles
