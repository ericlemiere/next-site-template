"use client";
import { TeamMember } from "./TeamMember";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { createDataAttribute } from "@sanity/visual-editing";
import { config } from "@/utils/constants/configObject";

export const TeamGrid = ({ data, pageId, pageItemKey }) => {
  const { title, gridLayout, anchorTagLink, sectionStyles = {}, _key } = data;
  const { backgroundColor, topSpacing, bottomSpacing } = sectionStyles;

  const renderGrid = gridLayout?.map((item, index) => {
    const { _key, teamMember } = item;
    return (
      <div
        key={_key || index}
        className="team_member_wrapper h-full py-3"
        {...(pageId && {
          "data-sanity": createDataAttribute({
            ...config,
            id: pageId,
            type: "page",
            path: `pageLayout[_key=="${pageItemKey}"].gridLayout[_key=="${_key}"]`,
          }).toString(),
        })}
      >
        <TeamMember {...teamMember} />
      </div>
    );
  });

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      searchKey={_key}
    >
      <TextBlock
        title={title}
        sectionStyles={sectionStyles}
        className="mb-clamp-50"
      />

      {gridLayout && (
        <ScrollAnimation
          stagger={0.1}
          threshold={0.1}
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-clamp-20 m-auto"
          {...(pageId && {
            "data-sanity": createDataAttribute({
              ...config,
              id: pageId,
              type: "page",
              path: `pageLayout[_key=="${pageItemKey}"].gridLayout`,
            }).toString(),
          })}
        >
          {renderGrid}
        </ScrollAnimation>
      )}
    </DefaultWrapper>
  );
};
