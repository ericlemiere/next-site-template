"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AnchorLinkClientProps {
  link: string;
  children: React.ReactNode;
  id?: string;
  childClassName?: string;
}

export const AnchorLinkClient = ({
  link,
  children,
  id,
  childClassName,
}: AnchorLinkClientProps) => {
  const pathname = usePathname();
  const path = pathname ? pathname.split("/")[1] : "";

  const scrollHandler = (smoothScroll: boolean) => {
    if (smoothScroll) {
      document.documentElement.style.scrollBehavior = "smooth";
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = "auto";
      }, 1000);
    }
  };

  return (
    <Link
      id={id}
      href={link ?? "/404/"}
      onClick={() => scrollHandler(link.includes(path))}
    >
      <span className={childClassName}>{children}</span>
    </Link>
  );
};
