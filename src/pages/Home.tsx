import { getCurrentUser } from "@/service/auth_service";
import { Navigate } from "react-router-dom";
import AdminHomePage from "./AdminHomePage";
import UserHomePage from "./UserHomePage";
import ModeratorHomePage from "./ModeratorHomePage";
import React from "react";
import { UsersContext } from "@/model/userContext";
import {
  getGameOrders,
  getGameOrdersForAdmin,
  getUsersForAdmin,
} from "@/service/user_service";

const Home: React.FC = () => {
  const currentUser = getCurrentUser();
  const isDataRetrieved = React.useContext(UsersContext).isDataRetrieved;
  const setIsDataRetrieved = React.useContext(UsersContext).setIsDataRetrieved;
  const setGameOrders = React.useContext(UsersContext).setGameOrders;
  const setAllUsers = React.useContext(UsersContext).setAllUsers;

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (currentUser.roles.includes("ROLE_ADMIN")) {
    if (!isDataRetrieved) {
      getGameOrdersForAdmin().then((response) => {
        setGameOrders(response.data);
      });
      getUsersForAdmin().then((response) => {
        setAllUsers(response.data);
      });
      setIsDataRetrieved(true);
    }
    return <AdminHomePage />;
  }
  if (!isDataRetrieved) {
    getGameOrders(currentUser.id).then((response) => {
      setGameOrders(response.data);
    });
    setIsDataRetrieved(true);
  }

  if (currentUser.roles.includes("ROLE_MODERATOR")) {
    return <ModeratorHomePage />;
  }
  if (currentUser.roles.includes("ROLE_USER")) {
    return <UserHomePage />;
  }

  return <Navigate to="/" replace />;
};

export default Home;
