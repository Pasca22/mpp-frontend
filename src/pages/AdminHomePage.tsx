import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CrossCircledIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  Link,
  Navigate,
  NavigateFunction,
  useNavigate,
} from "react-router-dom";
import { getCurrentUser } from "@/service/auth_service";
import { UsersContext } from "@/model/userContext";
import React from "react";
import { deleteGameOrder, deleteUser } from "@/service/user_service";

const AdminHomePage: React.FC = () => {
  const currentUser = getCurrentUser();
  let navigate: NavigateFunction = useNavigate();
  const allUsers = React.useContext(UsersContext).allUsers;
  const setAllUsers = React.useContext(UsersContext).setAllUsers;
  const gameOrders = React.useContext(UsersContext).gameOrders;
  const setGameOrders = React.useContext(UsersContext).setGameOrders;

  const signout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const userDetails = () => {
    navigate("/account");
  };

  const addGameOrder = () => {
    navigate("/place_game_order");
  };

  const addUsers = () => {
    navigate("/add_users");
  };

  const deleteUserEvent = (id: number) => {
    const index = allUsers.findIndex((user) => user.id === id);

    deleteUser(id).then(() => {
      setAllUsers((prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1),
      ]);
    });
  };

  const deleteGameOrderEvent = (id: number) => {
    deleteGameOrder(id).then(() => {
      setGameOrders((prevGameOrders) =>
        prevGameOrders.filter((gameOrder) => gameOrder.id !== id)
      );
    });
  };

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="font-mono">
        <header className="flex justify-end bg-gray-900 p-4">
          <span
            className="flex text-white text-lg mr-14 cursor-pointer hover:underline hover:underline-offset-2"
            onClick={addUsers}
          >
            Add Users
          </span>
          <span
            className="flex text-white text-lg mr-14 cursor-pointer hover:underline hover:underline-offset-2"
            onClick={addGameOrder}
          >
            Add Game Order
          </span>
          <span
            className="flex text-white text-lg mr-14 cursor-pointer hover:underline hover:underline-offset-2"
            onClick={userDetails}
          >
            My account
          </span>
          <span
            className="text-white text-lg mr-14 cursor-pointer hover:underline hover:underline-offset-2"
            onClick={signout}
          >
            Sign Out
          </span>
        </header>

        <div className="flex justify-center my-8 mx-32">
          <Tabs defaultValue="account" className="w-[800px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Users</TabsTrigger>
              <TabsTrigger value="password">Game Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <ul>
                {allUsers.map((user) => (
                  <li key={user.id}>
                    <Card className="rounded-2xl px-20 my-4 border-2 shadow-xl hover:bg-slate-50">
                      <CardHeader>
                        <CardTitle>{user.username}</CardTitle>
                        <CardDescription>Email: {user.email}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-center">
                        <Link to={`/update_user/${user.id}`}>
                          <Button className="mx-2 ">
                            <UpdateIcon className="w-5 h-5 mr-1" />
                            Update
                          </Button>
                        </Link>

                        <Button
                          className="bg-red-600 mx-2  hover:bg-red-900"
                          onClick={() => deleteUserEvent(user.id)}
                        >
                          <CrossCircledIcon className="w-6 h-6 mr-1" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="password">
              <ul>
                {gameOrders.map((gameOrder) => (
                  <li key={gameOrder.id}>
                    <Card className="rounded-2xl px-20 my-4 border-2 shadow-xl hover:bg-slate-50">
                      <CardHeader>
                        <CardTitle>{gameOrder.name}</CardTitle>
                        <CardDescription>
                          Price: {gameOrder.price}
                        </CardDescription>
                        <CardDescription>
                          Description: {gameOrder.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-center">
                        <Link to={`/update_game_order/${gameOrder.id}`}>
                          <Button className="mx-2 ">
                            <UpdateIcon className="w-5 h-5 mr-1" />
                            Update
                          </Button>
                        </Link>
                        <Button
                          className="bg-red-600 mx-2  hover:bg-red-900"
                          onClick={() => deleteGameOrderEvent(gameOrder.id)}
                        >
                          <CrossCircledIcon className="w-6 h-6 mr-1" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
