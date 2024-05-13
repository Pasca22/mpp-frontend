import { User } from "@/model/user";
import axios from "axios";

const API_URL = "https://mpp-backend.happymoss-5afc6e08.northeurope.azurecontainerapps.io/api/auth/";

export const register = (username: string, email: string, password: string, role: string[]) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    role,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const json = JSON.parse(userStr);
    const user: User = {
      id: json.id,
      username: json.username,
      email: json.email,
      roles: json.roles,
    };
    return user;
  };

  return null;
};