"use client";

import { useLoaderStore } from "../../stores/loaderStore";

const sizeMap = {
  sm: "w-8 h-8 border-4",
  md: "w-16 h-16 border-8",
  lg: "w-24 h-24 border-8",
};

const Loader = () => {
  const { isOpen, size, title } = useLoaderStore();
  if (!isOpen) return null;
  const spinnerSize = sizeMap[size as keyof typeof sizeMap] || sizeMap.md;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-40">
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg min-w-[220px]">
        <div
          className={`animate-spin rounded-full border-t-primary border-gray-200 ${spinnerSize}`}
        ></div>
        {title && (
          <span className="text-lg font-semibold text-gray-700">{title}</span>
        )}
      </div>
    </div>
  );
};

export default Loader;
