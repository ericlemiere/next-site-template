"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useMeasure, useWindowSize } from "react-use";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { HeaderBanner } from "./HeaderBanner";
import { HeaderDropdown } from "./HeaderDropdown";
import { SiteLogo, getLogoRatio } from "@/modules/SiteLogo";
import { Text } from "@/modules/Text";
import { SanityLinkWrapper } from "@/modules/SanityLinkWrapper";
import { SanityButton } from "@/modules/SanityButton";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Search } from "@/modules/Search/Search";

import CustomHeadroom from "./CustomHeadroom";
import { MenuLines } from "./HeaderMenuLines";

import { clampSize } from "@/utils/helpers/style-helpers";

// ========================================================================
// Header Types
// 1: Default (disappears on scroll down, reappears on scroll up)
// 2: Sticky (always visible on top)
// 3: Sticky Dynamic (always visible on top, changes padding on scroll)
// ========================================================================
export const Header = ({ data = {} }) => {
  // Props & Data
  const linkLayout = data?.pageLayout || [];
  const headerType = data?.headerType || 1;
  const headerBanner = data?.headerBanner || null;
  const button = data?.button || null;
  const logo = data?.logo || null;
  const pathname = usePathname();

  // Refs
  const headerRef = useRef(null);
  const mobileHeaderRef = useRef(null);
  const [ref, { width: navWidth }] = useMeasure();
  const lastMobileStateRef = useRef(false);
  const lastValidNavWidthRef = useRef(0);

  // Window Size
  const { width: windowWidth } = useWindowSize();

  // State
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [changeHeight, setChangeHeight] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);

  // Header Type Flags
  const isStickyHeader = headerType === 2 || headerType === 3;
  const isStickyDynamicHeader = headerType === 3;

  // Logo Constants
  // The logo is sized to logoHeight, and its width follows the logo's aspect ratio,
  // capped at logoMaxWidth (very wide logos shrink in height to fit instead).
  const logoHeight = 80; // TODO: adjust if needed
  const logoMaxWidth = 220; // TODO: adjust if needed
  const logoWidth = Math.min(
    logoMaxWidth,
    Math.round(logoHeight * getLogoRatio(logo)),
  );

  // Navbar Height Constants
  // TODO: make sure these are correct
  const scrollThreshold = 100; // Simple fixed threshold for sticky dynamic header
  const navBaseHeight = 100; // TODO: adjust if needed
  const bannerBaseHeight = headerBanner ? 43 : 0; // TODO: adjust if needed
  const navHeightShrink = 10;
  const bannerHeightShrink = bannerBaseHeight > 0 ? 10 : 0;
  const staticNavBarHeight = navBaseHeight + bannerBaseHeight;
  const dynamicNavBarHeight =
    staticNavBarHeight - navHeightShrink - bannerHeightShrink;
  const sideNavTop = isStickyDynamicHeader
    ? dynamicNavBarHeight
    : staticNavBarHeight;

  // ========================================================================
  // Header Spacer for Sticky Headers
  // ========================================================================
  const renderHeaderSpacer = () => {
    return (
      <div
        style={{ height: clampSize(navBaseHeight + bannerBaseHeight) }}
        className="header-spacer"
      />
    );
  };

  // ========================================================================
  // Dynamic Header Height - Simple scroll detection
  // ========================================================================
  useEffect(() => {
    if (typeof window !== "undefined" && isStickyDynamicHeader) {
      const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const hasScrolledPastThreshold = scrollY > scrollThreshold;

        // If mobile menu is open, always keep padding shrunk
        if (isMobileOpen) {
          if (!changeHeight) {
            setChangeHeight(true);
          }
          return;
        }

        // Mobile menu is closed - use scroll position
        const newValue = hasScrolledPastThreshold;
        if (changeHeight !== newValue) {
          setChangeHeight(newValue);
        }
      };

      // Set initial state
      handleScroll();

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll, { passive: true });
      };
    }
  }, [isStickyDynamicHeader, isMobileOpen, changeHeight]);

  // ========================================================================
  // Set hydration state
  // ========================================================================
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // ========================================================
  // Disable Body Scroll with CSS
  // ========================================================
  useEffect(() => {
    if (isMobileOpen && isMobile) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Apply CSS to prevent scrolling and maintain position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        // Restore scroll position when cleanup
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileOpen, isMobile]);

  // ========================================================================
  // sets breakpoint to:
  // header margin + navWidth + logoWidth  + buttonWidth + some extra padding
  // ========================================================================
  useEffect(() => {
    // Skip calculation if we don't have valid window width yet
    if (!windowWidth) return;

    // Store the navWidth when it's valid (not hidden)
    if (navWidth > 0) {
      lastValidNavWidthRef.current = navWidth;
    }

    // Use the last valid width for calculations (even when nav is hidden)
    const width = lastValidNavWidthRef.current || navWidth;

    // If we still don't have a valid width, skip calculation
    if (width === 0) return;

    const headerContainerWidth = windowWidth * 0.92; // Width set below on header_container
    const logoAndNavWidth = logoWidth + width;
    const availableSpace = headerContainerWidth - logoAndNavWidth;
    const bufferSpace = 50;

    // Determine if should be mobile
    const shouldBeMobile = availableSpace < bufferSpace;

    // Only update if the state actually needs to change
    if (shouldBeMobile !== lastMobileStateRef.current) {
      lastMobileStateRef.current = shouldBeMobile;
      setIsMobile(shouldBeMobile);
    }
  }, [navWidth, windowWidth, isMobile, logoWidth]);

  // ========================================================================
  // Clear clicked link state when pathname changes
  // ========================================================================
  useEffect(() => {
    setClickedLink(null);
  }, [pathname]);

  // ========================================================================
  // Close Mobile Nav on resize
  // ========================================================================
  useEffect(() => {
    if (!isMobile) {
      setIsMobileOpen(false);
    }
  }, [isMobile]);

  // This function is getting the data (if the link was clicked) from the dropdown menu
  // So the child is passing data up to the parent with this function
  const getClick = useCallback(
    (clicked) => {
      if (clicked) setIsMobileOpen(false);
    },
    [setIsMobileOpen],
  );

  // ========================================================================
  // Map for the different kinds of Nav Links
  // ========================================================================
  const navMap = useMemo(
    () =>
      linkLayout?.map((item, i) => {
        const isNavNameEmpty = item?.urlSlug?.current === "/home/";
        const link = isNavNameEmpty ? "/" : item?.slug?.current;
        const lastLink = linkLayout?.length === i + 1;

        // Find the last segment of the URL (only after hydration to prevent SSR mismatch)
        const lastSegment = isHydrated
          ? pathname.split("/").filter(Boolean).pop() || ""
          : "";
        const normalizedSegment = lastSegment.replace(/-/g, "").toLowerCase();
        const normalizedLink = link
          ?.replace(/&/g, "and")
          .replace(/[^A-Za-z0-9]/g, "")
          .toLowerCase();
        const isActive =
          isHydrated &&
          (clickedLink
            ? clickedLink === link
            : normalizedSegment === normalizedLink);

        //TODO: change for mobile nav style
        const textSize = isMobile ? "heading3" : "body1";
        const textColorString = isMobile
          ? "text-white"
          : "text-black group-hover:text-primary";
        const textActiveString = isMobile ? "text-white" : "text-primary";
        const headerLinkClass =
          "header-link transition-all duration-150 ease-in-out";

        const renderLink = (children) => (
          <ScrollAnimation
            type="fade-up"
            delay={i * 0.1}
            retrigger={true}
            className="py-5"
            key={i}
          >
            {children}
          </ScrollAnimation>
        );

        switch (item?._type) {
          case "page":
            return (
              item?.navigationName &&
              renderLink(
                <div
                  key={i}
                  className="header-link-wrapper relative w-fit group cursor-pointer"
                  onClick={() => {
                    setClickedLink(link);
                    setIsMobileOpen(false);
                  }}
                >
                  <Link href={link}>
                    <Text
                      tag="p"
                      size={textSize}
                      className={`${headerLinkClass} ${isActive ? textActiveString : textColorString}`}
                    >
                      {item.navigationName}
                    </Text>
                  </Link>
                  <div
                    className={`header-link-underline group-hover:bg-primary group-hover:translate-y-2 h-0.75 absolute bottom-0 left-0 right-0 transition-all duration-150 ease-in-out${
                      isActive ? "translate-y-2 bg-primary" : ""
                    }`}
                  />
                </div>,
              )
            );
          case "link":
            return renderLink(
              <div
                key={i}
                className="header-link-wrapper relative w-fit group cursor-pointer"
                onClick={() => setIsMobileOpen(false)}
              >
                <SanityLinkWrapper link={item}>
                  <Text
                    tag="p"
                    size={textSize}
                    className={`${headerLinkClass} ${textColorString}`}
                  >
                    {item.linkText}
                  </Text>
                </SanityLinkWrapper>
                <div className="header-link-underline group-hover:bg-primary group-hover:translate-y-2 h-0.75 absolute bottom-0 left-0 right-0 transition-all duration-150 ease-in-out" />
              </div>,
            );
          case "headerDropdown":
            return renderLink(
              <HeaderDropdown
                data={item}
                colorString={`${headerLinkClass} ${textColorString}`}
                size={textSize}
                isMobile={isMobile}
                lastLink={lastLink}
                dropdownLinkClicked={getClick}
              />,
            );

          default:
            return null;
        }
      }),
    [linkLayout, pathname, isMobile, isHydrated, clickedLink, isMobileOpen],
  );

  // ========================================================================
  // Render Header Wrapper
  // ========================================================================
  const renderHeaderWrapper = () => {
    return (
      <header className="relative w-full bg-white">
        {headerBanner && (
          <HeaderBanner
            data={headerBanner}
            bannerHeight={clampSize(
              changeHeight
                ? bannerBaseHeight - bannerHeightShrink
                : bannerBaseHeight,
            )}
          />
        )}
        <div
          className="header_container flex m-auto w-[92%] justify-between items-center"
          style={{
            transition: "all 0.6s ease",
            height:
              isStickyDynamicHeader && changeHeight
                ? clampSize(navBaseHeight - 10)
                : clampSize(navBaseHeight),
          }}
        >
          <ScrollAnimation type="fade-right">
            <Link
              href="/"
              aria-label="[Company name] Home Button Link" //TODO: include compnay name in label
              onClick={(e) => {
                setIsMobileOpen(false);
                // Prevent navigation and only scroll if already on home page
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  // Clear anchor/hash from URL
                  window.history.replaceState(
                    null,
                    "",
                    window.location.pathname,
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <div
                className="header_logo-container transition-all duration-200 hover:scale-105"
                style={{
                  width: clampSize(logoWidth),
                  height: clampSize(logoHeight),
                }}
              >
                <SiteLogo logo={logo} maxHeightPx={logoHeight} priority />
              </div>
            </Link>
          </ScrollAnimation>

          <div style={{ display: isMobile ? "none" : "block" }}>
            <nav aria-label="Main navigation">
              <div
                className="header_nav-container flex items-center gap-x-11"
                ref={ref}
                style={{ display: isMobile ? "none" : "flex" }}
              >
                {navMap}

                <ScrollAnimation type="fade-left">
                  <Search />
                </ScrollAnimation>

                {button?.text && (
                  <ScrollAnimation type="fade-left">
                    <SanityButton
                      data={button}
                      className="mobile-nav-button whitespace-nowrap"
                    />
                  </ScrollAnimation>
                )}
              </div>
            </nav>
          </div>

          {/* ============================================================ MOBILE NAV */}

          {isMobile && (
            <nav
              aria-label="Mobile navigation"
              className="header_side-nav fixed w-screen h-screen overflow-x-hidden overflow-y-auto 
              bg-black z-1000 flex flex-col px-[10%]"
              style={{
                right: isMobileOpen ? 0 : "-101vw",
                transition: "all 0.5s ease",
                top: sideNavTop,
              }}
              ref={mobileHeaderRef}
            >
              <div
                className="header_mobile-links-wrapper flex flex-col pt-15 pb-25
                w-full relative"
              >
                {navMap}
                {button?.text && (
                  <ScrollAnimation type="fade-up" width="100%" retrigger={true}>
                    <div onClick={() => setIsMobileOpen(false)}>
                      <SanityButton
                        data={button}
                        className="mobile-nav-button w-full mt-15"
                      />
                    </div>
                  </ScrollAnimation>
                )}
              </div>
            </nav>
          )}

          {isMobile && (
            <ScrollAnimation type="fade-left">
              <div className="flex items-center gap-3">
                <Search isMobile={true} />
                <button
                  className="header_mobile-menu-button flex flex-col gap-1.75 relative"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMobileOpen}
                  onClick={() => {
                    const newMobileOpenState = !isMobileOpen;
                    setIsMobileOpen(newMobileOpenState);

                    if (isStickyDynamicHeader) {
                      const scrollY = window.scrollY || window.pageYOffset || 0;
                      const hasScrolledPastThreshold =
                        scrollY > scrollThreshold;

                      if (newMobileOpenState) {
                        // Opening menu - always shrink padding
                        setChangeHeight(true);
                      } else {
                        // Closing menu - restore full padding only if at top
                        setChangeHeight(hasScrolledPastThreshold);
                      }
                    }
                  }}
                >
                  <MenuLines isOpen={isMobile && isMobileOpen} />
                </button>
              </div>
            </ScrollAnimation>
          )}
          {/* ============================================================ MOBILE NAV END  */}
        </div>
      </header>
    );
  };

  // ========================== MAIN RETURN ==========================
  return (
    <>
      {isStickyHeader ? (
        <>
          <div
            ref={headerRef}
            className="fixed w-screen top-0 z-1000"
            suppressHydrationWarning
          >
            {renderHeaderWrapper()}
          </div>
          {renderHeaderSpacer()}
        </>
      ) : (
        <div ref={headerRef} suppressHydrationWarning>
          {/* pinStart should be set to the max height of the header at 1526px */}
          <CustomHeadroom
            className="headroom"
            pinStart={
              isMobile
                ? navBaseHeight + bannerBaseHeight
                : ((navBaseHeight + bannerBaseHeight) / 1440) * 1526
            }
          >
            {renderHeaderWrapper()}
          </CustomHeadroom>
          {renderHeaderSpacer()}
        </div>
      )}
    </>
  );
};
