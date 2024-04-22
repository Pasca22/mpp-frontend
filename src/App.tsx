import React, { useEffect } from "react";
import "./App.css";
import MasterPage from "./pages/MasterPage";
import { User } from "./model/user";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import UpdatePage from "./pages/UpdatePage";
import AddPage from "./pages/AddPage";
import { getAllUsers } from "./service/user_service";
import { UsersContext } from "./model/userContext";
import AddGameOrderPage from "./pages/AddGameOrderPage";
import UpdateGameOrderPage from "./pages/UpdateGameOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterPage />,
  },
  {
    path: "/user/:userId",
    element: <DetailsPage />,
  },
  { path: "/update-user/:userId", element: <UpdatePage /> },
  { path: "/add-user", element: <AddPage /> },
  { path: "/add-gameOrder/:userId", element: <AddGameOrderPage /> },
  { path: "/update-gameOrder/:gameOrderId", element: <UpdateGameOrderPage /> },
]);

function App() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [serverIsUp, setServerIsUp] = React.useState(true);

  async function fetchUsers() {
    await getAllUsers()
      .then((data) => {
        setUsers(data);
        setServerIsUp(true);
      })
      .catch(() => {
        setServerIsUp(false);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, [serverIsUp]);

  // useEffect(() => {
  //   const socket = io("http://localhost:9092");
  //   socket.on("connect_error", (error: any) => {
  //     console.error("Connection error:", error);
  //   });
  //   socket.on("connect_timeout", () => {
  //     console.error("Connection timeout");
  //   });
  //   socket.on("newUser", (newUser: User) => {
  //     setUsers((prevData) => [...prevData, newUser]);
  //     console.log("New user added!", newUser);
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [setUsers]);

  if (!serverIsUp) {
    return <h1>Server is down. Please wait...</h1>;
  }

  return (
    <>
      <UsersContext.Provider value={{ users, setUsers }}>
        <RouterProvider router={router} />
      </UsersContext.Provider>
    </>
  );
}

export default App;
