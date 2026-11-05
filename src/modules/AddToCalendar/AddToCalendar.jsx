"use client";
import { useState, useRef, useEffect } from "react";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import { FaMicrosoft, FaYahoo, FaApple } from "react-icons/fa";
import {
  PiMicrosoftOutlookLogoDuotone,
  PiCalendarPlusDuotone,
} from "react-icons/pi";
import { SiGooglecalendar } from "react-icons/si";

export const AddToCalendar = ({
  title,
  description,
  date,
  duration,
  location,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarUrls, setCalendarUrls] = useState({
    google: "",
    outlook: "",
    office: "",
    yahoo: "",
    apple: "",
  });
  const modalRef = useRef(null);

  const linkClassString = `w-clamp-160 flex gap-clamp-12 items-center mt-clamp-6 text-center 
  p-clamp-14 bg-white text-black no-underline [&_svg]:w-clamp-20 [&_svg]:h-clamp-20
  transition duration-150 ease-in-out hover:bg-primary`;

  const event = {
    title: title,
    description: description,
    start: date,
    duration: [duration, "hour"],
    location: location,
  };

  // Generate calendar URLs on client side only to avoid hydration mismatch
  useEffect(() => {
    setCalendarUrls({
      google: google(event),
      outlook: outlook(event),
      office: office365(event),
      yahoo: yahoo(event),
      apple: ics(event),
    });
  }, [title, description, date, duration, location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col w-clamp-200 justify-center items-center relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Add event to calendar"
        className={`relative w-full flex justify-center items-center gap-clamp-10
          [&_svg]:w-clamp-34 [&_svg]:h-clamp-34
          text-black bg-white p-clamp-8 border-2 border-solid border-primary
          transition-all duration-100 
          ${isOpen ? "cursor-default" : "hover:bg-primary cursor-pointer"}
        `}
      >
        <PiCalendarPlusDuotone />
        <span className="text-tag">Add to Calendar</span>
      </button>
      <div
        className={`add_to_calendar_links absolute w-full -top-2 left-0 mt-2 z-10
          flex justify-center items-center bg-black/80 p-clamp-4 backdrop-blur-sm
           ${isOpen ? "block" : "hidden"}`}
      >
        <div className="" ref={modalRef}>
          <br />
          <a
            href={calendarUrls.google}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className={linkClassString}
            aria-label="Add to Google Calendar"
          >
            <SiGooglecalendar aria-hidden="true" />
            <span className="text-button">Google</span>
          </a>
          <a
            href={calendarUrls.apple}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className={linkClassString}
            aria-label="Add to Apple Calendar"
          >
            <FaApple aria-hidden="true" />
            <span className="text-button">Apple</span>
          </a>
          <a
            href={calendarUrls.office}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className={linkClassString}
            aria-label="Add to Office 365 Calendar"
          >
            <FaMicrosoft aria-hidden="true" />
            <span className="text-button">Office365</span>
          </a>
          <a
            href={calendarUrls.outlook}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className={linkClassString}
            aria-label="Add to Outlook Calendar"
          >
            <PiMicrosoftOutlookLogoDuotone aria-hidden="true" />
            <span className="text-button">Outlook</span>
          </a>
          <a
            href={calendarUrls.yahoo}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className={linkClassString}
            aria-label="Add to Yahoo Calendar"
          >
            <FaYahoo aria-hidden="true" />
            <span className="text-button">Yahoo</span>
          </a>
          <br />
        </div>
      </div>
    </div>
  );
};
