import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../Components/DarkModeContext";
import html2canvas from "html2canvas";
import { FaTrophy, FaStar, FaThumbsUp, FaFistRaised, FaBook, FaBookOpen } from "react-icons/fa";

interface QuizResult {
  quizId: string;
  quizTitle: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  answers: number[];
  completedAt: string;
}

const Results: React.FC = () => {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [shareLink, setShareLink] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const resultCardRef = useRef<HTMLDivElement>(null);
  const shareLinkRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = () => {
    try {
      const resultData = localStorage.getItem("current_result");
      if (!resultData) {
        setLoading(false);
        return;
      }

      const parsedResult: QuizResult = JSON.parse(resultData);
      setResult(parsedResult);
      setLoading(false);
    } catch (error) {
      console.error("Error loading result:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      const baseUrl = window.location.origin;
      const resultData = {
        quizTitle: result.quizTitle,
        score: result.correctAnswers,
        total: result.totalQuestions,
        percentage: Math.round((result.correctAnswers / result.totalQuestions) * 100)
      };
      const base64Data = btoa(JSON.stringify(resultData));
      setShareLink(`${baseUrl}/result?data=${base64Data}`);
    }
  }, [result]);

  const copyToClipboard = () => {
    if (shareLinkRef.current) {
      shareLinkRef.current.select();
      document.execCommand("copy");
      alert("Link copied to clipboard!");
    }
  };

  const downloadAsImage = () => {
    if (resultCardRef.current) {
      html2canvas(resultCardRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "quiz-result.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent! You're a quiz master!";
    if (percentage >= 80) return "Great job! You really know your stuff!";
    if (percentage >= 70) return "Good work! You're getting there!";
    if (percentage >= 60) return "Not bad! Keep practicing!";
    if (percentage >= 50) return "You're on the right track!";
    return "Keep studying and try again!";
  };

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 90) return <FaTrophy className="inline mr-2" />;
    if (percentage >= 80) return <FaStar className="inline mr-2" />;
    if (percentage >= 70) return <FaThumbsUp className="inline mr-2" />;
    if (percentage >= 60) return <FaFistRaised className="inline mr-2" />;
    if (percentage >= 50) return <FaBook className="inline mr-2" />;
    return <FaBookOpen className="inline mr-2" />;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-500";
    if (percentage >= 80) return "text-blue-500";
    if (percentage >= 70) return "text-yellow-500";
    if (percentage >= 60) return "text-orange-500";
    return "text-red-500";
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
          <p className="mb-6">Complete a quiz to see your results here.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            }`}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  const scoreMessage = getScoreMessage(percentage);
  const scoreIcon = getScoreIcon(percentage);
  const scoreColor = getScoreColor(percentage);

  return (
    <div className={`flex items-center justify-center min-h-screen p-8 ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    }`}>
      <div
        ref={resultCardRef}
        className={`result-container max-w-xl w-full rounded-2xl p-8 text-center ${
          darkMode
            ? "bg-gray-800 text-gray-200 shadow-xl shadow-gray-900/30 border border-gray-700/30"
            : "bg-white/95 backdrop-blur-lg text-gray-700 shadow-2xl border border-white/20"
        } animate-fadeIn`}
      >
        <div className="mb-6">
          <h1 className={`text-3xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}>
            Quiz Complete!
          </h1>
          <h2 className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {result.quizTitle}
          </h2>
        </div>

        <div className="mb-8">
          <div className={`text-6xl font-bold mb-2 ${scoreColor}`}>
            {percentage}%
          </div>
          <div className={`text-lg mb-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {result.correctAnswers} out of {result.totalQuestions} questions correct
          </div>
          <div className={`text-sm mb-2 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            ({result.answeredQuestions} questions answered)
          </div>
          <div className={`text-xl font-semibold ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}>
            {scoreIcon} {scoreMessage}
          </div>
        </div>

        <div className={`w-full bg-gray-200 rounded-full h-4 mb-8 ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}>
          <div 
            className="h-4 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${percentage}%`,
              background: percentage >= 90 ? "linear-gradient(90deg, #10b981, #059669)" :
                         percentage >= 80 ? "linear-gradient(90deg, #3b82f6, #2563eb)" :
                         percentage >= 70 ? "linear-gradient(90deg, #f59e0b, #d97706)" :
                         percentage >= 60 ? "linear-gradient(90deg, #f97316, #ea580c)" :
                         "linear-gradient(90deg, #ef4444, #dc2626)"
            }}
          ></div>
        </div>

        <div className={`mb-8 text-sm ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}>
          Completed on {new Date(result.completedAt).toLocaleDateString()} at {new Date(result.completedAt).toLocaleTimeString()}
        </div>

        <div className="mb-8">
          <div className="flex gap-2 justify-center mb-4">
            <input
              ref={shareLinkRef}
              type="text"
              className={`flex-grow w-full py-2 px-3 rounded-md border-none focus:outline-0 text-sm ${
                darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}
              value={shareLink}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className={`border-none rounded-md py-2 px-4 font-bold transition-all duration-300 ${
                darkMode
                  ? "bg-[#ff9eb5] hover:bg-[#f07a91] text-white"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
              }`}
            >
              Copy
            </button>
          </div>
          <button
            onClick={downloadAsImage}
            className={`border-none rounded-md py-3 px-5 font-bold transition-all duration-300 ${
              darkMode
                ? "bg-[#8cb9e8] hover:bg-[#7aa7d6] text-white"
                : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
            }`}
          >
            Download Result as Image
          </button>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate(`/quiz/${result.quizId}`)}
            className={`py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
            }`}
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className={`py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
            }`}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
