import React from "react";
import "./App.css";
import MasterPage from "./pages/MasterPage";
import { USERS, User } from "./model/user";

export const UsersContext = React.createContext<{
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}>({ users: USERS, setUsers: () => {} });

function App() {
  const [users, setUsers] = React.useState<User[]>(USERS);

  return (
    <>
      <UsersContext.Provider value={{ users, setUsers }}>
        <MasterPage />
      </UsersContext.Provider>
    </>
  );
}

export default App;
