import { Button } from "@/components/ui/button";
import React from "react";
import { USERS, USERS as initialUsers } from "@/constants/user";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  PlusCircledIcon,
  CrossCircledIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";

const MasterPage: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  function deleteEntity(userId: string) {
    const index = users.findIndex((user) => user.userId === userId);
    if (index === -1) {
      return;
    }

    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    USERS.splice(index, 1);
    setUsers(updatedUsers);
  }

  return (
    <>
      <h1 className="text-5xl text-center font-bold mt-2 mb-6">User List</h1>
      <div className="flex justify-center">
        <ul>
          <li key={"add_button"}>
            <Link to="/add">
              <Button className="bg-green-500 hover:bg-green-600">
                <PlusCircledIcon className="w-6 h-6 mr-1" />
                Add new entity
              </Button>
            </Link>
          </li>
          {users.map((user) => (
            <li key={user.userId} className="my-4">
              <Card
                key={user.userId}
                className="rounded-2xl px-20 border-2 shadow-xl hover:bg-slate-100"
              >
                <CardHeader>
                  <CardTitle>{user.username}</CardTitle>
                  <CardDescription>Email: {user.email}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Link to={`/${user.userId}`}>
                    <Button className="bg-sky-600 mx-2 hover:bg-sky-700">
                      More...
                    </Button>
                  </Link>
                  <Link to={`/update/${user.userId}`}>
                    <Button className="mx-2 ">
                      <UpdateIcon className="w-5 h-5 mr-1" />
                      Update
                    </Button>
                  </Link>
                  <Button
                    className="bg-red-600 mx-2  hover:bg-red-900"
                    onClick={() => deleteEntity(user.userId)}
                  >
                    <CrossCircledIcon className="w-6 h-6 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MasterPage;
