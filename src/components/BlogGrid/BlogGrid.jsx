"use client";
import { useState, useEffect } from "react";
import { useMedia } from "react-use";

import { BlogFilter } from "./BlogFilter";
import { BlogFeatured } from "./BlogFeatured";
import { BlogTile } from "./BlogTile";

import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { SanityButton } from "@/modules/SanityButton";
import { Text } from "@/modules/Text";
import { COLOR } from "@/utils/constants/colors";
import { cleanString } from "@/utils/helpers/string-helpers";

export const BlogGrid = ({ data = {}, loading }) => {
  const {
    title,
    grid = [],
    button,
    showFeaturedPost,
    limitGrid,
    showFilter,
    autoPopulate,
    autoPopulateTag,
    autoPopulateTagValue,
    anchorTagLink,
    sectionStyles = {},
    _key,
  } = data;
  const {
    backgroundColor = COLOR.WHITE,
    titleTextColor = COLOR.PRIMARY,
    titleTextSize = "heading1",
    textAlignment = "left",
    titleHeadingTag,
    topSpacing = "default",
    bottomSpacing = "default",
  } = sectionStyles;

  const textAlignmentString =
    textAlignment === "center" ? "text-center m-auto md:w-3/5" : "text-left";

  // Filter state - start as null to match server render
  const [activeFilter, setActiveFilter] = useState(null);

  // Initialize filter from URL after hydration
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get("filter");
    if (filterParam) {
      setActiveFilter(filterParam);
    }
  }, []);

  // Update URL when filter changes (without page reload)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    if (activeFilter) {
      url.searchParams.set("filter", activeFilter);
    } else {
      url.searchParams.delete("filter");
    }
    window.history.replaceState({}, "", url);
  }, [activeFilter]);

  // Load More state
  const initialLoadCount = showFeaturedPost ? 10 : 9;
  const loadMoreIncrement = 9; // Load 9 more posts each time
  const [visibleCount, setVisibleCount] = useState(initialLoadCount);
  const isMobile = useMedia("(max-width: 600px)", false);

  // Early return must come after all hooks so live edits that empty and
  // refill the grid don't change the hook order between renders
  if (!grid || grid.length === 0) return null;

  const filterSet = new Set();

  grid?.length > 0 &&
    grid.forEach((post) => {
      if (!post?.tags) return;

      post.tags?.forEach((tag) => {
        filterSet.add(cleanString(tag?.tagName)?.toLowerCase());
      });
    });

  const filterTags = Array.from(filterSet);

  const sortGrid = () => {
    if (!grid || grid.length === 0) return [];
    let filteredGrid;

    if (autoPopulate && autoPopulateTag) {
      filteredGrid = grid.filter((post) => {
        return post.tags?.some(
          (tag) =>
            cleanString(tag?.tagName)?.toLowerCase() ===
            cleanString(autoPopulateTagValue?.tagName)?.toLowerCase()
        );
      });
    } else if (activeFilter === null || !showFilter) {
      filteredGrid = grid.filter((post) => {
        return post;
      });
    } else {
      filteredGrid = grid.filter((post) => {
        return post.tags?.some(
          (tag) => cleanString(tag?.tagName)?.toLowerCase() === activeFilter
        );
      });
    }
    return filteredGrid;
  };

  const allPosts = sortGrid();

  // Pagination logic
  const postsToShow = allPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < allPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + loadMoreIncrement);
  };

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      searchKey={_key}
    >
      {/* ================================================= TITLE */}
      {title && (
        <ScrollAnimation type="fade-right">
          <Text
            size={titleTextSize}
            color={titleTextColor}
            tag={titleHeadingTag}
            className={`w-full mb-clamp-50 ${textAlignmentString}`}
          >
            {title}
          </Text>
        </ScrollAnimation>
      )}

      {/* ================================================= FILTER */}
      {((autoPopulate && showFilter && !limitGrid && !autoPopulateTag) ||
        (showFilter && !autoPopulate)) && (
        <BlogFilter
          data={filterTags}
          textAlignment={textAlignment}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      )}

      {/* ================================================= BLOG GRID (includes featured post if enabled) */}
      {renderGrid(postsToShow, showFeaturedPost, loading, isMobile)}

      {/* ================================================= LOAD MORE BUTTON */}
      {(hasMorePosts || button?.text) && (
        <ScrollAnimation type="fade-up">
          <div
            className={`flex w-full mt-clamp-50 gap-clamp-30 items-center ${textAlignment === "center" ? "justify-center" : "justify-start"}`}
          >
            {hasMorePosts && (
              <div className="flex w-fit">
                <SanityButton
                  data={{
                    linkType: "onClick",
                    text: "Load More",
                    buttonStyle: "Outline",
                    buttonColor: titleTextColor,
                  }}
                  onClick={handleLoadMore}
                />
              </div>
            )}

            {button?.text && (
              <div className="flex w-fit">
                <SanityButton data={button} />
              </div>
            )}
          </div>
        </ScrollAnimation>
      )}

      {/* ================================================= BUTTON */}
    </DefaultWrapper>
  );
};

const renderGrid = (posts, showFeaturedPost, loading, isMobile) => {
  if (!posts || posts.length === 0) return null;

  // If showFeaturedPost is true, first post is featured, rest are grid tiles
  const [featuredPost, ...gridPosts] = posts;
  const postsToRender = showFeaturedPost ? gridPosts : posts;

  return (
    <div className="flex flex-col w-full gap-y-clamp-60">
      {/* Featured Post Section (only if showFeaturedPost is true and post exists) */}
      {showFeaturedPost && featuredPost && (
        <ScrollAnimation type="fade-in">
          <BlogFeatured data={featuredPost} loading={loading} />
        </ScrollAnimation>
      )}

      {/* Grid Section */}
      <div className="post_grid_container flex flex-col w-full gap-y-clamp-60 gap-x-clamp-60 md:grid md:grid-cols-2 lg:grid-cols-3">
        {postsToRender?.map((post, i) => {
          if (!post) return null;

          function renderTile(post) {
            switch (post._type) {
              case "blogPost":
                return <BlogTile data={post} number={i} />;
              // case 'volunteerOpportunity':
              //   return <JobTile data={post} number={i} />
              // case 'jobPost':
              //   return <JobTile data={post} number={i} />
              default:
                return <BlogTile data={post} number={i} />;
            }
          }

          function delay() {
            switch (true) {
              case isMobile:
                return 0;
              default:
                return (i % 3) * 0.2;
            }
          }

          return (
            <ScrollAnimation type="fade-up" delay={delay()} key={i}>
              {renderTile(post)}
            </ScrollAnimation>
          );
        })}
      </div>
    </div>
  );
};
