import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { HelmetProvider } from 'react-helmet-async';  // Import HelmetProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider> {/* Wrap the entire app with HelmetProvider */}
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
