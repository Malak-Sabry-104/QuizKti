import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App";
import Layout from "./Components/Layout";
import Hero from "./Components/Hero";
import ErrorPage from "./Routes/ErrorPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Hero />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);
