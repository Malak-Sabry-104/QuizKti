import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../Components/DarkModeContext";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  createdAt: string;
  questionCount: number;
}

const Quiz: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  const loadQuiz = () => {
    try {
      const storedQuizzes = localStorage.getItem("quizzes");
      if (!storedQuizzes) {
        setError("No quizzes found");
        setLoading(false);
        return;
      }

      const quizzes: Quiz[] = JSON.parse(storedQuizzes);
      const foundQuiz = quizzes.find(q => q.id === quizId);
      
      if (!foundQuiz) {
        setError("Quiz not found");
        setLoading(false);
        return;
      }

      setQuiz(foundQuiz);
      setAnswers(new Array(foundQuiz.questions.length).fill(-1));
      setLoading(false);
    } catch (err) {
      setError("Error loading quiz");
      setLoading(false);
    }
  };

  const selectAnswer = (choiceIndex: number) => {
    const updated = [...answers];
    updated[current] = choiceIndex;
    setAnswers(updated);
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (answer !== -1 && answer === quiz.questions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const showResult = () => {
    if (!quiz) return;
    
    const correctAnswers = calculateScore();
    const totalQuestions = quiz.questions.length;
    
    const result = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      totalQuestions: totalQuestions,
      answeredQuestions: answers.filter(answer => answer !== -1).length,
      correctAnswers: correctAnswers,
      answers: answers,
      completedAt: new Date().toISOString()
    };

    localStorage.setItem("current_result", JSON.stringify(result));
    navigate("/result");
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Not Found</h2>
          <p className="mb-6">{error || "The quiz you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            }`}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`quiz-container ${
        darkMode
          ? "dark:shadow-xl dark:shadow-gray-900/30 border border-gray-700/30"
          : ""
      }`}
      style={{
        background: darkMode
          ? "#1D2837"
          : "linear-gradient(45deg, #ba8eba 30%, #fdfd66)",
      }}
    >
      <div className={`progress-bar ${darkMode ? "bg-gray-700/50" : ""}`}>
        <div
          id="progress"
          className="progress-fill"
          style={{ width: `${(current / quiz.questions.length) * 100}%` }}
        />
      </div>

      <div className={`card ${darkMode ? " shadow-gray-900/20" : ""}`}>
        <div className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
            {quiz.title}
          </h2>
          <p className="text-sm">{quiz.description}</p>
        </div>

        <div
          className={`question ${darkMode ? "text-gray-100" : "text-gray-500"}`}
        >
          {quiz.questions[current].question}
        </div>
        <div className="choices">
          {quiz.questions[current].options.map((option, i) => (
            <div
              key={i}
              className="choice"
              onClick={() => selectAnswer(i)}
              style={{
                border:
                  answers[current] === i
                    ? darkMode
                      ? "2px solid rgba(255,255,255,0.15)"
                      : "2px solid rgba(255,255,255,0.2)"
                    : darkMode
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(255,255,255,0.2)",
                background:
                  answers[current] === i
                    ? darkMode
                      ? "linear-gradient(to right, #ba8eba, #8cb9e8)"
                      : "linear-gradient(to right, #ff9eb5, #fdfd66)"
                    : darkMode
                    ? "#1c1c1c4a"
                    : "rgba(255,255,255,0.1)",
                color: darkMode
                  ? answers[current] === i
                    ? "#f1f5f9"
                    : "#e2e8f0"
                  : "",
                boxShadow: darkMode ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "",
                backdropFilter: darkMode ? "blur(8px)" : "",
                transition: "all 0.25s ease",
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="nav-buttons">
        <button
          onClick={() => setCurrent(current - 1)}
          disabled={current === 0}
        >
          Back
        </button>
        <button
          onClick={() =>
            current === quiz.questions.length - 1
              ? showResult()
              : setCurrent(current + 1)
          }
          disabled={answers[current] === -1}
        >
          {current === quiz.questions.length - 1 ? "View Result" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
