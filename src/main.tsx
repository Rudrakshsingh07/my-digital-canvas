import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import faviconUrl from "@/assets/favicon.png";

const link = document.querySelector("link[rel='icon']") ?? document.createElement("link");
link.setAttribute("rel", "icon");
link.setAttribute("href", faviconUrl);
link.setAttribute("type", "image/png");
if (!document.querySelector("link[rel='icon']")) document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
