// Simple client-side helper to trigger Next.js on-demand revalidation for promo/homepage banners.
// Debounced to avoid spamming during rapid reorder operations.

let timer: any = null;

export function requestPromoRevalidation(opts?: { immediate?: boolean; tags?: string[] }) {
  const run = () => {
    fetch('/api/revalidate/promo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targets: opts?.tags }),
    }).catch(() => {});
  };
  if (opts?.immediate) {
    clearTimeout(timer);
    run();
    return;
  }
  clearTimeout(timer);
  timer = setTimeout(run, 500); // 500ms debounce window
}
