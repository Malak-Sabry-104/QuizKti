import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../Components/DarkModeContext";
import { FaPlus, FaPlay, FaTrash, FaEdit, FaFileAlt, FaCalendarAlt } from "react-icons/fa";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Array<{
    question: string;
    options: string[];
  }>;
  createdAt: string;
  questionCount: number;
}

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = () => {
    const storedQuizzes = localStorage.getItem("quizzes");
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  };

  const deleteQuiz = (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
      localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
      setQuizzes(updatedQuizzes);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`min-h-screen p-6 ${
      darkMode 
        ? "bg-gray-900 text-white" 
        : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800"
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}>
            Your Quiz Dashboard
          </h1>
          <p className={`text-lg ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Manage and take your created quizzes
          </p>
        </div>

        <div className="mb-8">
          <button
            onClick={() => navigate("/create")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            }`}
          >
            <FaPlus />
            Create New Quiz
          </button>
        </div>

        {quizzes.length === 0 ? (
          <div className={`text-center py-12 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            <div className="text-6xl mb-4 flex justify-center">
              <FaFileAlt className={`text-6xl ${
                darkMode ? "text-gray-400" : "text-gray-400"
              }`} />
            </div>
            <h3 className="text-xl font-semibold mb-2">No quizzes yet</h3>
            <p className="mb-6">Create your first quiz to get started!</p>
            <button
              onClick={() => navigate("/create")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              }`}
            >
              Create Your First Quiz
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className={`rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700 hover:border-gray-600 shadow-lg"
                    : "bg-white/80 backdrop-blur-sm border border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}>
                    {quiz.title}
                  </h3>
                  <p className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {quiz.description}
                  </p>
                </div>

                <div className={`flex items-center gap-4 mb-4 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  <span className="flex items-center gap-1">
                    <FaFileAlt className="text-xs" />
                    {quiz.questionCount} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-xs" />
                    {formatDate(quiz.createdAt)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    }`}
                  >
                    <FaPlay className="text-sm" />
                    Take Quiz
                  </button>
                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      darkMode
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    }`}
                    title="Delete Quiz"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard