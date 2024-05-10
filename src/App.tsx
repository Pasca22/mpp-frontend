import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import DetailsPage from "./pages/DetailsPage";
import AuthGuard from "./pages/AuthGuard";
import AddGameOrderPage from "./pages/AddGameOrderPage";
import AddPage from "./pages/AddPage";
import React from "react";
import { UsersContext } from "./model/userContext";
import { User } from "./model/user";
import { GameOrder } from "./model/gameOrder";
import UpdatePage from "./pages/UpdatePage";
import UpdateGameOrderPage from "./pages/UpdateGameOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <LoginPage />
      </AuthGuard>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/account",
    element: <DetailsPage />,
  },
  {
    path: "/place_game_order",
    element: <AddGameOrderPage />,
  },
  {
    path: "/update_game_order/:gameOrderId",
    element: <UpdateGameOrderPage />,
  },
  {
    path: "/add_users",
    element: <AddPage />,
  },
  {
    path: "/update_user/:userId",
    element: <UpdatePage />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);

function App() {
  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const [gameOrders, setGameOrders] = React.useState<GameOrder[]>([]);
  const [isDataRetrieved, setIsDataRetrieved] = React.useState(false);

  return (
    <>
      <UsersContext.Provider
        value={{
          allUsers,
          setAllUsers,
          gameOrders,
          setGameOrders,
          isDataRetrieved,
          setIsDataRetrieved,
        }}
      >
        <RouterProvider router={router} />
      </UsersContext.Provider>
    </>
  );
}

export default App;
