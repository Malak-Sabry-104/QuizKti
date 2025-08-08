import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../Components/DarkModeContext";

const CreateQuizForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<
    { question: string; options: string[]; correctAnswer: number }[]
  >([]);

  const [questionInput, setQuestionInput] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleAddQuestion = () => {
    if (
      !questionInput.trim() ||
      !optionA.trim() ||
      !optionB.trim() ||
      !optionC.trim() ||
      !optionD.trim()
    ) {
      alert("Please fill all question and options.");
      return;
    }

    if (questions.length >= 10) {
      alert("You can only add up to 10 questions.");
      return;
    }

    setQuestions([
      ...questions,
      { 
        question: questionInput.trim(), 
        options: [optionA, optionB, optionC, optionD],
        correctAnswer: correctAnswer
      },
    ]);

    setQuestionInput("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer(0);
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      alert("Please complete title and description.");
      return;
    }
    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    const quizData = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      questions,
      createdAt: new Date().toISOString(),
      questionCount: questions.length,
    };

    const existingQuizzes = localStorage.getItem("quizzes");
    const quizzes = existingQuizzes ? JSON.parse(existingQuizzes) : [];
    
    quizzes.push(quizData);
    
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    
    alert("Quiz created successfully!");
    navigate("/dashboard");
  };

  const handleExport = () => {
    const quizData = {
      title,
      description,
      questions,
    };

    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quizData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "my_quiz.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className={`min-h-full ${
      darkMode ? "text-gray-100" : "text-gray-700"
    }`}>
      <div className="max-w-3xl mx-auto min-h-full p-6">
        <h2 className={`text-2xl font-bold mb-6 ${
          darkMode ? "text-blue-300" : "text-blue-600"
        }`}>
          Create Your Quiz
        </h2>

        <section
          className={`mb-8 border-b border-solid pb-4 ${
            darkMode ? "border-gray-700" : "border-blue-200"
          }`}
        >
          <h3 className={`font-semibold text-lg mb-2 ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}>
            1. Quiz Metadata
          </h3>
          <label className={`block font-medium mb-1 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Title
          </label>
          <input
            className={`w-full p-3 rounded-lg outline-none border mb-4 transition-all duration-300 ${
              darkMode 
                ? "bg-gray-700/50 border-gray-600 text-gray-100 focus:border-blue-400" 
                : "bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. What's your tech spirit?"
          />

          <label className={`block font-medium mb-1 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Description
          </label>
          <textarea
            className={`outline-none w-full p-3 rounded-lg border transition-all duration-300 ${
              darkMode 
                ? "bg-gray-700/50 border-gray-600 text-gray-100 focus:border-blue-400" 
                : "bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }`}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief intro about your quiz..."
          />
        </section>

        <section
          className={`mb-8 border-b border-solid pb-4 ${
            darkMode ? "border-gray-700" : "border-blue-200"
          }`}
        >
          <h3 className={`font-semibold text-lg mb-2 ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}>
            2. Question Builder
          </h3>
          <div className={`p-4 rounded-xl ${
            darkMode ? "bg-gray-800/50" : "bg-blue-50/50"
          }`}>
            <p className={`mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Questions added: {questions.length} / 10
            </p>
            <label className={`block font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Question
            </label>
            <input
              className={`outline-none w-full p-3 rounded-lg border mb-4 transition-all duration-300 ${
                darkMode 
                  ? "bg-gray-700/50 border-gray-600 text-gray-100 focus:border-blue-400" 
                  : "bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="Type your question here..."
              disabled={questions.length >= 10}
            />

            <label className={`block font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Option A
            </label>
            <input
              className={`outline-none w-full p-3 rounded-lg border mb-4 transition-all duration-300 ${
                darkMode 
                  ? "bg-gray-700/50 border-gray-600 text-gray-100 focus:border-blue-400" 
                  : "bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              placeholder="Option A"
              disabled={questions.length >= 10}
            />

            <label className={`block font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Option B
            </label>
            <input
              className={`outline-none w-full p-3 rounded-lg border mb-4 transition-all duration-300 ${
                darkMode 
                  ? "bg-gray-700/50 border-gray-600 text-gray-100 focus:border-blue-400" 
                  : "bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              placeholder="Option B"
              disabled={questions.length >= 10}
            />

            <label className={`block font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Option C
            </label>
            <input
              className={`outline-none w-full p-3 rounded-lg border mb-4 transition-all duration-300 ${
                darkMode 
                  ? "bg-gray-700/50 border-gray-600 text-gray-100 focus:border-blue-400" 
                  : "bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              placeholder="Option C"
              disabled={questions.length >= 10}
            />

            <label className={`block font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Option D
            </label>
            <input
              className={`outline-none w-full p-3 rounded-lg border mb-4 transition-all duration-300 ${
                darkMode 
                  ? "bg-gray-700/50 border-gray-600 text-gray-100 focus:border-blue-400" 
                  : "bg-white/80 border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              placeholder="Option D"
              disabled={questions.length >= 10}
            />

            <label className={`block font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Correct Answer
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {['A', 'B', 'C', 'D'].map((option, index) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCorrectAnswer(index)}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                    correctAnswer === index
                      ? darkMode
                        ? "bg-blue-600 border-blue-400 text-white"
                        : "bg-blue-500 border-blue-600 text-white"
                      : darkMode
                      ? "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500"
                      : "bg-white/80 border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  disabled={questions.length >= 10}
                >
                  Option {option}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddQuestion}
              className={`mt-4 font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "hover:bg-[#8AB6E4] hover:text-white bg-white text-[#8AB6E4]"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
              }`}
              disabled={questions.length >= 10}
            >
              Add Question
            </button>
          </div>
        </section>

        <section>
          <h3 className={`font-semibold text-lg mb-2 ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}>
            3. Preview & Save
          </h3>
          <div className="flex gap-4 flex-wrap mb-4">
            <button
              onClick={handleSave}
              className={`font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "hover:bg-[#FF9EB5] hover:text-white bg-white text-[#FF9EB5]"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
              }`}
            >
              Save Quiz
            </button>
            <button
              onClick={handleExport}
              className={`font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "hover:bg-[#8AB6E4] hover:text-white bg-white text-[#8AB6E4]"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1"
              }`}
            >
              Export JSON
            </button>
          </div>

          <div
            className={`p-4 rounded-md text-sm font-mono whitespace-pre-wrap ${
              darkMode 
                ? "bg-gray-800 text-gray-300 border border-gray-700" 
                : "bg-gray-50 text-gray-700 border border-gray-200"
            }`}
          >
            {JSON.stringify(
              {
                title,
                description,
                questions,
              },
              null,
              2
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateQuizForm;
