export const checkValidFAQ = (data) => {
  // Return null early if no data
  if (!data || data.length === 0) {
    return null;
  }

  const faqArray = [];

  function toPlainText(blocks = []) {
    return blocks
      .map((block) => {
        if (block._type !== "block" || !block.children) {
          return "";
        }
        return block.children.map((child) => child.text).join("");
      })
      .join("\n\n");
  }

  data.forEach((item) => {
    const question = item.title;
    const answer = toPlainText(item.body);

    // Only add if both question and answer exist
    if (question && answer) {
      faqArray.push({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer, // Remove the <p> tags - let schema.org handle formatting
        },
      });
    }
  });

  // Return null if no valid FAQ items
  if (faqArray.length === 0) {
    return null;
  }

  // Return the object, not the stringified version
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqArray,
  };
};
