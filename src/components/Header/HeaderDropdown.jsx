"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

import { Svg } from "@/modules/Svg";
import { SanityLinkWrapper } from "@/modules/SanityLinkWrapper";
import { Text } from "@/modules/Text";
import { clampSize } from "@/utils/helpers/style-helpers";

export const HeaderDropdown = ({
  data,
  colorString,
  size,
  isMobile,
  lastLink,
  dropdownLinkClicked,
}) => {
  const { links, title } = data || {};
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownHeight = links?.length * 60 ?? 0;
  const pathname = usePathname();

  // ===================================================================
  // HANDLE LINK CLICK
  // ===================================================================
  const handleClick = () => {
    // This is sending data up to the parent component (Header)
    dropdownLinkClicked(true);
    setIsDropdownOpen(false);
  };

  // ===================================================================
  // Close dropdown menu user clicks outside of it
  // ===================================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEnterOutside = (event) => {
      if (event.key === "Enter") {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          event.target !== toggleRef.current
        ) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    document.addEventListener("keydown", handleEnterOutside, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, {
        passive: true,
      });
      document.removeEventListener("keydown", handleEnterOutside, {
        passive: true,
      });
    };
  }, []);

  // ===================================================================
  // RENDER LINKS
  // ===================================================================
  const renderLinks = () => {
    return links?.map((link, i) => {
      const isPage = link?._type === "page";
      const linkObject = isPage
        ? {
            linkText: link?.navigationName,
            internalLink: {
              slug: {
                current: link?.slug?.current,
              },
            },
            linkType: "internalLink",
          }
        : link;

      const linkText = isPage ? link?.navigationName : link?.linkText;

      // Check if link is active based on pathname matching the internal link slug
      const isActive =
        linkObject.linkType === "internalLink" &&
        linkObject.internalLink?.slug?.current &&
        pathname === linkObject.internalLink.slug?.current;

      const activeStyleString = isActive
        ? "underline underline-offset-4 decoration-4 decoration-current"
        : "";

      const isFirst = i === 0;
      const isLast = i === links.length - 1;
      const paddingClasses = `${isFirst ? "pt-3" : ""} ${
        isLast ? "pb-3" : ""
      } px-3`;

      return (
        <li key={i} role="menuitem" className={`list-none ${paddingClasses}`}>
          <SanityLinkWrapper link={linkObject}>
            <div
              className={`flex justify-between items-center w-full min-w-75 bg-transparent hover:bg-primary/20 
                rounded px-clamp-10 py-clamp-10 cursor-pointer ${activeStyleString}`}
              onClick={handleClick}
            >
              <Text
                size="body1"
                tag="span"
                className={`whitespace-nowrap ${isActive ? "font-semibold text-primary" : "font-normal text-black"}`}
              >
                {linkText}
              </Text>
            </div>
          </SanityLinkWrapper>
        </li>
      );
    });
  };

  // ===================================================================
  // RENDER ITEM
  // ===================================================================
  const renderItem = () => {
    const rotateString = isDropdownOpen ? "rotate-180" : "rotate-0";
    const sizeString = isMobile ? "w-[20px] h-[20px]" : "w-clamp-12 h-clamp-12";
    const zIndexString = isDropdownOpen ? "z-10" : "z-1";
    const leftRightString = lastLink ? "right-0" : "left-0";
    return (
      <div className="relative w-full h-full">
        <div className="flex items-center w-full group">
          <Text
            tag="p"
            size={size}
            className={`header_dropdown-title w-fit mr-2 ${colorString}`}
          >
            {title}
          </Text>
          <div
            className={`relative transform duration-300 ease-in-out ${sizeString} ${rotateString}`}
          >
            <Svg
              name="dropdown-arrow"
              className={`${isMobile ? "[&_path]:stroke-white" : "[&_path]:stroke-black group-hover:[&_path]:stroke-primary [&_path]:transition-colors duration-300"}`}
            />
          </div>
        </div>
        {isMobile ? (
          <ul
            // Mobile Dropdown Body
            id={`dropdown-menu-${title}`}
            role="menu"
            className={`header_dropdown_body_mobile relative overflow-hidden bg-gray
              transition-all duration-300 ease-in-out shadow-[4px_13px_9px_-1px_rgba(0,0,0,0.25)]`}
            style={{
              maxHeight: isDropdownOpen ? clampSize(dropdownHeight) : 0,
            }}
          >
            {renderLinks()}
          </ul>
        ) : (
          <ul
            // Desktop Dropdown Body
            id={`dropdown-menu-${title}`}
            role="menu"
            className={`header_dropdown_body absolute overflow-hidden top-[115%] bg-gray min-w-clamp-200
               transition-all duration-300 ease-in-out shadow-[4px_13px_9px_-1px_rgba(0,0,0,0.25)] ${leftRightString} ${zIndexString}`}
            style={{
              maxHeight: isDropdownOpen ? clampSize(dropdownHeight) : 0,
            }}
          >
            {renderLinks()}
          </ul>
        )}
      </div>
    );
  };

  // ===================================================================
  // Handle Mouse Down
  // ===================================================================
  const handleMouseDown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  // ===================================================================
  // Handle Focus
  // ===================================================================
  const handleFocus = useCallback(() => {
    setIsDropdownOpen(true);
  }, []);

  // ===================================================================
  // Handle Blur
  // ===================================================================
  const handleBlur = useCallback((e) => {
    if (!toggleRef.current.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  }, []);

  // Early return must come after all hooks so live edits that empty and
  // refill the links don't change the hook order between renders
  if (!links) return null;

  // ===================================================================
  // RENDER COMPONENT
  // ===================================================================
  const widthString = isMobile ? "w-full" : "w-max";
  return (
    <button
      className={`flex flex-col justify-between border-0 bg-transparent h-full cursor-pointer ${widthString}`}
      ref={toggleRef}
      onMouseDown={handleMouseDown}
      onFocus={handleFocus} // Opens dropdown when user tabs to it
      onBlur={handleBlur}
      aria-expanded={isDropdownOpen}
      aria-haspopup="menu"
      aria-controls={`dropdown-menu-${title}`}
    >
      {renderItem()}
    </button>
  );
};
