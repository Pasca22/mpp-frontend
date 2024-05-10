import { UsersContext } from "@/model/userContext";
import { getCurrentUser } from "@/service/auth_service";
import React from "react";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";

const UserHomePage: React.FC = () => {
  const currentUser = getCurrentUser();
  let navigate: NavigateFunction = useNavigate();
  const gameOrders = React.useContext(UsersContext).gameOrders;

  const signout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const userDetails = () => {
    navigate("/account");
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHomePage;
