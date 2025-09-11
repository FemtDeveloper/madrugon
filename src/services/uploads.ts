import { compressImageClient } from "@/utils/image/compress";
import { uploadFileAndGetUrl } from "@/lib/firebase/storage";

// Max size (bytes) before client-side reject, irrespective of compression
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export type UploadTarget =
  | { kind: "profile"; userId: string }
  | { kind: "brand"; brandId: string }
  | { kind: "store"; storeId: string; type: "logo" | "banner" };

export interface CompressOptions {
  width?: number; // max width
  quality?: number; // 1-100
  format?: "webp" | "jpeg" | "png";
}

async function compressImage(file: File, opts: CompressOptions = {}) {
  const format = opts.format ?? "webp";
  return await compressImageClient(file, {
    width: opts.width ?? 1600,
    quality: opts.quality ?? 80,
    format: format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp",
  });
}

function makePath(target: UploadTarget, fileName: string) {
  const ts = Date.now();
  if (target.kind === "profile") return `users/${target.userId}/profile-${ts}-${fileName}`;
  if (target.kind === "brand") return `brands/${target.brandId}/logo-${ts}-${fileName}`;
  // store assets
  return `stores/${target.storeId}/${target.type}-${ts}-${fileName}`;
}

export async function uploadImageToFirebase(
  file: File,
  target: UploadTarget,
  compress?: CompressOptions
) {
  if (!file.type.startsWith("image/")) throw new Error("Solo se permiten imágenes");
  if (file.size > MAX_FILE_SIZE_BYTES) throw new Error("La imagen supera el tamaño máximo de 10MB");

  const processed = compress ? await compressImage(file, compress) : file;

  const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "-");
  const path = makePath(target, safeName);
  const url = await uploadFileAndGetUrl(path, processed);
  return url;
}

// Upload a single promo banner image (compressed) to Firebase Storage
export async function uploadPromoBannerImage(
  file: File,
  opts: { width?: number; quality?: number } = {}
) {
  if (!file.type.startsWith("image/")) throw new Error("Solo se permiten imágenes");
  if (file.size > MAX_FILE_SIZE_BYTES)
    throw new Error("La imagen supera el tamaño máximo de 10MB");

  const processed = await compressImageClient(file, {
    width: opts.width ?? 1600,
    quality: opts.quality ?? 80,
    format: "image/webp",
  });

  const ts = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "-");
  const path = `promo_banners/${ts}-${Math.random().toString(36).slice(2)}-${safeName}`;
  const url = await uploadFileAndGetUrl(path, processed);
  return url;
}

// Upload up to 3 product images. Images are compressed on the client before upload.
export async function uploadProductImagesToFirebase(
  files: File[],
  opts: { userId: string; width?: number; quality?: number }
) {
  // Enforce a hard cap of 3 images
  const selected = files.slice(0, 3);
  const urls: string[] = [];

  for (const f of selected) {
    if (!f.type.startsWith("image/")) continue;
    if (f.size > MAX_FILE_SIZE_BYTES)
      throw new Error("Una o más imágenes superan 10MB");

    const processed = await compressImageClient(f, {
      width: opts.width ?? 1600,
      quality: opts.quality ?? 80,
      format: "image/webp",
    });

    const safeName = f.name.replace(/[^a-zA-Z0-9_.-]/g, "-");
    const ts = Date.now();
    const path = `products/users/${opts.userId}/${ts}-${Math.random()
      .toString(36)
      .slice(2)}-${safeName}`;
    const url = await uploadFileAndGetUrl(path, processed);
    urls.push(url);
  }

  return urls;
}
