import { NextResponse } from "next/server";
import { getAllVehicles } from "@/server/repositories/vehicle.repository";
import { getAllBrands } from "@/server/repositories/brand.repository";
import { getAllSources } from "@/server/repositories/source.repository";

export async function GET() {
  try {
    const [vehicles, brands, sources] = await Promise.all([
      getAllVehicles(),
      getAllBrands(),
      getAllSources(),
    ]);
    return NextResponse.json({
      ok: true,
      service: "evinsights",
      database: {
        vehicles: vehicles.length,
        brands: brands.length,
        sources: sources.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("GET /api/health:", error);
    return NextResponse.json({ ok: false, error: "Database health check failed" }, { status: 500 });
  }
}
