import { NextResponse } from "next/server";
import { getVehicleDetails } from "@/server/services/vehicle.service";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const result = await getVehicleDetails(slug);
    if (!result) return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    return NextResponse.json(result, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("GET /api/vehicles/[slug]:", error);
    return NextResponse.json({ error: "Failed to load vehicle" }, { status: 500 });
  }
}
