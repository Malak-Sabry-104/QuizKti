# 🧠 QuizKit — Discover Your Tech Persona

**QuizKit** is a playful, personality-style quiz app that helps users discover their inner tech persona — like **Frontend Flirt**, **Logic Wizard**, or **Pixel Perfectionist** — based on a series of stylish and fun questions.

> — Discover your tech love language.

---

## 🌟 Features

- 🎯 Take an interactive quiz to reveal your tech personality
- 🎨 Beautiful animated UI with pastel-themed visuals
- 🌗 Theme toggle (light/dark) across all pages
- 📤 Share or download your quiz result as an image
- 🛠️ (Optional) Build your own quiz and export it as JSON

---

## 👥 Target Users

| 👤 User Type     | 💡 Value Proposition                                 |
|------------------|------------------------------------------------------|
| **Quiz Takers**  | Find your persona, share results, enjoy playful UI  |
| **Creators**     | Build custom tech quizzes, preview & export easily  |

---

## 🗺️ Pages (MVP)

| Route             | Page Description                                           |
|------------------|------------------------------------------------------------|
| `/`              | **Home** — Hero, quiz intro, and start/create buttons      |
| `/quiz`          | **Quiz Interface** — Questions with transitions & progress |
| `/result`        | **Result Page** — Final persona with export/share options  |
| `/create`        | **Create Quiz** — (Optional) Custom quiz builder & preview |
| `*`              | **404 Page** — Lost-in-space theme with redirect button    |

---

## 💻 Tech Stack

| Layer               | Technology        |
|---------------------|-------------------|
| Frontend Framework  | **React**         |
| Language            | **TypeScript**    |
| Styling             | **Tailwind CSS**  |
| Routing             | React Router      |
| State & Storage     | localStorage, React hooks |
| Export              | html2canvas, btoa (shareable links) |
| Hosting             | Netlify           |

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/quizkit.git
cd quizkit
npm install
npm run dev
#
