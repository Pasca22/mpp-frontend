import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/data/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

export const getGameOrders = (id: number) => {
  return axios.get(API_URL + "game_orders/" + id, { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getUsersForAdmin = () => {
  return axios.get(API_URL + "admin/users", { headers: authHeader() });
};

export const getGameOrdersForAdmin = () => {
  return axios.get(API_URL + "admin/game_orders", { headers: authHeader() });
};

export const deleteUser = (id: number) => {
  return axios.delete(API_URL + "admin/delete_user/" + id, { headers: authHeader() });
}

export const updateUser = (id: number, username: string, email: string) => {
  return axios.put(API_URL + "admin/update_user/" + id, { username, email }, { headers: authHeader() });
}

export const addGameOrder = (userId: number, gameOrder: any) => {
  return axios.post(API_URL + "mod/add_game_order/" + userId, gameOrder, { headers: authHeader() });
}

export const deleteGameOrder = (id: number) => {
  return axios.delete(API_URL + "mod/delete_game_order/" + id, { headers: authHeader() });
}

export const updateGameOrder = (id: number, gameOrder: any) => {
  return axios.put(API_URL + "mod/update_game_order/" + id, gameOrder, { headers: authHeader() });
}