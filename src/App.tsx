import React from "react";
import "./App.css";
import MasterPage from "./pages/MasterPage";
import { User } from "./model/user";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import UpdatePage from "./pages/UpdatePage";
import AddPage from "./pages/AddPage";
import { getAllUsers } from "./service/user_service";
import { UsersContext } from "./model/userContext";

var USERS: User[] = await getAllUsers();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterPage />,
  },
  {
    path: "/:userId",
    element: <DetailsPage />,
  },
  { path: "/update/:userId", element: <UpdatePage /> },
  { path: "/add", element: <AddPage /> },
]);

function App() {
  const [users, setUsers] = React.useState<User[]>(USERS);

  return (
    <>
      <UsersContext.Provider value={{ users, setUsers }}>
        <RouterProvider router={router} />
      </UsersContext.Provider>
    </>
  );
}

export default App;
