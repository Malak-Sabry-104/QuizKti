import { FaHeart, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
const Footer = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error(
      "DarkModeContext not found. Make sure App wraps your components."
    );
  } 

  const { darkMode } = context;
  return (
    <footer
      className={`relative z-10 backdrop-blur-sm feature-card  
  p-6 shadow-lg transition-transform duration-300 
    group-hover:floating ${darkMode ? "bg-white/20" : "bg-white/70"} 
    flex flex-col justify-center items-center py-4 h-[20vh] text-center`}
    >
      <p className="flex gap-2 justify-center items-center md:text-md text-sm">
        Made With <FaHeart className="text-[#FF9EB5] w-5 h-5" />
        for tech lovers By Malak Sabry
      </p>

      <div className="flex justify-center space-x-4 mt-4">
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-pastel-pink flex items-center justify-center 
           hover:scale-105 transition-transform text-white"
        >
          <FaTwitter className="bg-[#ff9eb5] w-10 h-10 py-2 rounded-full" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-pastel-blue flex items-center justify-center 
          hover:scale-105 transition-transform text-white"
        >
          <FaInstagram className="w-10 h-10 bg-[#8cb9e8] py-2 rounded-full" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-pastel-purple flex items-center justify-center 
           hover:scale-105 transition-transform  text-white"
        >
          <FaGithub className="w-10 h-10 bg-[#ba8eba] py-2 rounded-full" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
