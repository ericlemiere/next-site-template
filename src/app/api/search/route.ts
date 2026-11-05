import { NextResponse } from "next/server";
import { searchContent } from "../../../sanity/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  // Validate query
  if (!q || typeof q !== "string") {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    );
  }

  if (q.length < 2) {
    return NextResponse.json(
      { error: "Query must be at least 2 characters" },
      { status: 400 }
    );
  }

  if (q.length > 100) {
    return NextResponse.json(
      { error: "Query must be less than 100 characters" },
      { status: 400 }
    );
  }

  try {
    const results = await searchContent(q);

    return NextResponse.json({
      results,
      query: q,
      count: results.length,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
