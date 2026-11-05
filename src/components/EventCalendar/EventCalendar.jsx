"use client";
import { useState } from "react";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { Text } from "@/modules/Text";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { SanityButton } from "@/modules/SanityButton";
import { EventCalendarList } from "./EventCalendarList";
import { COLOR } from "@/utils/constants/colors";
import { FaList, FaTimes } from "react-icons/fa";
import { ImCalendar } from "react-icons/im";
import { BsGeoAlt, BsClock } from "react-icons/bs";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export const EventCalendar = ({ data = {} }) => {
  const {
    events = [],
    title,
    body,
    anchorTagLink,
    sectionStyles = {},
    _key,
  } = data;
  const {
    backgroundColor = COLOR.WHITE,
    topSpacing = "default",
    bottomSpacing = "default",
  } = sectionStyles;

  const [eventView, setEventView] = useState("calendar");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Can change the color based on event type or all day
  // Need to add event type to the schema first
  const eventData = events.map((event) => ({
    title: event?.title,
    date: event?.eventDateTime,
    allDay: event?.allDay || false,
    color: event?.allDay ? `${COLOR.PRIMARY}80` : COLOR.PRIMARY,
    textColor: event?.allDay ? COLOR.BLACK : COLOR.BLACK,
    url: event?.slug ? event.slug.current : null,
    extendedProps: {
      description: event?.eventDescription || "",
      location: event?.location || "",
    },
  }));

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      mobileWidth={"w-[98%]"}
      desktopWidth={"lg:w-19/20"}
      searchKey={_key}
    >
      <TextBlock
        title={title}
        body={body}
        sectionStyles={sectionStyles}
        className="mb-clamp-40 lg:mb-clamp-60"
      />
      {/* The Calendar is styled in the calendar.css file */}
      <div className="calendar_container w-full">
        <ScrollAnimation>
          <div
            role="toolbar"
            aria-label="Calendar view options"
            className="event_view_button_wrapper relative flex w-fit mb-clamp-16 bg-black overflow-hidden "
          >
            <div
              className={`calender_active_indicator absolute w-full h-full bg-primary transition-all duration-200 ease-out
              ${eventView === "calendar" ? "-translate-x-[50%]" : "translate-x-[50%]"}`}
            />
            <button
              aria-label="Calendar view"
              aria-pressed={eventView === "calendar"}
              className={`event_view_button flex items-center justify-center w-clamp-70 
                bg-transparent z-10 gap-2 border-none px-clamp-10 py-clamp-12 cursor-pointer 
                transition-all duration-200 ease-out
                [&_svg]:transition-all [&_svg]:duration-400 [&_svg]:ease-out [&_svg]:w-clamp-20 [&_svg]:h-clamp-20
                ${eventView === "calendar" ? "[&_svg]:scale-[1.1] text-black" : "[&_svg]:scale-100 text-white hover:bg-gray"}`}
              onClick={() => setEventView("calendar")}
            >
              <ImCalendar aria-hidden="true" />
            </button>
            <button
              aria-label="List view"
              aria-pressed={eventView === "list"}
              className={`event_view_button flex items-center justify-center w-clamp-70 
                bg-transparent z-10 gap-2 border-none px-clamp-10 py-clamp-12 cursor-pointer 
                transition-all duration-200 ease-out
                [&_svg]:transition-all [&_svg]:duration-400 [&_svg]:ease-out [&_svg]:w-clamp-20 [&_svg]:h-clamp-20
                ${eventView === "list" ? "[&_svg]:scale-[1.1] text-black" : "[&_svg]:scale-100 text-white hover:bg-gray"}`}
              onClick={() => setEventView("list")}
            >
              <FaList aria-hidden="true" />
            </button>
          </div>
        </ScrollAnimation>

        {eventView === "calendar" ? (
          <>
            <ScrollAnimation>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={eventData}
                height={"auto"}
                //contentHeight={'auto'}
                aspectRatio={1.4}
                headerToolbar={{
                  left: "title",
                  center: "",
                  right: "dayGridMonth,dayGridWeek,dayGridDay prev,next today",
                }}
                eventClick={(info) => {
                  info.jsEvent.preventDefault(); // Prevent navigation if URL is set

                  // Find the original event data
                  const originalEvent = events.find(
                    (e) =>
                      // Match by multiple properties to ensure we find the correct event
                      e.eventDateTime === info.event.startStr ||
                      e.title === info.event.title
                  );

                  setSelectedEvent({
                    title: info.event.title,
                    description: info.event.extendedProps.description,
                    location: info.event.extendedProps.location,
                    date: info.event.start,
                    allDay: info.event.allDay,
                    originalData: originalEvent, // Store reference to original data
                  });
                }}
              />
            </ScrollAnimation>

            {/* =========================================================== MODAL */}
            {selectedEvent && (
              <div
                className="event_modal fixed top-0 left-0 right-0 bottom-0 z-1001
              flex justify-center items-center p-clamp-20 bg-black/50"
                onClick={() => setSelectedEvent(null)}
              >
                <article
                  className="event_modal_container relative flex flex-col bg-white 
                  gap-clamp-8 p-clamp-24 m-h-9/10 rounded-card w-full max-w-clamp-500 overflow-auto"
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="event-modal-title"
                >
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="event_modal_close_button text-primary absolute top-clamp-14 right-clamp-12
                      bg-transparent text-clamp-24 cursor-pointer flex 
                      justify-center items-center"
                    aria-label="Close modal"
                  >
                    <FaTimes />
                  </button>

                  <Text
                    size="header2"
                    color={COLOR.PRIMARY}
                    className="mb-clamp-8"
                    id="event-modal-title"
                  >
                    {selectedEvent.title}
                  </Text>

                  <div className="flex items-center [&_svg]:mr-clamp-8 [&_svg]:w-clamp-16 [&_svg]:h-clamp-16">
                    <BsClock style={{ color: COLOR.PRIMARY }} />
                    <Text size="body1">
                      {new Date(selectedEvent.date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                      {!selectedEvent.allDay && (
                        <>
                          {" at "}
                          {new Date(selectedEvent.date).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </>
                      )}
                      {selectedEvent.allDay && " (All day)"}
                    </Text>
                  </div>

                  {selectedEvent.location && (
                    <div className="flex items-center [&_svg]:mr-clamp-8 [&_svg]:w-clamp-16 [&_svg]:h-clamp-16">
                      <BsGeoAlt style={{ color: COLOR.PRIMARY }} />
                      <Text size="body1">{selectedEvent.location}</Text>
                    </div>
                  )}

                  {selectedEvent.description && (
                    <div>
                      <Text
                        size="body1"
                        className="mt-clamp-8 mb-clamp-4 font-bold"
                      >
                        Description
                      </Text>
                      <Text size="body1" style={{ whiteSpace: "pre-line" }}>
                        {selectedEvent.description}
                      </Text>
                    </div>
                  )}

                  {/* Link to event page if available */}
                  {selectedEvent.originalData?.slug?.current && (
                    <div className="mt-clamp-16 flex justify-center items-center">
                      <SanityButton
                        data={{
                          linkType: "internalLink",
                          text: "View Event Details",
                          internalLink: {
                            slug: {
                              current: selectedEvent.originalData.slug.current,
                            },
                          },
                        }}
                      />
                    </div>
                  )}
                </article>
              </div>
            )}
          </>
        ) : (
          <EventCalendarList data={data} />
        )}
      </div>
    </DefaultWrapper>
  );
};
