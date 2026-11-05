import { ImageTextFullBleed } from "./ImageTextFullBleed";
import { ImageTextRow } from "./ImageTextRow";

export const ImageAndText = ({ data = {}, loading }) => {
  const renderSection = () => {
    switch (data.selectedLayout) {
      case 1:
        return <ImageTextFullBleed {...data} loading={loading} />;
      case 2:
        return <ImageTextRow {...data} loading={loading} />;
      default:
        return;
    }
  };
  return renderSection();
};
