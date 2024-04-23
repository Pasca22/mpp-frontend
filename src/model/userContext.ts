import React from "react";
import { User } from "./user";
import { TableEntity } from "./tableEntity";

export const UsersContext = React.createContext<{
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  table: TableEntity[];
  setTable: React.Dispatch<React.SetStateAction<TableEntity[]>>;
  tablePage: number;
  setTablePage: React.Dispatch<React.SetStateAction<number>>;
}>({ 
  users: [], 
  setUsers: () => {},
  table: [],
  setTable: () => {},
  tablePage: 1,
  setTablePage: () => {},
});
