import { useEffect, useRef } from "react";
import { useDarkMode } from "../Components/DarkModeContext";

const NotFound = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const colors = darkMode 
      ? ["#374151", "#1f2937", "#111827", "#4b5563", "#6b7280"] 
      : ["#fbcfe8", "#a5f3fc", "#e0f2fe", "#ffe4ec", "#fcd34d"];

    if (!containerRef.current) return;

    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement("div");
      const size = Math.random() * 40 + 20;

      bubble.className = "bubble";
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${20 + Math.random() * 70}%`;
      bubble.style.animationDuration = `${6 + Math.random() * 4}s`;

      containerRef.current.appendChild(bubble);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current
          .querySelectorAll(".bubble")
          .forEach((b) => b.remove());
      }
    };
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden h-[90vh] flex flex-col 
      justify-center items-center text-center 
      ${darkMode 
        ? "bg-gradient-to-br from-gray-800 to-gray-900" 
        : "bg-gradient-to-br from-pink-100 to-blue-100"}`}
    >
      <h1
        className={`text-[10rem] font-bold
       ${darkMode 
          ? "bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent" 
          : "bg-gradient-to-r from-pink-300 to-blue-300 bg-clip-text text-transparent"}`}
      >
        404
      </h1>
      <p className={`text-2xl ${darkMode ? "text-gray-400" : "text-gray-900/50"} mb-6`}>
        Oops! This page floated away...
      </p>
      <button
        className={`px-6 py-3 cursor-pointer rounded-full 
        ${darkMode 
          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700" 
          : "bg-gradient-to-r from-pink-200 to-cyan-200 text-gray-700 hover:from-pink-300 hover:to-cyan-300"}
         transition`}
        onClick={() => (window.location.href = "/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
