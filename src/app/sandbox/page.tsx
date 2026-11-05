"use client";
import { useState, memo, ComponentType, useEffect } from "react";
import { pageData } from "@/utils/sandbox/sandboxData";

const ComponentRenderer = memo<{
  component: ComponentType<Record<string, unknown>>;
  props: Record<string, unknown>;
}>(function ComponentRenderer({ component: Component, props }) {
  return <Component {...props} />;
});

export default function SandboxPage() {
  const [mounted, setMounted] = useState(false);
  const [componentActive, setComponentActive] = useState<number>(0);
  const [variantActive, setVariantActive] = useState<number>(0);
  const [componentKey, setComponentKey] = useState(() => {
    if (typeof window === "undefined") return "initial";
    return Math.random().toString(36);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleComponentChange = (index: number) => {
    setComponentActive(index);
    setVariantActive(0);
    setComponentKey(() => Math.random().toString(36));
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading sandbox...</p>
      </div>
    );
  }

  const compedData = (i: number) => ({
    ...pageData[i].defaultProps?.data,
    ...pageData[i].variants?.[variantActive]?.props.data,
  });

  const componentProps = (i: number) => ({
    ...pageData[i].defaultProps,
    ...pageData[i].variants?.[variantActive]?.props,
    data: { ...compedData(i) },
  });

  return (
    <div className="flex h-screen">
      {/* ========================================================== SIDEBAR NAVIGATION */}
      <div className="flex flex-col gap-2.5 shadow-2xl border-r border-black w-60 relative z-100 px-2.5">
        <p className="font-bold text-center border-b border-black m-0 p-4">
          Components
        </p>
        {pageData?.map((item, i) => (
          <div key={i}>
            <button
              className={`bg-transparent border-none text-base cursor-pointer ${
                componentActive === i ? "font-semibold" : "font-normal"
              }`}
              onMouseDown={() => handleComponentChange(i)}
            >
              {item.name}
            </button>
            {componentActive === i &&
              item.variants.length > 1 &&
              item.variants.map(
                (
                  variant: { name: string; props: Record<string, unknown> },
                  i: number,
                ) => (
                  <div className="pl-2" key={i}>
                    <button
                      className={`flex bg-transparent border-none py-1 px-0 pl-1 text-left cursor-pointer ${
                        variantActive === i
                          ? "font-semibold underline"
                          : "font-normal no-underline"
                      }`}
                      onMouseDown={() => setVariantActive(i)}
                    >
                      {variant.name}
                    </button>
                  </div>
                ),
              )}
          </div>
        ))}
      </div>

      {/* ========================================================== CONTENT AREA */}
      <div className="w-[calc(100%-240px)] overflow-y-scroll">
        {pageData[componentActive] && (
          <ComponentRenderer
            key={componentKey}
            component={pageData[componentActive].component}
            props={componentProps(componentActive)}
          />
        )}
      </div>
    </div>
  );
}
