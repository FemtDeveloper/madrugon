import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Lazy init Firebase app (credentials via env vars)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseStorage() {
  const app = getFirebaseApp();
  return getStorage(app);
}

export async function uploadFileAndGetUrl(path: string, file: Blob) {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, {
    contentType: (file as any).type || "image/jpeg",
    cacheControl: "public, max-age=31536000, s-maxage=31536000",
  });
  return await getDownloadURL(storageRef);
}
