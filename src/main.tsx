import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import axios from 'axios';
const client = new QueryClient({defaultOptions: {queries: {retry: (count, error) =>
  !(axios.isAxiosError(error) && [401, 403].includes(error.response?.status || 0)) && count < 3,
}}})

createRoot(document.getElementById("root")!).render(

  <QueryClientProvider client={client}>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
   
);
