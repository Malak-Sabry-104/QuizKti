const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24 flex 
    flex-col items-center text-center">
      <div className="relative mb-8">
        <div className="absolute -top-6 -left-6 w-16 h-16 
        rounded-full bg-pastel-yellow opacity-70 floating"></div>
        <div className="absolute -bottom-6 -right-6 w-16 h-16
         rounded-full bg-pastel-purple opacity-70 floating floating-delay-1"></div>
        <div className="relative z-10 bg-white bg-opacity-80 
        backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 
          bg-clip-text text-transparent bg-gradient-to-r from-[#ff9eb5] to-[#8cb9e8]">
            QuizKit
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            Discover your tech love language
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a
          href="/quiz"
          className="px-8 py-3 bg-white rounded-full text-[#ff9eb5]
          font-bold shadow-lg hover:bg-[#ff9eb5] hover:text-white 
          transition-all duration-300 flex items-center justify-center"
        >
          <span>Start Quiz</span>
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
        <a
          href="/create"
          className="px-8 py-3 bg-white rounded-full text-[#8cb9e8] 
          font-bold shadow-lg hover:bg-[#8cb9e8] hover:text-white 
          transition-all duration-300 flex items-center justify-center"
        >
          <span>Create Your Own</span>
          <i className="fas fa-plus ml-2"></i>
        </a>
      </div>

      <div className="mt-12 w-16 h-16 rounded-full bg-white flex 
      items-center justify-center shadow-lg floating floating-delay-2">
        <i className="fas fa-angle-down text-pastel-pink text-2xl"></i>
      </div>
    </section>
  );
};

export default Hero;
