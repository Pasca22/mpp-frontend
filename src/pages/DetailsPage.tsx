import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersContext } from "@/model/userContext";

const DetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const UsersContextValue = React.useContext(UsersContext);
  const allUsers = UsersContextValue.users;

  const user = allUsers.find((user) => user.id.toString() === userId);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="p-10 rounded-2xl border-2 shadow-xl hover:bg-slate-50">
          <CardHeader>
            <CardTitle>{user?.username}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="py-1">
              <li className="py-1">Email: {user?.email}</li>
              <li className="py-1">Password: {user?.password}</li>
              <li className="py-1">IP: {user?.ip}</li>
              <li className="flex justify-center py-1">
                <img
                  src={user?.avatar}
                  alt={"No avatar"}
                  className="w-60 h-60 my-5 rounded-full"
                />
              </li>
              <li>
                <h1 className="text-center text-2xl font-semibold">
                  Game orders:
                </h1>
                {user?.gameOrders.length === 0 ? (
                  <p className="mt-2">No game orders</p>
                ) : (
                  user?.gameOrders.map((order) => (
                    <div
                      key={order.id}
                      className="mt-4 p-1 border-solid border-2 rounded-2xl hover:bg-slate-100"
                    >
                      <p>Game: {order.name}</p>
                      <p>Price: {order.price}</p>
                      <p>Description: {order.description}</p>
                    </div>
                  ))
                )}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DetailsPage;
