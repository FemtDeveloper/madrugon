export interface ClientCompressOptions {
  width?: number; // max width in px
  quality?: number; // 0-100
  format?: "image/webp" | "image/jpeg" | "image/png";
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    const reader = new FileReader();
    reader.onload = () => {
      img.src = String(reader.result);
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

export async function compressImageClient(
  file: File,
  opts: ClientCompressOptions = {}
): Promise<File> {
  const maxWidth = opts.width ?? 1600;
  const quality = (opts.quality ?? 80) / 100; // toBlob expects 0-1
  const preferredFormat: ClientCompressOptions["format"] =
    opts.format ?? "image/webp";

  const image = await loadImage(file);
  const scale = Math.min(1, maxWidth / (image.width || maxWidth));
  const targetW = Math.max(1, Math.round((image.width || maxWidth) * scale));
  const targetH = Math.max(1, Math.round((image.height || maxWidth) * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(image, 0, 0, targetW, targetH);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(
      (b) => resolve(b),
      preferredFormat,
      quality
    )
  );

  const outBlob =
    blob ||
    (await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", quality)
    )) ||
    null;

  if (!outBlob) return file;
  const ext = preferredFormat.includes("webp")
    ? "webp"
    : preferredFormat.includes("png")
    ? "png"
    : "jpg";
  const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "-");
  return new File([outBlob], safeName.replace(/\.[^.]+$/, `.${ext}`), {
    type: outBlob.type,
  });
}
