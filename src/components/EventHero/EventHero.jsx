import { format, parseISO, addHours } from "date-fns";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { Image } from "@/modules/Image";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Text } from "@/modules/Text";
import { AddToCalendar } from "@/modules/AddToCalendar/AddToCalendar";
import { BsGeoAlt, BsClock } from "react-icons/bs";
import { COLOR } from "@/utils/constants/colors";
import { cleanString } from "@/utils/helpers/string-helpers";

export const EventHero = ({ data = {} }) => {
  const {
    title,
    allDay,
    duration,
    eventDateTime,
    heroImage,
    location,
    locationUrl,
    eventDescription,
    fullSlug,
  } = data;
  const slug = `${process.env.NEXT_PUBLIC_SITE_URL}${fullSlug}`;

  const date = eventDateTime;
  const formattedDate = format(parseISO(date), "MMMM dd, yyyy");
  const formattedTime = format(parseISO(date), "h:mm a");
  const formattedStartTime = formattedTime
    .replace(" PM", "pm")
    .replace(" AM", "am");
  const endDateTime = addHours(parseISO(date), duration ?? 0);
  const formattedEndTime = format(endDateTime, "h:mm a")
    .replace(" PM", "pm")
    .replace(" AM", "am");
  const dateString = !!duration
    ? `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`
    : `${formattedDate} ${formattedStartTime}`;

  const iconWrapperClasses =
    "flex items-center [&_svg]:mr-clamp-8 [&_svg]:w-clamp-24 [&_svg]:h-clamp-24";

  return (
    <>
      <DefaultWrapper
        bottomSpacing={"small"}
        topSpacing={"default"}
        as="header"
      >
        <div className="w-full flex flex-col items-center justify-center text-center gap-y-clamp-30">
          <ScrollAnimation type="fade-up">
            <div className="flex flex-col items-center gap-clamp-16">
              {/* Time */}
              {eventDateTime && (
                <time dateTime={eventDateTime} className={iconWrapperClasses}>
                  <BsClock style={{ color: COLOR.PRIMARY }} />
                  <div className="text-heading3">
                    {allDay ? formattedDate : dateString}
                  </div>
                </time>
              )}

              {/* Location */}
              {location && (
                <div className={iconWrapperClasses}>
                  <BsGeoAlt style={{ color: COLOR.PRIMARY }} />

                  {locationUrl ? (
                    <a
                      href={locationUrl}
                      className="text-heading3 underline transition hover:text-primary hover:underline-offset-4"
                    >
                      {location}
                    </a>
                  ) : (
                    <div className="text-heading3">{location}</div>
                  )}
                </div>
              )}
            </div>
          </ScrollAnimation>
          {title && (
            <ScrollAnimation type="fade-up" delay={0.2}>
              <Text size="heading1" tag="h1">
                {title}
              </Text>
            </ScrollAnimation>
          )}
        </div>
      </DefaultWrapper>
      {heroImage && (
        <DefaultWrapper
          topSpacing={"none"}
          bottomSpacing={"none"}
          mobileWidth={"w-full"}
        >
          <ScrollAnimation type="fade-up">
            <div className="w-full lg:w-[80%] m-auto lg:overflow-hidden lg:rounded-image">
              <Image
                image={heroImage}
                aspectRatio={16 / 9}
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
          </ScrollAnimation>
        </DefaultWrapper>
      )}
      {eventDateTime && (
        <DefaultWrapper topSpacing={"small"} bottomSpacing={"none"}>
          <div className="flex justify-center">
            <ScrollAnimation type="fade-up">
              <AddToCalendar
                title={cleanString(title)}
                date={eventDateTime}
                duration={!!duration ? duration : 1}
                location={cleanString(location)}
                description={cleanString(eventDescription) + "\n \n" + slug}
              />
            </ScrollAnimation>
          </div>
        </DefaultWrapper>
      )}
    </>
  );
};
