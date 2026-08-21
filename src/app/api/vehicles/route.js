import { NextResponse } from "next/server";
import { listVehicles } from "@/server/services/vehicle.service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await listVehicles({
      page: Math.max(1, Number(searchParams.get("page")) || 1),
      limit: Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 12)),
      brandId: searchParams.get("brandId") || null,
    });
    return NextResponse.json(result, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("GET /api/vehicles:", error);
    return NextResponse.json({ error: "Failed to load vehicles" }, { status: 500 });
  }
}
