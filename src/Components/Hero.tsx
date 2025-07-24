import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext"; // adjust path if needed
import { FaArrowRight, FaPlus, FaAngleDown } from "react-icons/fa";

const Hero = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error(
      "DarkModeContext not found. Make sure App wraps your components."
    );
  }

  const { darkMode } = context;

  return (
    <section
      className="container mx-auto px-4 py-12 md:py-24 flex
     flex-col items-center text-center"
    >
      <div className="relative mb-8">
        <div
          className="absolute -top-6 md:left-6  left-4  w-16 h-16 rounded-full
         bg-[#fdfd66] opacity-70 floating"
        ></div>
        <div
          className="absolute -bottom-6 right-4 md:right-6 w-16 h-16
         rounded-full bg-[#ba8eba] opacity-70 floating floating-delay-1"
        ></div>

        <div
          className={`relative z-10 rounded-2xl p-8 shadow-xl backdrop-blur-sm ${
            darkMode ? "bg-white/60" : "bg-white/70"
          }`}
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text
           text-transparent bg-gradient-to-r from-[#ff9eb5] to-[#8cb9e8]"
          >
            QuizKit
          </h1>
          <p className="text-xl md:text-2xl text-gray-700  mb-6">
            Discover your tech love language
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a
          href="/quiz"
          className="px-8 py-3 bg-white rounded-full
           text-[#ff9eb5] font-bold shadow-lg hover:bg-[#ff9eb5]
            hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <span>Start Quiz</span>
          <FaArrowRight className="ml-2" />
        </a>
        <a
          href="/create"
          className="px-8 py-3 bg-white rounded-full
           text-[#8cb9e8] font-bold shadow-lg hover:bg-[#8cb9e8]
            hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <span>Create Your Own</span>
          <FaPlus className="ml-2" />
        </a>
      </div>

      <div
        className="mt-12 w-16 h-16 rounded-full bg-white 
      flex items-center justify-center shadow-lg floating floating-delay-2"
      >
        <FaAngleDown className="text-[#ff9eb5] text-2xl" />
      </div>
    </section>
  );
};

export default Hero;
