import { Button } from "@/components/ui/button";
import { UsersContext } from "@/model/userContext";
import { getCurrentUser } from "@/service/auth_service";
import { deleteGameOrder } from "@/service/user_service";
import { CrossCircledIcon, UpdateIcon } from "@radix-ui/react-icons";
import React from "react";
import {
  Link,
  Navigate,
  NavigateFunction,
  useNavigate,
} from "react-router-dom";

const ModeratorHomePage = () => {
  const currentUser = getCurrentUser();
  let navigate: NavigateFunction = useNavigate();
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

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const deleteGameOrderEvent = (id: number) => {
    deleteGameOrder(id).then(() => {
      setGameOrders((prevGameOrders) =>
        prevGameOrders.filter((gameOrder) => gameOrder.id !== id)
      );
    });
  };

  return (
    <>
      <div className="font-mono">
        <header className="flex justify-end bg-gray-900 p-4">
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

        <div className="my-8 mx-32">
          <h1 className="font-bold text-4xl">My Game Orders</h1>
          <div className="flex flex-wrap gap-8 m-8">
            {gameOrders.map((gameOrder) => (
              <div
                key={gameOrder.id}
                className="flex flex-col justify-center items-center border-2 border-gray-300 shadow-lg rounded-lg p-4 w-[calc(50%-1rem)]"
              >
                <h2 className="text-2xl font-bold">{gameOrder.name}</h2>
                <p className="text-lg">Price: ${gameOrder.price}</p>
                <p>Description: {gameOrder.description}</p>
                <div className="flex mt-2">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModeratorHomePage;
