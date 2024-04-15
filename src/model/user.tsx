import { GameOrder } from "./gameOrder";

export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  avatar: string;
  ip: string;
  gameOrders: GameOrder[];
};
