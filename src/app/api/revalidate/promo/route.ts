import { revalidatePath, revalidateTag } from 'next/cache';

// POST /api/revalidate/promo
// Optional JSON body: { targets?: string[] }
// Default tags now cover both promo_banners (hero) and homepage_banners (main banner)
export async function POST(req: Request) {
  try {
    let targets: string[] | undefined;
    try {
      const body = await req.json().catch(() => null);
      targets = body?.targets;
    } catch {}

  const defaultTags = ['promo_banners', 'homepage_banners'];
    const tags = targets && targets.length ? targets : defaultTags;
    tags.forEach((t) => revalidateTag(t));

    // Home page depends on these; revalidate its path for fresh HTML
    revalidatePath('/');

    return Response.json({ revalidated: true, tags });
  } catch (e: any) {
    return Response.json({ error: e?.message || 'Failed to revalidate' }, { status: 500 });
  }
}
