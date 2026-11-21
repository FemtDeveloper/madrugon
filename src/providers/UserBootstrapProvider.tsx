"use client";

import { useUserStore } from "@/stores";
import { getMyProfile } from "@/utils/getMyProfile";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

/**
 * Keeps the client-side auth state (navbar, favorites, etc.) in sync with the
 * Supabase session. Auth is resolved in the browser so that public catalog
 * pages don't have to read cookies on the server and can be statically
 * generated / revalidated (ISR).
 */
export default function UserBootstrapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const supabase = createClient();
    const { setIsAuthenticated } = useUserStore.getState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(Boolean(session?.user));
      if (
        event === "INITIAL_SESSION" ||
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "USER_UPDATED"
      ) {
        // Defer Supabase calls out of the auth callback (recommended by supabase-js)
        setTimeout(() => {
          void getMyProfile();
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <>{children}</>;
}
