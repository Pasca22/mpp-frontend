import { GameOrder } from "@/model/gameOrder";
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/game-orders";

export const addGameOrder = async (userId: number, gameOrder: Omit<GameOrder, "id">): Promise<GameOrder> => {
  const response = await axios.post<GameOrder>(`${REST_API_BASE_URL}/${userId}`, gameOrder);
  return response.data;
};

export const updateGameOrder = async (id: number, gameOrder: Omit<GameOrder, "id">): Promise<GameOrder> => {
  const response = await axios.put<GameOrder>(`${REST_API_BASE_URL}/${id}`, gameOrder);
  return response.data;
}

export const deleteGameOrder = async (id: number): Promise<void> => {
  await axios.delete(`${REST_API_BASE_URL}/${id}`);
};