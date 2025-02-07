import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const supabase = createClient(
  "https://pcstcetyssfvownxovbt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjc3RjZXR5c3Nmdm93bnhvdmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMTQ2MDEsImV4cCI6MjA1MjY5MDYwMX0.ADJtPlzYZTLWnFfjHm3LU-S3-UPd4ypSt8rYBm-Goh0"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SessionContextProvider supabaseClient={supabase}>
        <App />
      </SessionContextProvider>
    </BrowserRouter>
  </StrictMode>
);
