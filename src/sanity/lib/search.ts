import { createClient, type SanityClient } from "@sanity/client";
import groq from "groq";
import type {
  Page,
  HomePage,
  BlogPost,
  Event,
  TeamMember,
} from "../../../sanity.types";

// Initialize your Sanity client
const client: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false for search to get latest content
});

// Types
export interface SearchResult {
  _id: string;
  _type: string;
  title: string;
  slug?: string;
  url: string;
  snippet: string;
  matchedIn: string;
  contextTitle?: string; // Title of the section/component where match was found
}

export interface SearchIndexItem {
  id: string;
  type: string;
  title: string;
  slug: string;
  url: string;
  searchableText: string;
  snippet: string;
}

export interface SearchSuggestion {
  text: string;
  type: string;
  url: string;
}

// Combined interface for search results - uses Sanity types but combines all possible fields
type SanitySearchResult = {
  _id: string;
  _type: string;
  matchedIn: string;
} & Partial<{
  // From Page, HomePage, BlogPost, Event
  title: string;
  slug: { current?: string };
  navigationName: string;
  metaDescription: string;
  pageLayout: Page["pageLayout"];
  // From TeamMember
  personName: string;
  bio: TeamMember["bio"];
  // From Event
  eventDescription: string;
}>;

interface SanitySuggestionResult {
  _type: string;
  title?: string;
  personName?: string;
  navigationName?: string;
  slug?: { current?: string };
}

/**
 * Search across all pages, blog posts, events, and team members
 * Includes pages that contain blog posts or events in grids
 */
export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  // Main content search
  const searchQuery = groq`
    *[
      _type in ["page", "homePage", "blogPost", "event", "teamMember"] && (
        // Direct string field matches
        title match $searchTerm + "*" ||
        personName match $searchTerm + "*" ||
        metaDescription match $searchTerm + "*" ||
        navigationName match $searchTerm + "*" ||
        eventDescription match $searchTerm + "*" ||
        location match $searchTerm + "*" ||
        
        // Portable text in component fields
        pt::text(pageLayout[].body) match $searchTerm + "*" ||
        pt::text(pageLayout[].subtitle) match $searchTerm + "*" ||
        pt::text(pageLayout[].column2Body) match $searchTerm + "*" ||
        pt::text(pageLayout[].column2Subtitle) match $searchTerm + "*" ||
        pt::text(pageLayout[].column3Body) match $searchTerm + "*" ||
        pt::text(pageLayout[].column3Subtitle) match $searchTerm + "*" ||
        
        // Nested arrays (cards, accordions, etc.)
        pageLayout[].title match $searchTerm + "*" ||
        pt::text(pageLayout[].gridLayout[].title) match $searchTerm + "*" ||
        pt::text(pageLayout[].gridLayout[].subtitle) match $searchTerm + "*" ||
        pt::text(pageLayout[].gridLayout[].body) match $searchTerm + "*" ||
        pageLayout[].accordionItems[].title match $searchTerm + "*" ||
        pt::text(pageLayout[].accordionItems[].body) match $searchTerm + "*" ||
        
        // Team member content (direct and in grids)
        // (team members inside team grids are matched by the teamGrid lookup below)
        pt::text(bio) match $searchTerm + "*" ||
        
        // Scrolling Text component
        pageLayout[].textItems[].text match $searchTerm + "*" ||
        
        // Tabbed Section component
        pageLayout[].tabSections[].title match $searchTerm + "*" ||
        pt::text(pageLayout[].tabSections[].subtitle) match $searchTerm + "*" ||
        pt::text(pageLayout[].tabSections[].body) match $searchTerm + "*" ||
        
        // Flex Columns component
        pt::text(pageLayout[].column1[].card.title) match $searchTerm + "*" ||
        pt::text(pageLayout[].column1[].card.subtitle) match $searchTerm + "*" ||
        pt::text(pageLayout[].column1[].card.body) match $searchTerm + "*" ||
        pageLayout[].column1[].title match $searchTerm + "*" ||
        pt::text(pageLayout[].column1[].subtitle) match $searchTerm + "*" ||
        pt::text(pageLayout[].column1[].body) match $searchTerm + "*" ||
        pageLayout[].column1[].accordionItems[].title match $searchTerm + "*" ||
        pt::text(pageLayout[].column1[].accordionItems[].body) match $searchTerm + "*" ||
        pt::text(pageLayout[].column2[].card.title) match $searchTerm + "*" ||
        pt::text(pageLayout[].column2[].card.subtitle) match $searchTerm + "*" ||
        pt::text(pageLayout[].column2[].card.body) match $searchTerm + "*" ||
        pageLayout[].column2[].title match $searchTerm + "*" ||
        pt::text(pageLayout[].column2[].subtitle) match $searchTerm + "*" ||
        pt::text(pageLayout[].column2[].body) match $searchTerm + "*" ||
        pageLayout[].column2[].accordionItems[].title match $searchTerm + "*" ||
        pt::text(pageLayout[].column2[].accordionItems[].body) match $searchTerm + "*"
      )
    ] {
      _id,
      _type,
      title,
      personName,
      slug,
      navigationName,
      
      pageLayout[]{
        _type,
        _key,
        title,
        body,
        subtitle,
        column2Body,
        column2Subtitle,
        column3Body,
        column3Subtitle,
        gridLayout[]{
          title,
          subtitle,
          body
        },
        accordionItems[]{
          title,
          body
        },
        // Scrolling Text fields
        textItems[]{
          text
        },
        // Tabbed Section fields
        tabSections[]{
          title,
          subtitle,
          body
        },
        // Flex Columns fields
        column1[]{
          _type,
          title,
          subtitle,
          body,
          card{
            title,
            subtitle,
            body
          },
          accordionItems[]{
            title,
            body
          }
        },
        column2[]{
          _type,
          title,
          subtitle,
          body,
          card{
            title,
            subtitle,
            body
          },
          accordionItems[]{
            title,
            body
          }
        }
      },
      
      bio,
      eventDescription,
      metaDescription,
      
      "matchedIn": select(
        title match $searchTerm + "*" => "title",
        personName match $searchTerm + "*" => "personName",
        navigationName match $searchTerm + "*" => "navigation",
        "content"
      )
    } | order(
      select(
        title match $searchTerm => 0,
        personName match $searchTerm => 0,
        1
      )
    ) | order(_score desc)
  `;

  try {
    // These four queries are independent, so run them concurrently
    const [results, matchingBlogPosts, matchingEvents, matchingTeamMembers] =
      await Promise.all([
        client.fetch<SanitySearchResult[]>(searchQuery, {
          searchTerm: query,
        }),
        // Find matching blog posts
        client.fetch<Array<{ _id: string; title: string }>>(
          groq`*[_type == "blogPost" && title match $searchTerm + "*"]{_id, title}`,
          { searchTerm: query },
        ),
        // Find matching events
        client.fetch<Array<{ _id: string; title: string }>>(
          groq`*[_type == "event" && (title match $searchTerm + "*" || eventDescription match $searchTerm + "*")]{_id, title}`,
          { searchTerm: query },
        ),
        // Find matching team members
        client.fetch<Array<{ _id: string; personName: string }>>(
          groq`*[_type == "teamMember" && (personName match $searchTerm + "*" || position match $searchTerm + "*" || pt::text(bio) match $searchTerm + "*")]{_id, personName}`,
          { searchTerm: query },
        ),
      ]);

    console.log(
      "Main search results:",
      results.length,
      results.map((r) => ({
        type: r._type,
        title: r.title || r.personName || r.navigationName,
      })),
    );

    const noResults = Promise.resolve([] as SanitySearchResult[]);
    const blogPostIds = matchingBlogPosts.map((p) => p._id);
    const teamMemberIds = matchingTeamMembers.map((tm) => tm._id);

    // Find pages whose grids/calendars contain the matches, concurrently
    const [
      allPagesWithBlogGrids,
      allPagesWithEventCalendars,
      allPagesWithTeamGrids,
    ] = await Promise.all([
      // If blog posts matched, find pages with blog grids (manual or auto)
      blogPostIds.length > 0
        ? client.fetch<SanitySearchResult[]>(
            groq`
                *[_type in ["page", "homePage"] && count(pageLayout[_type == "blogPostGrid" && (autoPopulate == true || grid[]._ref in $blogPostIds)]) > 0] {
                  _id,
                  _type,
                  slug,
                  navigationName,
                  pageLayout[_type == "blogPostGrid"][0]{
                    _type,
                    title
                  },
                  metaDescription,
                  "matchedIn": "blog_grid"
                }
              `,
            { blogPostIds },
          )
        : noResults,
      // If events matched, find pages with event calendars
      matchingEvents.length > 0
        ? client.fetch<SanitySearchResult[]>(
            groq`
                *[_type in ["page", "homePage"] && count(pageLayout[_type == "eventCalendar"]) > 0] {
                  _id,
                  _type,
                  slug,
                  navigationName,
                  pageLayout[_type == "eventCalendar"][0]{
                    _type,
                    title
                  },
                  metaDescription,
                  "matchedIn": "event_calendar"
                }
              `,
          )
        : noResults,
      // If team members matched, find pages with team grids
      teamMemberIds.length > 0
        ? client.fetch<SanitySearchResult[]>(
            groq`
                *[_type in ["page", "homePage"] && count(pageLayout[_type == "teamGrid" && count(gridLayout[_ref in $teamMemberIds]) > 0]) > 0] {
                  _id,
                  _type,
                  slug,
                  navigationName,
                  pageLayout[_type == "teamGrid"][0]{
                    _type,
                    title
                  },
                  metaDescription,
                  "matchedIn": "team_grid"
                }
              `,
            { teamMemberIds },
          )
        : noResults,
    ]);

    const allResults: SanitySearchResult[] = [
      ...results,
      ...allPagesWithBlogGrids,
      ...allPagesWithEventCalendars,
      ...allPagesWithTeamGrids,
    ];

    // Deduplicate by _id
    const uniqueResults = Array.from(
      new Map(allResults.map((item) => [item._id, item])).values(),
    );

    console.log("Unique search results:", uniqueResults.length);

    // Process results to add URLs and snippets - generate multiple results per document
    const processedResults: SearchResult[] = [];

    for (const result of uniqueResults) {
      const allMatches = generateAllSnippets(result, query);

      // Get base page title
      const pageTitle =
        result.title ||
        result.personName ||
        result.navigationName ||
        "Untitled";

      // Extract slug current value
      const slugCurrent = result.slug?.current;

      // Create a search result for each match
      for (const match of allMatches) {
        // Determine the main title - prefer component title over page title
        let title: string;
        let contextTitle: string | undefined;

        if (match.componentTitle) {
          // Component has a title - use it as the main title
          title = match.componentTitle;
          // Add page context
          switch (result._type) {
            case "page":
            case "homePage":
              contextTitle = `Page: ${pageTitle}`;
              break;
            case "event":
              contextTitle = `Event: ${pageTitle}`;
              break;
            case "blogPost":
              contextTitle = `Blog: ${pageTitle}`;
              break;
            case "teamMember":
              contextTitle = `Team Member: ${pageTitle}`;
              break;
            default:
              contextTitle = pageTitle;
          }
        } else {
          // No component title - use page title as main title
          switch (result._type) {
            case "page":
            case "homePage":
              title = `${pageTitle} Page`;
              break;
            case "event":
              title = `Event: ${pageTitle}`;
              break;
            case "blogPost":
              title = `Blog: ${pageTitle}`;
              break;
            case "teamMember":
              title = `Team Member: ${pageTitle}`;
              break;
            default:
              title = pageTitle;
          }
          contextTitle = match.contextTitle;
        }

        // Build URL with hash anchor if componentKey exists
        let url = generateUrl(result._type, slugCurrent);
        if (match.componentKey && slugCurrent) {
          const isHomePage = result._type === "homePage";
          url = isHomePage
            ? `/#${match.componentKey}`
            : `${slugCurrent}#${match.componentKey}`;
        } else if (match.componentKey && result._type === "homePage") {
          // HomePage without slug
          url = `/#${match.componentKey}`;
        }

        processedResults.push({
          _id: `${result._id}-${match.componentKey || "main"}`,
          _type: result._type,
          title,
          slug: slugCurrent,
          url,
          snippet: match.snippet,
          matchedIn: result.matchedIn,
          contextTitle,
        });
      }
    }

    // Sort results by relevance
    const sortedResults = processedResults.sort((a, b) => {
      const queryLower = query.toLowerCase();
      const aTitleLower = a.title.toLowerCase();
      const bTitleLower = b.title.toLowerCase();
      const aSnippetLower = a.snippet.toLowerCase();
      const bSnippetLower = b.snippet.toLowerCase();

      // 1. Exact title match gets highest priority
      const aExactTitle = aTitleLower === queryLower;
      const bExactTitle = bTitleLower === queryLower;
      if (aExactTitle && !bExactTitle) return -1;
      if (!aExactTitle && bExactTitle) return 1;

      // 2. Title starts with query
      const aTitleStarts = aTitleLower.startsWith(queryLower);
      const bTitleStarts = bTitleLower.startsWith(queryLower);
      if (aTitleStarts && !bTitleStarts) return -1;
      if (!aTitleStarts && bTitleStarts) return 1;

      // 3. Title contains query (word boundary)
      const aTitleWordBoundary = new RegExp(`\\b${queryLower}`, "i").test(
        aTitleLower,
      );
      const bTitleWordBoundary = new RegExp(`\\b${queryLower}`, "i").test(
        bTitleLower,
      );
      if (aTitleWordBoundary && !bTitleWordBoundary) return -1;
      if (!aTitleWordBoundary && bTitleWordBoundary) return 1;

      // 4. Title contains query anywhere
      const aTitleContains = aTitleLower.includes(queryLower);
      const bTitleContains = bTitleLower.includes(queryLower);
      if (aTitleContains && !bTitleContains) return -1;
      if (!aTitleContains && bTitleContains) return 1;

      // 5. Content type priority (pages before team members)
      const typeOrder: Record<string, number> = {
        homePage: 1,
        page: 2,
        blogPost: 3,
        event: 4,
        teamMember: 5,
      };
      const aTypePriority = typeOrder[a._type] || 99;
      const bTypePriority = typeOrder[b._type] || 99;
      if (aTypePriority !== bTypePriority) {
        return aTypePriority - bTypePriority;
      }

      // 6. Snippet starts with query
      const aSnippetStarts = aSnippetLower.startsWith(queryLower);
      const bSnippetStarts = bSnippetLower.startsWith(queryLower);
      if (aSnippetStarts && !bSnippetStarts) return -1;
      if (!aSnippetStarts && bSnippetStarts) return 1;

      // 7. Alphabetical by title as final tiebreaker
      return aTitleLower.localeCompare(bTitleLower);
    });

    return sortedResults;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

/**
 * Generate ALL snippets from the result that contain the search query
 * Returns an array of all matches found in the document
 */
function generateAllSnippets(
  result: SanitySearchResult,
  query: string,
): Array<{
  snippet: string;
  componentKey?: string;
  componentTitle?: string;
  contextTitle?: string;
}> {
  const cleanQuery = query.trim().toLowerCase();
  const matches: Array<{
    snippet: string;
    componentKey?: string;
    componentTitle?: string;
    contextTitle?: string;
  }> = [];

  // Helper to extract snippet with context around the query
  const extractSnippetFromText = (text: string): string | null => {
    if (!text) return null;
    const textLower = text.toLowerCase();
    const index = textLower.indexOf(cleanQuery);

    if (index !== -1) {
      const start = Math.max(0, index - 60);
      const end = Math.min(text.length, index + cleanQuery.length + 140);
      let snippet = text.substring(start, end);

      if (start > 0) snippet = "..." + snippet;
      if (end < text.length) snippet = snippet + "...";

      return snippet;
    }
    return null;
  };

  // Check title/personName first (no componentKey for doc-level fields)
  if (result.title) {
    const snippet = extractSnippetFromText(result.title);
    if (snippet) matches.push({ snippet });
  }

  if (result.personName) {
    const snippet = extractSnippetFromText(result.personName);
    if (snippet) matches.push({ snippet });
  }

  if (result.navigationName) {
    const snippet = extractSnippetFromText(result.navigationName);
    if (snippet) matches.push({ snippet });
  }

  // Check meta fields
  if (result.metaDescription) {
    const snippet = extractSnippetFromText(result.metaDescription);
    if (snippet) matches.push({ snippet });
  }

  if (result.eventDescription) {
    const snippet = extractSnippetFromText(result.eventDescription);
    if (snippet) matches.push({ snippet });
  }

  // Check bio
  if (result.bio) {
    const bioText = extractPortableText(result.bio);
    const snippet = extractSnippetFromText(bioText);
    if (snippet) matches.push({ snippet });
  }

  // Search through all pageLayout components
  if (result.pageLayout && Array.isArray(result.pageLayout)) {
    for (const component of result.pageLayout) {
      // Cast to any to access properties that may not exist on all component types
      const comp = component as any;

      // Component title - if matched in title, show it as main title with snippet from body
      if (comp.title) {
        const titleSnippet = extractSnippetFromText(comp.title);
        if (titleSnippet) {
          // If title matches, try to get snippet from body for context
          let bodySnippet = titleSnippet;
          const bodyFields = [
            comp.body,
            comp.subtitle,
            comp.column2Body,
            comp.column2Subtitle,
            comp.column3Body,
            comp.column3Subtitle,
          ];

          for (const field of bodyFields) {
            if (field) {
              const text = extractPortableText(field);
              if (text && text.length > 0) {
                bodySnippet = text.substring(0, 200);
                if (text.length > 200) bodySnippet += "...";
                break;
              }
            }
          }

          matches.push({
            snippet: bodySnippet,
            componentKey: comp._key,
            componentTitle: comp.title,
          });
        }
      }

      // All body/subtitle fields
      const fieldsToCheck = [
        comp.body,
        comp.subtitle,
        comp.column2Body,
        comp.column2Subtitle,
        comp.column3Body,
        comp.column3Subtitle,
      ];

      for (const field of fieldsToCheck) {
        if (field) {
          const text = extractPortableText(field);
          const snippet = extractSnippetFromText(text);
          if (snippet) {
            matches.push({
              snippet,
              componentKey: comp._key,
              componentTitle: comp.title || undefined,
            });
          }
        }
      }

      // Card grids
      if (comp.gridLayout) {
        for (const card of comp.gridLayout) {
          // Extract card title and subtitle from rich text
          const cardTitle = card.title ? extractPortableText(card.title) : "";
          const cardSubtitle = card.subtitle
            ? extractPortableText(card.subtitle)
            : "";

          if (card.title) {
            const titleText = extractPortableText(card.title);
            const titleSnippet = extractSnippetFromText(titleText);
            if (titleSnippet) {
              // If card title matches, try to get body as snippet
              let bodySnippet = titleSnippet;
              if (card.body) {
                const text = extractPortableText(card.body);
                if (text && text.length > 0) {
                  bodySnippet = text.substring(0, 200);
                  if (text.length > 200) bodySnippet += "...";
                }
              }
              matches.push({
                snippet: bodySnippet,
                componentKey: comp._key,
                componentTitle: cardTitle,
                contextTitle: comp.title || undefined,
              });
            }
          }
          if (card.subtitle) {
            const subtitleText = extractPortableText(card.subtitle);
            const subtitleSnippet = extractSnippetFromText(subtitleText);
            if (subtitleSnippet) {
              matches.push({
                snippet: subtitleSnippet,
                componentKey: comp._key,
                componentTitle: cardTitle || comp.title || undefined,
              });
            }
          }
          if (card.body) {
            const text = extractPortableText(card.body);
            const snippet = extractSnippetFromText(text);
            if (snippet) {
              matches.push({
                snippet,
                componentKey: comp._key,
                componentTitle: cardTitle || comp.title || undefined,
              });
            }
          }
          if (card.teamMember) {
            if (card.teamMember.personName) {
              const snippet = extractSnippetFromText(
                card.teamMember.personName,
              );
              if (snippet) {
                matches.push({
                  snippet,
                  componentKey: comp._key,
                  componentTitle: card.teamMember.personName,
                  contextTitle: comp.title || undefined,
                });
              }
            }
            if (card.teamMember.position) {
              const snippet = extractSnippetFromText(card.teamMember.position);
              if (snippet) {
                matches.push({
                  snippet,
                  componentKey: comp._key,
                  componentTitle: card.teamMember.personName || undefined,
                });
              }
            }
            if (card.teamMember.bio) {
              const text = extractPortableText(card.teamMember.bio);
              const snippet = extractSnippetFromText(text);
              if (snippet) {
                matches.push({
                  snippet,
                  componentKey: comp._key,
                  componentTitle: card.teamMember.personName || undefined,
                });
              }
            }
          }
        }
      }

      // Accordions
      if (comp.accordionItems) {
        for (const accordion of comp.accordionItems) {
          if (accordion.title) {
            const titleSnippet = extractSnippetFromText(accordion.title);
            if (titleSnippet) {
              // If accordion title matches, try to get body as snippet
              let bodySnippet = titleSnippet;
              if (accordion.body) {
                const text = extractPortableText(accordion.body);
                if (text && text.length > 0) {
                  bodySnippet = text.substring(0, 200);
                  if (text.length > 200) bodySnippet += "...";
                }
              }
              matches.push({
                snippet: bodySnippet,
                componentKey: comp._key,
                componentTitle: accordion.title,
                contextTitle: comp.title || undefined,
              });
            }
          }
          if (accordion.body) {
            const text = extractPortableText(accordion.body);
            const snippet = extractSnippetFromText(text);
            if (snippet) {
              matches.push({
                snippet,
                componentKey: comp._key,
                componentTitle: accordion.title || comp.title || undefined,
              });
            }
          }
        }
      }

      // Scrolling Text: textItems array
      if (comp._type === "scrollingText" && Array.isArray(comp.textItems)) {
        for (const textItem of comp.textItems) {
          if (textItem && typeof textItem.text === "string") {
            const snippet = extractSnippetFromText(textItem.text);
            if (snippet) {
              matches.push({
                snippet,
                componentKey: comp._key,
                componentTitle: comp.title || undefined,
              });
            }
          }
        }
      }

      // Tabbed Section: tabSections array
      if (comp._type === "tabbedSection" && Array.isArray(comp.tabSections)) {
        for (const tabSection of comp.tabSections) {
          // Tab title
          if (tabSection && typeof tabSection.title === "string") {
            const snippet = extractSnippetFromText(tabSection.title);
            if (snippet) {
              matches.push({
                snippet,
                componentKey: comp._key,
                componentTitle: tabSection.title,
                contextTitle: comp.title || undefined,
              });
            }
          }
          // Tab subtitle (portable text array)
          if (tabSection && Array.isArray(tabSection.subtitle)) {
            const text = extractPortableText(tabSection.subtitle);
            const snippet = extractSnippetFromText(text);
            if (snippet) {
              matches.push({
                snippet,
                componentKey: comp._key,
                componentTitle: tabSection.title || comp.title || undefined,
              });
            }
          }
          // Tab body (portable text array)
          if (tabSection && Array.isArray(tabSection.body)) {
            const text = extractPortableText(tabSection.body);
            const snippet = extractSnippetFromText(text);
            if (snippet) {
              matches.push({
                snippet,
                componentKey: comp._key,
                componentTitle: tabSection.title || comp.title || undefined,
              });
            }
          }
        }
      }

      // Flex Columns: column1 and column2 arrays
      if (comp._type === "flexColumns") {
        const columns = [comp.column1, comp.column2];
        for (const col of columns) {
          if (Array.isArray(col)) {
            for (const colItem of col) {
              // Card object (cardObject)
              if (
                colItem &&
                colItem.card &&
                typeof colItem.card.title === "string"
              ) {
                const snippet = extractSnippetFromText(colItem.card.title);
                if (snippet) {
                  matches.push({
                    snippet,
                    componentKey: comp._key,
                    componentTitle: colItem.card.title,
                    contextTitle: comp.title || undefined,
                  });
                }
              }
              // Card body (if available)
              if (colItem && colItem.card && colItem.card.body) {
                const text = extractPortableText(colItem.card.body);
                const snippet = extractSnippetFromText(text);
                if (snippet) {
                  matches.push({
                    snippet,
                    componentKey: comp._key,
                    componentTitle:
                      colItem.card.title || comp.title || undefined,
                  });
                }
              }
              // Rich Text Section (flexRichTextSection)
              if (colItem && colItem.body && Array.isArray(colItem.body)) {
                const text = extractPortableText(colItem.body);
                const snippet = extractSnippetFromText(text);
                if (snippet) {
                  matches.push({
                    snippet,
                    componentKey: comp._key,
                    componentTitle: colItem.title || comp.title || undefined,
                  });
                }
              }
              // Text Section (flexTextSection)
              if (
                colItem &&
                colItem.title &&
                typeof colItem.title === "string"
              ) {
                const snippet = extractSnippetFromText(colItem.title);
                if (snippet) {
                  matches.push({
                    snippet,
                    componentKey: comp._key,
                    componentTitle: colItem.title,
                    contextTitle: comp.title || undefined,
                  });
                }
              }
              if (
                colItem &&
                colItem.subtitle &&
                Array.isArray(colItem.subtitle)
              ) {
                const text = extractPortableText(colItem.subtitle);
                const snippet = extractSnippetFromText(text);
                if (snippet) {
                  matches.push({
                    snippet,
                    componentKey: comp._key,
                    componentTitle: colItem.title || comp.title || undefined,
                  });
                }
              }
              if (colItem && colItem.body && Array.isArray(colItem.body)) {
                const text = extractPortableText(colItem.body);
                const snippet = extractSnippetFromText(text);
                if (snippet) {
                  matches.push({
                    snippet,
                    componentKey: comp._key,
                    componentTitle: colItem.title || comp.title || undefined,
                  });
                }
              }
              // Text Accordion (flexTextAccordion)
              if (
                colItem &&
                colItem.accordionItems &&
                Array.isArray(colItem.accordionItems)
              ) {
                for (const accordion of colItem.accordionItems) {
                  if (accordion.title && typeof accordion.title === "string") {
                    const snippet = extractSnippetFromText(accordion.title);
                    if (snippet) {
                      matches.push({
                        snippet,
                        componentKey: comp._key,
                        componentTitle: accordion.title,
                        contextTitle: comp.title || undefined,
                      });
                    }
                  }
                  if (accordion.body && Array.isArray(accordion.body)) {
                    const text = extractPortableText(accordion.body);
                    const snippet = extractSnippetFromText(text);
                    if (snippet) {
                      matches.push({
                        snippet,
                        componentKey: comp._key,
                        componentTitle:
                          accordion.title || comp.title || undefined,
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // If no matches found, add a fallback snippet
  if (matches.length === 0) {
    if (result.metaDescription) {
      matches.push({ snippet: result.metaDescription.substring(0, 200) });
    } else if (result.eventDescription) {
      matches.push({ snippet: result.eventDescription.substring(0, 200) });
    } else if (result.bio) {
      const bioText = extractPortableText(result.bio);
      if (bioText) matches.push({ snippet: bioText.substring(0, 200) });
    } else if (result.pageLayout?.[0]) {
      const firstComponent = result.pageLayout[0] as any;
      if (firstComponent.body) {
        const text = extractPortableText(firstComponent.body);
        if (text) {
          matches.push({
            snippet: text.substring(0, 200),
            componentKey: firstComponent._key,
          });
        }
      }
    } else {
      matches.push({ snippet: "" });
    }
  }

  return matches;
}

/**
 * Generate the correct URL based on document type and slug
 */
function generateUrl(type: string, slug?: string): string {
  if (!slug) {
    if (type === "homePage") return "/";
    return "#";
  }

  switch (type) {
    case "homePage":
      return "/";
    case "blogPost":
      return `${slug}`;
    case "event":
      return `${slug}`;
    case "teamMember":
      return `${slug}`;
    case "page":
      return `${slug}`;
    default:
      return `/${slug}`;
  }
}

/**
 * Extract plain text from Sanity portable text
 * Handles nested blocks and children
 */
function extractPortableText(portableText: any[] | null | undefined): string {
  if (!portableText || !Array.isArray(portableText)) return "";

  return portableText
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text || "").join("");
    })
    .join(" ")
    .trim();
}

/**
 * Build a search index for client-side search
 * This can be used at build time or fetched on the client
 * Uses a generic approach to extract all text automatically
 */
export async function buildSearchIndex(): Promise<SearchIndexItem[]> {
  const indexQuery = groq`
    *[_type in ["page", "homePage", "blogPost", "event", "teamMember"] && (
      defined(slug.current) || _type == "homePage"
    )] {
      _id,
      _type,
      title,
      personName,
      slug,
      navigationName,
      metaDescription,
      eventDescription,
      location,
      
      // Get all pageLayout data (all components)
      pageLayout,
      
      // Team member bio
      bio,
    }
  `;

  try {
    const documents: Array<Page | HomePage | BlogPost | Event | TeamMember> =
      await client.fetch(indexQuery);

    // Process documents to extract all searchable text
    return documents.map((doc): SearchIndexItem => {
      const searchableTexts: string[] = [];

      // Recursively extract all text from the document
      extractAllText(doc, searchableTexts);

      const searchableText = searchableTexts.join(" ").trim();

      // Type-safe property access
      const title =
        ("title" in doc ? doc.title : null) ||
        ("personName" in doc ? doc.personName : null) ||
        ("navigationName" in doc ? doc.navigationName : null) ||
        "";

      const slugCurrent = ("slug" in doc && doc.slug?.current) || "";

      return {
        id: doc._id,
        type: doc._type,
        title,
        slug: slugCurrent,
        url: generateUrl(doc._type, slugCurrent),
        searchableText,
        snippet: searchableText.substring(0, 200),
      };
    });
  } catch (error) {
    console.error("Error building search index:", error);
    return [];
  }
}

/**
 * Recursively extract all text from an object
 * This handles any structure automatically
 */
function extractAllText(obj: unknown, textArray: string[]): void {
  if (!obj) return;

  // Handle arrays (like pageLayout, gridLayout, accordionItems, etc.)
  if (Array.isArray(obj)) {
    // Check if it's portable text (has _type: 'block')
    if (obj.length > 0 && obj[0]._type === "block") {
      const text = extractPortableText(obj);
      if (text) textArray.push(text);
    } else {
      // Regular array, recurse into each item
      obj.forEach((item) => extractAllText(item, textArray));
    }
    return;
  }

  // Handle objects
  if (typeof obj === "object") {
    Object.entries(obj).forEach(([key, value]) => {
      // Skip internal Sanity fields
      if (key.startsWith("_") && key !== "_type") return;

      // Handle strings
      if (typeof value === "string" && value.trim()) {
        // Skip URLs and technical fields
        if (
          !key.includes("url") &&
          !key.includes("link") &&
          !key.includes("Id")
        ) {
          textArray.push(value);
        }
      }
      // Recurse into nested objects and arrays
      else if (typeof value === "object") {
        extractAllText(value, textArray);
      }
    });
  }
}

/**
 * Get search suggestions based on partial query
 * Useful for autocomplete features
 */
export async function getSearchSuggestions(
  query: string,
): Promise<SearchSuggestion[]> {
  if (!query || query.length < 2) {
    return [];
  }

  const suggestionQuery = groq`
    *[
      _type in ["page", "homePage", "blogPost", "event", "teamMember"] && (
        title match $searchQuery + "*" ||
        personName match $searchQuery + "*" ||
        navigationName match $searchQuery + "*"
      )
    ] {
      title,
      personName,
      navigationName,
      _type,
      slug
    } [0...5]
  `;

  try {
    const results: SanitySuggestionResult[] = await client.fetch(
      suggestionQuery,
      { searchQuery: query },
    );
    return results.map((result): SearchSuggestion => ({
      text:
        result.title ||
        result.personName ||
        result.navigationName ||
        "Untitled",
      type: result._type,
      url: generateUrl(result._type, result.slug?.current),
    }));
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
}
