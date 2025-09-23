import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return NextResponse.json({
    ok: true,
    ts: new Date().toISOString(),
    commit: process.env.GIT_COMMIT || "unknown",
  });
};
