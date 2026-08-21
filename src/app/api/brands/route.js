import { NextResponse } from "next/server";
import { getAllBrands } from "@/server/repositories/brand.repository";

export async function GET() {
  try {
    return NextResponse.json({ data: await getAllBrands() }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
  } catch (error) {
    console.error("GET /api/brands:", error);
    return NextResponse.json({ error: "Failed to load brands" }, { status: 500 });
  }
}
