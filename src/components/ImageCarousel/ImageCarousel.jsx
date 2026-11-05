"use client";
import React, { useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";

import { Image } from "@/modules/Image";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
// import {
//   PrevButton,
//   NextButton,
//   usePrevNextButtons,
// } from "./EmblaCarouselArrowButtons";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress";

import { defaultWidthString } from "@/utils/constants/spacing";

export const ImageCarousel = ({ data = {} }) => {
  // ========================================================================
  // Props & Data
  // ========================================================================
  const {
    images,
    componentWidth = 0,
    imageMargin = 0,
    aspectRatio: sanityAspectRatio,
    speed = 4000,
    showControls = true,
    direction = "forward",
    autoPlayOptions = 0, // 0 = disabled, 1 = auto play, 2 = auto scroll
    anchorTagLink,
    sectionStyles = {},
    _key,
  } = data;
  const { topSpacing, bottomSpacing } = sectionStyles;

  // ========================================================================
  // Autoplay & AutoScroll Configuration (moved before hooks)
  // ========================================================================
  const isAutoPlay = autoPlayOptions === 1;
  const isAutoScroll = autoPlayOptions === 2;
  const autoScrollSpeed = speed === 6000 ? 1 : speed === 4000 ? 2 : 3;

  const OPTIONS = { loop: true };
  const autoOptions = isAutoPlay
    ? [
        Autoplay({
          playOnInit: true,
          stopOnMouseEnter: false,
          delay: speed, // how fast until scroll in milliseconds
          jump: false, // whether to jump to the next scroll point or smoothly scroll
        }),
      ]
    : isAutoScroll
      ? [
          AutoScroll({
            playOnInit: true,
            stopOnMouseEnter: false,
            speed: autoScrollSpeed,
            direction: direction || "forward",
          }),
        ]
      : [];

  // ========================================================================
  // Embla Carousel Initialization (hooks must come before early return)
  // ========================================================================
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, autoOptions);

  // ========================================================================
  // Autoplay Progress Bar
  // ========================================================================
  const progressNode = useRef(null);
  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);
  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  // ========================================================================
  // Navigation Button Handlers
  // ========================================================================
  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );

  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick,
  // } = usePrevNextButtons(emblaApi, onNavButtonClick);

  // Early return after all hooks
  if (!images) return null;

  // ========================================================================
  // Aspect Ratio Calculation
  // ========================================================================
  const aspectRatio =
    sanityAspectRatio === "original"
      ? null
      : sanityAspectRatio || "aspect-[6/4]";
  const extractRatio = aspectRatio?.match(/aspect-\[(\d+\/\d+)\]/);

  // Calculate ratio without eval - safely parse the fraction
  const calculateRatio = (ratioString) => {
    if (!ratioString) return null;
    const [numerator, denominator] = ratioString.split("/").map(Number);
    return denominator ? numerator / denominator : null;
  };

  const ratio = aspectRatio ? calculateRatio(extractRatio?.[1] ?? "6/4") : null;
  const aspectRatioString = aspectRatio || null;
  const useOriginalAspectRatio = !aspectRatio;

  // ========================================================================
  // Component Width Styles
  // ========================================================================
  const componentFullWidth = componentWidth === 1;
  const componentWidthString = componentFullWidth
    ? "w-full"
    : defaultWidthString;

  // Responsive image widths based on aspect ratio and component width
  const imageWidthString = useOriginalAspectRatio
    ? "flex-shrink-0" // For original aspect ratios, let width be determined by image
    : aspectRatio.includes("1/1")
      ? componentFullWidth
        ? "flex-[0_0_60%] lg:flex-[0_0_40%]"
        : "flex-[0_0_70%] lg:flex-[0_0_50%]"
      : componentFullWidth
        ? "flex-[0_0_80%] lg:flex-[0_0_60%]"
        : "flex-[0_0_90%] lg:flex-[0_0_70%]";

  // Calculate sizes prop to match imageWidthString
  // lg breakpoint = 1024px in Tailwind
  const imageSizes = useOriginalAspectRatio
    ? "(min-width: 1024px) 600px, (min-width: 768px) 500px, 400px" // Match the fixed heights
    : aspectRatio.includes("1/1")
      ? componentFullWidth
        ? "(min-width: 1024px) 40vw, 60vw"
        : "(min-width: 1024px) 50vw, 70vw"
      : componentFullWidth
        ? "(min-width: 1024px) 60vw, 80vw"
        : "(min-width: 1024px) 70vw, 90vw";

  // ========================================================================
  // Image Margin Styles
  // ========================================================================
  const noImageMargin = imageMargin === 0;
  const emblaContainerMarginString = noImageMargin ? "ml-0" : "-ml-4";
  const emblaSlidePaddingString = noImageMargin ? "pl-0" : "pl-4";

  // ========================== MAIN RETURN ==========================
  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      id={anchorTagLink}
      mobileWidth={"w-full"}
      desktopWidth={"lg:w-full"}
      searchKey={_key}
    >
      <section className="embla" aria-label="Image carousel">
        {/* ========================================================== CAROUSEL VIEWPORT */}
        <div
          className={`embla__viewport overflow-hidden m-auto ${componentFullWidth ? "" : "rounded-image"} ${componentWidthString}`}
          ref={emblaRef}
        >
          <div
            className={`embla__container flex ${emblaContainerMarginString}`}
          >
            {images.map((item, index) => (
              <div
                className={`embla__slide min-w-0 ${imageWidthString} ${emblaSlidePaddingString}`}
                key={index}
              >
                <div
                  className={`carousel_image_container flex items-center justify-center overflow-hidden
                  ${useOriginalAspectRatio ? "h-[60vw] lg:h-[25vw]" : aspectRatioString} ${noImageMargin ? "" : "rounded-image"}`}
                >
                  <Image
                    image={item}
                    aspectRatio={ratio}
                    sizes={imageSizes}
                    className={
                      useOriginalAspectRatio
                        ? "h-full w-auto object-contain!"
                        : ""
                    }
                  />
                </div>
                {/* <div className="embla__slide__number absolute bg-black/50 text-white w-full bottom-0 flex items-center justify-center">
                  {index + 1}
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================== CONTROLS */}
        {showControls && !isAutoScroll && (
          <>
            <div className="embla__controls flex justify-center mt-clamp-20 gap-clamp-4">
              <div className="embla__buttons flex items-center gap-clamp-20">
                {/* PREV BUTTON */}
                {/* <PrevButton
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                /> */}

                {/* DOT BUTTONS */}
                <div
                  className="embla__dots flex flex-wrap justify-center items-center"
                  role="group"
                  aria-label="Carousel navigation"
                >
                  {scrollSnaps.map((_, index) => (
                    <DotButton
                      key={index}
                      onClick={() => onDotButtonClick(index)}
                      className={"embla__dot".concat(
                        index === selectedIndex ? " embla__dot--selected" : "",
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === selectedIndex ? "true" : "false"}
                    />
                  ))}
                </div>

                {/* NEXT BUTTON */}
                {/* <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                /> */}
              </div>
            </div>

            {/* AUTOPLAY PROGRESS BAR */}
            {isAutoPlay && (
              <div
                className={`embla__progress mt-clamp-10 transition-opacity duration-200 ${showAutoplayProgress ? "opacity-100" : "opacity-0"}`}
              >
                <div className="embla__progress__bar" ref={progressNode} />
              </div>
            )}

            {/* <button
              className="embla__play"
              onClick={toggleAutoplay}
              type="button"
            >
              {autoplayIsPlaying ? "Stop" : "Start"}
            </button> */}
          </>
        )}
      </section>
    </DefaultWrapper>
  );
};
