import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../Components/DarkModeContext";

type Question = {
  question: string;
  choices: string[];
};

const questions: Question[] = [
  {
    question: "What’s your favorite part of building something?",
    choices: [
      "Designing the user interface",
      "Crafting clean, efficient logic",
      "Automating boring stuff",
      "Thinking deeply about systems and architecture",
    ],
  },
  {
    question: "Pick your ideal weekend coding vibe:",
    choices: [
      "A cozy night styling components with lo-fi beats",
      "Grinding through server logic until sunrise",
      "Setting up new VSCode extensions “just for fun”",
      "Watching CS theory videos and journaling ideas",
    ],
  },
  {
    question: "You’ve joined a hackathon. What’s the first thing you do?",
    choices: [
      "Open Figma and brainstorm colors and layout",
      "Spin up an Express server and build endpoints",
      "Configure the project structure and folder names",
      "Debate architecture and data flow with your team",
    ],
  },
  {
    question: "Which dev tool sparks the most joy?",
    choices: [
      "Tailwind CSS",
      "Postman",
      "Zsh with custom aliases",
      "Notion + Markdown",
    ],
  },
  {
    question: "What's your relationship with bugs?",
    choices: [
      "CSS bug? More like creative challenge ",
      "Logic bug? I debug like Sherlock ",
      "I install a new tool to help",
      "I sit back and contemplate why bugs exist",
    ],
  },
  {
    question: "How do you name your variables?",
    choices: [
      "colorPop, btnGlow, heroShade",
      "user_id, responseData, authToken",
      "x, y, temp, until it works",
      "theEssenceOfTruth",
    ],
  },
  {
    question: "Your favorite Git command is:",
    choices: [
      "git checkout -b feature/ui-update",
      "git merge --no-ff",
      "git stash and pray",
      "git reflog (because I broke something again)",
    ],
  },
  {
    question: "What kind of developer do you admire most?",
    choices: [
      "Pixel-perfect designers with CSS wizardry",
      "Engineers who can write APIs in their sleep",
      "Devs who try every new tool on day one",
      "Quiet geniuses who write legendary comments",
    ],
  },
  {
    question: "Your side projects folder looks like:",
    choices: [
      "A colorful collection of micro-frontends",
      "Full-stack CRUD apps and auth flows",
      "12 half-finished setups with vite, bun, turbo",
      "A philosophical journal disguised as .md files",
    ],
  },
  {
    question: "Choose your dev motto:",
    choices: [
      "Design is not decoration.",
      "Works on my machine.",
      "One more CLI tool can’t hurt.",
      "Simplicity is the soul of efficiency.",
    ],
  },
  {
    question: "How do you start a new project?",
    choices: [
      "Open CodeSandbox and start designing",
      "Run npx create-next-app and build the API first",
      "Set up a full custom dev environment",
      "Create a README before touching code",
    ],
  },
  {
    question: "When you hit a wall in your code, you:",
    choices: [
      "Take a walk and visualize the UI flow",
      "Debug step by step until the stack trace makes sense",
      "Google until you find a 3-month-old GitHub issue",
      "Write a blog post to explain it to yourself",
    ],
  },
  {
    question: "Your favorite part of a tech talk is:",
    choices: [
      "The live UI demos!",
      "How the backend scales",
      "Watching someone’s terminal setup",
      "The weird tangents that reveal new ideas",
    ],
  },
  {
    question: "Your coding playlist is:",
    choices: [
      "Chillhop + Retrowave",
      "High BPM focus mode (Drum & Bass, EDM)",
      "Absolute silence + mechanical keyboard ASMR",
      "Long podcast episodes you barely remember",
    ],
  },
  {
    question: "Which imaginary conference talk would you give?",
    choices: [
      "10 Tailwind Tricks to Make You Look Good",
      "Why REST is underrated again",
      "Terminal Tools That Feel Like Magic",
      "Zen and the Art of Code Maintenance",
    ],
  },
  {
    question: "What do you secretly judge other devs for?",
    choices: [
      "Misaligned buttons",
      "Fetching data in useEffect without cleanup",
      "Not using keyboard shortcuts",
      "Not knowing the difference between == and ===",
    ],
  },
  {
    question: "Pick a sticker for your laptop:",
    choices: [
      "React logo with pastel sparkles",
      "Backend logic diagram meme",
      "A weird but beautiful Bash command",
      "“Code. Think. Repeat.”",
    ],
  },
  {
    question: "How do you treat comments in your code?",
    choices: [
      "Beautiful, aligned, and full of puns",
      "Helpful when needed, never too much",
      "I comment out lines instead of deleting",
      'Philosophical one-liners like "// this broke my soul"',
    ],
  },
  {
    question: "How often do you refactor?",
    choices: [
      "Constantly — it’s part of the process",
      "Only when I have time (which I never do)",
      "When the file feels vibe-wrong",
      "I don’t refactor. I rebuild.",
    ],
  },
  {
    question: "Choose a debugging snack:",
    choices: [
      "Matcha + mochi",
      "Black coffee, no distractions",
      "Cold pizza from last night",
      "Air — I forget to eat when deep in flow",
    ],
  },
];

const CrushCodeQuiz: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(undefined)
  );
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const selectAnswer = (choiceIndex: number) => {
    const updated = [...answers];
    updated[current] = choiceIndex;
    setAnswers(updated);
  };

  const computeResult = (ans: number[]) => {
    const total = ans.reduce((acc, val) => acc + val, 0);
    const persona = [
      "Frontend Flirt",
      "Backend Brainiac",
      "Tool Tinkerer",
      "Code Philosopher",
    ];
    return persona[total % persona.length];
  };

  const showResult = () => {
    const result = computeResult(answers);
    localStorage.setItem("crushcode_result", result);
    navigate("/result");
  };

  return (
    <div
      className={`quiz-container ${
        darkMode
          ? "bg-gray-800 dark:shadow-xl dark:shadow-gray-900/30 border border-gray-700/30"
          : ""
      }`}
    >
      <div className={`progress-bar ${darkMode ? "bg-gray-700/50" : ""}`}>
        <div
          id="progress"
          className="progress-fill"
          style={{ width: `${(current / questions.length) * 100}%` }}
        />
      </div>

      <div className={`card ${darkMode ? " shadow-gray-900/20" : ""}`}>
        <div
          className={`question ${
            darkMode ? "text-gray-100" : "text-gray-800/80"
          }`}
        >
          {questions[current].question}
        </div>
        <div className="choices">
          {questions[current].choices.map((choice, i) => (
            <div
              key={i}
              className="choice"
              onClick={() => selectAnswer(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
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
                      ? "linear-gradient(to right, #d48396, #d2d254)"
                      : "linear-gradient(to right, #ff9eb5, #fdfd66)"
                    : hoveredIndex === i
                    ? darkMode
                      ? "linear-gradient(to right, #d48396, #d2d254)"
                      : "linear-gradient(to right, #ff9eb5, #fdfd66)"
                    : darkMode
                    ? "#1c1c1c4a"
                    : "rgba(255,255,255,0.1)",
                color: darkMode
                  ? answers[current] === i || hoveredIndex === i
                    ? "#f1f5f9"
                    : "#e2e8f0"
                  : "",
                boxShadow: darkMode ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "",
                backdropFilter: darkMode ? "blur(8px)" : "",
                transition: "all 0.25s ease",
              }}
            >
              {choice}
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
            current === questions.length - 1
              ? showResult()
              : setCurrent(current + 1)
          }
          disabled={answers[current] === undefined}
        >
          {current === questions.length - 1 ? "View Result" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CrushCodeQuiz;
