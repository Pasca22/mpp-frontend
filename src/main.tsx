import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";
import UpdatePage from "./pages/UpdatePage.tsx";
import AddPage from "./pages/AddPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:userId",
    element: <DetailsPage />,
  },
  { path: "/update/:userId", element: <UpdatePage /> },
  { path: "/add", element: <AddPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
