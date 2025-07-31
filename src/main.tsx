import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App";
import Layout from "./Components/Layout";
import ErrorPage from "./Routes/ErrorPage";
import Landing from "./Routes/Landing";
import Quiz from "./Routes/Quiz";
import Results from "./Routes/Results";
import CreateModal from "./Routes/CreateModal";
// dfvvvvffvfvvffdccc
// cccrfffvffvvvfffrdsff
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Results />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/create" element={<CreateModal />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);
