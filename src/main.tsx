import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App";
import Layout from "./Components/Layout";
import ErrorPage from "./Routes/ErrorPage";
import Landing from "./Routes/Landing";
import Dashboard from "./Routes/Dashboard";
import Quiz from "./Routes/Quiz";
import Results from "./Routes/Results";
import CreateModal from "./Routes/CreateModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/result" element={<Results />} />
            <Route path="/create" element={<CreateModal />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);
