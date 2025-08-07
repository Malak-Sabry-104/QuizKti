import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "./DarkModeContext";
import { FaArrowRight, FaPlus, FaAngleDown, FaTachometerAlt } from "react-icons/fa";
import CreateModal from "../Routes/CreateModal";

const Hero = () => {
  const context = useContext(DarkModeContext);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflowY = showCreateForm ? "hidden" : "auto";

    if (showCreateForm && modalRef.current) {
      modalRef.current.scrollTop = modalRef.current.scrollHeight;
    }
  }, [showCreateForm]);

  if (!context) {
    throw new Error(
      "DarkModeContext not found. Make sure App wraps your components."
    );
  }

  const { darkMode } = context;

  return (
    <>
      {showCreateForm && (
        <div className="fixed inset-0 z-50
         bg-black/50 backdrop-blur-sm flex 
         justify-center items-start pt-10 px-4 overflow-y-auto">
          <div
            ref={modalRef}
            className="relative w-full max-w-lg mb-3
             bg-white/20 rounded-xl shadow-lg p-6 max-h-[220vh] "
               style={{
        background: darkMode ? "#1D2837" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "0.75rem",
        boxShadow: darkMode ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "0 20px 40px rgba(102, 126, 234, 0.3)",
      }}
          >
            <button
              onClick={() => setShowCreateForm(false)}
              className="absolute -top-4 right-[-9px]
               bg-black/70 text-white rounded-full w-7 h-7
                flex items-center justify-center font-bold hover:bg-black"
            >
              ✕
            </button>
            <CreateModal />
          </div>
        </div>
      )}

      <section className="h-[90vh] px-4 py-12 md:py-24 flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="absolute -top-6 md:left-6 left-4 w-16 h-16 rounded-full bg-[#fdfd66] opacity-70 floating"></div>
          <div className="absolute -bottom-6 right-4 md:right-6 w-16 h-16 rounded-full bg-[#ba8eba] opacity-70 floating floating-delay-1"></div>

          <div
            className={`relative z-10 rounded-2xl p-8 shadow-xl backdrop-blur-sm ${
              darkMode ? "bg-white/40" : "bg-white/90"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ff9eb5] to-[#8cb9e8]">
              QuizKit
            </h1>
            <p className={`text-xl md:text-2xl mb-6 ${
              darkMode ? "text-gray-700" : "text-gray-600"
            }`}>
              Create, take, and manage your own quizzes
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${
              darkMode
                ? "bg-white text-[#ff9eb5] hover:bg-[#ff9eb5] hover:text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            }`}
          >
            <FaTachometerAlt className="mr-2" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setShowCreateForm(true)}
            className={`px-4 py-3 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${
              darkMode
                ? "bg-white text-[#8cb9e8] hover:bg-[#8cb9e8] hover:text-white"
                : "bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-600 hover:border-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            }`}
          >
            <span>Create Your Own</span>
            <FaPlus className="ml-2" />
          </button>
        </div>

        <div className={`mt-[20px] w-13 h-13 rounded-full flex items-center justify-center shadow-lg floating floating-delay-2 ${
          darkMode ? "bg-white" : "bg-white/90"
        }`}>
          <FaAngleDown className={`text-2xl ${
            darkMode ? "text-[#ff9eb5]" : "text-blue-600"
          }`} />
        </div>
      </section>
    </>
  );
};

export default Hero;
