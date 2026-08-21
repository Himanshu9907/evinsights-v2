import { NextResponse } from "next/server";

import {
  searchVehicles,
} from "@/server/services/search.service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(
      request.url
    );

    const query =
      searchParams.get("q") || "";

    const limit = Math.min(
      50,
      Math.max(
        1,
        Number(searchParams.get("limit")) || 10
      )
    );

    const results = await searchVehicles(
      query,
      limit
    );

    return NextResponse.json({
      query,
      results,
    });
  } catch (error) {
    console.error(
      "GET /api/search:",
      error
    );

    return NextResponse.json(
      {
        error: "Search failed",
      },
      { status: 500 }
    );
  }
}