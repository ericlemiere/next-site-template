"use client";
import { useMedia } from "react-use";

import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Text } from "@/modules/Text";

import { COLOR } from "@/utils/constants/colors";
import { clampSize } from "@/utils/helpers/style-helpers";

// ================================================================== BLOG FILTER
export const BlogFilter = ({
  data,
  textAlignment,
  activeFilter,
  setActiveFilter,
}) => {
  const alignmentString =
    textAlignment === "center" ? "md:justify-center" : "md:justify-start";

  return (
    <div
      role="group"
      aria-label="Filter blog posts by category"
      className={`filter_row flex flex-wrap w-full mx-auto mb-clamp-50 gap-clamp-10 ${alignmentString}`}
    >
      <ScrollAnimation type="fade-in">
        <button
          aria-pressed={activeFilter === null}
          aria-label="Show all blog posts"
          className={`
            filter_tag flex rounded-button gap-clamp-8 pt-clamp-10 px-clamp-16 pb-clamp-8
            border transition-all duration-300 ease-out
            hover:border-secondary cursor-pointer group
            ${
              activeFilter === null
                ? "border-secondary bg-secondary"
                : "border-gray bg-white"
            }
          `}
          onClick={() => setActiveFilter(null)}
        >
          <Text
            size="heading4"
            tag="p"
            className="flex justify-center items-center capitalize gap-clamp-8 group-hover:underline"
            color={activeFilter === null ? COLOR.WHITE : COLOR.BLACK}
          >
            All
          </Text>
        </button>
      </ScrollAnimation>
      <RenderFilters
        filters={data.sort()}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
};

// ================================================================== RENDER FILTERS
const RenderFilters = ({ filters, activeFilter, setActiveFilter }) => {
  const isMobile = useMedia("(max-width: 600px)", false);
  return filters?.map((filter, i) => {
    const isActive = activeFilter === filter;
    return (
      <ScrollAnimation
        key={filter}
        type="fade-in"
        delay={isMobile ? 0 : (i + 1) * 0.15}
      >
        <button
          aria-pressed={isActive}
          aria-label={`Filter blog posts by ${filter}`}
          className={`
            filter_tag flex rounded-button gap-clamp-8 pt-clamp-10 px-clamp-16 pb-clamp-8
            border transition-all duration-300 ease-out
            hover:border-secondary cursor-pointer group
            ${
              isActive
                ? "border-secondary bg-secondary text-white"
                : "border-gray bg-white text-black"
            }
          `}
          onClick={() => {
            setActiveFilter(isActive ? null : filter);
          }}
        >
          <Text
            size="heading4"
            tag="p"
            className="flex justify-center items-center capitalize gap-clamp-8 group-hover:underline"
            color={activeFilter === filter ? COLOR.WHITE : COLOR.BLACK}
          >
            {filter}
            {activeFilter === filter && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={clampSize(16)}
                height={clampSize(16)}
                viewBox="0 0 16 17"
                fill="none"
              >
                <circle cx="8" cy="8.5" r="8" fill={COLOR.WHITE} />
                <line
                  x1="5.70711"
                  y1="6.20703"
                  x2="9.94975"
                  y2="10.4497"
                  stroke="black"
                  strokeLinecap="round"
                />
                <line
                  x1="9.9502"
                  y1="6.20711"
                  x2="5.70755"
                  y2="10.4497"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </Text>
        </button>
      </ScrollAnimation>
    );
  });
};
