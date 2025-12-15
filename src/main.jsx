import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/router";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={3000} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
