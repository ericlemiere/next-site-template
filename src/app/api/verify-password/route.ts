import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { PAGE_PASSWORD_QUERY } from "@/sanity/lib/queries";

export async function POST(request: NextRequest) {
  try {
    const { password, slug } = await request.json();

    // Fetch the page password from Sanity (server-side only)
    const pageData = await client.fetch(PAGE_PASSWORD_QUERY, { slug });

    if (!pageData) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    if (!pageData.passwordProtected) {
      return NextResponse.json(
        { success: false, error: "Page is not password protected" },
        { status: 400 }
      );
    }

    // Verify the password
    const isValidPassword = password === pageData.password;

    if (isValidPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Password verification error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
