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
import BigTable from "./pages/BigTable";
import { TableEntity } from "./model/tableEntity";
import { getTableEntities } from "./service/gameOrder_service";

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
  { path: "/table", element: <BigTable /> },
]);

function App() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [table, setTable] = React.useState<TableEntity[]>([]);
  const [tablePage, setTablePage] = React.useState(1);

  const fetchTable = async () => {
    const newTable = await getTableEntities(1);
    setTable(newTable);
  };

  function fetchUsers() {
    getAllUsers().then((data) => {
      setUsers(data);
    });
  }

  useEffect(() => {
    fetchUsers();
    fetchTable();
  }, []);

  return (
    <>
      <UsersContext.Provider
        value={{ users, setUsers, table, setTable, tablePage, setTablePage }}
      >
        <RouterProvider router={router} />
      </UsersContext.Provider>
    </>
  );
}

export default App;
