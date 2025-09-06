"use client";

import { getAnalytics, initFirebase } from "@/lib/firebase/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const analyticsRef = useRef<any>(null);

  // Initialize Firebase Analytics once on the client in production
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID) return;
    const app = initFirebase(firebaseConfig);
    const analytics = getAnalytics(app);
    if (analytics) {
      analyticsRef.current = analytics;
      // Initial page_view on first mount
      try {
        const page_location = window.location.href;
        const q = searchParams?.toString();
        const page_path = `${pathname}${q ? `?${q}` : ""}`;
        logEvent(analytics, "page_view", { page_location, page_path });
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SPA page_view on route change (App Router)
  useEffect(() => {
    const analytics = analyticsRef.current;
    if (!analytics) return;
    try {
      const page_location = window.location.href;
      const q = searchParams?.toString();
      const page_path = `${pathname}${q ? `?${q}` : ""}`;
      logEvent(analytics, "page_view", { page_location, page_path });
    } catch {}
  }, [pathname, searchParams]);

  return null;
}
