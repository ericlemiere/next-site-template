"use client";
import Link from "next/link";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Image } from "@/modules/Image";
import { Text } from "@/modules/Text";

export const EventCalendarList = ({ data = {} }) => {
  const { events = [] } = data;
  const now = new Date();
  const pastEventsCount = events.filter(
    (event) => new Date(event.eventDateTime) < now
  ).length;

  const renderListView = () => {
    return events.map((event, index) => {
      const now = new Date();
      const eventDate = new Date(event.eventDateTime);
      if (eventDate < now) {
        return null; // Skip past events
      }

      return (
        <Link
          href={event?.slug ? event.slug.current : null}
          key={event._id || index}
        >
          <article
            className="list_item_wrapper flex flex-col justify-center items-start w-full border border-gray
          rounded-lg overflow-hidden shadow-md my-clamp-20 last-of-type:mb-0 shadow-gray 
          transition-all duration-200 ease hover:bg-light-gray hover:border-primary hover:shadow-xl hover:translate-x-0.5
          md:flex-row md:justify-flex-start md:items-center"
          >
            {event.heroImage && (
              <div className="list_image_wrapper md:hidden relative w-full aspect-video">
                <Image image={event.heroImage} aspectRatio={16 / 9} />
              </div>
            )}
            <div className="list_date_wrapper flex w-full md:w-fit md:items-center h-[-webkit-fill-available]">
              {/* Weekday */}
              <div className="flex flex-col items-center justify-center bg-dark-gray bg-darkgray p-clamp-10 h-[-webkit-fill-available]">
                <Text
                  size="button"
                  className="uppercase md:w-full text-center text-white"
                >
                  {new Date(event.eventDateTime)
                    .toLocaleString("en-US", {
                      weekday: "short",
                    })
                    .charAt(0)}
                </Text>
                <Text
                  size="button"
                  className="uppercase md:w-full text-center text-white"
                >
                  {new Date(event.eventDateTime)
                    .toLocaleString("en-US", {
                      weekday: "short",
                    })
                    .charAt(1)}
                </Text>
                <Text
                  size="button"
                  className="uppercase md:w-full text-center text-white"
                >
                  {new Date(event.eventDateTime)
                    .toLocaleString("en-US", {
                      weekday: "short",
                    })
                    .charAt(2)}
                </Text>
              </div>
              <div
                className="list_date w-full flex flex-col p-clamp-16 bg-primary-dark gap-2 h-[-webkit-fill-available]
                    md:w-clamp-120 md:items-center"
              >
                <div className="list_date_row flex gap-2 md:flex-col md:items-center ">
                  {/* Month */}
                  <Text className="text-heading2 md:text-body2 text-white">
                    {new Date(event.eventDateTime).toLocaleString("en-US", {
                      month: "long",
                    })}
                  </Text>

                  {/* Day */}
                  <Text className="text-heading2 text-white">
                    {new Date(event.eventDateTime).getDate()}
                  </Text>
                </div>

                {/* Time (only if not all day) */}
                {!event.allDay && (
                  <Text className="text-heading4 md:text-body2 text-white">
                    {new Date(event.eventDateTime).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </Text>
                )}
                {/* All day text */}
                {event.allDay && (
                  <Text className="text-heading4 md:text-body2 text-white">
                    All Day
                  </Text>
                )}
              </div>
            </div>

            <div className="list_text_wrapper flex-1 h-full justify-between flex flex-col gap-clamp-8 pt-8 pb-6 px-4 md:p-clamp-20 ml-clamp-20">
              <div className="flex flex-col">
                <Text className="text-heading3 text-primary">
                  {event.title}
                </Text>

                {event.eventDescription && (
                  <Text className="text-body1 text-black">
                    {event.eventDescription}
                  </Text>
                )}
              </div>
              {event.location && (
                <Text className="text-body1 text-darkgray">
                  {event?.location && `Location: ${event.location}`}
                </Text>
              )}
            </div>

            {event.heroImage && (
              <div className="list_image_wrapper relative hidden md:block aspect-video md:w-1/5 md:min-w-[250px] md:h-[-webkit-fill-available]">
                <Image image={event.heroImage} aspectRatio={16 / 9} />
              </div>
            )}
          </article>
        </Link>
      );
    });
  };

  return (
    <div>
      {(events.length === 0 || pastEventsCount === events.length) && (
        <Text className="text-heading3 text-darkgray mt-5">
          No upcoming events.
        </Text>
      )}
      <ScrollAnimation stagger={0.05} threshold={0.01}>
        {renderListView()}
      </ScrollAnimation>
    </div>
  );
};
