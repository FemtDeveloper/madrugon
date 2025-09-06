"use client";

import { getApps, initializeApp } from "firebase/app";

import { getAnalytics as _getAnalytics } from "firebase/analytics";

let firebaseApp: any = null;

export function initFirebase(config: any) {
  if (typeof window === "undefined") return null;
  try {
    if (!getApps().length) {
      firebaseApp = initializeApp(config);
    }
    return firebaseApp;
  } catch (e) {
    console.error("initFirebase error", e);
    return null;
  }
}

export function getAnalytics(app?: any) {
  try {
    return _getAnalytics(app ?? firebaseApp);
  } catch {
    // analytics may not be available in some environments / firebase plans
    return null;
  }
}
