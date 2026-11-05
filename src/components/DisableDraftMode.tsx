"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/actions";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Use lazy initialization to check environment on client
  const [shouldRender] = useState(() => {
    if (typeof window === "undefined") return false;
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "unknown";
    return environment === "live" || environment === "unknown";
  });

  // Return null if we shouldn't render
  if (!shouldRender) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow z-105">
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <button
          type="button"
          onClick={disable}
          className="text-sm text-blue-500 hover:text-blue-900 cursor-pointer"
        >
          Disable draft mode
        </button>
      )}
    </div>
  );
}
