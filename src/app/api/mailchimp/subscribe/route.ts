import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request: Request) {
  try {
    const { email, formKey } = await request.json();

    if (!email || !email.length) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!formKey) {
      return NextResponse.json(
        { error: "Form configuration is missing" },
        { status: 400 },
      );
    }

    // Fetch Mailchimp credentials from Sanity
    const formConfig = await client.fetch(
      `*[_type in ["page", "homePage"] && pageLayout[]._key == $formKey][0] {
        "mailchimpConfig": pageLayout[_key == $formKey][0] {
          mailchimpApiKey,
          mailchimpAudienceId
        }
      }`,
      { formKey },
    );

    const API_KEY = formConfig?.mailchimpConfig?.mailchimpApiKey;
    const AUDIENCE_ID = formConfig?.mailchimpConfig?.mailchimpAudienceId;

    // Extract datacenter from API key (API keys are formatted as: key-us20)
    let DATACENTER = "";
    if (API_KEY) {
      const match = API_KEY.match(/-([a-z0-9]+)$/);
      if (match) {
        DATACENTER = match[1];
      }
    }

    if (!API_KEY || !AUDIENCE_ID || !DATACENTER) {
      console.error("Missing Mailchimp configuration");
      return NextResponse.json(
        { error: "Newsletter service is not configured" },
        { status: 500 },
      );
    }

    const data = {
      email_address: email,
      status: "subscribed",
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const responseData = await response.json();

    if (response.status >= 400) {
      // Check if email is already subscribed
      if (responseData.title === "Member Exists") {
        return NextResponse.json(
          { error: "Already subscribed" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { error: responseData.detail || "Failed to subscribe" },
        { status: response.status },
      );
    }

    return NextResponse.json({ message: "Signed Up!" }, { status: 201 });
  } catch (error) {
    console.error("Mailchimp subscription error:", error);
    return NextResponse.json(
      { error: "An error occurred while subscribing" },
      { status: 500 },
    );
  }
}
