import React from "react";
import { User } from "./user";
import { GameOrder } from "./gameOrder";

export const UsersContext = React.createContext<{
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  gameOrders: GameOrder[];
  setGameOrders: React.Dispatch<React.SetStateAction<GameOrder[]>>;
  isDataRetrieved: boolean;
  setIsDataRetrieved: React.Dispatch<React.SetStateAction<boolean>>;
}>({ 
  allUsers: [],
  setAllUsers: () => {},
  gameOrders: [],
  setGameOrders: () => {},
  isDataRetrieved: false,
  setIsDataRetrieved: () => {},
});
