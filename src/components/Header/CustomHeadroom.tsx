"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  pinStart?: number;
  delta?: number;
  debug?: boolean;
};

export const CustomHeadroom = ({
  children,
  pinStart = 0,
  delta = 8,
  debug = false,
}: Props) => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const getScrollY = () =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    lastScrollY.current = getScrollY();
    visibleRef.current = true;
    setVisible(true);

    const rafHandler = () => {
      const currentScrollY = getScrollY();
      const diff = currentScrollY - lastScrollY.current;
      const absDiff = Math.abs(diff);

      if (debug) {
        console.log(
          "[Headroom] current:",
          currentScrollY,
          "last:",
          lastScrollY.current,
          "diff:",
          diff
        );
      }

      if (currentScrollY <= pinStart) {
        if (!visibleRef.current) {
          visibleRef.current = true;
          setVisible(true);
        }
      } else if (absDiff > delta) {
        if (diff > 0 && visibleRef.current) {
          visibleRef.current = false;
          setVisible(false);
        } else if (diff < 0 && !visibleRef.current) {
          visibleRef.current = true;
          setVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(rafHandler);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [pinStart, delta, debug]);

  return (
    <div
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-1000 transition-transform duration-600 ease-in-out will-change-transform"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      {children}
    </div>
  );
};

export default CustomHeadroom;
