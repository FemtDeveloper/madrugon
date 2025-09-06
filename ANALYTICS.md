Summary — Firebase Analytics (GA4) + gtag setup for this Next.js app

What I added

- `src/lib/firebase/client.ts` — lightweight Firebase client init helpers.
- `src/components/Analytics/Analytics.tsx` — client component that initializes Firebase (if env vars present) and injects gtag (GA4) script when measurement id is present.
- `src/app/layout.tsx` — now imports `<Analytics />` so analytics bootstraps on every page.

Required environment variables (example `.env.local` entries):

NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# optional (when not using Firebase measurementId)

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

Notes & recommendations

- Enable Google Analytics when creating/setting your Firebase project for the `measurementId` to be available.
- We inject the `gtag.js` script client-side when a measurement id is present. If you already include gtag elsewhere, avoid duplication.
- Firebase's analytics features may require a Firebase plan that includes analytics. The code handles absence of analytics gracefully.

Testing

- Use Firebase DebugView or GA DebugView to verify events.
- Confirm `window.gtag` is available in browser devtools and that `gtag('config', ...)` was executed.

If you want, I can also:

- Add a small analytics wrapper `lib/analytics.ts` to centralize `gtag('event', ...)` calls and type-safe event naming.
- Add server-side Measurement Protocol tracking for event replay/SSR events.
