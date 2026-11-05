import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { client } from "@/sanity/lib/client";
import { COLOR } from "@/utils/constants/colors";
import groq from "groq";

export const runtime = "edge";

// Query to fetch blog post data for OG image
const blogOgQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    ogTitle,
    datePublished,
    author->{
      name
    },
    "ogBackgroundImage": ogBackgroundImage.asset->url,
  }
`;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string | string[] }> }
) {
  try {
    const resolvedParams = await params;
    const slugArray = Array.isArray(resolvedParams.slug)
      ? resolvedParams.slug
      : [resolvedParams.slug];
    // Construct the Sanity slug format: /blog/slug-name (with leading slash to match Sanity storage)
    const slug = `/blog/${slugArray.join("/")}`;

    // Check for preview mode with query params
    const { searchParams } = new URL(request.url);
    const isPreview = searchParams.get("preview") === "true";

    // In preview mode, query draft content; otherwise query published content
    const queryClient = isPreview
      ? client.withConfig({ perspective: "drafts" })
      : client;

    const post = await queryClient.fetch(blogOgQuery, { slug });

    if (!post) {
      return new Response(`Post not found. Looking for slug: ${slug}`, {
        status: 404,
      });
    }

    const title = post.ogTitle;
    const authorName = post.author?.name;
    const finalImage = post.ogBackgroundImage;

    // Format date
    const formattedDate = post.datePublished
      ? new Date(post.datePublished).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    // TODO: Change to custom font
    const fontData = await fetch(
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf"
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: `linear-gradient(to right, ${COLOR.PRIMARY_DARK} , ${COLOR.BLACK})`,
          padding: "40px",
          position: "relative",
          fontFamily: "Roboto", // TODO: Update to custom font
        }}
      >
        {/* Image in upper right corner */}
        {finalImage && (
          <img
            src={finalImage}
            alt="Blog post image"
            style={{
              position: "absolute",
              top: 40,
              right: 40,
              width: 400,
              aspectRatio: "16 / 9",
              objectFit: "cover",
            }}
          />
        )}

        {/* Logo */}
        <div
          style={{
            width: 218,
            height: 85,
            display: "flex",
            position: "relative",
          }}
        >
          <svg
            className="logo-0-2-8"
            id="Logo"
            xmlns="http://www.w3.org/2000/svg"
            width="218"
            height="85"
            viewBox="0 0 54.461 21.248"
            role="img"
            aria-label="Riff Logo"
          >
            <path
              id="Path_1"
              data-name="Path 1"
              d="M55.15,59.1,50.961,54.3H50.37V59.1H46V44.087h8.126a5.688,5.688,0,0,1,3.983,1.389,4.739,4.739,0,0,1,1.5,3.651,4.9,4.9,0,0,1-.979,3.069,5.093,5.093,0,0,1-2.686,1.814L60.408,59.1Zm-1.844-8.2a2.156,2.156,0,0,0,1.457-.47,1.458,1.458,0,0,0,.547-1.187,1.436,1.436,0,0,0-.547-1.165,2.308,2.308,0,0,0-1.457-.426H50.37V50.9Z"
              transform="translate(-45.999 -42.183)"
              fill="#FFFFFF"
            ></path>
            <path
              id="Path_2"
              data-name="Path 2"
              d="M108.626,36.911a2.337,2.337,0,0,1,1.707.672,2.23,2.23,0,0,1,.683,1.613,2.2,2.2,0,0,1-.659,1.635,2.413,2.413,0,0,1-1.73.65,2.331,2.331,0,0,1-1.707-.65,2.16,2.16,0,0,1-.684-1.635,2.183,2.183,0,0,1,.684-1.613A2.337,2.337,0,0,1,108.626,36.911Zm-2.117,16.912V42.511h4.257V53.823Z"
              transform="translate(-89.995 -36.911)"
              fill="#FFFFFF"
            ></path>
            <path
              id="Path_3"
              data-name="Path 3"
              d="M141.2,43.814v3.271h-2.8v8.042h-4.257V47.084h-1.524V43.814h1.524V43.1a4.186,4.186,0,0,1,1.291-3.2,4.768,4.768,0,0,1,3.4-1.209,6.551,6.551,0,0,1,2.481.47l-.843,3.159a2.7,2.7,0,0,0-.8-.112,1.292,1.292,0,0,0-.911.313,1.064,1.064,0,0,0-.364.851v.447Z"
              transform="translate(-109.266 -38.214)"
              fill="#FFFFFF"
            ></path>
            <path
              id="Path_4"
              data-name="Path 4"
              d="M182.11,43.814v3.271h-2.8v8.042h-4.257V47.084h-1.524V43.814h1.524V43.1a4.186,4.186,0,0,1,1.291-3.2,4.768,4.768,0,0,1,3.4-1.209,6.552,6.552,0,0,1,2.481.47l-.843,3.159a2.7,2.7,0,0,0-.8-.112,1.291,1.291,0,0,0-.91.313,1.064,1.064,0,0,0-.364.851v.447Z"
              transform="translate(-139.144 -38.214)"
              fill="#FFFFFF"
            ></path>
            <path
              className="underscore-0-2-10"
              id="Path_5"
              data-name="Path 5"
              d="M205.778,108.986V106.1h11.381v2.89Z"
              transform="translate(-162.698 -87.738)"
              fill="#5D39E7"
            ></path>
          </svg>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "900px",
          }}
        >
          {/* Title */}
          {title && (
            <div
              style={{
                fontSize: title.length > 60 ? "56px" : "72px",
                fontWeight: 900,
                color: "white",
                lineHeight: 1.2,
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                position: "relative",
              }}
            >
              {title}
            </div>
          )}

          {/* Metadata */}
          <div
            style={{
              display: "flex",
              gap: "30px",
              fontSize: "28px",
              color: "#e0e0e0",
              position: "relative",
            }}
          >
            {authorName && <div style={{ display: "flex" }}>{authorName}</div>}
            {formattedDate && (
              <div style={{ display: "flex" }}>{formattedDate}</div>
            )}
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Roboto", // TODO: Update to custom font
            data: fontData,
            weight: 900, // Bold weight
            style: "normal",
          },
        ],
        headers: isPreview
          ? {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            }
          : {
              "Cache-Control": "public, max-age=31536000, immutable",
            },
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
