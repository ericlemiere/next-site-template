"use client";
import { useState, useEffect } from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  XIcon,
  BlueskyShareButton,
  BlueskyIcon,
} from "react-share";
import { COLOR } from "@/utils/constants/colors";

export const SocialMediaSharingIcons = ({ title }) => {
  const roundSocialIcons = true;
  const socialIconSize = 40;
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
      //setShareUrl('www.ericlemiere.com') use this for testing
    }
  }, [shareUrl]);

  return (
    <div className="social_share_to_wrapper relative flex flex-col justify-start items-center my-clamp-30">
      <div className="text-body2 mb-clamp-10">Share to:</div>
      <div
        className="flex justify-center items-center gap-clamp-20 [&__button]:rounded-full [&__button]:hover:shadow-lg
        [&__button]:w-10 [&__button]:h-10 [&__button]:hover:scale-110 [&__button]:transition [&__button]:duration-150"
      >
        <BlueskyShareButton url={shareUrl} title={title}>
          <BlueskyIcon size={socialIconSize} round={roundSocialIcons} />
        </BlueskyShareButton>

        <TwitterShareButton url={shareUrl} title={title}>
          <XIcon size={socialIconSize} round={roundSocialIcons} />
        </TwitterShareButton>

        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={socialIconSize} round={roundSocialIcons} />
        </FacebookShareButton>

        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon size={socialIconSize} round={roundSocialIcons} />
        </LinkedinShareButton>

        <EmailShareButton url={shareUrl} subject={title}>
          <EmailIcon
            size={socialIconSize}
            round={roundSocialIcons}
            iconFillColor="white"
            bgStyle={{ fill: COLOR.DARK_GRAY }}
          />
        </EmailShareButton>
      </div>
    </div>
  );
};
