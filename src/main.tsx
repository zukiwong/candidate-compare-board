
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter.tsx";
import "./index.css";
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById("root")!).render(
  <>
  <AppRouter />
  <Analytics />
  </>
);
  