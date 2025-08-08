import { useState, useEffect, type ReactNode } from "react";
import { DarkModeContext } from "./Components/DarkModeContext";

type AppProps = {
  children: ReactNode;
};

const App = ({ children }: AppProps) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      const hasSeeded = localStorage.getItem("hasSeededDefaultQuiz");
      const storedQuizzes = localStorage.getItem("quizzes");
      const quizzes: any[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];

      if (!hasSeeded && (!quizzes || quizzes.length === 0)) {
        const defaultQuiz = {
          id: "default-quiz",
          title: "General Knowledge Starter",
          description: "A quick 5-question quiz to get you started.",
          createdAt: new Date().toISOString(),
          questions: [
            {
              question: "What does HTML stand for?",
              options: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "Hyperlink and Text Markup Language",
                "Home Tool Markup Language",
              ],
              correctAnswer: 0,
            },
            {
              question: "Which company developed React?",
              options: ["Google", "Facebook (Meta)", "Microsoft", "Twitter"],
              correctAnswer: 1,
            },
            {
              question: "What is the value of 2 + 2 × 2?",
              options: ["6", "8", "4", "2"],
              correctAnswer: 0,
            },
            {
              question: "Which CSS property controls the text size?",
              options: ["font-style", "text-size", "font-weight", "font-size"],
              correctAnswer: 3,
            },
            {
              question: "Which of these is NOT a JavaScript framework?",
              options: ["React", "Angular", "Django", "Vue"],
              correctAnswer: 2,
            },
          ],
        };

        const seeded = [
          {
            ...defaultQuiz,
            questionCount: defaultQuiz.questions.length,
          },
        ];

        localStorage.setItem("quizzes", JSON.stringify(seeded));
        localStorage.setItem("hasSeededDefaultQuiz", "true");
      }
    } catch (err) {
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div
        className={`min-h-screen transition-colors duration-500 ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
        }`}
      >
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};

export default App;
