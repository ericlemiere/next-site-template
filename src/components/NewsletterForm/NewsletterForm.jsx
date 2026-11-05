"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Image } from "@/modules/Image";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { defaultWidthString } from "@/utils/constants/spacing";
import { textAlignHelper, justifyHelper } from "@/utils/helpers/style-helpers";
import { TextBlock } from "@/modules/TextBlock/TextBlock";

export const NewsletterForm = ({ data, loading }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    title,
    body,
    backgroundImage,
    onFormSubmitLink,
    anchorTagLink,
    sectionStyles = {},
    _key,
  } = data;
  const { textAlignment, topSpacing, bottomSpacing, backgroundColor } =
    sectionStyles;

  const textAlignString = textAlignHelper(textAlignment);
  const justifyString = justifyHelper(textAlignment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/mailchimp/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, formKey: _key }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Signed Up!");
        setEmail("");

        // Redirect if onFormSubmitLink has data
        if (onFormSubmitLink?.slug?.current) {
          router.push(onFormSubmitLink.slug.current);
        }
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe");
    }
  };

  return (
    <DefaultWrapper
      mobileWidth={"w-full"}
      desktopWidth={"lg:w-full"}
      topSpacing="none"
      bottomSpacing="none"
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      searchKey={_key}
      as="div"
    >
      {backgroundImage?.image && (
        <div className="absolute inset-0 w-full h-full">
          <ScrollAnimation
            type="fade-in"
            duration={1}
            className="w-full h-full"
            threshold={0.05}
          >
            <Image
              image={backgroundImage}
              loading={loading}
              sizes="100vw"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-black/60" />
          </ScrollAnimation>
        </div>
      )}

      <DefaultWrapper topSpacing={topSpacing} bottomSpacing={bottomSpacing}>
        <div
          className={`z-10 flex flex-col m-auto ${defaultWidthString} ${justifyString} ${textAlignString}`}
        >
          <TextBlock title={title} body={body} sectionStyles={sectionStyles} />

          <ScrollAnimation type="fade-in" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className={`w-full max-w-100 md:max-w-none md:w-clamp-500 mt-clamp-100 relative ${textAlignment === "center" ? "mx-auto" : ""}`}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <div className="flex items-center justify-between gap-1 p-1 rounded-33 bg-white">
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  disabled={status === "loading"}
                  aria-required="true"
                  aria-describedby="email-message"
                  className="flex-1 min-w-0 pl-2 sm:pl-clamp-24 pr-2 sm:pr-clamp-16 h-clamp-60 rounded-33 bg-transparent text-gray-900 placeholder:text-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-inset-6 focus:ring-primary text-body2 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label="Subscribe to newsletter"
                  className="shrink-0 px-6 sm:px-clamp-36 h-clamp-60 rounded-36 
                 bg-primary text-white hover:text-primary hover:bg-white border-2 border-primary
                 transition-colors cursor-pointer text-body2 font-bold
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "..." : "Next"}
                </button>
              </div>

              {message && (
                <p
                  id="email-message"
                  className={`absolute top-1/2 w-[calc(100%-8px)] -translate-y-1/2 left-1 text-body2 flex h-clamp-60 items-center pl-clamp-24 bg-white border rounded-33 ${
                    status === "success" ? "text-primary" : "text-red-600"
                  }`}
                  aria-live="polite"
                  role="alert"
                >
                  {message}
                </p>
              )}
            </form>
          </ScrollAnimation>
        </div>
      </DefaultWrapper>
    </DefaultWrapper>
  );
};
