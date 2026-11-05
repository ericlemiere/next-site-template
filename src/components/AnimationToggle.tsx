"use client";

import { useAnimation } from "@/appContexts";

export function AnimationToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimation();

  return (
    <button
      onClick={toggleAnimations}
      className="fixed top-2 left-2 z-9999 bg-white/90 backdrop-blur-sm border border-gray-300 
    rounded-lg px-3 py-2 shadow-lg hover:bg-white transition-all duration-200 text-sm font-medium
    cursor-pointer"
      aria-label={`Turn animations ${animationsEnabled ? "off" : "on"}`}
      title={`Turn animations ${animationsEnabled ? "off" : "on"}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-gray-700">
          Animations: <strong>{animationsEnabled ? "ON" : "OFF"}</strong>
        </span>
        <div
          className={`w-8 h-4 rounded-full transition-colors relative ${
            animationsEnabled ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${
              animationsEnabled ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </div>
      </div>
    </button>
  );
}
