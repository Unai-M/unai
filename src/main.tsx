import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LangugeProvider } from "./context/LanguageContext.tsx";
import { ContactProvider } from "./context/ContactContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 35,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LangugeProvider>
        <ContactProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContactProvider>
      </LangugeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
