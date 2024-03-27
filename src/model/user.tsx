import { getAllUsers } from "@/service/user_service";

export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  avatar: string;
  ip: string;
};

export var USERS: User[] = await getAllUsers();
