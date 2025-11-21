import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "./Components/ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <HeroUIProvider>
    <BrowserRouter>
    <ThemeProvider>
      <App />
      </ThemeProvider>
    </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
);
