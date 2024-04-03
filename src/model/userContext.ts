import React from "react";
import { User } from "./user";

export const UsersContext = React.createContext<{
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}>({ users: [], setUsers: () => {} });
