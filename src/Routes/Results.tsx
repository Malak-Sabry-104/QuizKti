import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../Components/DarkModeContext";
import html2canvas from "html2canvas";

type ResultData = {
  description: string;
  tools: string[];
};

type ResultDataMap = {
  [key: string]: ResultData;
};

type CategoryScores = {
  frontend: number;
  backend: number;
  tools: number;
  philosophy: number;
};

const Results: React.FC = () => {
  const [persona, setPersona] = useState<string>("Frontend Flirt");
  const [shareLink, setShareLink] = useState<string>("");
  const [categoryScores, setCategoryScores] = useState<CategoryScores>({
    frontend: 0,
    backend: 0,
    tools: 0,
    philosophy: 0,
  });
  const [customDescription, setCustomDescription] = useState<string>("");
  const [customTools, setCustomTools] = useState<string[]>([]);

  const resultCardRef = useRef<HTMLDivElement>(null);
  const shareLinkRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  // Base result data
  const resultData: ResultDataMap = {
    "Frontend Flirt": {
      description:
        "You shine in UI design and styling. Crafting beautiful interfaces is your passion.",
      tools: ["React", "Tailwind CSS", "Figma"],
    },
    "Backend Brainiac": {
      description:
        "You love building robust server logic and APIs. The backend is your playground.",
      tools: ["Node.js", "Express", "Postman"],
    },
    "Tool Tinkerer": {
      description:
        "You enjoy experimenting with dev tools and automation to boost productivity.",
      tools: ["Zsh", "VSCode", "Notion"],
    },
    "Code Philosopher": {
      description:
        "You think deeply about code quality, architecture, and maintainability.",
      tools: ["TypeScript", "Clean Code", "Design Patterns"],
    },
  };

  // Additional tools by category
  const toolsByCategory = {
    frontend: ["Vue.js", "CSS Animations", "UI/UX Design", "SASS", "Storybook"],
    backend: ["GraphQL", "MongoDB", "Docker", "AWS", "Python"],
    tools: ["Git", "GitHub Actions", "Webpack", "Terminal", "Vim"],
    philosophy: [
      "Functional Programming",
      "TDD",
      "Agile",
      "DRY Principles",
      "SOLID",
    ],
  };

  // Analyze answers to calculate category scores
  const analyzeAnswers = (answers: number[]) => {
    const scores: CategoryScores = {
      frontend: 0,
      backend: 0,
      tools: 0,
      philosophy: 0,
    };

    // Map each answer to a category score
    // Each question's choices are ordered: [frontend, backend, tools, philosophy]
    answers.forEach((answer) => {
      if (answer === 0) scores.frontend++;
      else if (answer === 1) scores.backend++;
      else if (answer === 2) scores.tools++;
      else if (answer === 3) scores.philosophy++;
    });

    return scores;
  };

  // Determine primary and secondary personas
  const determinePersonas = (scores: CategoryScores) => {
    const categories = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primaryCategory = categories[0][0];
    const secondaryCategory = categories[1][0];

    const personaMap = {
      frontend: "Frontend Flirt",
      backend: "Backend Brainiac",
      tools: "Tool Tinkerer",
      philosophy: "Code Philosopher",
    };

    return {
      primary: personaMap[primaryCategory as keyof typeof personaMap],
      secondary: personaMap[secondaryCategory as keyof typeof personaMap],
      primaryScore: categories[0][1],
      secondaryScore: categories[1][1],
    };
  };

  // Generate a custom description based on scores
  const generateCustomDescription = (
    scores: CategoryScores,
    primary: string,
    secondary: string
  ) => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);

    // If scores are very balanced
    if (
      Math.max(...Object.values(scores)) - Math.min(...Object.values(scores)) <=
      2
    ) {
      return `You're a versatile developer with balanced skills across the board. While you identify most with ${primary}, you're comfortable in many domains.`;
    }

    // If one category dominates
    const primaryData = resultData[primary];
    const secondaryData = resultData[secondary];

    return `${primaryData.description} You also show strong ${secondary
      .toLowerCase()
      .replace(
        " ",
        " "
      )} tendencies: ${secondaryData.description.toLowerCase()}`;
  };

  // Select custom tools based on scores
  const selectCustomTools = (scores: CategoryScores, primary: string) => {
    const baseTools = resultData[primary].tools;
    const additionalTools: string[] = [];

    // Add 1-2 tools from each non-primary category based on scores
    Object.entries(scores).forEach(([category, score]) => {
      if (
        category !== "frontend" &&
        category !== "backend" &&
        category !== "tools" &&
        category !== "philosophy"
      ) {
        return;
      }

      const categoryTools =
        toolsByCategory[category as keyof typeof toolsByCategory];
      if (score > 0) {
        // Add more tools from categories with higher scores
        const toolsToAdd = Math.min(Math.ceil(score / 2), 2);
        for (let i = 0; i < toolsToAdd; i++) {
          if (
            categoryTools[i] &&
            !baseTools.includes(categoryTools[i]) &&
            !additionalTools.includes(categoryTools[i])
          ) {
            additionalTools.push(categoryTools[i]);
          }
        }
      }
    });

    // Combine base tools with additional tools, limiting to 5 total
    return [...baseTools, ...additionalTools].slice(0, 5);
  };

  useEffect(() => {
    // Get answers from localStorage
    const answersJSON = localStorage.getItem("crushcode_answers");

    if (answersJSON) {
      try {
        const answers = JSON.parse(answersJSON);

        // Calculate scores for each category
        const scores = analyzeAnswers(answers);
        setCategoryScores(scores);

        // Determine primary and secondary personas
        const { primary, secondary } = determinePersonas(scores);
        setPersona(primary);

        // Generate custom description and tools
        const description = generateCustomDescription(
          scores,
          primary,
          secondary
        );
        setCustomDescription(description);

        const tools = selectCustomTools(scores, primary);
        setCustomTools(tools);
      } catch (error) {
        console.error("Error parsing answers:", error);
        // Fallback to saved result if answers can't be parsed
        const savedResult = localStorage.getItem("crushcode_result");
        if (savedResult) {
          setPersona(savedResult);
        }
      }
    } else {
      // Fallback to saved result if no answers are found
      const savedResult = localStorage.getItem("crushcode_result");
      if (savedResult) {
        setPersona(savedResult);
      }
    }
  }, []);

  useEffect(() => {
    // Generate share link
    const baseUrl = window.location.origin;
    const base64Data = btoa(`result=${persona}`);
    setShareLink(`${baseUrl}/result?result=${base64Data}`);
  }, [persona]);

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
        link.download = "crushcode-result.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  // Get base data for the persona
  const baseData = resultData[persona] || resultData["Frontend Flirt"];

  return (
    <div className={`flex items-center justify-center min-h-screen p-8`}>
      <div
        ref={resultCardRef}
        className={`result-container max-w-xl w-full rounded-2xl p-8 text-center ${
          darkMode
            ? "bg-gray-800 text-gray-200 shadow-xl shadow-gray-900/30 border border-gray-700/30"
            : "bg-gradient-to-r from-[var(--pastel-purple)] to-[var(--pastel-yellow)] text-gray-700"
        } backdrop-filter backdrop-blur-lg animate-fadeIn`}
      >
        <div className="flex justify-center items-center gap-3 text-4xl font-black mb-1 text-[#682f8a]">
          {persona}{" "}
        </div>

        <div className="italic mb-8 text-lg leading-relaxed text-gray-500">
          {customDescription || baseData.description}
        </div>

        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {(customTools.length > 0 ? customTools : baseData.tools).map(
            (tool, index) => (
              <div
                key={index}
                className="bg-[#8cb9e8] text-white px-3 py-1 rounded-full font-semibold text-sm shadow-md hover:bg-[#7aa7d6] transition-colors cursor-default"
              >
                {tool}
              </div>
            )
          )}
        </div>

        {/* Shareable Results Section */}
        <div className="mb-8">
          <div className="flex gap-2 justify-center mb-4 ">
            <input
              ref={shareLinkRef}
              type="text"
              className="flex-grow w-full py-2 px-3 rounded-md border-none
              focus:outline-0 text-gray-500 text-sm"
              value={shareLink}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="bg-[#ff9eb5] border-none rounded-md py-2 px-4  font-bold text-gray-700 hover:bg-[#f07a91] transition-colors"
            >
              Copy
            </button>
          </div>
          <button
            onClick={downloadAsImage}
            className="bg-[#8cb9e8] border-none rounded-md py-3 px-5 font-bold text-white hover:bg-[#7aa7d6] transition-colors"
          >
            Download Result as Image
          </button>

          {/* Social sharing icons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareLink
                  )}`,
                  "_blank"
                )
              }
              className="p-2 rounded-full bg-[#ff9eb5] text-white hover:bg-opacity-80 transition-colors"
              aria-label="Share on Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.instagram.com/?url=${encodeURIComponent(
                    shareLink
                  )}`,
                  "_blank"
                )
              }
              className="p-2 rounded-full bg-[#8cb9e8] text-white hover:bg-opacity-80 transition-colors"
              aria-label="Share on Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareLink
                  )}`,
                  "_blank"
                )
              }
              className="p-2 rounded-full bg-[#ba8eba] text-white hover:bg-opacity-80 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-5 md:flex-row flex-col">
          <button
            onClick={() => navigate("/quiz")}
            className="flex-1 py-3 px-6 rounded-lg font-bold border-2 border-[#ff9eb5] bg-transparent  hover:bg-[#ff9eb5] hover:text-gray-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 px-6 rounded-lg font-bold bg-[#ff9eb5] text-gray-700 hover:bg-[#f07a91] hover:text-gray-900 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
