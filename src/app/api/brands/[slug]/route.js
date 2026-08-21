import { NextResponse } from "next/server";
import { getBrandBySlug } from "@/server/repositories/brand.repository";
import { getAllVehicles } from "@/server/repositories/vehicle.repository";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const brand = await getBrandBySlug(slug);
    if (!brand) return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    const vehicles = (await getAllVehicles()).filter((vehicle) => vehicle.brandId === brand.id);
    return NextResponse.json({ brand, vehicles });
  } catch (error) {
    console.error("GET /api/brands/[slug]:", error);
    return NextResponse.json({ error: "Failed to load brand" }, { status: 500 });
  }
}
