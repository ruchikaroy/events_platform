import { StrictMode } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.tsx";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import supabase from "./supabase.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SessionContextProvider supabaseClient={supabase}>
        <App />
        <ToastContainer />
      </SessionContextProvider>
    </BrowserRouter>
  </StrictMode>
);
