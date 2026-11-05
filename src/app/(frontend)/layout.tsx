import { draftMode } from "next/headers";
import { HeaderServer } from "@/components/Header";
import { FooterServer } from "@/components/Footer";
import { AnimationProvider } from "@/appContexts";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { LAYOUT_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { CookiePopUp } from "@/modules/CookiePopUp";
import { VisualEditingClient } from "@/components/VisualEditingClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GoogleTranslate } from "@/modules/GoogleTranslate";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { cleanString } from "@/utils/helpers/string-helpers";
import { ConditionalViewTransition } from "@/components/ConditionalViewTransition";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isDraftMode = (await draftMode()).isEnabled;

  // Fetch layout settings (cookie and breadcrumb data)
  const { data: layoutSettings } = await sanityFetch({
    query: LAYOUT_SETTINGS_QUERY,
  });

  const cookieData = layoutSettings?.cookieData;
  const breadcrumbData = layoutSettings?.breadcrumbData;
  const addBreadcrumbs = breadcrumbData?.addBreadcrumbs || false;
  const analyticsData = layoutSettings?.analyticsData;
  const gaId = analyticsData?.gaId ? cleanString(analyticsData.gaId) : null;
  const gtmId = analyticsData?.gtmId ? cleanString(analyticsData.gtmId) : null;
  const googleTranslateData = layoutSettings?.googleTranslateData;
  const googleTranslateEnabled = googleTranslateData?.enabled || false;
  const googleTranslateLanguages = googleTranslateData?.languages || [];

  return (
    <AnimationProvider>
      {/* Google Analytics / Google Tag Manager */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}

      <div className="min-h-screen overflow-x-hidden flex flex-col">
        <HeaderServer />
        <main className="flex-1 overflow-hidden">
          {addBreadcrumbs && (
            <Breadcrumbs
              backgroundColor={breadcrumbData?.backgroundColor ?? ""}
              textColor={breadcrumbData?.textColor ?? ""}
            />
          )}
          <ConditionalViewTransition name="page">
            {children}
          </ConditionalViewTransition>
          <SanityLive />
          {isDraftMode && <VisualEditingClient />}
          {googleTranslateEnabled && (
            <GoogleTranslate languages={googleTranslateLanguages} />
          )}
        </main>
        <FooterServer />

        {/* Cookie popup - shows on all pages until user interacts */}
        {cookieData?.body && <CookiePopUp data={cookieData} />}
      </div>
    </AnimationProvider>
  );
}
