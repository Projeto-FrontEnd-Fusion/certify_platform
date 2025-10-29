import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
const client = new QueryClient()

createRoot(document.getElementById("root")!).render(

  <QueryClientProvider client={client}>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
   
);
