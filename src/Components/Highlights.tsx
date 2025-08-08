import { FaPuzzlePiece } from "react-icons/fa";
import {
  IoShareSocialOutline,
  IoFlashOutline,
  IoCloudOutline,
  IoPhonePortraitOutline,
  IoGameControllerOutline,
} from "react-icons/io5";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
const features = [
  {
    title: "Shareable Results",
    description:
      "Easily share your tech love language with friends and compare your results in a fun, visual way.",
    icon: <IoShareSocialOutline className="text-white text-2xl" />,
    color: "#ff9eb5",
  },
  {
    title: "Instant Results",
    description:
      "No waiting, no signups - get your personalized tech love profile immediately after the quiz.",
    icon: <IoFlashOutline className="text-white text-2xl" />,
    color: "#8cb9e8",
  },
  {
    title: "Customizable",
    description:
      "Create your own tech love language quiz with our easy-to-use builder (no coding needed!).",
    icon: <FaPuzzlePiece className="text-white text-2xl" />,
    color: "#ba8eba",
  },
  {
    title: "No Backend",
    description:
      "Everything runs in your browser - no servers, no databases, just pure frontend magic.",
    icon: <IoCloudOutline className="text-white text-2xl" />,
    color: "#9ed99e",
  },
  {
    title: "Mobile Friendly",
    description:
      "Designed to work perfectly on any device, from smartphones to desktop computers.",
    icon: <IoPhonePortraitOutline className="text-white text-2xl" />,
    color: "#fdfd66",
  },
  {
    title: "Gamified",
    description:
      "Earn badges and achievements as you explore different tech love languages.",
    icon: <IoGameControllerOutline className="text-white text-2xl" />,
    color: "#ff9eb5",
  },
];

const Highlights = () => {
    const context = useContext(DarkModeContext);
  
    if (!context) {
      throw new Error(
        "DarkModeContext not found. Make sure App wraps your components."
      );
    }
  
    const { darkMode } = context;
  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <h2 className={`text-3xl font-bold text-center mb-12 ${
        darkMode ? "text-white" : "text-gray-800"
      }`}>
        Why You'll Love QuizKit
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="group">
            <div 
            className={`relative z-10 backdrop-blur-sm feature-card  
  rounded-2xl p-6 shadow-lg transition-transform duration-300 
  group-hover:floating ${darkMode ? "bg-white/40" : "bg-white/70"}`}
>
              <div
                className="w-16 h-16 rounded-full flex items-center 
                justify-center mb-4 mx-auto"
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h3
                className="text-xl font-bold text-center mb-3"
                style={{ color: feature.color }}
              >
                {feature.title}
              </h3>
              <p className={`text-center ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
