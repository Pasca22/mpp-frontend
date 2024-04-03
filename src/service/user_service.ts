import { User } from "@/model/user";
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/users";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(REST_API_BASE_URL);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await axios.get<User>(`${REST_API_BASE_URL}/${id}`);
  return response.data;
};

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post<User>(REST_API_BASE_URL, user);
  return response.data;
};

export const updateUser = async (id: number, user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.put<User>(`${REST_API_BASE_URL}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${REST_API_BASE_URL}/${id}`);
};
