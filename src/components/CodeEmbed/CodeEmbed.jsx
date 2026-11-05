"use client";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { DefaultWrapper } from "@/modules/DefaultWrapper/DefaultWrapper";
import { ScrollAnimation } from "@/modules/ScrollAnimation";

export const CodeEmbed = ({ data }) => {
  const { iframeSize, anchorTagLink, sectionStyles = {} } = data;
  const { backgroundColor, topSpacing, bottomSpacing } = sectionStyles;
  const code = data?.code?.code;

  const heightFormatter = (size) => {
    if (size === null || size === undefined) return "auto";
    return size;
  };

  const widthFormatter = (size) => {
    if (size === null || size === undefined) return "100%";
    return size;
  };

  const width = widthFormatter(iframeSize?.width);
  const height = heightFormatter(iframeSize?.height);

  const scriptRoot = useRef();

  useEffect(() => {
    if (!code) return;
    // creates a document range (grouping of nodes in the document is my understanding)
    // in this case we instantiate it as empty, on purpose
    const range = document.createRange();
    // creates a mini-document (light weight version), in our range with our script in it
    const documentFragment = range.createContextualFragment(code);
    // appends it to our script root - so it renders in the correct location
    scriptRoot.current.append(documentFragment);
  }, []);

  // ================================================================
  // If jQuery is needed for the script, use the following code and
  // remove the useEffect above.
  // (Mailchimp needs jQuery to work)
  // ================================================================
  // useEffect(() => {
  // const loadJQuery = () => {
  //   return new Promise((resolve, reject) => {
  //     if (typeof window.jQuery !== 'undefined') {
  //       resolve()
  //       return
  //     }
  //     const script = document.createElement('script')
  //     script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
  //     script.onload = resolve
  //     script.onerror = reject
  //     document.head.appendChild(script)
  //   })
  // }
  // const loadFormCode = () => {
  //   // creates a document range (grouping of nodes in the document is my understanding)
  //   // in this case we instantiate it as empty, on purpose
  //   const range = document.createRange()
  //   // creates a mini-document (light weight version), in our range with our script in it
  //   const documentFragment = range.createContextualFragment(code)
  //   // appends it to our script root - so it renders in the correct location
  //   scriptRoot.current.append(documentFragment)
  // }
  // loadJQuery()
  //   .then(loadFormCode)
  //   .catch((error) => {
  //     console.error('Failed to load jQuery:', error)
  //   })
  // }, [])
  // ================================================================

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      id={anchorTagLink}
      backgroundColor={backgroundColor}
    >
      {code && (
        <ScrollAnimation threshold={0.05}>
          <EmbedContainer codeHeight={height} codeWidth={width}>
            {/* <div dangerouslySetInnerHTML={{ __html: code }} /> */}
            <div
              className="script-container"
              id="script-container"
              ref={scriptRoot}
            />
          </EmbedContainer>
        </ScrollAnimation>
      )}
    </DefaultWrapper>
  );
};

const EmbedContainer = styled.div(
  {
    position: "relative",
    overflow: "auto",
    div: {
      "& > iframe": {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        border: "none",
      },
    },
  },
  ({ codeHeight, codeWidth }) => ({
    width: "100%",
    aspectRatio: codeWidth / codeHeight,
  })
);
