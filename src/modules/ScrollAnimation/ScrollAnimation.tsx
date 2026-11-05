"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "@/appContexts";

// ===========================================================
// SCROLL ANIMATION COMPONENT
// ===========================================================
export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  type = "fade-in",
  duration = 0.5,
  delay = 0.1,
  retrigger = false,
  threshold = 0.3,
  stagger = 0,
  className = "",
  disableScrollAnimation = false,
}) => {
  const { animationsEnabled } = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: !retrigger,
    threshold: type.includes("unroll") ? 0 : threshold,
  });

  if (!animationsEnabled || disableScrollAnimation) {
    return <div className={className}>{children}</div>;
  }

  // If stagger is enabled, use container/children pattern with direct framer-motion animations
  if (stagger > 0) {
    const container = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };

    const item = {
      hidden: { ...initialState(type) },
      visible: {
        ...finalState(type),
        transition: { duration },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={container}
        className={className}
      >
        {React.Children.toArray(children).map((child, index) => (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Otherwise wrap all children in a single animated div
  const childVariants = {
    hidden: { ...initialState(type) },
    show: {
      ...finalState(type),
      transition: { duration, delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={childVariants}
      initial={"hidden"}
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ===========================================================
// TYPES
// ===========================================================
type ScrollAnimationProps = {
  children: React.ReactNode;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  retrigger?: boolean;
  threshold?: number;
  stagger?: number;
  className?: string;
  disableScrollAnimation?: boolean;
};

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-right"
  | "fade-left"
  | "fade-in"
  | "scroll-left"
  | "scroll-right"
  | "unroll-right"
  | "unroll-left";

// ===========================================================
// Initial and Final State
// ===========================================================
const initialState = (type: AnimationType) => {
  switch (type) {
    case "fade-up": {
      return { opacity: 0, y: 25 };
    }
    case "fade-down": {
      return { opacity: 0, y: -25 };
    }
    case "fade-right": {
      return { opacity: 0, x: -25 };
    }
    case "fade-left": {
      return { opacity: 0, x: 25 };
    }
    case "fade-in": {
      return { opacity: 0 };
    }
    case "scroll-left": {
      return { opacity: 1, x: 100 };
    }
    case "scroll-right": {
      return { opacity: 1, x: -100 };
    }
    case "unroll-right": {
      return { clipPath: "inset(0% 100% 0% 0%)" };
    }
    case "unroll-left": {
      return { clipPath: "inset(0% 0% 0% 100%)" };
    }
    default:
      return { opacity: 0 };
  }
};

const finalState = (type: AnimationType) => {
  switch (type) {
    case "fade-up":
    case "fade-down":
    case "fade-right":
    case "fade-left":
    case "fade-in":
    case "scroll-left":
    case "scroll-right": {
      return { opacity: 1, x: 0, y: 0 };
    }
    case "unroll-right":
    case "unroll-left": {
      return { clipPath: "inset(0% 0% 0% 0%)" };
    }
    default:
      return { opacity: 1 };
  }
};
