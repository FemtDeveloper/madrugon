import { NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";

// POST /api/images/compress
// Body: multipart/form-data with field 'file' (image)
// Query params: w (max width), q (quality 1-100), format (jpeg|webp|png)
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const maxW = Number(searchParams.get("w") || 1600);
    const quality = Number(searchParams.get("q") || 75);
    const format = (searchParams.get("format") || "webp").toLowerCase();

    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    let pipeline = sharp(Buffer.from(arrayBuffer)).rotate().resize({ width: maxW, withoutEnlargement: true });

    if (format === "jpeg" || format === "jpg") pipeline = pipeline.jpeg({ quality });
    else if (format === "png") pipeline = pipeline.png({ quality });
    else pipeline = pipeline.webp({ quality });

  const outputBuffer = await pipeline.toBuffer();
  const body = new Uint8Array(outputBuffer);

  return new Response(body, {
      headers: {
        "Content-Type": `image/${format === "jpg" ? "jpeg" : format}`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Compression failed" }, { status: 500 });
  }
}
