import { NextResponse } from "next/server";
import { compareVehicles } from "@/server/services/comparison.service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slugs = (searchParams.get("slugs") || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (slugs.length < 2) return NextResponse.json({ error: "Provide at least 2 vehicle slugs" }, { status: 400 });
    if (slugs.length > 4) return NextResponse.json({ error: "Comparison is limited to 4 vehicles" }, { status: 400 });
    return NextResponse.json({ vehicles: await compareVehicles(slugs) });
  } catch (error) {
    console.error("GET /api/compare:", error);
    return NextResponse.json({ error: "Comparison failed" }, { status: 500 });
  }
}
