import { uploadFileAndGetUrl } from "@/lib/firebase/storage";
import { compressImageClient } from "@/utils/image/compress";

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
