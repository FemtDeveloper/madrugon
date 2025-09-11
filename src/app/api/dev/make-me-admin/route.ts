import { NextResponse } from "next/server";

// Disabled: no code-based elevation to super-admin is allowed.
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Disabled endpoint" },
    { status: 410 }
  );
}
